---
name: metrics-dashboard
description: "Metrics dashboard template for tracking project health."
---

# Project Metrics Dashboard

The project-manager maintains this unified dashboard to track cross-functional KPIs and workflow health. All agents contribute domain-specific metrics weekly.

**Last Updated**: [Date]
**Reporting Period**: [Week/Sprint/Month]

---

## Executive Summary

**Overall Project Health**: 🟢 On Track / 🟡 At Risk / 🔴 Blocked

**Key Highlights This Period**:
- [Major accomplishment or milestone]
- [Key metric improvement]
- [Important decision or change]

**Top Concerns**:
- [Primary blocker or risk]
- [Quality or velocity issue]
- [Resource or timeline concern]

---

## 1. Workflow Velocity Metrics

### Phase Cycle Times

Track how long work items spend in each phase (target vs. actual):

| Phase Transition | Target | Actual This Period | Trend | Status |
|-----------------|--------|-------------------|-------|--------|
| Discovery → Definition | < 2 weeks | ___ | ⬆️/➡️/⬇️ | 🟢/🟡/🔴 |
| Definition → Design | < 1 week | ___ | ⬆️/➡️/⬇️ | 🟢/🟡/🔴 |
| Design → Development | < 3 weeks | ___ | ⬆️/➡️/⬇️ | 🟢/🟡/🔴 |
| Development → Testing | < 1 week | ___ | ⬆️/➡️/⬇️ | 🟢/🟡/🔴 |
| Testing → Deployment | < 3 days | ___ | ⬆️/➡️/⬇️ | 🟢/🟡/🔴 |
| **Total Cycle Time** | **< 8 weeks** | **___** | **⬆️/➡️/⬇️** | **🟢/🟡/🔴** |

**Analysis**: [Brief explanation of trends and any issues]

### Quality Gate Performance

| Gate | Attempts | Pass Rate | Avg Time at Gate | Status |
|------|----------|-----------|------------------|--------|
| Discovery → Definition | ___ | ___% | ___ days | 🟢/🟡/🔴 |
| Definition → Design | ___ | ___% | ___ days | 🟢/🟡/🔴 |
| Design → Development | ___ | ___% | ___ days | 🟢/🟡/🔴 |
| Development → Testing | ___ | ___% | ___ days | 🟢/🟡/🔴 |
| Testing → Deployment | ___ | ___% | ___ days | 🟢/🟡/🔴 |
| **Average Gate Pass Rate** | **___** | **___%** | **___ days** | **🟢/🟡/🔴** |

**Target**: > 80% pass rate on first attempt

**Analysis**: [Common failure reasons and improvements needed]

---

## 2. Discovery Metrics (Researcher + Designer)

### Market Research Quality

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Research depth score (sources consulted) | > 10 | ___ | 🟢/🟡/🔴 |
| Market size validation confidence | > 80% | ___% | 🟢/🟡/🔴 |
| Competitive analysis completeness | 100% | ___% | 🟢/🟡/🔴 |
| TAM documentation quality | High | ___ | 🟢/🟡/🔴 |

**Source**: Researcher

### User Research Quality

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| User interviews conducted | > 5 per feature | ___ | 🟢/🟡/🔴 |
| Persona coverage (% features mapped) | 100% | ___% | 🟢/🟡/🔴 |
| JTBD documentation completeness | 100% | ___% | 🟢/🟡/🔴 |
| Research-to-design traceability | > 90% | ___% | 🟢/🟡/🔴 |

**Source**: Designer

**Insights**: [Key learnings from research this period]

---

## 3. Definition Metrics (Product-Manager)

### PRD Quality

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| PRD template compliance | 100% | ___% | 🟢/🟡/🔴 |
| Success metrics defined | 100% | ___% | 🟢/🟡/🔴 |
| Research citations in PRD | > 5 | ___ | 🟢/🟡/🔴 |
| Requirements stability (% changed post-approval) | < 10% | ___% | 🟢/🟡/🔴 |

### Stakeholder Alignment

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| PRD review cycles before approval | < 2 | ___ | 🟢/🟡/🔴 |
| Stakeholder approval time | < 3 days | ___ days | 🟢/🟡/🔴 |
| PRD-to-design handoff smoothness | High | ___ | 🟢/🟡/🔴 |

**Source**: Product-Manager

---

## 4. Design Metrics (Designer + Tech-Lead)

### UX Design Quality

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Design iterations before approval | < 2 | ___ | 🟢/🟡/🔴 |
| User research → design traceability | 100% | ___% | 🟢/🟡/🔴 |
| Accessibility compliance (WCAG) | AAA | ___ | 🟢/🟡/🔴 |
| Design-to-development handoff clarity | High | ___ | 🟢/🟡/🔴 |

**Source**: Designer

### Technical Design Quality

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Design review cycles | < 2 | ___ | 🟢/🟡/🔴 |
| ADRs for major decisions | 100% | ___% | 🟢/🟡/🔴 |
| Technical feasibility score | High | ___ | 🟢/🟡/🔴 |
| Design-to-code alignment | > 95% | ___% | 🟢/🟡/🔴 |

**Source**: Tech-Lead

---

## 5. Development Metrics (Tech-Lead)

### Code Quality

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Code review approval time | < 1 day | ___ | 🟢/🟡/🔴 |
| Design-to-code alignment | > 95% | ___% | 🟢/🟡/🔴 |
| Implementation complexity vs. estimate | ±20% | ___% | 🟢/🟡/🔴 |
| Technical debt introduced | Minimal | ___ | 🟢/🟡/🔴 |

### Cycle Time

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Design approved → code complete | < 3 weeks | ___ | 🟢/🟡/🔴 |
| PR merge time (submit → merge) | < 1 day | ___ | 🟢/🟡/🔴 |

