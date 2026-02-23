---
name: todo-review-template
description: "Template for QA review reports on completed TODO items."
---

# TODO Completion QA Review

**Date:** [YYYY-MM-DD HH:MM]
**Reviewer:** qa-engineer (automated)
**Original TODO:** "[TODO title/description]"
**Status:** [PASS / PASS with Issues / FAIL]

---

## TLDR

- **Overall Assessment:** [One-line summary of review result]
- **Code Quality:** [PASS / ISSUES FOUND]
- **Documentation:** [PASS / ISSUES FOUND]
- **Functional Verification:** [PASS / ISSUES FOUND / SKIPPED]
- **Issues Found:** [Count] ([Critical: X, High: Y, Medium: Z, Low: W])
- **Follow-Up TODOs Created:** [Count]

---

## Metadata

- **Review Trigger:** TODO completion hook (automatic)
- **Review Scope:** [Brief description of what was reviewed]
- **Files Changed:**
  - `path/to/file1.ts`
  - `path/to/file2.tsx`
  - `path/to/file3.md`
- **Tools Used:**
  - Code review: Manual analysis
  - Testing: [Playwright / Unit tests / Skipped]
  - Documentation review: Manual analysis

---

## Code Quality Review

**Focus Areas:**
- Correctness
- Best practices adherence
- Security vulnerabilities
- Performance considerations
- Error handling
- Test coverage

### Findings

#### ✓ Strengths

- [List positive aspects of the code]
- [Well-implemented features]
- [Good practices followed]

#### ⚠️ Issues

**[SEVERITY] Issue Title**
- **File:** `path/to/file.ts:line`
- **Description:** [Detailed explanation of the problem]
- **Impact:** [Why this matters]
- **Recommendation:** [How to fix]
- **Follow-Up TODO:** [Reference to created TODO]

*[Repeat for each issue found]*

#### Summary

[Overall code quality assessment paragraph]

---

## Documentation Review

**Focus Areas:**
- Code comments for complex logic
- API documentation
- README updates
- Type definitions
- CHANGELOG entries

### Findings

#### ✓ Documentation Present

- [List what's documented well]
- [Areas with good explanations]

#### ⚠️ Documentation Gaps

**[SEVERITY] Missing Documentation: [Area]**
- **Location:** [Where documentation is needed]
- **Description:** [What needs to be documented]
- **Impact:** [Why this documentation matters]
- **Recommendation:** [What to add]
- **Follow-Up TODO:** [Reference to created TODO]

*[Repeat for each gap found]*

#### Summary

[Overall documentation assessment paragraph]

---

## Functional Verification

**Method:** [Playwright / Manual testing / Unit tests / Skipped]

**Reason if Skipped:** [Auth-gated / Backend-only / Infrastructure change]

### Test Scenarios

1. **[Scenario Name]**
   - **Expected:** [Expected behavior]
   - **Actual:** [Actual result]
   - **Status:** [✓ PASS / ✗ FAIL]
   - **Evidence:** [Screenshot path / Test output]

2. **[Scenario Name]**
   - **Expected:** [Expected behavior]
   - **Actual:** [Actual result]
   - **Status:** [✓ PASS / ✗ FAIL]
   - **Evidence:** [Screenshot path / Test output]

*[Repeat for each test scenario]*

### Playwright Tests (if applicable)

**Test Coverage:**
- Visual regression: [✓ / ✗ / N/A]
- Interaction testing: [✓ / ✗ / N/A]
- Data verification: [✓ / ✗ / N/A]
- Responsive design: [✓ / ✗ / N/A]
- Accessibility: [✓ / ✗ / N/A]

**Issues Found:**

**[SEVERITY] Functional Issue: [Description]**
- **Scenario:** [Which test scenario]
- **Steps to Reproduce:**
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- **Expected vs Actual:** [Clear comparison]
- **Screenshot:** [Path to evidence]
- **Follow-Up TODO:** [Reference to created TODO]

### Summary

[Overall functional verification assessment paragraph]

---

## Follow-Up TODOs Created

### CRITICAL Issues

1. **[CRITICAL] Fix: [Brief description]**
   - **Reference:** [TODO ID or description]
   - **File:** `path/to/file.ts`
   - **Priority:** Immediate attention required

*[List all CRITICAL issues]*

### HIGH Issues

1. **[HIGH] Fix: [Brief description]**
   - **Reference:** [TODO ID or description]
   - **File:** `path/to/file.ts`
   - **Priority:** Should fix soon

*[List all HIGH issues]*

### MEDIUM Issues

1. **[MEDIUM] Fix: [Brief description]**
   - **Reference:** [TODO ID or description]
   - **File:** `path/to/file.ts`
   - **Priority:** Should fix eventually

*[List all MEDIUM issues]*

### LOW Issues

1. **[LOW] Fix: [Brief description]**
   - **Reference:** [TODO ID or description]
   - **File:** `path/to/file.ts`
   - **Priority:** Nice to have

*[List all LOW issues]*

---

## Overall Assessment

**Final Rating:** [PASS / PASS with Issues / FAIL]

**Summary:**
[2-3 paragraph summary of the review:
- What was reviewed
- Overall quality assessment
- Key issues found (if any)
- Recommended next steps
- Impact on project/timeline]

**Recommendations:**
1. [Specific recommendation]
2. [Specific recommendation]
3. [Specific recommendation]

**Next Steps:**
- [If PASS]: No follow-up required. Work meets quality standards.
- [If PASS with Issues]: Address follow-up TODOs in priority order. Review doesn't block progress.
- [If FAIL]: Critical issues must be addressed before deployment. Coordinate with team.

---

## Appendix

### Review Checklist Completion

- [x] Code review completed
- [x] Documentation review completed
- [x] Functional verification attempted/completed/skipped
- [x] Security considerations evaluated
- [x] Performance implications assessed
- [x] Follow-up TODOs created for all issues
- [x] Review report saved to `/docs/testing/todo-reviews/`
- [x] Original TODO reference included

### References

- **Original TODO:** [Link or reference to TODO]
- **Related PRD:** [Path to PRD if applicable]
- **Related Design:** [Path to design doc if applicable]
- **Related Code:** [Links to relevant code files]
- **Related Tests:** [Links to test files]

### Review Methodology

This review was conducted using:
- **Code Analysis:** Static analysis of changed files
- **Documentation Review:** Verification of inline comments, API docs, and user-facing docs
- **Functional Testing:** [Description of testing approach used]
- **Automated Tools:** [List any linters, formatters, or analysis tools used]

---

**Generated by:** qa-engineer agent (automatic TODO completion hook)
**Hook:** `~/.claude/hooks/qa-review-on-todo-complete.sh`
**Review Date:** [YYYY-MM-DD HH:MM]
