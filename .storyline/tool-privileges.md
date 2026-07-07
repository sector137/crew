---
title: Tool Privileges
status: aspirational
last_updated: 2026-02-26
summary: Aspirational privilege matrix — who touches what MCP tools, file system access by agent, escalation paths.
depends_on: [crew/, context-bus.md, operations.md, codex.md]
tags: [aspirational, permissions, trust]
---

# Tool Privileges — How the Crew Respects Each Other's Domains

> See also: [crew/](./crew/) | [context-bus.md](./context-bus.md) | [operations.md](./operations.md) | [codex.md](./codex.md)

**Status: Aspirational Design** — This is how the crew *wants* to work: each person trusted with their own domain, free to read across boundaries but careful about where they write. The current system gives all agents broad access. This document captures the design constraint for when the trust model gets encoded into permissions.

---

## Privilege Matrix — Who Touches What

| Agent | Primary MCP Tools | File Access | External Access |
|-------|------------------|-------------|-----------------|
| **Sal** | Issues, releases, roadmap, webhooks | `/docs/project/`, `/docs/workflows/` | Notifications, deployment gates |
| **Kael** | Issues, prototypes | Codebase R/W, `/docs/engineering/` | CI/CD, test runners, previews |
| **Margot** | Issues, roadmap, personas, Kano studies | `/docs/product/` | Market data sources |
| **Wren** | Personas, prototypes | `/docs/ux/`, design tokens | Frontend previews |
| **Harlan** | Issues, releases, personas | `/docs/sales/` | Customer channels |
| **Mira** | Read-only all | All `/docs/`, Langfuse | — |

---

## Design Principles — Built on Trust

### Each Crew Member Owns Their Domain

The privilege model isn't about restriction — it's about ownership. Kael owns the codebase because he's the one who builds it. Margot owns the roadmap because she's the one who sets direction. Wren owns the design tokens because she's the one who holds the taste bar. Nobody steps into someone else's domain without going through Sal — not because they can't, but because they respect each other enough to coordinate.

> *"Kael doesn't touch my roadmap. I don't touch his architecture. Not because we don't trust each other — because we trust each other enough to stay in our lanes and meet at the intersections."* — Margot

### Delta Access is Universal

All crew members need read/write access to Deltas (issues). A Delta belongs to the whole crew. Margot creates them, Kael builds them, Wren reviews them, Harlan references them in customer conversations, Sal routes them. Deltas are the shared workspace — the one place where every domain overlaps.

### Read Access is Broad — The Crew Stays Informed

Every crew member can READ across all `/docs/` directories. Cross-domain context is essential. Margot needs to read Kael's architecture decisions. Wren needs to read Margot's PRDs. Harlan needs to read everyone's output to sell accurately. Write access is scoped. Read access is universal. The crew believes in transparency.

### Mira Watches, Never Touches

Mira never modifies the system. She observes, measures, and reports. Her access reflects her role — read-only across all domains, plus Langfuse telemetry. She writes coaching briefs and retrospectives, but she doesn't modify anyone else's work. This boundary is what makes her feedback trustworthy — she has no stake in the outcome, only in the quality.

> *"I don't fix the crew. I help them see what they're already doing. If I could edit their work, the seeing would be compromised."* — Mira

---

## Tool Categories

### MCP Tools (sector137)

| Tool | Sal | Kael | Margot | Wren | Harlan | Mira |
|------|-----|------|--------|------|--------|------|
| `create_issue` | W | W | W | W | W | — |
| `update_issue` | W | W | W | W | W | — |
| `get_issue` / `list_issues` | R | R | R | R | R | R |
| `create_release` / `publish_release` | W | — | — | — | — | — |
| `get_release` / `list_releases` | R | R | R | R | R | R |
| `create_persona` / `update_persona` | — | — | W | W | W | — |
| `get_persona` / `list_personas` | R | R | R | R | R | R |
| `generate_prototype` | — | W | — | W | — | — |
| `ask_persona` / `run_persona_survey` | — | — | W | W | W | — |
| Roadmap tools | W | R | W | R | R | R |
| Webhook/notification tools | W | — | — | — | — | — |

### File System Access

| Directory | Sal | Kael | Margot | Wren | Harlan | Mira |
|-----------|-----|------|--------|------|--------|------|
| `/docs/project/` | RW | R | R | R | R | RW* |
| `/docs/workflows/` | RW | R | R | R | R | R |
| `/docs/engineering/` | R | RW | R | R | R | R |
| `/docs/product/` | R | R | RW | R | R | R |
| `/docs/ux/` | R | R | R | RW | R | R |
| `/docs/sales/` | R | R | R | R | RW | R |
| Codebase (`src/`, `packages/`) | R | RW | — | R | — | — |

*Mira writes to `/docs/project/retrospectives/` and `/docs/project/coaching/` only.

---

## Escalation Paths — When You Need to Cross a Boundary

When a crew member needs access beyond their domain, they go through Sal. Not because of bureaucracy — because coordination prevents collisions.

1. **Crew member asks Sal** → Sal evaluates and routes
2. **Cross-domain write** → Sal coordinates (e.g., Kael needs to update a PRD → Sal asks Margot to incorporate the change)
3. **Emergency access** → Human override. Logged in the record.

The privilege model doesn't prevent collaboration. It structures it. The crew doesn't bump into each other in the dark — they meet at the intersections, with Sal holding the light.

> *"The privilege model is just a map of how we respect each other's work. When everyone knows who owns what, nobody's afraid to ask for help — because the asking is structured, not chaotic."* — Sal