**Source**: Tech-Lead

---

## 6. Quality Metrics (QA-Engineer + Security-Engineer)

### Test Coverage

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Unit test coverage | > 70% | ___% | 🟢/🟡/🔴 |
| Integration test coverage | > 60% | ___% | 🟢/🟡/🔴 |
| E2E test coverage (critical paths) | 100% | ___% | 🟢/🟡/🔴 |
| Test pass rate (before fixes) | > 95% | ___% | 🟢/🟡/🔴 |

### Defect Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Defect density (bugs/1000 LOC) | < 5 | ___ | 🟢/🟡/🔴 |
| Critical/High bugs in production | 0 | ___ | 🟢/🟡/🔴 |
| Bug fix time (Critical) | < 1 day | ___ | 🟢/🟡/🔴 |
| Bug fix time (High) | < 3 days | ___ | 🟢/🟡/🔴 |

**Source**: QA-Engineer

### Security Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| CRITICAL security issues | 0 | ___ | 🟢/🟡/🔴 |
| HIGH security issues | 0 | ___ | 🟢/🟡/🔴 |
| MEDIUM security issues | < 5 | ___ | 🟢/🟡/🔴 |
| Security review completion rate | 100% | ___% | 🟢/🟡/🔴 |
| Time to fix CRITICAL security issues | < 1 day | ___ | 🟢/🟡/🔴 |

**Source**: Security-Engineer

---

## 7. AI Metrics (AI-Engineer) [If Applicable]

### AI Performance

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Model accuracy | > 95% | ___% | 🟢/🟡/🔴 |
| Average response latency | < 500ms | ___ms | 🟢/🟡/🔴 |
| Cost per request | < $0.01 | $\___ | 🟢/🟡/🔴 |
| AI test coverage | > 80% | ___% | 🟢/🟡/🔴 |

**Source**: AI-Engineer

---

## 8. Deployment & Operations Metrics

### Deployment Frequency

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Deployments per week | > 2 | ___ | 🟢/🟡/🔴 |
| Deployment success rate | > 95% | ___% | 🟢/🟡/🔴 |
| Rollback rate | < 5% | ___% | 🟢/🟡/🔴 |
| Mean time to deploy | < 30 min | ___ min | 🟢/🟡/🔴 |

### Production Health

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| System uptime | > 99.9% | ___% | 🟢/🟡/🔴 |
| Error rate | < 0.1% | ___% | 🟢/🟡/🔴 |
| P95 response time | < 200ms | ___ms | 🟢/🟡/🔴 |
| Mean time to recovery (MTTR) | < 30 min | ___ | 🟢/🟡/🔴 |

**Source**: Tech-Lead / DevOps

---

## 9. Team Health Metrics (Project-Manager)

### Workflow Health

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Work in progress (WIP) limit adherence | 100% | ___% | 🟢/🟡/🔴 |
| Blocked items | 0 | ___ | 🟢/🟡/🔴 |
| Average blocker resolution time | < 2 days | ___ | 🟢/🟡/🔴 |
| Handoff smoothness score (1-10) | > 8 | ___ | 🟢/🟡/🔴 |

### Documentation Health

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Documentation completeness | 100% | ___% | 🟢/🟡/🔴 |
| TLDR/ACTION PLAN compliance | 100% | ___% | 🟢/🟡/🔴 |
| Cross-reference accuracy | > 95% | ___% | 🟢/🟡/🔴 |
| README indices up-to-date | 100% | ___% | 🟢/🟡/🔴 |

**Source**: Project-Manager

---

## 10. Product Success Metrics (Product-Manager)

### Feature Success

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Features meeting success criteria | > 80% | ___% | 🟢/🟡/🔴 |
| User adoption rate | > 60% | ___% | 🟢/🟡/🔴 |
| User satisfaction (NPS/CSAT) | > 40 | ___ | 🟢/🟡/🔴 |
| Feature usage frequency | [Varies] | ___ | 🟢/🟡/🔴 |

### Business Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Monthly active users (MAU) | [Target] | ___ | 🟢/🟡/🔴 |
| Revenue impact | [Target] | ___ | 🟢/🟡/🔴 |
| Customer acquisition cost (CAC) | [Target] | $___ | 🟢/🟡/🔴 |
| Customer lifetime value (LTV) | [Target] | $___ | 🟢/🟡/🔴 |

**Source**: Product-Manager

---

## Trends and Insights

### Positive Trends
- [What's improving and why]
- [Successful experiments or changes]

### Areas of Concern
- [What's declining and why]
- [Persistent problems or bottlenecks]

### Actions Taken This Period
- [Improvements implemented]
- [Process changes made]
- [Blockers resolved]

### Planned Improvements Next Period
- [What we'll focus on improving]
- [Experiments we'll run]
- [Changes we'll implement]

---

## Maintenance

**Weekly** (Project-Manager):
- Collect metrics from all agents
- Update dashboard with latest data
- Identify trends and anomalies
- Flag concerning metrics to team
- Share dashboard in team meeting

**Monthly** (Project-Manager):
- Review metric trends over time
- Validate metrics still valuable
- Add/remove metrics as needed
- Conduct deeper analysis of patterns
- Share insights with stakeholders

**Quarterly** (Team):
- Review metric effectiveness
- Adjust targets based on learnings
- Celebrate improvements
- Address persistent issues
- Update metric definitions as needed

---

## How to Contribute Metrics

**All Agents**: When completing work in your domain, update relevant metrics in this dashboard. Add notes to project-manager if metrics indicate issues.

**Project-Manager**: Consolidate updates weekly, analyze trends, coordinate improvements.
