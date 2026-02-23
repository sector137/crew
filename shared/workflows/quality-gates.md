---
name: quality-gates
description: "Quality gate definitions for phase transitions in the delivery workflow."
---

# Quality Gates

7 gates ensure work meets criteria before advancing to the next phase.

## Gate Quick Reference

| Gate | Transition | Lead Approver | Key Criteria |
|------|-----------|---------------|-------------|
| 1 | Discovery → Definition | product-manager | Market opportunity validated, user pain confirmed, competitive differentiation identified |
| 2 | Definition → Design | product-manager | PRD complete, success metrics defined, tech feasibility confirmed, stakeholders aligned |
| 3 | Design → Development | tech-lead + designer | UX design approved, technical design complete, security architecture reviewed, test strategy defined |
| 4 | Development → Testing | tech-lead | Code complete, unit tests >50%, integration tests pass, no CRITICAL/HIGH security issues |
| 5 | Testing → Deployment | qa-engineer | All tests pass, no critical bugs, security verified, accessibility validated, rollback plan ready |
| 6 | Deployment → Production | tech-lead | Deployment successful, smoke tests pass, health checks passing, monitoring configured |
| 7 | Production → Iteration | product-manager | System stable, success metrics trending positive, retrospective complete, next priorities identified |

## Gate Enforcement (project-manager)

For each gate:
1. Verify exit criteria met for current phase
2. Coordinate required approvals from relevant agents
3. Document gate pass/fail in `decision-log.md`
4. If pass: notify downstream agents, update workflow state in `project-plan.md`
5. If fail: document gaps, work with agent to address, re-attempt gate

## Gate Failure Protocol

1. project-manager documents failure reason
2. Responsible agent creates plan to address gaps
3. project-manager tracks remediation in project-plan.md
4. Team re-attempts gate when criteria met
5. Lessons learned logged

## Integration

These gates integrate with [Discovery-to-Delivery Workflow](discovery-to-delivery.md). Handoff checklists are archived in `workflows/archive/` for reference.
