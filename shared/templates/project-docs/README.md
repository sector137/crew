---
name: template-project-docs
description: "Root template for initializing project documentation structure."
---

# Project Documentation

This directory contains all project documentation organized by domain and managed by specialized agents.

## Documentation Structure

This project follows a standardized documentation structure where each agent manages their own domain:

```
/docs/
  /ai/                  - AI/ML solutions and research (ai-engineer)
  /ux/                  - User experience and design (designer)
  /product/             - Product requirements and strategy (product-manager)
  /engineering/         - Technical design and architecture (tech-lead)
  /testing/             - Test strategy and quality assurance (qa-engineer)
  /security/            - Security audits and compliance (security-engineer)
  /market-research/     - Market analysis and competitive intelligence (researcher)
  /project/             - Project coordination and planning (project-manager)
  /workflows/           - Cross-functional workflows and processes (project-manager)
  README.md             - This file
```

## Agent Responsibilities

Each domain is managed by a specialized agent with read-all, write-own access:

| Domain | Agent | Write Access | Read Access |
|--------|-------|--------------|-------------|
| `/ai/` | ai-engineer | Full | All `/docs/*` |
| `/ux/` | designer | Full | All `/docs/*` |
| `/product/` | product-manager | Full | All `/docs/*` |
| `/engineering/` | tech-lead | Full | All `/docs/*` |
| `/testing/` | qa-engineer | Full | All `/docs/*` |
| `/security/` | security-engineer | Full | All `/docs/*` |
| `/market-research/` | researcher | Full | All `/docs/*` |
| `/project/` | project-manager | Full | All `/docs/*` |
| `/workflows/` | project-manager | Full | All `/docs/*` |

## Domain Overviews

### AI & Machine Learning (`/ai/`)
**Managed by:** ai-engineer

AI/ML technology research, solution designs, and knowledge management. Includes model evaluations, architecture decisions, and AI implementation patterns.

**Key Documents:**
- `ai-knowledge.md` - Living document: Single source of truth for AI/ML decisions
- `/research/` - AI technology research and evaluations
- `/solutions/` - AI solution designs and implementations

[View AI Documentation →](ai/README.md)

### User Experience (`/ux/`)
**Managed by:** designer

User research, personas, workflows, and UX design proposals. Includes Jobs-to-be-Done analysis and user journey mapping.

**Key Documents:**
- `jtbd.md` - Jobs-to-be-Done framework
- `personas.md` - User personas and ICP
- `workflows.md` - User workflows and journeys
- `user-stories.md` - User stories and acceptance criteria

[View UX Documentation →](ux/README.md)

### Product Strategy (`/product/`)
**Managed by:** product-manager

Product requirements, business cases, go-to-market plans, and product strategy.

**Key Documents:**
- `/prds/` - Product Requirements Documents
- `/business-cases/` - Business justification and ROI
- `/strategy/` - Product vision and roadmap
- `/go-to-market/` - Launch plans and positioning

[View Product Documentation →](product/README.md)

### Engineering (`/engineering/`)
**Managed by:** tech-lead

Technical design documents, Architecture Decision Records (ADRs), and implementation plans.

**Key Documents:**
- `/design-docs/` - Technical designs
- `/adrs/` - Architecture Decision Records
- `/implementation-plans/` - Implementation planning

[View Engineering Documentation →](engineering/README.md)

### Quality Assurance (`/testing/`)
**Managed by:** qa-engineer

Test strategy, coverage reports, and quality assurance documentation.

**Key Documents:**
- `test-strategy.md` - Living document: Overall testing approach
- `/coverage-reports/` - Test coverage analysis
- `/execution-reports/` - Test execution results

[View Testing Documentation →](testing/README.md)

### Security (`/security/`)
**Managed by:** security-engineer

Security audits, vulnerability assessments, architecture reviews, and compliance reports.

**Key Documents:**
- `/audit-reports/` - Security findings and recommendations
- `/architecture-reviews/` - Security design analysis
- `/compliance-reports/` - Compliance assessments

[View Security Documentation →](security/README.md)

### Market Research (`/market-research/`)
**Managed by:** researcher

Market analysis, competitive intelligence, and consumer insights.

**Key Documents:**
- `/reports/` - Market research reports
- `/strategy-proposals/` - Research strategies

[View Market Research Documentation →](market-research/README.md)

### Project Management (`/project/`)
**Managed by:** project-manager

Project planning, coordination, and retrospectives.

**Key Documents:**
- `project-plan.md` - Living document: Project status and timeline
- `/retrospectives/` - Retrospectives and lessons learned

[View Project Documentation →](project/README.md)

### Workflows (`/workflows/`)
**Managed by:** project-manager

Cross-functional workflows, quality gates, decision log, and metrics dashboard.

**Key Documents:**
- `discovery-to-delivery.md` - 7-phase workflow map
- `quality-gates.md` - Quality gate criteria
- `decision-log.md` - Cross-functional decisions
- `metrics-dashboard.md` - Unified KPI tracking
- `/handoff-checklists/` - Phase transition checklists

## Documentation Standards

All documentation in this project follows these universal standards:

### Required Sections

Every document must include:
- **TLDR** (at top) - 3-5 critical bullets summarizing key points
- **ACTION PLAN** (near end) - Specific, prioritized next steps
- **Metadata** - Date, context, dependencies, links

### File Naming Conventions

- **Living documents**: Fixed names (e.g., `personas.md`, `ai-knowledge.md`, `test-strategy.md`)
- **Date-stamped reports**: `{type}-{topic}-{YYYY-MM-DD}.md`
- **Templates**: `{name}-template.md`
- **ADRs**: `adr-{number}-{decision}.md`

### Cross-Referencing

Agents collaborate by reading each other's documentation:
- Link to related documents across domains
- Reference research in product decisions
- Connect technical designs to PRDs
- Trace UX decisions to user research

## Getting Started

1. Each agent automatically creates their directory structure when first used
2. Agents maintain README.md files in their domains
3. Living documents are updated in place as projects evolve
4. Reports and artifacts are saved with date stamps

## Reference

- **Structure Schema**: `~/.claude/agents/config/docs-structure.json`
- **Global Instructions**: `~/.claude/CLAUDE.md`
- **Operations Guide**: `~/.claude/agents/docs-operations.md`
