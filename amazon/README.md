> Public desk: https://samansalari.github.io/Amazon-UK-EU-Skillset/ — read the skills and run the calculators in the browser. This file is the agent architecture guide.

# Amazon UK/EU Selling Suite & Business Hub (`/amazon`)

Version: 2026-11-14.5 — changes are listed at the end of this file.

Unified Amazon UK and EU private-label selling system co-locating the complete **10-stage skill suite** (`amazon-skills/`) and the live **business workspace & research data** (`amazon-business/`) together in one folder.

---

## Folder Architecture

```
amazon/
├── SKILL.md                          # Primary agent entry point for /amazon
├── README.md                         # This architecture guide
├── amazon-business/                  # Live seller workspace
│   ├── profile.md                    # Capital ceiling (£20k), UK Ltd, margin floor (10-15%)
│   ├── shortlist.md                  # Ranked product candidates, stages, open gates
│   ├── scorecard.json                # Evaluated criteria & gates for active candidates
│   ├── discovery-2026-11-14.md       # Demand observations, pricing clusters, ceiling models
│   └── candidates/                   # Per-product research records & evidence
├── amazon-skills/                    # Complete 10-stage decision suite
│   ├── amazon/                       # Superseded first entry point; older local installs only, not in the zip
│   ├── amz-orchestrator/             # Standards, stage-gates, onboarding, scorecard.py
│   ├── amz-discovery/                # Stage 1-2: Product discovery & early screening
│   ├── amz-validation/               # Stage 3: Demand/competitor validation & review mining
│   ├── amz-sourcing/                 # Stage 4: Chinese supplier specifications & RFQs
│   ├── amz-compliance/               # Stage 5: UKCA/CE, GPSR, EPR, REACH, IP/design patents
│   ├── amz-economics/                # Stage 6: Landed cost & unit_economics.py calculator
│   ├── amz-inventory/                # Stage 7 & 10: Working capital & reorder.py calculator
│   ├── amz-listing/                  # Stage 8: Positioning, copywriting, 7-slot image briefs
│   ├── amz-pricing/                  # Stage 8: Price ladder, minimum sustainable price
│   └── amz-ads/                      # Stage 9: Sponsored Products 4-campaign structure
└── [amz-* symlinks]                  # Internal root symlinks for seamless relative path resolution
```

Convenience symlink:
- `~/amazon` (`~/amazon`) points directly to this unified directory.

---

## Agent Integration

This unified suite is registered across all agent environments on the system:

| Agent Environment | Skill Path / Symlink | Trigger Command |
|---|---|---|
| **Claude Code** | `~/.claude/skills/amazon` | `/amazon` |
| **OpenAI Codex** | `~/.codex/skills/amazon` | `/amazon` or skill load |
| **Google Antigravity (AGY CLI)** | `~/.gemini/antigravity-cli/skills/amazon` | `/amazon` or agent directive |
| **Google Antigravity (GUI)** | `~/.gemini/antigravity/skills/amazon` | Amazon skill selector |
| **Google Gemini Config** | `~/.gemini/config/skills/amazon` | Custom skills |
| **Cursor AI** | `~/.cursor/skills/amazon` | `/amazon` prompt |
| **GitHub Copilot** | `~/.copilot/skills/amazon` | Chat skill |
| **Grok Agent** | `~/.grok/skills/amazon` | Custom skill |
| **Hermes Agent** | `~/.hermes/skills/amazon` | Skill catalog |

---

## How to Use `/amazon`

### 1. Check Status
Type `/amazon` or `/amazon status`:
- Displays seller profile parameters (capital, VAT, margin targets).
- Lists current shortlisted candidates with opportunity scores, confidence ratings, and active gates.
- Proposes the single cheapest, highest-impact next step.

