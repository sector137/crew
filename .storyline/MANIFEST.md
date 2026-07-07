---
title: Storyline Manifest
status: canon
last_updated: 2026-02-26
summary: Machine-readable index of all .storyline/ files — read this first.
tags: [index, meta]
---

# .storyline/ Manifest

> **For AI agents:** Read this file first. It tells you what exists, what each file does, and how they connect. You almost never need to read all 19 files — use this to pick the 2-3 you actually need.

---

## Quick Reference

| File | Summary | Tags |
|------|---------|------|
| `README.md` | Entry point — the recruiting pitch, crew intro, how the system works | overview, onboarding |
| `universe.md` | World-building — The Black Hole, The Other Side, The Machine, HUD, journey narrative | world, setting, lore |
| `codex.md` | Vocabulary — Delta/Campaign/Release hierarchy, HUD terms, Campaign beats, interaction model | vocabulary, mechanics |
| `voice.md` | UX voice guide — how Sal + crew speak in empty/success/error/loading states, crew-tinted panels | voice, ux-copy, tone |
| `brand.md` | Visual identity — name rationale, HUD color system, crew colors, typography, design principles, canonical art | brand, visual, colors |
| `themes.md` | Six thematic pillars — Translation, Entropy vs Order, Systems vs Humans, Communication, Evidence vs Intuition, Taste | themes, narrative |
| `dynamics.md` | Team conflict patterns, feedback loops (Customer->Product, Market->Strategy, Taste->Quality), manifesto | dynamics, conflict |
| `operations.md` | Sal's 10 Rules, pipeline states (FLOWING/CONSTRAINED/DEGRADED/HALTED), WIP limits, human authority model | rules, pipeline, authority |
| `the-human.md` | The captain's arc — Week 1 through Year 1 transformation, what only humans contribute | human, arc, transformation |
| `research.md` | The Observatory — synthetic personas, Kano/Intel missions, Gen prototypes, research flow | research, observatory, kano |
| `context-bus.md` | Aspirational design for crew communication — signal types, channels, Langfuse observability | aspirational, communication, infrastructure |
| `tool-privileges.md` | Aspirational privilege matrix — who touches what, MCP tool access, file system access, escalation paths | aspirational, permissions, trust |
| `crew/README.md` | Crew roster, org chart, alliance structures, core loop, how each agent relates to the human | crew, index, org |
| `crew/sal.md` | Software Sal — personality spectrum, WIP philosophy, overseer role, relationships, backstory | character, sal, conductor |
| `crew/margot.md` | Margot Flux — Vision/Intel dual modes, absorbed Vesper's intel capability, backstory | character, margot, product |
| `crew/kael.md` | Kael Deepstack — 5 engineering modes, Lloyd Christmas energy, absorbed 4 specialties, backstory | character, kael, engineering |
| `crew/wren.md` | Wren Glasswork — taste authority, research authority, design principles mechanism, backstory | character, wren, design |
| `crew/harlan.md` | Harlan Closer — 4 customer modes, transporter ability, absorbed Nova's GTM, backstory | character, harlan, customer |
| `crew/mira.md` | Mira Strand — behind-the-scenes crew coach, Langfuse telemetry reader, quality drift detection | character, mira, coaching |

---

## File Categories

### Core Canon (read these for full universe understanding)
- `README.md` — Start here
- `universe.md` — The world
- `codex.md` — The vocabulary
- `themes.md` — The meaning

### Voice & Brand (read these for any user-facing output)
- `voice.md` — How to write as the crew
- `brand.md` — Visual identity and design system

### Characters (read the specific character you need)
- `crew/README.md` — Quick roster + relationships
- `crew/sal.md` | `crew/margot.md` | `crew/kael.md` | `crew/wren.md` | `crew/harlan.md` | `crew/mira.md`

### Operations & Systems (read these for process/mechanics)
- `operations.md` — Pipeline rules and states
- `dynamics.md` — How the crew interacts
- `the-human.md` — The captain's journey

### Aspirational (not yet implemented)
- `context-bus.md` — Future crew communication system
- `tool-privileges.md` — Future permission model

### Research
- `research.md` — The Observatory and research capabilities

---

## Dependency Graph

```
README.md (entry point)
  ├── universe.md ← codex.md, brand.md, themes.md, research.md
  ├── crew/README.md ← crew/*.md, dynamics.md
  ├── operations.md ← crew/sal.md, codex.md
  ├── the-human.md ← universe.md, crew/*.md, themes.md
  ├── voice.md ← brand.md, crew/*.md
  └── context-bus.md, tool-privileges.md (aspirational, standalone)
```

---

## Key Concepts (cross-cutting)

| Concept | Defined In | Referenced By |
|---------|-----------|---------------|
| Delta (unit of work) | `codex.md` | `operations.md`, `dynamics.md`, `crew/sal.md` |
| Campaign (strategic arc) | `codex.md` | `operations.md`, `crew/margot.md` |
| The Other Side | `universe.md` | `README.md`, `the-human.md`, `themes.md` |
| The Machine | `universe.md` | `README.md`, `brand.md` |
| The Feed | `codex.md` | `voice.md`, `crew/sal.md` |
| Pipeline States | `operations.md` | `crew/sal.md`, `context-bus.md` |
| Taste Authority | `crew/wren.md` | `dynamics.md`, `themes.md`, `operations.md` |
| The Transporter | `crew/harlan.md` | `research.md`, `universe.md` |
| HUD Color Tokens | `brand.md` | `voice.md`, `crew/README.md` |
| The 10 Rules | `operations.md` | `dynamics.md`, `the-human.md` |
| The Override Record | `operations.md` | `the-human.md`, `crew/sal.md` |
| Design Principles | `crew/wren.md` | `dynamics.md`, `voice.md` |
| Customer Signal Report | `dynamics.md` | `crew/harlan.md`, `crew/margot.md` |

---

## Canon Status

All files are **canon** unless marked otherwise:
- `context-bus.md` — Status: **aspirational** (design intent, not implemented)
- `tool-privileges.md` — Status: **aspirational** (design intent, not implemented)
- All other files — Status: **canon**
