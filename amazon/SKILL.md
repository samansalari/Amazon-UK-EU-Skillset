---
name: amazon
description: Amazon UK/EU private-label suite. Use for /amazon, product research, sourcing from China, margins, fees, VAT, compliance, listings, ads, stock, or the status of the user's Amazon research.
---

# /amazon — Amazon UK/EU Selling Suite & Business Hub

A decision system for sourcing from China and selling on Amazon UK and European marketplaces,
kept together with the user's live research. Success is a buying decision the evidence supports —
not a list of product ideas.

## How to use this skill — read this first

This file is only the router. The working knowledge is in ten guides under `amazon-skills/`, with
shared rules, templates and three calculators beside them. You are expected to open those files
yourself. An answer written from this file alone, or from general knowledge of Amazon selling, is
a failed run: the guides hold the evidence rules, gates and calculations that make the output
trustworthy.

Every run, in this order:

1. **Load the rules.** Read `amazon-skills/amz-orchestrator/GUIDE.md` and
   `amazon-skills/amz-orchestrator/references/standards.md` in full.
2. **Load the business.** Find the workspace (see "Workspace") and read `profile.md` and
   `shortlist.md`; for a named candidate, also `candidates/<slug>/handoff.md` and `inputs.json`.
   If the request itself changes the profile — a new category, budget or constraint — record it
   in `profile.md` as `[USER <date>]`. Ask a question first only when the answer changes the route
   (which animal, which marketplace, packs or pieces); otherwise proceed and state the assumption.
3. **Load every guide the request touches.** Pick them from the capability map and read each one
   in full before acting — the whole file, not its headings. Most real requests need more than one.
4. **Use the files the guide points to.** When a step names a template, reference or script, open
   or run it at that step. All arithmetic goes through the scripts, never by hand or from memory.
5. **Respect the stage.** Check the candidate's stage and open gates before doing later-stage work.
   If the request jumps ahead (a listing for a product that has not passed validation), say so,
   do the earliest incomplete stage first, or state plainly what is being skipped and the risk.
   A later-stage deliverable asked for early may be given only as a **provisional draft**: say so
   at the top, leave `[ ]` for everything not yet evidenced (materials, dimensions, claims, costs),
   and list what must be true before it can be used. An open hard gate still blocks any spend.
6. **Show what was used.** Start the reply with two lines:
   `Skill files used:` every guide, reference, template and script actually opened or run;
   `Data access:` what this session can and cannot reach (`standards.md` section 4).
   If the map called for a file that was not opened, say why.

The user may write in any language, often Persian. Route by meaning, and write the whole reply in
the user's language: explanations, headings, table headers, recommendations and the closing
summary. Only four things stay as they are: evidence labels (`[OBS]`, `[MODEL]`…), file and script
names, script output, and text written for a marketplace or a supplier (listing copy, search
terms, the supplier enquiry). The two opening line names (`Skill files used:`, `Data access:`)
stay in English; what follows them is in the user's language.

If the request matches nothing in the map, or the user asks what the suite can do
(`/amazon help`), present the capability map in plain words and ask which they want.

## Capability map

Guides are at `amazon-skills/<name>/GUIDE.md`. References are in
`amazon-skills/amz-orchestrator/references/`. Scripts and templates are in each skill's `scripts/`
and `assets/` folders.

