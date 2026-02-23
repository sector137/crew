---
name: handoff-deployment-to-operations
description: "Handoff checklist for transitioning from deployment to operations phase."
---

# Handoff Checklist: Deployment → Operations

**From**: Tech-Lead / DevOps (Deployment Phase)
**To**: Project-Manager + Product-Manager (Operations Phase)
**Trigger**: Production deployment successful

---

## Upstream: Tech-Lead / DevOps

### Before Handoff
- [ ] Deployment successful to production
- [ ] Smoke tests passing in production
- [ ] Health checks passing
- [ ] Monitoring dashboards configured
- [ ] Alerts configured and tested
- [ ] Performance within acceptable range
- [ ] Rollback plan validated
- [ ] [Deployment → Production Quality Gate](../quality-gates.md#gate-6-deployment-production) passed

### During Handoff
- [ ] Notify project-manager and product-manager
- [ ] Provide deployment summary and status
- [ ] Share monitoring dashboards
- [ ] Provide runbook for operations
- [ ] Explain rollback procedures
- [ ] Document any deployment issues encountered
- [ ] Share production access and resources

### After Handoff
- [ ] Monitor system stability
- [ ] Available for production issues
- [ ] Support incident response if needed

---

## Downstream: Project-Manager

### Upon Receiving Handoff
- [ ] Acknowledge production deployment
- [ ] Review deployment status
- [ ] Understand monitoring and health metrics
- [ ] Update project-plan.md with production status

### During Operations
- [ ] Track system stability
- [ ] Monitor for issues and blockers
- [ ] Coordinate incident response if needed
- [ ] Conduct post-launch retrospective
- [ ] Document lessons learned in `/docs/project/retrospectives/`
- [ ] Plan next iteration

---

## Downstream: Product-Manager

### Upon Receiving Handoff
- [ ] Acknowledge feature live in production
- [ ] Begin tracking success metrics from PRD
- [ ] Set up user feedback collection

### During Operations
- [ ] Monitor success metrics (defined in PRD)
- [ ] Collect user feedback
- [ ] Analyze feature adoption and usage
- [ ] Validate success criteria being met
- [ ] Identify optimization opportunities
- [ ] Plan next iteration based on learnings

---

## Monitoring and Support

### Responsibilities

**Tech-Lead / DevOps**:
- System health and performance
- Incident response and resolution
- Infrastructure optimization

**QA-Engineer**:
- Production issue tracking
- Quality metrics monitoring
- Bug triage and prioritization

**Product-Manager**:
- Success metrics tracking
- User feedback analysis
- Feature iteration planning

**Project-Manager**:
- Overall project health
- Retrospective facilitation
- Next iteration planning

---

## Quality Gate: Production → Iteration

After stability period, verify [Production → Iteration Gate](../quality-gates.md#gate-7-production-iteration):
- System stable (uptime > target)
- Success metrics trending positively
- User feedback collected
- No CRITICAL production issues
- Post-launch retrospective complete
- Lessons learned documented
- Next iteration priorities identified

---

## Next Steps

After production stable and learnings captured:
1. Product-manager analyzes success metrics and feedback
2. Project-manager facilitates retrospective
3. Team identifies improvements and next priorities
4. Return to Discovery phase for next iteration
