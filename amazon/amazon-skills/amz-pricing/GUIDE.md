---
name: amz-pricing
description: Skill G - pricing, offers and launch economics for Amazon UK/EU products. Use when the user asks what price to charge, about a launch price, vouchers, coupons, deals, Prime-exclusive discounts, strike-through prices, bundles or multipacks, "should I drop my price", "should I run a promotion", competitor undercutting, or when to raise, hold or cut price. Shows the contribution profit of every proposed price and offer using the unit-economics calculator, sets a minimum sustainable price, and attaches a cost, objective, limit and stop condition to any promotion below the profit floor.
---

# G — Pricing, offers and launch economics

Standards: `../amz-orchestrator/references/standards.md`. Stage 8 onwards. Every price or offer
proposed here is run through `../amz-economics/scripts/unit_economics.py` first — a price without
its contribution profit is an opinion.

## 1. Purpose and triggers
Recommend a commercially defensible normal price, launch price and floor, and judge each offer by
profit and cash, not by revenue.

## 2. Inputs
Required: `inputs.json` from amz-economics (verified), the user's profit floor, the competitor
price positions from amz-validation. Optional: price history exports, measured conversion at
different prices, stock on hand and inbound.

## 3. Tools and data access
The calculator; live competitor prices as a normal visitor; Seller Central pages for the current
cost and eligibility rules of each promotion type (vouchers, deals, Prime-exclusive discounts),
reference/strike-through price rules, and fair-pricing policy. Promotion fees and rules change —
verify, then enter as `promo_fee_per_unit_gbp` with a source.

## 4. Workflow
1. **Price ladder from the calculator** (already in its output): break-even price → price that
   meets the profit floor → candidate normal prices. The floor price is the *minimum sustainable
   price*; nothing permanent goes below it.
2. **Position against competitors**: entry / core / premium bands observed in the competitor set,
   and where the differentiation justifies sitting. A better product priced at the bottom signals
   the opposite.
3. **Normal price.** Choose within the band the positioning supports; run conservative/base/
   optimistic. Check price endings and the thresholds where fees or fee tiers change.
4. **Launch price.** If lower than normal: state the objective (first sales and reviews at a known
   cost), the per-unit shortfall against the floor, the unit cap, the end date, and the stop
   condition. Total launch cost = shortfall × capped units — put that number in front of the user.
5. **Each offer** — model as a scenario override and report contribution after ads:
   - Voucher/coupon: `promo_discount_pct` = discount × expected redemption share;
     `promo_fee_per_unit_gbp` = fee × redemption share. Redemption share is `ASSUMED` until measured.
   - Deal / Prime-exclusive discount: discount depth, any deal fee spread over expected deal units.
   - Do not stack blindly: check how the offers combine and model the combined price.
6. **Profit or just revenue?** An offer improves profit only if the extra units × contribution at
   the offer price exceed the contribution given up on units that would have sold anyway. Compute
   the required uplift: `uplift needed = c_normal ÷ c_offer − 1`. If the uplift needed is
   implausible, the offer buys revenue, not profit — say so.
7. **Bundles and multipacks.** New inputs file per pack: price, packaged size and weight (new fee
   tier), one fulfilment fee across more product, landed cost × units in pack. Compare
   contribution per order *and* per unit of stock; check the pack does not cannibalise the single.
8. **Stock and cash effect.** Faster sales shorten cover: check with amz-inventory that the
   promotion will not cause a stockout before the next delivery, and that the lower cash per unit
   still funds the reorder.
9. **Reference-price honesty.** A "was" price must be a genuine, recently charged price under
   Amazon's rules and UK consumer law on misleading price indications. No invented RRPs.
10. **Price-change rules** — write them down with the user before launch (section 6).

## 5. Evidence standards
Competitor prices are `OBS` with date; expected uplift and redemption are `ASSUMED` until the
user's own data replaces them; all profit figures are `MODEL` from sourced inputs.

## 6. Decision rules (defaults — agree the numbers with the user)

| Signal (measured over a meaningful sample, not a day) | Action |
|---|---|
| Conversion at or above plan, stock cover falling below lead time | Raise price in small steps; protecting stock beats discounting |
| Conversion at plan, contribution ≥ floor | Hold |
| Conversion below plan with good traffic | Fix listing/images/reviews first; price is the last lever |
| Competitor undercuts | Do not follow below the floor; re-check differentiation and total offer |
| Contribution below floor at any tested price | Stop; return to amz-economics — the product may not work |
| Aged stock approaching storage surcharges | Time-boxed clearance priced against the cost of holding or removal, not against the floor |

## 7. Output template
```markdown
# Pricing — <product> — amazon.co.uk — <date>
Profit floor: £.../unit   Break-even price: £...   Minimum sustainable price: £...
Competitor bands (OBS, date): entry £... core £... premium £...
| Option | Price paid | Contribution after ads (cons / base / opt) | Margin | vs floor | Uplift needed | Notes |
Recommended normal price: ... because ...
Launch plan: price, objective, cost (£ shortfall × units), unit cap, end date, stop condition
Offers assessed: ...
Bundle / multipack economics: ...
Price-change rules agreed: ...
Confidence: <rating, why>
```

## 8. Missing data
No price history: say the competitor view is a one-day snapshot. No measured conversion: all
uplift figures are assumptions — present break-even uplift needed rather than a forecast.

## 9. Stop conditions
Never recommend a price or promotion below the profit floor without all four of: cost, objective,
limit, stop condition — and the user's explicit agreement. Stop if promotion fees or rules cannot
be verified today.

## 10. Example
"Normal price £22.99. Should I launch at £17.99 with a 10% voucher for the first month? Show me
what each option makes per unit and what the launch would cost in total."

## 11. Hand-off → amz-ads, amz-inventory
Normal, launch and floor prices; contribution before ads at each; break-even ACoS at each (it
moves with price); promotion calendar with caps and stop conditions; expected effect on sales rate
(labelled). Append the hand-off block.
