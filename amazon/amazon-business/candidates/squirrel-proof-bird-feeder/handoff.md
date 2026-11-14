# Squirrel-proof bird feeder (locking lid) — hand-offs

Raw observations: `../../discovery-2026-11-14.md` (search "squirrel proof bird feeder", product page
B08T5M7KLN, Trends). Ceiling inputs: `inputs.json`. Scorecard: `../../scorecard.json`.

## amz-discovery — 2026-11-14
Status: Needs more evidence
Confidence: Low — scorecard evidence confidence 47%; prices, reviews, fees and duty are observed, but demand size, peak months and every cost of goods are unknown.
Key findings:
- Customer problem: lid "doesn't lock properly", "squirrels have no problem getting it off" [OBS B08T5M7KLN "Customers say", amazon.co.uk 2026-11-14].
- Page one, 24 slots, 20 distinct listings [OBS 2026-11-14]: price £11–£49, three listings at £25.99; 8 of 20 under 150 reviews, 4 of those showing 100+ to 900+ bought; none above 5K reviews; 12 of 24 slots sponsored.
- Demand shape: repeating yearly cycle over 5 years, largest of the five terms compared [OBS Google Trends UK, low-resolution chart].
- Cost ceiling [MODEL, unit_economics.py --ceiling on inputs.json]: max landed £9.11 (base, £25.99, 15% margin) and £6.47 (conservative, £22.99, 10%); max goods plus freight £7.44 and £5.29. Size, weight, ads and returns are ASSUMED.
- Duty 2.00%, import VAT 20% [OBS trade tariff 7326 90 98 90, origin CN]; the code is ASSUMED.
- Opportunity score 64.2 [MODEL scorecard.py]; script verdict PAUSE.
Open gates: IP (blocking) — registered designs and patents on squirrel-proof mechanisms not yet searched. The claim "squirrel proof" must be substantiated before it is used in a listing.
Remaining uncertainties: sales volume and search volume (UNKNOWN — history tool); peak months (UNKNOWN); price stability over 12 months (UNKNOWN); packaged size and weight (no specification); factory price (no quotation).
Selling window: demand runs on a yearly cycle, months UNKNOWN | on sale by end of August 2027 [MODEL], to have reviews before the autumn–winter peak | order by 11 May–8 June 2027 [MODEL from an ASSUMED 12–16 week lead time] | if missed: the listing meets the peak with no reviews; next window autumn 2028.
Next skill: amz-compliance (IP search only, free) then amz-validation — needs: the IP search result; a history-tool export for B08T5M7KLN, B0FG7VQH99, B00BXLF3WU and B000M00Q84; first-available dates and listing quality for the competitor set.
