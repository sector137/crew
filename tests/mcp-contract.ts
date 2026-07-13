#!/usr/bin/env bun
/**
 * MCP contract test — keeps the crew skills honest against the live sector137 MCP.
 *
 * What it checks (three independent sections):
 *   1. live  — speaks Streamable HTTP JSON-RPC to the server, lists tools, diffs
 *              them against tests/snapshots/mcp-tools.snapshot.json
 *   2. docs   — every tool named in references/mcp-tools.md exists in the snapshot,
 *              and vice versa (catches doc drift)
 *   3. skills — every mcp__sector137__<name> referenced anywhere in the plugin
 *              exists in the snapshot (catches a skill calling a dead tool)
 *
 * The live section needs SECTOR137_API_KEY; the docs and skills sections are
 * offline and always run. So `bun run test:mcp` is useful even with no key —
 * it still catches skill/doc drift against the checked-in snapshot.
 *
 * Usage:
 *   bun tests/mcp-contract.ts              full check, warns on description churn
 *   bun tests/mcp-contract.ts --strict     fail on any diff (release gate)
 *   bun tests/mcp-contract.ts --update      rewrite the snapshot from the live server
 *   bun tests/mcp-contract.ts --smoke       one read-only issues(action:"stats") call
 *   bun tests/mcp-contract.ts --offline     skip the live section (docs+skills only)
 *
 * Env:
 *   SECTOR137_API_KEY   Bearer token (rl_live_… or rl_mcp_…). Required for live/update/smoke.
 *   MCP_URL             override endpoint (default https://app.sector137.io/mcp)
 */

import { Glob } from "bun";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const SNAPSHOT_PATH = `${REPO}/tests/snapshots/mcp-tools.snapshot.json`;
const MCP_TOOLS_DOC = `${REPO}/references/mcp-tools.md`;
const MCP_URL = process.env.MCP_URL || "https://app.sector137.io/mcp";
const PROTOCOL_VERSION = "2025-03-26";

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
let rpcId = 0;
let sessionId: string | null = null;

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

  const res = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(bodyObj),
    signal: AbortSignal.timeout(30_000),
  });

  const sid = res.headers.get("Mcp-Session-Id");
  if (sid) sessionId = sid;

  if (res.status === 401) {
    throw new Error(
      `401 Unauthorized from ${MCP_URL}. Check SECTOR137_API_KEY (rl_live_… or rl_mcp_…). ` +
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
async function readSnapshot(): Promise<Snapshot | null> {
  const f = Bun.file(SNAPSHOT_PATH);
  if (!(await f.exists())) return null;
  return (await f.json()) as Snapshot;
}
async function writeSnapshot(snap: Snapshot): Promise<void> {
  await Bun.write(SNAPSHOT_PATH, JSON.stringify(snap, null, 2) + "\n");
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

/** Every mcp__sector137__<name> referenced across the plugin. */
async function skillToolRefs(): Promise<Map<string, string[]>> {
  const refs = new Map<string, string[]>();
  const glob = new Glob("{skills,agents,references,evals}/**/*.{md,json}");
  for await (const rel of glob.scan(REPO)) {
    const text = await Bun.file(`${REPO}/${rel}`).text();
    for (const m of text.matchAll(/mcp__sector137__([a-z][a-z0-9_]+)/g)) {
      const name = m[1];
      if (!refs.has(name)) refs.set(name, []);
      if (!refs.get(name)!.includes(rel)) refs.get(name)!.push(rel);
    }
  }
  return refs;
}

// ── main ─────────────────────────────────────────────────────────────────
async function main() {
  console.log(c.bold("MCP contract test") + c.dim(` — ${MCP_URL}`));

  let liveTools: ToolShape[] | null = null;
  let serverInfo = { name: "unknown", version: "unknown" };

  // ── live section ───────────────────────────────────────────────────────
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
        serverInfo = await handshake();
        ok(`connected: ${serverInfo.name} v${serverInfo.version}`);
        const raw = await listAllTools();
        liveTools = raw.map(normalize).sort((a, b) => a.name.localeCompare(b.name));
        ok(`server exposes ${liveTools.length} tools`);

        if (SMOKE) {
          const stats = await rpc("tools/call", { name: "issues", arguments: { action: "stats" } });
          const txt = stats?.content?.[0]?.text ?? "";
          ok(`smoke issues(action:"stats") → ${txt.slice(0, 120)}`);
        }
      } catch (e: any) {
        fail(`live check failed: ${e.message}`);
      }
    }
  }

  // ── update mode ────────────────────────────────────────────────────────
  if (UPDATE) {
    if (!liveTools) {
      console.log(c.red("\nCannot --update without a successful live tool list."));
      process.exit(2);
    }
    const snap: Snapshot = {
      _provenance: "captured live via --update",
      capturedAt: new Date().toISOString(),
      protocolVersion: PROTOCOL_VERSION,
      server: serverInfo,
      tools: liveTools,
    };
    await writeSnapshot(snap);
    console.log(c.green(`\nSnapshot updated: ${liveTools.length} tools → ${SNAPSHOT_PATH.replace(REPO + "/", "")}`));
    return;
  }

  const snapshot = await readSnapshot();
  if (!snapshot) {
    console.log(c.red(`\nNo snapshot at ${SNAPSHOT_PATH}. Seed it: SECTOR137_API_KEY=… bun run test:mcp:update`));
    process.exit(2);
  }
  const snapNames = new Set(snapshot.tools.map((t) => t.name));

  // live vs snapshot
  if (liveTools) {
    const { hard, soft } = diffSnapshot(liveTools, snapshot.tools);
    if (hard === 0 && soft === 0) ok("live server matches snapshot exactly");
    else if (hard === 0) ok(`live matches snapshot (${soft} description change(s) — soft)`);
  } else if (snapshot._provenance && !snapshot._provenance.startsWith("captured live")) {
    warn(`snapshot is seeded, not yet verified against live (${snapshot._provenance})`);
  }

  // ── docs section ───────────────────────────────────────────────────────
  // The server exposes ~77 tools (crew, dora, brands…); the plugin only documents
  // the handful it drives. So we enforce one direction: every tool the doc presents
  // as a real tool (first table-cell backtick) must exist in the snapshot.
  section("2. docs (references/mcp-tools.md → snapshot)");
  const docNames = await docToolNames();
  let docProblems = 0;
  for (const name of [...docNames].sort()) {
    if (!snapNames.has(name)) {
      fail(`mcp-tools.md documents \`${name}\` — not a real tool in the snapshot`);
      docProblems++;
    }
  }
  if (docProblems === 0) ok(`${docNames.size} documented tools all exist in snapshot`);

  // ── skills section ─────────────────────────────────────────────────────
  section("3. skills (mcp__sector137__* references ↔ snapshot)");
  const refs = await skillToolRefs();
  let skillProblems = 0;
  for (const [name, files] of [...refs].sort()) {
    if (!snapNames.has(name)) {
      fail(`mcp__sector137__${name} referenced but not a real tool — in: ${files.join(", ")}`);
      skillProblems++;
    }
  }
  if (skillProblems === 0) ok(`all ${refs.size} referenced tools exist in snapshot`);

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
