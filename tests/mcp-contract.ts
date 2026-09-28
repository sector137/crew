#!/usr/bin/env bun
/**
 * MCP contract test — keeps the crew skills honest against the live sector137 MCP.
 *
 * What it checks, per configured server (three independent sections):
 *   1. live    — speaks Streamable HTTP JSON-RPC to the server, lists tools, diffs
 *                them against that server's snapshot file
 *   2. docs    — every tool named in references/mcp-tools.md exists in some snapshot,
 *                and vice versa (catches doc drift)
 *   3. skills  — every mcp__sector137__<name> / mcp__plugin_sector137_sector137__<name>
 *                reference anywhere in the plugin exists in some snapshot (catches a
 *                skill calling a dead tool), and every bare, backticked snake_case
 *                identifier that reads as an MCP tool name (e.g. `record_incident`)
 *                either matches a real tool in some snapshot or is flagged as a
 *                broken/stale reference (e.g. `list_projects`, which was never a tool)
 *
 * SERVERS below lists every (server, url, snapshot) triple to check. Today there is
 * one: the sector137 work server. A later split into domain servers (studio, crew,
 * brand, ops) adds entries here — docs/skills checks run against the UNION of every
 * server's tools, since a doc or skill may legitimately reference any of them.
 *
 * The live section needs SECTOR137_API_KEY; the docs and skills sections are
 * offline and always run. So `bun run test:mcp` is useful even with no key —
 * it still catches skill/doc drift against the checked-in snapshot(s).
 *
 * Usage:
 *   bun tests/mcp-contract.ts              full check, warns on description churn
 *   bun tests/mcp-contract.ts --strict     fail on any diff (release gate)
 *   bun tests/mcp-contract.ts --update      rewrite every reachable server's snapshot
 *   bun tests/mcp-contract.ts --smoke       one read-only issues(action:"stats") call
 *   bun tests/mcp-contract.ts --offline     skip the live section (docs+skills only)
 *
 * Env:
 *   SECTOR137_API_KEY   Bearer token (rl_live_… or rl_mcp_…). Required for live/update/smoke.
 *                       Shared across every configured server until they need separate keys.
 *   MCP_URL             override the default server's endpoint (only applies when SERVERS
 *                       has a single entry, to keep single-server usage unambiguous)
 */

import { Glob } from "bun";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const MCP_TOOLS_DOC = `${REPO}/references/mcp-tools.md`;
const PROTOCOL_VERSION = "2025-03-26";

interface ServerConfig {
  /** Short label used in output; also the snapshot's expected `server.name`. */
  server: string;
  url: string;
  snapshotPath: string;
}

// Every MCP server this plugin's docs/skills may reference. One entry today; a
// domain-server split adds more here (each with its own snapshot file) without
// changing anything below — docs/skills checks run against their union.
const SERVERS: ServerConfig[] = [
  {
    server: "sector137",
    url: process.env.MCP_URL || "https://app.sector137.io/mcp",
    snapshotPath: `${REPO}/tests/snapshots/mcp-tools.snapshot.json`,
  },
];

const args = new Set(process.argv.slice(2));
const UPDATE = args.has("--update");
const STRICT = args.has("--strict");
const SMOKE = args.has("--smoke");
const OFFLINE = args.has("--offline");

// ── types ────────────────────────────────────────────────────────────────
interface ToolShape {
  name: string;
  description: string;
  required: string[];
  properties: Record<string, string>; // propName -> json-schema type
}
interface Snapshot {
  _provenance?: string;
  capturedAt: string | null;
  protocolVersion: string;
  server: { name: string; version: string };
  tools: ToolShape[];
}

// ── tiny console helpers (no deps) ───────────────────────────────────────
const c = {
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};
const problems: string[] = [];
const warnings: string[] = [];
function fail(msg: string) {
  problems.push(msg);
  console.log(`  ${c.red("✗")} ${msg}`);
}
function warn(msg: string) {
  warnings.push(msg);
  console.log(`  ${c.yellow("⚠")} ${msg}`);
}
function ok(msg: string) {
  console.log(`  ${c.green("✓")} ${msg}`);
}
function section(title: string) {
  console.log(`\n${c.bold(title)}`);
}

// ── JSON-RPC over Streamable HTTP ────────────────────────────────────────