| The user wants… | Read this guide | Also open or run |
|---|---|---|
| Status, "where are we", what to do next | `amz-orchestrator` | `stage-gates.md`; `scorecard.py` on the workspace `scorecard.json` |
| To get started; what to obtain (EORI, accounts, tools, insurance, trade mark) | `amz-orchestrator` | `onboarding.md` (questions, setup checklist, profile template) |
| Product ideas, niches, "what should I sell", a quick screen of an idea or ASIN | `amz-discovery` | `live-sources.md`; `unit_economics.py --ceiling`; `scorecard.md` + `scorecard.py` |
| Whether a product is really viable: competitors, keywords, review mining, saturation | `amz-validation` | `live-sources.md`; `scorecard.md` + `scorecard.py` |
| Suppliers, Alibaba / 1688, MOQ, quotations, samples, Incoterms, inspection, "is this supplier legit" | `amz-sourcing` | `assets/supplier-enquiry.md`; `assets/quotation-comparison.csv` |
| "Is it legal to sell": UKCA / CE, GPSR, labelling, testing, EPR, trade marks, patents, restricted categories | `amz-compliance` | `stage-gates.md` (hard gates) |
| Profit, margin, landed cost, FBA fees, duty, VAT, break-even, cash needed, ROI, FBA vs FBM | `amz-economics` | `assets/inputs.example.json`; `unit_economics.py` (full report, `--ceiling`, `--vat-compare`); `live-sources.md` |
| Title, bullets, description, search terms, A+ content, image brief | `amz-listing` | — |
| Price, launch price, vouchers, deals, bundles, when to raise or cut | `amz-pricing` | `unit_economics.py` for every price proposed |
| PPC: campaigns, keywords, bids, budget, ACoS / TACoS, negatives, scaling | `amz-ads` | `unit_economics.py` for break-even ACoS |
| How many to order, reorder point, safety stock, slow stock, variations, expanding to Europe | `amz-inventory` | `scripts/reorder.py`; `unit_economics.py` for cash and reorder funding |
| Go / no-go, comparing products, a decision report | `amz-orchestrator` | `decision-report.md`; `scorecard.md`; `stage-gates.md`; `scorecard.py` |

### Requests that span guides

Work them in stage order and write one hand-off block per guide used.

- "Find a product and tell me if it makes money" → `amz-discovery`, then `amz-economics`
  (`--ceiling`), then the scorecard.
- A quotation has arrived → `amz-sourcing` (comparison), `amz-economics` (full report and
  `--vat-compare`), `amz-inventory` (order size, cash, reorder).
- "Should I place this order?" → `amz-orchestrator` (stage and gates), `amz-compliance`,
  `amz-economics`, `amz-inventory`, then the decision report.
- "Prepare the launch" → `amz-listing`, `amz-pricing`, `amz-ads` — after confirming stages 3–6 are
  done for that candidate.
- Anything electrical, battery-powered, cosmetic, food-contact, for children, or resembling a
  branded or patented design → add `amz-compliance`, whatever else was asked.
- Any mention of Germany, France or another marketplace → the same guides again for that country,
  with its own prices, fees, VAT and rules; never reuse UK figures.
- A product type the compliance guide gives no example for (pet products, sports goods, car
  accessories) still gets a screen: general product safety, any claim the listing would make,
  materials, and Amazon's category rules, from official sources. Never assume no regime applies.

## Workspace

```
amazon/                            # this skill
  SKILL.md                         # this router — the only SKILL.md
  README.md                        # layout, install, change log
  amazon-skills/                   # ten guides, shared references, templates, three calculators
    amz-orchestrator/              # workflow, standards, stage gates, scorecard, decision report
    amz-discovery/  amz-validation/  amz-sourcing/  amz-compliance/  amz-economics/
    amz-listing/  amz-pricing/  amz-ads/  amz-inventory/
  amazon-business/                 # the user's live research
    profile.md  shortlist.md  scorecard.json  discovery-<date>.md
    candidates/<slug>/             # handoff.md, inputs.json, evidence.md, report.md
```

Every path in this file is relative to this skill's folder — `~/amazon` on the local install,
wherever the skill is mounted in the Claude apps. Use full paths when running a script. The
specialists reach each other with `../amz-...` inside `amazon-skills/`. A local install may also
have root `amz-*` links and an older `amazon-skills/amazon/` folder; ignore both.

Locate `amazon-business/` in this order, and say which one was used:

