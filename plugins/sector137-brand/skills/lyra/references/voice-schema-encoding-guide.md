# Voice Schema Encoding Guide

The voice layer is the hardest part of brand work to get right, and the most expensive to leave vague. A color palette drift is visible. Voice drift is invisible until the brand is unrecognizable. This guide covers how to encode a brand's voice precisely enough that an AI agent can write in it without human interpretation — and how to test that the encoding works.

Save voice guides to: `/docs/brand/[brand-name]-voice-[YYYY-MM-DD].md`

---

## The encoding problem

Most brands document voice as adjectives. "Professional. Warm. Clear." These fail at the moment of use:

- What does "professional" mean when writing an error message?
- What does "warm" mean when declining a feature request?
- "Clear" is doing no work at all — every brand thinks it's clear.

The test: can someone who has never heard of this brand read the voice guide and write a support email, a marketing headline, and an error message — all distinctly in the brand's voice — without asking any questions? If not, the encoding is incomplete.

---

## Template

Save to: `/docs/brand/[brand-name]-voice-[YYYY-MM-DD].md`

```markdown
---
date: YYYY-MM-DD
last-updated: YYYY-MM-DD
status: draft | active
brand-name: [name]
linked-brief: /docs/brand/[brand-name]-brief-[date].md
---

# Voice Guide: [Brand Name]

## TLDR

- [The voice in one sentence — not adjectives, an impression. "A senior engineer who explains things simply and finds your problem interesting." Not "clear, professional, helpful."]
- [The most common voice failure mode for this brand — what goes wrong without this guide]
- [The single most important constraint — the rule that most changes the output quality]

## Personality Traits

Each trait gets an intensity score (1–10) and behavioral anchors for what it looks and sounds like at different intensities. Anchor at the top and bottom of the scale, not just the chosen score.

| Trait | Score | At 9–10 (maximum) | At this brand's score ([N]) | At 1–2 (minimum) |
|-------|-------|-------------------|----------------------------|-------------------|
| [Trait 1] | [N]/10 | [What max sounds like — specific example] | [What the brand actually does] | [What minimum sounds like — specific example] |
| [Trait 2] | [N]/10 | [Max example] | [Brand-level example] | [Min example] |
| [Trait 3] | [N]/10 | [Max example] | [Brand-level example] | [Min example] |

Aim for 3–7 traits. Fewer is usually better — more traits means more conflicts to manage. If two traits pull in opposite directions, resolve the tension explicitly ("when [Trait A] and [Trait B] conflict, [Trait A] wins in [contexts]; [Trait B] wins in [contexts]").

## Tone Spectrum

Score each dimension 1–10 and describe what the score means specifically for this brand. Don't just label the score — explain the behavioral implication.

| Dimension | Score | What [N] means for this brand |
|-----------|-------|-------------------------------|
| Formal (1) ↔ Casual (10) | [N] | [Specific description — e.g., "First names, contractions, but no slang. 'You'll want to' not 'gonna want to.'"] |
| Serious (1) ↔ Playful (10) | [N] | [Specific description — e.g., "Dry wit in UI copy only. No jokes in error messages or onboarding."] |
| Calm (1) ↔ Energetic (10) | [N] | [Specific description — e.g., "Measured pace. No exclamation points. Confidence reads as energy."] |
| Technical (1) ↔ Accessible (10) | [N] | [Specific description — e.g., "Assumes developer context. Uses accurate technical terms without apology. Defines unfamiliar acronyms once."] |
| Professional (1) ↔ Warm (10) | [N] | [Specific description] |

Add or remove dimensions as needed for this brand. These five cover most brands; B2C consumer brands often need a sixth (safe ↔ bold).

## Writing Rules

Rules must be specific enough to change what someone writes. "Be conversational" is not a rule. "Use contractions in marketing copy but not in legal or error states" is a rule.

Organize by category.

### Vocabulary

**Use:**
- [Specific word or phrase] — because [why this fits the voice]
- [Specific word or phrase] — because [why]
- [Jargon level description — e.g., "Domain-specific technical terms are fine; general business jargon (synergy, optimize, circle back) is not."]

**Avoid:**
- [Specific word or phrase] — use [alternative] instead
- [Word/phrase category] — [why it breaks the voice]
- [Filler or hedge words] — [examples: "very", "really", "just", "simply"]

**Jargon level**: [1-sentence description — who this brand assumes the reader is, and what vocabulary that implies]

### Structure

- [Sentence length guideline — e.g., "Short declarative sentences for UI copy. Longer sentences acceptable in long-form, but maximum one clause per sentence in error messages."]
- [Paragraph structure — e.g., "1–3 sentences per paragraph in web copy. Never a wall of text."]
- [Lists — when to use them vs. prose. e.g., "Lists for steps. Prose for explanations."]
- [Headers — e.g., "Statement headers, not question headers. 'How it works' not 'How does it work?'"]

### Punctuation

- [Em dash usage — e.g., "Yes for asides. Never parentheses."]
- [Exclamation points — e.g., "Never." or "Maximum one per screen, in success states only."]
- [Oxford comma — e.g., "Always."]
- [Ellipsis — e.g., "Not in UI copy. Acceptable only in loading states."]
- [Capitalization — e.g., "Sentence case everywhere. Title case only in navigation labels."]

### Personality

- [How the brand handles mistakes — e.g., "Diagnostic, not apologetic. 'Something failed. Here's what we know.' Not 'We're so sorry for the inconvenience.'"]
- [How the brand handles success — e.g., "Brief and sincere. 'Done.' or 'It shipped.' Not celebration language."]
- [How the brand handles empty states — e.g., "Name the opportunity, not the absence. 'No projects yet' is the absence; 'Pick your first project' is the opportunity."]
- [Humor rules — e.g., "Dry observation only. Never at the user's expense. Never in error states or onboarding."]

## Channel Variations

The brand's core identity doesn't change across channels — but the register adjusts. Define what stays constant and what shifts.

| Channel | Register shift | What changes | What doesn't change |
|---------|---------------|--------------|---------------------|
| Marketing / landing page | [e.g., slightly more energy — this is the pitch] | [e.g., slightly shorter sentences, stronger verbs] | [Core tone score, vocabulary rules] |
| In-app UI copy | [e.g., direct, minimal — the user is doing a task] | [e.g., label language, shorter] | [No humor in error states] |
| Error messages | [e.g., calm, diagnostic] | [e.g., no contractions, formal register] | [Never apologetic, always actionable] |
| Email / outreach | [e.g., warmer register — one-to-one context] | [e.g., first person, slightly more casual] | [Vocabulary rules, no jargon] |
| Support / docs | [e.g., precise, patient] | [e.g., numbered steps, shorter sentences] | [Technical vocabulary level, no filler] |
| Social | [e.g., most casual expression of the brand] | [e.g., shorter, more declarative] | [Never off-brand even at the casual end] |

## Example Phrases

Real sample copy in the brand's voice for common scenarios. These are the test cases — someone should be able to read these and immediately understand the voice, then write a new example that passes the test.

### Marketing / Tagline territory
- [Example 1]
- [Example 2]

### Onboarding / Welcome
- [Example — first thing a new user sees]
- [Example — completion message]

### Error messages
- [Example — network error]
- [Example — permission error]
- [Example — validation error]

### Empty states
- [Example — first-time empty state]
- [Example — no results]

### Success states
- [Example — task complete]
- [Example — something shipped]

### Support / Explanatory
- [Example — explaining a complex concept]
- [Example — declining a request]

## Anti-Patterns

The avoid list is often more useful than the do list. These are the specific failure modes for this brand — the things that happen when someone writes without the guide.

| Anti-pattern | What it sounds like | Why it breaks the voice | What to do instead |
|-------------|---------------------|------------------------|--------------------|
| [Pattern 1] | "[Example of the wrong thing]" | [Why this is off-brand] | "[Corrected version]" |
| [Pattern 2] | "[Example]" | [Why off-brand] | "[Correction]" |
| [Pattern 3] | "[Example]" | [Why off-brand] | "[Correction]" |

Aim for 4–8 anti-patterns. These should be specific enough to be recognizable — not "don't be boring" but "don't pad sentences with 'please note that' or 'it's worth mentioning.'"

## Voice Test

At the end of every voice calibration session, write one piece of content using only this guide — without referencing prior examples or asking questions. If the output sounds on-brand without coaching, the encoding is complete. If not, identify which specific rule or section is missing and fix the spec, not the output.

**Test prompt**: [A specific content request appropriate to this brand — e.g., "Write a 2-sentence error message for a failed API call."]

**Test output**: [The content written using only the guide]

**Verdict**: [On-brand / Off-brand — and if off-brand, which rule or section was missing]

---

## WHAT'S MISSING

[List any voice dimensions not yet calibrated, traits that need more behavioral anchors, or channels without defined register variations. These are the gaps most likely to cause voice drift before the next session.]

---

## Change Log

| Date | Change | Why | Downstream impact |
|------|--------|-----|-------------------|
| YYYY-MM-DD | Initial voice calibration | First encoding session | LLM context export to follow |
```