/** Parse a Streamable HTTP response body — either application/json or an SSE stream. */
function extractJsonRpc(contentType: string, body: string): any[] {
  if (contentType.includes("text/event-stream")) {
    // SSE frames: collect every `data:` line and JSON-parse it.
    const out: any[] = [];
    for (const line of body.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("data:")) {
        const payload = trimmed.slice(5).trim();
        if (payload && payload !== "[DONE]") {
          try {
            out.push(JSON.parse(payload));
          } catch {
            /* ignore keep-alive / partial frames */
          }
        }
      }
    }
    return out;
  }
  if (!body.trim()) return [];
  const parsed = JSON.parse(body);
  return Array.isArray(parsed) ? parsed : [parsed];
}

/** One JSON-RPC connection's worth of state (id counter, session id), scoped to a server. */
function makeClient(url: string) {
  let rpcId = 0;
  let sessionId: string | null = null;

  async function rpc(method: string, params?: unknown, isNotification = false): Promise<any> {
    const key = process.env.SECTOR137_API_KEY;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    };
    if (key) headers.Authorization = `Bearer ${key}`;
    if (sessionId) headers["Mcp-Session-Id"] = sessionId;

    const bodyObj: Record<string, unknown> = { jsonrpc: "2.0", method };
    if (params !== undefined) bodyObj.params = params;
    if (!isNotification) bodyObj.id = ++rpcId;

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
      signal: AbortSignal.timeout(30_000),
    });

    const sid = res.headers.get("Mcp-Session-Id");
    if (sid) sessionId = sid;

    if (res.status === 401) {
      throw new Error(
        `401 Unauthorized from ${url}. Check SECTOR137_API_KEY (rl_live_… or rl_mcp_…). ` +
          `WWW-Authenticate: ${res.headers.get("WWW-Authenticate") ?? "(none)"}`,
      );
    }
    if (isNotification) return null;

    const ct = res.headers.get("content-type") ?? "";
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} → HTTP ${res.status}: ${text.slice(0, 300)}`);

    const messages = extractJsonRpc(ct, text);
    const response = messages.find((m) => m.id === rpcId) ?? messages[0];
    if (!response) throw new Error(`${method}: no JSON-RPC response in body (${ct})`);
    if (response.error) throw new Error(`${method} → RPC error ${response.error.code}: ${response.error.message}`);
    return response.result;
  }

  async function handshake(): Promise<{ name: string; version: string }> {
    const init = await rpc("initialize", {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: { name: "sector137-crew-contract-test", version: "1.0.0" },
    });
    await rpc("notifications/initialized", undefined, true);
    const info = init?.serverInfo ?? {};
    return { name: info.name ?? "unknown", version: info.version ?? "unknown" };
  }

  async function listAllTools(): Promise<any[]> {
    const tools: any[] = [];
    let cursor: string | undefined;
    do {
      const result = await rpc("tools/list", cursor ? { cursor } : {});
      tools.push(...(result?.tools ?? []));
      cursor = result?.nextCursor;
    } while (cursor);
    return tools;
  }

  return { rpc, handshake, listAllTools };
}

// ── normalize a live tool into the snapshot shape ────────────────────────
function jsonType(schema: any): string {
  if (!schema || typeof schema !== "object") return "unknown";
  if (Array.isArray(schema.type)) return schema.type.join("|");
  if (schema.enum) return `enum(${schema.enum.length})`;
  if (schema.anyOf || schema.oneOf) return "union";
  return schema.type ?? "unknown";
}
function normalize(tool: any): ToolShape {
  const props = tool.inputSchema?.properties ?? {};
  const properties: Record<string, string> = {};
  for (const k of Object.keys(props).sort()) properties[k] = jsonType(props[k]);
  return {
    name: tool.name,
    description: (tool.description ?? "").trim(),
    required: [...(tool.inputSchema?.required ?? [])].sort(),
    properties,
  };
}

// ── snapshot diff ────────────────────────────────────────────────────────
function diffSnapshot(live: ToolShape[], snap: ToolShape[]): { hard: number; soft: number } {
  const liveByName = new Map(live.map((t) => [t.name, t]));
  const snapByName = new Map(snap.map((t) => [t.name, t]));
  let hard = 0;
  let soft = 0;

  for (const name of snapByName.keys()) {
    if (!liveByName.has(name)) {
      fail(`tool removed on server: ${name}`);
      hard++;
    }
  }
  for (const name of liveByName.keys()) {
    if (!snapByName.has(name)) {
      fail(`new tool on server (snapshot stale): ${name}`);
      hard++;
    }
  }
  for (const [name, liveTool] of liveByName) {
    const snapTool = snapByName.get(name);
    if (!snapTool) continue;
    const reqAdded = liveTool.required.filter((r) => !snapTool.required.includes(r));
    const reqRemoved = snapTool.required.filter((r) => !liveTool.required.includes(r));
    if (reqAdded.length || reqRemoved.length) {
      fail(`${name}: required params changed (+${reqAdded.join(",") || "∅"} / -${reqRemoved.join(",") || "∅"})`);
      hard++;
    }
    if (liveTool.description !== snapTool.description) {
      warn(`${name}: description changed`);
      soft++;
    }
  }
  return { hard, soft };
}

// ── file readers ─────────────────────────────────────────────────────────
async function readSnapshot(path: string): Promise<Snapshot | null> {
  const f = Bun.file(path);
  if (!(await f.exists())) return null;
  return (await f.json()) as Snapshot;
}
async function writeSnapshot(path: string, snap: Snapshot): Promise<void> {
  await Bun.write(path, JSON.stringify(snap, null, 2) + "\n");
}

/**
 * Tool names the reference doc presents as real tools. Two sources:
 *   - section headers with a backticked tool name:  ## `issues` — …
 *   - the first backtick cell of a markdown table row:  | `generate_prototype` | …
 * The consolidated tools (issues/releases) live in headers; their action sub-tables
 * write the action in a plain (non-backtick) first cell, so actions never register
 * as tools. Granular tools (prototypes, personas, products) live in table cells.
 */
async function docToolNames(): Promise<Set<string>> {
  const text = await Bun.file(MCP_TOOLS_DOC).text();
  const names = new Set<string>();
  for (const m of text.matchAll(/^#{2,4}\s+`([a-z][a-z0-9_]+)`/gm)) names.add(m[1]);
  for (const m of text.matchAll(/^\|\s*`([a-z][a-z0-9_]+)`\s*\|/gm)) names.add(m[1]);
  return names;
}

/**
 * Vocabulary that reads like a tool name (backticked, lowercase, snake_case) but
 * isn't one: the `issues`/`releases` action verbs, and the Data Model enum values
 * (status, relation type, note type, …). Parsed straight from mcp-tools.md so it
 * can't drift out of sync with the doc. Without this, prose like "`add_note`" or
 * "`in_progress`" would false-positive in the bare-tool-name scan below.
 */
async function nonToolVocab(): Promise<Set<string>> {
  const text = await Bun.file(MCP_TOOLS_DOC).text();
  const vocab = new Set<string>();

  // Action tables for the consolidated `issues` and `releases` tools: plain
  // (non-backtick) first cell holds the action verb.
  for (const heading of ["issues", "releases"]) {
    const start = text.indexOf(`## \`${heading}\``);
    if (start === -1) continue;
    const rest = text.slice(start + 1);
    const nextHeading = rest.search(/\n## /);
    const section = nextHeading === -1 ? rest : rest.slice(0, nextHeading);
    for (const m of section.matchAll(/^\|\s*([a-z][a-z0-9_]*)\s*\|/gm)) {
      if (m[1] === "action") continue; // header row
      vocab.add(m[1]);
    }
  }

  // Data Model enum table: every backticked value in the "## Data Model" section.
  const dmStart = text.indexOf("## Data Model");
  if (dmStart !== -1) {
    const rest = text.slice(dmStart + 1);
    const nextHeading = rest.search(/\n## /);
    const section = nextHeading === -1 ? rest : rest.slice(0, nextHeading);
    for (const m of section.matchAll(/`([a-z][a-z0-9_]*)`/g)) vocab.add(m[1]);
  }

  return vocab;
}

