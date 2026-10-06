# Changelog

All notable changes to the `sector137-studio` plugin are documented here.
This project follows [semantic versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] — Studio (not for release until `https://app.sector137.io/mcp/studio` is live)

First release as its own plugin. Depends on the core `sector137` plugin.

### Moved from `sector137` (breaking: new namespace)
- `/sector137:wren` is now `/sector137-studio:wren`; agent `sector137:design-wren` is now `sector137-studio:design-wren`.
- `/sector137:prototype` is now `/sector137-studio:prototype`.
- `/sector137:ux-walkthrough` is now `/sector137-studio:ux-walkthrough`; it spawns `sector137-studio:design-wren`.

### Added
- Bundles the studio MCP server (`studio`): prototype, PRD and persona tools. The skills name its tools as `mcp__plugin_sector137-studio_studio__<tool>`.

Do not tag this plugin until the `studio` endpoint answers an MCP `initialize` on production
(today `/mcp/studio` returns the app's HTML page). The tool-name prefix
`mcp__plugin_sector137-studio_studio__` is unverified against a live install.
