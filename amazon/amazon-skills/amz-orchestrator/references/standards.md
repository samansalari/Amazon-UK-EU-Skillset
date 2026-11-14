# Shared research standards (every amz-* skill follows these)

The user is about to commit real money to inventory. A confident number with no source is worse
than a visible gap: a gap gets checked, a made-up number gets trusted. Everything below exists to
keep that distinction visible all the way to the buying decision.

## 1. Evidence labels

Every figure and every factual claim carries exactly one label, written inline beside it.

| Label | Meaning | Typical example |
|---|---|---|
| `OBS` | You saw it on a live page or file in this session | Price, review count, BSR on a listing |
| `USER` | The user supplied it from their own account, tool export or invoice | Seller Central report, Helium 10 export |
| `SUPPLIER` | A supplier said it; nobody has verified it | Unit price, lead time, test certificate |
| `EST` | A third-party tool's estimate | Monthly sales, search volume |
| `MODEL` | Our calculation from labelled inputs | Landed cost, break-even ACoS |
| `ASSUMED` | A working assumption, not evidence | 8% return rate, 10% conversion |
| `UNKNOWN` | Needed and not available | Competitor ad spend |

Inline format: `£18.99 [OBS amazon.co.uk B0XXXXXXXX 2026-11-13]`,
`~900 units/month [EST Helium 10, user export 2026-11-10]`, `conversion 10% [ASSUMED]`.

A `MODEL` figure is only as good as its weakest input: say which inputs are `ASSUMED` or `SUPPLIER`.
One label per figure — write `[MODEL]` and name the inputs in words, not `[MODEL from USER + ASSUMED]`.
In a table, a label in the caption or column header covers every cell of that column; a cell that
differs carries its own.

## 2. Always record

Marketplace (amazon.co.uk, amazon.de, ...), currency, date observed, product identifier (ASIN /
supplier SKU / commodity code), and the assumptions a figure depends on. Cite the source URL
beside the claim it supports, not in a list at the end.

## 3. Things that must never be invented

Search volume, sales volume, revenue, market share, conversion rate, CPC, ACoS, competitor ad
spend, supplier names, quotations, Amazon fees, duty rates, certificates, review content. If you
cannot observe or be given one of these, write `UNKNOWN`, state what would supply it (which tool,
report or person), and continue with a clearly labelled range or stop — see section 6.

Related traps:
- Best Sellers Rank is a rank, not a sales figure. Converting BSR to units is an `EST` and needs a named tool.
- Review count is cumulative history, not current demand. Never derive sales from a "review rate".
- Amazon's "N+ bought in past month" badge is `OBS`, but it is a floor band for one listing in one month. Do not add badges up into a market size or annualise them.
- Google result counts say nothing about Amazon competition.
- "Low competition" is a conclusion, not an observation: state the criteria and show the numbers (see amz-validation).
- A supplier certificate is a `SUPPLIER` claim until the issuing lab confirms it against the exact product.
- "Typical" category benchmarks (conversion 10–15%, referral ~15%, ACoS by stage) are `ASSUMED` until replaced by a dated source or the user's own data.
- Give ranges when precision is unsupported: "£4–£6 landed" beats "£4.73" built on guesses.
- Do not project results ("sales +X% in 4 weeks"). State the plan, the assumptions and what would be measured.

## 4. Data access: say what you actually have

At the start of each skill run, state which of these are available. Never imply access you lack.

