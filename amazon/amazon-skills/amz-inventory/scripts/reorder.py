#!/usr/bin/env python3
"""Safety stock, reorder point and order quantity. Stdlib only.

  python3 reorder.py --daily 10 --sd-daily 4 --lead 70 --sd-lead 7 --service 0.95 \
                     --on-hand 600 --inbound 0 --cover 60
  python3 reorder.py --selftest

daily/sd-daily: mean and standard deviation of units sold per day (measured, or labelled ASSUMED)
lead/sd-lead:   days from placing the order to stock being sellable, and its standard deviation
service:        chance of not stocking out during one lead time (0.95 = accept 1 in 20)
cover:          days of sales the new order should last after it arrives
"""
import argparse
import sys
from math import sqrt
from statistics import NormalDist


def plan(daily, sd_daily, lead, sd_lead, service, on_hand, inbound, cover):
    # ponytail: assumes steady, roughly normal daily demand; for seasonal peaks or lumpy sales
    # feed the peak-period daily rate instead of the average
    z = NormalDist().inv_cdf(service)
    safety = z * sqrt(lead * sd_daily ** 2 + daily ** 2 * sd_lead ** 2)
    rop = daily * lead + safety
    position = on_hand + inbound
    return {"safety_stock": safety, "reorder_point": rop, "inventory_position": position,
            "days_until_reorder": (position - rop) / daily, "order_now": position <= rop,
            "order_quantity": max(0.0, daily * (lead + cover) + safety - position),
            "days_of_cover_now": position / daily}


def selftest():
    p = plan(10, 0, 30, 0, 0.95, 500, 0, 60)
    assert p["safety_stock"] == 0 and p["reorder_point"] == 300
    assert p["days_until_reorder"] == 20 and p["order_quantity"] == 400 and not p["order_now"]
    q = plan(10, 4, 30, 0, 0.95, 300, 0, 60)
    assert abs(q["safety_stock"] - 1.6449 * 4 * sqrt(30)) < 0.01 and q["order_now"]
    print("reorder selftest ok")


if __name__ == "__main__":
    if sys.argv[1:] == ["--selftest"]:
        selftest()
        sys.exit()
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    for flag, default in [("--daily", None), ("--sd-daily", 0.0), ("--lead", None), ("--sd-lead", 0.0),
                          ("--service", 0.95), ("--on-hand", None), ("--inbound", 0.0), ("--cover", 60.0)]:
        ap.add_argument(flag, type=float, default=default, required=default is None)
    a = ap.parse_args()
    r = plan(a.daily, a.sd_daily, a.lead, a.sd_lead, a.service, a.on_hand, a.inbound, a.cover)
    for k, v in r.items():
        print(f"{k}: {v if isinstance(v, bool) else round(v, 1)}")
