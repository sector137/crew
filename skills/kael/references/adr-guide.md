# Architecture Decision Record (ADR) Guide

## What Is an ADR?

An ADR captures a significant architectural decision: what was decided, why, what alternatives were considered, and what consequences follow. The goal is for a future engineer (or future you) to understand not just what the system does, but why it was built this way.

**Write an ADR when**:
- Choosing between meaningfully different technical approaches
- Making a decision that's hard to reverse
- Picking a technology, library, or service that creates dependencies
- Establishing a pattern that other parts of the system will follow

**Don't write an ADR for**:
- Implementation details within a clearly-decided approach
- Routine decisions with obvious correct answers
- Work-in-progress thinking (write the ADR when the decision is made)

---

## ADR Lifecycle

```
PROPOSED → ACCEPTED → DEPRECATED → SUPERSEDED
                  ↓
              REJECTED
```

- PROPOSED: Under discussion, not yet decided
- ACCEPTED: Decision made, in effect
- REJECTED: Considered and not adopted (keep these — useful context)
- DEPRECATED: Was accepted, no longer recommended (but still in use)
- SUPERSEDED: Replaced by a newer ADR (link to the new one)

---

## Numbering Convention

`adr-[NNN]-[short-slug].md`

Examples:
- `adr-001-database-choice.md`
- `adr-012-auth-strategy.md`
- `adr-023-api-versioning.md`

Numbers are sequential and never reused. Even rejected ADRs keep their number.

---

## ADR Template

Save to: `/docs/engineering/adrs/adr-[NNN]-[slug].md`

```markdown
---
date: YYYY-MM-DD
status: proposed | accepted | rejected | deprecated | superseded by adr-NNN
deciders: [who was involved in the decision]
---

# ADR-[NNN]: [Decision Title]

## Context

[What is the situation that requires a decision? What forces are at play? Include relevant constraints — technical, organizational, timeline, existing systems. Write this as if explaining to someone who wasn't in the room.]

## Decision

[State the decision clearly and directly. Start with "We will..." or "We have decided to..."]

## Rationale

[Why this option over the alternatives? What evidence or reasoning supports it? Be specific — "simpler" isn't a reason, "eliminates the need to manage distributed transaction state across 3 services" is.]

## Alternatives Considered

### Option A: [Name]
[Brief description]
**Why not chosen**: [Specific reason]

### Option B: [Name]
[Brief description]
**Why not chosen**: [Specific reason]

## Consequences

**Positive**:
- [What gets better]
- [What becomes easier]

**Negative / Trade-offs**:
- [What gets harder]
- [What we're giving up]
- [What technical debt this creates]

**Risks**:
- [What could go wrong]
- [What we're betting on that might not hold]

## Implementation Notes

[Optional: anything the implementing team needs to know — migration steps, rollout order, gotchas discovered during implementation]

## Related ADRs

- [ADR-NNN: Related decision](./adr-NNN-related.md)
```

---

## Good ADR Practices

### Write for the future reader

The person reading this ADR in 18 months doesn't have your context. Write the Context section as if explaining to someone who wasn't there. What was the problem? What constraints existed at the time?

### Name the alternatives you rejected

Alternatives that were considered and rejected are as important as the chosen path. Without them, future engineers don't know if the rejected approach was actually considered or just overlooked.

### Be specific about trade-offs

"This is simpler" is not a trade-off analysis. Be specific:
- ✅ "Eliminates the need to maintain a separate job queue infrastructure"
- ❌ "Simpler architecture"

### Document the risks honestly

If there's a risk you're accepting with this decision, name it. Don't pretend the chosen path is perfect. Acknowledging risks helps future engineers know where to look when things go wrong.

### Keep ADRs short

An ADR should be readable in 5 minutes. If you need more space, link to a separate design doc. The ADR captures the decision; the design doc can contain the full analysis.

### Update the status

When a decision is superseded, update the ADR status and link to the new ADR. Don't leave orphaned "ACCEPTED" ADRs for decisions that have been reversed.

---

## Example ADR

```markdown
---
date: 2025-03-15
status: accepted
deciders: [eng-lead, backend-team]
---

# ADR-007: Use PostgreSQL as Primary Database

## Context

We need to choose a primary database for the application. The system stores user accounts,
product data, orders, and transactional records. Current scale is small (< 10k users) but
we're planning for 100k+ within 18 months. The team has strong SQL experience.
No requirement for flexible/dynamic schema at this time.

## Decision

We will use PostgreSQL as our primary database.

## Rationale

Our data is relational by nature — orders belong to users, line items belong to orders.
Using a relational database reflects the actual data model rather than working around it.
The team knows SQL well. PostgreSQL's feature set (JSONB, full-text search, pgvector)
means we're unlikely to outgrow it without clear signals. Managed hosting (Supabase, RDS)
removes operational overhead.

## Alternatives Considered

### MongoDB
Document model doesn't match our relational data. Joins would move to application layer,
increasing complexity and reducing query flexibility.
**Why not chosen**: Data is relational; document model adds friction without benefit.

### DynamoDB
Excellent at scale, but requires knowing access patterns upfront. Early-stage product
means access patterns will change. Also adds AWS lock-in.
**Why not chosen**: Too early-stage for DynamoDB's constraints to be worth the trade-off.

## Consequences

**Positive**:
- Team familiarity reduces ramp-up time
- ACID guarantees simplify transaction logic
- Rich query capabilities support evolving access patterns

**Negative / Trade-offs**:
- Vertical scaling has limits (though substantial — most apps never hit them)
- Schema migrations require care as data grows

**Risks**:
- If we need to store high-volume time-series data (e.g., analytics events),
  we'll likely need a separate store. Acceptable risk — cross that bridge when needed.
```
