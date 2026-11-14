---
name: amazon
description: Amazon UK/EU private-label suite. Use for /amazon, product research, sourcing from China, margins, fees, VAT, compliance, listings, ads, stock, or the status of the user's Amazon research.
---

# /amazon — Amazon UK/EU Selling Suite & Business Hub

A unified decision system for sourcing from China and selling on Amazon UK and European marketplaces, paired with live business workspace data. Success is a buying decision the evidence supports — not a list of product ideas.

## Workspace & Folder Layout

Both skills and business data are co-located in this single unified folder:

```
amazon/
  SKILL.md                         # This entry point (/amazon)
  README.md                        # Complete suite documentation
  amazon-business/                 # Live seller workspace & research
    profile.md                     # Seller parameters, capital, VAT, profit floor
    shortlist.md                   # Ranked candidates, stage, open gates, next actions
    scorecard.json                 # Active scorecard data
    discovery-2026-11-14.md        # Observation evidence and ceiling models
    candidates/<slug>/             # Per-candidate evidence, handoff, report
  amazon-skills/                   # Orchestrator, nine specialist skills, three calculators
    amz-orchestrator/              # Master workflow, gates, scorecard script
    amz-discovery/                 # Stage 1-2: Product discovery & screening
    amz-validation/                # Stage 3: Demand & competitor validation
    amz-sourcing/                  # Stage 4: China supplier RFQ, quotes, samples
    amz-compliance/                # Stage 5: UKCA/CE, GPSR, EPR, REACH, IP/patents
    amz-economics/                 # Stage 6: Landed cost & unit economics script
    amz-inventory/                 # Stage 7 & 10: Reorder calculator & stock buffers
    amz-listing/                   # Stage 8: Copywriting, keywords, 7 image slots
    amz-pricing/                   # Stage 8: Price ladder, offers, launch discounts
    amz-ads/                       # Stage 9: Sponsored Products 4-campaign structure
    amazon/                        # Superseded first entry point; older local installs only, do not follow
```

Every path in this file goes through `amazon-skills/`, and the specialists reach each other with `../amz-...` inside it. A local install may also have root `amz-*` links into `amazon-skills/`; they are a convenience only, and the packaged zip has none.

## Step 1: Standards and Evidence Rules

Always follow the shared standards before conducting research or calculations:
- Core standards: `amazon-skills/amz-orchestrator/references/standards.md`
- Hard stage gates: `amazon-skills/amz-orchestrator/references/stage-gates.md`
- Scorecard criteria: `amazon-skills/amz-orchestrator/references/scorecard.md`
- Where each official figure lives and how to capture it: `amazon-skills/amz-orchestrator/references/live-sources.md`
- Label every figure with exactly one of the seven labels defined in `standards.md` section 1:
  `OBS`, `USER`, `SUPPLIER`, `EST`, `MODEL`, `ASSUMED`, `UNKNOWN`. Never invent numbers.

All paths in this file are relative to this skill's folder — `~/amazon` on the local install,
wherever the skill is mounted in the Claude apps. Use the full path, or change into that folder,
before running a calculator from another directory.

## Step 2: Locate Business Data

Locate `amazon-business/` in this priority order:
1. `./amazon-business/` in the user's current working directory (if opened in `~/amazon` or project root).
2. `<skill_directory>/amazon-business/` (co-located in this suite).
3. `~/amazon/amazon-business/` (local install only; a link to the same folder as 2).

Never create a second profile silently. Always read existing parameters from `profile.md`. Say
which workspace you used. The orchestrator states the same rule; if the two ever differ, this
order wins.

**Read-only workspace (the Claude apps).** An uploaded skill cannot be written to, so the
`amazon-business/` inside it is a dated snapshot. If the user has attached a newer
`amazon-business` folder or zip in the conversation, use that instead. Before any run that writes,
copy the workspace to a writable folder and work on the copy; finish by giving the user the changed
files, or a zip of the folder, to download. Tell them the snapshot inside the skill stays as it was
until the skill is uploaded again. If the session has no browser or network access, say so under
data access and work from the files and from exports the user pastes or attaches.

## Step 3: Invocation Without Arguments or "status"

