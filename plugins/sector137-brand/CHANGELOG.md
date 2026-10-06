# Changelog

All notable changes to the `sector137-brand` plugin are documented here.
This project follows [semantic versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] — Brand (not for release until `https://app.sector137.io/mcp/brand` is live)

First release as its own plugin. Depends on the core `sector137` plugin.

### Moved from `sector137` (breaking: new namespace)
- `/sector137:lyra` is now `/sector137-brand:lyra`; agent `sector137:brand-lyra` is now `sector137-brand:brand-lyra`.

### Added
- Bundles the brand MCP server (`brand`): brand systems, voice schemas, completeness, LLM export.

Do not tag this plugin until the `brand` endpoint answers an MCP `initialize` on production
(today `/mcp/brand` returns the app's HTML page). The tool-name prefix
`mcp__plugin_sector137-brand_brand__` is unverified against a live install.
