# Changelog

All notable changes to the Sal's Crew plugin (`sector137`) are documented here.
This project follows [semantic versioning](https://semver.org/).

## [Unreleased]

### Added
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
