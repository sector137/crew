---
name: handoff-design-to-development
description: "Handoff checklist for transitioning from design to development phase."
---

# Handoff Checklist: Design → Development

**From**: Designer + Tech-Lead + Security-Engineer + QA-Engineer (Design Phase)
**To**: Tech-Lead (Development Phase)
**Trigger**: Design approved via Design → Development quality gate

---

## Upstream: Designer

### Before Handoff
- [ ] UX design proposal complete in `/docs/ux/proposals/[feature]-proposal.md`
- [ ] Design aligns with user research and PRD
- [ ] User flows documented
- [ ] Accessibility considerations addressed
- [ ] Product-manager approved UX design
- [ ] Tech-lead confirmed UX is technically feasible

### During Handoff
- [ ] Present UX design to development team
- [ ] Explain user flows and interaction patterns
- [ ] Clarify design decisions and rationale
- [ ] Provide design assets/specifications
- [ ] Available for UX clarifications during development

---

## Upstream: Tech-Lead

### Before Handoff
- [ ] Technical design complete in `/docs/engineering/design-docs/design-[feature]-[date].md`
- [ ] Architecture scalable and maintainable
- [ ] API contracts and data models defined
- [ ] ADRs created for major decisions in `/docs/engineering/adrs/`
- [ ] Security-engineer reviewed and approved
- [ ] QA-engineer confirmed testability
- [ ] AI-engineer approved AI design (if applicable)
- [ ] [Design → Development Quality Gate](../quality-gates.md#gate-3-design-development) passed

### During Handoff
- [ ] Create implementation plan in `/docs/engineering/implementation-plans/`
- [ ] Break down work into tasks
- [ ] Estimate effort and timeline
- [ ] Identify dependencies and risks
- [ ] Coordinate development team kickoff
- [ ] Update project-manager with timeline

---

## Upstream: Security-Engineer

### Before Handoff
- [ ] Security architecture review complete
- [ ] Security review saved in `/docs/security/architecture-reviews/`
- [ ] No CRITICAL/HIGH issues unresolved
- [ ] Security requirements documented
- [ ] Secure coding guidance provided

### During Handoff
- [ ] Share security requirements with dev team
- [ ] Explain security controls needed
- [ ] Available for security questions during development

---

## Upstream: QA-Engineer

### Before Handoff
- [ ] Test strategy defined in `/docs/testing/test-strategy.md`
- [ ] Coverage targets set
- [ ] Test scenarios identified
- [ ] Testability confirmed

### During Handoff
- [ ] Share test strategy with dev team
- [ ] Explain coverage expectations
- [ ] Coordinate on test-driven development approach

---

## Downstream: Tech-Lead (Implementation)

### Upon Receiving Handoff
- [ ] Acknowledge designs approved
- [ ] Review all design documents
- [ ] Understand security and testing requirements
- [ ] Validate team has needed context

### During Development
- [ ] Follow technical design document
- [ ] Implement according to UX specifications
- [ ] Write unit and integration tests
- [ ] Meet security requirements
- [ ] Conduct code reviews
- [ ] Track progress in project-plan.md

### Coordination
- [ ] Designer available for UX clarifications
- [ ] Security-engineer reviews code periodically
- [ ] QA-engineer validates tests
- [ ] Update project-manager on progress

---

## Quality Gate: Design → Development

Verify all criteria from [Design → Development Gate](../quality-gates.md#gate-3-design-development) before proceeding.

---

## Next Steps

After development complete, proceed to [Development → Testing Handoff](development-to-testing.md).
