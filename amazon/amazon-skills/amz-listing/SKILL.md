---
name: amz-listing
description: Skill F - product positioning and Amazon listing creation for amazon.co.uk and localised European listings. Use when the user asks to write or improve an Amazon title, bullet points, description, backend search terms, A+ Content, image brief or shot list, infographic plan, keyword plan, packaging or instruction inserts, or asks "why isn't my listing converting" or how to test listing changes. Writes natural British English for the UK, requires real localisation for other countries, checks current Amazon policy before recommending claims, and never invents certifications, benefits or reviews.
---

# F — Positioning and listing creation

Standards: `../amz-orchestrator/references/standards.md`. Stage 8. A listing can only claim what
the product, the test evidence and Amazon policy support — so this skill starts from the
validation and compliance hand-offs, not from a blank page.

## 1. Purpose and triggers
Turn the validated differentiation into a listing that a specific customer understands in a few
seconds on a phone.

## 2. Inputs
Required: validation hand-off (customer, complaints fixed, keyword tiers, competitor matrix),
final product specification and what is in the box, compliance hand-off (permitted claims,
required warnings). Optional: keyword volume exports, brand voice, sample photos, Brand Registry
status.

## 3. Tools and data access
Seller Central policy pages for the exact category on the day: title rules (length, banned
characters and phrases, repetition limits), bullet and description rules, backend search-term
limit, image requirements, A+ eligibility and restrictions, claims policy. Policies differ by
category and change; quote the rule and date rather than relying on memory.

## 4. Workflow
1. **Target customer and purchase motivation.** One named situation ("renter with a 60 cm
   under-sink cupboard and a waste pipe in the way"), the job to be done, the anxiety that stops
   the purchase.
2. **Proposition.** One sentence: for whom, what it does better, proof. The "better" must be the
   improvement actually built (amz-sourcing), and the proof must exist.
3. **Keyword plan.** Map the tiers from amz-validation: T1 into the title; T2 into bullets and
   A+; remaining relevant terms into backend search terms without repeating words already indexed.
   Volumes only where an export supplies them.
4. **Title.** Product type and primary term first, then the differentiator, then size/quantity/
   colour. Readable aloud. Within the current category limit.
5. **Bullets (usually five).** Each opens with the customer outcome, then the feature that
   produces it, then a specific (dimension, material, quantity). Order by what the complaint
   mining says matters most. Include what is in the box and fit/compatibility limits — stating
   who it is *not* for reduces returns.
6. **Description / A+ outline** (A+ needs Brand Registry): brand story module only if true;
   comparison chart against the user's own range; use-case modules; dimensions; care; FAQs drawn
   from competitor Q&A.
7. **Image brief and shot list.** Seven slots, each with one job:

   | Slot | Job | Notes |
   |---|---|---|
   | 1 Main | Win the click in search | Pure white background, product fills most of the frame, no text or props — verify current main-image rules |
   | 2 Key differentiator + scale | Show the fix for the top complaint | Dimensions against a familiar object |
   | 3 In use | Show the product solving the problem | Real UK setting and sockets/sizes |
   | 4 Feature infographic | 3–4 benefits | Header ~25%, feature grid ~60%, footer ~15% |
   | 5 Comparison / demonstration | Before/after, or "ours vs typical" without naming rivals | Must be literally true and reproducible |
   | 6 Use cases / lifestyle | Widen relevance | |
   | 7 What's in the box, care, guarantee | Remove last doubts | No customer reviews or star ratings in images unless current policy explicitly allows it |

   Mobile first: one message per image, large high-contrast text, legible at thumbnail size.
   Photograph the production sample, not the supplier's stock images.
8. **Packaging and instructions.** Fix what reviews say confuses people; required markings from
   amz-compliance; a quick-start card. Inserts must not ask for positive reviews or offer
   incentives — check the current communication and review policies.
9. **Localisation.** For each EU marketplace: a native-level writer, local search terms researched
   on that marketplace, local units, sizes, spelling and legal wording. A translated UK listing is
   not a localised listing.
10. **Testing plan.** Baseline sessions, unit session percentage and click-through from Business
    Reports; change one element at a time; use Amazon's Manage Your Experiments where eligible;
    decide the sample size or duration before starting; record results as `USER` data.

## 5. Evidence standards
Every claim in the copy traces to the specification, a test report or an observation. Keep a
claims table: claim → evidence → permitted by policy (source, date).

## 6. Evaluation framework
Pre-publication checklist: differentiator visible in the main image or image 2 and in the first
half of the title; every top-three complaint answered somewhere; no unsupported or restricted
claim (medical, antibacterial, eco/"green", "best", "No.1", guarantees, competitor names);
required warnings present; British spelling and units; reads naturally aloud.

## 7. Output template
```markdown
# Listing — <product> — amazon.co.uk — <date>
Target customer / motivation / proposition: ...
Policy checks (rule, source, date): ...
Title (<n> characters): ...
Bullets: 1–5
Description / A+ outline: ...
Backend search terms (<n> bytes): ...
Image shot list: slot, job, content, text overlay
Claims table: | Claim | Evidence | Policy check |
Packaging / instruction changes: ...
Test plan: metric, baseline, change, duration
```

## 8. Missing data
No keyword volumes: prioritise by purchase intent and observed autocomplete, and say so. No
Brand Registry: provide the plain description and note what A+ would add once eligible.

## 9. Stop conditions
Do not write a claim whose evidence is missing; list it as "cannot claim yet — needs X". Stop if
the category's current rules cannot be checked, or if compliance has open items affecting claims.

## 10. Example
"Write the amazon.co.uk listing for the pipe-fit under-sink organiser: title, bullets, backend
terms and a seven-image brief, using the complaint table from validation."

## 11. Hand-off → amz-pricing, amz-ads
Final title and bullets, keyword tiers with planned placement, the proposition, image list, claims
table, and the baseline metrics to measure. Append the hand-off block.
