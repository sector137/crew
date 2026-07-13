---
name: version
description: >
  Show, check, changelog, or bump the sector137 plugin version.
  Use when the user says "version show", "show version", "check versions",
  "bump version", "bump minor", "bump patch", "version changelog", "cut a release".
argument-hint: "[show|check|changelog|bump] [major|minor|patch]"
allowed-tools: Read, Bash
---

# version — Plugin Version Manager

**Maintainer command.** This manages the version of the `sector137` plugin itself, from its source repo. It is for whoever develops and releases the plugin — it does nothing useful in a consumer's own project. See `CONTRIBUTING.md`.

Manage the version of the `sector137` plugin from the repo. `plugin.json` is the source of truth; `marketplace.json` and `package.json` must agree with it.

Run these from the repo root.

- Manifest: `.claude-plugin/plugin.json`
- Marketplace: `.claude-plugin/marketplace.json`
- Package: `package.json`
- Changelog: `CHANGELOG.md`
- Release runbook: `shared/releasing.md`

Arguments: $ARGUMENTS

## show

Read the version from `plugin.json` and the current commit:

```bash
jq -r '"sector137 v" + .version' .claude-plugin/plugin.json
```
```bash
git log --oneline -1
```

Report the version, the commit, and the component dirs (`agents/`, `skills/`, `hooks/`).

## check

Verify the three manifests agree. This is the pre-release gate.

```bash
bash scripts/version-check.sh
```

Clean means all three match. A mismatch prints which file disagrees; fix it before releasing.

## changelog

With a version argument, show what shipped since it:

```bash
bash scripts/changelog.sh FROM_VERSION
```

With no argument, show the whole file:

```bash
cat CHANGELOG.md
```

Sections use the canonical heading `## [X.Y.Z] — Title`, newest first, with `## [Unreleased]` on top.

## bump [major|minor|patch]

Default is patch. The bump edits manifests; the git tag is the release.

1. Gate on agreement:
   ```bash
   bash scripts/version-check.sh
   ```
2. Compute the next version from the current `plugin.json` value.
3. Set the same new version in all three files: `.claude-plugin/plugin.json`, the `sector137` entry in `.claude-plugin/marketplace.json`, and `package.json`.
4. In `CHANGELOG.md`, rename `## [Unreleased]` to `## [X.Y.Z] — Title` and open a fresh `## [Unreleased]` above it.
5. Re-gate:
   ```bash
   bash scripts/version-check.sh
   ```
6. Commit the release, then tag it:
   ```bash
   git commit -am "release: vNEW_VERSION"
   ```
   ```bash
   claude plugin tag --dry-run
   ```
   ```bash
   claude plugin tag --push
   ```

`claude plugin tag` validates that `plugin.json` and the marketplace entry match, creates `sector137--vNEW_VERSION`, and pushes it. That tag is the release event. Full steps live in `shared/releasing.md`.
