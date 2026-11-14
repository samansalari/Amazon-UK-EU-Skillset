# Discovery shortlist — amazon.co.uk — 2026-11-14

Stage reached: 2 (initial screening). Money committed so far: £0.
Profile: [profile.md](profile.md). Raw evidence, fees, duty and the ceiling model:
[discovery-2026-11-14.md](discovery-2026-11-14.md). Scorecard input: [scorecard.json](scorecard.json).
Hand-offs and ceiling inputs for the two candidates going forward:
[bird feeder](candidates/squirrel-proof-bird-feeder/handoff.md),
[garden waste bags](candidates/garden-waste-bags/handoff.md).

Data access this run: live browsing only. No sales-volume or search-volume tool, no supplier quote.
Scope: 6 Best Sellers lists and page one of 9 searches — a first pass, weighted towards garden and
winter items because of the date. It is not a survey of the whole marketplace.

Overall confidence: **Low** (42–47% on the scorecard; below 60% reads Low). Prices, reviews, fees and duty are observed; demand
size, seasonality by month and every cost of goods are still unknown. Nothing here is ready for a
purchase decision.

## Ranked candidates

Counts, prices, ratings and "bought" badges in this table are [OBS amazon.co.uk 2026-11-14]; scores
and confidence are [MODEL scorecard.py]. All five are at stage 2.

| Rank | Candidate | Customer problem (evidence) | Demand signal | Entry difficulty (numbers) | Price band | Differentiation idea | Flags | Score / confidence | Classification |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Squirrel-proof bird feeder with a locking lid | Lid "doesn't lock properly", "squirrels have no problem getting it off" [OBS B08T5M7KLN] | 5-year repeating yearly cycle, largest of the terms compared [OBS Trends UK]; 100+ to 1K+ bought on 14 of 20 listings [OBS] | 8 of 20 listings under 150 reviews, 4 of those selling 100+ to 900+; none above 5K reviews; 12 of 24 slots sponsored | £11–£49, cluster £25.99 | Positive-locking lid and chew-proof metal ports, shown in an image | IP gate open; "squirrel proof" is a claim that must be substantiated | 64.2 / 47% | Needs more evidence (gate: IP) |
| 2 | Heavy-duty garden waste bags, 3-pack | "Fell apart during use" — durability mixed [OBS B0BDR317W8] | Leader shows 3K+ bought in November; 12 of 17 listings at 200+ [OBS] | Leader 3.9K reviews; 8 of 17 listings under 200 reviews, 6 of them showing 50+ to 600+ | £8–£23 | Heavier fabric than the leader's stated 140 g/m², stitched-through handles, stays open while filling | Commodity: price pressure likely | 62.8 / 47% | Needs more evidence |
| 3 | Garden plant supports, half-round 10-pack | "Flimsy and need to be taller"; fiddly leg tape [OBS B09C5N8FBL] | Weak in November (50+ to 600+); seasonal [OBS] | Fragmented: no listing above 3.2K reviews, ratings 3.7–4.7 | £6–£22 | Thicker wire, taller size, no-tape joint | Demand in season unknown; long thin parts | 60.2 / 42% | Needs more evidence |
| 4 | Reusable car dehumidifier bags | Indicator "doesn't change as expected"; saturates fast [OBS B0BXLW3NZY] | Strongest badges seen: 500+ to 4K+ on 16 of 22 slots [OBS]; one sharp winter peak a year [OBS Trends] | Pingi 11K–22K reviews, but listings with 37–339 reviews show 500+ to 2K+ | £8.49–£19.99 | Reliable indicator, larger capacity | Legal gate open (chemical: indicator dye); heavy for its price | 53.6 / 47% | Needs more evidence (gate: Legal) — economics likely fatal at £9.99–£11.99 |
| 5 | Garden kneeler and seat | None recurring [OBS B0D35FV75J] | Out of season; badges mostly absent | Many listings under 200 reviews | £15–£60 | Not evidenced | Safety gate open; oversize fee | 42.4 / 42% | Reject |

Rejected at screening:
- Garden furniture covers — Enzeno holds 7 of 26 slots with up to 12.3K reviews; "13 sizes" means many SKUs and capital spread thin.
- Slow feeder dog bowls — Outward Hound 131.6K reviews in 4 slots; price £8–£14.
- Under-sink organisers — best seller is a 2-pack at £13.64; DEKAVA 11.3K and Delamu 9.5K reviews; none of the five newest listings shows a bought badge.
- Wall-mounted hose holders — £5–£16 for heavy steel; Gardena and Amazon Basics present; badges 50+ to 100+ only.
- Outside tap covers — £4.99–£7.99; fixed fees leave too little, and the season is already running.
- Emergency-preparation items (stoves, canisters, water tablets) — cluster looks event-driven; a spike is not demand. Gas and fuel items are also dangerous goods.

