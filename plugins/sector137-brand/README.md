# sector137-brand

Lyra, with the brand MCP server (brand systems, voice schemas, completeness checks, LLM export). Part of the Sal's Crew marketplace (`sector137/crew`); it depends on the core `sector137` plugin, which Claude Code installs alongside it.

## Install

```
/plugin marketplace add sector137/crew
```

```
/plugin install sector137-brand@sector137
```

Then run `/reload-plugins`.

## Skills

| Command | What it does |
|---------|--------------|
| `/sector137-brand:lyra` | Interactive brand identity, voice calibration and brand completeness session with Lyra Trace |

## Agents

| Agent type | Use |
|------------|-----|
| `sector137-brand:brand-lyra` | Dispatched brand system, voice schema and token work |

## The server

`.mcp.json` registers one server, `brand`, at `https://app.sector137.io/mcp/brand`. It serves the brand tools (`create_brand`, `get_brand`, `get_brand_completeness`, `export_brand_llm` and the rest). Claude Code loads its tools as `mcp__plugin_sector137-brand_brand__<tool>`, for example `mcp__plugin_sector137-brand_brand__get_brand`.

Sign in once per server. If Claude Code reports "needs authentication", check that the server is up before logging in:

```
curl -s -o /dev/null -w '%{http_code}' https://app.sector137.io/mcp/brand
```

A `401` means log in:

```
claude mcp login plugin:sector137-brand:brand
```

A `5xx` or no response means the server is down and logging in won't help.

## Moving from 0.8.x

These commands used to live in the core plugin under `/sector137:`. Only the namespace changed; the behaviour did not. See the core README for the full rename table.

Docs: https://docs.sector137.io/claude-code
