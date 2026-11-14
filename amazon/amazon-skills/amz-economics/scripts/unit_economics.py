#!/usr/bin/env python3
"""Amazon UK unit economics: landed cost, contribution, break-evens, cash. Stdlib only.

  python3 unit_economics.py inputs.json           # markdown report
  python3 unit_economics.py inputs.json --json    # raw numbers
  python3 unit_economics.py inputs.json --ceiling # stage 2, no quote yet: what cost can this price carry?
  python3 unit_economics.py inputs.json --vat-compare  # same inputs, VAT-registered vs not
  python3 unit_economics.py --selftest

Unit of analysis: ONE SHIPPED UNIT (returns are netted inside it).
All money is GBP except the two *_supplier_ccy fields.
Every rate and fee is an input: this script looks nothing up. Verify each against its live source
and record it in the "sources" block. Field meanings: ../assets/inputs.example.json, ../GUIDE.md.
"""
import json
import sys

DEFAULTS = {
    # tax
    "vat_registered": True, "vat_rate": 0.20, "postponed_vat_accounting": True, "vat_threshold_gbp": 0.0,
    # purchase (per order)
    "order_units": 0, "unit_cost_supplier_ccy": 0.0, "packaging_customisation_supplier_ccy": 0.0,
    "fx_gbp_per_supplier_ccy": 0.0, "fx_and_payment_fee_pct": 0.0,
    # import (per order, GBP)
    "freight_insurance_gbp": 0.0, "duty_rate": 0.0, "clearance_brokerage_gbp": 0.0,
    "uk_transport_gbp": 0.0, "inspection_gbp": 0.0, "prep_per_unit_gbp": 0.0,
    "unsellable_rate": 0.0, "contingency_pct_of_landed": 0.0,
    # selling (per unit)
    "selling_price_gbp": 0.0, "promo_discount_pct": 0.0, "promo_fee_per_unit_gbp": 0.0,
    "referral_rate": 0.0, "referral_min_gbp": 0.0, "fulfilment_fee_gbp": 0.0,
    "other_amazon_fees_per_unit_gbp": 0.0, "storage_per_unit_month_gbp": 0.0, "months_in_storage": 0.0,
    "return_rate": 0.0, "resellable_return_frac": 0.0, "return_cost_per_returned_unit_gbp": 0.0,
    "tacos": 0.0, "min_profit_per_unit_gbp": 0.0, "target_margin": 0.0,
    # business
    "monthly_overheads_gbp": 0.0, "monthly_units": 0.0, "one_off_costs_gbp": 0.0,
    "launch_ad_budget_gbp": 0.0, "cash_reserve_gbp": 0.0,
    # timing (days)
    "production_days": 0, "transit_days": 0, "deposit_pct": 0.3, "payout_delay_days": 14, "safety_days": 0,
}
REQUIRED = ["order_units", "unit_cost_supplier_ccy", "fx_gbp_per_supplier_ccy", "selling_price_gbp",
            "referral_rate", "fulfilment_fee_gbp", "monthly_units"]
NEEDS_SOURCE = ["unit_cost_supplier_ccy", "fx_gbp_per_supplier_ccy", "freight_insurance_gbp", "duty_rate",
                "selling_price_gbp", "referral_rate", "fulfilment_fee_gbp", "storage_per_unit_month_gbp",
                "return_rate", "tacos", "monthly_units"]
SHOCKS = {"selling_price_gbp": 0.10, "fx_gbp_per_supplier_ccy": 0.10, "unit_cost_supplier_ccy": 0.10,
          "freight_insurance_gbp": 0.30, "tacos": 0.30, "return_rate": 0.50}


