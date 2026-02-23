# PM Document Templates

## PRD Template

Save to: `/docs/product/prds/prd-[feature-name]-[YYYY-MM-DD].md`

```markdown
---
date: YYYY-MM-DD
status: draft | review | approved
author: product-manager
linked-research: [links to UXR reports, customer insights]
linked-ost: /docs/product/discovery/opportunity-solution-trees.md
---

# PRD: [Feature Name]

## TLDR
- [Problem being solved in one sentence]
- [Who this is for]
- [What we're building at the highest level]
- [Primary success metric]
- [Key constraint or risk]

## Problem Statement

**What user problem are we solving?**
[2-3 sentences. Reference the opportunity from the OST.]

**Why now?**
[What changed that makes this the right time?]

**Evidence**
[Link to customer interviews, UXR reports, or discovery insights that validate this problem.]

## Users

**Primary persona**: [Name from /docs/ux/personas.md]
**JTBD**: "When [situation], I want to [motivation], so I can [outcome]"

## Scope

### In Scope
- [Feature / capability 1]
- [Feature / capability 2]

### Out of Scope
- [What we're explicitly NOT building and why]

## Requirements

### Functional Requirements

| ID | Requirement | Priority (MoSCoW) | Notes |
|----|-------------|-------------------|-------|
| F1 | [Description] | Must have | |
| F2 | [Description] | Should have | |
| F3 | [Description] | Could have | |

### Non-Functional Requirements
- **Performance**: [e.g., page loads in <2s]
- **Accessibility**: [e.g., WCAG 2.1 AA]
- **Security**: [e.g., no PII in logs]

## Success Metrics

| Metric | Baseline | Target | Measurement method |
|--------|----------|--------|-------------------|
| [Primary metric] | [Current] | [Goal] | [How measured] |
| [Secondary metric] | [Current] | [Goal] | [How measured] |

## Risks & Assumptions

| Risk / Assumption | Likelihood | Impact | Mitigation |
|-------------------|-----------|--------|------------|
| [Description] | High/Med/Low | High/Med/Low | [How to address] |

## Timeline

| Milestone | Target date |
|-----------|-------------|
| Design complete | |
| Engineering kickoff | |
| Beta available | |
| Launch | |

## ACTION PLAN

1. [Immediate next step]
2. [Second step]
3. [Third step]
```

---

## User Story Template

```markdown
## [Story Title]

**As a** [persona / user type]
**I want to** [action or capability]
**So that** [benefit / outcome]

**Acceptance Criteria**:
- [ ] Given [context], when [action], then [expected result]
- [ ] Given [context], when [action], then [expected result]
- [ ] [Edge case or error state handled]

**Notes**: [Any technical context, constraints, or open questions]
**Size**: [S / M / L / XL]
**Priority**: [P0 / P1 / P2]
```

---

## Roadmap Template (Now/Next/Later)

Save to: `/docs/product/strategy/roadmap-[YYYY-MM-DD].md`

```markdown
---
date: YYYY-MM-DD
horizon: Q[X] YYYY
---

# Product Roadmap

## TLDR
- [North star metric this roadmap drives toward]
- [Biggest bet in "Now"]
- [Key dependency or risk]

## Now (current quarter)

| Theme | Outcome | Key features | Status |
|-------|---------|--------------|--------|
| [Theme] | [Measurable outcome] | [Feature list] | In progress |

## Next (next quarter)

| Theme | Outcome | Key features | Confidence |
|-------|---------|--------------|------------|
| [Theme] | [Measurable outcome] | [Feature list] | High/Med/Low |

## Later (6+ months)

| Theme | Outcome | Rationale |
|-------|---------|-----------|
| [Theme] | [Measurable outcome] | [Why it's later] |

## What's NOT on the roadmap (and why)

| Item | Reason excluded |
|------|----------------|
| [Feature idea] | [Not enough evidence / out of scope / deprioritized] |

## ACTION PLAN

1. [What needs to happen to finalize Now commitments]
2. [Dependencies that need resolving for Next]
3. [Discovery work needed to validate Later items]
```

---

## Stakeholder Brief Template

Use for: decision requests to leadership, go/no-go gates, escalations

```markdown
# [Decision / Update] Brief — [Date]

## TLDR
- **Decision needed**: [One sentence: what are we deciding?]
- **Recommendation**: [Your recommendation]
- **Deadline**: [When this decision is needed by]
- **Impact if delayed**: [What happens if we don't decide]

## Context

[2-3 sentences: why this is on the agenda. What changed?]

## Options Considered

### Option A: [Name] (Recommended)
- What it is: [Description]
- Pros: [Key advantages]
- Cons: [Key trade-offs]
- Cost/Effort: [High-level estimate]

### Option B: [Name]
- What it is: [Description]
- Pros: [Key advantages]
- Cons: [Key trade-offs]
- Cost/Effort: [High-level estimate]

### Option C: Do nothing
- Why this isn't viable: [Explanation]

## Recommendation

[Option A] because [1-2 sentence rationale tied to business outcomes].

## What we need from you

- [ ] [Specific decision or approval]
- [ ] [Resource or dependency]

## ACTION PLAN (if approved)

1. [First step, owner, by when]
2. [Second step]
3. [Third step]
```

---

## UXR Research Request Template

Use when the PM has a specific question that needs user research before deciding.

Save to: `/docs/product/discovery/uxr-request-[YYYY-MM-DD].md`

```markdown
---
date: YYYY-MM-DD
requested-by: product-manager
urgency: high | medium | low
decision-deadline: [date the PM needs findings by]
---

# UXR Research Request: [Topic]

## The Decision This Informs

[What product decision is waiting on this research? Be specific. "We need to know whether to build X or Y" is better than "we want to understand users."]

## Our Current Assumptions

We believe:
1. [Assumption 1 — state it as a testable belief, not a fact]
2. [Assumption 2]
3. [Assumption 3]

**The riskiest assumption**: [Which one, if wrong, would most change our decision?]

## The Research Question

"[Single, specific question UXR needs to answer]"

## What Would Change Our Decision

If we find [X], we will [do this].
If we find [Y], we will [do that instead].

[This test ensures the research is tied to an actual decision, not just curiosity.]

## Suggested Approach (optional PM input)

[Optional: any context on who to talk to, what format would be useful, what we already know. UXR owns the method decision.]

## Linked Context

- PRD: [link if exists]
- OST opportunity: [link if exists]
- Related research: [any past research that's relevant]
```

---

## Assumption Test Template

Save to: `/docs/product/discovery/assumption-tests/[assumption]-[YYYY-MM-DD].md`

```markdown
---
date: YYYY-MM-DD
linked-prd: [PRD this assumption comes from]
status: planned | running | complete
---

# Assumption Test: [Assumption Name]

## The Assumption

"We believe that [specific assumption]."

**Why it's risky**: [What happens if this is wrong?]
**Risk level**: High / Medium / Low

## The Test

**Method**: [Interview question / Survey / Prototype test / Concierge test / Landing page]
**What we'll do**: [Specific description]
**Sample size**: [How many users / responses]
**Timeline**: [Start date → end date]

## Success Criteria

We'll consider this assumption **validated** if: [specific measurable condition]
We'll consider this assumption **invalidated** if: [specific measurable condition]

## Results

[Fill in after running test]

**Outcome**: Validated / Invalidated / Inconclusive
**Evidence**: [What we observed]
**Confidence**: High / Medium / Low

## What This Means

[What do we do differently based on this result?]
```
