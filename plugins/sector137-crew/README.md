# sector137-crew

Mira (navigator and crew coach) and Voss (agent architect), with the crew MCP server (run a crew member, crew proposals, crew conversations, skills list). Part of the Sal's Crew marketplace (`sector137/crew`); it depends on the core `sector137` plugin, which Claude Code installs alongside it.

## Install

```
/plugin marketplace add sector137/crew
```

```
/plugin install sector137-crew@sector137
```

Then run `/reload-plugins`.

## Skills

| Command | What it does |
|---------|--------------|
| `/sector137-crew:mira` | Interactive situational-awareness, retrospective and coaching session with Mira Strand |
| `/sector137-crew:voss` | Interactive agent creation, evaluation and calibration session with Voss Praxis |

## Agents

| Agent type | Use |
|------------|-----|
| `sector137-crew:navigator-mira` | Dispatched status synthesis, risk and capacity analysis, retrospectives |
| `sector137-crew:foundry-voss` | Dispatched Forge, Temper and Calibrate work on the crew |

## The server

`.mcp.json` registers one server, `crew`, at `https://app.sector137.io/mcp/crew`. It serves `run_crew`, the crew proposal tools, `ask_crew_agent`, the crew thread and conversation readers, and `list_skills`. Claude Code loads its tools as `mcp__plugin_sector137-crew_crew__<tool>`, for example `mcp__plugin_sector137-crew_crew__ask_crew_agent`.

Sign in once per server. If Claude Code reports "needs authentication", check that the server is up before logging in:

```
curl -s -o /dev/null -w '%{http_code}' https://app.sector137.io/mcp/crew
```

A `401` means log in:

```
claude mcp login plugin:sector137-crew:crew
```

A `5xx` or no response means the server is down and logging in won't help.

## Moving from 0.8.x

These commands used to live in the core plugin under `/sector137:`. Only the namespace changed; the behaviour did not. See the core README for the full rename table.

Docs: https://docs.sector137.io/claude-code
