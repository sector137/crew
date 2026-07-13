# Sal's Crew

> The record of what was shipped — and the crew that ships it.

**Sal's Crew** is a Claude Code plugin. It gives your editor a delivery pipeline: a
conductor (Software Sal) plus five specialist agents that route features, bugs, and
chores from intake to shipped, with review gates along the way. Every workflow is a
`/sector137:` command.

It pairs with the hosted **sector137 MCP server** — the crew drives the pipeline
through it when connected, and falls back to a local `.sector137/roadmap.md` when
offline. You can try the whole pipeline offline with no account.

---

## Get started

### 1. Install the plugin

The plugin installs into your shared `~/.claude`, so you do this once and it's
available in every Claude Code surface that shares that home.

**Terminal CLI, VS Code / JetBrains extension, or claude.ai/code** — type these in
the prompt input:

```
/plugin marketplace add sector137/crew
```
```
/plugin install sector137@sector137
```

**Desktop app** — no slash commands: click the **+** next to the prompt box →
**Plugins** → **Add plugin**, add the `sector137/crew` marketplace, then install
`sector137`.

Then apply it without restarting:

```
/reload-plugins
```

Browse, enable, or disable it anytime from the `/plugin` menu (Installed tab).

### 2. Connect the server (optional)

The plugin bundles a `.mcp.json` pointing at `https://app.sector137.io/mcp`. On your
first `/sector137:` command Claude Code offers to connect via OAuth — approve it and
the crew has live telemetry.

Running headless or in CI? Set an API key instead of OAuth: put `SECTOR137_API_KEY`
(an `rl_live_…` key from your dashboard) in `.mcp.json` under
`mcpServers.sector137.env`. Setup: https://docs.sector137.io/claude-code.

No server? Skip this step. Everything except `/sector137:prototype` works offline
against `.sector137/roadmap.md`.

### 3. Your first five minutes

```
/sector137:init          set up (or sync) the roadmap
/sector137:add           capture your first issue — Sal infers title, priority, category
/sector137:whats-next    get five ranked next actions from live state
/sector137:build         implement an issue, TDD-first, with a human confirmation gate
```

New here? Start at [docs.sector137.io/getting-started](https://docs.sector137.io/getting-started).
Or just type `/sector137:sal` and tell Sal your goal — he routes you to the right skill.

### Troubleshooting

- **Command not found after install** → run `/reload-plugins` (or restart the session).
- **"Can't authenticate" / auth error** → reconnect via OAuth, or set `SECTOR137_API_KEY`. See https://docs.sector137.io/claude-code.
- **On an old version** → `/sector137:update` shows the changelog delta and updates in place.
- **Two crews collide** (another plugin claims `/sector137:`) → `/sector137:update` names the shadowing install; disable the extra from the `/plugin` menu.

---

## The pipeline — `/sector137:` skills

| Group | Command | What it does |
|-------|---------|--------------|
| **Intake & plan** | `/sector137:add` | Quick-capture an issue; infers title, priority, category |
| | `/sector137:prioritize` | Kanban view, triage, scope into the release, audit |
| | `/sector137:plan` | Read the spec, explore code, produce an implementation plan |
| **Build & verify** | `/sector137:build` | Implement TDD-first; sub-tasks; human confirmation gate |
| | `/sector137:test` | Run the suite — unit / e2e / types / sdk / changed |
| | `/sector137:review` | Performance/quality pass; fixes issues directly |
| **Ship** | `/sector137:release` | Show and annotate the rolling active release |
| | `/sector137:scope` | Route issues into or out of the active release |
| | `/sector137:ship` | Cut the release — strict gate: scoped issues done, tests pass, you pick the version bump |
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

New user-facing features ship behind a flag by default (two tiers — app-level and
infra-level, using whatever flag mechanism your project already has). Kael owns the
flag and tier; Sal tracks rollout and cleanup at `ship`. Convention:
[`shared/feature-flags.md`](shared/feature-flags.md).

## Layout

```
crew/
├── .claude-plugin/{plugin.json, marketplace.json}
├── .mcp.json                 # hosted sector137 MCP pairing
├── skills/                   # every /sector137: command (pipeline + persona + utility)
├── agents/                   # the 5 specialist subagents
├── references/               # pipeline knowledge base (MCP tools, modes, schema, docs links)
├── shared/                   # crew conventions, doc structure, templates, workflows
├── hooks/                    # quality-gate + design-review + session hooks
├── tests/                    # MCP contract test + tool snapshot
├── evals/                    # skill-creator suite + OpenRouter runner
├── .storyline/               # the character bible / world lore
└── CHANGELOG.md
```

## Requirements

- Claude Code with plugin support.
- For the full pipeline: a `sector137` account / MCP connection (invite-only preview
  at [sector137.io](https://sector137.io)). Works offline against
  `.sector137/roadmap.md` without it.

## Contributing

Hacking on the plugin itself — running the tests, the eval harness, or cutting a
release? See [`CONTRIBUTING.md`](CONTRIBUTING.md). For normal use you never need it;
install from the marketplace and go.

## License

MIT
