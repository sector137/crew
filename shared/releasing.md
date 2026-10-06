# Releasing the sector137 plugins

The release runbook. This repo is a marketplace of five plugins: the core `sector137` plugin at the repo root, and `sector137-studio`, `sector137-crew`, `sector137-brand` and `sector137-ops` under `plugins/`. Each plugin has its own version, its own changelog and its own tag. `CHANGELOG.md` at the root is the core release log, `plugins/<name>/CHANGELOG.md` is each domain plugin's, and a git tag is the release event. Consumers pick up a core release through `/sector137:update`.

For each plugin, its own `plugin.json` is the source of truth for the version, and its `marketplace.json` entry must carry the same value. The core plugin's `package.json` must match too. `claude plugin tag` enforces the plugin.json and marketplace.json pair; `scripts/version-check.sh` checks every marketplace entry against its plugin's own `plugin.json`, and core's `package.json`.

## Per-plugin versions and tags

Tags are `NAME--vX.Y.Z`: `sector137--v0.9.0`, `sector137-studio--v0.1.0`, `sector137-crew--v0.1.0`, `sector137-brand--v0.1.0`, `sector137-ops--v0.1.0`. Tag only on `main`, after the PR merges.

`claude plugin tag` works for a plugin in a sub-directory. Run it from inside `plugins/sector137-studio`, or from the repo root with the path (`claude plugin tag plugins/sector137-studio --dry-run`). It reads that plugin's `plugin.json`, finds the enclosing marketplace entry (here `plugins[1]`), checks the two versions agree, and tags `sector137-studio--v0.1.0` at HEAD of the enclosing repo. The dry run reports only the version pair and the tag name; `package.json` is not part of it. A tag points at the whole repo, so a core release and a domain release at the same commit are two tags on one commit.

Release only the plugins whose files changed. A change to a shared convention in `shared/` or `references/` is a core change; a domain plugin copies nothing from core, so it does not need a bump for it. A domain plugin depends on core by name (`"dependencies": ["sector137"]`), so a breaking core release should say which domain plugin versions it works with.

Bump rules per plugin follow the list below. A skill or agent moving between plugins is a major change for both (the namespace changes).

## Before you start

Version numbers use semver. Choose the bump by what changed:

- patch: fixes and prose, no new commands or breaking changes
- minor: new skills, agents, or hooks that stay backward compatible
- major: a breaking change to how the plugin installs or is invoked (a rename, or a skill moving to another plugin)
  Before 1.0, a minor bump may carry a breaking change if the CHANGELOG says so loudly.

## Steps

Run each block on its own. The working tree should be clean and on `main`.

Confirm the tree state and branch:

```
git status
```

Gate on version agreement:

```
bun run lint:version
```

Gate on prose:

```
bun run lint:style
```

Gate on docs links (needs network for the liveness check):

```
bun run lint:links
```

Gate on the MCP contract. Without a key this still checks skill and doc tool references against the checked-in snapshots (one per server: work, studio, crew, brand, ops, and the legacy `/mcp`), each reference against the server its prefix names; with a key it also diffs every live server. A snapshot diff means either the server changed (reseed deliberately with `bun run test:mcp:update`) or a skill/doc drifted (fix it):

```
SECTOR137_API_KEY=YOUR_KEY bun run test:mcp
```

Run the behavioural evals (advisory until the suite has a stable green run behind it). Needs an OpenRouter key:

```
OPENROUTER_API_KEY=YOUR_KEY bun run evals
```

The whole gate set also runs as one:

```
bun run lint
```

Now edit the files for the plugin you are releasing by hand to the new version.

Core (`sector137`):

- `.claude-plugin/plugin.json`: set `version`
- `.claude-plugin/marketplace.json`: set the `sector137` entry's `version`
- `package.json`: set `version`
- `CHANGELOG.md`: rename `## [Unreleased]` to `## [X.Y.Z] — Title` and add a fresh `## [Unreleased]` above it

A domain plugin (`sector137-studio` shown):

- `plugins/sector137-studio/.claude-plugin/plugin.json`: set `version`
- `.claude-plugin/marketplace.json`: set the `sector137-studio` entry's `version`
- `plugins/sector137-studio/CHANGELOG.md`: same rename as above

Re-check agreement after editing:

```
bun run lint:version
```

Preview the notes that will ship, passing the previous version:

```
bash scripts/changelog.sh PREVIOUS_VERSION
```

Commit the release:

```
git add -A
```

```
git commit -m "release: vX.Y.Z"
```

Validate the marketplace and every plugin (`bun run lint:plugin` runs all of these):

```
claude plugin validate . --strict
```

```
claude plugin validate plugins/sector137-studio --strict
```

Preview the tag without creating it. For core, run it at the repo root; for a domain plugin, pass its directory:

```
claude plugin tag --dry-run
```

```
claude plugin tag plugins/sector137-studio --dry-run
```

Create and push the tag. This is the release:

```
claude plugin tag --push
```

```
claude plugin tag plugins/sector137-studio --push
```

Push the branch:

```
git push
```

## Domain plugins and the server

A domain plugin's `.mcp.json` points at `https://app.sector137.io/mcp/<domain>`. Do not tag or announce a domain plugin until that endpoint is live on production (it must answer an MCP `initialize`, not an HTML page). The core plugin keeps the legacy `https://app.sector137.io/mcp` until that is verified; moving it to `/mcp/work` is a separate one-line change to the root `.mcp.json`, released as its own patch.

## After the release

Consumers run `/sector137:update` to pull a core release. A restart of Claude Code is required for the new version to load, since plugin code is read at session start.
