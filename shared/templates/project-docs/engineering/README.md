---
name: template-engineering-docs
description: "Template for engineering documentation directory."
---

# Engineering Documentation

This directory contains all technical design documents, Architecture Decision Records, and implementation plans for the project.

**Managed by:** tech-lead

## Directory Structure

```
/docs/engineering/
  /design-docs/            - Technical design documents
  /adrs/                   - Architecture Decision Records
  /implementation-plans/   - Detailed implementation plans
  /templates/              - Reusable engineering documentation templates
  /reference/              - Technical standards, patterns, and guidelines
  README.md                - This file
```

## Key Documents

### Design Documents
Design docs are stored in `/design-docs/` with naming: `design-{feature-name}-{YYYY-MM-DD}.md`

### Architecture Decision Records (ADRs)
ADRs are stored in `/adrs/` with naming: `adr-{number}-{decision-title}.md` (e.g., `adr-001-use-postgresql.md`)

ADRs are numbered sequentially and immutable once accepted.

### Implementation Plans
Implementation plans are stored in `/implementation-plans/` with naming: `implementation-{feature-name}-{YYYY-MM-DD}.md`

## Documentation Standards

All engineering documentation must include:
- **TLDR** - 3-5 critical bullets at top
- **ACTION PLAN** - Specific implementation tasks
- **Metadata** - Date, context, dependencies
- **Traceability** - Links to PRDs, UX designs, and ADRs

## ADR Status Values
- **Proposed** - Decision under consideration
- **Accepted** - Decision approved and in effect
- **Deprecated** - Decision no longer applies
- **Superseded** - Replaced by a newer ADR (link to new ADR)

## Cross-References

Engineering documentation frequently references:
- `/docs/product/` - Product requirements and success criteria
- `/docs/ux/` - UX designs and user workflows
- `/docs/ai/` - AI solution architectures
- `/docs/security/` - Security architecture and requirements
- `/docs/testing/` - Testing strategies and quality gates

## Getting Started

1. The tech-lead agent creates this structure automatically
2. Design docs translate PRDs into technical solutions
3. ADRs document significant architectural decisions
4. Implementation plans guide development execution

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*
