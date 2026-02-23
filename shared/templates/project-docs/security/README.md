---
name: template-security-docs
description: "Template for security documentation directory."
---

# Security Documentation

This directory contains security audits, vulnerability assessments, architecture reviews, and compliance reports for the project.

**Managed by:** security-engineer

## Directory Structure

```
/docs/security/
  /audit-reports/          - Security vulnerability assessments
  /architecture-reviews/   - Security design analysis
  /compliance-reports/     - OWASP, NIST, CWE compliance assessments
  /templates/              - Reusable security documentation templates
  /reference/              - Security standards, patterns, and best practices
  README.md                - This file
```

## Key Documents

### Audit Reports
Audit reports are stored in `/audit-reports/` with naming: `audit-{feature-or-scope}-{YYYY-MM-DD}.md`

### Architecture Reviews
Architecture reviews are stored in `/architecture-reviews/` with naming: `architecture-review-{component}-{YYYY-MM-DD}.md`

### Compliance Reports
Compliance reports are stored in `/compliance-reports/` with naming: `compliance-{standard}-{YYYY-MM-DD}.md`

## Documentation Standards

All security documentation must include:
- **TLDR** - 3-5 critical findings with severity
- **ACTION PLAN** - Prioritized remediation steps
- **Severity ratings** - CRITICAL, HIGH, MEDIUM, LOW
- **Metadata** - Date, scope, methodology, reviewer

## Severity Guidelines

- **CRITICAL**: Immediate exploitation possible, severe impact
- **HIGH**: Exploitation likely, significant impact
- **MEDIUM**: Specific conditions required, moderate impact
- **LOW**: Difficult to exploit or minimal impact

## Cross-References

Security documentation frequently references:
- `/docs/engineering/` - Technical architecture and implementation
- `/docs/product/` - Security requirements in PRDs
- `/docs/ai/` - AI-specific security concerns
- `/docs/testing/` - Security test coverage

## Getting Started

1. The security-engineer agent creates this structure automatically
2. Security reviews occur throughout the development workflow
3. CRITICAL and HIGH findings must be remediated before deployment
4. Compliance reports ensure adherence to standards

---

*For complete documentation standards, see the root [/docs/README.md](../README.md)*