def landed(i):
    """Cost of getting one order to sellable stock."""
    n = i["order_units"]
    goods_spot = n * (i["unit_cost_supplier_ccy"] + i["packaging_customisation_supplier_ccy"]) * i["fx_gbp_per_supplier_ccy"]
    goods = goods_spot * (1 + i["fx_and_payment_fee_pct"])
    freight = i["freight_insurance_gbp"]
    customs_value = goods_spot + freight  # goods + freight + insurance; confirm valuation basis with the broker
    duty = customs_value * i["duty_rate"]
    import_vat = (customs_value + duty) * i["vat_rate"]
    inbound = i["clearance_brokerage_gbp"] + i["uk_transport_gbp"] + i["inspection_gbp"] + n * i["prep_per_unit_gbp"]
    vat_cost = 0.0 if i["vat_registered"] else import_vat  # a real cost only when it cannot be reclaimed
    subtotal = goods + freight + duty + inbound + vat_cost
    total = subtotal * (1 + i["contingency_pct_of_landed"])
    sellable = n * (1 - i["unsellable_rate"])
    return {"goods": goods, "freight_insurance": freight, "duty": duty, "inbound_other": inbound,
            "import_vat": import_vat, "irrecoverable_import_vat": vat_cost, "contingency": total - subtotal,
            "total": total, "sellable_units": sellable, "per_sellable_unit": total / sellable}


def per_unit(i, landed_unit, price):
    """Economics of one shipped unit at a VAT-inclusive list price."""
    vat, reg, r = i["vat_rate"], i["vat_registered"], i["return_rate"]
    up = 1.0 if reg else 1 + vat  # VAT on Amazon fees and ads is a cost only if not registered
    paid = price * (1 - i["promo_discount_pct"])  # the discount reduces price here and nowhere else
    net = paid / (1 + vat) if reg else paid
    referral = max(paid * i["referral_rate"], i["referral_min_gbp"])  # charged on the VAT-inclusive price
    revenue = (1 - r) * net
    costs = {
        "referral_fee": (1 - r) * referral * up,
        "fulfilment_storage_other": (i["fulfilment_fee_gbp"] + i["other_amazon_fees_per_unit_gbp"]
                                     + i["storage_per_unit_month_gbp"] * i["months_in_storage"]) * up,
        "promo_fees": i["promo_fee_per_unit_gbp"] * up,
        "landed_cost_consumed": landed_unit * (1 - r * i["resellable_return_frac"]),
        "returns_handling": r * i["return_cost_per_returned_unit_gbp"] * up,
    }
    pre = revenue - sum(costs.values())
    ads = i["tacos"] * paid * up
    post = pre - ads
    overhead = i["monthly_overheads_gbp"] / i["monthly_units"]
    return {"price_paid_inc_vat": paid, "net_revenue": revenue, "costs": costs,
            "contribution_before_ads": pre, "ads": ads, "contribution_after_ads": post,
            "contribution_margin": post / revenue, "overhead": overhead, "operating_profit": post - overhead,
            "breakeven_ad_cost_per_unit": pre / up,
            "breakeven_acos_inc_vat": pre / up / paid,
            "breakeven_acos_ex_vat": pre / up / (paid / (1 + vat))}


def solve_price(i, landed_unit, target=0.0):
    """List price (inc VAT) at which contribution after ads equals target; TACoS held as a %."""
    def gap(p):
        return per_unit(i, landed_unit, p)["contribution_after_ads"] - target
    lo, hi = 0.01, max(i["selling_price_gbp"] * 20, 100.0)
    if gap(hi) < 0:
        return None
    for _ in range(60):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if gap(mid) < 0 else (lo, mid)
    return hi


def ceiling(i):
    """Screening ceiling: the most a unit may cost and still leave target_margin (contribution after
    ads / net revenue). Needs only the selling side. Negative = the price cannot carry the target."""
    u0 = per_unit({**i, "monthly_units": i["monthly_units"] or 1}, 0.0, i["selling_price_gbp"])
    max_landed = ((u0["contribution_after_ads"] - i["target_margin"] * u0["net_revenue"])
                  / (1 - i["return_rate"] * i["resellable_return_frac"]))
    # goods + freight before duty and irrecoverable import VAT; leaves out clearance, UK transport, inspection, prep
    tax = (1 + i["duty_rate"]) * (1 if i["vat_registered"] else 1 + i["vat_rate"])
    out = {"max_landed_per_sellable_unit": max_landed, "max_unit_cost_supplier_ccy": None,
           "max_goods_freight_per_unit": max_landed * (1 - i["unsellable_rate"]) / (1 + i["contingency_pct_of_landed"]) / tax}
    if i["order_units"] and i["fx_gbp_per_supplier_ccy"]:
        # landed cost is linear in the supplier unit price, so two evaluations of the full model solve it
        a, a1 = (landed({**i, "unit_cost_supplier_ccy": c})["per_sellable_unit"] for c in (0.0, 1.0))
        out["max_unit_cost_supplier_ccy"] = (max_landed - a) / (a1 - a)
    return out


