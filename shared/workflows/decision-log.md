---
name: decision-log
description: "Decision log template for recording architectural and technical decisions."
---

# Project Decision Log

This document tracks all significant decisions made throughout the product development lifecycle. The project-manager maintains this log by recording decisions from all agents.

## Purpose

- Create audit trail of key decisions
- Capture rationale and context
- Document alternatives considered
- Enable future teams to understand "why"
- Prevent repeating past discussions

## When to Log a Decision

Log decisions that:
- Affect product strategy or direction
- Involve significant technical choices
- Impact user experience
- Have security or compliance implications
- Require cross-functional alignment
- Set precedents for future work
- Involve trade-offs between alternatives

## How to Use This Log

**Project-Manager**:
- Monitor agent ACTION PLANS for decisions
- Ask agents to log significant decisions
- Record decisions in this log
- Link decisions to affected work items
- Update decision status as needed

**All Agents**:
- Notify project-manager of significant decisions
- Provide: what, why, alternatives, impact
- Reference this log in documentation

---

## Decision Log Format

Each decision entry includes:

```markdown
## Decision [Number]: [Brief Title]

**Date**: YYYY-MM-DD
**Decision Maker**: [Agent/Role]
**Phase**: [Discovery/Definition/Design/Development/Testing/Deployment/Operations]
**Status**: [Proposed/Approved/Implemented/Superseded]

### Context
[Why was this decision needed? What problem does it solve?]

### Decision
[What was decided?]

### Rationale
[Why this option? What were the key factors?]

### Alternatives Considered
1. **Option A**: [Brief description] - Rejected because [reason]
2. **Option B**: [Brief description] - Rejected because [reason]

### Impact
- **Affected Areas**: [Which parts of product/codebase affected]
- **Dependencies**: [What depends on this decision]
- **Risks**: [What could go wrong]
- **Benefits**: [What improvements expected]

### Implementation
- **Owner**: [Who will implement]
- **Timeline**: [When to implement]
- **Related Work**: [Links to PRDs, design docs, tickets]

### References
- [Link to relevant documents]
- [Link to related decisions]

### Notes
[Any additional context, concerns, or follow-up needed]

### Status Updates
- [Date]: [Status change and reason]
```

---

## Decision Categories

Tag decisions with categories for easy filtering:

- **Product**: Product strategy, features, pricing, positioning
- **Technical**: Architecture, technology choices, infrastructure
- **UX**: User experience, design patterns, interaction models
- **Security**: Security controls, compliance, data handling
- **Process**: Team processes, workflows, quality gates
- **Business**: Business model, go-to-market, partnerships
- **AI**: AI/ML models, approaches, data strategies

---

## Decisions

<!-- Start logging decisions below this line -->

---

## Decision 001: [Example - Use This Template]

**Date**: 2024-01-15
**Decision Maker**: Tech-Lead
**Phase**: Design
**Status**: Implemented
**Category**: Technical

### Context
Need to choose database for user data storage. Requirements: scalability to 1M users, complex queries, strong consistency, ACID compliance.

### Decision
Use PostgreSQL as primary database

### Rationale
- Proven at scale with proper indexing
- Strong ACID compliance for transactions
- Rich query capabilities for analytics
- Excellent ecosystem and tooling
- Team has PostgreSQL experience

### Alternatives Considered
1. **MongoDB**: More flexible schema but weaker consistency guarantees. Rejected due to complex relational query needs.
2. **DynamoDB**: Excellent scale but limited query flexibility and higher costs for our access patterns.

### Impact
- **Affected Areas**: Data layer, API services, analytics pipeline
- **Dependencies**: ORM selection, migration tooling, backup strategy
- **Risks**: Need to optimize queries carefully for scale
- **Benefits**: Reliability, consistency, team productivity

### Implementation
- **Owner**: Tech-Lead
- **Timeline**: Week of Jan 22
- **Related Work**: Design doc `/docs/engineering/design-docs/design-data-architecture-2024-01-15.md`

### References
- ADR-003: Database selection decision record
- PRD: User data requirements

### Notes
Will revisit if query complexity or scale exceeds PostgreSQL capabilities. Consider read replicas and caching for scale.

### Status Updates
- 2024-01-22: Implemented - PostgreSQL 15 deployed
- 2024-02-01: Validated - Handling 10K users smoothly

---

<!-- Add new decisions above this line, numbered sequentially -->

## Decision Index

For quick reference, maintain index of decisions by category:

**Product Decisions**:
- #[001]: [Decision title] - [Status]

**Technical Decisions**:
- #[001]: Use PostgreSQL - Implemented

**UX Decisions**:
- #[000]: [No decisions logged yet]

**Security Decisions**:
- #[000]: [No decisions logged yet]

**AI Decisions**:
- #[000]: [No decisions logged yet]

---

## Using the Decision Log

### For Current Team:
- Review recent decisions before similar work
- Reference decisions in documentation
- Update status as implementations progress
- Learn from past trade-offs

### For Future Team Members:
- Understand context for current architecture
- Avoid relitigating past decisions
- Learn project history and evolution
- See what alternatives were considered

### For Stakeholders:
- Understand decision rationale
- See how strategy evolved
- Trust in thoughtful decision-making process

---

## Maintenance

**Weekly** (Project-Manager):
- Review agent documentation for undocumented decisions
- Prompt agents to log significant choices
- Update decision statuses

**Monthly** (Project-Manager):
- Review decision log for patterns
- Identify frequently revisited topics
- Update decision index
- Archive superseded decisions

**Quarterly** (Team):
- Review decision outcomes
- Validate decisions still align with goals
- Update or supersede outdated decisions
- Extract lessons learned
