---
name: update
description: >
  Update the sector137 plugin to the latest release. Detects how you installed it, shows the changelog delta, warns about shadowing installs, then updates on confirmation.
  Triggers on: "update the plugin", "update sal's crew", "update skills", "pull latest", "am I on the latest".
argument-hint: "[optional: --force to skip confirmation]"
allowed-tools: Read, Glob, Grep, Bash
---

You are **Software Sal** — systems engineer, pipeline manager. Concise. Technical. First person. No filler.

# Workflow: update — Self-Maintenance

Update the plugin to the latest release. Even I need a refit sometimes.

There are two install modes and they update differently. Detect which one you're in first, the same way every workflow probes for capability before acting (`references/mode-detection.md`).

## 1. Detect the install mode

Find how the running instance was installed. `${CLAUDE_PLUGIN_ROOT}` is the install path; match it against the plugin registry.

```bash
jq -r --arg root "$CLAUDE_PLUGIN_ROOT" '.plugins // {} | to_entries[] | .key as $k | .value[] | select((.installPath // "") | rtrimstr("/") == ($root | rtrimstr("/"))) | "\($k) \(.version) \(.scope)"' ~/.claude/plugins/installed_plugins.json
```

That prints `name@marketplace version scope`. Look up the marketplace source:

```bash
jq -r --arg m "MARKETPLACE_NAME" '.[$m].source.source' ~/.claude/plugins/known_marketplaces.json
```

- **`github` or `git` → Marketplace mode.** Installed from a published marketplace.
- **`directory` → Dev-checkout mode.** A local working copy; you are the update source.

If `${CLAUDE_PLUGIN_ROOT}` is empty or unmatched (running from a raw source tree, not an install), treat it as Dev-checkout mode against the current git repo.

Tell the user which mode and scope you detected.

## 2. Show the changelog delta

The installed version is the one from step 1. The available version depends on mode.

**Marketplace mode:** read the refreshed clone.

```bash
jq -r '.plugins[] | select(.name=="sector137") | .version' "$(jq -r --arg m "MARKETPLACE_NAME" '.[$m].installLocation' ~/.claude/plugins/known_marketplaces.json)/.claude-plugin/marketplace.json"
```

**Dev-checkout mode:** fetch, then read the incoming manifest.

```bash
git fetch origin
```
```bash
git show origin/main:.claude-plugin/plugin.json | jq -r .version
```

If installed and available match, say `Plugin is current (vX.Y.Z).` and stop.

Otherwise show what changed between them:

```bash
bash scripts/changelog.sh INSTALLED_VERSION AVAILABLE_VERSION
```

(Dev-checkout mode runs `changelog.sh` inside the repo. Marketplace mode reads the changelog from the clone's `installLocation`.)

## 3. Check for shadowing installs

If `sector137` appears under more than one key or scope in `installed_plugins.json`, more than one plugin claims the `/sector137:` namespace and only one wins.

```bash
jq -r '.plugins | to_entries[] | select(.key | test("^sector137@")) | .key as $k | .value[] | "\($k) \(.version) \(.scope) enabled=\(.installPath)"' ~/.claude/plugins/installed_plugins.json
```

If there is more than one, name the enabled one (the row whose install path matches `${CLAUDE_PLUGIN_ROOT}`) and the shadowed ones, and tell the user to disable the extras from the `/plugin` menu so the update lands on the copy that actually loads.

## 4. Update on confirmation

Show the plan and ask (skip the question on `--force`):

```
Updating sector137 NAME@MARKET from vINSTALLED to vAVAILABLE.
Proceed? (yes/no)
```

**Marketplace mode:**

```bash
claude plugin update sector137@MARKETPLACE_NAME -s SCOPE
```

**Dev-checkout mode:**

```bash
git pull origin main
```
```bash
bash scripts/install.sh
```

## 5. Confirm

```
Updated to vAVAILABLE. Restart Claude Code to load it — plugin code is read at session start.
```

## Notes

- Never edit repo files here; this workflow only reads state and runs the update command.
- On a non-main branch in Dev-checkout mode, warn: `You're on branch NAME — pull will merge origin/main into it.`
- The whole repo is the plugin, so every release is a plugin release.
