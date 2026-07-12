# .sector137/roadmap.md Schema — The Local Flightplan

Local fallback file format for offline operation. When the Comms Array is down, this is how we track The Other Side.

## File Structure

```markdown
---
project: "[Project Name]"
syncedAt: null
---

# Roadmap

> "The Record of What Was Shipped."

## Active Release: [version]

- **[title]** `active` `high` `feature` `#server-abc123`
  [optional description]

## Backlog

- **[title]** `open` `medium` `feature` `#local-001`
- **[title]** `open` `low` `bug` `#local-002`

## Inbox

- **[title]** `inbox` `medium` `feature` `#local-003`

## Done

- **[title]** `done` `medium` `feature` `#server-abc123`
```

## ID Formats

| Format | Meaning |
|--------|---------|
| `#local-N` | Created offline, not synced to server |
| `#server-UUID` | Synced to the system; UUID is the MCP item ID |

## Section Mapping

| Section | `status` |
|---------|----------|
| `## Active Release` | `active` / `open` (scoped to release) |
| `## Backlog` | `open` (no release) |
| `## Inbox` | `inbox` |
| `## Done` | `done` |

## Notes Subsection

```markdown
- **[title]** `active` `medium` `feature` `#local-001`

  **Notes:**
  - 2026-01-15 — Implemented auth middleware, needs tests
```

## Category Inference

- "fix" / "bug" / "broken" / "error" → `bug`
- "refactor" / "clean up" / "tech debt" → `chore`
- Everything else → `feature`
