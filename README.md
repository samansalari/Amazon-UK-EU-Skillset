# Amazon UK/EU Skillset

Ten stages for a private-label buying decision. Read the skills, run the calculators, install them in your agent.

Unofficial. Not affiliated with Amazon. Not legal, tax or financial advice.

<p align="center">
  <img src="docs/social-card.png" alt="Amazon UK/EU Skillset. Ten stages. Three calculators. One buying decision." width="100%">
</p>

<p align="center">
  <a href="https://samansalari.github.io/Amazon-UK-EU-Skillset/"><img src="https://img.shields.io/badge/Open%20the%20buying%20desk-interactive-c56a32?style=for-the-badge" alt="Open the buying desk"></a>
</p>

<p align="center">
  <a href="https://samansalari.github.io/Amazon-UK-EU-Skillset/#/numbers">Run the numbers</a>
  ·
  <a href="https://samansalari.github.io/Amazon-UK-EU-Skillset/#/skills">Read a skill</a>
  ·
  <a href="https://samansalari.github.io/Amazon-UK-EU-Skillset/#/share">Copy a post</a>
  ·
  <a href="amazon.zip">Download amazon.zip</a>
</p>

[![version](https://img.shields.io/badge/suite-2026--11--14.5-1c1814)](amazon/README.md)
[![stages](https://img.shields.io/badge/stages-10-c56a32)](https://samansalari.github.io/Amazon-UK-EU-Skillset/#/desk)
[![calculators](https://img.shields.io/badge/calculators-3-1e6b45)](https://samansalari.github.io/Amazon-UK-EU-Skillset/#/numbers)

The buying desk is the interactive copy: click a stage, read the skill, change a fee, see the contribution move. This page is the map.

Every fee, duty and lead time is an input with a source and a date. The scripts look nothing up. Numbers shipped as examples are labelled `EXAMPLE`.

## The ten stages

| Stage | Skill | The question it has to answer |
| --- | --- | --- |
| 1–2 | [amz-discovery](amazon/amazon-skills/amz-discovery/SKILL.md) | Is there demand worth a closer look? |
| 3 | [amz-validation](amazon/amazon-skills/amz-validation/SKILL.md) | Can a new listing actually enter? |
| 4 | [amz-sourcing](amazon/amazon-skills/amz-sourcing/SKILL.md) | Can a supplier make this, like for like? |
| 5 | [amz-compliance](amazon/amazon-skills/amz-compliance/SKILL.md) | Is it legal to sell, and whose IP is it? |
| 6 | [amz-economics](amazon/amazon-skills/amz-economics/SKILL.md) | What does one shipped unit really make? |
| 7 and 10 | [amz-inventory](amazon/amazon-skills/amz-inventory/SKILL.md) | How many units, and when to reorder? |
| 8 | [amz-listing](amazon/amazon-skills/amz-listing/SKILL.md) | Does the listing say what buyers need? |
| 8 | [amz-pricing](amazon/amazon-skills/amz-pricing/SKILL.md) | What price still clears the floor? |
| 9 | [amz-ads](amazon/amazon-skills/amz-ads/SKILL.md) | What ad spend still makes a profit? |
| All | [amz-orchestrator](amazon/amazon-skills/amz-orchestrator/SKILL.md) | What is the next cheapest question? |

Start at [`amazon/SKILL.md`](amazon/SKILL.md). That is `/amazon`.

```mermaid
flowchart LR
  D[Discover] --> V[Validate] --> S[Source] --> C[Comply] --> E[Cost]
  E --> O[Order] --> L[List] --> P[Price] --> A[Ads] --> R[Reorder]
```

## Try it without installing

<details open>
<summary><strong>Unit economics, VAT compare, cost ceiling, reorder</strong></summary>

The [numbers page](https://samansalari.github.io/Amazon-UK-EU-Skillset/#/numbers) runs the same arithmetic as:

```bash
python3 amazon/amazon-skills/amz-economics/scripts/unit_economics.py amazon/amazon-skills/amz-economics/assets/inputs.example.json
python3 amazon/amazon-skills/amz-economics/scripts/unit_economics.py amazon/amazon-skills/amz-economics/assets/inputs.example.json --ceiling
python3 amazon/amazon-skills/amz-economics/scripts/unit_economics.py amazon/amazon-skills/amz-economics/assets/inputs.example.json --vat-compare
python3 amazon/amazon-skills/amz-inventory/scripts/reorder.py --daily 10 --sd-daily 4 --lead 70 --sd-lead 7 --on-hand 600
```

The form opens on the illustrative example. It is not a live fee card. Replace every figure before you use a result.

</details>

<details>
<summary><strong>Read a worked workspace</strong></summary>

[`amazon/amazon-business/`](amazon/amazon-business) is a published research snapshot so the suite is readable end to end: profile, shortlist, scorecard, two candidates. It includes that seller’s capital ceiling, VAT position and entity. It is not a recommendation, and it is not your business. Replace it with your own profile after you install.

Open it on the [workspace tab](https://samansalari.github.io/Amazon-UK-EU-Skillset/#/workspace).

</details>

## Install

One folder, named `amazon`. Do not unzip it over a newer local workspace.

```bash
git clone --depth 1 https://github.com/samansalari/Amazon-UK-EU-Skillset.git
cp -R Amazon-UK-EU-Skillset/amazon ~/.claude/skills/amazon
```

| Agent | Where the folder goes |
| --- | --- |
| Claude Code | `~/.claude/skills/amazon` |
| Claude apps | Upload [`amazon.zip`](amazon.zip). Code execution has to be on. |
| Codex | `~/.codex/skills/amazon` |
| Cursor | `~/.cursor/skills/amazon` |
| GitHub Copilot | `~/.copilot/skills/amazon` |
| Gemini / Antigravity | `~/.gemini/config/skills/amazon` |

Then type `/amazon` or `$amazon`.

## Share

<details>
<summary><strong>Post for X</strong></summary>

```text
I published the Amazon UK/EU skill suite I use before spending money on stock.

10 stages, from discovery to reorder. Calculators for landed cost, VAT and safety stock. No invented fees.

https://samansalari.github.io/Amazon-UK-EU-Skillset/
```

[Open X with this text](https://twitter.com/intent/tweet?text=I%20published%20the%20Amazon%20UK%2FEU%20skill%20suite%20I%20use%20before%20spending%20money%20on%20stock.%0A%0A10%20stages%2C%20from%20discovery%20to%20reorder.%20Calculators%20for%20landed%20cost%2C%20VAT%20and%20safety%20stock.%20No%20invented%20fees.%0A%0Ahttps%3A%2F%2Fsamansalari.github.io%2FAmazon-UK-EU-Skillset%2F)

</details>

<details>
<summary><strong>Post for LinkedIn</strong></summary>

```text
I published an unofficial skill suite for Amazon UK and EU private-label decisions.

It is the workflow I want an agent to follow before anyone spends money on samples or stock: discover, validate, source, check the law, run the unit economics, size the order, write the listing, set the price, plan the ads, then reorder.

The calculators do not look up live fees. Every rate is an input with a source. Example numbers are labelled as examples.

https://samansalari.github.io/Amazon-UK-EU-Skillset/
```

[Open LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fsamansalari.github.io%2FAmazon-UK-EU-Skillset%2F)

</details>

Card for the link preview: [`docs/social-card.png`](docs/social-card.png), 1200×630.

## What this is not

Not an Amazon product. Not a fee lookup. Not a promise that a product will sell. A result is only as good as the inputs you label and date.

Suite notes live in [`amazon/README.md`](amazon/README.md). Shared under the [MIT licence](LICENSE).
