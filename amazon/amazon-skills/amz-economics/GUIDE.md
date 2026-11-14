---
name: amz-economics
description: Skill D - landed cost and unit economics for importing from China and selling on Amazon UK (and, separately, each EU marketplace). Use for ANY money question about an Amazon product - "is this profitable", "what's my margin", landed cost, FBA fees, FBA vs FBM, import duty, import VAT, break-even price, break-even ACoS, ROI, "how much cash do I need", reorder funding, cash-flow, or sensitivity to price, exchange rate, freight, ads or returns. Runs the bundled calculator with sourced inputs and conservative/base/optimistic scenarios; never estimates fees or tax from memory.
---

# D — Landed cost and unit economics

Standards: `../amz-orchestrator/references/standards.md`. Stage 6 (and a rough-range pass at stage 2).
The model is `scripts/unit_economics.py`; this skill is about feeding it honest inputs and reading
it correctly. Do the arithmetic with the script, not in your head.

## 1. Purpose and triggers
Tell the user what one unit really earns after every cost, what cash the plan needs, and how
fragile both numbers are.

## 2. Inputs
Required: written supplier quote (or a labelled range at stage 2), measured packaged dimensions and
weight, observed selling-price band, the user's VAT status and profit floor. Optional: freight
quote, user's Seller Central fee preview, measured return rate and ad data.

## 3. Tools and data access
Python 3. Live sources to verify **today's** values — fees and tax rules change, and a model built
on last year's rate card is wrong in a way nobody notices:

| Input | Where to verify | Notes |
|---|---|---|
| Referral fee % and any per-item minimum | Seller Central UK fee schedule for the exact category | Confirm the basis: normally the total price the customer pays, VAT included |
| FBA fulfilment fee | Current UK FBA rate card, by size tier and weight | Sort the packaged dimensions longest→shortest before tiering; check whether dimensional weight applies; a few millimetres can change the tier |
| Storage and aged-inventory fees | Current UK rate card | Per-unit monthly = volume × rate; seasonal rates differ |
| Other per-unit fees | Seller Central | Check which currently apply: fuel and logistics surcharge (a % on fulfilment fees), festive peak fee, inbound placement, low-inventory-level, returns processing, labelling, digital services fee, refund administration |
| VAT on Amazon's own fees and ads | First Amazon fee invoice; Seller Central tax settings | Amazon adds UK VAT to fees for UK-established sellers; a seller who is not VAT-registered cannot reclaim it (the script handles this when `vat_registered` is false) |
| Duty and any additional duty | gov.uk UK Integrated Online Tariff, exact 10-digit commodity code, origin China | Look for anti-dumping / countervailing measures; a wrong code changes the answer |
| VAT | HMRC guidance; the user's accountant for their position | Import VAT, postponed VAT accounting, VAT on Amazon fees |
| FX | Mid-market rate on the day, plus the provider's margin | Record date |
| Freight | A forwarder's written quote for the actual carton data | State Incoterm and what is included |

If a rate cannot be verified now, stop and say which one — do not substitute a remembered figure.

## 4. Workflow
1. Copy `assets/inputs.example.json` to `candidates/<slug>/inputs.json`. Replace every value;
   fill `sources` with label, source and date for each (the script warns about unsourced fields).
2. Set VAT status from the profile. If it is unknown, or the seller is below the registration
   threshold and expects to cross it, also run `--vat-compare`: it shows contribution per unit
   under both positions and how many units a year reach the threshold. Report both; whether and
   when to register is the accountant's call.
3. Build three scenarios in the `scenarios` block. Conservative is not "base minus a bit": use the
   realistic discounted price, the higher freight quote, a weaker exchange rate, higher returns,
   worse ad efficiency and slower sales together.
4. Run `python3 scripts/unit_economics.py inputs.json`. Paste the tables into the report.
5. Read the sensitivity table: name the one or two inputs that flip the result, and whether each is
   `OBS`, `SUPPLIER` or `ASSUMED`.
6. Compare with the profit floor and deployable capital from the profile. Classify.
7. FBA vs FBM: run twice, changing `fulfilment_fee_gbp` (own pick, pack, postage, packaging) and
   storage; note the non-financial differences separately.
8. Europe: one inputs file per marketplace with that country's price, fees, VAT rate, duty and
   freight. Never reuse the UK file with a currency conversion.

## 5. Evidence standards
Every input labelled. Outputs are `MODEL`. An output built on an `ASSUMED` sales rate, return rate
or TACoS must say so next to the number.

## 6. Definitions (state these whenever the numbers are shown)
- **Unit of analysis**: one shipped unit; returns are netted inside it.
- **Landed cost per sellable unit**: (goods incl. FX margin + freight and insurance + duty +
  clearance + UK transport + inspection + prep + irrecoverable import VAT + contingency) ÷ units
  that arrive sellable.
