---
name: amz-ads
description: Skill H - Amazon advertising (PPC) planning and profitable growth for a new seller on Amazon UK/EU. Use when the user asks about Sponsored Products, Sponsored Brands, Sponsored Display, campaign structure, keywords and match types, bids, budgets, ACoS, TACoS, ROAS, negative keywords, search-term reports, "my ads are losing money", "how much should I spend on PPC", launch advertising, scaling spend, or whether to use external traffic. Builds a staged plan from break-even ACoS, separates measured results from planning assumptions, sets stop-loss rules, and never promises ranking, sales or profitability.
---

# H — Advertising and profitable growth

Standards: `../amz-orchestrator/references/standards.md`. Stage 9. Advertising spends real money
to buy information and sales; the plan must say in advance how much it may spend to learn, and
when it stops.

## 1. Purpose and triggers
A campaign structure, bids, budget and decision rules sized to a new seller's cash and tied to the
product's verified unit economics.

## 2. Inputs
Required: break-even ACoS and contribution before ads at the current price (amz-economics /
amz-pricing), the basis on which the user's ad console reports sales (VAT-inclusive or ex VAT),
launch ad budget from the profile, keyword tiers and competitor ASINs (amz-validation), the final
listing. Optional: search-term, targeting and placement reports; Business Reports (sessions, unit
session percentage).

## 3. Tools and data access
The user's exports from the Ads console and Seller Central. You have no account access unless the
user provides it; competitor bids, CPCs and spend are `UNKNOWN`. Amazon's suggested bids, when the
user reads them out, are `USER` data.