When the user types `/amazon`, `/amazon status`, or asks for an overview:
1. **Profile Summary**: 1-line recap of capital ceiling, deployable capital, entity, VAT status, profit floor, and target markets from `amazon-business/profile.md`.
2. **Setup Status**: every item of the setup checklist in `amazon-skills/amz-orchestrator/references/onboarding.md`, with its status from `profile.md`, flagging those due at or before the next stage any live candidate is about to enter.
3. **Shortlist Table**: Render current candidates from `amazon-business/shortlist.md` and `scorecard.json`:
   - Candidate name
   - Opportunity score / confidence %
   - Stage reached, and one of the six classifications in `stage-gates.md`: Reject, Needs more
     evidence, Ready for samples, Ready for a limited test order, Ready for launch planning, Ready
     for scaling. (`scorecard.py` prints REJECT / PAUSE / NEEDS MORE EVIDENCE / PROGRESS — map those
     to a classification per `scorecard.md`; they are not classifications themselves.)
   - Open gates (blocking IP, compliance, safety)
   - Selling window & order-by date
   - Next step and its cost (`UNKNOWN` when no file states the cost — never an estimate from memory)
   If a candidate has no order-by date on file, derive it per `standards.md` section 8 and label it `MODEL`.
4. **Stale Data Warning**: Flag any observation older than about three months (the threshold in `standards.md` section 5).
5. **Next Action**: Propose the single cheapest next step to resolve the primary open uncertainty. Await user confirmation before committing capital.

A status run only reads. It writes nothing; Step 6 applies to research and analysis runs.

## Step 4: Routing Requests With Arguments

When invoked with arguments, route to the appropriate specialist skill:

| User Request Example | Specialist Skill | Focus |
|---|---|---|
| `/amazon find products in <category>` | `amazon-skills/amz-discovery` | Observed demand and entry difficulty, with numbers; cost ceiling; selling window |
| `/amazon validate <candidate or ASIN>` | `amazon-skills/amz-validation` | Deep review mining, competitor flaws, disconfirmation |
| `/amazon quotes <candidate>` | `amazon-skills/amz-sourcing` | 1688 / Alibaba RFQ, like-for-like quotes, sample tests |
| `/amazon is this legal <product>` | `amazon-skills/amz-compliance` | UK/EU regulation, CE/UKCA, GPSR, IP/design patents |
| `/amazon profit <candidate>` or `/amazon ceiling` | `amazon-skills/amz-economics` | Landed cost, net contribution margin, break-even |
| `/amazon vat <candidate>` | `amazon-skills/amz-economics` (`--vat-compare`) | Profit per unit registered vs not; units a year at the threshold |
| `/amazon listing <candidate>` | `amazon-skills/amz-listing` | Conversion-led copy, 7-slot visual brief, SEO |
| `/amazon price <candidate>` | `amazon-skills/amz-pricing` | Price ladder, launch discount, minimum sustainable price |
| `/amazon ads <candidate>` | `amazon-skills/amz-ads` | 4-campaign structure, break-even ACoS, max CPC |
| `/amazon reorder` or `/amazon stock` | `amazon-skills/amz-inventory` | Reorder points, safety stock, lead times |
| `/amazon report <candidate>` | `amazon-skills/amz-orchestrator` | Standard 18-section decision report (at any stage) |
| `/amazon setup` | `amazon-skills/amz-orchestrator` | Setup checklist: every item, its status and the stage it is due |

The table is examples, not a grammar: any free-text request is routed by the orchestrator's stage
table. Each specialist's own `SKILL.md` is the authority for its stage; this file only routes.

## Step 5: Calculators (Python 3 Standard Library)

Run the verified calculators directly from terminal:

```bash
# Unit economics: full report, or --ceiling (max cost a price can carry), or --vat-compare
python3 amazon-skills/amz-economics/scripts/unit_economics.py <inputs.json> [--ceiling | --vat-compare]

# Scorecard evaluation
python3 amazon-skills/amz-orchestrator/scripts/scorecard.py amazon-business/scorecard.json

# Reorder & safety stock calculations
python3 amazon-skills/amz-inventory/scripts/reorder.py --daily <avg> --sd-daily <sd> --lead <days> --sd-lead <sd> --on-hand <units>
```

## Step 6: Session End & Handoff

At the end of any research or analysis step:
1. Update `amazon-business/shortlist.md` with new findings.
2. If evidence changed, update `amazon-business/scorecard.json` and re-run `scorecard.py`.
3. Append the hand-off block from `standards.md` section 7 to the candidate's `handoff.md`,
   unchanged in shape: status (one of the six classifications), confidence with its reason, key
   findings with labels, open gates, remaining uncertainties, next skill and the inputs it needs.
4. State the selling window per `standards.md` section 8 and the cost of the next step.
