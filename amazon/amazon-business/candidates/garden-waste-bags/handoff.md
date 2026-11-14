# Heavy-duty garden waste bags (3-pack) — hand-offs

Raw observations: `../../discovery-2026-11-14.md` (search "garden waste bags", product page
B0BDR317W8, Trends). Ceiling inputs: `inputs.json`. Scorecard: `../../scorecard.json`.

## amz-discovery — 2026-11-14
Status: Needs more evidence
Confidence: Low — scorecard evidence confidence 47%; prices, reviews, fees and duty are observed, but demand size, season months and every cost of goods are unknown.
Key findings:
- Customer problem: durability mixed — "others report that they fell apart during use" [OBS B0BDR317W8 "Customers say", amazon.co.uk 2026-11-14]. The leader states 140 g/m² woven fabric.
- Page one, 17 distinct listings recorded [OBS 2026-11-14]: price £8–£23; leader 3.9K reviews with 3K+ bought in November; 12 of 17 at 200+ bought; 8 of 17 under 200 reviews, 6 of those showing 50+ to 600+.
- Demand shape: small search interest peaking in the growing season [OBS Google Trends UK, low-resolution chart]; still selling in November [OBS].
- Cost ceiling [MODEL, unit_economics.py --ceiling on inputs.json]: max landed £5.01 (base, £17.99, 15% margin) and £2.92 (conservative, £14.99, 10%); max goods plus freight £3.94 and £2.30. Both prices are ASSUMED planning prices inside the observed 3-pack band (£14.99–£19.99); size, weight, ads and returns are ASSUMED.
- Duty 6.00%, import VAT 20% [OBS trade tariff 6305 33 90 00, origin CN]; the code is ASSUMED.
- Opportunity score 62.8 [MODEL scorecard.py]; script verdict NEEDS MORE EVIDENCE.
Open gates: none.
Remaining uncertainties: sales volume and search volume (UNKNOWN — history tool); season months (UNKNOWN); price stability and price-war risk over 12 months (UNKNOWN); packaged size and weight (no specification); factory price (no quotation).
Selling window: demand runs through the growing season, months UNKNOWN | on sale by mid-March 2027 for the full season [MODEL] | order by 23 November–21 December 2026 [MODEL from an ASSUMED 12–16 week lead time] — not reachable with validation, quotes and samples still to do | if missed: stock landing about May 2027 still has most of the season; missing that, spring 2028.
Next skill: amz-validation — needs: a history-tool export for B0BDR317W8, B0FVLHSZ1G and B09XR5TXJN; first-available dates and listing quality for the competitor set; then amz-sourcing for three written quotations to test against the ceiling.
