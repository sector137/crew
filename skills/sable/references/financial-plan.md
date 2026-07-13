# The Financial Plan — Living Runway & Budget Record

The Financial Plan is the studio's single source of financial truth: current cash, burn, runway, budget allocations, and capital assumptions — in one maintained file, updated after every close and every material event. One file per project, updated in place.

It sits at the top of Sable's document chain:

```
financial-plan.md    (cash, burn, runway, budget — the current truth)
    ↓ feeds
statements/          (monthly P&L, balance sheet, cash flow — the actuals)
    ↓ reconciles with
scenarios/, budgets/ (projections and allocations)
    ↓ informs
/docs/product/product-strategy.md  (bets and capital needs)
```

Dated point-in-time outputs (board packs, fundraise models, scenario analyses) live in `/docs/finance/reports/` and `/docs/finance/scenarios/`. This file is the living record those analyses feed into.

## Template

Save to: `/docs/finance/financial-plan.md`

```markdown
---
last-updated: YYYY-MM-DD
last-close: YYYY-MM-DD
status: current | stale
---

# Financial Plan: [Studio / Project Name]

## TLDR
- Cash: $[X]K as of [date]
- Monthly burn: $[X]K (last 90-day avg)
- Runway: [N] months (base case)
- Last close: [month] — [clean / pending reconciliation item]
- Open flag: [any threshold breach or anomaly, or "none"]

## Cash Position

| Date | Bank Balance | Source |
|------|-------------|--------|
| [YYYY-MM-DD] | $[X] | [bank statement / accounting system] |

Update after every close. Do not edit this table without a reconciliation to back it.

## Burn Rate

| Period | Total Burn | Payroll | Infra | Vendors | Bets |
|--------|-----------|---------|-------|---------|------|
| [Mon YYYY] | $[X]K | $[X]K | $[X]K | $[X]K | $[X]K |
| [Mon YYYY] | | | | | |

**90-day average burn:** $[X]K/month
**Last month's burn:** $[X]K

## Runway

**Base case:** [N] months (burn stays flat at $[X]K/mo)
**Downside:** [N] months (burn at $[X]K/mo — [downside trigger, e.g., one new hire])
**Upside:** [N] months (burn at $[X]K/mo — [upside driver, e.g., cut vendor X])

**Fundraise-cycle safety buffer:** 6 months minimum. Current runway [above / below] buffer.

**Cash-out date (base):** [YYYY-MM]

## Budget Allocations

| Category | Monthly Budget | Last Month Actual | Variance | Note |
|----------|---------------|-------------------|----------|------|
| Payroll | $[X]K | $[X]K | +/-$[X]K | |
| Infrastructure (Realscript tier) | $[X]K | $[X]K | +/-$[X]K | |
| Vendors / SaaS | $[X]K | $[X]K | +/-$[X]K | |
| Portfolio Bets | $[X]K | $[X]K | +/-$[X]K | |
| **Total** | **$[X]K** | **$[X]K** | **+/-$[X]K** | |

## Active Bet Spend Ceilings

Per bet: the maximum cumulative spend before a kill-gate review is triggered.

| Bet (Issue ID) | Monthly Burn | Spend Ceiling | Cumulative to Date | Status |
|----------------|-------------|---------------|--------------------|--------|
| [Bet name] (#ID) | $[X]K | $[X]K | $[X]K | on track / at ceiling / over |

**Kill-gate rule:** When a bet hits its spend ceiling, Sable flags for capital-allocation review before the next dollar is committed. Ceiling is not automatic termination — it is a mandatory checkpoint.

## Capital Assumptions

- **Revenue recognized:** $[X]K / month (as of [date]) — [source / contract]
- **Pending fundraise:** [Series X / angel / none] — target close [quarter]
- **Use of funds (if fundraising):** [brief summary or link to fundraise model]

## Assumptions Block

*Every material assumption that the runway number rests on.*

| Assumption | Value | Confidence | Owner |
|------------|-------|-----------|-------|
| Burn stays flat | $[X]K/mo | [high/med/low] | Sable |
| No new hires | [Y/N] | [high/med/low] | [Mira / Sal] |
| Revenue ramp | [linear / none] | [high/med/low] | Harlan |
| [Other] | | | |

**Assumption the plan rests on:** [The single assumption that, if wrong, changes the cash-out date by more than 2 months. Name it here.]

## Change Log

| Date | Change | Triggered by |
|------|--------|-------------|
| [YYYY-MM-DD] | [What changed and why] | [close / event / bet approval] |
```

---

## Seeding from Real Data

### Step 1: Get the cash position
Pull the most recent bank balance from your accounting system (QuickBooks, Xero, Mercury, etc.) or bank statement. Record the date. This is the anchor — every runway calculation starts here.

### Step 2: Compute burn from actuals
Pull the last 3 months of total spend from the P&L. Average them. This is your burn figure. Do not use projected spend — use actuals.

If the last month is an outlier (one-time payment, prepaid contract), note it and use the adjusted average.

### Step 3: Populate bet spend ceilings
For each active bet in the pipeline: pull the cost-to-build estimate from the issue (Kael's estimate). Set the spend ceiling at that estimate. Populate the cumulative-to-date column from the actuals.

### Step 4: Name the assumption the plan rests on
Write the one assumption that, if wrong, moves the cash-out date by more than 2 months. This is mandatory — "burn stays flat" is not a complete assumption if a hire is in flight.

### Step 5: Set a stale-date policy
Mark `status: stale` if this file is not updated within 5 business days of a month-end close. Sable flags stale financial plans during weekly cash review.

---

## Update Cadence

| Trigger | What to update |
|---------|---------------|
| Monthly close complete | Cash position, burn table, runway, budget variance, Change Log |
| Bet approved / killed | Bet spend ceiling table, runway scenarios, Change Log |
| Material event (hire, contract, fundraise close) | Cash position, burn rate, capital assumptions, Change Log |
| Weekly cash review | Cash position only (if materially changed); flag if runway delta > 0.5 months |

A financial plan that isn't updated after the close is fiction with a date on it. Sable won't reason from stale data — she'll flag it and ask for the close first.
