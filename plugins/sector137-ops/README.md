# sector137-ops

Rook, with the ops MCP server (DORA metrics, incidents, deployments, services, initiatives). Part of the Sal's Crew marketplace (`sector137/crew`); it depends on the core `sector137` plugin, which Claude Code installs alongside it.

## Install

```
/plugin marketplace add sector137/crew
```

```
/plugin install sector137-ops@sector137
```

Then run `/reload-plugins`.

## Skills

| Command | What it does |
|---------|--------------|
| `/sector137-ops:rook` | Interactive platform, GitOps, incident triage and reliability session with Rook Castellan |

## Agents

| Agent type | Use |
|------------|-----|
| `sector137-ops:infra-rook` | Dispatched infrastructure and operations work, including the headless diagnose, verify and propose loop |

## The server

`.mcp.json` registers one server, `ops`, at `https://app.sector137.io/mcp/ops`. It serves `record_incident`, `resolve_incident`, `record_deployment`, `get_dora_metrics`, the initiative tools and the service reader. Claude Code loads its tools as `mcp__plugin_sector137-ops_ops__<tool>`, for example `mcp__plugin_sector137-ops_ops__get_dora_metrics`.

Sign in once per server. If Claude Code reports "needs authentication", check that the server is up before logging in:

```
curl -s -o /dev/null -w '%{http_code}' https://app.sector137.io/mcp/ops
```

A `401` means log in:

```
claude mcp login plugin:sector137-ops:ops
```

A `5xx` or no response means the server is down and logging in won't help.

## Moving from 0.8.x

These commands used to live in the core plugin under `/sector137:`. Only the namespace changed; the behaviour did not. See the core README for the full rename table.

Docs: https://docs.sector137.io/claude-code
