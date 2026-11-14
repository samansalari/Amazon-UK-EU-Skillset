# Standard product decision report

Write to `candidates/<slug>/report.md`. Keep every heading, in this order, for every product so
reports can be compared line by line. If a section has no evidence yet, write `UNKNOWN` plus what
would fill it — an empty section is information, a padded one is noise. Every figure carries its
evidence label (`standards.md` section 1).

```markdown
# <Product concept> — decision report
Marketplace: amazon.co.uk | Currency: GBP | Date: <date> | Stage reached: <n> | Classification: <one of six>
Selling window: demand runs <months> | on sale by <date> | order by <date> | if missed: <next window>

## 1. Product concept and target customer
## 2. Why customers would buy it
## 3. Evidence of demand
## 4. Competitive landscape
## 5. Differentiation opportunity
## 6. Main risks and reasons it might fail
## 7. Indicative sourcing options and quotation status
## 8. Landed-cost model
## 9. UK selling-price range and supporting evidence
## 10. Profit per unit and margin — conservative / base / optimistic
## 11. Break-even advertising economics
## 12. Initial capital and reorder funding requirements
## 13. Compliance checks and unresolved issues
## 14. Listing, pricing and launch approach
## 15. European-market comparison (only if requested; one sub-section per country)
## 16. Confidence rating
## 17. Recommendation: go / pause / reject
## 18. Cheapest useful next validation step
```

Section notes:
- Header, selling window: per `standards.md` section 8, each part labelled; `UNKNOWN` is allowed, a blank is not.
- 6: include the evidence that would disprove the opportunity, and whether anyone has looked for it.
- 8, 10, 11, 12: paste the tables from `amz-economics/scripts/unit_economics.py`; do not retype numbers.
- 10: state the VAT basis of revenue and that margin is on net revenue (not mark-up on cost).
- 13: list each open item with an owner (user / supplier / named professional).
- 16: confidence in the evidence, separate from the scorecard score.
- 17: must be consistent with open gates — an open hard gate cannot coexist with "go".
- 18: one step, with its cost and what result would change the decision.

## Comparison table (when assessing several products)

| | Product A | Product B | Product C |
|---|---|---|---|
| Classification | | | |
| Opportunity score /100 | | | |
| Evidence confidence | | | |
| Open gates | | | |
| Selling window / order-by date | | | |
| UK price band observed | | | |
| Landed cost per sellable unit | | | |
| Contribution after ads (conservative / base) | | | |
| Contribution margin (base) | | | |
| Break-even ACoS (state revenue basis) | | | |
| Initial cash requirement | | | |
| Biggest risk | | | |
| Cheapest next step and its cost | | | |
