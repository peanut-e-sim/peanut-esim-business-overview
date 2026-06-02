#!/usr/bin/env python3
"""
Per-GB ladder sanity check — catches tier-pricing inversions that violate the
"higher-priced tier should have BETTER (lower) per-GB rate" invariant.

Added 2026-06-02 after llm-council flagged that the Business $2.00/GB > Premium
Economy $1.90/GB inversion survived a full 22-tab model rebuild without any
automated guard catching it. Five-minute fix per council Executor recommendation.

Reads tier retail + pool from hardcoded values that mirror the Google Sheet
master (README & Assumptions C14:E20). If retail prices or pool sizes change in
the sheet, update SUBSCRIPTION_TIERS below to match.

Subscription tiers (Roster Bundle → First Suite) should form a monotonically
DESCENDING per-GB sequence — i.e., the higher the price tier, the better the
$/GB deal. Cockpit and Economy are excluded from the monotonicity check
because they're different product classes (annual prepay / per-top-up).

Default behavior is WARN-ONLY (exit 0 even on inversion) so the check can be
wired into the pre-commit hook without blocking workflow while the underlying
inversion is still being resolved. Set environment variable
PEANUT_ENFORCE_LADDER=1 to make it strict (exit 1 on inversion).
"""
from __future__ import annotations
import os
import sys

# Mirror of README & Assumptions B14:E20 (Google Sheet master)
# Format: (tier_name, monthly_retail_usd, pool_gb_per_month)
SUBSCRIPTION_TIERS = [
    ('Roster Bundle',   19.95,  5),
    ('Premium Economy', 18.99, 10),
    ('Business',        29.99, 15),
    ('First',           39.99, 25),
    ('First Suite',     49.99, 40),
]

# Cockpit + Economy are excluded — different product class (annual prepay / per-top-up)
# but tracked for transparency
INFO_ONLY = [
    ('Economy (PAYG)',   4.99,  1),  # $4.99/GB by design (per-top-up product)
    ('Cockpit (annual)', 24.92, 12), # $2.08/GB — acceptable since value prop is annual lock-in, not GB efficiency
]


def per_gb(retail: float, pool: float) -> float:
    return retail / pool


def main() -> int:
    print('Peanut eSIM — Per-GB Ladder Sanity Check')
    print('=' * 70)

    rows = []
    for name, retail, pool in SUBSCRIPTION_TIERS:
        rows.append((name, retail, pool, per_gb(retail, pool)))

    print(f"\n{'Tier':<20} {'Retail':>10} {'Pool':>8} {'$/GB':>10}")
    print('-' * 50)
    for name, retail, pool, dollars_per_gb in rows:
        print(f'{name:<20} ${retail:>9.2f} {pool:>5.0f} GB ${dollars_per_gb:>8.2f}')

    # Invariant: per-GB must strictly decrease as we move up the tier ladder
    inversions = []
    for i in range(1, len(rows)):
        prev_name, _, _, prev_per_gb = rows[i - 1]
        name, _, _, cur_per_gb = rows[i]
        if cur_per_gb >= prev_per_gb:
            inversions.append((prev_name, prev_per_gb, name, cur_per_gb))

    enforce = os.environ.get('PEANUT_ENFORCE_LADDER', '') == '1'

    print()
    if inversions:
        verb = 'FAIL' if enforce else 'WARN'
        print(f'{verb}: Per-GB ladder is not monotonically descending.')
        print('Higher-priced tiers should always have a BETTER (lower) $/GB rate.')
        print()
        for prev_name, prev_dollars, name, cur_dollars in inversions:
            print(f'  X  {prev_name} at ${prev_dollars:.2f}/GB '
                  f'is CHEAPER per GB than {name} at ${cur_dollars:.2f}/GB')
            print(f'     Fix options: bump {name} pool size, or reduce {name} retail.')
        print()
        print('See Decision 00C council follow-up item #6 on main site.')
        if enforce:
            return 1
        # Warn-only default: report the inversion but allow the workflow to continue.
        print('(WARN-only mode — set PEANUT_ENFORCE_LADDER=1 to make this blocking)')
        return 0

    print('PASS: Subscription tier per-GB ladder is monotonically descending.')
    print()
    print('Info-only tiers (not checked against ladder — different product class):')
    for name, retail, pool in INFO_ONLY:
        print(f'  - {name}: ${per_gb(retail, pool):.2f}/GB')
    return 0


if __name__ == '__main__':
    sys.exit(main())
