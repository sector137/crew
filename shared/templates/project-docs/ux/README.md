---
name: template-ux-docs
description: "Template for UX documentation directory."
---

# User Experience Documentation

This directory contains all UX research, personas, workflows, and design proposals for the project.

**Managed by:** designer

## Directory Structure

```
/docs/ux/
  jtbd.md                  - Living document: Jobs-to-be-Done framework
  personas.md              - Living document: User personas and ICP
  workflows.md             - Living document: User workflows and journeys
  user-stories.md          - Living document: User stories and acceptance criteria
  /research-reports/       - UX research findings and user studies
  /proposals/              - UX design proposals and recommendations
  /templates/              - Reusable UX documentation templates
  /reference/              - UX frameworks, principles, and standards
  README.md                - This file
```

## Key Documents

### Living Documents
- **`jtbd.md`** - Jobs-to-be-Done framework and user goals
- **`personas.md`** - User personas and Ideal Customer Profile definitions
- **`workflows.md`** - User workflows and journey maps
- **`user-stories.md`** - User stories with acceptance criteria

### Research Reports
Research reports are stored in `/research-reports/` with naming: `{feature-name}-research-{YYYY-MM-DD}.md`

### Design Proposals
Proposals are stored in `/proposals/` with naming: `{feature-name}-proposal.md`

## Documentation Standards

All UX documentation must include:
- **TLDR** - 3-5 critical bullets at top
- **ACTION PLAN** - Specific next steps
- **Metadata** - Date, context, dependencies
- **Research citations** - Links to sources and user research

## Cross-References

UX documentation frequently references:
- `/docs/product/` - Product requirements and success metrics
- `/docs/market-research/` - Market insights and competitive UX
- `/docs/engineering/` - Technical constraints and feasibility
- `/docs/ai/` - AI feature UX design

## Getting Started

1. The designer agent creates this structure automatically
2. Living documents are initialized first
3. Research reports and proposals are added as UX work progresses
4. Templates and reference docs establish design patterns

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*
