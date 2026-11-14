#!/usr/bin/env python3
"""Opportunity scorecard: score, evidence confidence and gates, kept separate.

  python3 scorecard.py candidates.json
  python3 scorecard.py --selftest

See ../references/scorecard.md for criteria, anchors and double-counting rules.
"""
import json
import sys

WEIGHTS = {"unit_economics": 20, "demand_quality": 18, "competition_entry": 15, "differentiation": 12,
           "capital_requirements": 8, "sourcing_reliability": 8, "growth_potential": 7,
           "compliance_burden": 7, "operational_complexity": 5}
CONF = {"H": 1.0, "M": 0.6, "L": 0.3}


def assess(c, weights=WEIGHTS, min_score=50, min_conf=0.6):
    missing = set(weights) - set(c["scores"])
    if missing:
        raise ValueError(f"{c['name']}: unscored criteria {sorted(missing)}")
    total = sum(weights.values())
    score = sum(weights[k] * c["scores"][k][0] / 5 for k in weights) / total * 100
    conf = sum(weights[k] * CONF[c["scores"][k][1]] for k in weights) / total
    open_gates = [g for g in c.get("gates", []) if not g.get("resolved")]
    if any(g["severity"] == "fatal" for g in open_gates) or score < min_score:
        verdict = "REJECT"
    elif open_gates:
        verdict = "PAUSE"
    elif conf < min_conf:
        verdict = "NEEDS MORE EVIDENCE"
    else:
        verdict = "PROGRESS"
    return round(score, 1), round(conf * 100), open_gates, verdict


def main(path):
    data = json.load(open(path))
    w = data.get("weights", WEIGHTS)
    print("| Candidate | Opportunity score /100 | Evidence confidence | Open gates | Verdict |")
    print("|---|---|---|---|---|")
    rows = [(c, *assess(c, w, data.get("min_score", 50), data.get("min_confidence", 0.6))) for c in data["candidates"]]
    for c, score, conf, gates, verdict in sorted(rows, key=lambda r: -r[1]):
        g = "; ".join(f"{x['severity']}: {x['issue']}" for x in gates) or "none"
        print(f"| {c['name']} | {score} | {conf}% | {g} | {verdict} |")
    print("\nScore ranks attractiveness; confidence says how far to trust it; gates override both.")


def selftest():
    full = {k: [5, "H"] for k in WEIGHTS}
    assert assess({"name": "a", "scores": full}) == (100.0, 100, [], "PROGRESS")
    weak = {k: [5, "L"] for k in WEIGHTS}
    assert assess({"name": "b", "scores": weak})[3] == "NEEDS MORE EVIDENCE"  # high score, weak evidence
    gate = [{"issue": "registered design conflict", "severity": "fatal"}]
    assert assess({"name": "c", "scores": full, "gates": gate})[3] == "REJECT"  # gate beats score
    blocked = [{"issue": "test report unverified", "severity": "blocking"}]
    assert assess({"name": "d", "scores": full, "gates": blocked})[3] == "PAUSE"
    half = {k: [2, "H"] for k in WEIGHTS}
    assert assess({"name": "e", "scores": half}) == (40.0, 100, [], "REJECT")
    print("scorecard selftest ok")


if __name__ == "__main__":
    if sys.argv[1:] == ["--selftest"]:
        selftest()
    elif len(sys.argv) != 2 or sys.argv[1].startswith("-"):
        sys.exit(__doc__)
    else:
        main(sys.argv[1])
