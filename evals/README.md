# Evals — Sal's Crew

Behavioural evals for the pipeline skills. They check the things that must stay
true no matter what: the right skill fires for the right request, the output
keeps its structure and Sal's voice, and the review gates hold.

## What's covered

`evals.json` is a [skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator)-format
suite. Each case is `{ id, skill, prompt, assertions }`, where assertions are
`contains` / `containsKeyword` / `regex` over the model's response.

The cases deliberately test **invariants that don't need a live
`sector137-mcp` connection**:

| Case | What it guards |
|------|----------------|
| `add-infers-metadata` | intake infers title, priority, and category from free text |
| `plan-produces-structure` | `plan` emits Files / Steps / Risks and hands off to `/sector137:build` |
| `build-never-marks-done` | `build` stops at the human gate and never sets `done` itself |
| `build-gates-behind-flag` | user-facing work ships behind a feature flag by default |
| `ship-enforces-strict-gate` | `ship` requires confirmation, a test pass, and all scoped issues done/cancelled |
| `whats-next-returns-five` | `whats-next` returns exactly five ranked actions |
| `review-fixes-not-just-reports` | `review` fixes issues directly rather than only reporting |
| `sal-routes-prd-into-pipeline` | the conductor turns strategy into an issue and routes to plan → build |

**Out of scope here:** MCP side effects (actually creating/mutating issues and
releases). Those need a connected instance — test them against a real
`sector137-mcp` in a staging project.

## Running them

With the [`skill-creator`](https://github.com/anthropics/claude-plugins-official)
plugin installed:

```
/plugin install skill-creator@claude-plugins-official
/reload-plugins
```

then ask Claude Code, e.g.:

> evaluate the `build` skill with skill-creator using evals/evals.json

skill-creator runs each case in an isolated subagent and writes:

- `grading.json` — pass/fail per case with the evidence it matched
- `benchmark.json` — pass rate, token count, and timing
- an HTML report for eyeballing

## Adding cases

Keep each case a single, checkable invariant. Prefer `regex`/`containsKeyword`
over brittle `contains` on exact prose — the skills are written in Sal's voice
and the wording will drift. When you change a skill's structure or a gate, add
or update the case that guards it in the same commit.