def has_examples(sources):
    return any(str(v).upper().startswith("EXAMPLE") for v in sources.values())


def vat_compare(i):
    """Contribution after ads per shipped unit under both VAT positions, and units a year at the threshold."""
    # ponytail: flips the flag on identical inputs; UK service costs entered VAT-inclusive are not re-based
    no, yes = (evaluate({**i, "vat_registered": v})["unit"]["contribution_after_ads"] for v in (False, True))
    paid = i["selling_price_gbp"] * (1 - i["promo_discount_pct"])
    return {"not_registered": no, "registered": yes, "cost_of_registering_per_unit": no - yes,
            "units_per_year_at_threshold": i["vat_threshold_gbp"] / paid if i["vat_threshold_gbp"] else None}


def cash(i, L, u):
    # ponytail: linear-sales, single-batch cash model; build a dated cash-flow sheet once sales are measured
    daily = i["monthly_units"] / 30.4
    lead = i["production_days"] + i["transit_days"]
    cover = L["sellable_units"] / daily
    temp_vat = L["import_vat"] if i["vat_registered"] and not i["postponed_vat_accounting"] else 0.0
    payout = u["contribution_after_ads"] + u["costs"]["landed_cost_consumed"]  # cash back per shipped unit, ex VAT
    reorder_day = cover - lead - i["safety_days"]
    collected = max(0.0, reorder_day - i["payout_delay_days"]) * daily * payout
    deposit = i["deposit_pct"] * L["goods"]
    roi = u["contribution_after_ads"] * L["sellable_units"] / L["total"]
    cycle = lead + cover
    return {"initial_cash_requirement": L["total"] + temp_vat + i["one_off_costs_gbp"]
                                        + i["launch_ad_budget_gbp"] + i["cash_reserve_gbp"],
            "temporary_import_vat": temp_vat, "days_of_cover": cover, "reorder_due_day": reorder_day,
            "cash_collected_by_reorder": collected, "reorder_deposit": deposit,
            "reorder_funding_gap": max(0.0, deposit - collected), "reorder_batch_cost": L["total"],
            "cash_conversion_cycle_days": i["deposit_pct"] * lead + (1 - i["deposit_pct"]) * i["transit_days"]
                                          + cover / 2 + i["payout_delay_days"],
            "inventory_roi_per_cycle": roi, "cycle_days": cycle, "inventory_roi_annualised": roi * 365 / cycle}


def evaluate(i):
    L = landed(i)
    u = per_unit(i, L["per_sellable_unit"], i["selling_price_gbp"])
    return {"landed": L, "unit": u, "cash": cash(i, L, u),
            "breakeven_price": solve_price(i, L["per_sellable_unit"]),
            "price_for_profit_floor": solve_price(i, L["per_sellable_unit"], i["min_profit_per_unit_gbp"])}


def gbp(x):
    return "n/a" if x is None else f"£{x:,.2f}"


def pct(x):
    return f"{x * 100:.1f}%"


