/* Same arithmetic as amazon/amazon-skills/amz-economics/scripts/unit_economics.py
   and amazon/amazon-skills/amz-inventory/scripts/reorder.py.
   Looks nothing up. Example values are illustrative, not live fees. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.AmazonCalc = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const DEFAULTS = {
    vat_registered: true, vat_rate: 0.20, postponed_vat_accounting: true, vat_threshold_gbp: 0,
    order_units: 0, unit_cost_supplier_ccy: 0, packaging_customisation_supplier_ccy: 0,
    fx_gbp_per_supplier_ccy: 0, fx_and_payment_fee_pct: 0,
    freight_insurance_gbp: 0, duty_rate: 0, clearance_brokerage_gbp: 0,
    uk_transport_gbp: 0, inspection_gbp: 0, prep_per_unit_gbp: 0,
    unsellable_rate: 0, contingency_pct_of_landed: 0,
    selling_price_gbp: 0, promo_discount_pct: 0, promo_fee_per_unit_gbp: 0,
    referral_rate: 0, referral_min_gbp: 0, fulfilment_fee_gbp: 0,
    other_amazon_fees_per_unit_gbp: 0, storage_per_unit_month_gbp: 0, months_in_storage: 0,
    return_rate: 0, resellable_return_frac: 0, return_cost_per_returned_unit_gbp: 0,
    tacos: 0, min_profit_per_unit_gbp: 0, target_margin: 0,
    monthly_overheads_gbp: 0, monthly_units: 0, one_off_costs_gbp: 0,
    launch_ad_budget_gbp: 0, cash_reserve_gbp: 0,
    production_days: 0, transit_days: 0, deposit_pct: 0.3, payout_delay_days: 14, safety_days: 0
  };
  const SHOCKS = {
    selling_price_gbp: 0.10, fx_gbp_per_supplier_ccy: 0.10, unit_cost_supplier_ccy: 0.10,
    freight_insurance_gbp: 0.30, tacos: 0.30, return_rate: 0.50
  };

  function landed(i) {
    const n = i.order_units;
    const goodsSpot = n * (i.unit_cost_supplier_ccy + i.packaging_customisation_supplier_ccy) * i.fx_gbp_per_supplier_ccy;
    const goods = goodsSpot * (1 + i.fx_and_payment_fee_pct);
    const freight = i.freight_insurance_gbp;
    const customs = goodsSpot + freight;
    const duty = customs * i.duty_rate;
    const importVat = (customs + duty) * i.vat_rate;
    const inbound = i.clearance_brokerage_gbp + i.uk_transport_gbp + i.inspection_gbp + n * i.prep_per_unit_gbp;
    const vatCost = i.vat_registered ? 0 : importVat;
    const subtotal = goods + freight + duty + inbound + vatCost;
    const total = subtotal * (1 + i.contingency_pct_of_landed);
    const sellable = n * (1 - i.unsellable_rate);
    return {
      goods, freight_insurance: freight, duty, inbound_other: inbound,
      import_vat: importVat, irrecoverable_import_vat: vatCost,
      contingency: total - subtotal, total, sellable_units: sellable,
      per_sellable_unit: total / sellable
    };
  }

  function perUnit(i, landedUnit, price) {
    const vat = i.vat_rate, reg = i.vat_registered, r = i.return_rate;
    const up = reg ? 1 : 1 + vat;
    const paid = price * (1 - i.promo_discount_pct);
    const net = reg ? paid / (1 + vat) : paid;
    const referral = Math.max(paid * i.referral_rate, i.referral_min_gbp);
    const revenue = (1 - r) * net;
    const costs = {
      referral_fee: (1 - r) * referral * up,
      fulfilment_storage_other: (i.fulfilment_fee_gbp + i.other_amazon_fees_per_unit_gbp + i.storage_per_unit_month_gbp * i.months_in_storage) * up,
      promo_fees: i.promo_fee_per_unit_gbp * up,
      landed_cost_consumed: landedUnit * (1 - r * i.resellable_return_frac),
      returns_handling: r * i.return_cost_per_returned_unit_gbp * up
    };
    const pre = revenue - Object.values(costs).reduce((a, b) => a + b, 0);
    const ads = i.tacos * paid * up;
    const post = pre - ads;
    const overhead = i.monthly_overheads_gbp / i.monthly_units;
    return {
      price_paid_inc_vat: paid, net_revenue: revenue, costs, contribution_before_ads: pre, ads,
      contribution_after_ads: post, contribution_margin: post / revenue, overhead,
      operating_profit: post - overhead, breakeven_ad_cost_per_unit: pre / up,
      breakeven_acos_inc_vat: pre / up / paid, breakeven_acos_ex_vat: pre / up / (paid / (1 + vat))
    };
  }

  function solvePrice(i, landedUnit, target) {
    target = target || 0;
    const gap = (p) => perUnit(i, landedUnit, p).contribution_after_ads - target;
    let lo = 0.01, hi = Math.max(i.selling_price_gbp * 20, 100);
    if (gap(hi) < 0) return null;
    for (let n = 0; n < 60; n++) {
      const mid = (lo + hi) / 2;
      if (gap(mid) < 0) lo = mid; else hi = mid;
    }
    return hi;
  }

  function evaluate(i) {
    const L = landed(i);
    const u = perUnit(i, L.per_sellable_unit, i.selling_price_gbp);
    return {
      landed: L, unit: u, cash: cash(i, L, u),
      breakeven_price: solvePrice(i, L.per_sellable_unit, 0),
      price_for_profit_floor: solvePrice(i, L.per_sellable_unit, i.min_profit_per_unit_gbp)
    };
  }

  function ceiling(i) {
    const u0 = perUnit(Object.assign({}, i, { monthly_units: i.monthly_units || 1 }), 0, i.selling_price_gbp);
    const maxLanded = (u0.contribution_after_ads - i.target_margin * u0.net_revenue) / (1 - i.return_rate * i.resellable_return_frac);
    const tax = (1 + i.duty_rate) * (i.vat_registered ? 1 : 1 + i.vat_rate);
    const out = {
      max_landed_per_sellable_unit: maxLanded,
      max_unit_cost_supplier_ccy: null,
      max_goods_freight_per_unit: maxLanded * (1 - i.unsellable_rate) / (1 + i.contingency_pct_of_landed) / tax
    };
    if (i.order_units && i.fx_gbp_per_supplier_ccy) {
      const a = landed(Object.assign({}, i, { unit_cost_supplier_ccy: 0 })).per_sellable_unit;
      const a1 = landed(Object.assign({}, i, { unit_cost_supplier_ccy: 1 })).per_sellable_unit;
      out.max_unit_cost_supplier_ccy = (maxLanded - a) / (a1 - a);
    }
    return out;
  }

  function vatCompare(i) {
    const no = evaluate(Object.assign({}, i, { vat_registered: false })).unit.contribution_after_ads;
    const yes = evaluate(Object.assign({}, i, { vat_registered: true })).unit.contribution_after_ads;
    const paid = i.selling_price_gbp * (1 - i.promo_discount_pct);
    return {
      not_registered: no, registered: yes, cost_of_registering_per_unit: no - yes,
      units_per_year_at_threshold: i.vat_threshold_gbp ? i.vat_threshold_gbp / paid : null
    };
  }

  function cash(i, L, u) {
    const daily = i.monthly_units / 30.4;
    const lead = i.production_days + i.transit_days;
    const cover = L.sellable_units / daily;
    const tempVat = i.vat_registered && !i.postponed_vat_accounting ? L.import_vat : 0;
    const payout = u.contribution_after_ads + u.costs.landed_cost_consumed;
    const reorderDay = cover - lead - i.safety_days;
    const collected = Math.max(0, reorderDay - i.payout_delay_days) * daily * payout;
    const deposit = i.deposit_pct * L.goods;
    const roi = u.contribution_after_ads * L.sellable_units / L.total;
    const cycle = lead + cover;
    return {
      initial_cash_requirement: L.total + tempVat + i.one_off_costs_gbp + i.launch_ad_budget_gbp + i.cash_reserve_gbp,
      temporary_import_vat: tempVat, days_of_cover: cover, reorder_due_day: reorderDay,
      cash_collected_by_reorder: collected, reorder_deposit: deposit,
      reorder_funding_gap: Math.max(0, deposit - collected), reorder_batch_cost: L.total,
      cash_conversion_cycle_days: i.deposit_pct * lead + (1 - i.deposit_pct) * i.transit_days + cover / 2 + i.payout_delay_days,
      inventory_roi_per_cycle: roi, cycle_days: cycle, inventory_roi_annualised: roi * 365 / cycle
    };
  }

  function sensitivity(i) {
    const mid = evaluate(i).unit.contribution_after_ads;
    return Object.keys(SHOCKS).map((k) => {
      const s = SHOCKS[k];
      const lo = evaluate(Object.assign({}, i, { [k]: i[k] * (1 - s) })).unit.contribution_after_ads;
      const hi = evaluate(Object.assign({}, i, { [k]: i[k] * (1 + s) })).unit.contribution_after_ads;
      return { key: k, shock: s, lo, mid, hi };
    });
  }

  function normsInv(p) {
    const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    const plow = 0.02425;
    if (p < plow) {
      const q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    if (p > 1 - plow) {
      const q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    const q = p - 0.5, r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }

  function plan(daily, sdDaily, lead, sdLead, service, onHand, inbound, cover) {
    const z = normsInv(service);
    const safety = z * Math.sqrt(lead * sdDaily ** 2 + daily ** 2 * sdLead ** 2);
    const rop = daily * lead + safety;
    const position = onHand + inbound;
    return {
      safety_stock: safety, reorder_point: rop, inventory_position: position,
      days_until_reorder: (position - rop) / daily, order_now: position <= rop,
      order_quantity: Math.max(0, daily * (lead + cover) + safety - position),
      days_of_cover_now: position / daily, z
    };
  }

  function selftest() {
    const near = (a, b, tol) => Math.abs(a - b) < (tol || 1e-6);
    const i = Object.assign({}, DEFAULTS, {
      order_units: 1000, unit_cost_supplier_ccy: 4, fx_gbp_per_supplier_ccy: 0.80,
      freight_insurance_gbp: 500, duty_rate: 0.05, clearance_brokerage_gbp: 100, uk_transport_gbp: 100,
      inspection_gbp: 115, selling_price_gbp: 24, referral_rate: 0.15, fulfilment_fee_gbp: 3,
      return_rate: 0.10, resellable_return_frac: 0.5, return_cost_per_returned_unit_gbp: 1,
      tacos: 0.10, monthly_units: 304, production_days: 30, transit_days: 40, safety_days: 10,
      one_off_costs_gbp: 500, launch_ad_budget_gbp: 300
    });
    const e = evaluate(i);
    const checks = [
      ["duty", e.landed.duty, 185],
      ["import_vat", e.landed.import_vat, 777],
      ["landed_unit", e.landed.per_sellable_unit, 4.20],
      ["net_revenue", e.unit.net_revenue, 18],
      ["before_ads", e.unit.contribution_before_ads, 7.67],
      ["after_ads", e.unit.contribution_after_ads, 5.27],
      ["acos_inc", e.unit.breakeven_acos_inc_vat, 7.67 / 24],
      ["acos_ex", e.unit.breakeven_acos_ex_vat, 7.67 / 20],
      ["cash", e.cash.initial_cash_requirement, 5000],
      ["cycle", e.cash.cash_conversion_cycle_days, 113],
      ["reorder_day", e.cash.reorder_due_day, 20],
      ["gap", e.cash.reorder_funding_gap, 960 - 6 * 10 * 9.26],
      ["roi", e.cash.inventory_roi_per_cycle, 5270 / 4200]
    ];
    for (const [name, got, want] of checks) {
      if (!near(got, want)) throw new Error(name + " " + got + " != " + want);
    }
    if (Math.abs(e.breakeven_price - 7.09 / 0.515) >= 1e-4) throw new Error("breakeven_price " + e.breakeven_price);
    const p = plan(10, 0, 30, 0, 0.95, 500, 0, 60);
    if (!(p.safety_stock === 0 && p.reorder_point === 300 && p.days_until_reorder === 20 && p.order_quantity === 400 && !p.order_now)) {
      throw new Error("reorder steady " + JSON.stringify(p));
    }
    const q = plan(10, 4, 30, 0, 0.95, 300, 0, 60);
    if (Math.abs(q.safety_stock - 1.6449 * 4 * Math.sqrt(30)) >= 0.01 || !q.order_now) {
      throw new Error("reorder variable " + JSON.stringify(q));
    }
    return "ok";
  }

  return { DEFAULTS, SHOCKS, landed, perUnit, solvePrice, evaluate, ceiling, vatCompare, cash, sensitivity, plan, normsInv, selftest };
});
