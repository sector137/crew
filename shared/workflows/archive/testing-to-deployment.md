---
name: handoff-testing-to-deployment
description: "Handoff checklist for transitioning from testing to deployment phase."
---

# Handoff Checklist: Testing → Deployment

**From**: QA-Engineer + Security-Engineer + Designer (Testing Phase)
**To**: Tech-Lead / DevOps (Deployment Phase)
**Trigger**: All tests passing and quality validated

---

## Upstream: QA-Engineer

### Before Handoff
- [ ] All automated tests passing (unit, integration, e2e)
- [ ] Exploratory testing complete
- [ ] No CRITICAL/HIGH bugs unresolved
- [ ] Test execution report saved in `/docs/testing/execution-reports/`
- [ ] Accessibility compliance validated (WCAG)
- [ ] Performance benchmarks met
- [ ] [Testing → Deployment Quality Gate](../quality-gates.md#gate-5-testing-deployment) passed

### During Handoff
- [ ] Notify tech-lead/devops testing complete
- [ ] Share test execution report
- [ ] Provide smoke test plan for production
- [ ] Explain any known minor issues
- [ ] Available for production testing support
- [ ] Update project-manager

---

## Upstream: Security-Engineer

### Before Handoff
- [ ] Final security verification complete
- [ ] Security sign-off provided
- [ ] No CRITICAL/HIGH vulnerabilities unresolved
- [ ] Security monitoring requirements defined

### During Handoff
- [ ] Share security verification status
- [ ] Provide security monitoring guidance
- [ ] Available for deployment security support

---

## Upstream: Designer

### Before Handoff
- [ ] UX implementation validated against designs
- [ ] Visual quality confirmed
- [ ] Interaction patterns working correctly

---

## Downstream: Tech-Lead / DevOps

### Upon Receiving Handoff
- [ ] Acknowledge testing complete
- [ ] Review test execution report
- [ ] Validate deployment prerequisites met
- [ ] Confirm infrastructure ready

### During Deployment
- [ ] Review deployment plan
- [ ] Configure production infrastructure
- [ ] Set up monitoring and alerts
- [ ] Prepare rollback plan
- [ ] Execute deployment (staged rollout recommended)
- [ ] Run smoke tests in production
- [ ] Verify health checks
- [ ] Document deployment in runbook

### Coordination
- [ ] QA-engineer runs smoke tests
- [ ] Security-engineer validates security controls
- [ ] Project-manager coordinates stakeholder communication
- [ ] Update project-manager on deployment status

---

## Quality Gate: Testing → Deployment

Verify all criteria from [Testing → Deployment Gate](../quality-gates.md#gate-5-testing-deployment) before proceeding.

---

## Next Steps

After deployment successful, proceed to [Deployment → Operations Handoff](deployment-to-operations.md).
