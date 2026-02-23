---
name: discovery-to-delivery
description: "Discovery-to-delivery workflow phases and process documentation."
---

# Discovery-to-Delivery Workflow

End-to-end product delivery through 7 phases with defined agents, outputs, and quality gates.

```
Discovery → Definition → Design → Development → Testing → Deployment → Operations
```

## Phase Overview

| Phase | Lead Agents | Key Outputs | Quality Gate |
|-------|------------|-------------|-------------|
| **Discovery** | researcher, designer | Market analysis, user research, competitive analysis, personas, JTBD | Gate 1: Discovery → Definition |
| **Definition** | product-manager | PRD, success metrics, user stories, initial UX requirements | Gate 2: Definition → Design |
| **Design** | designer, tech-lead, ai-engineer, security-engineer | UX design, technical design, ADRs, security review, test strategy | Gate 3: Design → Development |
| **Development** | tech-lead, qa-engineer, security-engineer | Implementation plan, code, tests, security audit | Gate 4: Development → Testing |
| **Testing** | qa-engineer, security-engineer | Test execution reports, coverage reports, security verification | Gate 5: Testing → Deployment |
| **Deployment** | tech-lead, project-manager | Deployment plan, infrastructure, monitoring setup | Gate 6: Deployment → Production |
| **Operations** | qa-engineer, product-manager | Health reports, user feedback, performance metrics, retrospective | Gate 7: Production → Iteration |

## Phase Details

### Phase 1: DISCOVERY
**Objective:** Validate market opportunity and user needs.
- researcher: market analysis, competitive intelligence, consumer insights
- designer: user research, persona development, JTBD analysis
- Output to: `/docs/market-research/` and `/docs/ux/`

### Phase 2: DEFINITION
**Objective:** Translate validated research into clear product requirements.
- product-manager: PRD creation, success metrics, user stories, scope prioritization
- tech-lead: technical feasibility assessment
- Output to: `/docs/product/prds/`

### Phase 3: DESIGN
**Objective:** Create approved designs ready for implementation.
- designer: UX proposals, user flows, wireframes, living doc updates
- tech-lead: technical design, ADRs, implementation plan
- ai-engineer: AI solution design (if AI features)
- security-engineer: security architecture review
- Output to: `/docs/ux/proposals/`, `/docs/engineering/`, `/docs/security/`

### Phase 4: DEVELOPMENT
**Objective:** Implement the designed solution with quality and security.
- tech-lead: code implementation, unit/integration tests
- security-engineer: security audit during development
- qa-engineer: test strategy execution
- Output to: repository + `/docs/testing/`, `/docs/security/`

### Phase 5: TESTING
**Objective:** Validate quality before deployment.
- qa-engineer: full test suite execution, exploratory testing, accessibility testing
- security-engineer: final security verification
- Output to: `/docs/testing/execution-reports/`

### Phase 6: DEPLOYMENT
**Objective:** Deploy successfully to production.
- tech-lead: deployment execution, health verification
- project-manager: stakeholder coordination
- Output: deployment logs, monitoring dashboards, runbook

### Phase 7: OPERATIONS
**Objective:** Validate launch success and plan next iteration.
- product-manager: success metrics tracking, user feedback
- qa-engineer: production issue monitoring
- project-manager: retrospective, lessons learned
- Output to: `/docs/project/retrospectives/`

## Workflow Orchestration

**project-manager** is responsible for:
- Tracking which phase each work item is in (`project-plan.md`)
- Enforcing quality gates before phase transitions
- Coordinating approvals from relevant agents
- Logging gate decisions in `decision-log.md`
- Updating metrics in `metrics-dashboard.md`

## Discovery-Delivery Balance

Per Teresa Torres continuous discovery framework:
- **Discovery activities** (20-30%): Customer interviews, assumption testing, opportunity mapping
- **Delivery activities** (70-80%): PRDs, implementation, testing, deployment
- Discovery never stops — maintain customer contact throughout all phases

See [Quality Gates](quality-gates.md) for detailed gate criteria.
