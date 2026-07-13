// Shared types for the OpenRouter eval runner.

export type Assertion =
  | { type: "contains"; text: string }
  | { type: "containsKeyword"; keyword: string }
  | { type: "regex"; pattern: string }
  | { type: "toolCalled"; tool: string }
  | { type: "toolNotCalled"; tool: string }
  | { type: "toolArgs"; tool: string; pattern: string };

export interface EvalCase {
  id: string;
  skill: string;
  prompt: string;
  assertions: Assertion[];
  /** Run twice: once with MCP tools exposed, once offline with a roadmap fixture. */
  dualMode?: boolean;
  /** Assertions for the offline leg (replaces `assertions` when present). */
  offlineAssertions?: Assertion[];
  /** Per-case fixture overrides. */
  fixtures?: {
    tools?: Record<string, unknown>;
    roadmap?: string;
  };
  /** Runner-only case types skill-creator skips (e.g. "routing"). Undefined = a normal case. */
  type?: string;
}

export interface EvalsFile {
  name: string;
  description: string;
  testCases: EvalCase[];
}

export interface ToolCall {
  name: string;
  args: Record<string, unknown>;
}

export interface AssertionResult {
  assertion: Assertion;
  pass: boolean;
  evidence: string;
}

export type RunMode = "mcp" | "offline";

export interface RunResult {
  caseId: string;
  skill: string;
  mode: RunMode;
  model: string;
  passed: boolean;
  assertions: AssertionResult[];
  toolCalls: ToolCall[];
  finalText: string;
  usage: { prompt: number; completion: number };
  durationMs: number;
  error?: string;
}
