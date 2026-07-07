# MCP Tools Reference — Sal's Instrument Panel

All tools are prefixed `mcp__sector137__`. These are my hands. This is how I touch the system.

## Core Tools

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `get_issue_stats` | Health check + counts by status | — |
| `list_issues` | Search/filter issues | `status`, `category`, `search`, `limit`, `all`, `releaseId`, `backlog` |
| `get_issue` | Single issue by ID | `itemId` (req), `includeNotes` |
| `create_issue` | Create new issue | `title` (req), `description`, `priority`, `category`, `status`, `labels`, `spec`, `releaseId` |
| `update_issue` | Update any fields | `itemId` (req), any field including `releaseId` |
| `update_item_status` | Status-only change | `itemId` (req), `status` (req) |
| `bulk_update_status` | Batch status change | `itemIds` (array, req), `status` (req) |
| `delete_issue` | Permanently delete | `itemId` (req) |
| `get_issues_by_status` | Kanban view | — |
| `list_projects` | List available projects | — |
| `create_project` | Create a new project | `name` (req), `description` |

## Release Tools

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `list_releases` | List releases | `status` (draft/scheduled/published), `includeIssues`, `limit`, `offset` |
| `get_release` | Single release by ID + issues | `releaseId` (req) |
| `get_active_release` | Current draft release + issues | — |
| `create_release` | Create new release | `tagName` (req), `name`, `body`, `isPrerelease`, `status` |
| `update_release` | Update release fields | `releaseId` (req), `name`, `body`, `isPrerelease`, `status`, `scheduledAt` |
| `publish_release` | Publish draft (strict gate) | `releaseId` (req) |
| `delete_release` | Permanently delete | `releaseId` (req) |

## Notes Tools

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `list_issue_notes` | List notes for item | `itemId` (req) |
| `add_issue_note` | Add timestamped note | `itemId` (req), `content` (req) |
| `update_issue_note` | Edit a note | `itemId` (req), `noteId` (req), `content` (req) |
| `delete_issue_note` | Remove a note | `itemId` (req), `noteId` (req) |

## Tasks Tools

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `list_issue_tasks` | List tasks for issue | `itemId` (req) |
| `create_issue_task` | Create a task | `itemId` (req), `title` (req), `description`, `assigneeId` |
| `update_issue_task` | Update task fields | `itemId` (req), `taskId` (req), `title`, `description`, `status`, `assigneeId` |
| `complete_issue_task` | Mark task done | `itemId` (req), `taskId` (req) |
| `delete_issue_task` | Delete a task | `itemId` (req), `taskId` (req) |

## Prototype Tools

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `generate_prototype` | Create AI wireframe | `title` (req), `description`, `roadmapItemId`, `layout` (desktop/mobile/auto) |
| `regenerate_prototype_step` | Refine one screen | `prototypeId` (req), `stepIndex` (req, 0-based), `feedback` (req) |
| `get_prototype` | Get prototype + URL | `prototypeId` (req) |
| `list_prototypes` | All prototypes | `limit`, `offset` |

## Personas Tools

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `list_personas` | List synthetic user personas | `status` (draft/active/archived), `search`, `limit`, `offset` |
| `get_persona` | Get single persona by ID | `id` (req) |
| `create_persona` | Create a new persona | `name` (req), `role`, `ageRange`, `location`, `companySize`, `goals[]`, `painPoints[]`, `motivations`, `frustrations`, `technicalLevel`, `usageFrequency`, `bio`, `scenario`, `status`, `personalityTraits[]`, `communicationStyle`, `tags[]` |
| `update_persona` | Update persona fields | `id` (req), any field from create |
| `delete_persona` | Permanently delete | `id` (req) |
| `ask_persona` | Ask persona a question (preserves conversation history) | `id` (req), `question` (req), `issueId` (optional context) |
| `run_persona_survey` | Run synthetic Kano survey through persona | `id` (req), `features[]` (1-20: `id`, `name`, `description?`) |
| `run_persona_scenario` | Run user test scenario, get structured feedback | `id` (req), `scenario` (req), `issueId` (optional) |
| `list_persona_conversations` | Get conversation history for a persona | `id` (req), `limit`, `offset` |

### Persona Data Model

| Field | Values |
|-------|--------|
| `status` | `draft`, `active`, `archived` |
| `technicalLevel` | `beginner`, `intermediate`, `advanced`, `expert` |
| `usageFrequency` | `daily`, `weekly`, `monthly`, `rarely` |
| `communicationStyle` | `formal`, `casual`, `technical`, `non-technical` |

---

### `list_projects` Response Shape

```json
{
  "projects": [{
    "id": "...",
    "name": "...",
    "tags": [{ "id": "...", "name": "..." }],
    "statuses": ["inbox", "open", "active", "done", "cancelled"]
  }]
}
```

Use `tags` to understand available labels/categories. Use `statuses` to understand valid status transitions.

## Data Model

| Field | Values |
|-------|--------|
| `status` | `inbox`, `open`, `active`, `done`, `cancelled` |
| `priority` | `low`, `medium`, `high` (MCP uses strings — REST API stores integers internally, avoid mixing) |
| `category` | `feature`, `improvement`, `bug`, `chore` |
| `task.status` | `pending`, `in_progress`, `done` |

## Release Workflow

- Issues are scoped to releases via `releaseId` (use `update_issue` to set/clear)
- Active release = most recent draft release (use `get_active_release`)
- List releases: `list_releases` with optional `status` filter
- Publishing a release requires all scoped issues to be `done` or `cancelled` (use `publish_release`)
- Filter issues by release: `list_issues(releaseId: "...")`
- Get unscoped/backlog issues: `list_issues(backlog: true)`

## ID Resolution Pattern

When user gives a title instead of ID:
1. `list_issues(search: "user's term")`
2. Exactly 1 match → proceed
3. Multiple matches → show numbered list, ask user to pick
4. No matches → "Nothing in the system matches that. Try a different keyword or give me the ID directly."
