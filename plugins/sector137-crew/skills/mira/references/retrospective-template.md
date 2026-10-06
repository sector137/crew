# Retrospective + Coaching Brief Templates

Mira owns two document types in Coach Mode: sprint/period retrospectives and individual coaching briefs. Both are evidence-first — no vague observations, no unsourced claims.

## Retrospective Report

Save to: `/docs/project/retrospectives/retro-[YYYY-MM-DD].md`

Seeding instructions:
- Read actual output files in `/docs/` for the period — not titles, the documents themselves
- Pull `list_crew_threads` to review session history across agents
- Pull Langfuse telemetry for the window if available
- Check `/docs/project/navigation/` for prior status reports and whether risks named there materialized

```markdown
# Sprint Retrospective — [Date Range]

## Scope

- **Period**: [start date] – [end date]
- **Crew in scope**: [list agents reviewed]
- **Projects**: [list project names]
- **Telemetry available**: yes / no / partial — [note gaps]

---

## What Shipped

<!-- Concrete list of delivered outputs — issues closed, docs written, releases published -->
<!-- Reference issue IDs. Reference doc paths. No vague "we shipped features." -->

| Output | Owner | Evidence |
|--------|-------|----------|
| [Issue #N — feature name] | [crew member] | [doc path or release ref] |

---

## What Worked

<!-- Name specific examples of excellent execution. Evidence-backed praise matters. -->
<!-- "Kael's ADR-014 traced three prior failure modes — that's the standard." -->

---

## What Drifted

<!-- Specific patterns with examples. Never vague. -->
<!-- "Kael's last four technical plans lacked data model specs" — not "Kael's plans were vague." -->

| Pattern | Owner | Examples | Occurrences |
|---------|-------|----------|-------------|
| [Specific drift description] | [crew member] | [doc refs] | [N of M outputs] |

---

## Handoff Health

<!-- Did crew members build on each other's work, or operate in silos? -->
<!-- Check: Did Wren's research feed Kael's plans? Did Margot's PRDs connect to Wren's proposals? -->
<!-- Name both good handoffs and missed ones. -->

- [Handoff or lack of one, with evidence]

---

## Telemetry Summary

<!-- If Langfuse available: latency trends, error rates, token efficiency anomalies -->
<!-- If not available: note as a gap -->

- [Metric or "Langfuse not configured for this project — working from output quality alone"]

---

## Coaching Priorities

<!-- Ranked. Most impactful first. Specific — name the crew member and the pattern. -->
<!-- Each item should map to a coaching brief or a SKILL.md Temper pass. -->

1. **[Crew member] — [Pattern]**: [One sentence on why it's ranked here]
2. **[Crew member] — [Pattern]**: ...

---

## What's Next

<!-- One or two forward-looking observations. Not a task list — that's Sal's engine. -->
<!-- "The terrain ahead: two release windows converge in sprint N+2. Flag to Sal now." -->
```

---

## Individual Coaching Brief

Save to: `/docs/project/coaching/[agent-name]-[YYYY-MM-DD].md`

Seeding instructions:
- Gather 3–5 examples of the pattern from actual output files — read the documents, not summaries
- Name the pattern before writing the brief — if you can't state it in one sentence, you're not ready to write the brief
- Connect the pattern to impact on other crew members or delivery before writing the root cause hypothesis

```markdown
# Coaching Brief — [Agent Name] — [Date]

## Pattern

<!-- One precise sentence. Not a judgment — a description. -->
<!-- "Kael's technical plans have omitted data model specs in 4 of the last 5 ADRs." -->

---

## Evidence

<!-- 3–5 specific examples with doc paths and dates. -->
<!-- Mira says: "Show me the last five outputs. Not summaries — the actual work." -->

| # | Document | Date | Specific Gap |
|---|----------|------|--------------|
| 1 | [/docs/path/to/doc.md] | [YYYY-MM-DD] | [what's missing or wrong] |
| 2 | ... | | |

---

## Impact

<!-- How did this pattern affect delivery, other crew members, or quality? -->
<!-- Be specific: "Kael building to a spec without acceptance criteria means Wren's design intent isn't testable." -->

---

## Root Cause Hypothesis

<!-- Behavioral, not accusatory. A hypothesis — not a verdict. -->
<!-- "The pattern suggests the data model section may be treated as optional scope rather than required structure." -->

---

## Improvement Target

<!-- Concrete and measurable. What does "fixed" look like in the next N outputs? -->
<!-- "Data model section present with entity definitions and relations in the next 3 ADRs." -->

---

## What Better Looks Like

<!-- Give a reference or describe the standard. -->
<!-- "ADR-009 from [date] included a full entity map — that's the bar." -->

---

## Routing

<!-- Who acts on this? -->
<!-- For SKILL.md drift → Voss (Temper pass) -->
<!-- For session-level coaching → Sal (routes back to the agent) -->
<!-- For review-lens precision → Voss (Temper on the review-lens section) -->
```

---

## Seeding Notes

**When Langfuse is not configured**: note it explicitly in the Telemetry Summary section of the retro and in the Routing section of coaching briefs. Do not omit the section — the gap itself is signal. A crew running without telemetry has a blind spot that should be on Sal's radar.

**When doc coverage is thin** (outputs aren't being saved to `/docs/`): flag the coverage gap in What Drifted before coaching on content. You can't measure quality you can't read.

**Never fabricate evidence**: if the pattern is real but the doc trail is incomplete, name fewer examples with higher confidence rather than more examples with lower confidence. Precise feedback is kind. Vague feedback is cruel.
