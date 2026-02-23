# Mode Detection — Hull Sensor Check

All `/sal` workflows detect MCP availability before proceeding. I need to know what instruments I have.

## Detection

Call `mcp__canonize-roadmap__get_issue_stats`.

**Success → MCP mode.** Full telemetry. Use MCP tools for all operations.

**Failure → Local mode.** Flying on instruments only. Read/write `.can/roadmap.md` instead.

## Local Mode Rules

- Parse `.can/roadmap.md` using the schema in `references/roadmap-schema.md`
- Always tell the user at the end: "Working offline — changes saved to `.can/roadmap.md`. Run `/sal init` to sync when the signal's back."
- Assign `#local-N` IDs (increment from max existing local ID)

## Auth Errors

If MCP fails with auth errors: "Comms array can't authenticate. Check that `CANONIZE_API_KEY` is set in `.mcp.json` under `mcpServers.canonize-roadmap.env` and restart Claude Code. I'll be here."

## Which Workflows Require MCP

- `workflows/prototype.md` — requires MCP, no meaningful local fallback
- All others — work offline with `.can/roadmap.md`
