---
name: amz-compliance
description: Skill E - early UK and European compliance, IP and Amazon-restriction screening before any money is spent on inventory. Use whenever a product might be regulated or the user asks "is this legal to sell", "do I need UKCA or CE", "what testing do I need", "can I sell this on Amazon", about product safety, labelling, responsible person, GPSR, EPR/packaging, WEEE, batteries, toys, cosmetics, food contact, electricals, trade marks, patents, design rights, gated categories, hazmat, VAT registration or customs obligations - and by default for every candidate before a test order. Works from current official sources, separates Great Britain, Northern Ireland and each EU country, and never treats a supplier certificate as proof.
---

# E — UK and European compliance screening

Standards: `../amz-orchestrator/references/standards.md`. Stage 5, with a quick pass at stage 2.
This is a screening process, not legal advice: its output is a list of what applies, what has been
evidenced, and exactly what a qualified person must confirm. Rules change — the regime names
below are prompts for where to look, not statements of current law. Verify each on the day.

## 1. Purpose and triggers
Find the issue that would make the product unsellable, unsafe or uninsurable while it is still
cheap to walk away.

## 2. Inputs
Required: product specification, materials, power source, intended user and age group, claims the
listing will make, target markets (GB / NI / named EU countries), who the importer is. Optional:
supplier documents, competitor listings, commodity code.

## 3. Tools and data access
Official sources first: gov.uk (OPSS product safety guidance, UK Integrated Online Tariff, HMRC VAT
and import guidance, UKIPO trade mark and design search), legislation.gov.uk, the European
Commission and EUIPO sites, national EPR registers, Espacenet for patents, and Amazon Seller
Central policy pages (restricted products, category requirements, dangerous goods). Cite the page
and date beside each finding.