/**
 * Identifiers that look like bare MCP tool names but are known NOT to be — belonging
 * to a different tool ecosystem entirely, or naming something else (a metric, a data
 * entity), or an explicit "this is not a real tool" counter-example in the docs.
 * Kept short and hand-reviewed on purpose: this is the escape hatch for false
 * positives the mcp-tools.md-derived vocabulary above can't know about.
 */
const FOREIGN_OR_NON_TOOL_IDENTIFIERS = new Set([
  // Claude Code's built-in Browser pane tools (skills/ux-walkthrough), not sector137.
  "form_input",
  "get_page_text",
  "preview_logs",
  "preview_start",
  "preview_stop",
  "read_console_messages",
  "read_network_requests",
  "read_page",
  "resize_window",
  "javascript_tool",
  // Langfuse review-quality score names (agents/navigator-mira.md), not tool calls.
  "review_signal_quality",
  "review_false_positive_rate",
  "review_acceptance_rate",
  // A data entity mutated by an HTTP endpoint (agents/foundry-voss.md, skills/voss),
  // not an MCP tool.
  "agent_registry",
  // references/mcp-tools.md names this explicitly as NOT a real tool, to warn
  // against calling it: "not a separate `create_issue`".
  "create_issue",
]);

/** Every mcp__sector137__<name> / mcp__plugin_sector137_sector137__<name> referenced across the plugin. */
async function skillToolRefs(): Promise<Map<string, string[]>> {
  const refs = new Map<string, string[]>();
  const glob = new Glob("{skills,agents,references,evals}/**/*.{md,json}");
  for await (const rel of glob.scan(REPO)) {
    const text = await Bun.file(`${REPO}/${rel}`).text();
    for (const m of text.matchAll(/mcp__(?:plugin_sector137_)?sector137__([a-z][a-z0-9_]+)/g)) {
      const name = m[1];
      if (!refs.has(name)) refs.set(name, []);
      if (!refs.get(name)!.includes(rel)) refs.get(name)!.push(rel);
    }
  }
  return refs;
}

