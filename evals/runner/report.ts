// Report: a compact stdout table + a JSON artifact under evals/results/.

import type { RunResult } from "./types.ts";

const REPO = new URL("../..", import.meta.url).pathname.replace(/\/$/, "");

const c = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

export function printReport(results: RunResult[], model: string): { passed: number; failed: number } {
  console.log(`\n${c.bold("Eval results")} ${c.dim(`(model: ${model})`)}\n`);
  let passed = 0;
  let failed = 0;

  for (const r of results) {
    const tag = r.passed ? c.green("PASS") : c.red("FAIL");
    const mode = r.mode === "offline" ? c.dim("[offline]") : c.dim("[mcp]    ");
    console.log(`${tag} ${mode} ${r.caseId}`);
    if (r.error) console.log(`       ${c.red("error:")} ${r.error}`);
    if (!r.passed) {
      for (const a of r.assertions.filter((x) => !x.pass)) {
        console.log(`       ${c.red("✗")} ${a.assertion.type}: ${a.evidence}`);
      }
    }
    r.passed ? passed++ : failed++;
  }

  const total = results.length;
  const tokens = results.reduce((n, r) => n + r.usage.prompt + r.usage.completion, 0);
  console.log(
    `\n${c.bold("Summary:")} ${passed}/${total} passed` +
      (failed ? c.red(`, ${failed} failed`) : "") +
      c.dim(` · ~${tokens.toLocaleString()} tokens`),
  );
  return { passed, failed };
}

export async function writeArtifact(results: RunResult[], model: string, snapshotCapturedAt: string | null): Promise<string> {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const path = `evals/results/${stamp}.json`;
  await Bun.write(
    `${REPO}/${path}`,
    JSON.stringify(
      {
        ranAt: new Date().toISOString(),
        model,
        snapshotCapturedAt,
        summary: {
          total: results.length,
          passed: results.filter((r) => r.passed).length,
          failed: results.filter((r) => !r.passed).length,
        },
        results,
      },
      null,
      2,
    ) + "\n",
  );
  return path;
}
