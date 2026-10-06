# Sal's Crew

> The record of what was shipped — and the crew that ships it.

**Sal's Crew** is a Claude Code marketplace: one core plugin (`sector137`) plus four
domain plugins. The core plugin gives your editor a delivery pipeline: a conductor
(Software Sal) plus specialist agents that route features, bugs, and chores from intake
to shipped, with review gates along the way. Every core workflow is a `/sector137:`
command. The domain plugins add the specialists that need their own server.

### Migrating from 0.8.x: five skills and their agents moved

Breaking change in 0.9.0. Wren, Mira, Voss, Lyra, Rook, `prototype`, and `ux-walkthrough`
now live in domain plugins, so their names change. Install the plugin that carries what you use:

| Was | Now | Install |
|-----|-----|---------|
| `/sector137:wren`, agent `sector137:design-wren` | `/sector137-studio:wren`, `sector137-studio:design-wren` | `sector137-studio` |
| `/sector137:prototype` | `/sector137-studio:prototype` | `sector137-studio` |
| `/sector137:ux-walkthrough` | `/sector137-studio:ux-walkthrough` | `sector137-studio` |
| `/sector137:mira`, agent `sector137:navigator-mira` | `/sector137-crew:mira`, `sector137-crew:navigator-mira` | `sector137-crew` |
| `/sector137:voss`, agent `sector137:foundry-voss` | `/sector137-crew:voss`, `sector137-crew:foundry-voss` | `sector137-crew` |
| `/sector137:lyra`, agent `sector137:brand-lyra` | `/sector137-brand:lyra`, `sector137-brand:brand-lyra` | `sector137-brand` |
| `/sector137:rook`, agent `sector137:infra-rook` | `/sector137-ops:rook`, `sector137-ops:infra-rook` | `sector137-ops` |

```
/plugin install sector137-studio@sector137
```

Margot, Kael, Harlan, Sable, Sal, and every pipeline skill stay in `sector137` unchanged.

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

### 2. Connect the server (optional, but recommended per-project)

The plugin bundles a `.mcp.json` pointing at `https://app.sector137.io/mcp`. On your
first `/sector137:` command Claude Code offers to connect via OAuth — approve it and
the crew has live telemetry. This works with zero per-project setup.

**One naming quirk worth knowing about.** When the MCP server loads via the plugin's
bundled connection (the path above), Claude Code namespaces its tools under a longer,
plugin-prefixed form (`mcp__plugin_sector137_sector137__...`) rather than the short
`mcp__sector137__...` every skill in this repo is written against. Skills still work —
Sal resolves the actual tool name once per session (`references/mode-detection.md`) —
but you'll see one extra trust/permission prompt per session instead of an
auto-granted one. **Add a project-level `.mcp.json` to skip that**: at your project
root (gitignored, per-developer — don't commit it):

```json
{
  "mcpServers": {
    "sector137": { "type": "http", "url": "https://app.sector137.io/mcp" }
  }
}
```

`/sector137:init` offers to create this for you on first run if it's missing. Claude
Code will ask you to trust the new project MCP server the first time a tool call needs
it — approve it once.

Running headless or in CI? Use an API key (an `rl_live_…` key from your dashboard)
instead of interactive OAuth. The key goes in an `Authorization: Bearer` header — an `env`
block has no effect on an `http` server. Register it outside any committed file:

```
claude mcp add --transport http --scope local sector137 https://app.sector137.io/mcp --header "Authorization: Bearer YOUR_KEY"
```

Setup: https://docs.sector137.io/claude-code.

No server? Skip this step entirely. Everything except `/sector137-studio:prototype` works
offline against `.sector137/roadmap.md` (or `.sector137/state.json` on newer projects —
see `references/roadmap-schema.md`).

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
- **"Needs authentication"** → first check the server is actually up: `curl -s -o /dev/null -w '%{http_code}' https://app.sector137.io/mcp`. `401` means log in: `claude mcp login plugin:sector137:sector137` from a terminal. A `5xx` or no response means the server is down, and logging in won't help. See https://docs.sector137.io/claude-code.
- **OAuth redirects to `localhost` and just hangs/fails when Claude Code runs on a remote box** (SSH session, remote VM, container, devcontainer, etc.) accessed through a browser on a *different* machine → this is expected, not a bug on our end. The interactive OAuth flow starts a callback listener on `localhost` on whichever machine is running Claude Code; if your browser is on a separate machine, its "localhost" points at itself, not at the listener, so the redirect can never be caught. Two ways around it:
  - **Recommended:** skip OAuth — register the server with an API key header (see "Connect the server" above). This is the documented path for headless/CI use, and a remote box reached through a browser terminal counts as headless here.
  - Or forward the callback port over SSH so your browser's `localhost` actually reaches the remote listener, e.g. `ssh -L 3118:localhost:3118 user@remote-host`, then retry the `/sector137:` command for a fresh authorize link (an old/stale link's listener is already gone).
