---
name: amz-sourcing
description: Skill C - China sourcing and supplier due diligence for Amazon products. Use whenever the user mentions Alibaba, 1688, Made-in-China, factories, suppliers, MOQ, quotations, samples, Incoterms (EXW/FOB/DDP), inspections, payment terms, or asks "how do I find a manufacturer", "is this supplier legit", "compare these quotes", "what should I ask the supplier". Produces a product specification, a supplier enquiry, a like-for-like quotation comparison, sample approval criteria and a due-diligence record. Treats every supplier claim and certificate as unverified until checked.
---

# C — China sourcing and supplier due diligence

Standards: `../amz-orchestrator/references/standards.md`. Stage 4. Money committed here is small
(samples, courier) — use it to remove the risk of the large commitment that follows.

## 1. Purpose and triggers
Turn a validated candidate into comparable written quotations from verifiable suppliers and an
approved sample.

## 2. Inputs
Required: validation hand-off (improvements to build, table stakes, target price band, target
landed cost from amz-economics). Optional: existing supplier contacts, quotes, sample photos.

## 3. Tools and data access
Supplier platforms (Alibaba, 1688, Made-in-China, Global Sources) via the user's account or public
pages; China's National Enterprise Credit Information Publicity System or a paid company-check
service for registration details; third-party inspection firms. You cannot contact suppliers
unless the user asks you to and approves the message; draft, and let the user send.

## 4. Workflow
1. **Write the specification** before contacting anyone: dimensions, materials and grades,
   colours, weight, tolerances, functional requirements, the differentiating changes, packaging
   (unit, inner, master carton, drop-test expectation), labelling (see amz-compliance), and the
   quality standard: critical / major / minor defect definitions and the acceptance sampling level
   you will inspect to (agree an AQL with the inspection firm; state it in the PO).
2. **Discover and shortlist** 8–10 suppliers; aim for at least 3 comparable written quotations.
   Record how each was found. Platform badges, "verified" labels and years-on-platform are
   marketing signals, not due diligence.
3. **Send the enquiry** from `assets/supplier-enquiry.md` (same wording to everyone, so replies
   are comparable).
4. **Normalise quotes** into `assets/quotation-comparison.csv`: same quantity breaks, same
   Incoterm, same packaging, same currency. A quote that omits something is not cheaper — list
   what each price includes and excludes.
5. **Due diligence** (record result and evidence for each; `SUPPLIER` until independently checked):
   - Legal entity name on the business licence matches the bank account beneficiary and the contract party.
   - Manufacturer or trading company: business scope on the licence, factory address, video walk-through of the production line making *this* product, or a factory audit. A trading company is not disqualifying; an undisclosed one is.
   - Certificates and test reports: verify with the issuing lab using the report number, and check the report names this supplier and this exact product/model (hand to amz-compliance).
   - References, export history to the UK/EU, sample responsiveness and consistency of answers.
   - Alternative source: at least one other supplier able to make the same specification.
6. **Samples.** Order from the top 2–3. Evaluate against written approval criteria: specification
   conformity, the differentiating feature works, table stakes matched, finish, smell/materials,
   packaging survival, measured weight and dimensions (these drive fees — send to amz-economics).
   Photograph and keep a signed-off "golden sample".
7. **Terms.** Negotiate after sample approval: price by quantity break, MOQ, production lead time,
   payment terms (deposit/balance split, method, any trade-assurance or escrow protection),
   tooling/mould ownership, defect remedy (rework, credit, replacement), late-delivery terms.
8. **Inspection plan.** Pre-shipment inspection by a third party you appoint and pay, against the
   golden sample and the defect definitions; balance paid only after a pass.
9. **Shipping terms.** For each quote list exactly what the Incoterm covers and what remains:
   export clearance, main freight, insurance, UK customs clearance, duty, import VAT, delivery to
   the fulfilment centre. "DDP" offers need particular care: confirm who is importer of record and
   how import VAT is declared, or the VAT may be unrecoverable and the import non-compliant.

## 5. Evidence standards
Every price, lead time, capacity and certificate is `SUPPLIER` until verified; say who verified it
and how. Never describe a supplier as trustworthy because of a platform listing.

## 6. Evaluation framework
Compare suppliers on: total landed cost at the intended quantity (from amz-economics, not unit
price), sample result, verification status, lead time, payment protection, communication quality,
and flexibility on MOQ. Unit price alone decides nothing.

## 7. Output template
```markdown
# Sourcing — <candidate> — <date>
Specification v<n>: ...
Suppliers contacted: <n>; comparable written quotes: <n>
| Supplier | Entity verified? | Maker / trader | Unit price @ qty breaks | MOQ | Incoterm, port | Includes / excludes | Sample cost | Lead time | Payment terms | Certificates (verified?) |
Sample evaluation: | Criterion | Supplier A | B | C | Pass? |
Due-diligence record: ...
Red flags: ...
Recommendation: <supplier(s)>, quotation status, alternative source
```

## 8. Missing data
Fewer than 3 comparable quotes → say the price is not yet market-tested. Unverifiable entity or
certificate → open gate, not a footnote.

## 9. Stop conditions and rejection criteria
Stop before any payment beyond samples until compliance and economics have passed. Reject or pause
on: branded or lookalike goods, logos or "authorised" claims without proof (counterfeit / IP);
pressure to pay a personal account or an entity different from the licence; refusal of third-party
inspection; certificates that fail verification; price far below the other quotes with no
explanation; only one supplier able to make it and a long lead time.

## 10. Example
"Here are four Alibaba replies for the organiser. Normalise them, tell me what each price actually
includes, and what to verify before I order samples."

## 11. Hand-off → amz-compliance and amz-economics
Specification, materials list, intended user and age group; chosen quote(s) with quantity breaks,
Incoterm, inclusions/exclusions, payment terms, lead times; measured packaged dimensions and
weight; carton data; certificates received and their verification status. Append the hand-off block.
