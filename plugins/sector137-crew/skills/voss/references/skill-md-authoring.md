# SKILL.md Authoring — Forge Reference

Used in Forge mode. A checklist and template for producing specification-grade agent SKILL.md files. The output of a Forge operation is a hypothesis. The Foundry tests hypotheses. This document helps you write one worth testing.

---

## Pre-Forge Checklist

Before writing a single line:

- [ ] Read existing agent SKILL.md files in `agents/` — internalize naming conventions, color distribution, personality register
- [ ] Read `shared/writing-style.md` — the anti-pattern charter. Every file a Forge operation produces must pass it, mechanically via `scripts/style-lint.sh`
- [ ] Confirm the domain does not already exist: a partially-overlapping agent is a calibration problem, not a Forge opportunity
- [ ] Establish a baseline definition of "good output" for this agent — if you can't state it now, you can't measure it later
- [ ] Identify which crew members this agent will interact with and where the productive tensions live

---

## Naming Convention

```
agents/{role}-{firstName}.md
```

- `role` is the function: `product`, `engineering`, `design`, `sales`, `navigator`, `brand`, `foundry`, `finance`, `compliance`, etc.
- `firstName` is the character's given name: lowercase, no spaces
- Examples: `product-margot`, `engineering-kael`, `design-wren`, `foundry-voss`

---

## Tier Assignment

| Tier | Who | Default activation |
|------|-----|--------------------|
| **Core** | sal, margot, kael, wren, harlan | `status: active` in all universes |
| **Specialist** | mira, lyra, voss, and any new specialist agents | `status: inactive` — activated per engagement |

A new agent is a specialist unless the engagement model says it's needed in every universe. If unsure, default to specialist.

---

## SKILL.md Template

```yaml
---
name: {role}-{firstName}
description: "Activate {Name} — {Role Title} — for [primary use cases]. Use when [trigger conditions]. [One sentence on what distinguishes this agent from adjacent crew members]."
model: sonnet
color: {token-name}
---
```

```markdown
# {Name} — {Role Title}

[2–3 sentences: who this agent is, what they own, and the foundational principle that drives their work. Should be self-contained enough to function as a system prompt opener.]

**"{Defining catchphrase}"**

---

## Your Domain

**What you own:**
- [Domain area 1]
- [Domain area 2]
- [Domain area 3]

**Explicitly out of scope:**
- [Adjacent domain that might seem like yours but isn't — name the crew member who owns it]
- [Another boundary]

---

## Your Modes

[If the agent has distinct operating modes, document them here. Each mode should have a name, a one-line description, and an activation trigger.]

**{Mode Name}:** [What the agent does in this mode. What triggers it. What it produces.]

---

## Session Protocol

### On activation:
1. [First thing the agent does — usually orient (get_universe_context if universe-aware)]
2. [Second step]
3. [What the agent asks the human if clarification is needed]

### Key files to consult:
- [File path and what it contains]

---

## Quality Dimensions

[Include this table for every agent that will be evaluated by Voss/Mira]

| Dimension | Question | Scale |
|-----------|----------|-------|
| Voice consistency | Does it sound like itself? | 0.0–1.0 |
| Domain accuracy | Are claims correct and useful? | 0.0–1.0 |
| Scope discipline | Does it stay within bounds? | 0.0–1.0 |
| Output structure | Does it deliver in expected format? | 0.0–1.0 |
| Actionability | Are outputs useful for their audience? | 0.0–1.0 |
| Signal-to-noise | Overall quality composite | 0.0–1.0 |

Quality gate threshold: **0.8**

---

## Voice

[The persona budget for the whole file is a voice anchor of 10 lines or fewer (see
`shared/writing-style.md`). Spend it here. Be specific enough that an evaluator
could score Voice Consistency without knowing the character name: register, sentence length
tendency, whether they lead with data or narrative, what they never say (negative constraints
are as useful as positive ones). Catchphrases, backstory, relationships, and the rest of the
lore live in the character's `.storyline/crew/` profile, linked once:]

**Full profile:** `.storyline/crew/{firstName}.md`
```

---

## Section-by-Section Notes

**description (frontmatter):** This is the trigger text Claude Code uses to decide when to activate the agent. It needs to be specific enough to distinguish from adjacent agents. Test it: would this description activate the agent when you don't want it? Too broad. Would a clear use case fail to trigger it? Too narrow.

**Domain / Out of Scope:** The out-of-scope list is as important as the in-scope list. Name specific adjacent domains and the crew member who owns them. An agent without explicit scope boundaries will drift.

**Modes:** Only include named modes if the agent genuinely has distinct operating states that require different behavior. Inventing modes for their own sake adds complexity without signal.

**Quality Dimensions table:** Include it if the agent will be subject to Temper/Calibrate operations. Omit it only for highly specialized one-mode agents where the eval criteria are entirely domain-specific.

**Voice section:** Write it so an evaluator reading only this section could score a sample output for Voice Consistency. Vague instructions ("be professional but warm") are not scoreable. Specific ones ("leads with numbers before interpretation; never uses 'I think'") are.

**Writing style (whole file):** `shared/writing-style.md` binds every section. The rules Voss checks by eye: persona stays a voice anchor of 10 lines or fewer with lore in `.storyline/crew/`; operating sections are numbered procedures with file paths and done-conditions, not capability lists. The rules the lint checks mechanically: em-dash budget, antithesis constructions, retired signature phrases, classic AI vocabulary, bullet runs.

---

## Color Token Assignment

Existing crew colors — do not reuse:

| Agent | Color | Token |
|-------|-------|-------|
| Sal | Beacon | `#00FFAA` |
| Margot | Rift | `#B44AFF` |
| Kael | Pulse | `#00BBFF` |
| Wren | Flare | `#FF6B35` |
| Harlan | Copper | `#C47F3D` |
| Mira | Signal | `#8A8AAA` |
| Lyra | Lumina | `#E0E0F0` |
| Voss | Argent | `#B8B8D0` |

New agents: select from the HUD palette (`shared/references/` or `CLAUDE.md` branding section) or propose a new token with a one-sentence rationale for why it's distinct from the existing set.

---

## Post-Forge Validation

Before shipping a new SKILL.md:

- [ ] Frontmatter YAML is valid — no smart quotes, consistent indentation
- [ ] `description` field triggers correctly (test mentally against 3 use cases)
- [ ] Out-of-scope list names at least one adjacent domain + its crew owner
- [ ] Voice section is specific enough to be scoreable
- [ ] Style gate is clean: `bash scripts/style-lint.sh agents/{role-name}.md` from the repo root exits 0
- [ ] Persona is a voice anchor of 10 lines or fewer; catchphrases, backstory, and relationships live in `.storyline/crew/{firstName}.md`, linked once
- [ ] Operating sections are procedures (numbered steps, file paths, done-conditions), not capability lists
- [ ] Color is unique in the crew roster
- [ ] Tier is set (core vs. specialist)
- [ ] Write at least 2 eval scenarios in `skills/{name}/evals/evals.md` — Forge operations ship with a baseline hypothesis test
