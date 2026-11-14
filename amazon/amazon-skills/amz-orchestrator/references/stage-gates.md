# Staged workflow and decision gates

The sequence exists to buy information cheaply before buying inventory expensively. Each stage
names what it costs; never let a candidate skip a stage because its score looks good.

| # | Stage | Skill | Must be known to enter | May stay uncertain | Money committed | Evidence that allows progression | Pause / reject triggers |
|---|---|---|---|---|---|---|---|
| 0 | Onboarding | amz-orchestrator | — | Anything the user cannot answer (use labelled assumptions) | £0 | `profile.md` with capital, contingency, tax status, constraints, profit floors | No capital figure and no agreed assumption → pause |
| 1 | Discovery | amz-discovery | Profile constraints | Sales volumes, exact costs | £0 | 5–15 candidates each with an observed customer problem and demand signal | Nothing meets profile constraints → widen brief, do not lower standards |
| 2 | Initial screening | amz-discovery + scorecard | Candidate list | Supplier price (range is fine) | £0 | Scorecard run; no fatal gate; rough economics range plausibly clears profit floor | Fatal gate; price band cannot cover fees + plausible landed cost |
| 3 | Demand & competition validation | amz-validation | Shortlist of 3–5 | Exact conversion, exact CPC | £0–tool subscription | Defined market, competitor set, entry-difficulty verdict with numbers, a concrete differentiation | Top listings unassailable for this budget; demand is a spike; no differentiation the customer would pay for |
| 4 | Supplier quotations & samples | amz-sourcing | Product specification | Final unit price (negotiable) | Samples + courier (typically tens to low hundreds of £) | ≥3 comparable written quotations; sample meets approval criteria | Only one viable source; quotes not comparable; sample fails a critical criterion; IP/counterfeit warning signs |
| 5 | Compliance verification | amz-compliance | Spec, materials, intended user, target markets | Minor labelling wording | Possibly lab testing / professional fees | Applicable regimes identified from official sources; documents verified with issuer; open items owned | Any unresolved safety, legal, IP or Amazon-restriction issue → hard pause regardless of score |
| 6 | Financial validation | amz-economics | Written quote, verified fee and duty rates, freight quote | Advertising efficiency (scenario it) | £0 | Conservative scenario clears the user's profit floor; cash requirement ≤ capital minus contingency | Conservative scenario loses money; break-even ACoS implausibly low for the category; cash need exceeds capital |
| 7 | Test-order decision | amz-orchestrator | Stages 3–6 all passed | Long-run demand level | Limited test order (largest commitment so far) | Decision report signed off by the user; payment terms and inspection agreed | Any gate reopened; user's circumstances changed |
| 8 | Listing & launch | amz-listing, amz-pricing | Final product, packaging, verified claims | Which creative wins (test it) | Photography, launch promotions | Listing passes current Amazon policy check; price floor and promo limits set | Claim cannot be substantiated; launch price below floor with no stop condition |
| 9 | Advertising optimisation | amz-ads | Break-even ACoS, launch budget, stop-loss | Steady-state ACoS | Ad budget (capped) | Measured conversion and ACoS vs plan over a meaningful sample | Stop-loss hit; conversion far below plan → fix listing/price before more spend |
| 10 | Reorder & expansion | amz-inventory | Measured sales velocity and variability | Peak-season uplift | Reorder inventory; new-market setup | Measured contribution ≥ floor; reorder funded; local economics + obligations assessed per new marketplace | Contribution below floor; cash conversion cycle unfundable; EU market assessed only by analogy with UK |

## Classifications

Use exactly these six. Each must state the reason, remaining uncertainties and next required evidence.

| Classification | Meaning | Earliest stage |
|---|---|---|
| Reject | A fatal gate, the economics cannot work under any defensible scenario, or a scorecard result below the minimum score | any |
| Needs more evidence | Promising or unclear, but a consequential fact is missing or confidence is Low | any |
| Ready for samples | Passed validation (stage 3); the differentiation is defined well enough to write the specification (written at the start of stage 4) | after 3 |
| Ready for a limited test order | Samples approved, compliance clear, conservative economics clear the floor | after 6 |
| Ready for launch planning | Test order placed or stock inbound | after 7 |
| Ready for scaling | Measured results meet plan over a meaningful sample; reorder funded | after 9 |

## Hard gates (override any score)

Open → pause. Confirmed → reject. A high scorecard result never outranks these.
Pause means no money is committed and the classification stays at "Needs more evidence"; free work
that resolves the gate, or that does not depend on it, carries on. File each gate under the nearest
heading below — a chemical restriction, for example, is Legal.

- **Safety**: foreseeable injury risk, hazardous materials, or mandatory testing not yet evidenced.
- **Legal**: applicable regulation unidentified, no responsible/authorised person where one is required, restricted on Amazon.
- **IP**: plausible conflict with a registered trade mark, registered design or patent; any sign of counterfeit or branded-lookalike goods.
- **Trade**: anti-dumping or other additional duty on the commodity code and origin not yet priced in.
- **Commercially fatal**: conservative scenario below the profit floor; cash requirement above available capital; single-supplier dependence with no alternative for a long-lead product.
