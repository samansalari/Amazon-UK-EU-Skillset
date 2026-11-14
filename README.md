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
  <a href="amazon.zip">Download amazon.zip</a>
</p>

[![version](https://img.shields.io/badge/suite-2026--11--14.7-1c1814)](amazon/README.md)
[![stages](https://img.shields.io/badge/stages-10-c56a32)](https://samansalari.github.io/Amazon-UK-EU-Skillset/#/desk)
[![calculators](https://img.shields.io/badge/calculators-3-1e6b45)](https://samansalari.github.io/Amazon-UK-EU-Skillset/#/numbers)

The buying desk is the interactive copy: click a stage, read the skill, change a fee, see the contribution move. This page is the map.

Every fee, duty and lead time is an input with a source and a date. The scripts look nothing up. Numbers shipped as examples are labelled `EXAMPLE`.

## The ten stages

| Stage | Skill | The question it has to answer |
| --- | --- | --- |
| 1–2 | [amz-discovery](amazon/amazon-skills/amz-discovery/GUIDE.md) | Is there demand worth a closer look? |
| 3 | [amz-validation](amazon/amazon-skills/amz-validation/GUIDE.md) | Can a new listing actually enter? |
| 4 | [amz-sourcing](amazon/amazon-skills/amz-sourcing/GUIDE.md) | Can a supplier make this, like for like? |
| 5 | [amz-compliance](amazon/amazon-skills/amz-compliance/GUIDE.md) | Is it legal to sell, and whose IP is it? |
| 6 | [amz-economics](amazon/amazon-skills/amz-economics/GUIDE.md) | What does one shipped unit really make? |
| 7 and 10 | [amz-inventory](amazon/amazon-skills/amz-inventory/GUIDE.md) | How many units, and when to reorder? |
| 8 | [amz-listing](amazon/amazon-skills/amz-listing/GUIDE.md) | Does the listing say what buyers need? |
| 8 | [amz-pricing](amazon/amazon-skills/amz-pricing/GUIDE.md) | What price still clears the floor? |
| 9 | [amz-ads](amazon/amazon-skills/amz-ads/GUIDE.md) | What ad spend still makes a profit? |
| All | [amz-orchestrator](amazon/amazon-skills/amz-orchestrator/GUIDE.md) | What is the next cheapest question? |

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

## What this is not

Not an Amazon product. Not a fee lookup. Not a promise that a product will sell. A result is only as good as the inputs you label and date.

Suite notes live in [`amazon/README.md`](amazon/README.md). Shared under the [MIT licence](LICENSE).
