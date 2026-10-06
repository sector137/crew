// Mock MCP surface for the eval runner.
//   - toolDefs(): the plugin-driven tools from the contract-test snapshots, converted
//     to OpenAI function-calling defs. Work-server tools are named `mcp__sector137__<name>`
//     and studio-server tools `mcp__plugin_sector137-studio_studio__<name>`, so assertions
//     and skill instructions line up.
//   - makeExecutor(): returns canned responses from fixtures/responses.json, resolving
//     by `action` for the consolidated `issues`/`releases` tools.

import type { ToolCall } from "./types.ts";

const REPO = new URL("../..", import.meta.url).pathname.replace(/\/$/, "");
const SNAPSHOTS = [
  { file: `${REPO}/tests/snapshots/mcp-tools.sector137.json`, prefix: "mcp__sector137__" },
  { file: `${REPO}/tests/snapshots/mcp-tools.studio.json`, prefix: "mcp__plugin_sector137-studio_studio__" },
];
const FIXTURES = `${import.meta.dirname}/fixtures/responses.json`;

// The tools the eval cases drive. The snapshots carry every tool with a full
// description, so this list is what keeps the model from being swamped.
const DRIVEN = new Set([
  "ask_persona",
  "create_persona",
  "create_product",
  "delete_persona",
  "generate_prototype",
  "get_persona",
  "get_product_tags",
  "get_prototype",
  "issues",
  "list_boards",
  "list_persona_conversations",
  "list_personas",
  "list_products",
  "list_prototypes",
  "list_universes",
  "regenerate_prototype_step",
  "releases",
  "run_persona_scenario",
  "run_persona_survey",
  "update_persona",
]);

interface SnapTool {
  name: string;
  description: string;
  required: string[];
  properties: Record<string, string>;
}

function jsonSchemaType(t: string): Record<string, unknown> {
  if (t.startsWith("enum")) return { type: "string" };
  switch (t) {
    case "string":
      return { type: "string" };
    case "number":
      return { type: "number" };
    case "boolean":
      return { type: "boolean" };
    case "array":
      return { type: "array", items: {} };
    default:
      return {}; // union / unknown / object — permissive
  }
}

export interface OpenAiTool {
  type: "function";
  function: { name: string; description: string; parameters: Record<string, unknown> };
}

/**
 * The plugin only drives a handful of the servers' tools (DRIVEN above). Expose
 * only those so the model isn't swamped with irrelevant ones.
 */
export async function toolDefs(): Promise<OpenAiTool[]> {
  const out: OpenAiTool[] = [];
  for (const { file, prefix } of SNAPSHOTS) {
    const snap = (await Bun.file(file).json()) as { tools: SnapTool[] };
    out.push(...snap.tools.filter((t) => DRIVEN.has(t.name)).map((t) => {
      const properties: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(t.properties)) properties[k] = jsonSchemaType(v);
      return {
        type: "function" as const,
        function: {
          name: `${prefix}${t.name}`,
          description: t.description,
          parameters: {
            type: "object",
            properties,
            required: t.required,
          },
        },
      };
    }));
  }
  return out;
}

type FixtureValue = unknown | { byAction: Record<string, unknown>; default?: unknown };

function isByAction(v: FixtureValue): v is { byAction: Record<string, unknown>; default?: unknown } {
  return Boolean(v) && typeof v === "object" && v !== null && "byAction" in (v as object);
}

export interface Executor {
  (call: ToolCall): string;
}

/** Build an executor from the default fixtures, overlaid with per-case overrides. */
export async function makeExecutor(overrides?: Record<string, unknown>): Promise<Executor> {
  const base = (await Bun.file(FIXTURES).json()) as Record<string, FixtureValue>;
  const fixtures = { ...base, ...(overrides ?? {}) };

  return (call: ToolCall): string => {
    const prefix = SNAPSHOTS.find((s) => call.name.startsWith(s.prefix))?.prefix;
    const bare = prefix ? call.name.slice(prefix.length) : call.name;
    const fixture = fixtures[bare];

    if (fixture === undefined) {
      return JSON.stringify({ ok: true, _note: `no fixture for ${bare}; returning generic success` });
    }
    if (isByAction(fixture)) {
      const action = String((call.args as any)?.action ?? "");
      const resolved = fixture.byAction[action] ?? fixture.default ?? { ok: true };
      return JSON.stringify(resolved);
    }
    return JSON.stringify(fixture);
  };
}