ROWS = [
    ("Landed cost per sellable unit", lambda e: gbp(e["landed"]["per_sellable_unit"])),
    ("Price paid by customer (inc VAT, after promo)", lambda e: gbp(e["unit"]["price_paid_inc_vat"])),
    ("Net sales revenue per shipped unit", lambda e: gbp(e["unit"]["net_revenue"])),
    ("Contribution before ads", lambda e: gbp(e["unit"]["contribution_before_ads"])),
    ("Advertising per shipped unit", lambda e: gbp(e["unit"]["ads"])),
    ("Contribution after ads", lambda e: gbp(e["unit"]["contribution_after_ads"])),
    ("Contribution margin (on net revenue, not mark-up)", lambda e: pct(e["unit"]["contribution_margin"])),
    ("Operating profit after allocated overheads", lambda e: gbp(e["unit"]["operating_profit"])),
    ("Break-even selling price (inc VAT)", lambda e: gbp(e["breakeven_price"])),
    ("Price that meets profit floor (inc VAT)", lambda e: gbp(e["price_for_profit_floor"])),
    ("Break-even ad cost per shipped unit (ex VAT)", lambda e: gbp(e["unit"]["breakeven_ad_cost_per_unit"])),
    ("Break-even ACoS, sales measured inc VAT", lambda e: pct(e["unit"]["breakeven_acos_inc_vat"])),
    ("Break-even ACoS, sales measured ex VAT", lambda e: pct(e["unit"]["breakeven_acos_ex_vat"])),
    ("Inventory ROI per cycle (batch contribution / landed cost)", lambda e: pct(e["cash"]["inventory_roi_per_cycle"])),
    ("Cycle length, order to sold out (days)", lambda e: f"{e['cash']['cycle_days']:.0f}"),
    ("Inventory ROI annualised (simple)", lambda e: pct(e["cash"]["inventory_roi_annualised"])),
    ("Initial cash requirement", lambda e: gbp(e["cash"]["initial_cash_requirement"])),
    ("Reorder batch cost (same size)", lambda e: gbp(e["cash"]["reorder_batch_cost"])),
    ("Reorder deposit due on day (after launch)", lambda e: f"{e['cash']['reorder_due_day']:.0f}"),
    ("Reorder funding gap at deposit", lambda e: gbp(e["cash"]["reorder_funding_gap"])),
    ("Cash conversion cycle (days)", lambda e: f"{e['cash']['cash_conversion_cycle_days']:.0f}"),
]


def load(path, need_cost=True):
    raw = {k: v for k, v in json.load(open(path)).items() if not k.startswith("_")}
    extra = {k: raw.pop(k, {}) for k in ("scenarios", "sources", "sensitivity")}
    scenarios = extra["scenarios"] or {"base": {}}
    for name, d in [("inputs", raw)] + list(scenarios.items()):
        unknown = set(d) - set(DEFAULTS)
        if unknown:
            sys.exit(f"Unknown field(s) in {name}: {sorted(unknown)} - check spelling against DEFAULTS")
    base = {**DEFAULTS, **raw}
    required = REQUIRED if need_cost else ["selling_price_gbp", "referral_rate", "fulfilment_fee_gbp"]
    missing = [k for k in required if not base[k]]
    if missing:
        sys.exit("Missing required inputs: " + ", ".join(missing))
    return base, scenarios, extra["sources"], {**SHOCKS, **extra["sensitivity"]}


