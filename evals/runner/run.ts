#!/usr/bin/env bun
/**
 * OpenRouter eval runner — a cheap regression harness for the crew skills.
 *
 * For each case it builds the skill context (SKILL.md body + inlined references),
 * exposes the mocked mcp__sector137__* tools (from the contract-test snapshot,
 * fixture-backed), runs a tool-calling loop over OpenRouter, and applies the
 * case assertions. `dualMode` cases run twice — once with MCP tools, once offline
 * with a roadmap fixture — proving the skill degrades gracefully.
 *
 * This tests PROMPT CONTENT on an arbitrary model with a mocked MCP — it is NOT
 * the real Claude Code harness. skill-creator runs inside Claude Code remain the
 * ground truth. Use this to catch regressions in wording, gates, and fallbacks.
 *
 * Usage:
 *   OPENROUTER_API_KEY=… bun evals/runner/run.ts [flags]
 * Flags:
 *   --case <id>         run one case
 *   --skill <name>      run all cases for a skill
 *   --mode mcp|offline|both   which legs to run (default: both — honours dualMode)
 *   --model <id>        OpenRouter model (default env OPENROUTER_MODEL or anthropic/claude-haiku-4.5)
 *   --concurrency <n>   parallel cases (default 3)
 *   --evals <path>      single evals file (default: merge evals.json + evals.runner.json)
 */

import type { EvalCase, EvalsFile, RunMode, RunResult } from "./types.ts";
import { loadSkill } from "./load-skill.ts";
import { toolDefs, makeExecutor } from "./mock-mcp.ts";
import { runLoop } from "./openrouter.ts";
import { evaluate } from "./assertions.ts";
import { printReport, writeArtifact } from "./report.ts";

const REPO = new URL("../..", import.meta.url).pathname.replace(/\/$/, "");

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const MODEL = arg("model", process.env.OPENROUTER_MODEL ?? "anthropic/claude-haiku-4.5")!;
const MODE = (arg("mode", "both") as RunMode | "both")!;
const CONCURRENCY = Number(arg("concurrency", "3"));
const EVALS_PATH = arg("evals"); // when set, use only this file
const CASE_FILTER = arg("case");
const SKILL_FILTER = arg("skill");

/**
 * Load test cases. By default merge the skill-creator suite (evals.json — text
 * assertions only, kept skill-creator-valid) with the runner suite
 * (evals.runner.json — tool-call, dual-mode, and offline cases). `--evals` pins
 * one file.
 */
async function loadCases(): Promise<EvalCase[]> {
  const files = EVALS_PATH ? [EVALS_PATH] : ["evals/evals.json", "evals/evals.runner.json"];
  const cases: EvalCase[] = [];
  for (const rel of files) {
    const f = Bun.file(`${REPO}/${rel}`);
    if (!(await f.exists())) {
      if (EVALS_PATH) throw new Error(`evals file not found: ${rel}`);
      continue; // runner file is optional
    }
    const parsed = (await f.json()) as EvalsFile;
    cases.push(...parsed.testCases);
  }
  return cases;
}

/** Decide which legs (modes) a case runs. */
function legs(c: EvalCase): RunMode[] {
  if (c.dualMode) {
    if (MODE === "mcp") return ["mcp"];
    if (MODE === "offline") return ["offline"];
    return ["mcp", "offline"];
  }
  // single-mode case: offline only if explicitly requested, else mcp
  if (MODE === "offline") return ["offline"];
  return ["mcp"];
}

async function runOne(c: EvalCase, mode: RunMode, apiKey: string, snapshotTools: Awaited<ReturnType<typeof toolDefs>>): Promise<RunResult> {
  const started = Date.now();
  const assertions = mode === "offline" && c.offlineAssertions ? c.offlineAssertions : c.assertions;
  try {
    const ctx = await loadSkill(c.skill, c.prompt, mode, c.fixtures?.roadmap);
    const execute = await makeExecutor(c.fixtures?.tools);
    const tools = mode === "mcp" ? snapshotTools : [];
    const loop = await runLoop({ system: ctx.systemPrompt, user: ctx.userPrompt, tools, execute, model: MODEL, apiKey });
    const results = assertions.map((a) => evaluate(a, loop.finalText, loop.toolCalls));
    return {
      caseId: c.id,
      skill: c.skill,
      mode,
      model: MODEL,
      passed: results.every((r) => r.pass),
      assertions: results,
      toolCalls: loop.toolCalls,
      finalText: loop.finalText,
      usage: loop.usage,
      durationMs: Date.now() - started,
    };
  } catch (e: any) {
    return {
      caseId: c.id,
      skill: c.skill,
      mode,
      model: MODEL,
      passed: false,
      assertions: [],
      toolCalls: [],
      finalText: "",
      usage: { prompt: 0, completion: 0 },
      durationMs: Date.now() - started,
      error: e.message,
    };
  }
}

/** Simple concurrency pool. */
async function pool<T>(items: T[], n: number, fn: (t: T) => Promise<RunResult>): Promise<RunResult[]> {
  const out: RunResult[] = [];
  let i = 0;
  const workers = Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  });
  await Promise.all(workers);
  return out;
}

async function main() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY is required. Get one at https://openrouter.ai/keys");
    process.exit(2);
  }

  let cases = (await loadCases()).filter((c) => !c.type || c.type === "normal");
  if (CASE_FILTER) cases = cases.filter((c) => c.id === CASE_FILTER);
  if (SKILL_FILTER) cases = cases.filter((c) => c.skill === SKILL_FILTER);
  if (!cases.length) {
    console.error(`No matching cases (case=${CASE_FILTER ?? "*"} skill=${SKILL_FILTER ?? "*"}).`);
    process.exit(2);
  }

  // Expand cases × legs into individual runs.
  const runs: Array<{ c: EvalCase; mode: RunMode }> = [];
  for (const c of cases) for (const mode of legs(c)) runs.push({ c, mode });

  const snapshotTools = await toolDefs();
  const snap = (await Bun.file(`${REPO}/tests/snapshots/mcp-tools.snapshot.json`).json()) as { capturedAt: string | null };

  console.log(`Running ${runs.length} run(s) across ${cases.length} case(s) · model ${MODEL} · concurrency ${CONCURRENCY}`);
  const results = await pool(runs, CONCURRENCY, ({ c, mode }) => runOne(c, mode, apiKey, snapshotTools));

  const { failed } = printReport(results, MODEL);
  const artifact = await writeArtifact(results, MODEL, snap.capturedAt);
  console.log(`\nArtifact: ${artifact}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(`fatal: ${e.stack ?? e.message}`);
  process.exit(2);
});
