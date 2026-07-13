// OpenRouter chat-completions client with a tool-calling loop.

import type { ToolCall } from "./types.ts";
import type { Executor, OpenAiTool } from "./mock-mcp.ts";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const MAX_ROUNDS = 8;

interface Message {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_calls?: Array<{ id: string; type: "function"; function: { name: string; arguments: string } }>;
  tool_call_id?: string;
}

export interface LoopResult {
  finalText: string;
  toolCalls: ToolCall[];
  usage: { prompt: number; completion: number };
}

export async function runLoop(opts: {
  system: string;
  user: string;
  tools: OpenAiTool[];
  execute: Executor;
  model: string;
  apiKey: string;
}): Promise<LoopResult> {
  const messages: Message[] = [
    { role: "system", content: opts.system },
    { role: "user", content: opts.user },
  ];
  const toolCalls: ToolCall[] = [];
  let promptTokens = 0;
  let completionTokens = 0;

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const body: Record<string, unknown> = {
      model: opts.model,
      messages,
      temperature: 0,
    };
    if (opts.tools.length) {
      body.tools = opts.tools;
      body.tool_choice = "auto";
    }

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/sector137/crew",
        "X-Title": "sector137-crew-evals",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`OpenRouter ${res.status}: ${txt.slice(0, 300)}`);
    }
    const data = await res.json();
    if (data.usage) {
      promptTokens += data.usage.prompt_tokens ?? 0;
      completionTokens += data.usage.completion_tokens ?? 0;
    }
    const choice = data.choices?.[0];
    const msg = choice?.message;
    if (!msg) throw new Error("OpenRouter: no message in response");

    // Record the assistant turn.
    messages.push({ role: "assistant", content: msg.content ?? null, tool_calls: msg.tool_calls });

    if (msg.tool_calls && msg.tool_calls.length > 0) {
      for (const tc of msg.tool_calls) {
        let args: Record<string, unknown> = {};
        try {
          args = tc.function.arguments ? JSON.parse(tc.function.arguments) : {};
        } catch {
          args = { _raw: tc.function.arguments };
        }
        const call: ToolCall = { name: tc.function.name, args };
        toolCalls.push(call);
        const result = opts.execute(call);
        messages.push({ role: "tool", tool_call_id: tc.id, content: result });
      }
      continue; // let the model react to tool results
    }

    // No tool calls → final answer.
    return {
      finalText: msg.content ?? "",
      toolCalls,
      usage: { prompt: promptTokens, completion: completionTokens },
    };
  }

  // Ran out of rounds — return whatever text we last had.
  const lastText = [...messages].reverse().find((m) => m.role === "assistant" && m.content)?.content ?? "";
  return { finalText: lastText ?? "", toolCalls, usage: { prompt: promptTokens, completion: completionTokens } };
}