/**
 * Every backticked, bare (unprefixed) snake_case identifier across the plugin that
 * reads as an MCP tool name — e.g. `record_incident`, `list_projects` — minus the
 * known non-tool vocabulary. Scoped to backticked identifiers containing an
 * underscore so ordinary prose words never match.
 */
async function bareToolRefs(excludeVocab: Set<string>): Promise<Map<string, string[]>> {
  const refs = new Map<string, string[]>();
  const glob = new Glob("{skills,agents,references,evals}/**/*.{md,json}");
  for await (const rel of glob.scan(REPO)) {
    const text = await Bun.file(`${REPO}/${rel}`).text();
    for (const m of text.matchAll(/`([a-z][a-z0-9]*(?:_[a-z0-9]+)+)`/g)) {
      const name = m[1];
      if (excludeVocab.has(name)) continue;
      if (FOREIGN_OR_NON_TOOL_IDENTIFIERS.has(name)) continue;
      if (!refs.has(name)) refs.set(name, []);
      if (!refs.get(name)!.includes(rel)) refs.get(name)!.push(rel);
    }
  }
  return refs;
}

// ── main ─────────────────────────────────────────────────────────────────
async function main() {
  const allSnapNames = new Set<string>();
  let anyUpdated = false;

  for (const cfg of SERVERS) {
    console.log(c.bold(`MCP contract test — ${cfg.server}`) + c.dim(` (${cfg.url})`));

    let liveTools: ToolShape[] | null = null;
    let serverInfo = { name: "unknown", version: "unknown" };
    const client = makeClient(cfg.url);

    // ── live section ─────────────────────────────────────────────────────
    if (UPDATE || SMOKE || !OFFLINE) {
      section("1. live");
      if (!process.env.SECTOR137_API_KEY) {
        if (UPDATE || SMOKE) {
          console.log(c.red("  SECTOR137_API_KEY required for --update/--smoke. Aborting."));
          process.exit(2);
        }
        warn("SECTOR137_API_KEY not set — skipping live check (docs + skills still run)");
      } else {
        try {
          serverInfo = await client.handshake();
          ok(`connected: ${serverInfo.name} v${serverInfo.version}`);
          const raw = await client.listAllTools();
          liveTools = raw.map(normalize).sort((a, b) => a.name.localeCompare(b.name));
          ok(`server exposes ${liveTools.length} tools`);

          if (SMOKE && cfg === SERVERS[0]) {
            const stats = await client.rpc("tools/call", { name: "issues", arguments: { action: "stats" } });
            const txt = stats?.content?.[0]?.text ?? "";
            ok(`smoke issues(action:"stats") → ${txt.slice(0, 120)}`);
          }
        } catch (e: any) {
          fail(`${cfg.server}: live check failed: ${e.message}`);
        }
      }
    }

    // ── update mode ──────────────────────────────────────────────────────
    if (UPDATE) {
      if (!liveTools) {
        warn(`${cfg.server}: no successful live tool list — snapshot left untouched`);
      } else {
        const snap: Snapshot = {
          _provenance: "captured live via --update",
          capturedAt: new Date().toISOString(),
          protocolVersion: PROTOCOL_VERSION,
          server: serverInfo,
          tools: liveTools,
        };
        await writeSnapshot(cfg.snapshotPath, snap);
        console.log(
          c.green(`\n${cfg.server}: snapshot updated — ${liveTools.length} tools → ${cfg.snapshotPath.replace(REPO + "/", "")}`),
        );
        anyUpdated = true;
      }
      continue; // no diff/docs/skills checks to print per-server in update mode
    }

    const snapshot = await readSnapshot(cfg.snapshotPath);
    if (!snapshot) {
      fail(`${cfg.server}: no snapshot at ${cfg.snapshotPath}. Seed it: SECTOR137_API_KEY=… bun run test:mcp:update`);
      continue;
    }
    for (const t of snapshot.tools) allSnapNames.add(t.name);

    // live vs snapshot
    if (liveTools) {
      const { hard, soft } = diffSnapshot(liveTools, snapshot.tools);
      if (hard === 0 && soft === 0) ok(`${cfg.server}: live server matches snapshot exactly`);
      else if (hard === 0) ok(`${cfg.server}: live matches snapshot (${soft} description change(s) — soft)`);
    } else if (snapshot._provenance && !snapshot._provenance.startsWith("captured live")) {
      warn(`${cfg.server}: snapshot is seeded, not yet verified against live (${snapshot._provenance})`);
    }
  }

  if (UPDATE) {
    if (!anyUpdated) {
      console.log(c.red("\nCannot --update: no server had a successful live tool list."));
      process.exit(2);
    }
    return;
  }

  // ── docs section ───────────────────────────────────────────────────────
  // The servers expose more tools than the plugin documents (crew, dora, brands…), so
  // we enforce one direction: every tool the doc presents as a real tool (first
  // table-cell backtick / header) must exist in SOME configured snapshot.
  section("2. docs (references/mcp-tools.md → snapshots)");
  const docNames = await docToolNames();
  let docProblems = 0;
  for (const name of [...docNames].sort()) {
    if (!allSnapNames.has(name)) {
      fail(`mcp-tools.md documents \`${name}\` — not a real tool in any snapshot`);
      docProblems++;
    }
  }
  if (docProblems === 0) ok(`${docNames.size} documented tools all exist in a snapshot`);

  // ── skills section ─────────────────────────────────────────────────────
  section("3. skills (tool references ↔ snapshots)");
  const refs = await skillToolRefs();
  let skillProblems = 0;
  for (const [name, files] of [...refs].sort()) {
    if (!allSnapNames.has(name)) {
      fail(`mcp__sector137__${name} referenced but not a real tool — in: ${files.join(", ")}`);
      skillProblems++;
    }
  }
  if (skillProblems === 0) ok(`all ${refs.size} prefixed tool references exist in a snapshot`);

  const nonTool = await nonToolVocab();
  const bareRefs = await bareToolRefs(nonTool);
  let bareProblems = 0;
  for (const [name, files] of [...bareRefs].sort()) {
    if (!allSnapNames.has(name)) {
      fail(`` + `\`${name}\` referenced as a bare tool name but not a real tool in any snapshot — in: ${files.join(", ")}`);
      bareProblems++;
    }
  }
  if (bareProblems === 0) ok(`all ${bareRefs.size} bare tool-name references exist in a snapshot`);

  // ── verdict ────────────────────────────────────────────────────────────
  section("result");
  console.log(`  ${problems.length} problem(s), ${warnings.length} warning(s)`);
  const failed = problems.length > 0 || (STRICT && warnings.length > 0);
  if (failed) {
    console.log(c.red("\nCONTRACT FAILED"));
    process.exit(1);
  }
  console.log(c.green("\nContract OK"));
}

main().catch((e) => {
  console.error(c.red(`\nfatal: ${e.stack ?? e.message}`));
  process.exit(2);
});