def report(base, scenarios, sources, shocks):
    res = {name: evaluate({**base, **ov}) for name, ov in scenarios.items()}
    names = list(res)
    basis = "ex VAT (VAT-registered)" if base["vat_registered"] else "VAT-inclusive (not VAT-registered; import VAT and VAT on fees are costs)"
    print(f"Revenue basis: {basis}. Unit = one shipped unit, returns netted. All figures MODEL.\n")
    print("| Metric | " + " | ".join(names) + " |")
    print("|---|" + "---|" * len(names))
    for label, fn in ROWS:
        print(f"| {label} | " + " | ".join(fn(res[n]) for n in names) + " |")

    ref = "base" if "base" in res else names[0]
    b = {**base, **scenarios[ref]}
    print(f"\nCost build-up per shipped unit ({ref}):")
    for k, v in res[ref]["unit"]["costs"].items():
        print(f"- {k}: {gbp(v)}")
    L = res[ref]["landed"]
    print(f"\nLanded cost of the order ({ref}): " + ", ".join(
        f"{k} {gbp(L[k])}" for k in ("goods", "freight_insurance", "duty", "inbound_other", "irrecoverable_import_vat", "contingency", "total")))
    print(f"Import VAT {gbp(L['import_vat'])}: " + (
        "recoverable; cash effect " + ("none (postponed VAT accounting)" if b["postponed_vat_accounting"] else "temporary outflow, included in initial cash")
        if b["vat_registered"] else "NOT recoverable; included in landed cost"))

    print(f"\nSensitivity of contribution after ads ({ref}), one input at a time:")
    print("| Input | Shock | Low | Base | High |")
    print("|---|---|---|---|---|")
    mid = res[ref]["unit"]["contribution_after_ads"]
    for k, s in shocks.items():
        lo, hi = (evaluate({**b, k: b[k] * f})["unit"]["contribution_after_ads"] for f in (1 - s, 1 + s))
        print(f"| {k} | ±{s * 100:.0f}% | {gbp(lo)} | {gbp(mid)} | {gbp(hi)} |")

    warn = [f"UNSOURCED: {k} has no entry in 'sources'" for k in NEEDS_SOURCE if b[k] and k not in sources]
    c = res[ref]["cash"]
    if c["reorder_due_day"] < 0:
        warn.append("First order covers less than one lead time: the reorder would have to be placed before launch.")
    if has_examples(sources):
        warn.append("'sources' still holds EXAMPLE entries - these inputs are not this product's.")
    if b["launch_ad_budget_gbp"] and not b["tacos"]:
        warn.append("launch_ad_budget_gbp is cash planning only; set tacos or advertising is missing from unit profit.")
    if warn:
        print("\nWarnings:\n" + "\n".join("- " + w for w in warn))
    return res


def selftest():
    i = {**DEFAULTS, "order_units": 1000, "unit_cost_supplier_ccy": 4.0, "fx_gbp_per_supplier_ccy": 0.80,
         "freight_insurance_gbp": 500, "duty_rate": 0.05, "clearance_brokerage_gbp": 100, "uk_transport_gbp": 100,
         "inspection_gbp": 115, "selling_price_gbp": 24.0, "referral_rate": 0.15, "fulfilment_fee_gbp": 3.0,
         "return_rate": 0.10, "resellable_return_frac": 0.5, "return_cost_per_returned_unit_gbp": 1.0,
         "tacos": 0.10, "monthly_units": 304, "production_days": 30, "transit_days": 40, "safety_days": 10,
         "one_off_costs_gbp": 500, "launch_ad_budget_gbp": 300}
    near = lambda a, b: abs(a - b) < 1e-6
    e = evaluate(i)
    assert near(e["landed"]["duty"], 185) and near(e["landed"]["import_vat"], 777)
    assert near(e["landed"]["per_sellable_unit"], 4.20)                 # 3200+500+185+315 over 1000
    assert near(e["unit"]["net_revenue"], 18.00)                        # 0.9 * 24/1.2
    assert near(e["unit"]["contribution_before_ads"], 7.67)             # 18 - 3.24 - 3 - 3.99 - 0.10
    assert near(e["unit"]["contribution_after_ads"], 5.27)
    assert near(e["unit"]["breakeven_acos_inc_vat"], 7.67 / 24) and near(e["unit"]["breakeven_acos_ex_vat"], 7.67 / 20)
    assert abs(e["breakeven_price"] - 7.09 / 0.515) < 1e-4              # 0.515p - 7.09 = 0
    c = e["cash"]
    assert near(c["initial_cash_requirement"], 5000) and near(c["cash_conversion_cycle_days"], 113)
    assert near(c["reorder_due_day"], 20) and near(c["reorder_funding_gap"], 960 - 6 * 10 * 9.26)
    assert near(c["inventory_roi_per_cycle"], 5270 / 4200)
    n = evaluate({**i, "vat_registered": False})                        # not registered: VAT becomes cost
    assert near(n["landed"]["per_sellable_unit"], 4.977) and near(n["unit"]["net_revenue"], 21.6)
    assert near(n["unit"]["costs"]["fulfilment_storage_other"], 3.6)
    p = evaluate({**i, "postponed_vat_accounting": False})              # registered, VAT paid at border then reclaimed
    assert near(p["cash"]["initial_cash_requirement"], 5777) and near(p["landed"]["total"], 4200)
    z = ceiling(i)                                                      # target 0: (5.27 + 3.99) / 0.95
    assert near(z["max_landed_per_sellable_unit"], 9.26 / 0.95)
    t = ceiling({**i, "target_margin": 5.27 / 18})                      # the margin this case earns -> its own costs back
    assert near(t["max_landed_per_sellable_unit"], 4.20) and near(t["max_unit_cost_supplier_ccy"], 4.0)
    assert near(z["max_goods_freight_per_unit"], 9.26 / 0.95 / 1.05)    # registered: only duty sits on top
    nz = ceiling({**i, "vat_registered": False, "order_units": 0})      # stage 2: no order size yet
    assert nz["max_unit_cost_supplier_ccy"] is None
    assert near(nz["max_landed_per_sellable_unit"], 11.112 / 0.95)      # (6.38385 + 4.72815) / 0.95
    assert near(nz["max_goods_freight_per_unit"], 11.112 / 0.95 / 1.05 / 1.2)  # duty then import VAT on top
    v = vat_compare({**i, "vat_threshold_gbp": 90000})                  # unregistered: 21.6 - 3.888 - 3.6 - 4.72815 - 0.12 - 2.88
    assert near(v["not_registered"], 6.38385) and near(v["registered"], 5.27)
    assert near(v["cost_of_registering_per_unit"], 1.11385) and near(v["units_per_year_at_threshold"], 3750)
    print("unit_economics selftest ok")