- **Net sales revenue**: VAT-registered → price paid ÷ (1 + VAT rate), because the VAT belongs to
  HMRC. Not registered → the full price paid, but import VAT and VAT on Amazon fees and ads become
  real costs. Promotions reduce the price paid; they are not also listed as a cost.
- **Import VAT**: recoverable for a registered business, so not a cost — at most a temporary cash
  outflow (none under postponed VAT accounting). Duty is always a cost.
- **Contribution before / after advertising**: net revenue − referral − fulfilment, storage and
  other Amazon fees − promo fees − landed cost consumed − returns handling; then − advertising.
- **Contribution margin**: contribution after ads ÷ net revenue. This is margin. Mark-up (profit ÷
  cost) is a different, larger number; never interchange them.
- **Operating profit**: contribution after ads − allocated overheads (monthly overheads ÷ assumed
  monthly units).
- **Break-even selling price**: VAT-inclusive list price where contribution after ads = 0, holding
  TACoS as a percentage.
- **Break-even advertising cost per order**: contribution before ads (ex VAT).
- **Break-even ACoS**: contribution before ads ÷ ad-attributed sales. Reported on both bases — sales
  measured VAT-inclusive and ex VAT — because the answer differs by the VAT rate. Check which basis
  the user's ad console reports and use that one.
- **Inventory ROI**: contribution after ads from the whole batch ÷ landed cost of the batch, per
  inventory cycle (order placed → sold out). The annualised figure is simple, not compounded.
- **Initial cash requirement**: landed cost of the first order + temporary import VAT (if not
  postponed) + one-off costs + launch ad budget + cash reserve. Cash, not profit.
- **Reorder funding and cash conversion cycle**: when the reorder deposit falls due, how much cash
  the first batch has returned by then, and the weighted days from paying the supplier to being
  paid by Amazon.

## 7. Output template
```markdown
# Unit economics — <candidate> — amazon.co.uk — <date>
VAT status: ...   Profit floor: ...   Deployable capital: ...
Inputs and sources: | Input | Value | Label | Source | Date |
<scenario table from the script>
<cost build-up, landed-cost breakdown, sensitivity table from the script>
What flips the result: ...
Against the floor: conservative <pass/fail>, base <pass/fail>
Cash: initial £..., reorder gap £..., vs deployable £...
Verdict: <classification> — Confidence: <rating, why>
```

## 8. Missing data
Stage 2, before any quotation exists: do not guess a factory price. Fill the selling side (observed
price, verified referral and fulfilment fees, VAT status, `target_margin` per scenario from the
profile's profit floor) and run `python3 scripts/unit_economics.py inputs.json --ceiling`. It
needs only the selling side and returns three ceilings: landed cost per sellable unit; goods plus
freight per unit before duty and import VAT; and — only when order size, freight and FX are filled
in — the supplier unit price. Report them as `MODEL`, described as screening ceilings: the test a
written quote must pass, not a profit forecast. A negative ceiling is a rejection. A planning price
chosen inside an observed band is `ASSUMED`, not `OBS`; say which listings bound the band.
Stage 6: any unsourced fee, duty rate or quote keeps the candidate at "Needs more evidence".
A quotation given verbally or in a chat is `SUPPLIER` and may be run through the full report as a
screening model, said to be one; a stage-6 pass needs written quotations. With no measured sales,
give `monthly_units` three `ASSUMED` rates across the scenarios and say that profit per unit does
not depend on them — only overheads, cash and reorder timing do. If the profile states the profit
floor only as a percentage, leave `min_profit_per_unit_gbp` at 0, set `target_margin`, and ignore
the "price that meets profit floor" row. Costs the quote leaves out (inspection, UK delivery to
the fulfilment centre, payment and FX charges) are entered as 0 only with a note that they are
missing, never silently.

## 9. Stop conditions and rejection criteria
Stop if fees or duty cannot be verified today — unless the workspace already holds them with a
source and a date within about 30 days, in which case reuse them for screening, quote that date,
and re-verify before any step that commits money. Reject when the conservative scenario is below the
profit floor with no credible lever, break-even ACoS is too low to survive ad learning, or the
initial cash requirement exceeds deployable capital. Pause when the answer hinges on one
`ASSUMED` input: name the cheapest way to measure it.

## 10. Example
"Supplier quotes $3.80 FOB Ningbo at 1,000 units, packaged size 24×16×9 cm, 420 g. I'd sell at
about £22.99 and I'm VAT-registered. What do I actually make per unit and how much cash do I need?"

## 11. Hand-off → amz-pricing, amz-ads, amz-inventory, orchestrator
`inputs.json` path; landed cost per sellable unit; contribution before/after ads by scenario;
break-even price; price meeting the profit floor; break-even ACoS on the console's basis; initial
cash; reorder timing; the inputs still `ASSUMED`. Append the hand-off block.
