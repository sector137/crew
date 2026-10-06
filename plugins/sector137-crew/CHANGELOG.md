# Changelog

All notable changes to the `sector137-crew` plugin are documented here.
This project follows [semantic versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] — Crew (not for release until `https://app.sector137.io/mcp/crew` is live)

First release as its own plugin. Depends on the core `sector137` plugin.

### Moved from `sector137` (breaking: new namespace)
- `/sector137:mira` is now `/sector137-crew:mira`; agent `sector137:navigator-mira` is now `sector137-crew:navigator-mira`.
- `/sector137:voss` is now `/sector137-crew:voss`; agent `sector137:foundry-voss` is now `sector137-crew:foundry-voss`.

### Added
- Bundles the crew MCP server (`crew`): run a crew member, crew proposals, crew conversations, skills list. Mira's skill names the conversation tools as `mcp__plugin_sector137-crew_crew__<tool>`.
- Mira's `get_dora_metrics` read comes from the ops server and is skipped unless `sector137-ops` is installed.

Do not tag this plugin until the `crew` endpoint answers an MCP `initialize` on production
(today `/mcp/crew` returns the app's HTML page). The tool-name prefix
`mcp__plugin_sector137-crew_crew__` is unverified against a live install.