## 4. Workflow
1. **Classify the product**: what it is, what it is made of, who uses it, how it is powered, what
   it touches (skin, food, children's mouths), what it claims to do.
2. **Territory split.** Treat as separate columns: Great Britain; Northern Ireland (EU product
   rules continue to apply to goods there — verify current Windsor Framework position); each EU
   country individually. Never write "Europe".
3. **Identify applicable regimes** per territory from official guidance. Prompts by product type:

   | Product characteristic | Look for (verify current law) |
   |---|---|
   | Any consumer product | General product safety law (GB: General Product Safety Regulations; EU/NI: General Product Safety Regulation (EU) 2023/988, including an EU-based responsible economic operator); check for newer UK product-safety legislation and its secondary rules |
   | Mains or low-voltage electrical | Electrical equipment safety, EMC, RoHS, UK plug requirements; UKCA/CE marking position |
   | Battery-powered / contains cells | Battery rules, transport classification (dangerous goods), WEEE producer obligations |
   | Radio, Bluetooth, Wi-Fi | Radio equipment rules; product security requirements for connectable devices |
   | Toys or child-appealing | Toy safety regulations and standards, age grading, warnings |
   | Children's non-toy products | Specific standards (sleep, feeding, cords, small parts) |
   | Cosmetics, skin contact | Cosmetics regulation: responsible person, safety report, notification, ingredient labelling |
   | Food contact | Food-contact materials rules, declarations of compliance |
   | Textiles | Fibre labelling, flammability (nightwear, furniture) |
   | Chemicals, liquids, aerosols | Classification/labelling, REACH, safety data sheet, hazmat on Amazon |
   | Health, wellness, "relieves", "treats" | Medical device borderline — claims alone can bring a product into scope |
   | PPE (gloves, masks, helmets, hi-vis) | PPE regulation, notified/approved body involvement |
   | Knives, lasers, magnets, pressurised items | Specific sale restrictions; often Amazon-restricted |
4. **Importer responsibilities.** Importing from China usually makes the user the importer (and
   for own-brand goods, effectively the manufacturer): name and address on product/packaging,
   technical documentation, declaration of conformity where required, traceability (batch
   numbers), incident reporting and recall readiness, product liability insurance.
5. **Markings, labels, instructions.** List required markings, warnings, language requirements per
   country, and country-of-origin statements. Feed the result to amz-sourcing (packaging artwork)
   and amz-listing (claims).
6. **Testing and technical file.** For each regime: the standard(s) typically used, whether
   third-party testing is mandatory or prudent, an accredited lab quote, and what goes in the file.
   Verify any supplier report with the issuing lab by report number; confirm it names this
   product, this model and this supplier, and the standard edition is current.
7. **Packaging and environmental.** UK packaging producer responsibility and data reporting
   thresholds; plastic packaging tax; WEEE and batteries where relevant. For EU countries:
   national EPR registrations (packaging, WEEE, batteries, textiles...) — Amazon asks for
   registration numbers in several countries before a listing can go live.
8. **Intellectual property.** Search trade marks (UKIPO, EUIPO) for the intended brand and for
   terms planned in the listing; registered designs for the product's appearance; patents
   (Espacenet) for the differentiating mechanism; check competitor listings for patent/design
   notices. Lookalikes of branded products and "compatible with" claims need care.
9. **Amazon requirements.** Category approval, restricted-product policy, dangerous-goods
   classification and documents (safety data sheet or exemption), compliance documents Amazon
   requests for the category, Brand Registry prerequisites.
10. **Tax and customs.** EORI; commodity code; duty and additional measures (hand to
    amz-economics); UK VAT registration position (threshold for UK-established businesses;
    different rules for overseas sellers — verify with HMRC guidance); for the EU: registration
    where stock is stored, OSS/IOSS for distance sales, fiscal representation in some countries.
11. **Verdict** per territory using the table in section 6, with an owner for each open item.

## 5. Evidence standards
A requirement is "identified" only with an official citation and date. A document is "verified"
only when checked with its issuer. Supplier certificates are `SUPPLIER` until then. Never describe
the product as compliant; describe what has been evidenced and what remains.

## 6. Evaluation framework

| Status | Meaning | Effect on the workflow |
|---|---|---|
| Clear | Regime identified from official source, obligations light, evidence in hand | Proceed |
| Manageable | Obligations identified with known cost and time; evidence obtainable | Proceed; cost into amz-economics, delay into the plan |
| Open | Applicability unclear, document unverified, or professional view needed | Hard pause: no inventory spend |
| Fatal | Prohibited, restricted beyond the user's reach, IP conflict, or safe design not achievable at the price | Reject |

## 7. Output template
```markdown
# Compliance screen — <candidate> — <date>
Product classification: ...
| Area | GB | NI | <EU country> | Source + date | Evidence held | Verified? | Status | Owner |
Markings / labels / instructions required: ...
Testing plan and cost: ...
IP searches run (database, term, date, result): ...
Amazon requirements: ...
Tax / customs position: ...
Questions for a qualified professional (exact wording): ...
Overall: <Clear | Manageable | Open | Fatal> — Confidence: <rating, why>
```

## 8. Missing data
If the materials, age group or claims are not fixed, screen the strictest plausible case and say
so. If an official source is ambiguous, quote it and route the exact question to a professional.

## 9. Stop conditions and rejection criteria
Any Open or Fatal item blocks a test order regardless of the scorecard. Always escalate to a
qualified compliance, tax or legal professional — stating exactly what to check — for: products
for children, cosmetics, anything electrical or with batteries, medical-adjacent claims, an IP
search with a plausible hit, VAT position of a non-UK-established seller, and any EU expansion.

## 10. Example
"I want to import a rechargeable LED desk lamp with a USB-C port and sell it on amazon.co.uk and
amazon.de. What applies, what do I need from the factory, and what should I ask a test lab?"

## 11. Hand-off → amz-economics, amz-sourcing, amz-listing
Testing and registration costs and lead times; duty/additional-duty finding; label and marking
requirements for artwork; claims that may and may not be made; open items with owners. Append the
hand-off block, listing every Open item under "Open gates".
