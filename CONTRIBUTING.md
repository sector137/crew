# Contributing to Sal's Crew

This is maintainer documentation for developing the `sector137` plugin itself. If you
just want to *use* the crew, you don't need any of this — install from the marketplace
(see the [README](README.md)) and go.

The whole repo is the plugin: skills, agents, references, shared conventions, and
hooks all ship together. Every tagged release is a plugin release.

## Local setup

```
bun install
```

`scripts/install.sh` (`bun run install:global`) registers the plugin from your local
clone into a local marketplace and symlinks the agents, so you can test changes in a
real Claude Code session without publishing. For normal use, install from the
marketplace instead.

## Tests and gates

All local, no CI required.

| Command | What it checks |
|---------|----------------|
| `bun run lint` | version sync, writing style, docs links, and `claude plugin validate` |
| `bun run lint:style` | prose style over agents/skills/shared (`shared/writing-style.md`) |
| `bun run lint:links` | every `docs.sector137.io` link resolves and is registered |
| `bun run test:mcp` | skill and doc tool references match the MCP snapshot (offline); add `SECTOR137_API_KEY` for the live diff |
| `bun run test:mcp:update` | reseed `tests/snapshots/mcp-tools.snapshot.json` from the live server |
| `bun run evals` | behavioural evals via OpenRouter (needs `OPENROUTER_API_KEY`) |

The MCP contract test (`tests/mcp-contract.ts`) keeps skills honest: it fails if a
skill or `references/mcp-tools.md` names a tool the server doesn't have. Run
`test:mcp:update` deliberately when the server's tool surface legitimately changes.

## Evals

Two tiers, documented in [`evals/README.md`](evals/README.md):

- `evals/evals.json` — skill-creator-format, text assertions, the ground truth (run
  inside Claude Code with the skill-creator plugin).
- `evals/evals.runner.json` — tool-call and offline-fallback cases run by the
  OpenRouter runner (`evals/runner/`), which proves each skill works with and without
  the MCP server.

## Cutting a release

Full runbook: [`shared/releasing.md`](shared/releasing.md). In short:

1. Pick the semver bump by what changed (patch / minor / major).
2. Run the gates: `bun run lint`, then `SECTOR137_API_KEY=… bun run test:mcp` and
   `OPENROUTER_API_KEY=… bun run evals`.
3. Sync the version across `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`,
   and `package.json` (`bun run lint:version` enforces agreement).
4. Move `CHANGELOG.md`'s `## [Unreleased]` section under the new version heading.
5. Tag: `claude plugin tag --dry-run`, then `claude plugin tag --push`.

Consumers pick it up with `/sector137:update`. The `/sector137:version` skill automates
the bump-and-tag steps; it is a maintainer command and does nothing useful in a
consumer's own project.

## Style

Agent and skill prose follows [`shared/writing-style.md`](shared/writing-style.md),
enforced by `bun run lint:style`. Match the existing voice; keep changes surgical.