## What the prices can afford [MODEL — full table in the evidence file]

Not VAT-registered, so the whole customer price is revenue, but duty, import VAT and the VAT on
Amazon's fees are costs. "Max goods+freight" is the most the factory price plus freight can be per
unit while still leaving the target net margin.

| Candidate | Base: price → max goods+freight (15% margin) | Conservative: price → max goods+freight (10% margin) | Computed by |
|---|---|---|---|
| Bird feeder | £25.99 → £7.44 | £22.99 → £5.29 | `unit_economics.py --ceiling` on `candidates/squirrel-proof-bird-feeder/inputs.json` |
| Waste bags 3×500L | £17.99 → £3.94 | £14.99 → £2.30 | `unit_economics.py --ceiling` on `candidates/garden-waste-bags/inputs.json` |
| Plant supports 10-pack | £15.99 → £3.10 | £13.99 → £1.77 | by hand, before the ceiling mode existed; rerun if revived |
| Car dehumidifier 2-pack | £11.99 → £1.65 | £9.99 → £0.48 | by hand; rerun if revived |
| Garden kneeler | £22.99 → £3.99 | £18.99 → £1.67 | by hand; candidate rejected |

Supplier prices are UNKNOWN. These ceilings are the test a written quotation has to pass.
Margin is contribution after ads ÷ net revenue. Base prices of £25.99, £15.99 and £11.99 are [OBS]
on recorded listings; £22.99, £17.99, £14.99 (bags), £13.99, £9.99 and both kneeler prices are
[ASSUMED] planning prices inside the observed bands. Ads at 12% / 18% of sales, returns 3–6% and
product size and weight are [ASSUMED]. The hand rows treat returns more harshly than the script,
so they run slightly lower than a rerun would.

## Selling windows

Lead time from a confirmed order to stock on sale: about 12–16 weeks by sea [ASSUMED: 4–6 weeks
production, 6–8 weeks freight and customs, 1–2 weeks FBA check-in — replace with the supplier's and
forwarder's figures]. Chinese New Year falls on 6 February 2027 [ASSUMED — confirm
with the supplier]; factories typically stop for two to four weeks around it. An order that is not
shipped before late January is unlikely to be on sale before May 2027.

On-sale-by and order-by dates are [MODEL]: on-sale-by less the assumed 12–16 weeks.

| Candidate | Demand runs | On sale by | Order by | If missed |
|---|---|---|---|---|
| Garden waste bags | Growing season; still selling in November [OBS] — months UNKNOWN | Mid-March 2027 for the full season | 23 Nov–21 Dec 2026 — not reachable with validation, quotes and samples still to do | A validated first order lands about May 2027 with most of the season ahead; after that, spring 2028 |
| Plant supports | Growing season — months UNKNOWN | Mid-March 2027 | 23 Nov–21 Dec 2026 — not reachable | About May 2027 is late for this product; treat it as a 2028 decision |
| Bird feeder | Yearly cycle [OBS]; peak months UNKNOWN | End of August 2027, so the listing has reviews before the autumn–winter peak | 11 May–8 Jun 2027 | Listing meets the peak with no reviews; next window autumn 2028 |
| Car dehumidifier bags | Winter only [OBS] | End of September 2027 | 10 Jun–8 Jul 2027 | Too late for this winter already; after that, October 2028 |

## Open gates and unknowns

- IP (bird feeder, blocking): search UK registered designs and patents before any sample order.
- Demand size: UNKNOWN for all. A history tool (Keepa or Helium 10) on the reference ASINs gives 12 months of price and rank history and a sales estimate [EST].
- Cost of goods: UNKNOWN for all. Needs three written quotations per candidate.
- Commodity codes are indicative; referral-fee column and "Home Products" eligibility to confirm in Seller Central.
- Profile: contingency amount, EORI, and whether the 10–15% floor is net margin on price.

## Next step (cheapest useful)

1. Free — IP search for the bird feeder; this decides whether candidate 1 stays on the list.
2. One month of a history tool — check 12-month demand and price stability for candidates 1 and 2.
3. Free — send the supplier enquiry (amz-sourcing template) for candidates 1 and 2 and compare
   written quotes against the ceilings above.

Per candidate:

| Candidate | Next step | Cost |
|---|---|---|
| Bird feeder | IP search (amz-compliance), then validation | Free; then one month of a history tool — price UNKNOWN, check on the day |
| Garden waste bags | Validation, then three written quotations | One month of a history tool (shared with the feeder); enquiry is free |
| Plant supports | Wait. Revisit in February 2027 with in-season demand visible, as a 2028 product | Free |
| Car dehumidifier bags | Wait. Only worth reopening if a larger pack at £17–£20 is evidenced; resolve the Legal gate first | Free |
| Garden kneeler | None — rejected | — |

The standard hand-off blocks are in each candidate's `handoff.md`.
