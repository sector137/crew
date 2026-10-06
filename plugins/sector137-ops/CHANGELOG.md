# Changelog

All notable changes to the `sector137-ops` plugin are documented here.
This project follows [semantic versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] — Ops (not for release until `https://app.sector137.io/mcp/ops` is live)

First release as its own plugin. Depends on the core `sector137` plugin.

### Moved from `sector137` (breaking: new namespace)
- `/sector137:rook` is now `/sector137-ops:rook`; agent `sector137:infra-rook` is now `sector137-ops:infra-rook`.

### Added
- Bundles the ops MCP server (`ops`): DORA metrics, incidents, deployments, services, initiatives. Rook names `record_incident`, `resolve_incident` and `get_dora_metrics` as `mcp__plugin_sector137-ops_ops__<tool>`.

Do not tag this plugin until the `ops` endpoint answers an MCP `initialize` on production
(today `/mcp/ops` returns the app's HTML page). The tool-name prefix
`mcp__plugin_sector137-ops_ops__` is unverified against a live install.