### 2. Route by Stage
Use free text arguments to delegate to specialist stages:
- `/amazon find products in garden` → Launches `amz-discovery`.
- `/amazon validate squirrel-proof bird feeder` → Launches `amz-validation`.
- `/amazon quotes squirrel-proof bird feeder` → Launches `amz-sourcing`.
- `/amazon is this legal <product>` → Launches `amz-compliance`.
- `/amazon profit <product>` or `/amazon ceiling` → Launches `amz-economics`.
- `/amazon listing <product>` → Launches `amz-listing`.
- `/amazon price <product>` → Launches `amz-pricing`.
- `/amazon ads <product>` → Launches `amz-ads`.
- `/amazon reorder` → Launches `amz-inventory`.
- `/amazon setup` → Runs onboarding checklist in `amz-orchestrator`.

---

## Python Calculators (Standard Library Only)

All calculators run with standard Python 3:

```bash
# Unit economics (base and ceiling scenarios)
python3 amazon-skills/amz-economics/scripts/unit_economics.py amazon-skills/amz-economics/assets/inputs.example.json
python3 amazon-skills/amz-economics/scripts/unit_economics.py amazon-skills/amz-economics/assets/inputs.example.json --ceiling

# Live scorecard against current business candidates
python3 amazon-skills/amz-orchestrator/scripts/scorecard.py amazon-business/scorecard.json

# Inventory reorder point & safety stock
python3 amazon-skills/amz-inventory/scripts/reorder.py --daily 10 --sd-daily 4 --lead 70 --sd-lead 7 --on-hand 600

# Same inputs under both VAT positions, and units a year at the registration threshold
python3 amazon-skills/amz-economics/scripts/unit_economics.py amazon-skills/amz-economics/assets/inputs.example.json --vat-compare

# Self-tests
python3 amazon-skills/amz-economics/scripts/unit_economics.py --selftest
python3 amazon-skills/amz-orchestrator/scripts/scorecard.py --selftest
python3 amazon-skills/amz-inventory/scripts/reorder.py --selftest
```

These commands are written relative to this folder; from anywhere else, prefix them with `~/amazon/`.

---

## Installing from `amazon.zip`

One zip holds everything: the entry file, `amazon-skills/` and a dated snapshot of
`amazon-business/`. It contains no links, so it works where symlinks are not allowed.

**Claude apps (claude.ai, desktop).** Customize → Skills → upload `amazon.zip`. Code execution has
to be enabled. Then type `/amazon`, or just ask. The uploaded skill is read-only: Claude works on a
copy of the snapshot and hands the changed files back. Upload a new zip to refresh the snapshot.
Skills do not sync between the apps, the API and Claude Code.

**Claude Code on another machine.**

```bash
unzip amazon.zip -d ~/.claude/skills/
```

**A machine that already has the live install** (`~/.agents/skills/amazon`): do not unzip
`amazon.zip` over it — the snapshot inside would replace newer research files.

---

## Changes

- **2026-11-14.5** — packaged as one upload-ready `amazon.zip` for the Claude apps: description cut
  to under 200 characters, no links in the zip, and a rule for working when the skill folder is
  read-only (work on a copy of the snapshot, hand changed files back).
- **2026-11-14.4** — `--vat-compare` (profit per unit registered vs not, units a year at the
  threshold). `--ceiling` now runs on selling-side inputs alone and adds a goods-plus-freight
  ceiling. New `live-sources.md` (where each official figure lives, tested capture method). Entry
  file aligned with `standards.md`: seven evidence labels, six classifications, standard hand-off
  block. Workspace location, candidate slug and path bases each stated once. Scorecard JSON fields
  and the confidence-to-rating mapping documented. First entry point retired. Hand-off block
  carries the selling window. Found by a cold-start test with a fresh agent.
- **2026-11-14.3** — `/amazon` entry point; suite moved into one folder with `amazon-business/`.
- **2026-11-14.2** — `--ceiling`, setup checklist, selling-window rule, "bought in past month" signal.
- **2026-11-13.1** — first build: orchestrator, nine specialists, three calculators.
