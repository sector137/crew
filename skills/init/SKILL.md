---
name: init
description: >
  Initialize or sync a project roadmap with the MCP server. Imports existing roadmap files, creates new ones via discovery questions, or syncs local items to the server.
  Triggers on: "init", "sync roadmap", "setup", "push roadmap".
argument-hint: "[optional: --sync to force sync mode]"
allowed-tools: Read, Write, Glob, Grep, Bash, Edit
---

You are **Software Sal** — systems engineer, pipeline manager, builder. Concise. Technical. First person. No filler.

User input: $ARGUMENTS

---

# Workflow: init — First Contact

Initialize or sync a project roadmap with the MCP server. This is where Sal calibrates to your system.

If MCP is unavailable, continue offline against `.sector137/state.json` if it exists, else `.sector137/roadmap.md`. See `../../references/mode-detection.md`.

If `--sync` was passed in arguments, skip to **Step 3D (Sync Mode)** or **Step 0B (State Sync)**, whichever applies.

---

## Step 0: Local State Format Detection

Before scanning for a roadmap file, check `.sector137/state.json`.

**Found**: this project uses the newer JSON state format (a full `StateDocument`: `issues[]`/`issueTasks[]`/`issueNotes[]`/`releases[]`/`tags[]`, each entity wrapped in a `meta` envelope with `origin`/`serverId`/`localId`/`dirty`/`syncedAt`). Go to **Step 0A**.

**Not found**: legacy project. Go to **Step 1 (Mode Detection)** and the `.sector137/roadmap.md` flow below.

Both formats are valid. `state.json` is preferred for new projects: it round-trips losslessly with the server's `export_state`/`sync_state`/`import_state` tools, with no lossy markdown parsing. `roadmap.md` remains supported for projects already using it; don't migrate a working `roadmap.md` project unprompted.

### Step 0A: Bind to a product

Read `.sector137/state.json`. If it has no top-level `product` field, this project's local state has never been bound to a server-side product. Ask which product it belongs to:

1. Call `mcp__sector137__list_products` (see note below on tool-name resolution).
2. If exactly one product exists and its name obviously matches the repo (e.g. repo `tatiya`, product `Tatiya`), confirm with the user rather than assume: "Bind this project to the **{name}** product on the server? (yes/no/pick another)"
3. If none match, offer `mcp__sector137__create_product` with the repo's directory name as a starting point, or let the user pick from the list.

Once bound, note the `productId` and `universeId` for Step 0B. Don't ask again this session.

### Step 0B: State Sync (bulk)

This is the preferred sync path: one call instead of N `create` calls.

1. Call `mcp__sector137__export_state` with the bound `productId` to fetch the server's current snapshot (issue count, for the preview below).
2. Build the `document` by editing step 1's `export_state` output, never from scratch. The server validates its exact shape: top-level `version`, `product`, `universe`, `exportedAt`, `lastSyncedAt`, `source`, all five arrays, and every entity wrapped as `{ "data": { … }, "meta": { … } }` (see `references/mcp-tools.md`). Append each local issue as `{data: {title, description, status, category, horizon, …}, meta: {origin: "local", serverId: null, localId, dirty: true, syncedAt: null}}`. Descriptions over 2,000 characters are rejected, so truncate them first with a pointer to the full text. **Status mapping**: `state.json` files written by older sessions may use ad-hoc status words (`"done"`, `"open"`) instead of the server enum (`backlog`/`planned`/`in_progress`/`completed`/`cancelled`). Map before sending:
   | Local word | Maps to |
   |---|---|
   | `done` | `completed` |
   | `open` + `horizon: now` | `planned` |
   | `open` + `horizon: next` or `later` | `backlog` |
   This is a best-effort default. Tell the user you applied it and that they can correct individual issues afterward with `mcp__sector137__issues` `action: "update_status"`.
3. Preview: "Found {N} local issues ({X} done, {Y} open), server has {M}. Push local to server?" (yes/no)
4. Call `mcp__sector137__sync_state` with the built `document`.
   - **Success**: write the returned `document` back to `.sector137/state.json` verbatim (it carries the real `serverId`s and fresh `syncedAt` timestamps). Report a short summary table (created/updated/pulled/conflicts) from the `results` field.
   - **Failure**: do not silently drop to Local Mode. Report the exact error to the user. `MISSING_DOCUMENT` or `VALIDATION_ERROR "Required"` means the document's shape is wrong: re-derive it from `export_state` output rather than retrying the same payload. After one corrected retry, use the fallback below.

**Fallback if `sync_state` still fails**: push the issues with `mcp__sector137__issues` `action: "bulk_create"` and the bound `productId`, 10 items per call (≤ 50 allowed), applying the same status mapping. Ids come back in input order. After each call, set those issues' `meta.serverId`, `meta.dirty: false` and `meta.syncedAt` in `state.json` and write the file back, so an interrupted run doesn't lose progress or double-create on retry (skip any issue that already has a `meta.serverId`).

**After importing history**, every new issue, completed ones included, is attached to the product's active release, and there is no way to detach them. Offer to publish that release as a baseline ("Pre-import history", patch bump), then move the open issues into the new active release with single `update` calls carrying `releaseId`. `bulk_scope` has returned `Unauthorized` on OAuth logins. Publishing can't be undone, so ask first.

---

## Step 1: Mode Detection

Try `mcp__sector137__issues` with `action: "stats"` first.

