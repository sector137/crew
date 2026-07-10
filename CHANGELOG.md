# Changelog

All notable changes to the Sal's Crew plugin (`sector137`) are documented here.
This project follows [semantic versioning](https://semver.org/).

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
- Software Sal plus the specialist crew, extracted from the sector137 monorepo.
