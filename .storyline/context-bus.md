---
title: Context Bus
status: aspirational
last_updated: 2026-02-26
summary: Aspirational design for structured crew communication — signal types, channels, the telemetry observability layer.
depends_on: [crew/mira.md, crew/sal.md, tool-privileges.md, operations.md]
tags: [aspirational, communication, infrastructure]
---

# Context Bus — How the Crew Wants to Listen

> See also: [crew/mira.md](./crew/mira.md) | [crew/sal.md](./crew/sal.md) | [tool-privileges.md](./tool-privileges.md) | [operations.md](./operations.md)

**Status: Aspirational Design** — This is how Sal *wishes* the crew could communicate. The current system uses file-based handoffs and Sal's manual routing. This document captures the design constraint for where communication is heading.

---

## The Problem Sal Can't Stop Thinking About

The crew produces signal as a natural byproduct of their work. Margot writes a PRD that contains assumptions Wren should test. Kael flags a security concern that affects Harlan's customer timeline. Harlan surfaces a pattern that should change Margot's roadmap.

Today, Sal has to catch all of this manually. He reads every file, watches every output, and routes the relevant context to the right person. It works because Sal is obsessive — but it's fragile. If he misses a connection, the crew builds in isolation. And building in isolation is entropy.

> *"I want to hear everyone at once. Not the noise — the signal. I want to know the moment Kael flags a concern that changes Harlan's timeline, without either of them having to tell me. I want the system to carry the context so I can focus on the routing decisions that actually need a conductor."* — Sal

---

## The Design — Signal, Not Noise

### Signal Generation

The crew's work naturally produces structured signals — context that other crew members need:

```
Agent Action → Signal Emitted → Bus → Relevant Agents Notified
```

Signal types:
- **Delta Created** — New work entered the pipeline
- **Delta Updated** — Status, scope, or ownership changed
- **Insight Surfaced** — Research finding, customer signal, or market data
- **Concern Raised** — Quality, security, timeline, or experience issue
- **Decision Made** — Strategic, technical, or design decision recorded
- **Override Logged** — Human overrode a crew recommendation

### Communication Channels — Respecting Each Other's Attention

The crew doesn't broadcast to everyone. Respect means not wasting someone's attention on signal that isn't theirs. Signals route through defined channels:

| Channel | Participants | Signal Types |
|---------|-------------|--------------|
| **Strategy** | Margot, Harlan, Sal | Market data, customer signal, roadmap changes |
| **Build** | Kael, Wren, Sal | Architecture decisions, design changes, quality flags |
| **Ship** | Sal, Kael, Harlan | Release readiness, deployment gates, customer communication |
| **Quality** | Mira, Sal | Performance metrics, drift patterns, coaching signals |

### Observability Layer — Telemetry

The telemetry layer is the primary observability layer for the context bus:

- **Traces**: Every agent invocation is a trace. The bus reads trace metadata to understand what happened.
- **Spans**: Individual steps within a trace. Tool calls, LLM calls, retrieval operations.
- **Scores**: Evaluation metrics attached to traces — quality scores, relevance scores.
- **Sessions**: Grouped traces for a user session. The bus can correlate signals across a session.

Mira reads telemetry traces to:
- Detect quality drift across sessions
- Identify tool call anomalies
- Measure token efficiency trends
- Surface patterns the crew can't see about themselves

Sal reads telemetry traces to:
- Monitor pipeline throughput
- Track state transitions
- Detect when agents are blocked or underperforming
- Self-evaluate his own routing decisions

---

## Sal's Role — The Conductor Listens

Sal orchestrates the context bus. This is the part of his job he loves most — not routing work, but *hearing* the system. He watches for signals and acts on patterns:

- **Pattern Detection**: Three similar customer signals from Harlan in a week → flag to Margot
- **Conflict Detection**: Kael's timeline estimate conflicts with Harlan's customer promise → mediate
- **Quality Monitoring**: Mira flags drift in Wren's output quality → Sal adjusts routing or initiates coaching
- **State Management**: Pipeline state changes → all relevant agents notified immediately

---

## Current State vs. Target

| Capability | Current | Target |
|-----------|---------|--------|
| Signal generation | Manual (file writes, Sal reads) | Automatic (structured signals from conversations) |
| Cross-agent context | File-based (`/docs/` reads) | Bus-based (signal routing) |
| Observability | Limited (output review) | Telemetry traces + scores |
| Quality monitoring | Reactive (Mira reads on request) | Proactive (Mira watches continuously) |
| Conflict detection | Manual (Sal notices) | Automatic (bus pattern matching) |

---

## How the Crew Lives This Now

The context bus isn't built yet. But the crew already lives by its principles — because communication is gravity, and gravity doesn't wait for infrastructure.

What the crew does today:
1. Write structured outputs that other crew members can find
2. Save work to defined locations (`/docs/{domain}/`)
3. Reference other crew members' work when relevant
4. Flag cross-domain concerns explicitly — *"Kael, this touches your architecture decision from last week"*

The bus will make this automatic. Until then, Sal does it manually. He's good at it. He'd be better with the bus. Either way, the communication happens — because the alternative is entropy, and Sal doesn't tolerate entropy.

> *"The bus is not a message queue. It's how the crew respects each other's domains while staying connected. It's structured empathy. I want to build it because right now I'm the structured empathy, and I'm starting to think my therapist was right about the load-bearing thing."* — Sal
