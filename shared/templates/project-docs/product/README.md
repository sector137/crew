---
name: template-product-docs
description: "Template for product documentation directory."
---

# Product Documentation

This directory contains all product requirements, business cases, strategy, and go-to-market plans for the project.

**Managed by:** product-manager

## Directory Structure

```
/docs/product/
  /prds/                   - Product Requirements Documents
  /business-cases/         - Business justification and ROI analysis
  /strategy/               - Product vision, roadmaps, and OKRs
  /go-to-market/           - Launch plans and market positioning
  /templates/              - Reusable product documentation templates
  /reference/              - Product frameworks and methodologies
  README.md                - This file
```

## Key Documents

### Product Requirements
PRDs are stored in `/prds/` with naming: `prd-{feature-name}-{YYYY-MM-DD}.md`

### Business Cases
Business cases are stored in `/business-cases/` with naming: `business-case-{topic}-{YYYY-MM-DD}.md`

### Strategy Documents
Strategy docs are stored in `/strategy/` with naming: `strategy-{focus-area}-{YYYY-MM-DD}.md`

### Go-to-Market Plans
GTM plans are stored in `/go-to-market/` with naming: `gtm-{initiative}-{YYYY-MM-DD}.md`

## Documentation Standards

All product documentation must include:
- **TLDR** - 3-5 critical bullets at top
- **ACTION PLAN** - Specific next steps with ownership
- **Metadata** - Date, context, stakeholders, dependencies
- **Traceability** - Links to research, UX, and technical docs

## Cross-References

Product documentation frequently references:
- `/docs/ux/` - User research and personas
- `/docs/market-research/` - Market analysis and competitive intelligence
- `/docs/engineering/` - Technical feasibility and constraints
- `/docs/security/` - Security requirements

## Getting Started

1. The product-manager agent creates this structure automatically
2. PRDs are the primary deliverable from the Definition phase
3. Business cases support strategic product decisions
4. Strategy and GTM docs guide product direction

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*
