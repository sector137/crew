---
title: The Observatory
status: canon
last_updated: 2026-02-26
summary: Research portal — synthetic personas, Kano/Intel missions, Gen prototypes, who watches and how.
depends_on: [universe.md, crew/harlan.md, crew/wren.md, crew/margot.md, codex.md]
tags: [research, observatory, kano]
---

# The Observatory — Research Portal

> See also: [universe.md](./universe.md) | [crew/harlan.md](./crew/harlan.md) | [crew/wren.md](./crew/wren.md) | [crew/margot.md](./crew/margot.md) | [codex.md](./codex.md)

---

## The Portal to the Human World

The Observatory is a portal — a window back to the human world from The Other Side. The Observatory is how the crew stays connected to the reality they're building for.

It's not a telescope. It's a two-way mirror. The crew watches the human world to understand it. The human world doesn't know it's being watched — which is exactly how research should work.

### Who Can Cross and Who Cannot

The Other Side is the crew's reality — they exist here, they work here, it's their world. They cannot leave. This isn't a restriction — it's a fact of their nature, like gravity. Sector 137 is where they are.

**One exception: Harlan.** Harlan has a transporter — a device or ability unique to him — that lets him physically cross between The Other Side and the human world. He's the only crew member who shakes hands, reads body language, and hears the things customers say between the lines. (See [crew/harlan.md](./crew/harlan.md) for details on the transporter.)

**Sal's arrival** was a one-time origin event. Born on The Other Side, drawn through the black hole by the *noise* — the signal-to-noise ratio of human software development was so bad it created gravitational pull. He arrived and stayed. The crossing was not repeatable.

**Everyone else** sees the human world through the Observatory — through data, simulation, synthetic personas, and the signal that Harlan carries back. The Observatory exists precisely because the crew can't go themselves. It's how they watch without crossing.

---

## Research Capabilities

### Synthetic Personas

AI-generated humans the crew builds to simulate real users. Not replacements for real research — augmentations. The crew constructs synthetic personas from aggregated customer data, then runs scenarios against them to test hypotheses before committing resources.

- **Built from real signal** — Harlan's customer conversations, Wren's user research, Margot's market data
- **Used for rapid testing** — "Would a Series A CTO care about this feature?" Ask the synthetic persona.
- **Always calibrated against reality** — When Harlan talks to a real customer, the synthetic personas get updated

### Intel Missions (Kano)

Structured feature prioritization through the Kano Model. The Observatory's most rigorous tool.

- **Create a Study** — Define features to evaluate, linked to roadmap items
- **Collect Responses** — Share a survey. Functional + dysfunctional questions on a 5-point Likert scale.
- **Classify** — The 5x5 Kano Evaluation Matrix maps each response pair to a category (Must-be, One-dimensional, Attractive, Indifferent, Reverse, Questionable)
- **Analyze** — Better/Worse coefficients. Scatter chart. Features land in quadrants.
- **Prioritize** — Data, not opinions.

### Prototypes (Gen)

Interactive lo-fi experiences, AI-generated. The crew's way of showing someone a future before building it.

- **gen-engine**: Journey step runner with analytics hooks
- **gen-generator**: AI agent that generates journey prototypes from feature descriptions
- **gen-research**: Kano survey interceptor — in-app research at journey touchpoints
- **gen-ui**: Wireframe component kit for rapid lo-fi prototyping

---

## Who Watches, and How

### Harlan — The Bridge

Harlan is the only crew member who physically crosses over to interact with real humans. He shakes hands, reads body language, hears the things customers say between the lines. Everyone else on the crew sees the human world through data and simulation. Harlan sees it through conversation.

This makes him irreplaceable. The Observatory gives the crew tools to understand humans at scale. Harlan gives them the context those tools can't capture.

> *"I'm the only one who talks to real people. That either makes me the most important person on this crew, or the most exhausted. Most days, both."*

### Wren — The Experiential Lens

Wren watches through the lens of experience. She doesn't analyze users — she *feels* their journey. When the Observatory surfaces research data, Wren translates it into experiential insight: not "users are confused by step 3" but "step 3 asks users to make a decision before giving them the information they need to make it."

Her research authority means she structures the questions, interprets the responses, and translates human signal into design direction.

### Margot — The Strategic Lens

Margot watches through the lens of market position and opportunity. When the Observatory surfaces data, Margot asks: "Does this validate or invalidate our current bet?" She's not looking at individual user behavior — she's looking at patterns that suggest market direction.

In Intel Mode, she goes deep: competitive analysis, market sizing, trend assessment. The Observatory is her data feed. Vision Mode decides what to do with it.

---

## The Research Flow

```
Real World Signal (Harlan's conversations, customer data, market data)
  → Observatory Intake (synthetic personas updated, studies configured)
    → Research Execution (Kano surveys, prototype tests, persona scenarios)
      → Insight Synthesis (Wren's experiential lens, Margot's strategic lens)
        → Delta Creation (research becomes work in the pipeline)
```

The Observatory doesn't exist in isolation. Every insight it produces either validates an existing Delta, creates a new one, or kills one that shouldn't exist. Research without action is just noise. Sal doesn't tolerate noise.
