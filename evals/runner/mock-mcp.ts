// Mock MCP surface for the eval runner.
//   - toolDefs(): the plugin-driven tools from the contract-test snapshot, converted
//     to OpenAI function-calling defs. Named `mcp__sector137__<name>` so assertions
//     and skill instructions line up.
//   - makeExecutor(): returns canned responses from fixtures/responses.json, resolving
//     by `action` for the consolidated `issues`/`releases` tools.

import type { ToolCall } from "./types.ts";

const REPO = new URL("../..", import.meta.url).pathname.replace(/\/$/, "");
const SNAPSHOT = `${REPO}/tests/snapshots/mcp-tools.snapshot.json`;
const FIXTURES = `${import.meta.dirname}/fixtures/responses.json`;

const PREFIX = "mcp__sector137__";

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
 * The plugin only drives a handful of the server's ~79 tools. Detailed snapshot
 * entries (non-empty description) are exactly those; stubs are the rest. Expose
 * only the driven ones so the model isn't swamped with 79 irrelevant tools.
 */
export async function toolDefs(): Promise<OpenAiTool[]> {
  const snap = (await Bun.file(SNAPSHOT).json()) as { tools: SnapTool[] };
  return snap.tools
    .filter((t) => t.description && t.description.trim().length > 0)
    .map((t) => {
      const properties: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(t.properties)) properties[k] = jsonSchemaType(v);
      return {
        type: "function" as const,
        function: {
          name: `${PREFIX}${t.name}`,
          description: t.description,
          parameters: {
            type: "object",
            properties,
            required: t.required,
          },
        },
      };
    });
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
    const bare = call.name.startsWith(PREFIX) ? call.name.slice(PREFIX.length) : call.name;
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
