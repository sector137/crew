# sector137-studio

Wren, Gen wireframe prototypes, and browser UX walkthroughs, with the studio MCP server (prototypes, PRDs, personas). Part of the Sal's Crew marketplace (`sector137/crew`); it depends on the core `sector137` plugin, which Claude Code installs alongside it.

## Install

```
/plugin marketplace add sector137/crew
```

```
/plugin install sector137-studio@sector137
```

Then run `/reload-plugins`.

## Skills

| Command | What it does |
|---------|--------------|
| `/sector137-studio:wren` | Interactive UX research and design session with Wren Glasswork |
| `/sector137-studio:prototype` | Generate and refine Gen wireframe prototypes (needs the server) |
| `/sector137-studio:ux-walkthrough` | Drive a real browser through a user flow and hand the evidence to Wren for a UX report |

## Agents

| Agent type | Use |
|------------|-----|
| `sector137-studio:design-wren` | Dispatched design tasks: UX proposals, design review |

## The server

`.mcp.json` registers one server, `studio`, at `https://app.sector137.io/mcp/studio`. It serves prototype tools (`generate_prototype`, `regenerate_prototype_step`, `get_prototype`, `list_prototypes`), PRD tools, and persona tools. Claude Code loads its tools as `mcp__plugin_sector137-studio_studio__<tool>`, for example `mcp__plugin_sector137-studio_studio__generate_prototype`.

Sign in once per server. If Claude Code reports "needs authentication", check that the server is up before logging in:

```
curl -s -o /dev/null -w '%{http_code}' https://app.sector137.io/mcp/studio
```

A `401` means log in:

```
claude mcp login plugin:sector137-studio:studio
```

A `5xx` or no response means the server is down and logging in won't help.

## Moving from 0.8.x

These commands used to live in the core plugin under `/sector137:`. Only the namespace changed; the behaviour did not. See the core README for the full rename table.

Docs: https://docs.sector137.io/claude-code
