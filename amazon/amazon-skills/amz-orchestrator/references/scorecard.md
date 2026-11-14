# Opportunity scorecard

Run with `scripts/scorecard.py <file.json>` (template: `assets/scorecard.example.json`).
The script outputs three separate things on purpose: an **opportunity score** (how attractive, if
the evidence is right), an **evidence confidence** (how far to trust that score), and **open gates**.
They are never blended into one number, so a high score on weak evidence cannot pass for a
well-supported one.

## Criteria, weights and anchors

Score each 0–5 (5 is always the favourable end) and attach an evidence grade H / M / L per
`standards.md` section 5. Weights sum to 100 and are editable in the JSON `weights` block.

| Criterion | Weight | Why this weight | 0–1 | 2–3 | 4–5 |
|---|---|---|---|---|---|
| `unit_economics` | 20 | Nothing else matters if a unit does not make money after all costs | Conservative scenario below profit floor | Base clears floor, conservative marginal | Conservative clears floor with room for ad learning |
| `demand_quality` | 18 | Stable, purchase-intent demand is what makes the result repeatable | Spike, fad or no observable purchase intent | Real but seasonal or modest | Steady, multi-year, several purchase-intent searches |
| `competition_entry` | 15 | Decides whether a new listing can be seen at all | Page one locked by entrenched brands / Amazon retail | Mixed: some weak listings among strong ones | Several beatable page-one listings, fragmented share |
| `differentiation` | 12 | Without a reason to choose you, the only lever is price | Commodity; no complaint worth fixing | One credible improvement | Recurring complaint you can fix, visible in images |
| `capital_requirements` | 8 | Must fit capital with contingency intact | First order + launch exceeds available capital | Fits, leaves little reserve | Fits with reserve and funds a reorder |
| `sourcing_reliability` | 8 | A good product from one fragile source is a fragile business | One unverified source | 2 comparable sources | ≥3 comparable quotes, verified manufacturer, sample approved |
| `growth_potential` | 7 | Variations, bundles, complements, EU fit | One-off product | Some variations | Clear range and at least one evidenced second market |
| `compliance_burden` | 7 | Cost and delay of doing it properly (gates handle the fatal cases) | Heavy regime, testing, responsible person | Moderate documentation | General product safety only |
| `operational_complexity` | 5 | Handling pain that is not already in the fee model | Fragile, many parts, high support load | Some care needed | Small, robust, simple |

## Avoiding double-counting

Each fact scores under one criterion only:

- Size and weight → `unit_economics` (through fulfilment fees and freight). Fragility and assembly → `operational_complexity`.
- Price-war risk and discounting → `competition_entry`. Its effect on margin is already in the conservative scenario of `unit_economics`; do not penalise both beyond that.
- Review counts of rivals → `competition_entry`. Review *complaints* → `differentiation`.
- Testing and certification cost → the cost goes in `unit_economics` / `capital_requirements`; the effort and delay go in `compliance_burden`.
- MOQ → `capital_requirements`, not `sourcing_reliability`.
- Seasonality → `demand_quality`. Its stock risk → handled in amz-inventory, not scored again.

## Reading the output

| Script verdict | Condition | Map to classification |
|---|---|---|
| REJECT | Confirmed fatal gate, or score < 50 | Reject |
| PAUSE | Unresolved blocking gate | Needs more evidence (state the gate) |
| NEEDS MORE EVIDENCE | Evidence confidence < 60% | Needs more evidence (state the cheapest check) |
| PROGRESS | None of the above | Whatever stage the candidate has actually passed in `stage-gates.md` |

The 50 and 60% cut-offs are working conventions, not laws; change them in the JSON (`min_score`,
`min_confidence`) if the user wants a stricter or looser screen, and say so in the report.
Use the score to rank candidates and focus effort. Never use it to skip a stage.

## Input fields and how confidence is computed

- Each score is `[0–5, "H" | "M" | "L"]`. The grade says how well that one score is evidenced, by the
  same test as `standards.md` section 5.
- Evidence confidence is the weighted average of the grades, with H = 1.0, M = 0.6, L = 0.3. Where a
  High / Medium / Low rating is needed (the hand-off block), 80% and above reads High, 60–79%
  Medium, below 60% Low.
- Each gate is `{"issue": "<heading>: <what is unresolved>", "severity": "blocking" | "fatal",
  "resolved": false}`, with the heading taken from the hard-gate list in `stage-gates.md`.
  `blocking` and unresolved is an open gate (PAUSE); `fatal` is a confirmed one (REJECT). To close
  a gate set `resolved` to true and note the evidence in the issue text.
- A criterion that cannot be assessed yet — unit economics before any quotation, sourcing before any
  supplier — is scored on the best available proxy (for unit economics, how reachable the cost
  ceiling looks) and graded L. Say so in `_note`.
