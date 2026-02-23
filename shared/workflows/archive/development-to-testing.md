---
name: handoff-development-to-testing
description: "Handoff checklist for transitioning from development to testing phase."
---

# Handoff Checklist: Development → Testing

**From**: Tech-Lead + Security-Engineer (Development Phase)
**To**: QA-Engineer (Testing Phase)
**Trigger**: Code complete with tests and security audit

---

## Upstream: Tech-Lead

### Before Handoff
- [ ] Implementation plan complete in `/docs/engineering/implementation-plans/`
- [ ] Code complete and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Test coverage ≥ 50% (or project target)
- [ ] Code matches design documents
- [ ] Documentation updated (comments, README)
- [ ] [Development → Testing Quality Gate](../quality-gates.md#gate-4-development-testing) criteria met

### During Handoff
- [ ] Notify qa-engineer implementation complete
- [ ] Provide links to implementation plan and code
- [ ] Explain any deviations from design
- [ ] Share test coverage report
- [ ] Demonstrate functionality to QA team
- [ ] Provide test environment access
- [ ] Update project-manager

### After Handoff
- [ ] Available for bug fixes
- [ ] Address failing tests quickly
- [ ] Support QA team with environment issues

---

## Upstream: Security-Engineer

### Before Handoff
- [ ] Security audit complete
- [ ] Audit report saved in `/docs/security/audit-reports/audit-[feature]-[date].md`
- [ ] No CRITICAL/HIGH vulnerabilities unresolved
- [ ] Security test cases provided to QA
- [ ] Secure configuration verified

### During Handoff
- [ ] Share security audit findings
- [ ] Provide security test scenarios to qa-engineer
- [ ] Explain security controls implemented
- [ ] Available for security testing support

---

## Downstream: QA-Engineer

### Upon Receiving Handoff
- [ ] Acknowledge handoff from tech-lead
- [ ] Review implementation plan and code changes
- [ ] Review security audit findings
- [ ] Validate test coverage meets targets
- [ ] Understand functionality to test

### During Testing
- [ ] Run full automated test suite (unit, integration, e2e)
- [ ] Conduct exploratory testing
- [ ] Validate UX implementation against designs
- [ ] Run accessibility tests (WCAG compliance)
- [ ] Execute security test scenarios
- [ ] Validate performance benchmarks
- [ ] Document test results in `/docs/testing/execution-reports/`
- [ ] Track bugs and coordinate fixes

### Collaboration
- [ ] Report bugs to tech-lead
- [ ] Coordinate with security-engineer on security testing
- [ ] Validate fixes with designer (UX issues)
- [ ] Update project-manager on testing progress

---

## Quality Gate: Development → Testing

Verify all criteria from [Development → Testing Gate](../quality-gates.md#gate-4-development-testing) before proceeding.

---

## Next Steps

After testing complete and all issues resolved, proceed to [Testing → Deployment Handoff](testing-to-deployment.md).
