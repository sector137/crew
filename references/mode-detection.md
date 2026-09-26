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

**Read the right product.** `issues` `list` and `stats` take no `productId` and can return several products' issues mixed together, so never plan from them. Take the `productId` from `.sector137/state.json`'s top-level `product` (or `list_products`), read that product's roadmap with `export_state {productId}`, and filter locally. Writes (`create`, `bulk_create`, `update`) take the `productId` directly.

**Call fails outright** (network error, auth error, no matching tool exists at all) **→ Local mode.** Flying on instruments only. Use the local state file (see Local Mode Rules).

**Before telling the user it's an auth problem, find out which failure it is.** Claude Code
labels an unreachable server "needs authentication" too — in real use, two of two probed
"needs auth" days were outages, and sessions retried logins that could never work. Probe once:

```
curl -s -o /dev/null -w '%{http_code}' -m 10 https://app.sector137.io/mcp
```

| Result | Meaning | Tell the user |
|---|---|---|
| `401` | Server up, this client isn't authorized | "Run `claude mcp login plugin:sector137:sector137` in a terminal (or `/mcp` → Authenticate), then start a new session." |
| `5xx`, `000`, timeout | Server down | "The sector137 server is down (HTTP {code}) — this is not an auth problem; logging in won't help. Working offline." |
| `200`/`405` but tools missing | Client-side wiring | "Server is up; the plugin's MCP connection didn't load. Run `/reload-plugins` or restart." |

## Canonical Fallback Line

Every skill that touches MCP carries this line, verbatim, so the behaviour is uniform:

> If MCP is unavailable, continue offline against `.sector137/state.json` if it exists, else `.sector137/roadmap.md`. See `../../references/mode-detection.md`.

Copy it as-is into new skills. Don't paraphrase — one wording, one behaviour.

## Local Mode Rules

- **Pick the state file:** `.sector137/state.json` if it exists, else `.sector137/roadmap.md`.
  Never create `roadmap.md` in a project that has `state.json` — a second file is a
  competing source of truth.
- **`state.json`:** read and write its `issues[]` directly (a `StateDocument`, see
  `references/roadmap-schema.md`). New issues get `id: "local-N"` and
  `meta: {origin: "local", serverId: null, localId: "local-N", dirty: true, syncedAt: null}`;
  edits to a synced issue set `meta.dirty: true`. Write it back with the file's existing
  formatting (2-space indent, non-ASCII kept) so diffs stay minimal.
- **`roadmap.md`:** parse it using the schema in `references/roadmap-schema.md`.
- Always tell the user at the end: "Working offline — changes saved to `{the file}`. Run `/sector137:init` to sync when the signal's back."
- Assign `local-N` IDs (increment from the max existing local ID).
- Status words match the server: `backlog`, `planned`, `in_progress`, `completed`, `cancelled`.

### Releases offline

The rolling release lives in the roadmap as the `## Active Release: [tag]` section.

- **Active release** = that heading and its bullets. It always exists; if the section is missing, create it (tag `next`).
- **Scope** = move a bullet into `## Active Release`. **Descope** = move it back to `## Backlog`.
- **Ship** = move the section's bullets to `## Done`, mark them `completed`, append a `Shipped in [tag]` note, and cut a local git tag. The release re-publishes to the server on the next `/sector137:init` sync.

## Auth Errors

Only after the probe above returns `401`: "Comms array can't authenticate. Run `claude mcp login plugin:sector137:sector137` in a terminal (or `/mcp` → Authenticate), then start a new session. Headless or CI? Register the server with an API key as a header instead — see README's 'Connect the server'. Setup: https://docs.sector137.io/claude-code. I'll be here."

An `env` block does nothing for an `http` server — the key goes in an `Authorization: Bearer` header.

## Which Workflows Require MCP

- `/sector137:prototype` (`skills/prototype/`) — requires MCP, no meaningful local fallback.
- All others — work offline with `.sector137/state.json` if it exists, else `.sector137/roadmap.md`.
