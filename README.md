# Sal's Crew

> The record of what was shipped — and the crew that ships it.

**Sal's Crew** is a Claude Code plugin. It gives your editor a real delivery
pipeline: a conductor (Software Sal) plus five specialist agents that route
features, bugs, and chores from intake to shipped, with review gates along the
way. Every workflow is a `/sector137:` command.

It pairs with the hosted **sector137 MCP server** — the crew drives the pipeline
through it when connected, and falls back to a local `.sector137/roadmap.md`
when offline.

## Install

```
/plugin marketplace add sector137/crew
/plugin install sector137@sector137
```

The plugin bundles a `.mcp.json` pointing at `https://sector137.io/mcp`; Claude
Code offers to connect on first use (OAuth). Offline, everything except
`/sector137:prototype` works against a local `.sector137/roadmap.md`.

## The pipeline — `/sector137:` skills

| Group | Command | What it does |
|-------|---------|--------------|
| **Intake & plan** | `/sector137:add` | Quick-capture an issue; infers title, priority, category |
| | `/sector137:prioritize` | Kanban view, triage, scope into a release, audit |
| | `/sector137:plan` | Read the spec, explore code, produce an implementation plan |
| **Build & verify** | `/sector137:build` | Implement TDD-first; sub-tasks; human confirmation gate |
| | `/sector137:test` | Run the suite — unit / e2e / types / sdk / changed |
| | `/sector137:review` | Performance/quality pass; fixes issues directly |
| **Ship** | `/sector137:release` | Create a draft release |
| | `/sector137:scope` | Route issues into or out of the active release |
| | `/sector137:ship` | Publish — strict gate: scoped issues done, tests pass, you confirm |
| **Context & record** | `/sector137:whats-next` | Five ranked next actions from live state |
| | `/sector137:ask` | Ask Sal about the project, code, or roadmap |
| | `/sector137:note` | Timestamped notes on an issue |
| | `/sector137:issues` | Close issues out with completion notes (test-gated) |
| | `/sector137:continue` | Resume after a break — branch, active work, recent commits |
| | `/sector137:handoff` | Session summary + a ready next-session prompt |
| **Setup & meta** | `/sector137:init` | Initialize or sync a roadmap |
| | `/sector137:prototype` | Generate Gen wireframe prototypes (MCP only) |
| | `/sector137:sal` | The conductor — routes strategy into the pipeline |
| | `/sector137:update` | Self-update the plugin from source |
| | `/sector137:version` | Show / bump / changelog the plugin version |

## The crew — agents & sessions

Five specialists. Each is a **subagent** (delegate to it via the Task tool or
`@agent-…`) *and* has an **interactive session skill**:

| Agent | Session | Role |
|-------|---------|------|
| `product-margot` | `/sector137:margot` | Product — strategy, PRDs, market intel |
| `engineering-kael` | `/sector137:kael` | Engineering — architecture, quality, security, reliability |
| `design-wren` | `/sector137:wren` | Experience — UX research, design, taste authority |
| `sales-harlan` | `/sector137:harlan` | Customer — sales, GTM, positioning, accounts |
| `hr-mira` | `/sector137:mira` | Crew coach — retrospectives, telemetry, coaching |

Plus `/sector137:visual-prompt` for on-brand image-generation prompts.

Full character profiles live in [`.storyline/crew/`](.storyline/crew/).

## Feature flags

New user-facing features ship behind a flag by default, routed through
`@sector137/feature-flags` (two tiers — app-level and infra-level). Kael owns
the flag and tier; Sal tracks rollout and cleanup at `ship`. Convention:
[`shared/feature-flags.md`](shared/feature-flags.md).

## Layout

```
crew/
├── .claude-plugin/{plugin.json, marketplace.json}
├── .mcp.json                 # hosted sector137 MCP pairing
├── skills/                   # every /sector137: command (pipeline + persona + utility)
├── agents/                   # the 5 specialist subagents
├── references/               # pipeline knowledge base (MCP tools, modes, schema, voice)
├── shared/                   # crew conventions, doc structure, templates, workflows
├── hooks/                    # quality-gate + design-review + session hooks
├── .storyline/               # the character bible / world lore
├── evals/                    # skill-creator eval suite
└── CHANGELOG.md
```

## Evals

`evals/evals.json` is a [skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator)-format
suite guarding the pipeline invariants (gates, output structure, trigger
accuracy). See [`evals/README.md`](evals/README.md).

## Requirements

- Claude Code with plugin support.
- For the full pipeline: a `sector137` account / MCP connection (invite-only
  preview at [sector137.io](https://sector137.io)). Works offline against
  `.sector137/roadmap.md` without it.

## Development

`scripts/install.sh` symlinks the agents and registers the plugin from a local
clone — for hacking on the crew. For normal use, install from the marketplace.

Cutting a release: follow [`shared/releasing.md`](shared/releasing.md). In short,
sync the version across `plugin.json`, `marketplace.json`, and `package.json`
(`bun run lint:version`), move `CHANGELOG.md`'s `[Unreleased]` section under the new
version, then tag with `claude plugin tag --push`. Consumers update via
`/sector137:update`, which reads that changelog to show what changed.

## License

MIT
