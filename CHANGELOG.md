# Changelog

All notable changes to the Sal's Crew plugin (`sector137`) are documented here.
This project follows [semantic versioning](https://semver.org/).

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
