# UXR Synthesis Reference

## The Core Translation Chain

Raw observations don't help PMs. You must translate:

```
Observation → Insight → Opportunity → PM Brief
```

Each step is distinct. Skipping one is the most common UXR mistake.

### Step 1: Observation (what you saw/heard)

Write exactly what happened or what the user said. No interpretation yet.

> ✅ "User clicked the wrong button three times and said 'I don't know where to find it'"
> ❌ "User was confused by the interface" (this is already an interpretation)

### Step 2: Insight (what it means)

Explain the "so what" of the observation. What does this tell us about the user's mental model, need, or frustration?

> "Users expect the primary action button to be on the right side, consistent with the pattern they've learned in other products. When it's on the left, they experience cognitive friction."

**Tests for a good insight**:
- Does it go beyond what was directly observed?
- Does it apply to more than one user?
- Is it surprising or does it challenge an assumption?
- Does it point toward something actionable?

### Step 3: Opportunity statement

An opportunity is an unmet user need — phrased so the PM can decide what to do about it.

**Format**: `[User type] needs [capability/experience] when [context] because [motivation/outcome]`

> "Users need to immediately identify the primary action when landing on any screen because decision fatigue makes them abandon tasks when they have to search."

**What makes a good opportunity statement**:
- It's a need, not a solution (avoid prescribing UI)
- It's specific enough to prioritize
- It carries the "because" — the underlying motivation

### Step 4: PM opportunity brief

A formatted package the PM can act on directly. See template below.

---

## Affinity Mapping

Use affinity mapping to synthesize across multiple interviews or observations.

**Process**:

1. **Capture** — write each observation on a separate sticky note (one idea per note)
2. **Cluster** — group similar observations without pre-defined categories
3. **Name** — give each cluster a label that captures the insight, not just the topic
4. **Identify patterns** — which clusters appear most frequently? Most severely?
5. **Check for outliers** — outlier observations can be the most valuable signals

**Digital affinity mapping**: Use bullet lists grouped by theme. Mark each observation with a participant ID for traceability.

**Common mistake**: Naming clusters by topic ("Login", "Search") instead of insight ("Users can't tell they're logged out until they try to act").

---

## JTBD Synthesis

After interviews, synthesize the functional, emotional, and social jobs.

**Job statement format**: `When [situation], I want to [motivation], so I can [outcome]`

**Three dimensions to capture**:

| Dimension | Question to answer | Example |
|-----------|-------------------|---------|
| **Functional** | What practical task are they trying to accomplish? | "Process this invoice faster" |
| **Emotional** | How do they want to feel while doing it? | "Feel confident I'm not making an error" |
| **Social** | How do they want to be perceived? | "Look competent to my manager" |

**Synthesis method**:
1. Collect all "when... I want... so I can..." statements from interviews
2. Group by functional job
3. For each functional job, layer in emotional and social dimensions
4. Write the composite JTBD statement
5. Update `/docs/ux/jtbd.md`

**Common mistake**: Only capturing the functional job and missing emotional/social context. These often explain why users switch products even when functional needs are met.

---

## Insight Quality Criteria

Rate each insight before including it in a report:

| Criterion | Question |
|-----------|----------|
| **Evidence** | How many participants expressed this? (1 = weak, 3+ = strong) |
| **Severity** | How much does this affect the user's ability to achieve their goal? |
| **Frequency** | How often do users encounter this? |
| **Actionability** | Can the product team do something about it? |
| **Surprise** | Does this challenge an existing assumption? |

**Priority = Severity × Frequency** (roughly). Critical, High, Medium, Low.

---

## Severity / Priority Framework

Use this when presenting findings to the PM:

| Severity | Definition | Example |
|----------|------------|---------|
| **Critical** | Prevents task completion or causes significant harm | User cannot complete core flow |
| **High** | Significantly impedes task completion or causes frustration | User fails the task ~50% of the time |
| **Medium** | Minor friction but task still completable | User needs 2x longer than expected |
| **Low** | Annoyance or preference, no task impact | User comments "I don't love the color" |

---

## PM Opportunity Brief Template

Save to: `/docs/ux/research-reports/opportunity-brief-[topic]-[YYYY-MM-DD].md`

```markdown
---
date: YYYY-MM-DD
research-basis: [links to synthesis report, interview notes]
users-interviewed: [N]
confidence: high | medium | low
---

# Opportunity Brief: [Topic]

## TLDR
- [Most important thing the PM needs to know]
- [Scale of the problem — how many users, how often]
- [Current workaround users have (if any)]
- [Recommended next step]

## The Opportunity

**Opportunity statement**: [User type] needs [capability/experience] when [context] because [motivation/outcome]

**Severity**: Critical / High / Medium / Low
**Frequency**: Daily / Weekly / Occasionally / Rarely
**User segments affected**: [Which personas? All or specific?]

## Evidence

> "[Direct quote from participant]" — Participant [ID], [brief context]

> "[Direct quote]" — Participant [ID]

> "[Direct quote]" — Participant [ID]

**Observation summary**: [2-3 sentences describing what was observed across participants]

## The User's Current Workaround

[What do users do today to cope with this unmet need? This reveals the cost of NOT solving it.]

## JTBD Context

**Functional job**: [What task are they trying to accomplish?]
**Emotional job**: [How do they want to feel?]
**Social job**: [How do they want to be perceived?]

## What This Is NOT

[Be explicit about solution constraints — what would NOT solve this. Prevents the PM from jumping to the wrong conclusion.]

## Suggested Next Steps

1. [Could be: assumption test, prototype test, further research, or PM prioritization]
2. [Optional second step]

---

*Research conducted by: /uxr skill*
*Methodology: [interview / usability test / survey / diary study]*
```

---

## Reporting Principles

1. **Lead with the most important finding** — don't make the PM read to the end
2. **Always include quotes** — abstract insights without evidence are dismissible
3. **Show severity and prevalence** — how bad and how common
4. **Distinguish observed vs. reported behavior** — what users did vs. what they said they do
5. **Be honest about confidence** — thin data is thin data, say so
6. **Close with specific opportunities** — not "do more research" but "test this assumption"
