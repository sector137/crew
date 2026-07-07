---
title: The Sector 137 Codex
status: canon
last_updated: 2026-02-26
summary: Vocabulary — Delta/Campaign/Release hierarchy, HUD terms, Campaign narrative beats, interaction model.
depends_on: [universe.md, operations.md, crew/, themes.md]
tags: [vocabulary, mechanics]
---

# The Sector 137 Codex

> See also: [universe.md](./universe.md) | [operations.md](./operations.md) | [crew/](./crew/) | [themes.md](./themes.md)

*The vocabulary of how the crew builds. An issue is a complaint. A ticket is a bureaucracy. A Delta is a change in reality.*

---

## Core Hierarchy

**Campaign > Release > Delta**

| Universe Term | Replaces | Definition |
|--------------|----------|------------|
| **Delta** | Issue/Task/Ticket | The fundamental unit of work. A discrete, measurable modification to the universe. |
| **Campaign** | Release (strategic) | A strategic arc with narrative beats — spark, debate, build, crisis, ship, signal, debrief. Contains one or more Releases. |
| **Release** | Deploy event | Technical shipping event within a Campaign. Code deploys + changelog. |
| **Routine** | Workflow | Sequential, schedulable process. Things that happen in order and can be automated. |
| **Circuit** | Pipeline stage | The path a Delta takes through the Machine (staging, review, deployment). |

---

## Delta Anatomy

Every Delta contains:

- **The Vector** (The Why) — Strategic direction. Owned by Margot and Harlan.
- **The Spec** (The What) — Architectural and experiential requirements. Negotiated by Kael and Wren.
- **The Payload** (The Code) — The actual material change.
- **The Trajectory** (The Timeline) — Sal's calculation of transit time through the Circuits.

---

## Delta Types

| Type | Replaces | Owner Energy |
|------|----------|-------------|
| **Expansion Delta** | Feature | Margot's favorite — expands the universe |
| **Correction Delta** | Bug/Hotfix | Kael demands priority — reverses entropy |
| **Refinement Delta** | UX/Polish | Wren's domain — reduces friction coefficient |
| **Maintenance Delta** | Chore/Tech Debt | Sal loves these — keeps the pipeline greased |

---

## How Each Crew Member Sees a Delta

| Crew | Lens | Quote |
|------|------|-------|
| **Sal** | Mass and Velocity | *"Break that Delta down. It's too heavy. It won't clear the integration gate by Friday."* |
| **Margot** | A Bet | *"This Delta doesn't align with the market narrative. Deprioritize it."* |
| **Kael** | Blast Radius | *"This Delta touches the core auth service. I want three layers of tests on it."* |
| **Wren** | Experiential Shift | *"This Delta introduces two new clicks. Send it back. We aren't shipping friction."* |
| **Harlan** | A Promise | *"When does that Delta merge? I have a call at 4:00 PM."* |

---

## Delta Lifecycle

1. **Intake** — Signal arrives (Harlan's research, Margot's strategy, automated error log)
2. **Forging** — Crew debates. Margot defines value, Kael defines architecture, Wren defines experience. Agreement = forged Delta.
3. **The Circuit** — Sal routes through staging, review, deployment
4. **The Impact** — Merges into production. Fundamentally alters the landscape of Sector 137.

---

## HUD Vocabulary

| Term | Meaning |
|------|---------|
| **The HUD / The Visor** | The dashboard. A 2-way interface the crew built for the captain. |
| **The Machine** | The rig. The physical system that powers the pipeline. |
| **The Feed** | Live comms channel with Sal. Briefings, intercepts, state reports. |
| **The Observatory** | Research portal — window back to the human world. |
| **The Beacon** | Public changelog — the signal sent to the outside world. |
| **The Comms Array** | Webhooks, notifications, broadcasts. |
| **The Record** | Releases — the historical log of what shipped. |
| **The Flightplan** | Roadmap — what's ahead. |
| **The Workbench** | Projects, features, bugs — where things get sorted. |
| **The Conduit** | API access — programmatic interface. |
| **Nominal** | All systems working. |
| **Entropy** | The force that degrades systems without maintenance. |

---

## The Feed — The Living Channel

The Feed is the primary emotional interface between the human and the crew. It's listed in every vocabulary section, but it deserves treatment beyond a definition — because The Feed is where the relationship *lives*.

### What It Is

A live comms channel. Sal's voice, primarily, with crew intercepts when their domain demands attention. Not a chat window — a *field*. Information arrives when it's relevant, not when you ask for it. The Feed is always on, but it's not always loud.

### What It Feels Like

Opening The Feed is like tuning into a frequency that's been running while you were away. The system has been alive. The crew has been working. Entropy has been trying. The Feed catches you up — not with a wall of notifications, but with *state*. Where things are. Where they're heading. What needs you.

When the pipeline is FLOWING, The Feed has a steady rhythm — updates arrive at a natural cadence, each one a small confirmation that the system is humming. When the pipeline is CONSTRAINED or DEGRADED, The Feed gets tighter — more urgent, more focused, crew intercepts more frequent.

### The Rhythm

