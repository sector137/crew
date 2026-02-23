---
name: handoff-research-to-prd
description: "Handoff checklist for transitioning from research to PRD phase."
---

# Handoff Checklist: Research → PRD

This checklist ensures smooth transition from Discovery (research) to Definition (PRD creation).

## Handoff Overview

**From**: Researcher + Designer (Discovery Phase)
**To**: Product-Manager (Definition Phase)
**Trigger**: Discovery research complete
**Goal**: Provide product-manager with validated insights to create PRD

---

## Upstream: Researcher Responsibilities

### Before Handoff

- [ ] **Market Analysis Complete**
  - Market size calculated (TAM/SAM/SOM)
  - Market trends and growth rates documented
  - Market report saved in `/docs/market-research/reports/market-analysis-[topic]-[date].md`
  - TLDR and ACTION PLAN sections included

- [ ] **Competitive Analysis Complete**
  - Direct and indirect competitors identified
  - Competitive positioning mapped
  - Gaps and opportunities documented
  - Competitive report saved in `/docs/market-research/reports/competitive-analysis-[focus]-[date].md`

- [ ] **Consumer Insights Complete** (if applicable)
  - Target segments identified
  - Consumer behaviors and preferences documented
  - Insights report saved in `/docs/market-research/reports/consumer-insights-[topic]-[date].md`

- [ ] **Opportunity Validation**
  - Market opportunity validated (TAM > minimum threshold)
  - Competitive differentiation identified
  - Alignment with product strategy confirmed

- [ ] **Documentation Quality**
  - All reports have TLDR sections
  - All reports have ACTION PLAN sections
  - Data sources and confidence levels documented
  - Links to external research sources included

###During Handoff

- [ ] **Notify Product-Manager**
  - Inform product-manager research is complete
  - Provide links to all research documents
  - Highlight key findings and implications
  - Flag any concerns or risks discovered

- [ ] **Handoff Meeting** (if needed)
  - Present research findings
  - Answer product-manager questions
  - Discuss implications for product strategy
  - Align on opportunity size and positioning

- [ ] **Update Project-Manager**
  - Notify project-manager of handoff
  - Update project-plan.md with completion status
  - Log decision to proceed (or not) in decision-log.md

### After Handoff

- [ ] **Available for Questions**
  - Remain available for clarifications during PRD creation
  - Provide additional research if needed
  - Validate product-manager's interpretation of findings

---

## Upstream: Designer Responsibilities

### Before Handoff

- [ ] **User Research Complete**
  - User interviews or surveys conducted (minimum sample size met)
  - User pain points identified and validated
  - Severity and frequency of pain points documented
  - User research report saved in `/docs/ux/research-reports/[feature]-research-[date].md`

- [ ] **Personas Updated**
  - Personas created or updated in `/docs/ux/personas.md`
  - Target user segments identified
  - User goals and motivations documented

- [ ] **Jobs-to-be-Done Updated**
  - JTBD framework updated in `/docs/ux/jtbd.md`
  - User "jobs" clearly articulated
  - Success criteria for each job defined

- [ ] **User Workflows Documented**
  - Current state workflows captured (if improving existing feature)
  - Pain points in current workflows identified
  - Workflows saved in `/docs/ux/workflows.md`

- [ ] **Documentation Quality**
  - All research has TLDR and KEY INSIGHTS sections
  - Research linked to business opportunity
  - User quotes and evidence included

### During Handoff

- [ ] **Notify Product-Manager**
  - Inform product-manager UX research is complete
  - Provide links to all UX documentation
  - Highlight critical user pain points
  - Share user quotes that illustrate needs

- [ ] **Handoff Meeting** (if needed)
  - Present user research findings
  - Demonstrate user pain points with evidence
  - Discuss implications for product requirements
  - Align on target personas and use cases

- [ ] **Update Project-Manager**
  - Notify project-manager of handoff
  - Update project-plan.md with completion status

