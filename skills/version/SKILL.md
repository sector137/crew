---
name: version
description: >
  Show, bump, or changelog the claude-agent-system version.
  Use when the user says "version show", "show version", "bump version",
  "bump minor", "bump patch", "version changelog", "what version is the agent system".
argument-hint: "[show|bump|changelog] [major|minor|patch]"
allowed-tools: Read, Write, Bash
---

# version — Agent System Version Manager

Manage the version of the `claude-agent-system` plugin.

Plugin manifest: `~/.claude/.claude-plugin/plugin.json`
Changelog: `~/.claude/CHANGELOG.md`
Git repo: `~/.claude/` (if initialized)

Arguments: $ARGUMENTS

---

## show

Read `~/.claude/.claude-plugin/plugin.json` and display:

```
claude-agent-system v0.1.0
Components: agents/, hooks/, skills/
Git: [current commit hash if available]
```

Run `git -C ~/.claude log --oneline -1 2>/dev/null` for the commit hash.

---

## bump [major|minor|patch]

1. Read current version from `plugin.json`
2. Increment the specified part (default: patch)
3. Update `plugin.json` with new version
4. Prepend a new section to `CHANGELOG.md`:
   ```markdown
   ## v[NEW_VERSION] — YYYY-MM-DD

   [Ask user for a brief description of what changed, or use git log --oneline since last tag]
   ```
5. Confirm: "Bumped to v[NEW_VERSION]. Update CHANGELOG.md with what changed, then commit."

---

## changelog

Read and display `~/.claude/CHANGELOG.md`.

---

## git status

Show what would be committed:
```bash
git -C ~/.claude status
git -C ~/.claude diff --stat
```

This is a read-only view — do not commit automatically. Let the user decide when to commit.