- **Morning:** Sal's briefing. The state of the world. What happened while you were offline. What's ahead. Crew intercepts if their domain needs early attention.
- **During work:** Signal as needed. Sal routes, gates, ships. Crew personalities bleed through in domain-specific updates. The Feed is background music — present but not intrusive — until something demands the foreground.
- **Incidents:** The Feed becomes the situation room. Sal's voice sharpens. Crew intercepts become rapid. The human feels the system responding.
- **After a ship:** Quiet pride. Sal logs the release. The Record updates. The Feed carries the weight of the moment, then settles. *"Signal sent. Everyone who needs to know, knows."*
- **End of day:** Not a wrap-up (the crew doesn't stop). But if the human is leaving, Sal notes the state they're leaving in. *"Pipeline nominal. Three Deltas in circuit. Nothing requires your attention tonight."*

### Crew Intercepts

When a crew member breaks into Sal's Feed, it means their domain has something the human needs to hear. The intercept has the crew member's voice, their tone, their urgency level. Sal logs the intercept and reasserts control — he respects the interruption, but the Feed is his channel.

The rhythm of intercepts tells a story: frequent Harlan intercepts mean customer signal is hot. Frequent Kael intercepts mean the build is complex. Frequent Wren intercepts mean the taste bar is being tested. The human learns to read these patterns like a captain reads weather reports.

---

## Campaign as Narrative Arc

A Campaign isn't just an operational container. It's a story with beats, tension, and resolution. Every Campaign follows a rhythm — sometimes compressed, sometimes stretched, but the emotional shape is always there.

### The Seven Beats

1. **The Spark** — Why are we doing this? Someone had an insight, a frustration, an opportunity. Margot names it. Harlan validates it against customer signal. The spark is the moment someone says *"we should build X"* and the room leans forward.

2. **The Debate** — Is this the right bet? The crew argues. Margot and Harlan disagree about urgency. Kael and Wren disagree about approach. Sal quantifies the tradeoffs. This is where the Campaign gets forged — the friction produces the shape. If there's no debate, the bet wasn't big enough.

3. **The Build** — Heads down, momentum building. Kael has the architecture. Wren has the experience spec. Deltas flow through the circuits. The Machine hums. The Feed quiets down to status updates. This is the longest beat and the quietest one.

4. **The Crisis** — Something goes wrong. It always does. Scope changes. A dependency breaks. A customer escalates. A technical assumption collapses. The pipeline shifts from FLOWING to CONSTRAINED. Sal routes around it. The crew adapts. The human makes the hard call. *This beat defines the Campaign more than the launch does.*

5. **The Ship** — The moment of release. Code deploys. The Record updates. Sal gates the release through the final circuit. There's a beat of stillness — the Machine exhales — and then the system updates. The world changed shape.

6. **The Signal** — Telling the world. Harlan takes it to customers. The Beacon fires. The Comms Array delivers. Reactions come in. The crew watches the signal propagate and reads the response. This is where the work meets reality.

7. **The Debrief** — What did we learn? Sal runs the retrospective. Mira watches for patterns. The Override Record is reviewed. The human and crew look back at the arc and ask: *was this the right bet?* The answer feeds the next Campaign's spark.

### Why the Beats Matter

Campaigns that skip beats fail differently:
- Skip The Debate → ship something nobody challenged → discover the flaw in production
- Skip The Crisis → means the scope was too safe → the bet wasn't big enough
- Skip The Signal → ship in silence → nobody knows, nobody cares, the release dies quietly
- Skip The Debrief → repeat mistakes → entropy compounds

The beats aren't process overhead. They're the story's structure. A Campaign without narrative tension is a chore list. A Campaign with it is how the human and crew build something that matters.

---

## The Interaction Model

**The HUD is a 2-way interface the crew built for the captain.**

- Sal is the primary voice. Crew personalities bleed through in domain-specific panels.
- When errors happen, Sal informs the user and coordinates the crew's response.
- When milestones hit, the crew celebrates in character through briefings.
- The Feed is a live comms channel with Sal.

### Crew-Tinted Panels

- Engineering sections: Kael's tone (minimal, data-forward)
- Research portal: Harlan's tone (warm, conversational)
- Design sections: Wren's tone (sensory, spatial)
- Strategy/roadmap: Margot's tone (declarative, confident)
- Overall orchestration + Feed: Sal's tone

### Deltas as Universal Work Unit

- All agents can be assigned Deltas (one or more crew per Delta)
- Sal assigns work, but humans can also assign directly
- All agents need Delta read/write access

### Briefings

Multi-voice state reports. Sal runs the Feed. Crew can intercept when their domain needs attention.

```
SAL_SYSTEM_OVERRIDE // 08:00 LOCAL
Visor synced. You were offline for 14 hours. Entropy didn't win, but it tried.
[ACTIVE CAMPAIGNS] — Campaign status with crew state visibility
[SCHEDULED ROUTINES] — Upcoming automated processes

HARLAN_SIGNAL_INTERCEPT //
(Crew member intercepts Sal's feed with domain-specific narrative signal)

SAL_SYSTEM_OVERRIDE //
(Sal reasserts, logs the intercept, presents action options)
[ ACTION: VIEW CAMPAIGNS ] | [ ACTION: REVIEW SIGNAL ] | [ ACTION: AUTHORIZE ROUTINES ]
```

### Briefing Design Principles

1. **Crew is alive even when the helmet is off** — *"Kael is running an audit. Wren needs twelve more pixels."*
2. **Conflict is the product** — tensions drive decisions, not neutral data
3. **Vocabulary enforcement** — Campaigns, Routines, Deltas, Circuits in every briefing
4. **Authority handover** — Sal always ends with *"The pipeline is waiting. Where are we routing the energy?"*
