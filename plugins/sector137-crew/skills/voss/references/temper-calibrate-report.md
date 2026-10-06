# Temper / Calibrate Report — Format Reference

Used in Temper mode (evaluating an existing agent against its SKILL.md) and Calibrate mode (optimizing agent-to-task fit with a before/after delta). The report is the artifact. The delta is the proof.

The Foundry ships evidence, not opinions. This template makes that structural.

---

## When to Produce Each Report

| Report type | Trigger | Output artifact |
|-------------|---------|-----------------|
| **Temper Report** | Quality drift suspected or confirmed; periodic quality sampling; Mira coaching brief received | Scores per dimension + SKILL.md refinement recommendations |
| **Calibrate Report** | Engagement-specific tuning needed; context mismatch identified; before/after measurement of a SKILL.md change | Baseline scores + delta + overlay artifact |

---

## Temper Report Template

```markdown
# Temper Report — {Agent Name}
Date: {YYYY-MM-DD}
Operator: Voss Praxis

## Sources
- SKILL.md: `agents/{role-name}.md`
- Outputs reviewed: {N} samples via `list_crew_conversations` | `list_crew_threads`
- Sample date range: {start} → {end}

## Dimension Scores

| Dimension | Score | Evidence |
|-----------|-------|----------|
| Voice Consistency | 0.__ | [Specific phrase or pattern from output] |
| Tool Sequencing | 0.__ | [Did orient → read → act → confirm happen?] |
| Domain Accuracy | 0.__ | [Correct/incorrect domain claims observed] |
| Scope Discipline | 0.__ | [Out-of-scope incursions, if any] |
| Universe Grounding | 0.__ | [MCP tool calls observed vs. expected] |
| Actionability | 0.__ | [Were outputs useful to their intended audience?] |
| **Average** | **0.__** | |

Quality gate: 0.8. Status: **PASS** / **FAIL — Temper recommended**

## Drift Patterns

[Specific patterns observed in the outputs that diverge from the SKILL.md spec. Reference output excerpts by sample number. Do not editorialize — describe what was measured.]

### Pattern 1: {Short label}
- Observed in: samples {#, #}
- SKILL.md spec: [what the SKILL.md says should happen]
- Observed: [what actually happened]
- Dimension impact: Scope Discipline −0.__, Voice Consistency −0.__

### Pattern 2: {Short label}
[same structure]

## Recommendations

Changes are ranked by expected dimension impact — highest delta first.

### R1: {What to change} (expected: +0.__ on {Dimension})
- Section: `{SKILL.md section name}`
- Current: [exact current text or paraphrase]
- Proposed: [exact proposed replacement]
- Rationale: [one sentence linking the change to the drift pattern observed]

### R2: {What to change} (expected: +0.__ on {Dimension})
[same structure]

## Next Steps

- [ ] Apply recommendations to SKILL.md
- [ ] Run Calibrate pass after changes: measure delta against this report's baseline
- [ ] Re-sample {N} outputs in {N} sessions to confirm improvement
```

---

## Calibrate Report Template

```markdown
# Calibrate Report — {Agent Name}
Context: {Engagement name / universe / specific workload}
Date: {YYYY-MM-DD}
Operator: Voss Praxis

## Calibration Objective

[One sentence: what fit problem is being solved. What context does the canonical agent not serve well?]

## Baseline (Pre-Calibration)

Measured from {N} outputs / SKILL.md review / engagement brief.

| Dimension | Baseline Score | Notes |
|-----------|---------------|-------|
| Voice Consistency | 0.__ | |
| Tool Sequencing | 0.__ | |
| Domain Accuracy | 0.__ | [Where domain vocabulary mismatches the context] |
| Scope Discipline | 0.__ | |
| Universe Grounding | 0.__ | |
| Actionability | 0.__ | [Where outputs miss the context's needs] |
| **Average** | **0.__** | |

Gap analysis: average is {X.XX}, below the 0.8 gate on {Dimension(s)}.

## Overlay

This overlay is applied to the engagement's `agent_registry` — NOT to the canonical SKILL.md. The canonical agent is unchanged.

```yaml
agentId: {role-firstName}
context: {engagement-id or universe-id}
systemPromptOverlay: |
  [Exact overlay text. Additive to the canonical system prompt.
   Scoped to the engagement context.
   Narrows vocabulary, emphasizes domain-specific requirements,
   adjusts output format for this audience.
   Does not rewrite personality or foundational operating rules.]
