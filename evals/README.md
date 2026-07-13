# Evals — Sal's Crew

Behavioural evals for the pipeline skills. They check the things that must stay true
no matter what: the right skill fires for the right request, the output keeps its
structure and Sal's voice, the review gates hold, the skills call the right MCP tools,
and they degrade gracefully when the server is down.

There are two tiers.

## Tier 1 — skill-creator (`evals.json`, the ground truth)

`evals.json` is a [skill-creator](https://github.com/anthropics/skills)-format suite.
Each case is `{ id, skill, prompt, assertions }`, where assertions are `contains` /
`containsKeyword` / `regex` over the model's response. It runs **inside Claude Code**,
against the real harness, so it is the ground truth for whether a skill behaves.

It is deliberately kept to text assertions only (no tool-call checks, no extra fields)
so it stays valid for skill-creator. It covers intake, planning, the build gates, the
ship gate, triage, context recovery, self-update, and each persona session.

Run it with the skill-creator plugin installed:

```
/plugin install skill-creator@claude-plugins-official
/reload-plugins
```

then ask Claude Code, e.g.:

> evaluate the `build` skill with skill-creator using evals/evals.json

skill-creator runs each case in an isolated subagent and writes `grading.json`,
`benchmark.json`, and an HTML report.

## Tier 2 — the OpenRouter runner (`evals.runner.json`, cheap regression)

`evals/runner/` is a self-contained harness that runs cases over
[OpenRouter](https://openrouter.ai). It exists to exercise the parts skill-creator
can't express cheaply: **which MCP tools a skill calls**, and **whether it degrades
when the server is down**.

It reads `evals.runner.json` (merged with `evals.json` by default) and adds three
things over the skill-creator format:

- **Tool assertions** — `toolCalled`, `toolNotCalled`, `toolArgs` (a regex over the
  call's JSON arguments). The mocked MCP surface comes from the contract-test snapshot
  (`tests/snapshots/mcp-tools.snapshot.json`); responses come from
  `evals/runner/fixtures/responses.json`.
- **`dualMode`** — the case runs twice: once with the `mcp__sector137__*` tools
  exposed, once offline with `evals/runner/fixtures/roadmap.md` inlined and no tools.
  This is the automated proof a skill works with **and** without the server.
- **`offlineAssertions`** — the assertions for the offline leg of a dual-mode case.

Run it:

```
OPENROUTER_API_KEY=YOUR_KEY bun run evals
OPENROUTER_API_KEY=YOUR_KEY bun run evals -- --skill ship
OPENROUTER_API_KEY=YOUR_KEY bun run evals -- --case whats-next-offline-still-answers --mode both
```

Flags: `--case <id>`, `--skill <name>`, `--mode mcp|offline|both`, `--model <id>`
(default `anthropic/claude-haiku-4.5`, or `OPENROUTER_MODEL`), `--concurrency <n>`,
`--evals <path>` (pin one file instead of merging). Results land in
`evals/results/<timestamp>.json` (gitignored).

### What the runner is NOT

The runner tests **prompt content on an arbitrary model with a mocked MCP** — it is
not the real Claude Code harness. There is no real Read/Bash/Task tool, no
skill-triggering layer, and the MCP responses are fixtures, not a live server. It
catches regressions in wording, gates, tool selection, and fallback instructions
cheaply and repeatably. When the runner and skill-creator disagree, **skill-creator is
right.** Real MCP side effects (actually creating and mutating issues and releases)
are out of scope for both — run those against a connected instance in a test project.

## The contract test feeds the mocks

`bun run test:mcp` (see `tests/mcp-contract.ts`) keeps the tool surface honest: it
diffs the live server against the snapshot, checks that `references/mcp-tools.md` and
every skill only reference real tools, and reseeds the snapshot with
`bun run test:mcp:update`. The runner's mocked tools are derived from that same
snapshot, so the two stay in step.

## Adding cases

Keep each case a single, checkable invariant. Prefer `regex`/`containsKeyword` over
brittle `contains` on exact prose — the skills are written in Sal's voice and the
wording drifts. Text-only cases go in `evals.json` (so skill-creator can run them);
cases that assert tool calls or offline behaviour go in `evals.runner.json`. When you
change a skill's structure, a gate, or a tool call, add or update the case that guards
it in the same commit.
