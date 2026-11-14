---
name: amz-validation
description: Skill B - validate demand and competition in depth for shortlisted Amazon UK/EU products. Use when the user wants to know whether a specific product, niche or ASIN is really viable, asks for competitor analysis, keyword research, review mining, "can a new listing rank for this", "how strong are the competitors", "is this market saturated", or wants to stress-test an idea before paying for samples. Separates observation from tool estimates and inference, defines "low competition" with numbers, and states what evidence would disprove the opportunity.
---

# B — Demand and competition validation

Standards: `../amz-orchestrator/references/standards.md`. This is stage 3: the last stage that
costs nothing but time, so be hard on the candidate here.

## 1. Purpose and triggers
Decide whether a new listing could realistically win enough visibility and conversion to matter,
and what specifically it would do better.

## 2. Inputs
Required: candidate with primary search phrases and the discovery hand-off. Optional: tool exports
(keyword volumes, sales estimates, Keepa price/BSR history, reverse-ASIN), Brand Analytics if the
user has Brand Registry.

## 3. Tools and data access
Live browsing as a normal visitor; user-supplied exports. No ad-console or competitor data access —
competitor sales, conversion and ad spend are `UNKNOWN` unless a named tool estimates them (`EST`).

## 4. Workflow
1. **Define the market.** One sentence: who buys, for what job, at what price band. Then pick the
   3–6 search phrases a buyer with that job would type.
2. **Build the competitor set.** 8–12 listings a buyer would genuinely choose between. Exclude
   unrelated results, different pack sizes and different use cases — comparing against them flatters
   the opportunity.
3. **Competitor matrix** (all `OBS` unless stated):

   | ASIN | Brand / seller type | Price | Rating | Reviews | First available | Listing quality | Key strength | Main weakness | Sponsored? | Variations |

   Four lenses per listing: listing quality (title, images, A+, video), price and positioning
   (entry / core / premium), review intelligence, and advertising visibility (which brands occupy
   sponsored slots on each phrase).
4. **Entry-difficulty verdict with numbers.** Report for the primary phrase: share of page one held
   by the top 3 brands; median and range of review counts; how many page-one listings have fewer
   than a stated count (say which count and why); newest listing on page one and its review count
   (proof a recent entrant can get there); share of results that are sponsored; Amazon retail
   presence. Only then say low / moderate / high — and only as a summary of those numbers.
5. **Keyword plan evidence.** Tier phrases: T1 exact product terms; T2 use-case and problem
   phrases; T3 broad discovery. Attach volume only where a tool export supplies it.
6. **Review mining.** Read enough 1–3★ reviews across the set to see repetition (aim for 100+
   where available). Tabulate complaint themes with counts, an example quote each, and whether the
   fix is specifiable to a factory, what it would cost (`UNKNOWN` until amz-sourcing), and whether
   it can be shown in an image. Also note what 5★ reviewers praise: that is the table stake.
7. **Price stability.** Current spread; Keepa or user history for promotions and price drops;
   dependence on vouchers/deals. Frequent deep discounting means the list price is not the real price.
8. **Brand loyalty.** Do searches include brand names? Do reviews mention repeat purchase?
9. **Disconfirmation.** Write the three findings that would kill this opportunity, then go and
   look for each. Report what you found, including "could not check".
10. Update scorecard evidence grades; classify.

## 5. Evidence standards
Three visibly separate lists in the output: **Observed**, **Third-party estimates** (tool, date),
**Our inferences** (with the reasoning). Never merge them into one narrative.

## 6. Evaluation framework
A candidate passes when all of these hold, each with evidence: (a) demand shape is steady or
predictably seasonal; (b) at least one credible route onto page one exists — beatable listings or a
less contested purchase-intent phrase; (c) one differentiation that addresses a recurring
complaint and is specifiable; (d) the realistic price (after typical discounting) still plausibly
clears the profit floor; (e) no disconfirming finding stands.

## 7. Output template
```markdown
# Validation — <candidate> — amazon.co.uk — <date>
Market definition: ...
Competitor set and matrix: ...
Entry difficulty: <numbers> → <verdict>
Keyword tiers: T1 / T2 / T3 (volume source or UNKNOWN)
Complaint themes: | Theme | Count / sample | Example | Fixable? | Shown in image? |
Price stability: ...
Observed: ...   Third-party estimates: ...   Inferences: ...
What would disprove this, and what we found: ...
Verdict: <classification> — Confidence: <rating, why>
Cheapest next step: ...
```

## 8. Missing data
Without sales estimates, do not size the market; describe it qualitatively and mark confidence
accordingly. Without price history, say the price-stability view is a snapshot of one day.

## 9. Stop conditions and rejection criteria
Reject when page one is locked (dominant brands or Amazon retail with no weak listings and no
alternative phrase), demand is a spike, there is no specifiable differentiation, or the realistic
price cannot clear the floor. Pause when the verdict depends on a figure only a paid tool can give.

## 10. Example
"Validate the under-sink organiser candidate: competitor set, review mining and whether a new
listing could get onto page one for the main phrases."

## 11. Hand-off → amz-sourcing (and amz-listing later)
Product specification inputs (the improvements to build, table stakes to match), target price
band, keyword tiers, complaint table, competitor matrix, open questions. Append the hand-off block.