1. `./amazon-business/` in the current working directory.
2. The `amazon-business/` inside this skill's folder.
3. `~/amazon/amazon-business/` (local install only; the same folder as 2).

Never create a second profile silently. If none exists, run onboarding from
`amazon-skills/amz-orchestrator/references/onboarding.md` before recommending anything. If several
copies turn up (for example `amazon-business 2`), compare them, use the one with the newest files,
say which, and never merge them silently.

**Read-only workspace (the Claude apps).** An uploaded skill cannot be written to, so the
`amazon-business/` inside it is a dated snapshot. If the user has attached a newer
`amazon-business` folder or zip in the conversation, use that instead. Before any run that writes,
copy the workspace to a writable folder and work on the copy; finish by giving the user the changed
files, or a zip of the folder, to download. Tell them the snapshot inside the skill stays as it was
until the skill is uploaded again. If the session has no browser or network access, say so under
`Data access:` and work from the files and from exports the user pastes or attaches — do not fill
the gap from memory.

**Working without live data.** Fee, duty and tax figures already in the workspace, with a source
and a date within about 30 days, may be reused for screening, quoted with that date; re-verify
them before any step that commits money. Product ideas cannot be evidenced offline: you may list
directions worth checking, each marked as an untested hypothesis (`ASSUMED`), but not as
candidates, and never with a score. Then tell the user exactly which pages to open or export so
the run can continue — the paths are in `live-sources.md` — or ask for a session with a browser.

## Status run — `/amazon` with no request, or "status"

Report from the files and nothing else:

1. **Profile**: capital ceiling, deployable capital, entity, VAT status, profit floor, markets.
2. **Setup**: every item of the checklist in `onboarding.md` with its status from `profile.md`,
   flagging those due at or before the next stage any live candidate is about to enter.
3. **Shortlist**, one row per candidate from `shortlist.md` and `scorecard.json`: opportunity score
   and confidence; stage reached and one of the six classifications in `stage-gates.md` (Reject,
   Needs more evidence, Ready for samples, Ready for a limited test order, Ready for launch
   planning, Ready for scaling — `scorecard.py` prints REJECT / PAUSE / NEEDS MORE EVIDENCE /
   PROGRESS, which map to a classification per `scorecard.md`); open gates; selling window and
   order-by date (derive a missing order-by per `standards.md` section 8 and label it `MODEL`);
   next step and its cost (`UNKNOWN` when no file states it — never an estimate from memory).
4. **Stale data**: flag observations older than about three months.
5. **Next action**: the single cheapest step that resolves the main open uncertainty. Wait for the
   user's go-ahead before anything that commits money.

A status run only reads; it writes nothing.

## Calculators (Python 3, standard library only)

```bash
# Unit economics: full report, or --ceiling (max cost a price can carry), or --vat-compare
python3 amazon-skills/amz-economics/scripts/unit_economics.py <inputs.json> [--ceiling | --vat-compare]

# Opportunity score, evidence confidence and gates
python3 amazon-skills/amz-orchestrator/scripts/scorecard.py <scorecard.json>

# Reorder point and safety stock
python3 amazon-skills/amz-inventory/scripts/reorder.py --daily <avg> --sd-daily <sd> --lead <days> --sd-lead <sd> --on-hand <units>
```

Each has `--selftest`. No fee, duty or tax rate is built in: every rate is an input with a source
and a date. Never present the bundled example inputs as a product's numbers.

## End of a research or analysis run

1. Update `shortlist.md`; if the evidence changed, update `scorecard.json` and re-run `scorecard.py`.
2. Append the hand-off block from `standards.md` section 7 to the candidate's `handoff.md`,
   unchanged in shape: status (one of the six classifications), confidence with its reason, key
   findings with labels, open gates, remaining uncertainties, selling window, next skill and the
   inputs it needs.
3. Close the reply with: classification, confidence, open gates, the next required evidence and
   what the next step costs.
