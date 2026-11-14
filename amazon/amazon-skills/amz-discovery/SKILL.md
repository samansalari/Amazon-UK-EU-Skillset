---
name: amz-discovery
description: Skill A - find and screen Amazon UK (and European) product opportunities from evidence of demand, customer needs and realistic entry potential. Use whenever the user asks for product ideas, niches, "what should I sell on Amazon", "find products to import from China", wants a shortlist, wants to screen an idea or ASIN quickly, or asks whether a category is worth entering - even if they just say "product research". Produces a ranked shortlist with explicit reasons to investigate or reject each candidate; never a list of "winning products".
---

# A — Product opportunity discovery and initial screening

Standards: read `../amz-orchestrator/references/standards.md` first. Profile: `amazon-business/profile.md`
must exist (if not, go to amz-orchestrator onboarding) — discovery without constraints produces
ideas the user cannot afford or sell.

## 1. Purpose and triggers
Stages 1–2: generate candidates from observed customer problems, then screen them cheaply.
"New products" means new, unused goods with a fresh market angle — not inventions.

## 2. Inputs
Required: profile (capital, price band, regulated-product appetite, size limits, categories).
Optional: seed categories or problems, tool exports (sales estimates, search volume, Keepa history).

## 3. Tools and data access
Live browsing of amazon.co.uk as a normal visitor (search results, Best Sellers, Movers & Shakers,
New Releases, listing pages, reviews); Google Trends with the region set to the target country;
any paid-tool exports the user provides. Without paid tools, sales and search volume are `UNKNOWN`.

## 4. Workflow
1. **Start from problems, not products.** Collect customer problems and purchase motivations from
   1–3★ and 4★ reviews, Q&A, forums and UK retail trends. Note the wording customers use.
2. **Expand search demand.** For each seed, read the marketplace's own search-box suggestions:
   bare seed, seed + each letter a–z, and prefixes such as "best", "for", "small", "kids".
   Sort suggestions into intent buckets:
   - *Purchase* — product type + attribute ("collapsible laundry basket with lid")
   - *Problem / use case* — ("drying rack for small flat")
   - *Informational* — ("how to...") low purchase intent; useful for content, weak for demand
   Suggestions show that people search, not how many: volume stays `UNKNOWN` without a tool export.
3. **Record page one** for the best purchase-intent search per candidate: for the first ~20 organic
   results note price, rating, review count, seller type (Amazon retail / brand / generic),
   sponsored share of the page, listing quality, and Amazon's "N+ bought in past month" badge where
   shown. The badge is `OBS`: a floor band for that one listing in that month — the best free
   demand signal, and proof of entry when a listing with few reviews carries it. It is not a market
   size. Put raw observations in the run's `discovery-<date>.md`, and say how many of the slots were
   recorded and how many distinct listings they hold.
4. **Check demand shape.** Google Trends (correct region, 5 years) and, if available, Keepa
   history: steady, seasonal, rising, or spike? A spike is not demand. A Best Sellers list is a
   snapshot of the current season: note the date and do not read a seasonal cluster as steady demand.
   Then state the **selling window** per `standards.md` section 8.
5. **Screen each candidate** on the table in section 6. Reject early and say why.
6. **Cost ceiling.** No quotation exists yet, so do not guess a factory price. Run
   `amz-economics/scripts/unit_economics.py --ceiling` with the observed price, verified fees and
   the profile's profit floor: it returns the most a unit may cost landed. The question at this
   stage is only "is that ceiling plausibly reachable for an item of this size and weight?"
7. **Early compliance and IP glance.** Anything electrical, battery, cosmetic, food-contact,
   children's, medical-adjacent, or resembling a branded/patented design → flag for amz-compliance
   before any further work.
8. **Extensions.** Note credible bundles, accessories, variations and complements — evidence that
   customers buy them together, not imagination.
9. **Europe.** Only where the same search on the specific marketplace (amazon.de, .fr, .it, .es,
   .nl...) shows its own demand and price evidence. Record per country; never infer from the UK.
10. Score with the orchestrator scorecard; write the shortlist.

## 5. Evidence standards
`standards.md`. Specific to discovery: "underserved" requires *both* observed demand signals *and*
observed weakness in current offers. Few sellers with few reviews and no search suggestions is a
market with little demand, not an opportunity.

## 6. Screening framework

| Dimension | Investigate when... | Reject or pause when... |
|---|---|---|
| Customer problem | A recurring, specific complaint or unmet use case appears across several listings | No identifiable reason to choose a new entrant |
| Demand stability | Multi-year steady or predictable seasonality | Single spike, fad, or dependent on one event |
| Search intent | Several distinct purchase-intent phrases | Only informational phrases, or one phrase dominated by a brand name |
| Concentration | Page one spread across several sellers, some with weak listings | Amazon retail or one or two brands hold most of page one |
| Reviews | Several page-one listings with modest review counts and ratings ≤ ~4.3 | Every page-one listing has very high counts and ≥ 4.6 |
| Price | Band wide enough to position; little permanent discounting | Race to the bottom; most offers on deep discount; band cannot cover fixed fees |
| Differentiation | A fix you could specify to a factory and show in an image | Only "better quality" with no concrete change |
| Operations | Small, robust, few parts | Fragile, oversize, complex sizing, high return categories |
| Extensions | Observed bundles / variations | One-off |

Thresholds here are judgement aids, not rules: state the actual numbers you observed so the user
can disagree with the call.

## 7. Output template
```markdown
# Discovery shortlist — amazon.co.uk — <date>
Data access this run: <browsing / tools / exports>
| Rank | Candidate | Customer problem (evidence) | Demand signal | Entry difficulty (numbers) | Price band | Cost ceiling | Selling window / order-by | Differentiation idea | Flags | Score / confidence | Verdict |
Per candidate: 3–6 lines of labelled evidence with URLs, reasons to investigate, reasons to reject,
what is UNKNOWN and what would supply it.
Rejected at screening: <candidate — one-line reason>
```

## 8. Missing data
No sales or search volume: say so, rank on observable signals, and mark `demand_quality` evidence
as L or M. Recommend the single cheapest data purchase (e.g. one month of one tool) only if it
would change the ranking.

## 9. Stop conditions and rejection criteria
Stop if the profile is missing. Reject: fatal gate (IP, restricted, unsafe), no demand evidence,
price band that cannot cover fees plus the low end of landed cost, or a regulated product outside
the user's appetite.

## 10. Example
"Screen 'under-sink organisers' and 'reusable lint rollers' for amazon.co.uk against my profile and
tell me which is worth validating."

## 11. Hand-off → amz-validation
Top 3–5 candidates with: primary search phrases, page-one observation table, complaint themes,
price band, flags, scorecard JSON, and the `UNKNOWN` list. Raw observations for the whole run go in
one `discovery-<date>.md` in the workspace. For each shortlisted candidate create
`candidates/<slug>/handoff.md` (slug rule in the orchestrator), append the hand-off block there and
point it at the run file; save the `--ceiling` inputs as `candidates/<slug>/inputs.json`. Every
live candidate in `shortlist.md` gets a next step and its cost, even if that step is "wait".