## 4. Workflow
1. **Listing readiness gate.** Do not buy traffic for a listing that is not ready: images and
   copy final, price set, stock available, at least the reviews the user can legitimately obtain
   (e.g. Amazon's own review programme if eligible — check current terms). Ads amplify conversion;
   they do not create it.
2. **Economics.**
   - Break-even ACoS = contribution before ads ÷ ad sales (on the console's basis) — from the calculator.
   - Target ACoS = break-even ACoS − the margin the user wants to keep. During launch the target
     may sit at or above break-even *only* inside a stated learning budget.
   - Max CPC = price (console basis) × target ACoS × conversion rate. Conversion rate is `ASSUMED`
     until measured: show max CPC at two or three conversion rates. If Amazon's suggested bid is
     well above max CPC, the keyword is unaffordable at this price — flag it rather than chase it.
3. **Structure** (Sponsored Products first; one product per campaign set):

   | Campaign | Purpose | Targeting | Bidding (starting assumption) | Starting bid |
   |---|---|---|---|---|
   | `<Product> - Exact` | Conversion on proven/T1 terms | 5–15 exact keywords | Fixed | ≤ max CPC |
   | `<Product> - Auto` | Discovery | Amazon auto targeting | Down only | ~50–70% of exact |
   | `<Product> - Broad` (or phrase) | Discovery around T2/T3 terms | Broad/phrase | Down only | ~70–80% of exact |
   | `<Product> - ASIN Targeting` | Appear on weaker competitors' pages | Listings from the competitor matrix with a visible weakness | Fixed | ~50–70% of exact |

   Launch in that priority order if budget is tight. Add every Exact keyword as a negative exact
   in Auto and Broad so discovery campaigns do not compete with it; negate the user's own ASIN in
   product targeting.
4. **Negative lists from day one**: cross-campaign (above); irrelevant (wrong material, size,
   audience); waste modifiers ("free", "repair", "second hand", "manual" — adapt to the product).
5. **Budget.** Split the launch ad budget into a daily cap that lasts the planned learning period.
   Starting split: roughly half to Exact, the rest across discovery — an assumption to revise
   with data. State the total learning budget as the maximum the user accepts losing to find out
   whether the product converts.
6. **Review cadence**: day 1 (delivering? policy rejections?), day 3 (obvious waste only), day 7,
   14, 21 (full search-term review), then weekly.
7. **Search-term rules** (thresholds scale with the product's conversion rate, so compute them):
   - *Promote*: a term with ≥ 2 orders at or below target ACoS → add to Exact; negate it (exact)
     in the campaign it came from.
   - *Negate*: a term with zero orders after N clicks, where N = 3 ÷ expected conversion rate
     (about a 5% chance of that happening by luck — e.g. 30 clicks at 10%), or whose spend has
     reached 2× the break-even ad cost per order → negative exact. Clearly irrelevant terms: negate
     immediately.
   - *Watch*: everything below N clicks. Acting on a handful of clicks is acting on noise.
8. **Bid rules** (keywords with at least N clicks; starting heuristics, adjust to results):

   | Measured ACoS vs target | Action |
   |---|---|
   | More than double | Cut bid 30–50%, or pause if also above break-even with no trend |
   | Above target by more than ~10 points | Cut 10–20% |
   | Within ~10 points | Hold |
   | Below target | Raise 10–20% and watch impression share |
   | No impressions | Raise bid in steps up to max CPC; then question relevance |
9. **Diagnose before spending more.** Low impressions → bid/relevance. Impressions but low CTR →
   main image, title, price, reviews. Clicks but low conversion → listing, price, reviews, wrong
   traffic. Good ad ACoS but poor total profit → check TACoS and organic share.
10. **TACoS** = ad spend ÷ total sales. Useful for seeing whether organic sales are growing
    alongside ads; limited because it mixes attribution windows, seasonality and price changes,
    and a falling TACoS can simply mean ads were cut. Read it as a trend, with ACoS, never alone.
11. **Budget reallocation.** Move budget from campaigns above break-even to those below target
    that are budget-capped. Check placement reports before adding placement modifiers.
12. **Scale conditions** — all required: measured ACoS ≤ target over a meaningful sample; measured
    contribution after ads ≥ floor; stock cover exceeds lead time at the higher sales rate
    (amz-inventory); cash funds the reorder. Then increase budgets in steps and re-measure.
13. **Sponsored Brands / Display / external traffic.** Consider only with Brand Registry, a
    converting listing and a stated role (defend brand terms, retarget, launch a range). External
    ads need a justified role and measurable economics (attribution tags, cost per order against
    the same break-even) — otherwise leave them out.

## 5. Evidence standards
Two separate tables in every output: **Measured** (source report, date range, clicks behind each
number) and **Planning assumptions** (conversion rate, CPC, lifecycle targets). Category
"benchmarks" are assumptions. Never state expected sales, rank or ROAS as an outcome.

## 6. Evaluation framework
Stop-loss rules agreed before launch: (a) total learning budget spent without measured ACoS
approaching break-even → pause and return to listing/price/product; (b) any campaign above
break-even ACoS after N clicks per main keyword with no improving trend → cut or pause;
(c) conversion materially below the assumption used for bids → recompute max CPC before
continuing.

## 7. Output template
```markdown
# Advertising plan — <product> — amazon.co.uk — <date>
Economics: price £... | break-even ACoS ...% (<basis>) | target ACoS ...% | max CPC at CVR x/y/z
Learning budget: £... over ... days; stop-loss rules: ...
Campaigns: | Name | Type | Targets | Bid | Daily budget | Negatives |
Review calendar and thresholds (N = ... clicks): ...
Measured (after launch): | Metric | Value | Report | Date range | Clicks |
Planning assumptions: ...
Actions in priority order: 1 stop waste, 2 fix conversion, 3 bids, 4 scale
```

## 8. Missing data
Before launch everything is an assumption — say so and give ranges. With thin data (below N
clicks) recommend waiting rather than optimising.

## 9. Stop conditions
Stop if break-even ACoS is unknown, if the listing-readiness gate fails, if stock cannot support
the plan, or when a stop-loss rule triggers. Do not recommend spend above the agreed learning
budget.

## 10. Example
"Break-even ACoS is 32% on VAT-inclusive sales and I have £400 for the first month. Build the
launch campaigns, bids and the rules for when I cut a keyword."

## 11. Hand-off → amz-inventory, amz-pricing, orchestrator
Measured conversion, CPC, ACoS, TACoS and daily units with date ranges and click counts; ad cost
per unit to replace the `tacos` assumption in `inputs.json`; planned spend changes and their
expected effect on sales rate (labelled). Append the hand-off block.
