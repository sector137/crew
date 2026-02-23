---
name: template-workflow-docs
description: "Template for workflows documentation directory."
---

# Workflow Documentation

This directory contains cross-functional workflows, quality gates, decision logs, and metrics tracking for the project.

**Managed by:** project-manager

## Directory Structure

```
/docs/workflows/
  discovery-to-delivery.md - Master workflow map (7 phases)
  quality-gates.md         - 7 quality gates with criteria
  decision-log.md          - Cross-functional decision tracking
  metrics-dashboard.md     - Unified KPI tracking
  /handoff-checklists/     - Phase transition checklists
  README.md                - This file
```

## Key Documents

### Workflow Map
- **`discovery-to-delivery.md`** - Complete 7-phase workflow: Discovery → Definition → Design → Development → Testing → Deployment → Operations

### Quality Gates
- **`quality-gates.md`** - 7 quality gates with entry/exit criteria, owners, and approval process

### Decision Log
- **`decision-log.md`** - Living log of all significant product, technical, UX, and security decisions

### Metrics Dashboard
- **`metrics-dashboard.md`** - Unified KPI tracking consolidating metrics from all agents

### Handoff Checklists
Stored in `/handoff-checklists/`:
- `research-to-prd.md` - Discovery → Definition handoff
- `prd-to-design.md` - Definition → Design handoff
- `design-to-development.md` - Design → Development handoff
- `development-to-testing.md` - Development → Testing handoff
- `testing-to-deployment.md` - Testing → Deployment handoff
- `deployment-to-operations.md` - Deployment → Operations handoff

## 7-Phase Workflow

1. **Discovery** - Market research, user research, opportunity validation
2. **Definition** - PRD creation, requirements specification
3. **Design** - UX design, technical design, AI design
4. **Development** - Implementation, code review, integration
5. **Testing** - Quality assurance, security testing, validation
6. **Deployment** - Production deployment, monitoring setup
7. **Operations** - Launch validation, iteration planning

## 7 Quality Gates

1. **Gate 1: Discovery → Definition** - Market & user validation
2. **Gate 2: Definition → Design** - PRD approval, feasibility confirmed
3. **Gate 3: Design → Development** - Design + security approval
4. **Gate 4: Development → Testing** - Code complete, tests passing
5. **Gate 5: Testing → Deployment** - Quality validated, no critical bugs
6. **Gate 6: Deployment → Production** - Deployment successful
7. **Gate 7: Production → Iteration** - Launch validated

## Documentation Standards

All workflow documentation must include:
- **Clear ownership** - Which agent manages which phase
- **Entry/exit criteria** - What must be true to enter/exit each phase
- **Decision rationale** - Why decisions were made
- **Timestamps** - When decisions and transitions occurred

## Cross-References

Workflow documentation orchestrates ALL agents:
- `/docs/market-research/`, `/docs/ux/` - Discovery phase
- `/docs/product/` - Definition phase
- `/docs/ux/`, `/docs/engineering/`, `/docs/ai/` - Design phase
- `/docs/engineering/` - Development phase
- `/docs/testing/`, `/docs/security/` - Testing phase
- `/docs/engineering/`, `/docs/project/` - Deployment & Operations

## Getting Started

1. The project-manager agent creates and maintains this directory
2. Workflow docs are initialized at project start
3. Decision log and metrics dashboard are updated continuously
4. Handoff checklists ensure smooth phase transitions

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*

*For project status, see [/docs/project/project-plan.md](../project/project-plan.md)*
