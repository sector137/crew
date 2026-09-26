# Changelog

All notable changes to the Sal's Crew plugin (`sector137`) are documented here.
This project follows [semantic versioning](https://semver.org/).

## [Unreleased]

## [0.7.0] — Fixes from real use

Driven by an audit of 493 sessions in one heavy-use project (2026-07-20 → 09-26): the
plugin was active in 5.5% of them, the MCP was unreachable for 27 days under a misleading
label, and every offline fallback pointed at a file the project never had.

### Changed
- **Offline fallback prefers `.sector137/state.json`.** The canonical fallback line (11
  skills + `references/mode-detection.md`) now reads `state.json` if it exists, else
  `roadmap.md`. Local Mode Rules document writing `state.json` directly, and
  `/sector137:init` Step 3C never creates `roadmap.md` beside an existing `state.json`.
  Before this, sessions probed for `roadmap.md` and found nothing, and init's local mode
  would have created a competing second roadmap.
- **Outage vs auth.** Mode detection probes `https://app.sector137.io/mcp` before blaming
  auth: `401` → `claude mcp login plugin:sector137:sector137`; `5xx`/timeout → server down,
  logging in won't help. Claude Code shows "needs authentication" for both; the two
  probed cases in the audit were both outages.
- **`allowed-tools` lists both tool-name forms** (`mcp__sector137__X` and
  `mcp__plugin_sector137_sector137__X`) in the 9 skills that name MCP tools, so
  pre-approval works whether the server loads via the plugin or a project `.mcp.json`.
  `tests/mcp-contract.ts` validates both forms.
- **Agent descriptions trimmed** to their lead paragraph — the `<example>` blocks are gone.
  Always-on cost falls from ~7.7K to ~4.6K tokens per session (`claude plugin details`).
- **Wrap-up fast path.** `/sector137:sal wrap this session` (and "clean up this session")
  goes straight to `handoff`. This was Sal's most common real request. `handoff`'s
  triggers include both phrasings.

- **Product-scoped reads.** `issues` `list`/`stats` can't be filtered to one product and
  were returning several products' issues mixed together. `mode-detection.md` now routes
  roadmap reads through `export_state {productId}`, using the product bound in `state.json`.
- **`/sector137:init` state sync, corrected.** The "known server bug" (`MISSING_DOCUMENT`)
  was a client document in the wrong shape. Step 0B now builds the document from
  `export_state` output (`{data, meta}` entities, all required top-level fields). The
  fallback is `bulk_create` in batches of 10, with a checkpoint after each batch. After
  importing history, init offers to publish a baseline release, because imported issues,
  completed ones included, land on the active release and can't be detached.

### Removed
- **Unwired the pre-commit quality gate, UI-change tracker and session-stop summary
  hooks.** Plain stdout from PreToolUse/PostToolUse/Stop hooks never reaches the model,
  and 422 design-review nudges produced 0 reviews. The scripts stay in `hooks/` for anyone
  who wants to wire them. The SessionStart update check stays.

### Fixed
- **API-key setup.** README and `mode-detection.md` told headless users to put
  `SECTOR137_API_KEY` under `mcpServers.sector137.env`, which does nothing for an `http`
  server. The key goes in an `Authorization: Bearer` header; the README now registers it
  with `claude mcp add --header` at local scope, outside any committed file.

## [0.6.0] — Project setup and state sync

### Added
- **`/sector137:init` supports `.sector137/state.json` projects.** New Step 0 detects
  the newer JSON local-state format (a full `StateDocument`, round-trips with
  `export_state`/`sync_state`/`import_state`) alongside the existing
  `.sector137/roadmap.md` markdown flow, binds the project to a server-side product,
  and bulk-syncs instead of creating issues one at a time. Falls back to a per-issue
  `create` loop if the bulk sync tool errors, with a status-word mapping table for
  older ad-hoc `state.json` files (`"done"`/`"open"` → the server's status enum).
- **`references/mcp-tools.md` documents the bulk State Sync tools** (`export_state`,
  `sync_state`, `import_state`) for the first time, including a known-issue note for a
  reproduced `sync_state` server error (`MISSING_DOCUMENT`) so sessions don't waste
  time re-discovering it.

### Fixed
- **Tool-name resolution when the plugin's bundled MCP connection loads without a
  project-level `.mcp.json`.** Claude Code namespaces tools differently in that case
  (`mcp__plugin_sector137_sector137__...` instead of the `mcp__sector137__...` every
  skill is written against). `references/mode-detection.md` and `skills/init/SKILL.md`
  now resolve the actual tool name once per session instead of treating the mismatch
  as "MCP unavailable," and `/sector137:init` offers to write a project `.mcp.json` to
  avoid the extra resolution step on future sessions. README's "Connect the server"
  section explains the quirk and the fix up front.

## [0.5.0] — UX walkthrough

### Added
- **`/sector137:ux-walkthrough`.** Drives a real browser step-by-step through a user
  flow (from a natural-language description, a saved flow in `.sector137/ux-flows/`,
  or a prototype blueprint), captures neutral per-step UX evidence, then hands it to
  `design-wren` for a severity-ranked UX report. Flows can be saved and re-run as
  repeatable UX regression checks.

## [0.4.0] — The full crew

### Added
- **Four more specialists — the crew reaches nine.** `brand-lyra` (`/sector137:lyra`,
  brand identity and voice), `infra-rook` (`/sector137:rook`, platform, GitOps, and
  incident triage), `finance-sable` (`/sector137:sable`, bookkeeping and CFO modeling),
  and `foundry-voss` (`/sector137:voss`, agent creation and calibration) join product,
  design, engineering, and sales. Each ships as a subagent plus an interactive session
  skill and a `.storyline/crew/` profile, matching the existing crew's shape.
- **`navigator-mira` replaces `hr-mira`.** Mira grows from Crew Coach to Navigator and
  Crew Coach — cross-project situational awareness and risk surfacing on top of the
  retrospective, telemetry, and coaching work. Her `/sector137:mira` session and
  `.storyline/crew/mira.md` profile move with her.
- **`/sector137:decompose` skill.** Break a big issue into sub-issues, batch-create
  them under the parent, and work them one at a time — it proposes the breakdown for
  approval and never closes the parent for you. `references/mcp-tools.md` grows to
  document the board and tag tools.
- **MCP contract test + tool snapshot.** `tests/mcp-contract.ts` (`bun run test:mcp`)
  speaks Streamable HTTP JSON-RPC to the live server, diffs its tools against
  `tests/snapshots/mcp-tools.snapshot.json`, and — even with no key — verifies that
  every tool named in `references/mcp-tools.md` and referenced in a skill actually
  exists. `bun run test:mcp:update` reseeds the snapshot from the live server.
- **OpenRouter eval runner.** `evals/runner/` runs cases over OpenRouter with mocked,
  fixture-backed MCP tools. Adds tool-call assertions (`toolCalled` / `toolNotCalled`
  / `toolArgs`) and `dualMode` — each MCP-dependent case runs once online and once
  offline, proving graceful degradation. New cases live in `evals.runner.json`;
  `evals.json` stays skill-creator-pure. Coverage went from 9 to 24 of 26 skills.
- **Docs-link registry + checker.** `references/docs-links.md` is the single source of
  truth for every `docs.sector137.io` URL the crew cites; `scripts/link-check.sh`
  (`bun run lint:links`) verifies each resolves and that no file invents an
  unregistered link. Skills now cite the docs site at the points users hit walls.
- **`bun run lint:plugin`** runs `claude plugin validate . --strict` (skipped with a
  note when the CLI is absent) and is wired into `bun run lint`.

- **Release log + self-update tooling.** `CHANGELOG.md` is now the machine-readable
  release log (canonical `## [X.Y.Z] — Title` headings). `scripts/changelog.sh`
  extracts the notes between two versions; `scripts/version-check.sh`
  (`bun run lint:version`) asserts `plugin.json`, `marketplace.json`, and
  `package.json` agree. Git tags via `claude plugin tag` are the release event.
  Runbook: `shared/releasing.md`.
- **SessionStart update-check hook** (`hooks/check-plugin-update.sh`). Reads local
  plugin state only (no network), throttled once per 24h, and nudges when a
  marketplace install is behind. Silent on local dev checkouts.

### Changed
- **Skills retargeted to the live MCP surface.** The server consolidated its granular
  issue/note/task tools into one `issues` action-dispatch tool and its release tools
  into one `releases` tool, and renamed `projects` to `products`. Every skill,
  `references/mcp-tools.md`, and `skills/sal`'s `allowed-tools` now use the
  consolidated form (`issues` with `action: "create"`, etc.). A skill referencing a
  dead tool is now caught by `bun run test:mcp`.
- **Issue status vocabulary migrated** from `inbox/open/active/done` to the server's
  `backlog/planned/in_progress/completed/cancelled`, across every skill and the
  offline `.sector137/roadmap.md` schema, so online and offline speak one vocabulary.
- **Rolling release model.** The server dropped draft-release creation — one active
  release always exists and `publish` cuts it with a version bump. `/sector137:release`
  now shows and annotates the active release (it no longer creates one),
  `/sector137:ship` publishes with a `major`/`minor`/`patch` bump, and `/sector137:scope`
  routes issues onto the rolling release.
- **MCP endpoint fixed** in `.mcp.json`: `https://app.sector137.io/mcp` (was the
  apex `sector137.io/mcp`), matching the server, CLI, and docs.
- **Offline fallback standardized.** Every MCP skill carries one canonical fallback
  line citing `references/mode-detection.md`; `release`, `scope`, and `ship` gained
  full offline behaviour (they had none). `references/mode-detection.md` documents the
  offline release semantics.
- **README rewritten for first-time users** — per-client install (CLI, desktop, IDE,
  web), a first-five-minutes walkthrough, an offline callout, and troubleshooting.
- **`/sector137:update`** refreshes the marketplace clone before comparing versions,
  so it no longer reads a stale catalog.
- **Hooks are now plugin-native.** Every command in `hooks/hooks.json` resolves
  against `${CLAUDE_PLUGIN_ROOT}` instead of `~/.claude/hooks/`, and `install.sh`
  no longer symlinks hooks (it cleans up any it created). Previously the commands
  pointed at a `~/.claude/hooks/` directory that marketplace installs never
  populated, so every hook silently did nothing. Now wired: the update-check,
  the pre-commit quality gate, the UI-change and session-stop nudges. The two
  hooks that bind to a specific external CLI — `rtk-rewrite.sh` (rtk) and
  `gemini-qa-on-todo-complete.sh` (Gemini, which also spends API budget and runs
  the test suite) — stay in `hooks/` but are left unwired, so installers opt into
  those tools deliberately rather than by default.
- **`/sector137:update` rewritten.** Detects install mode (marketplace vs local
  checkout), shows the changelog delta, and warns when a duplicate install shadows
  the `/sector137:` namespace. It updates via `claude plugin update` for marketplace
  installs instead of assuming a git checkout.
- **`/sector137:version` fixed.** Corrected the stale `~/.claude` paths and the
  hardcoded example version, aligned the CHANGELOG heading format, added a `check`
  subcommand, and routed `bump` through `claude plugin tag`.
- **Version numbers synced to 0.3.0** across `plugin.json`, `marketplace.json`, and
  `package.json` (they had drifted to 0.2.0 / 0.2.0 / 0.1.0).
- **Local state path renamed**: `.can/roadmap.md` is now `.sector137/roadmap.md`,
  matching the plugin namespace and the `.sector137/` directory the crew already
  uses for other state. Updated across the README, `references/`, `shared/`, and
  the 11 skills that read or write the offline roadmap.

  Breaking for existing offline users: the skills no longer look for `.can/`.
  Move the file before the next offline session.

  ```
  git mv .can .sector137
  ```

## [0.3.0] — De-AI writing pass

Rewrote the agent and persona-skill prose to remove AI-writing tells and added
durable guardrails so future authoring stays clean.

### Added
- **`shared/writing-style.md`** — the anti-pattern charter: banned constructions
  (antithesis reflex, aphoristic closers), em-dash budget, retired signature
  phrases, structure rules, and skill-authoring rules sourced from Wikipedia's
  "Signs of AI writing" and Anthropic's skill best practices.
- **`scripts/style-lint.sh`** (`bun run lint:style`) — static checks for em-dash
  density, antithesis constructions, banned phrases, and bold-bullet runs.
- Three eval cases (`wren`, `kael`, `margot`) guarding that persona skills stay
  operational after the persona trim.

### Changed
- The 5 agent files compressed (781 → ~390 lines): persona trimmed to a short
  voice anchor, catchphrase lists / formative-insight blocks removed (lore
  stays in `.storyline/crew/`), capability lists tightened into procedures,
  duplicated content de-duped against each twin session skill. Frontmatter
  descriptions untouched.
- The 6 persona skills got the same prose pass; repeated-value output tables
  became lists; pipeline skills and `shared/` docs got a mechanical em-dash
  reduction.
- `shared/workflows/discovery-to-delivery.md` rewritten from the retired
  11-agent roster to the current 5-specialist crew + Sal.
- `shared/agent-conventions.md` now points to the writing-style charter.

## [0.2.0] — Standard plugin layout

Restructured into the canonical Claude Code plugin layout so every workflow is
a real, discoverable `/sector137:` skill.

### Added
- **`build` skill** — the implementation workflow (`/sector137:build`) that
  `plan`, `ship`, and `whats-next` referenced but that never existed. TDD-first,
  sub-tasks, human confirmation gate.
- **`evals/`** — a skill-creator-format eval suite guarding the pipeline
  invariants (gates, output structure, trigger accuracy).
- **`.mcp.json`** — bundles the hosted `sector137` MCP server so the crew can
  drive the pipeline as soon as the plugin is installed.
- **`CHANGELOG.md`** and an upgraded `plugin.json` (`displayName`, `keywords`,
  richer description).

### Changed
- The 17 pipeline playbooks moved from `conductor-sal/playbooks/` to `skills/`,
  so they are discovered and invocable as `/sector137:<name>`.
- The 5 specialists moved to `agents/<name>.md` (proper subagents).
- `conductor-sal/references/` → `references/`.
- `skills/sal` reconciled: it now names and routes to the real 18-skill
  pipeline instead of describing an abstract, un-wired one.
- Agent frontmatter normalized: repo-relative convention paths, distinct
  colors, consistent `<example>` blocks and skill cross-links.
- Reference docs aligned to the canonical `inbox/open/active/done/cancelled`
  status enum.

### Removed
- The fossil `conductor-sal/` package (`package.json` + README) — it claimed to
  be a separate plugin and shipped commands that weren't wired.

## [0.1.0] — Initial crew
- Software Sal plus the specialist crew: the first release of the pipeline and agents.
