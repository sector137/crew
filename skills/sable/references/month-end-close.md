# Month-End Close — Checklist Template & Process

The month-end close is the foundation. Every forecast, board pack, and business-case verdict runs on statements that are only as good as the close that produced them. Sable runs this on a calendar — not on request.

Sable orchestrates the `finance:*` skills for close mechanics. This reference documents the expected sequence, the checklist template, and the seeding-from-real-data instructions for standing up the first close.

---

## Close Sequence

The order is not optional. Dependencies are real: reconciliations catch mis-postings before statements; accruals must be booked before you pull P&L; statements go out only when every reconciliation is clean.

```
Day 1–3:   Pre-close prep — gather source data (bank statements, payroll reports, vendor invoices)
Day 3–5:   Book period-end accruals (prepaid amortization, payroll, deferred revenue, depreciation)
Day 5–7:   Reconciliations — bank rec first, then GL to subledger, then intercompany (if any)
Day 7–8:   Review and adjusting entries — catch anything the reconciliations surfaced
Day 8–10:  Pull financial statements — P&L, balance sheet, cash flow
Day 10:    Variance commentary — budget vs. actual, driver explanation
Day 10:    Update financial-plan.md — runway, burn rate, cash position
Day 10:    Distribute: post statements to /docs/finance/statements/, update close status
```

Hard rule: **statements never precede a clean bank rec.** If the bank rec has unreconciled items at Day 7, the close extends — do not pull statements over an open reconciliation.

---

## Close Checklist Template

Sable creates this file at the start of each close cycle via `finance:close-management`. It lives at `/docs/finance/close/close-[YYYY-MM].md`.

```markdown
---
period: YYYY-MM
close-target: YYYY-MM-DD
status: open | in-progress | complete
last-updated: YYYY-MM-DD
---

# Month-End Close: [Month YYYY]

## TLDR
- Period: [Month YYYY]
- Target close date: [YYYY-MM-DD]
- Status: [open / in-progress / complete]
- Open items: [count or "none"]

## Pre-Close Prep

- [ ] Bank statements received and downloaded (all accounts)
- [ ] Payroll report for the period received
- [ ] Vendor invoices posted to the ledger
- [ ] Credit card statements reconciled to ledger
- [ ] Any large or unusual transactions identified and documented

## Accruals & Adjustments

| Entry | Account (DR) | Account (CR) | Amount | Basis |
|-------|-------------|-------------|--------|-------|
| Payroll accrual | Payroll Expense | Accrued Payroll | $[X] | [pay period dates] |
| Prepaid amortization — [vendor] | [SaaS/Rent Expense] | Prepaid Expense | $[X] | [contract / months] |
| Depreciation | Depreciation Expense | Accum. Depreciation | $[X] | [asset schedule] |
| Deferred revenue | Deferred Revenue | Revenue | $[X] | [customer / contract] |
| [Other] | | | | |

Skill: `finance:journal-entry-prep` → `finance:journal-entry`

- [ ] All accruals booked and posted
- [ ] Journal entry files saved to `/docs/finance/books/journal-entries/`

## Reconciliations

| Account | Balance per Bank/Sub | Balance per GL | Difference | Status |
|---------|---------------------|---------------|-----------|--------|
| Operating checking | $[X] | $[X] | $[X] | open / cleared |
| Savings / reserve | $[X] | $[X] | $[X] | open / cleared |
| AR subledger | $[X] | $[X] | $[X] | open / cleared |
| AP subledger | $[X] | $[X] | $[X] | open / cleared |
| Intercompany (if any) | $[X] | $[X] | $[X] | open / cleared |

Skill: `finance:reconciliation`

- [ ] Bank reconciliation complete — all items cleared or documented
- [ ] GL-to-subledger reconciliation complete
- [ ] No unreconciled items older than 30 days
- [ ] Rec files saved to `/docs/finance/books/reconciliations/`

## Financial Statements

Skill: `finance:financial-statements`

- [ ] P&L (Income Statement) — current period and YTD
- [ ] Balance Sheet — end of period
- [ ] Cash Flow Statement — indirect method
- [ ] Period-over-period comparison (prior month, prior year if available)
- [ ] Statements saved to `/docs/finance/statements/[YYYY-MM]/`

## Variance Commentary

Skill: `finance:variance-analysis`

| Category | Budget | Actual | Variance | Driver |
|----------|--------|--------|----------|--------|
| Payroll | $[X]K | $[X]K | +/-$[X]K | [explanation] |
| Infrastructure | $[X]K | $[X]K | +/-$[X]K | [explanation] |
| Vendors / SaaS | $[X]K | $[X]K | +/-$[X]K | [explanation] |
| Portfolio Bets | $[X]K | $[X]K | +/-$[X]K | [explanation] |
| Revenue | $[X]K | $[X]K | +/-$[X]K | [explanation] |

- [ ] Variance commentary written — drivers explained in plain English, not accounting notation
- [ ] Any variance > 10% or > $[threshold] flagged for review

## Post-Close Updates

- [ ] `/docs/finance/financial-plan.md` updated — cash, burn, runway, Change Log
- [ ] Close status set to `complete` in this file
- [ ] Any open items documented with owner and target resolution date

## Open Items

| Item | Owner | Target Date | Notes |
|------|-------|-------------|-------|
| [Description] | [name] | [YYYY-MM-DD] | |

## Assumptions Block

| Assumption | Value | Basis |
|------------|-------|-------|
| Payroll period | [dates] | Payroll report |
| Prepaid amortization — [vendor] | $[X]/mo | [contract dated YYYY-MM-DD] |
| [Other] | | |
```

