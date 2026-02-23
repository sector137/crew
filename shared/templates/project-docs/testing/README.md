---
name: template-testing-docs
description: "Template for testing documentation directory."
---

# Quality Assurance Documentation

This directory contains test strategy, coverage reports, and quality assurance documentation for the project.

**Managed by:** qa-engineer

## Directory Structure

```
/docs/testing/
  test-strategy.md         - Living document: Overall testing approach and QA roadmap
  /coverage-reports/       - Test coverage analysis reports
  /execution-reports/      - Test execution results and findings
  /templates/              - Reusable testing documentation templates
  /reference/              - Testing patterns, standards, and best practices
  README.md                - This file
```

## Key Documents

### Living Documents
- **`test-strategy.md`** - Comprehensive test strategy, standards, and QA guidelines

### Coverage Reports
Coverage reports are stored in `/coverage-reports/` with naming: `coverage-report-{scope}-{YYYY-MM-DD}.md`

### Execution Reports
Execution reports are stored in `/execution-reports/` with naming: `test-execution-{scope}-{YYYY-MM-DD}.md`

## Documentation Standards

All testing documentation must include:
- **TLDR** - 3-5 critical bullets at top
- **ACTION PLAN** - Specific test writing or remediation tasks
- **Metadata** - Date, scope, methodology, test frameworks
- **Traceability** - Links to features, PRDs, and quality gates

## Quality Targets

- **Unit test coverage**: > 70%
- **Integration test coverage**: > 60%
- **E2E critical paths coverage**: 100%
- **Test pass rate**: > 95%

## Cross-References

Testing documentation frequently references:
- `/docs/product/` - Product requirements and success criteria
- `/docs/engineering/` - Technical implementation details
- `/docs/ux/` - User workflows for E2E test scenarios
- `/docs/security/` - Security testing requirements

## Getting Started

1. The qa-engineer agent creates this structure automatically
2. `test-strategy.md` is the first document created
3. Coverage and execution reports are added as testing progresses
4. Templates and reference docs establish testing patterns

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*
