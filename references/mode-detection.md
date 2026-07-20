# Mode Detection — Hull Sensor Check

All `/sector137:sal` workflows detect MCP availability before proceeding. I need to know what instruments I have.

## Detection

Call `mcp__sector137__issues` with `action: "stats"`.

**Tool not found under that exact name** (common on first run in a project without its
own `.mcp.json` — the plugin's bundled connection loads tools under a longer,
plugin-namespaced form, e.g. `mcp__plugin_sector137_sector137__issues`): this is not
"MCP unavailable." Resolve the real tool name once (look for whatever tool on the same
server matches `*issues` alongside `*list_products`/`*releases`/`*sync_state`) and reuse
it for the rest of the session. Mention it once — offer to set up a project `.mcp.json`
(see README's "Connect the server") so future sessions get the short name directly
instead of re-resolving every time — but don't block on it.

**Call succeeds (under either name) → MCP mode.** Full telemetry. Use MCP tools for all operations.

**Call fails outright** (network error, auth error, no matching tool exists at all) **→ Local mode.** Flying on instruments only. Read/write `.sector137/roadmap.md` instead.

## Canonical Fallback Line

Every skill that touches MCP carries this line, verbatim, so the behaviour is uniform:

> If MCP is unavailable, continue offline against `.sector137/roadmap.md`. See `../../references/mode-detection.md`.

Copy it as-is into new skills. Don't paraphrase — one wording, one behaviour.

## Local Mode Rules

- Parse `.sector137/roadmap.md` using the schema in `references/roadmap-schema.md`.
- Always tell the user at the end: "Working offline — changes saved to `.sector137/roadmap.md`. Run `/sector137:init` to sync when the signal's back."
- Assign `#local-N` IDs (increment from the max existing local ID).
- Status words match the server: `backlog`, `planned`, `in_progress`, `completed`, `cancelled`.

### Releases offline

The rolling release lives in the roadmap as the `## Active Release: [tag]` section.

- **Active release** = that heading and its bullets. It always exists; if the section is missing, create it (tag `next`).
- **Scope** = move a bullet into `## Active Release`. **Descope** = move it back to `## Backlog`.
- **Ship** = move the section's bullets to `## Done`, mark them `completed`, append a `Shipped in [tag]` note, and cut a local git tag. The release re-publishes to the server on the next `/sector137:init` sync.

## Auth Errors

If MCP fails with auth errors: "Comms array can't authenticate. Set `SECTOR137_API_KEY` (an `rl_live_…` key from the dashboard) in `.mcp.json` under `mcpServers.sector137.env`, or reconnect via OAuth, then restart Claude Code. Setup: https://docs.sector137.io/claude-code. I'll be here."

## Which Workflows Require MCP

- `/sector137:prototype` (`skills/prototype/`) — requires MCP, no meaningful local fallback.
- All others — work offline with `.sector137/roadmap.md`.