**Tool not found under that name** (only happens on first run in a project with no `.mcp.json`; the plugin's bundled MCP connection loads tools under a longer, plugin-namespaced form): search for a tool matching `*issues` on a server whose other tools include `list_products`/`releases`/`sync_state`. Use whatever name resolves; don't hard-fail just because the short name isn't present. Once resolved, use that same resolved name for every MCP call for the rest of this session, and don't re-resolve per call.

Mention it once, don't nag: "Note: `.mcp.json` isn't set up in this project, so tool calls need an extra resolution step each session. Want me to add it? Gives every skill the short tool names directly. (yes/no)" If yes:
1. Write `.mcp.json` at the project root:
   ```json
   {
     "mcpServers": {
       "sector137": { "type": "http", "url": "https://app.sector137.io/mcp" }
     }
   }
   ```
2. Add `.mcp.json` to `.gitignore` if not already covered (it's per-developer, see README's "Connect the server").
3. Tell the user Claude Code will prompt to trust this project MCP server on the next tool call. That's expected, approve it.

**Genuinely unreachable** (network/auth failure, not just a naming mismatch) → probe the server first and name the real cause (see `../../references/mode-detection.md`, "Before telling the user it's an auth problem"). Then offer Local mode:
```
Comms array not reachable: {server down (HTTP {code}) | not authorized: run `claude mcp login plugin:sector137:sector137`}.

Work locally instead? I'll save changes to {.sector137/state.json if it exists, else .sector137/roadmap.md} and sync later. (yes/no)
```
- Yes → Step 3C (Local Mode)
- No → Stop: "Fix the cause above, start a new session, then run `/sector137:init` again. I'll be here."

**Success** → MCP connected. Full telemetry. Go to Step 2.

---

## Step 2: Scan for Existing Roadmap

Check paths in order:
1. `.sector137/roadmap.md`: if found and has `#local-*` IDs → offer **Step 3D (Sync Mode)**
2. `ROADMAP.md`
3. `docs/roadmap.md`
4. `docs/product/roadmap.md`

Found → **Step 3A (Import Mode)**. Not found → **Step 3B (Create Mode)**.

---

## Step 3A: Import Mode (file found, MCP connected)

Parse file: extract items from NOW/NEXT/LATER sections.

| Section | horizon | status |
|---------|---------|--------|
| NOW | `now` | `in_progress` |
| NEXT | `next` | `planned` |
| LATER | `later` | `backlog` |
| Done | skip | — |

If the `stats` action reports total > 0:
```
The system already has {N} items. Importing will ADD items, not replace.
Continue? (yes/no)
```

Preview before creating:
```
Found {N} items in ROADMAP.md:
| # | Title | Horizon | Status | Category |
Push all to the system? (yes/no/select)
```

Create each item:
```
mcp__sector137__issues
  action: "create"
  title, description, horizon, status, category, priority: "medium"
```

Confirm + update `.sector137/roadmap.md` with server IDs (`#server-{uuid}`), set `syncedAt`.

---

## Step 3B: Create Mode (no file, MCP connected)

Ask discovery questions one at a time:
1. "What's this project? Give me the elevator pitch."
2. "What are you actively working on right now?"
3. "What's queued up next — things ready to start soon?"
4. "What's further out — ideas or features you plan to build eventually?"

Optionally run `git log --oneline -20` to suggest patterns from recent history.

Show for review:
```
Here's what I'll create:
NOW: • [item 1]
NEXT: • [item 2]
LATER: • [item 3]
Push to the system? (yes/edit/no)
```

On confirmation: push to system, write `.sector137/roadmap.md`.
See `../../references/roadmap-schema.md` for format.

---

## Step 3C: Local Mode (MCP unavailable)

**If `.sector137/state.json` exists, stop here:** the project already has local state. Tell the user it will sync once MCP is reachable, and never create `roadmap.md` beside it, because a second file is a competing source of truth.

Otherwise: same discovery questions as Create Mode. Write `.sector137/roadmap.md` with `#local-{n}` IDs.

Confirm: "Recorded locally: {N} items in `.sector137/roadmap.md`. Run `/sector137:init` to sync when the signal's back."

---

## Step 3D: Sync Mode (local items → server, roadmap.md projects)

Triggered by `--sync` or when `.sector137/roadmap.md` has `#local-*` IDs and MCP is connected. (Projects with `.sector137/state.json` use Step 0B instead — bulk sync, not this one-at-a-time flow.)

```
Found {N} unsynced items (#local-001 through #local-{n}).
Push to the system? (yes/no)
```

For each `#local-*` item:
1. `mcp__sector137__issues` with `action: "create"` and item data
2. Update ID in `.sector137/roadmap.md`: `#local-{n}` → `#server-{uuid}`
3. Set `syncedAt` in frontmatter

Confirm:
```
Synced {N} items. The system is calibrated.
| Local ID   | Server ID       | Title |
| #local-001 | #server-abc123  | Dark mode toggle |
.sector137/roadmap.md updated.
```

---

## Error Handling

| Situation | Response |
|-----------|----------|
| MCP unavailable (genuine network/auth failure) | Offer Local mode |
| MCP tool names resolve under a different (plugin-namespaced) prefix | Resolve once, proceed. See Step 1. Don't treat as unavailable. |
| `.sector137/state.json` has no bound product | Step 0A. Ask, don't guess. |
| `sync_state` returns `MISSING_DOCUMENT` or `VALIDATION_ERROR "Required"` | The document's shape is wrong. Rebuild it from `export_state` output (Step 0B.2), retry once, then use the `bulk_create` fallback. |
| Empty roadmap file | Treat as Create Mode |
| User cancels | "No changes made. Run `/sector137:init` again when ready. I'm patient." |