- **On an old version** → `/sector137:update` shows the changelog delta and updates in place.
- **Two crews collide** (another plugin claims `/sector137:`) → `/sector137:update` names the shadowing install; disable the extra from the `/plugin` menu.
- **Extra permission prompt every session for sector137 tools** → add a project `.mcp.json` (see "Connect the server" above) so tools load under the short name skills expect, instead of the plugin's longer namespaced form.

---

## The pipeline — `/sector137:` skills

| Group | Command | What it does |
|-------|---------|--------------|
| **Intake & plan** | `/sector137:add` | Quick-capture an issue; infers title, priority, category |
| | `/sector137:prioritize` | Kanban view, triage, scope into the release, audit |
| | `/sector137:plan` | Read the spec, explore code, produce an implementation plan |
| | `/sector137:decompose` | Break a big issue into sub-issues under the parent; work them one at a time |
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
| | `/sector137:sal` | The conductor — routes strategy into the pipeline |
| | `/sector137:update` | Self-update the plugin from source |
| | `/sector137:version` | Show / bump / changelog the plugin version |

## The crew — agents & sessions

Nine specialists. Each is a **subagent** (delegate to it via the Task tool or
`@agent-…`) *and* has an **interactive session skill**. Four live in the core plugin;
five ship in a domain plugin, which sets the namespace you type:

| Agent | Session | Plugin | Role |
|-------|---------|--------|------|
| `product-margot` | `/sector137:margot` | `sector137` | Product — strategy, PRDs, market intel |
| `engineering-kael` | `/sector137:kael` | `sector137` | Engineering — architecture, quality, security, reliability |
| `sales-harlan` | `/sector137:harlan` | `sector137` | Customer — sales, GTM, positioning, accounts |
| `finance-sable` | `/sector137:sable` | `sector137` | Finance — bookkeeping, CFO modeling, runway |
| `design-wren` | `/sector137-studio:wren` | `sector137-studio` | Experience — UX research, design, taste authority |
| `brand-lyra` | `/sector137-brand:lyra` | `sector137-brand` | Brand — identity, voice, design tokens |
| `infra-rook` | `/sector137-ops:rook` | `sector137-ops` | Platform — infra, GitOps, incident triage, reliability |
| `foundry-voss` | `/sector137-crew:voss` | `sector137-crew` | Foundry — agent creation, evaluation, calibration |
| `navigator-mira` | `/sector137-crew:mira` | `sector137-crew` | Navigator + coach — cross-project awareness, retrospectives |

Plus `/sector137:visual-prompt` for on-brand image-generation prompts.

Full character profiles live in [`.storyline/crew/`](.storyline/crew/).

## The domain plugins

Each domain plugin bundles its own MCP server, its skills and agents, and depends on
the core `sector137` plugin (Claude Code installs the dependency for you).

| Plugin | Adds | Server |
|--------|------|--------|
| [`sector137-studio`](plugins/sector137-studio/) | `/sector137-studio:wren`, `:prototype`, `:ux-walkthrough`; prototype, PRD and persona tools | `https://app.sector137.io/mcp/studio` |
| [`sector137-crew`](plugins/sector137-crew/) | `/sector137-crew:mira`, `:voss`; run-a-crew-member, proposal and conversation tools | `https://app.sector137.io/mcp/crew` |
| [`sector137-brand`](plugins/sector137-brand/) | `/sector137-brand:lyra`; brand system tools | `https://app.sector137.io/mcp/brand` |
| [`sector137-ops`](plugins/sector137-ops/) | `/sector137-ops:rook`; DORA, incident, deployment and initiative tools | `https://app.sector137.io/mcp/ops` |

Tool names follow Claude Code's plugin form, `mcp__plugin_<plugin>_<server>__<tool>`:
studio tools are `mcp__plugin_sector137-studio_studio__<tool>`.

## Feature flags

New user-facing features ship behind a flag by default (two tiers — app-level and
infra-level, using whatever flag mechanism your project already has). Kael owns the
flag and tier; Sal tracks rollout and cleanup at `ship`. Convention:
[`shared/feature-flags.md`](shared/feature-flags.md).

## Layout

```
crew/
├── .claude-plugin/{plugin.json, marketplace.json}
├── .mcp.json                 # hosted sector137 MCP pairing (core)
├── skills/                   # every /sector137: command (pipeline + core personas + utility)
├── agents/                   # the core specialist subagents
├── plugins/                  # sector137-studio, -crew, -brand, -ops (each its own plugin)
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