### After Handoff

- [ ] **Available for Questions**
  - Clarify user needs during PRD creation
  - Validate that PRD addresses user pain points
  - Provide additional user research if needed

---

## Downstream: Product-Manager Responsibilities

### Upon Receiving Handoff

- [ ] **Acknowledge Handoff**
  - Confirm receipt of research from researcher and designer
  - Review all linked documentation
  - Schedule handoff meeting if needed

- [ ] **Validate Prerequisites**
  - Confirm market analysis complete with TAM/SAM/SOM
  - Confirm user research complete with pain point validation
  - Confirm competitive analysis complete
  - Verify opportunity meets minimum thresholds

- [ ] **Review Documentation**
  - Read all research reports completely
  - Understand key findings and implications
  - Note any gaps or questions
  - Validate research quality and rigor

### During PRD Creation

- [ ] **Reference Research Throughout**
  - Link PRD to supporting research documents
  - Cite specific findings in requirements
  - Align success metrics with research insights
  - Ensure PRD addresses validated user pain points

- [ ] **Clarify Questions**
  - Ask researcher about market uncertainties
  - Ask designer about user needs
  - Get additional research if needed
  - Validate assumptions with research team

- [ ] **Validate Alignment**
  - Confirm PRD aligns with market opportunity
  - Ensure PRD addresses user pain points
  - Validate competitive differentiation strategy
  - Check strategic fit with product vision

### After PRD Draft

- [ ] **Share for Research Review**
  - Share PRD draft with researcher and designer
  - Ask: "Does this align with research findings?"
  - Incorporate feedback on user needs and market fit
  - Confirm research team supports PRD direction

- [ ] **Update Project-Manager**
  - Notify project-manager PRD creation in progress
  - Update project-plan.md with status
  - Flag any blockers or open questions

---

## Quality Gate: Discovery → Definition

Before Product-Manager can proceed with PRD, verify [Discovery → Definition Quality Gate](../quality-gates.md#gate-1-discovery-definition) criteria:

**Required**:
- ✅ Market opportunity validated (TAM > threshold)
- ✅ User pain point confirmed (severity + frequency)
- ✅ Competitive differentiation identified
- ✅ Opportunity aligns with product strategy
- ✅ Research documented in `/docs/`

**Approvers**:
- Product-Manager (lead)
- Tech-Lead (feasibility advisor)

---

## Common Issues and Resolutions

### Issue: Market opportunity too small
**Resolution**:
- Researcher refines market sizing or identifies adjacent markets
- Product-Manager adjusts scope to viable segment
- Team decides to pivot or deprioritize

### Issue: User pain not severe enough
**Resolution**:
- Designer conducts deeper user research to validate severity
- Product-Manager reassesses priority
- Team explores different user segments

### Issue: No clear competitive differentiation
**Resolution**:
- Researcher analyzes competitor gaps more deeply
- Product-Manager explores unique positioning angles
- Team considers different feature approach

### Issue: Research incomplete or low confidence
**Resolution**:
- Researcher conducts additional research
- Team proceeds with caveats and plans to validate during design
- Product-Manager includes research gaps in PRD

---

## Success Metrics

This handoff is successful when:
- Product-Manager has clear, validated insights to create PRD
- PRD aligns with research findings
- PRD addresses validated user pain points
- PRD targets confirmed market opportunity
- Research team supports PRD direction

Track:
- Time from research complete to PRD started
- Number of clarification questions (lower is better)
- PRD approval rate on first submission
- Research citation rate in PRD (higher is better)

---

## Next Steps

After successful handoff:
1. Product-Manager creates PRD referencing research
2. Product-Manager validates PRD with tech-lead for feasibility
3. Product-Manager submits PRD for [Definition → Design Quality Gate](../quality-gates.md#gate-2-definition-design)
4. On approval, handoff to designer and tech-lead via [PRD → Design Handoff](prd-to-design.md)
