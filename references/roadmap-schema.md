# .sector137/roadmap.md Schema — The Local Flightplan

Local fallback file format for offline operation. When the Comms Array is down, this is how we track The Other Side.

**Note:** this is the markdown format for projects that predate the newer JSON state
format. If `.sector137/state.json` exists in the project instead, that's the format in
use — a full `StateDocument` (`issues[]`/`issueTasks[]`/`issueNotes[]`/`releases[]`/`tags[]`,
each wrapped in a sync envelope) that round-trips with `mcp__sector137__export_state` /
`sync_state` / `import_state` directly, no markdown parsing involved. See
`mcp-tools.md`'s "State Sync (bulk)" section and `skills/init/SKILL.md`'s Step 0. Don't
run both formats in the same project — `skills/init` picks one at Step 0 and stays on it.

Status words match the server exactly: `backlog`, `planned`, `in_progress`, `in_review`, `completed`, `cancelled`. The inline tag on each bullet is authoritative; the section is a coarse grouping.

## File Structure

```markdown
---
project: "[Project Name]"
syncedAt: null
---

# Roadmap

> "The Record of What Was Shipped."

## Active Release: [tag]

- **[title]** `in_progress` `high` `feature` `#server-abc123`
  [optional description]

## Backlog

- **[title]** `backlog` `medium` `feature` `#local-001`
- **[title]** `backlog` `low` `bug` `#local-002`

## Planned

- **[title]** `planned` `medium` `feature` `#local-003`

## Done

- **[title]** `completed` `medium` `feature` `#server-abc123`
```

## ID Formats

| Format | Meaning |
|--------|---------|
| `#local-N` | Created offline, not synced to the server |
| `#server-UUID` | Synced to the system; UUID is the MCP item ID |

## Section Mapping

| Section | Typical `status` |
|---------|------------------|
| `## Active Release: [tag]` | `in_progress` / `planned` (scoped to the rolling release) |
| `## Backlog` | `backlog` (captured, not triaged) |
| `## Planned` | `planned` (triaged, queued, not scoped) |
| `## Done` | `completed` (or `cancelled`) |

## Notes Subsection

```markdown
- **[title]** `in_progress` `medium` `feature` `#local-001`

  **Notes:**
  - 2026-01-15 — Implemented auth middleware, needs tests
```

## Sub-issues

Offline there is no `parentId`, so a child carries a `↳parent:#id` marker pointing at its
parent's ID. `/sector137:decompose` writes children this way; on the next `/sector137:init`
sync they become real parent/child links on the server.

```markdown
- **[parent title]** `in_progress` `now` `feature` `#server-abc123`
- **[child title]** `backlog` `next` `feature` `#local-004` `↳parent:#server-abc123`
```

The optional third-from-left tag is the `horizon` (`now`/`next`/`later`/`someday`) when set.

## Category Inference

- "fix" / "bug" / "broken" / "error" → `bug`
- "refactor" / "clean up" / "tech debt" → `chore`
- Everything else → `feature`