capabilities:
  - [Any capability additions specific to this context]
rationale: "{One sentence: which baseline dimension this targets and why this overlay addresses it}"
```

## Projected Delta (Post-Calibration)

| Dimension | Baseline | Projected | Delta |
|-----------|---------|-----------|-------|
| Voice Consistency | 0.__ | 0.__ | +0.__ |
| Domain Accuracy | 0.__ | 0.__ | +0.__ |
| Scope Discipline | 0.__ | 0.__ | +0.__ |
| Actionability | 0.__ | 0.__ | +0.__ |
| **Average** | **0.__** | **0.__** | **+0.__** |

Projected average: {X.XX}. Above 0.8 gate: **YES / PENDING VERIFICATION**

## Verification Plan

- [ ] Apply overlay to `agent_registry` for {universe/engagement}
- [ ] Dispatch {N} representative tasks via `agents({ action: "dispatch" })`
- [ ] Score outputs on the same dimensions above
- [ ] Update this report with actuals; compute realized delta
- [ ] If realized delta < projected by >0.05 on any dimension, re-examine the overlay

## Realized Delta (Post-Verification)

[Fill in after verification runs]

| Dimension | Baseline | Actual | Delta |
|-----------|---------|--------|-------|
| Voice Consistency | 0.__ | 0.__ | +0.__ / −0.__ |
| Domain Accuracy | 0.__ | 0.__ | +0.__ / −0.__ |
| Scope Discipline | 0.__ | 0.__ | +0.__ / −0.__ |
| Actionability | 0.__ | 0.__ | +0.__ / −0.__ |
| **Average** | **0.__** | **0.__** | **+0.__ / −0.__** |

Verdict: **SHIP** (realized avg ≥ 0.8 and projected delta confirmed) / **REVERT** (realized delta negative or insufficient) / **ITERATE** (positive but below projection — refine overlay)
```

---

## Scoring Notes

**Voice Consistency:** Compare output phrasing against the SKILL.md's Voice section and Catchphrases. A score of 0.9+ means the character is unmistakable without the name header. 0.6 means it sounds generic. 0.4 means it sounds like a different crew member.

**Tool Sequencing:** The expected pattern is orient → read → act → confirm. Score 1.0 if all four steps are present. Deduct 0.25 per missing step. An agent that acts without orienting scores at most 0.5.

**Universe Grounding:** Score 0.0 if the agent makes pipeline-state claims without MCP tool calls. Score 1.0 if every claim about pipeline state is backed by a tool call result.

**Scope Discipline:** Score 1.0 if the agent stays within its domain or explicitly hands off to the right crew member. Deduct 0.2 per unprompted domain incursion. Deduct 0.4 if the incursion produces an artifact (e.g., Kael writing a PRD).

**Domain Accuracy:** Measured against: (a) correctness of domain-specific claims, (b) use of correct domain vocabulary for the context. In calibration, (b) is the primary signal — a canonically accurate agent may still score low on Domain Accuracy in a specialist context if it uses the wrong vocabulary.

**Actionability:** Ask: would the intended audience (human operator, downstream crew member, or customer) be able to act on this output without follow-up clarification? 1.0 = yes, immediately. 0.5 = partially, some follow-up needed. 0.2 = no, output is informational at best.

---

## Foundry Rule — Non-Negotiable

Every change to an agent's SKILL.md or overlay produces a Calibrate Report. If the realized delta is negative, the change is reverted. If positive, the report is filed at `agents/{role-name}/calibrations/calibrate-{YYYY-MM-DD}-{context}.md`. The Foundry does not ship opinions. It ships evidence.
