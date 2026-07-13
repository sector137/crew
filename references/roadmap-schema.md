# .sector137/roadmap.md Schema — The Local Flightplan

Local fallback file format for offline operation. When the Comms Array is down, this is how we track The Other Side.

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
