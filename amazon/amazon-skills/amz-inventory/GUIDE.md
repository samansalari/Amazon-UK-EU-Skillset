---
name: amz-inventory
description: Skill I - inventory, reordering and expansion planning for an Amazon UK/EU business importing from China. Use when the user asks how many units to order, about a first or test order size, MOQ versus demand, when to reorder, safety stock, reorder point, stockouts, overstock, aged or slow-moving inventory, storage fees, working capital for the next order, whether to add a variation, bundle or second product, or whether and when to expand to Germany, France or another European marketplace. Uses measured sales where they exist, plans for lead-time uncertainty, and will not recommend European expansion until that country's own economics and obligations have been assessed.
---

# I — Inventory, reordering and expansion

Standards: `../amz-orchestrator/references/standards.md`. Stages 7 and 10. With an ~8–12 week
supply chain, inventory decisions are forecasts made months ahead with little data — so the plan
is built around how wrong the forecast can be, not around a single number.

## 1. Purpose and triggers
Size the first order, set reorder rules, protect cash, and decide when growth (variations,
complements, new countries) has earned its capital.

## 2. Inputs
Required: `inputs.json` and outputs from amz-economics; supplier MOQ, quantity breaks, production
and transit lead times; deployable capital. After launch: daily sales history, stock on hand and
inbound (Seller Central inventory and Business Reports — `USER`). Optional: Keepa/Trends
seasonality, promotion calendar from amz-pricing, planned ad changes from amz-ads.

## 3. Tools and data access
`scripts/reorder.py` (safety stock, reorder point, order quantity) and
`../amz-economics/scripts/unit_economics.py` (cash, reorder funding). Current Amazon rules on
capacity limits, storage and aged-inventory fees, low-inventory fees and removals — verify in
Seller Central; they change the cost of both too much and too little stock.

## 4. Workflow
1. **First (test) order size.** Before launch the sales rate is `ASSUMED`. Bound the quantity
   three ways and take the smallest that still makes sense:
   - *Capital*: landed cost + launch costs ≤ deployable capital, with the reserve untouched.
   - *Learning*: enough units to measure conversion and return rate with a meaningful sample and
     survive the launch period at the conservative sales rate — not enough to "be safe".
   - *Supplier*: MOQ and price breaks. Price the break honestly: extra units × landed cost is
     cash at risk if the product fails; compare it with the per-unit saving.
   If MOQ exceeds what capital and learning justify, negotiate a trial quantity, pay a higher unit
   price for fewer units, or pause. A cheaper unit price on stock that does not sell is not a saving.
2. **Demand uncertainty.** Work with a low / expected / high daily rate, each labelled. After
   launch, replace with measured mean and standard deviation of daily sales (exclude stockout days
   and note promotion days).
3. **Lead time.** Production + inspection + booking + transit + customs + delivery + Amazon
   check-in. Use the supplier's figure as `SUPPLIER` and add observed variability; Chinese New Year
   and peak-season congestion lengthen it predictably.
4. **Reorder point and safety stock.** Run `scripts/reorder.py` with measured (or labelled)
   inputs. Choose the service level with the user: higher protects rank and sales, and ties up cash.
5. **Stockout versus overstock.** Put both costs in pounds: stockout = lost contribution per day ×
   days, plus recovery effort (rank, ad restart); overstock = cash tied up, storage and aged
   surcharges, markdown risk. Which is worse depends on margin, cash position and seasonality.
6. **Working capital.** From the calculator: reorder deposit date, cash returned by then, funding
   gap, cash conversion cycle. If the gap cannot be funded, the options are a smaller first order,
   slower sales (price up, ads down), better payment terms, or external finance — choose
   deliberately rather than discovering it at reorder time.
7. **Slow-moving stock.** Triggers: cover far above plan, or units approaching an aged-inventory
   threshold. Actions in order of cost: fix listing/ads → time-boxed price action (with
   amz-pricing) → bundle or multi-channel → removal or liquidation. Compare each against the cost
   of continuing to hold.
8. **Product improvement priorities.** From returns reasons, 1–3★ reviews and customer messages:
   rank by frequency × effect on returns or conversion × cost to fix; feed the next production
   run's specification (amz-sourcing).
9. **Adding variations or complements.** Conditions: the first product's measured contribution ≥
   floor; its reorder is funded; there is evidence for the new item (search terms, customer
   requests, frequently-bought-together) rather than a hunch; it shares supplier or logistics.
   Each new item goes through the workflow from validation — it is a new bet.
10. **Entering a European marketplace.** One country at a time. Required before recommending it:
    that country's own demand and competitor evidence (amz-validation on that marketplace); its
    own inputs file and passing conservative scenario (amz-economics: local price, fees, VAT,
    duty, freight, returns); obligations identified (amz-compliance: VAT registration, responsible
    person, EPR, labelling language); a localised listing (amz-listing); a fulfilment route with
    its costs; and UK results that show the product itself works. UK success is a reason to
    investigate, not evidence about another country.

## 5. Evidence standards
Sales rates are `USER` when measured (state the date range and exclusions) and `ASSUMED`
otherwise. Lead times are `SUPPLIER` until one cycle has been observed.

## 6. Evaluation framework
Formulas used by `reorder.py`: safety stock = z × √(L·σ_d² + d²·σ_L²); reorder point = d·L +
safety stock; order quantity = d × (L + cover days) + safety stock − (on hand + inbound). Recheck
weekly after launch; recompute when sales rate, price, ad spend or lead time changes.

## 7. Output template
```markdown
# Inventory plan — <product> — <date>
Sales rate: low / expected / high (label, date range)   Lead time: ... days ± ...
First order: ... units — bounded by capital £..., learning ..., MOQ ...; cash committed £...
Reorder point: ... units   Safety stock: ...   Service level: ...%   Next review: ...
Stockout cost vs overstock cost: ...
Working capital: deposit due day ..., funding gap £..., cash conversion cycle ... days
Slow-stock triggers and actions: ...
Improvement backlog: ...
Expansion readiness: | Option | Conditions met? | Evidence | Missing |
Confidence: <rating, why>
```

## 8. Missing data
No sales history: every quantity is a scenario; present the low case first. Fewer than ~4 weeks of
sales: say the standard deviation is unreliable and use a wider safety margin.

## 9. Stop conditions
Stop before recommending any order whose cash commitment exceeds deployable capital or whose
candidate has an open gate. Do not recommend a European marketplace by analogy with the UK. Do not
recommend scaling stock while contribution after ads is below the floor.

## 10. Example
"I sell about 9 a day (it varies, 4–15), have 420 in stock and nothing inbound; production is 30
days and sea freight to FBA about 45. When do I reorder, how many, and can I afford it?"

## 11. Hand-off → orchestrator, amz-sourcing, amz-economics
Order quantity and date, cash required and date, revised sales-rate assumptions, specification
changes for the next run, and — for expansion — which country to assess first and what evidence
is missing. Append the hand-off block.