if __name__ == "__main__":
    args = sys.argv[1:]
    if args == ["--selftest"]:
        selftest()
    elif not args:
        sys.exit(__doc__)
    elif "--ceiling" in args:
        base, scenarios, sources, _ = load(args[0], need_cost=False)
        print("Screening ceiling = the most one unit can cost and still leave target_margin of net revenue "
              "after ads. MODEL from the inputs; a test for a quote to pass, not a profit forecast.\n")
        print("| Scenario | Price inc VAT | Target margin | Max landed cost per sellable unit "
              "| Max goods + freight per unit | Max supplier unit price (supplier ccy) |")
        print("|---|---|---|---|---|---|")
        for n, ov in scenarios.items():
            i = {**base, **ov}
            c = ceiling(i)
            s = c["max_unit_cost_supplier_ccy"]
            print(f"| {n} | {gbp(i['selling_price_gbp'])} | {pct(i['target_margin'])} "
                  f"| {gbp(c['max_landed_per_sellable_unit'])} | {gbp(c['max_goods_freight_per_unit'])} "
                  f"| {'n/a (needs order size, freight, FX)' if s is None else f'{s:,.2f}'} |")
        print("\nMax goods + freight is before duty and any irrecoverable import VAT, and leaves out clearance, "
              "UK transport, inspection and prep. A negative figure means the price cannot carry the target.")
        if has_examples(sources):
            print("WARNING: 'sources' still holds EXAMPLE entries - these inputs are not this product's.")
    elif "--vat-compare" in args:
        base, scenarios, _, _ = load(args[0])
        print("Same inputs under both VAT positions: contribution after ads per shipped unit. MODEL.\n")
        print("| Scenario | Not VAT-registered | VAT-registered | Registering costs per unit | Units a year at the threshold |")
        print("|---|---|---|---|---|")
        for n, ov in scenarios.items():
            c = vat_compare({**base, **ov})
            u = c["units_per_year_at_threshold"]
            print(f"| {n} | {gbp(c['not_registered'])} | {gbp(c['registered'])} | {gbp(c['cost_of_registering_per_unit'])} "
                  f"| {'n/a (set vat_threshold_gbp)' if u is None else f'{u:,.0f}'} |")
        print("\nThreshold units = vat_threshold_gbp / price paid; it ignores refunds and any other taxable sales. "
              "Whether and when to register is a question for the accountant.")
    elif "--json" in args:
        base, scenarios, _, _ = load(args[0])
        print(json.dumps({n: evaluate({**base, **ov}) for n, ov in scenarios.items()}, indent=2))
    else:
        report(*load(args[0]))
