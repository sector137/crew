# Sector137 — Sal's Crew

Software Sal — Pipeline Conductor of Sector 137. A Claude Code plugin (`sector137`) that provides 17 workflow skills and 40+ MCP tools for managing the full software delivery lifecycle.

Sal is a genius systems engineer born on The Other Side — native to a universe where every problem is solved by software. He was drawn through the black hole by the noise of human software development. Now he takes in Deltas (features, bugs, improvements, chores), routes them through his crew (Margot, Kael, Wren, Harlan), and ships. When work ships, everyone who needs to know, knows. That's not a promise — that's a specification.

> *"Every problem is a system. Every system can be optimized. Every optimization brings us closer to the other side."*

## Installation

The plugin is installed as part of the [Sector137](https://github.com/ohmatey/ohwhatajourney) monorepo at `packages/agent-system`.

### Requirements

- [Claude Code](https://claude.ai/claude-code) with plugin support
- Node.js (for MCP server)
- Bun (for running tests and type checks)
- Git

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SECTOR137_API_URL` | No | `http://localhost:3000` | API endpoint for the Sector137 server |
| `SECTOR137_API_KEY` | Yes (for MCP mode) | — | API key for authentication |

Set these in your environment or `.env` file. Without `SECTOR137_API_KEY`, Sal falls back to local-only mode using `.can/roadmap.md`.

## How It Works

Sal operates in two modes, detected automatically:

- **MCP Mode** — Connected to the Sector137 API via the `sector137-mcp` package. Full access to 40+ tools for issues, releases, personas, prototypes, and more.
- **Local Mode** — Offline fallback. Reads and writes `.can/roadmap.md` with `#local-N` IDs. All workflows except `prototype` work offline. Run `/sector137:init --sync` when back online to push local items to the server.

## Skills

Every skill is a Claude Code slash command invoked as `/sector137:<skill>`. Each skill is a self-contained workflow defined in `playbooks/<name>/SKILL.md`.

### Pipeline Lifecycle

| Skill | Command | Description |
|-------|---------|-------------|
| **init** | `/sector137:init` | Initialize or sync a project roadmap. Imports existing roadmap files, creates from scratch, or syncs local items to the server. |
| **add** | `/sector137:add <description>` | Quick-capture a new issue. Infers category and priority from natural language. |
| **prioritize** | `/sector137:prioritize` | Organize and triage the roadmap. Kanban view, inbox triage, release scoping, imbalance detection. |
| **plan** | `/sector137:plan <issue>` | Read a spec, explore the codebase, produce a concrete implementation plan with files, steps, and risks. |
| **test** | `/sector137:test [mode]` | Run the test suite. Modes: `unit`, `e2e`, `types`, `sdk`, `all`, `changed`. |
| **review** | `/sector137:review` | Performance review of staged/changed files. Fixes issues directly instead of just reporting them. |
| **release** | `/sector137:release <version>` | Create a draft release. |
| **scope** | `/sector137:scope <issues>` | Move issues into or out of the active release. |
| **ship** | `/sector137:ship` | Publish the active release. Strict gate: all scoped issues must be done/cancelled, tests must pass, user must confirm. |

### Context & Navigation

| Skill | Command | Description |
|-------|---------|-------------|
| **whats-next** | `/sector137:whats-next` | Generate 5 prioritized next actions from the live roadmap, recent commits, and codebase TODOs. |
| **ask** | `/sector137:ask <question>` | Ask Sal anything about the project, codebase, roadmap, or architecture. |
| **issues** | `/sector137:issues <ids>` | Mark issues as done with completion notes. Runs a test gate before marking. |
| **note** | `/sector137:note <issue> <text>` | Add a timestamped note to a roadmap item. |
| **prototype** | `/sector137:prototype <issue>` | Generate AI wireframe prototypes using the Gen engine. MCP-only. |

### Session Management

| Skill | Command | Description |
|-------|---------|-------------|
| **continue** | `/sector137:continue` | Resume work after a break. Shows current branch, active issues, recent commits, and errors. |
| **handoff** | `/sector137:handoff` | Generate a session summary and copy-paste-ready prompt for the next session. |
| **update** | `/sector137:update` | Self-update the plugin from the source repo. |

## Architecture

```
conductor-sal/
├── README.md
├── package.json
├── references/              # Knowledge base
│   ├── formatting.md        # Sal's voice, output templates
│   ├── mcp-tools.md         # Complete MCP tool inventory (40+ tools)
│   ├── mode-detection.md    # MCP vs offline operation
│   └── roadmap-schema.md    # .can/roadmap.md format spec
└── playbooks/               # 17 workflow playbooks
    ├── add/SKILL.md
    ├── ask/SKILL.md
    ├── continue/SKILL.md
    ├── handoff/SKILL.md
    ├── init/SKILL.md
    ├── issues/SKILL.md
    ├── note/SKILL.md
    ├── plan/SKILL.md
    ├── prioritize/SKILL.md
    ├── prototype/SKILL.md
    ├── release/SKILL.md
    ├── review/SKILL.md
    ├── scope/SKILL.md
    ├── ship/SKILL.md
    ├── test/SKILL.md
    ├── update/SKILL.md
    └── whats-next/SKILL.md
```

> The plugin manifest (`.claude-plugin/plugin.json`), crew agents, `hooks/`, `shared/`,
> and top-level `skills/` live one level up in the `agent-system/` package.

## MCP Tools

When connected to the Sector137 API, Sal has access to 40+ tools via the `sector137-mcp` package:

| Domain | Tools | Examples |
|--------|-------|---------|
| Issues | 12 | `create_issue`, `update_issue`, `get_issues_by_status`, `bulk_update_status` |
| Releases | 7 | `create_release`, `publish_release`, `get_active_release` |
| Notes | 4 | `add_issue_note`, `list_issue_notes`, `update_issue_note` |
| Tasks | 5 | `create_issue_task`, `complete_issue_task`, `list_issue_tasks` |
| Prototypes | 4 | `generate_prototype`, `regenerate_prototype_step`, `get_prototype` |
| Personas | 9 | `create_persona`, `ask_persona`, `run_persona_survey` |

Full reference: `references/mcp-tools.md`

## Data Model

### Issue Statuses

`inbox` &rarr; `open` &rarr; `active` &rarr; `done` / `cancelled`

### Issue Categories

`feature` | `improvement` | `bug` | `chore`

### Issue Priorities

`low` | `medium` | `high`

### Releases

Releases start as drafts and are published via `/sector137:ship`. One active draft is recommended. Each release contains scoped issues linked by `releaseId`.

## Offline Mode

When the MCP server is unavailable, Sal falls back to `.can/roadmap.md`:

```markdown
---
project: "My Project"
syncedAt: null
---

# Roadmap

## Active Release: v0.1.0

- **Dark mode support** `active` `medium` `feature` #local-1

## Backlog

- **Fix login timeout** `open` `high` `bug` #local-2

## Inbox

- **Add export to CSV** `inbox` `low` `feature` #local-3

## Done

- **Setup CI pipeline** `done` `medium` `chore` #server-abc123
```

Items created offline get `#local-N` IDs. Run `/sector137:init --sync` to push them to the server and get permanent IDs.

## Design Principles

- **Human-in-the-loop gates.** Ship requires confirmation. Build requires confirmation before marking done. No silent auto-operations. *"This requires a human."*
- **TDD-first.** Build writes tests before code. Tests must pass before completion. *"If it's not tested, it didn't ship."*
- **Offline-capable.** Every workflow except prototype has a local fallback. *"The signal's weak but I can still navigate."*
- **MCP-first.** Cloud-backed when available for real-time sync across sessions.
- **Sal's voice.** First person, technical, direct. Results over narration. Humor from observation, never from mockery. Pipeline states (FLOWING, CONSTRAINED, DEGRADED, HALTED) shift the tone.
- **The Record is permanent.** Every Release, every override, every decision. The black hole only goes one direction.

## License

MIT