| Need | Source | Without it |
|---|---|---|
| Live prices, reviews, BSR, listing content, sponsored placements | Live browsing of the marketplace, as a normal visitor | Ask the user to paste/export; do not rely on memory |
| Search volume, sales estimates, keyword rank, historical price/BSR | Paid tools (Helium 10, Jungle Scout, Keepa, SmartScout...) — user exports | Mark `UNKNOWN`; use observable proxies and say they are proxies |
| Real conversion, sessions, ad performance, fees charged, returns | The user's Seller Central / Ads console exports | Planning assumptions only, labelled `ASSUMED` |
| Unit price, MOQ, lead time, shipping terms | Written supplier quotations | No landed-cost model beyond a labelled range |
| Current Amazon fees and policies | Seller Central fee pages / rate cards (dated) | Stop the economics step; fees change |
| Duty rate, import measures, anti-dumping | UK Integrated Online Tariff (gov.uk trade tariff) by commodity code | Stop; a wrong code changes the answer |
| VAT treatment, product compliance, IP clearance | Official sources first, then a qualified professional | Flag as open; never self-certify |

Where each of these lives, which fetch method works, and tested capture snippets: `live-sources.md`.

Browse the way a customer would. Do not disguise automated requests, bypass bot protection or
bulk-scrape Amazon: it breaches their conditions of use and puts the user's seller account at risk.
If a page will not load normally, ask the user for an export instead.

## 5. Confidence rating

Give each recommendation a rating plus one sentence saying why.

- **High** — key figures are `OBS`/`USER`, cross-checked by a second source, recent, and specific to the exact marketplace.
- **Medium** — mix of `OBS` and `EST`/`SUPPLIER`; one source; or data older than ~3 months.
- **Low** — rests mainly on `ASSUMED`, a single unverified claim, or data from another marketplace.

Confidence describes the evidence, not the opportunity. Keep the two apart: an attractive score on
Low confidence means "worth checking cheaply", never "worth buying".

## 6. Missing or conflicting evidence

- Missing and consequential (would change go/no-go, or a money commitment depends on it): pause that
  candidate, name the cheapest way to obtain it, and lower confidence. Do not paper over it.
- Missing and minor: proceed with a labelled range and list it under "remaining uncertainties".
- Conflicting: show both figures, their sources and dates, say which you weight more and why.
- Keep UK and each EU marketplace separate: separate prices, fees, VAT, compliance, demand evidence.
  Never average across countries or assume UK evidence transfers.

## 7. Hand-off block

Each skill ends by appending a section to `candidates/<slug>/handoff.md` so the next skill (or a
later session) starts from evidence, not memory:

```markdown
## <skill-name> — <date>
Status: <Reject | Needs more evidence | Ready for samples | Ready for a limited test order | Ready for launch planning | Ready for scaling>
Confidence: <High|Medium|Low> — <why>
Key findings: <labelled figures the next skill needs>
Open gates: <unresolved safety / legal / IP / commercially fatal issues, or "none">
Remaining uncertainties: <list>
Selling window: demand runs <months> | on sale by <date> | order by <date> | if missed: <next window>
Next skill: <name> — needs: <exact inputs>
```

## 8. Selling window (every product recommendation states one)

A product that arrives after its season ties up cash for a year, so each shortlist row and decision
report says, with labels:

1. **When demand runs** — the months, from history (`OBS` Trends / Keepa, or `EST`); `UNKNOWN` if
   only today's snapshot exists.
2. **On-sale-by date** — when stock must be live to catch it. For a seasonal peak, allow time to
   earn reviews before the peak, not just to arrive during it.
3. **Order-by date** — on-sale-by minus lead time (production + freight and customs + fulfilment
   centre check-in). Use the supplier's and forwarder's written figures; until then give a labelled
   range. Check factory shutdowns around Chinese New Year and the October holiday against the
   order date — an order that misses the pre-holiday cut-off slips by weeks, not days.
4. **If missed** — what the next window is, and whether the candidate should wait for it.

Evergreen products still get an order-by date when peak-season fees or holidays affect them.

## 9. Paths

Paths written inside a specialist's `GUIDE.md` (`scripts/...`, `assets/...`, `references/...`) are relative to that
skill's own folder. `profile.md`, `shortlist.md` and `candidates/...` are relative to the workspace
`amazon-business/`. Neither is the shell's working directory: build the full path before running a
script, and never assume the session was opened in either folder.