---

## Seeding the First Close

If `/docs/finance/close/` does not exist and `/docs/finance/books/` is new:

**Step 1: Stand up the chart of accounts first.**
The chart of accounts is the classification backbone. Without it, every entry is guesswork. Standard startup chart of accounts (GAAP, accrual basis):

| Code Range | Category | Examples |
|------------|----------|---------|
| 1000–1999 | Assets | Cash, AR, Prepaid, Fixed Assets |
| 2000–2999 | Liabilities | AP, Accrued Payroll, Deferred Revenue, Loans |
| 3000–3999 | Equity | Common Stock, Retained Earnings |
| 4000–4999 | Revenue | SaaS Revenue, Service Revenue, Other |
| 5000–5999 | COGS | Hosting, Payment Processing, Direct Labor |
| 6000–6999 | Operating Expenses | Payroll, SaaS Tools, Marketing, Legal/Accounting |
| 7000–7999 | Other | Interest, Depreciation |

Save to: `/docs/finance/books/chart-of-accounts.md`

**Step 2: Gather source documents.**
- Bank statements for the period (all accounts)
- Payroll reports
- Vendor invoices and receipts
- Cap table / equity schedule (for equity section)
- Any existing loan or note agreements

**Step 3: Establish the opening balance.**
The first close needs an opening balance sheet. If there is no prior close, the opening balance is:
- Cash: pull from bank statement as of the first day of the period
- Other assets/liabilities: list everything owed to or owed by the company
- Equity: founder contributions, any prior investment

**Step 4: Book all transactions for the period.**
For each bank transaction: classify to a chart-of-accounts code, post to the general ledger. Use `finance:journal-entry-prep` to identify the debit/credit pair for any non-obvious entries (prepaid, deferred revenue, accruals).

**Step 5: Run the close sequence.**
Follow the sequence above. Do not skip the reconciliation step even if you "know" the bank balance is right. The rec is the proof.

---

## Sable's Close Rules

1. **No statements before a clean bank rec.** Ever.
2. **Every accrual needs a basis.** Payroll accrual cites the pay period; prepaid amortization cites the contract and the straight-line schedule.
3. **Variance commentary explains the driver, not just the number.** "Vendors were 18% over" is not commentary. "Vendors were 18% over because we onboarded Segment in mid-month — next month normalizes" is commentary.
4. **The financial plan is updated the same day the close is complete.** Not "later this week."
5. **Open items have owners and dates.** An unresolved reconciling item with no owner is a control failure, not a to-do.
6. **Close on time.** Ten business days maximum. Late books are decisions made blind for another month.
