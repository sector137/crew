---
title: Brand Identity — Sector 137
status: canon
last_updated: 2026-02-26
summary: Visual identity — name rationale, HUD color tokens, crew colors, typography, design principles, canonical art assets.
depends_on: [universe.md, voice.md, crew/]
tags: [brand, visual, colors]
---

# Brand Identity — Sector 137

> See also: [universe.md](./universe.md) | [voice.md](./voice.md) | [crew/](./crew/)

---

## The Name

The brand name is **Sector 137**. It's the sector of space the crew operates in. The product isn't named after a feature — it's named after the place.

### Why It Works

- It's a place, not a function. Products come and go. A sector endures.
- It's shared. The crew, the Machine, the pipeline, the workshops — they all live in Sector 137.
- It carries the dual identity naturally: the product is what operates in Sector 137, and the workshop is where Sector 137 builds custom systems.
- It sounds like something you want access to. "Welcome to Sector 137" has gravity.

Package names: `@sector137/*`

---

## Visual Direction — The HUD Aesthetic

### Mood

Iron Man's helmet display meets the control panels of *Interstellar*'s Endurance. Clean holographic UI, translucent panels, soft glowing accents. Not retro — futuristic but grounded. The kind of interface designed by someone who thinks efficiency is beautiful.

---

## Color System

### HUD Palette

| Token | Value | Usage |
|-------|-------|-------|
| **Void** | `#0A0A0F` | Primary background — deep space |
| **Hull** | `#14141F` | Card/panel backgrounds — spaceship interior |
| **Bulkhead** | `#1E1E2E` | Elevated surfaces — structural elements |
| **Grid** | `#2A2A3A` | Borders, dividers — the wireframe of the world |
| **Ghost** | `#4A4A6A` | Decorative/structural only — disabled states, icons, UI chrome. Fails WCAG AA as readable text |
| **Signal** | `#8A8AAA` | Secondary/muted readable text — passes WCAG AA (~5.7:1 on Hull) |
| **Lumina** | `#E0E0F0` | Primary text — clear, bright, present |
| **Beacon** | `#00FFAA` | Primary accent — the signal, success, active states |
| **Flare** | `#FF6B35` | Warning, attention — Sal's stress color + Kael's identity (dual duty: when the system is stressed, Kael is usually involved) |
| **Rift** | `#B44AFF` | Links, interactive elements — the portal color |
| **Pulse** | `#00BBFF` | Info, data visualization — analytical calm |
| **Ember** | `#FF4444` | Error, danger — system critical |
| **Copper** | `#C47F3D` | Warm confidence — sales, customer, outreach |

### Crew Colors

| Character | Color | Token | Rationale |
|-----------|-------|-------|-----------|
| **Sal** | — | He IS the HUD | The whole palette is Sal |
| **Margot Flux** | `#B44AFF` | Rift | Purple — portals, futures, possibilities |
| **Kael Deepstack** | `#FF6B35` | Flare | Orange — fire, forge, urgency |
| **Wren Glasswork** | `#00FFAA` | Beacon | Green/teal — growth, signal, vitality |
| **Harlan Closer** | `#C47F3D` | Copper | Warm, grounded, valuable, honest |

---

## Typography

| Role | Font | Rationale |
|------|------|-----------|
| **Display / Sal's Voice** | Space Grotesk | Geometric, modern, slightly futuristic without being gimmicky |
| **Body / UI** | JetBrains Mono | Monospace for the engineering context, highly legible |
| **Data / Code** | JetBrains Mono | Consistency with the engineering identity |

---

## HUD Design Principles

The UI should feel like it's projected onto glass:

- **Translucency over opacity.** Panels should feel like they float over the void. Subtle backdrop blur, low-opacity backgrounds.
- **Glowing edges, not hard borders.** Borders feel like light traces, not walls. Thin, luminous, slightly soft.
- **Data as starlight.** Charts, graphs, and metrics feel like constellations — points of light connected by meaning.
- **Micro-animations with purpose.** Things don't just appear — they materialize. A card sliding in is a system component coming online.
- **Sal's presence.** Sal is felt in the UI even when he's not speaking. His personality comes through in information architecture, transitions, error handling.

---

## Visual Identity & Assets

**Art Style:** 2D adult animated sci-fi sitcom — flat vibrant colors, crisp thick black outlines, slightly cynical and exaggerated character design, clean vector-like animation aesthetic. Flat but cinematic lighting. This is the canonical style for all crew art.

### Canonical Crew Portraits

All portraits live in `apps/landing/public/`. These are the definitive crew images.

| Character | File | Description |
|-----------|------|-------------|
| **Sal** | `sal-profile.webp` | Short dark brown hair, translucent green HUD visor over eyes, dark navy space suit with Beacon teal and Flare orange accents. Slight smirk. Holographic data panels floating behind him. Deep space background. |
| **Margot** | `margot-profile.webp` | Dark hair with purple highlights, sharp angular features, confident knowing smirk. Dark grey suit with Rift purple glowing piping. Bridge setting with purple holographic displays. |
| **Kael** | `kael-profile.webp` | Brown hair, stubble, slightly worried expression — mouth open mid-diagnosis. Orange work jumpsuit with tools in breast pocket. Engine room setting with pipes and machinery. |
| **Wren** | `wren-profile.webp` | Dark curly/wavy hair, dark skin, small green earring. Confident expression. Purple and dark blue suit with Beacon teal/green geometric trim. Space visible behind her. |
| **Harlan** | `harlan-profile.webp` | Wavy brown hair, open white shirt under blue jacket with copper/orange trim. Big warm genuine smile. Warm copper/amber background. |

### Environment Art

| Asset | File | Description |
|-------|------|-------------|
| **The Black Hole** | `distant-bg.webp` | Swirling cosmic vortex — purples, golds, deep blacks. The passage between this side and The Other Side. |
| **The Machine / Workshop** | `footer-bg.webp` | Garage interior with the Machine — multi-monitor station, glowing blue core, robotic arms, cables, workbench, framed crew photo. |

### Generating New Assets

Use the `/sector137:visual-prompt` skill — references `universe.md` for character details and `prompt-patterns.md` for style prefix and templates.

---

## Resolved Questions

1. **"Is Sal the AI?"** — **No.** Sal is the character. AI is the engine. The product is Sal, not "an AI assistant." This is final.
2. **Multi-user dynamics.** — **One Sal per project.** Adapts communication style per person. Same information, different rendering.
3. **Sal's relationship with AI.** — Sal employs AI as one of many systems. It's infrastructure. He doesn't discuss it.
4. **Visual representation.** — Resolved. Canonical portraits exist. Sal has a face for brand while remaining "the system itself" in-product. The duality is intentional.

### Deferred Questions

5. **Voice acting.** — Deferred. When relevant: deadpan, slightly fast, clearly amused by his own observations.
6. **Easter eggs and lore delivery.** — Deferred. Loading screens, achievement unlocks, hidden interactions are delivery mechanisms for when core experience is solid.
