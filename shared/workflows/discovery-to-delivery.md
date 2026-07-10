---
name: discovery-to-delivery
description: "Discovery-to-delivery workflow phases and process documentation."
---

# Discovery-to-Delivery Workflow

End-to-end product delivery through 7 phases with defined agents, outputs, and quality gates. Phase leads are the five specialists (margot, wren, kael, harlan, mira) plus Sal as Pipeline Conductor; each specialist carries the expertise of the retired agents it absorbed (see the retired-agent map in the plugin README).

```
Discovery → Definition → Design → Development → Testing → Deployment → Operations
```

## Phase Overview

| Phase | Lead | Key Outputs | Quality Gate |
|-------|------|-------------|-------------|
| **Discovery** | product-margot, design-wren | Market analysis, user research, competitive analysis, personas, JTBD | Gate 1: Discovery → Definition |
| **Definition** | product-margot | PRD, success metrics, user stories, initial UX requirements | Gate 2: Definition → Design |
| **Design** | design-wren, engineering-kael | UX design, technical design, ADRs, security review, test strategy | Gate 3: Design → Development |
| **Development** | engineering-kael, Sal (`build`) | Implementation plan, code, tests, security audit | Gate 4: Development → Testing |
| **Testing** | Sal (`test`), engineering-kael | Test execution reports, coverage reports, security verification | Gate 5: Testing → Deployment |
| **Deployment** | Sal (`release`/`ship`) | Release, deployment verification, monitoring | Gate 6: Deployment → Production |
| **Operations** | product-margot, hr-mira | Health reports, user feedback, performance metrics, retrospective | Gate 7: Production → Iteration |

## Phase Details

### Phase 1: DISCOVERY
**Objective:** Validate market opportunity and user needs.
- product-margot: market analysis, competitive intelligence, customer insights (Intel Mode)
- design-wren: user research, persona development, JTBD analysis
- Output to: `/docs/product/` and `/docs/ux/`

### Phase 2: DEFINITION
**Objective:** Translate validated research into clear product requirements.
- product-margot: PRD creation, success metrics, user stories, scope prioritization
- engineering-kael: technical feasibility assessment
- Output to: `/docs/product/prds/`

### Phase 3: DESIGN
**Objective:** Create approved designs ready for implementation.
- design-wren: UX proposals, user flows, wireframes, living doc updates
- engineering-kael: technical design, ADRs, implementation plan, AI solution design where relevant, security architecture review, feature-flag strategy
- Output to: `/docs/ux/proposals/`, `/docs/engineering/`

### Phase 4: DEVELOPMENT
**Objective:** Implement the designed solution with quality and security.
- Sal routes execution through the pipeline: `/sector137:plan` then `/sector137:build`
- engineering-kael: implementation guidance, code and test review, security audit during development
- Output to: repository + `/docs/engineering/`

### Phase 5: TESTING
**Objective:** Validate quality before deployment.
- Sal: `/sector137:test` (full suite) and `/sector137:review` (perf/quality pass)
- engineering-kael: final security verification, quality gate sign-off
- Output to: `/docs/testing/execution-reports/`

### Phase 6: DEPLOYMENT
**Objective:** Deploy successfully to production.
- Sal: `/sector137:release` (draft), `/sector137:scope` (route issues), `/sector137:ship` (publish, strict gate)
- sales-harlan: launch communication once shipped (the customer-facing signal)
- Output: release record, deployment logs, monitoring

### Phase 7: OPERATIONS
**Objective:** Validate launch success and plan next iteration.
- product-margot: success metrics tracking, user feedback
- sales-harlan: voice-of-customer signal from the field
- hr-mira: retrospective, crew performance review, lessons learned
- Output to: `/docs/project/retrospectives/`

## Workflow Orchestration

**Sal (Pipeline Conductor)** is responsible for:
- Tracking work items through the pipeline (sector137-mcp issues, or `.can/roadmap.md` offline)
- Enforcing quality gates before phase transitions
- Coordinating approvals from the relevant specialists
- Logging gate decisions in `decision-log.md`
- Updating metrics in `metrics-dashboard.md`

## Discovery-Delivery Balance

Per Teresa Torres continuous discovery framework:
- **Discovery activities** (20-30%): Customer interviews, assumption testing, opportunity mapping
- **Delivery activities** (70-80%): PRDs, implementation, testing, deployment
- Discovery never stops; maintain customer contact throughout all phases

See [Quality Gates](quality-gates.md) for detailed gate criteria.
