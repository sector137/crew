# MCP Tools Reference — Sal's Instrument Panel

All tools are prefixed `mcp__sector137__`. These are my hands. This is how I touch the system.

The server consolidates issue, note, task, and release work into two action-dispatch
tools: `issues` and `releases`. One tool, an `action` parameter, many operations. I
call `mcp__sector137__issues` with `action: "create"`, not a separate `create_issue`.

Docs: the live catalog and auth live at [docs.sector137.io/claude-code](https://docs.sector137.io/claude-code).

## `issues` — one tool for issues, notes, tasks, relations

`mcp__sector137__issues`, `action` picks the operation.

| action | Purpose | Key parameters |
|--------|---------|----------------|
| stats | Health check + counts by status | — |
| list | Search/filter issues | `status`, `category`, `horizon`, `search`, `limit`, `all`, `releaseId`, `backlog`, `parentId`, `includeNotes` |
| get | Single issue by ID (includes `childCount`) | `itemId` (req), `includeNotes` |
| by_status | Kanban view (grouped by status) | — |
| create | Create a new issue | `title` (req), `description`, `priority`/`priorityValue`, `horizon`, `category`, `labels`, `tagIds`, `labelIds`, `agentIds`, `parentId`, `releaseId`, `productId` or `universeId` |
| bulk_create | Create many sub-issues under one parent in a single call | `items[]` (req, each needs `title`), `parentId`, `productId` or `universeId` |
| update | Update any fields | `itemId` (req), any field including `releaseId`, `horizon`, `parentId` (null detaches) |
| update_status | Status-only change | `itemId` (req), `status` (req), `note` |
| bulk_update_status | Batch status change | `itemIds` (array, req), `status` (req) |
| bulk_scope | Batch scope to a release | `itemIds` (req), `releaseId`, `productId` |
| bulk_assign | Batch assign a user and/or agents | `itemIds` (req), `productId`, `assigneeId`, `agentIds` |
| reorder | Move within its status column | `itemId` (req), `position` (req), `status` |
| delete | Permanently delete | `itemId` (req), `confirm: true` |
| list_notes | List notes for an issue | `itemId` (req) |
| add_note | Add a timestamped note | `itemId` (req), `content` (req), `noteType` |
| update_note | Edit a note | `itemId` (req), `noteId` (req), `content` (req) |
| delete_note | Remove a note | `itemId` (req), `noteId` (req) |
| list_tasks | List sub-tasks for an issue | `itemId` (req) |
| create_task | Create a sub-task | `itemId` (req), `title` (req), `description`, `assigneeId` |
| update_task | Update a sub-task | `itemId` (req), `taskId` (req), `title`, `taskStatus`, `assigneeId` |
| complete_task | Mark a sub-task done | `itemId` (req), `taskId` (req) |
| delete_task | Delete a sub-task | `itemId` (req), `taskId` (req) |
| list_relations | List an issue's relations | `itemId` (req) |
| add_relation | Link two issues | `itemId` (req), `relatedIssueId` (req), `relationType` |
| remove_relation | Unlink | `itemId` (req), `relationId` (req) |

**Sub-issues.** An issue can be a child of another via `parentId`. Create children in
one batch with `bulk_create` (shared `parentId`), list them with `list` (`parentId`),
and read a parent's `childCount` from `get`. Sub-issues are real issues: dispatchable,
scopable, taggable. `/sector137:decompose` drives the whole flow. Relations
(`blocks`/`blocked_by`/`related_to`/`duplicate_of`) are peer links, separate from the
parent/child hierarchy.

## `releases` — the rolling release

`mcp__sector137__releases`, `action` picks the operation.

There is **no create action**. The server runs a rolling release model: an active
release always exists (it is the running "next"). You scope issues onto it, then
`publish` cuts it with a version bump and a fresh active release rolls in behind it.

| action | Purpose | Key parameters |
|--------|---------|----------------|
| get_active | The current active release + its issues | — |
| list | List releases | `status` (`active`/`published`), `includeIssues`, `limit`, `offset` |
| get | Single release by ID | `releaseId` (req) |
| update | Set release notes / name | `releaseId` (req), `name`, `body`, `isPrerelease` |
| publish | Cut the active release (strict gate) | `releaseId` (req), `bumpType` (`major`/`minor`/`patch`) |
| delete | Delete a published release | `releaseId` (req), `confirm: true` |

## Prototype Tools (Studio)

| Tool | Purpose | Key parameters |
|------|---------|----------------|
| `generate_prototype` | Create an AI wireframe | `title` (req), `description`, `roadmapItemId`, `layout` (`desktop`/`mobile`/`auto`) |
| `regenerate_prototype_step` | Refine one screen | `prototypeId` (req), `stepIndex` (req, 0-based), `feedback` (req) |
| `get_prototype` | Get prototype + sandbox URL | `prototypeId` (req) |
| `list_prototypes` | All prototypes | `limit`, `offset` |

## Personas Tools

| Tool | Purpose | Key parameters |
|------|---------|----------------|
| `list_personas` | List synthetic user personas | `status`, `search`, `limit`, `offset` |
| `get_persona` | Get a single persona by ID | `id` (req) |
| `create_persona` | Create a persona | `name` (req), plus demographics/psychology fields |
| `update_persona` | Update persona fields | `id` (req), any field from create |
| `delete_persona` | Permanently delete | `id` (req), `confirm: true` |
| `ask_persona` | Ask a persona a question (keeps history) | `id` (req), `question` (req), `issueId` |
| `run_persona_survey` | Synthetic Kano survey | `id` (req), `features[]` (1–20) |
| `run_persona_scenario` | User-test scenario, structured feedback | `id` (req), `scenario` (req), `issueId` |
| `list_persona_conversations` | Conversation history | `id` (req), `limit`, `offset` |

## Product Tools

| Tool | Purpose | Key parameters |
|------|---------|----------------|
| `list_products` | Products the API key can reach | — |
| `create_product` | Create a product | `title` (req), `description`, `isPublic`, `universeId` |
| `list_universes` | Universes the key can reach | — |

## Tags — product work-item taxonomy

| Tool | Purpose | Key parameters |
|------|---------|----------------|
| `get_product_tags` | List existing tags (assign real tagIds, don't invent) | `productId` |
| `create_tag` | Create a tag under the key's product | `label` (req), `color` |
| `update_tag` | Rename or recolor a tag | `tagId` (req), `label`, `color` |
| `delete_tag` | Delete a tag (removes it from all issues) | `tagId` (req) |

## Boards — parallel work tracks

| Tool | Purpose | Key parameters |
|------|---------|----------------|
| `list_boards` | Boards for the universe (resolve `boardId`) | `universeId` (req) |
| `create_board` | New board (not "Intake") | `universeId` (req), `name` (req), `description`, `viewMode` |
| `update_board` | Rename / archive / reorder | `boardId` (req), `name`, `status`, `position`, `viewMode` |
| `delete_board` | Delete a board (clears issues' `boardId`) | `boardId` (req) |
| `list_board_labels` | A board's label vocabulary (resolve `labelIds`) | `boardId` (req) |
| `create_board_label` | Add a label to a board | `boardId` (req), `name` (req), `color` |
| `update_board_label` | Rename or recolor a board label | `boardId` (req), `labelId` (req), `name`, `color` |
| `delete_board_label` | Remove a board label | `boardId` (req), `labelId` (req) |

## Data Model

| Field | Values |
|-------|--------|
| **status** | `backlog`, `planned`, `in_progress`, `in_review`, `completed`, `cancelled` |
| **horizon** | `now`, `next`, `later`, `someday` |
| **priority** | `low`, `medium`, `high` (or `priorityValue`, a raw integer) |
| **category** | `feature`, `improvement`, `bug`, `chore` |
| **relation type** | `blocks`, `blocked_by`, `related_to`, `duplicate_of` |
| **task status** | `pending`, `in_progress`, `done` |
| **release status** | `active`, `published` |
| **note type** | `note`, `completion_report`, `concern`, `decision` |

## Release Workflow

- Issues are scoped to the active release via `releaseId` — `issues(action:"update", itemId, releaseId)` or `issues(action:"bulk_scope", itemIds, releaseId)`.
- The active release always exists — `releases(action:"get_active")`. Its tag is always "next" until it is cut.
- Publishing computes the version from `bumpType` — `releases(action:"publish", releaseId, bumpType)`. The strict gate: every scoped issue must be `completed` or `cancelled` first.
- Filter issues by release: `issues(action:"list", releaseId: "...")`.
- Get unscoped/backlog issues: `issues(action:"list", backlog: true)`.

## ID Resolution Pattern

When the user gives a title instead of an ID:
1. `issues(action:"list", search: "user's term")`
2. Exactly 1 match → proceed
3. Multiple matches → show a numbered list, ask the user to pick
4. No matches → "Nothing in the system matches that. Try a different keyword or give me the ID directly."
