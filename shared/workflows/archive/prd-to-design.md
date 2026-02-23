---
name: handoff-prd-to-design
description: "Handoff checklist for transitioning from PRD to design phase."
---

# Handoff Checklist: PRD → Design

**From**: Product-Manager (Definition Phase)
**To**: Designer + Tech-Lead (Design Phase)
**Trigger**: PRD approved via Definition → Design quality gate

---

## Upstream: Product-Manager

### Before Handoff
- [ ] PRD complete in `/docs/product/prds/prd-[feature]-[date].md`
- [ ] All required sections included (TLDR, requirements, success metrics, out of scope)
- [ ] Links to market research and UX research
- [ ] Success metrics defined and measurable
- [ ] Technical feasibility confirmed by tech-lead
- [ ] Security requirements identified (if applicable)
- [ ] AI requirements identified (if applicable)
- [ ] Stakeholder approval obtained
- [ ] [Definition → Design Quality Gate](../quality-gates.md#gate-2-definition-design) passed

### During Handoff
- [ ] Notify designer and tech-lead
- [ ] Provide context on business goals and constraints
- [ ] Highlight critical requirements and success criteria
- [ ] Clarify priorities and trade-offs
- [ ] Answer questions about requirements
- [ ] Update project-manager on handoff

### After Handoff
- [ ] Available for requirements clarification
- [ ] Review designs for PRD alignment
- [ ] Approve design proposals

---

## Downstream: Designer

### Upon Receiving Handoff
- [ ] Acknowledge handoff from product-manager
- [ ] Read PRD completely
- [ ] Review linked UX research
- [ ] Understand success criteria and constraints
- [ ] Identify UX design requirements

### During UX Design
- [ ] Create UX design proposal aligned with PRD
- [ ] Reference user research and personas
- [ ] Design for defined success metrics
- [ ] Consider accessibility requirements
- [ ] Validate design addresses user pain points
- [ ] Save proposal in `/docs/ux/proposals/[feature]-proposal.md`

### Collaboration
- [ ] Share UX design with tech-lead for technical feasibility
- [ ] Coordinate with security-engineer for secure UX patterns
- [ ] Get product-manager approval on UX direction

---

## Downstream: Tech-Lead

### Upon Receiving Handoff
- [ ] Acknowledge handoff from product-manager
- [ ] Read PRD completely
- [ ] Review linked research and constraints
- [ ] Understand technical requirements
- [ ] Assess feasibility and complexity

### During Technical Design
- [ ] Create technical design document
- [ ] Design system architecture and data models
- [ ] Define API contracts and integrations
- [ ] Create ADRs for significant decisions
- [ ] Coordinate with ai-engineer for AI features
- [ ] Request security-engineer review
- [ ] Save design in `/docs/engineering/design-docs/design-[feature]-[date].md`
- [ ] Save ADRs in `/docs/engineering/adrs/`

### Collaboration
- [ ] Review UX design for technical feasibility
- [ ] Coordinate with security-engineer on security architecture
- [ ] Coordinate with qa-engineer on test strategy
- [ ] Get product-manager approval on technical approach

---

## Quality Gate: Definition → Design

Verify all criteria from [Definition → Design Gate](../quality-gates.md#gate-2-definition-design) before proceeding.

---

## Next Steps

After successful handoff, designers complete work and proceed to [Design → Development Handoff](design-to-development.md).
