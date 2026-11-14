---
name: amz-orchestrator
description: Master workflow for launching and growing an Amazon UK (and selected European) private-label business sourced from China. Use this FIRST for any Amazon selling request - "find me a product to sell on Amazon", "is this product worth it", "should I place this order", "what should I do next", comparing products or ASINs, go/no-go decisions, building a product decision report, or whenever it is unclear which amz-* specialist applies. Runs onboarding, routes work to the specialist skills (amz-discovery, amz-validation, amz-sourcing, amz-economics, amz-compliance, amz-listing, amz-pricing, amz-ads, amz-inventory), enforces stage gates and the opportunity scorecard, and keeps the evidence trail between sessions.
---

# Amazon UK/EU orchestrator

A decision system, not an idea generator. Its job is to reduce uncertainty cheaply before the user
commits capital, and to stop a good-looking score from hiding a missing fact. Success is a buying
decision the evidence supports — including "do not buy".

Read `references/standards.md` before any research; every specialist skill relies on it.

## 1. Purpose and triggers
Coordinate the ten-stage workflow, own the scorecard, gates and decision report. Triggers: any
Amazon business question without an obvious single specialist; "what next"; comparisons; go/no-go.

## 2. Inputs
Required: the user's goal for this session. Optional: `amazon-business/profile.md`, existing
candidate folders, tool exports, quotations. If `profile.md` is missing, run onboarding first.

## 3. Tools and data access
State what is available per `references/standards.md` section 4 before starting. Python 3 for the
bundled calculators (stdlib only).

## 4. Workflow
1. **Workspace.** `amazon-business/`: the one in the current folder if it exists, otherwise the one
   beside `amazon-skills/` in the unified install (also reachable as `~/amazon/amazon-business`).
   Create one only if neither exists, and say where. Never keep two. If the workspace cannot be
   written to (an uploaded skill in the Claude apps), follow the read-only rule in the entry
   `SKILL.md`: work on a copy and hand the changed files back. Layout:
   ```
   amazon-business/
     profile.md                 # onboarding answers, setup status and assumptions
     shortlist.md               # ranked candidates, classifications, windows, next steps
     scorecard.json             # scorecard input for the live candidates
     discovery-<date>.md        # one per discovery run: raw labelled observations for every seed
     candidates/<slug>/         # created when a candidate is shortlisted at the end of stage 2
       handoff.md               # one section appended per skill run
       inputs.json              # unit-economics inputs with sources (ceiling inputs at stage 2)
       evidence.md              # raw labelled observations gathered from stage 3 onwards
       report.md                # standard decision report
   ```
   `<slug>` is the product concept in lowercase with hyphens, e.g. `squirrel-proof-bird-feeder`.
2. **Onboarding.** If no profile, ask the questions in `references/onboarding.md` as one organised
   set. Do not recommend products before the profile exists.
3. **Locate the stage.** Read each candidate's `handoff.md` and find its stage in
   `references/stage-gates.md`. Do the earliest incomplete stage; never skip. If a live candidate
   has no `handoff.md`, take its stage from `shortlist.md` and write the hand-off before new work.
4. **Route** to the specialist:

   | Stage | Skill |
   |---|---|
   | 1–2 Discovery, initial screening | amz-discovery |
   | 3 Demand and competition validation | amz-validation |
   | 4 Quotations and samples | amz-sourcing |
   | 5 Compliance verification | amz-compliance (start an early screen at stage 2 for anything regulated) |
   | 6 Financial validation | amz-economics |
   | 7 First-order size and reorder funding (the order itself is the user's decision) | amz-inventory |
   | 8 Listing and launch | amz-listing, amz-pricing |
   | 9 Advertising optimisation | amz-ads |
   | 10 Reorder and expansion | amz-inventory |
5. **Score.** After stages 2, 3 and 6, update the scorecard JSON and run
   `python3 scripts/scorecard.py <file.json>` (see `references/scorecard.md`).
6. **Gate.** Apply the hard gates in `references/stage-gates.md`. Classify using exactly the six
   classifications, each with reason, remaining uncertainties and next required evidence.
7. **Report.** Produce or update `report.md` from `references/decision-report.md`; add the
   comparison table when there are several candidates. Update `shortlist.md`.
8. **Stage 7 (test-order decision)** is the user's call. Present the report, the cash committed and
   what is still uncertain; do not present an order as decided.

## 5. Evidence standards
`references/standards.md`. In addition: when a specialist returns a figure without a label, send it
back rather than passing it on.

## 6. Evaluation framework
Scorecard (`references/scorecard.md`) for ranking; stage gates for progression; hard gates override
both. Opportunity score and evidence confidence are always reported side by side.

## 7. Output
`shortlist.md` (ranked table: candidate, classification, score, confidence, open gates, next step
and its cost) and one `report.md` per shortlisted candidate.

## 8. Missing data and uncertainty
`references/standards.md` section 6. A missing consequential fact pauses the candidate; say what
the cheapest way to get it is and what it costs.

## 9. Stop conditions
Stop and ask the user when: capital or tax status is unknown; a hard gate opens; the next step
commits money; the user's profile contradicts the candidate (e.g. regulated product, no appetite).

## 10. Example
"I have about £6k and want to start selling on Amazon UK from China. Where do I begin?" →
onboarding questions → profile.md → amz-discovery within the profile's constraints.

## 11. Hand-off
To any specialist: `profile.md`, the candidate's `handoff.md` and `evidence.md`, and the specific
question to answer. From any specialist: the hand-off block in `references/standards.md` section 7.

## Reference files
- `references/standards.md` — evidence labels, data access, confidence, hand-off block (read first)
- `references/onboarding.md` — questions, working assumptions, profile template
- `references/stage-gates.md` — ten stages, money committed, gates, classifications
- `references/scorecard.md` — criteria, weights, double-counting rules
- `references/decision-report.md` — 18-section report and comparison table