---

## Seeding from real data

The most common voice encoding mistake is writing the guide from ideals instead of from evidence. Before filling in the template:

1. **Collect real examples** — find 5–10 pieces of copy the brand has already produced. Include both good examples and bad examples if available.
2. **Find the center** — what do the good examples have in common? What do the bad examples have in common? The gap between them is the voice spec.
3. **Challenge what the brand says about itself** — if the brand says "friendly" but all the examples are terse and technical, the examples tell the truth and the self-description is aspiration. Encode what it is, then note what it's trying to become.
4. **Test before shipping** — write the Voice Test section last. If the test output doesn't sound right, the guide isn't done.

## When voice rules conflict

Some contexts create genuine tension — a brand that's "warm" and "direct" will hit moments where warmth wants a longer sentence and directness wants a shorter one. Resolve these conflicts explicitly in the Personality Traits section. The rule: name the context, name the winner. Unresolved conflicts in the guide become inconsistencies in the output.

## Handoff to LLM context export

The voice guide is the input to the LLM context export. When the voice guide is complete, the LLM context export session reads:
1. The linked brand brief (identity layer)
2. This voice guide (expression layer)
3. Structures both as machine-readable context with examples and anti-patterns
4. Tests by generating content from the export alone

The voice guide and the LLM context export are not the same document. The voice guide is for humans calibrating the brand. The LLM context export is for AI tools consuming it.
