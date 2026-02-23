---
name: template-market-research-docs
description: "Template for market research documentation directory."
---

# Market Research Documentation

This directory contains market analysis, competitive intelligence, and consumer insights for the project.

**Managed by:** researcher

## Directory Structure

```
/docs/market-research/
  /reports/                - Market analysis and competitive reports
  /strategy-proposals/     - Research strategy documents
  /templates/              - Reusable research documentation templates
  /reference/              - Research methodologies and data sources
  README.md                - This file
```

## Key Documents

### Market Analysis
Market analysis reports are stored in `/reports/` with naming: `market-analysis-{topic}-{YYYY-MM-DD}.md`

### Competitive Analysis
Competitive analysis reports are stored in `/reports/` with naming: `competitive-analysis-{focus-area}-{YYYY-MM-DD}.md`

### Consumer Insights
Consumer insights reports are stored in `/reports/` with naming: `consumer-insights-{topic}-{YYYY-MM-DD}.md`

### Strategy Proposals
Research strategy docs are stored in `/strategy-proposals/` with naming: `research-strategy-{initiative}-{YYYY-MM-DD}.md`

## Documentation Standards

All market research documentation must include:
- **TLDR** - 3-5 critical findings or recommendations
- **ACTION PLAN** - Specific next steps based on findings
- **Metadata** - Date, methodology, data sources, confidence levels
- **Traceability** - Links to product decisions and UX insights

## Research Quality Standards

- **Data sources**: > 10 sources consulted per report
- **Market validation confidence**: > 80%
- **Data recency**: < 6 months average age
- **Cross-validation**: Multiple sources for critical findings

## Cross-References

Market research documentation frequently references:
- `/docs/product/` - Product strategy and business cases
- `/docs/ux/` - User research and personas
- `/docs/engineering/` - Competitive technical approaches

## Getting Started

1. The researcher agent creates this structure automatically
2. Market research occurs during the Discovery phase
3. Findings inform product strategy and go-to-market plans
4. Research is updated as market conditions change

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*
