# Onboarding: questions, working assumptions, profile

Ask once, in this order (most decision-changing first). Accept "don't know": propose the working
assumption in the right-hand column, label it `ASSUMED` in `profile.md`, and say how it bends the
analysis. Never fill in a budget or tax status silently — those two change almost every answer.

| # | Question | Why it matters | Working assumption if unanswered |
|---|---|---|---|
| 1 | Total capital available, and how much of it is reserved as contingency? | Caps order size, candidate price band and how much ad learning is affordable | None. Pause: ask for at least a range |
| 2 | Where is the business established? Company status (sole trader / Ltd)? UK VAT-registered? EORI? | VAT registration flips revenue, import VAT and fee VAT treatment | Run economics both ways (registered / not) and show the difference |
| 3 | Minimum acceptable profit per unit, contribution margin and return on inventory? | Defines the profit floor every price, promo and scenario is tested against | Ask; if still open, show results against £3, £5 and £8 per unit and let the user choose |
| 4 | Amazon selling experience and account status (none / individual / professional; any category approvals; Brand Registry)? | Entry difficulty, gated categories, A+ eligibility | New professional account, no approvals, no Brand Registry |
| 5 | Appetite for regulated products: electrical, battery, cosmetic, food-contact, children's, medical-adjacent? | Each adds testing cost, delay and liability | Avoid all of them for the first product |
| 6 | Categories you prefer, and categories to avoid? | Narrows discovery | No preference; exclude regulated per Q5 |
| 7 | Fulfilment: FBA, FBM, or compare? Any storage space of your own? | Fee structure and operations | FBA, with an FBM comparison where the product is bulky or slow |
| 8 | Size, weight or storage limits? | Fees and freight scale with both | Small and light enough for standard parcel tiers; verify tier per product |
| 9 | Target selling-price range? | Fixed per-unit fees crush low prices; high prices need more capital per unit | Derive from capital and profit floor rather than guess |
| 10 | Target launch date? | Decides air vs sea freight and whether seasonal products are viable | No fixed date; sea freight lead time acceptable |
| 11 | Willing to customise the product, design packaging and register a trade mark? | Differentiation, Brand Registry, lead time, MOQ | Light customisation + branded packaging; trade mark filed before launch |
| 12 | UK only at first, or compare specific EU countries (which)? | Each country is a separate economics and compliance exercise | UK only; EU assessed after measured UK results |
| 13 | Which tools and data do you have: Helium 10 / Jungle Scout / Keepa, Alibaba / 1688 account, Seller Central reports, spreadsheet software? | Determines which figures can be `EST`/`USER` rather than `UNKNOWN` | Live browsing only; sales and search volumes `UNKNOWN` |

## Setup checklist — what the user has to obtain, and by which stage

Hand this list to the user right after onboarding and track it in `profile.md` under "Setup
status". A missing item is a task with a due stage, not a reason to reject a product; pause only at
the stage that needs it. Costs and rules change: verify each against its official page on the day
and record the date. Nothing here is advice on the user's tax position.

| Item | Needed by | Where | What to verify |
|---|---|---|---|
| EORI number | Before the first commercial shipment (apply during stage 3) | gov.uk/eori | Number is for the entity that imports; GB vs XI if Northern Ireland is involved |
| Accountant who knows e-commerce VAT | Before stage 6 | — | VAT position, threshold monitoring on rolling 12-month turnover, whether voluntary registration pays for this product |
| Amazon Professional selling account | Stage 3–4 (identity verification takes time; the account also gives the real fee preview and category checks) | sell.amazon.co.uk | Current plan fee; documents required; no second account |
| One month of a history / keyword tool | Stage 3 | Keepa, Helium 10, Jungle Scout or similar | Current price; that it covers amazon.co.uk; export format |
| Supplier-platform account | Stage 4 | Alibaba, 1688 via an agent, Made-in-China | Payment protection terms |
| Freight forwarder / customs broker | Stage 4–6 (written quote) | — | Commodity code, duty, Incoterm, who acts as importer of record, postponed VAT accounting if registered |
| Product liability insurance | Before launch | Broker or insurer | Amazon's current seller insurance requirement and the sales level that triggers it |
| Product identifiers (GTIN / barcodes) | Stage 7–8 | GS1 UK | Amazon's current GTIN and exemption rules for the category |
| Trade mark application | Stage 7–8 | UK IPO | Current Brand Registry eligibility (pending vs registered marks); clearance search first |
| Product-specific registrations | Stage 5 | amz-compliance output | Packaging and other producer obligations, responsible-person duties, category approvals |

## profile.md template

```markdown
# Seller profile — updated <date>
Capital total: £... [USER]        Contingency reserved: £... [USER]
Deployable for first product (total − contingency): £... [MODEL]
Established in: ...   Entity: ...   VAT-registered: yes/no   EORI: yes/no
Profit floor: £.../unit, ...% contribution margin, ...% inventory ROI per cycle
Amazon account: ...   Category approvals: ...   Brand Registry: ...
Regulated-product appetite: ...
Categories preferred / avoided: ...
Fulfilment: ...   Size/weight limits: ...   Price band: ...
Launch target: ...   Customisation / brand: ...
Markets: UK first; EU candidates: ...
Tools and data access: ...
Setup status (from the checklist): EORI ... | accountant ... | seller account ... | tool ... | supplier platform ... | forwarder ... | insurance ... | GTIN ... | trade mark ... | product-specific registrations ...
Assumptions in force (each ASSUMED, with effect on analysis):
- ...
```
