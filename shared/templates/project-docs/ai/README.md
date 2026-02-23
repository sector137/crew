---
name: template-ai-docs
description: "Template for AI engineering documentation directory."
---

# AI & Machine Learning Documentation

This directory contains all AI/ML research, solution designs, and knowledge for the project.

**Managed by:** ai-engineer

## Directory Structure

```
/docs/ai/
  ai-knowledge.md          - Living document: Single source of truth for AI/ML knowledge
  /research/               - AI technology research and evaluations
  /solutions/              - AI solution designs and implementations
  /templates/              - Reusable AI documentation templates
  /reference/              - AI frameworks, methodologies, and standards
  README.md                - This file
```

## Key Documents

### Living Documents
- **`ai-knowledge.md`** - Comprehensive AI knowledge base tracking all AI decisions, models, architecture, and learnings

### Research Reports
Research reports are stored in `/research/` with naming: `research-{topic}-{YYYY-MM-DD}.md`

### Solution Designs
Solution designs are stored in `/solutions/` with naming: `solution-{feature-name}-{YYYY-MM-DD}.md`

## Documentation Standards

All AI documentation must include:
- **TLDR** - 3-5 critical bullets at top
- **ACTION PLAN** - Specific next steps
- **Metadata** - Date, context, dependencies
- **References** - Links to PRDs, technical designs, research

## Cross-References

AI documentation frequently references:
- `/docs/product/` - Product requirements for AI features
- `/docs/engineering/` - Technical integration architecture
- `/docs/security/` - AI security reviews
- `/docs/testing/` - AI testing strategies

## Getting Started

1. The ai-engineer agent creates this structure automatically
2. `ai-knowledge.md` is the first document created (if AI features exist)
3. Research and solution docs are added as AI work progresses
4. Templates and reference docs are created to establish patterns

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*
