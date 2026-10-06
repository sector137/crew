# Brand System Template — The Living Brand Record

One file per brand. Updated in place, never recreated. This is the source of truth every other brand deliverable (voice guide, token map, audit, LLM context export) is measured against.

Save to: `/docs/brand/[brand-name]-brief-[YYYY-MM-DD].md`

---

## How to seed this from a real engagement

Do not fill the template with placeholders. Seed it from the brand intake conversation:

1. Run the four intake questions (what is it, who for, on-brand example, off-brand example)
2. Identify the gap between what the brand intends and what it produces — name it explicitly in the TLDR
3. Fill each section with what you actually know; label gaps as `[not yet defined]` or `[hypothesis]`
4. A thin honest doc beats a confident fiction — sparse but accurate is production-ready; complete but invented is a liability

Every section marked with `[hypothesis]` is an open research question. Completeness scoring counts these as gaps.

---

## Template

```markdown
---
date: YYYY-MM-DD
last-updated: YYYY-MM-DD
status: draft | active | archived
brand-name: [name]
completeness: [X/10 — scored at end of session]
linked-voice-guide: /docs/brand/[brand-name]-voice-[date].md
linked-token-map: /docs/brand/[brand-name]-tokens-[date].md
linked-llm-context: /docs/brand/[brand-name]-llm-context.md
---

# Brand Brief: [Brand Name]

## TLDR

- [What the brand is in one sentence — not a tagline, a description]
- [Who it's for — one specific person, not a demographic]
- [The gap: what the brand intends to communicate vs. what it currently produces]
- [The highest-priority missing layer]

## Identity

### Mission

[Why this brand exists. One sentence. Not aspirational padding — the specific problem it solves or value it creates.]

### Vision

[Where this brand is going. 1-2 sentences. The future state it's working toward.]

### Core Values

| Value | What it means in practice | What violating it looks like |
|-------|--------------------------|------------------------------|
| [Value 1] | [Behavioral definition] | [Counter-example] |
| [Value 2] | [Behavioral definition] | [Counter-example] |
| [Value 3] | [Behavioral definition] | [Counter-example] |

Values without behavioral definitions are brand wallpaper. If you can't define what violating the value looks like, the value isn't specific enough.

### Brand Personality

[3–5 adjectives. Each must be a constraint, not a compliment. "Professional" is not a constraint. "Never exclamation points, always active voice, no jargon" is a constraint. Define each adjective operationally.]

| Trait | What it means | What it rules out |
|-------|---------------|-------------------|
| [Trait 1] | [Operational definition] | [What this prohibits] |
| [Trait 2] | [Operational definition] | [What this prohibits] |

### Target Audience

**Primary persona**: [Name + 2-sentence description]

- Role: [job title or life context]
- What they care about: [top 2 things — not demographics]
- What they don't have time for: [what they'll bounce from immediately]
- What makes them trust something: [how they evaluate credibility]

**Secondary persona** (if defined): [same structure]

---

## Visual Identity

### Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | [Name] | `#XXXXXX` | [Main brand color — CTAs, emphasis] |
| Secondary | [Name] | `#XXXXXX` | [Supporting — backgrounds, accents] |
| Accent | [Name] | `#XXXXXX` | [Highlights, alerts, energy] |
| Surface light | [Name] | `#XXXXXX` | [Light background surfaces] |
| Surface dark | [Name] | `#XXXXXX` | [Dark background surfaces] |
| Content primary | [Name] | `#XXXXXX` | [Main text on light surfaces] |
| Content muted | [Name] | `#XXXXXX` | [Secondary text, captions] |

Accessibility notes: [List any surface/content pairs that have been contrast-checked, with ratios. Flag anything below 4.5:1 for normal text or 3:1 for large text.]

### Typography

| Role | Family | Weight | Size guidance | Rationale |
|------|--------|--------|---------------|-----------|
| Display / Heading | [Font name] | [Weight] | [Scale guidance] | [Why this font for this role] |
| Body / UI | [Font name] | [Weight] | [Size] | [Why this font for this role] |
| Mono / Code | [Font name or "system mono"] | [Weight] | [Size] | [When to use] |

### Logo Guidance

[Minimum viable notes — clearspace, lockup rules, what not to do. Not a full brand standards manual; just what someone would get wrong without guidance.]

---

## Voice

This section is a summary pointer. The full voice encoding lives in the linked voice guide. Do not duplicate content here — maintain the voice guide as the source and reference it.

**Voice in one sentence**: [The most compressed description of how this brand sounds. Not an adjective list — a description of the actual impression it creates.]

**Tone spectrum summary**:

| Dimension | Score (1–10) | Description |
|-----------|-------------|-------------|
| Formal ↔ Casual | [N] | [What N means for this brand] |
| Serious ↔ Playful | [N] | [What N means for this brand] |
| Calm ↔ Energetic | [N] | [What N means for this brand] |
| Technical ↔ Accessible | [N] | [What N means for this brand] |

Full voice guide: [linked-voice-guide path above]

---

## Token Mappings (summary)

Design tokens link the brand palette to semantic UI roles. Summary here; full mappings in the linked token map.

| Semantic role | Brand color | CSS token |
|---------------|-------------|-----------|
| surface.base | [color name] | `--surface-base` |
| content.primary | [color name] | `--content-primary` |
| brand.base | [color name] | `--brand-base` |

Full token map: [linked-token-map path above]

---

## Completeness Score

Completeness is a weighted assessment of which brand layers are fully defined, partially defined, or missing. Score at the end of each session.

| Layer | Status | Notes |
|-------|--------|-------|
| Mission / Vision | complete / partial / missing | |
| Core values (operational) | complete / partial / missing | |
| Brand personality (with constraints) | complete / partial / missing | |
| Target audience (primary persona) | complete / partial / missing | |
| Color palette | complete / partial / missing | |
| Typography | complete / partial / missing | |
| Voice guide (full encoding) | complete / partial / missing | |
| Token mappings | complete / partial / missing | |
| LLM context export | complete / partial / missing | |

**Overall**: [X / 9 complete] — [completeness percentage]

**Highest-priority gaps**: [List the 2–3 missing layers most likely causing brand drift or inconsistency right now. Name the downstream risk.]

---

## WHAT'S MISSING

Every brand brief ends here. List what's not yet defined, what's hypothesis-level, and what the next session should address. Completeness matters more than perfection — but gaps that aren't named can't be closed.

1. [Gap 1 — specific, with downstream risk]
2. [Gap 2]
3. [Gap 3]

---

## Change Log

| Date | Change | Why | Downstream impact |
|------|--------|-----|-------------------|
| YYYY-MM-DD | Initial brief from intake session | First brand encoding | Voice guide and token map to follow |
```

---

## Completeness scoring notes

**A "complete" layer** means: defined specifically enough that a new team member or AI agent could produce on-brand output without asking clarifying questions. Vague entries (e.g., "professional" with no operational definition) count as partial, not complete.

**A "partial" layer** means: the layer exists but has gaps that require human interpretation to fill. Track which specific gaps in the Notes column.

**A "missing" layer** means: the layer does not exist at all in the brand record.

**When to escalate gaps to Margot**: If a completeness gap maps to a user segment or channel the product is actively targeting, surface it as a product signal — "Brand is 0% complete for [segment] and they're shipping to them." Margot treats this as roadmap input.
