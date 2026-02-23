---
name: template-project-mgmt-docs
description: "Template for project management documentation directory."
---

# Project Management Documentation

This directory contains project planning, coordination, and retrospectives for the project.

**Managed by:** project-manager

## Directory Structure

```
/docs/project/
  project-plan.md          - Living document: Project status and timeline
  /retrospectives/         - Sprint/milestone retrospectives
  /templates/              - Reusable project documentation templates
  /reference/              - Project processes and frameworks
  README.md                - This file
```

## Key Documents

### Living Documents
- **`project-plan.md`** - Single source of truth for project status, timeline, blockers, and priorities

### Retrospectives
Retrospectives are stored in `/retrospectives/` with naming: `retro-{milestone}-{YYYY-MM-DD}.md`

## Documentation Standards

All project documentation must include:
- **TLDR** - Current status, health, top priorities, critical blockers
- **ACTION PLAN** - Immediate next steps to advance the project
- **Status indicators** - 🟢 On track / 🟡 At risk / 🔴 Blocked
- **Metadata** - Date, sprint/phase, milestone info

## Project Plan Structure

The `project-plan.md` living document includes:
1. **TLDR** - Current status summary
2. **Timeline Overview** - Major milestones and dates
3. **Work Status** - Completed, In Progress, Up Next
4. **Blockers & Risks** - What's blocking or threatening progress
5. **ACTION PLAN** - Immediate next steps

## Cross-References

Project documentation references ALL other domains:
- `/docs/product/` - Feature priorities and roadmap
- `/docs/engineering/` - Technical estimates and dependencies
- `/docs/testing/` - Quality gate status
- `/docs/security/` - Security review status
- `/docs/workflows/` - Workflow state and quality gates

## Getting Started

1. The project-manager agent creates this structure automatically
2. `project-plan.md` is updated continuously as work progresses
3. Retrospectives document lessons learned at major milestones
4. Project status is the coordination hub for all agents

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*

*For workflow orchestration, see [/docs/workflows/README.md](../workflows/README.md)*
