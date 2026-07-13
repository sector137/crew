// Assertion evaluation. Text assertions run against the model's final message;
// tool assertions run against the recorded tool calls.

import type { Assertion, AssertionResult, ToolCall } from "./types.ts";

/**
 * Translate an inline-flag regex (`(?i)`, `(?s)`, `(?is)…`) — used by the existing
 * skill-creator evals — into a JS RegExp, since JS has no inline flag groups.
 */
function compile(pattern: string): RegExp {
  const m = pattern.match(/^\(\?([a-z]+)\)/);
  let flags = "";
  let body = pattern;
  if (m) {
    if (m[1].includes("i")) flags += "i";
    if (m[1].includes("s")) flags += "s";
    if (m[1].includes("m")) flags += "m";
    body = pattern.slice(m[0].length);
  }
  return new RegExp(body, flags);
}

function truncate(s: string, n = 100): string {
  const one = s.replace(/\s+/g, " ").trim();
  return one.length > n ? one.slice(0, n) + "…" : one;
}

export function evaluate(a: Assertion, finalText: string, toolCalls: ToolCall[]): AssertionResult {
  switch (a.type) {
    case "contains": {
      const pass = finalText.includes(a.text);
      return { assertion: a, pass, evidence: pass ? `found "${a.text}"` : `missing "${a.text}"` };
    }
    case "containsKeyword": {
      const pass = finalText.toLowerCase().includes(a.keyword.toLowerCase());
      return { assertion: a, pass, evidence: pass ? `found "${a.keyword}"` : `missing "${a.keyword}"` };
    }
    case "regex": {
      let re: RegExp;
      try {
        re = compile(a.pattern);
      } catch (e: any) {
        return { assertion: a, pass: false, evidence: `bad regex: ${e.message}` };
      }
      const pass = re.test(finalText);
      return { assertion: a, pass, evidence: pass ? `matched /${a.pattern}/` : `no match /${a.pattern}/` };
    }
    case "toolCalled": {
      const hit = toolCalls.filter((c) => c.name === a.tool);
      const pass = hit.length > 0;
      return {
        assertion: a,
        pass,
        evidence: pass ? `${a.tool} called ${hit.length}×` : `${a.tool} never called (calls: ${callNames(toolCalls)})`,
      };
    }
    case "toolNotCalled": {
      const hit = toolCalls.filter((c) => c.name === a.tool);
      const pass = hit.length === 0;
      return { assertion: a, pass, evidence: pass ? `${a.tool} not called` : `${a.tool} called ${hit.length}× (should not)` };
    }
    case "toolArgs": {
      let re: RegExp;
      try {
        re = compile(a.pattern);
      } catch (e: any) {
        return { assertion: a, pass: false, evidence: `bad regex: ${e.message}` };
      }
      const calls = toolCalls.filter((c) => c.name === a.tool);
      const match = calls.find((c) => re.test(JSON.stringify(c.args)));
      const pass = Boolean(match);
      return {
        assertion: a,
        pass,
        evidence: pass
          ? `${a.tool} args matched /${a.pattern}/ → ${truncate(JSON.stringify(match!.args))}`
          : `no ${a.tool} call with args matching /${a.pattern}/ (${calls.length} call(s))`,
      };
    }
    default:
      return { assertion: a as Assertion, pass: false, evidence: `unknown assertion type` };
  }
}

function callNames(toolCalls: ToolCall[]): string {
  if (!toolCalls.length) return "none";
  return toolCalls.map((c) => c.name).join(", ");
}
