# Releasing the sector137 plugin

The release runbook. `CHANGELOG.md` is the release log and a git tag is the release event. Consumers pick up the release through `/sector137:update`.

`plugin.json` is the source of truth for the version. `marketplace.json` and `package.json` must carry the same value. `claude plugin tag` enforces the first pair; `scripts/version-check.sh` enforces all three.

## Before you start

Version numbers use semver. Choose the bump by what changed:

- patch: fixes and prose, no new commands or breaking changes
- minor: new skills, agents, or hooks that stay backward compatible
- major: a breaking change to how the plugin installs or is invoked

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

Now edit four files by hand to the new version:

- `.claude-plugin/plugin.json`: set `version`
- `.claude-plugin/marketplace.json`: set the `sector137` entry's `version`
- `package.json`: set `version`
- `CHANGELOG.md`: rename `## [Unreleased]` to `## [X.Y.Z] — Title` and add a fresh `## [Unreleased]` above it

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

Validate the manifests:

```
claude plugin validate . --strict
```

Preview the tag without creating it:

```
claude plugin tag --dry-run
```

Create and push the tag. This is the release:

```
claude plugin tag --push
```

Push the branch:

```
git push
```

## After the release

Consumers run `/sector137:update` to pull it. A restart of Claude Code is required for the new version to load, since plugin code is read at session start.
