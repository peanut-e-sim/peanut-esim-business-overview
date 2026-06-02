# Tab 20 (Carryover Liability) — Discussion Notes (2026-06-02)

These are the conversation points that must be captured in the Tab 20 blueprint + visualizer when built.

## Core concept (the one-sentence answer)
"How much data do we OWE users that hasn't been used yet — and what does that cost us if they redeem it?"

## Per-tier carryover rules (verified)
| Tier | Carry % | Cap | GB Carried/user/mo | $ Liability/user (@ $1.3425/GB) |
|---|---|---|---|---|
| Economy | 0% | — | 0 | $0 |
| Roster Bundle | 0% | — | 0 | $0 |
| Premium Economy | 50% | 1 month | 3 GB | $4.03 |
| Business | 70% | 1 month | 5.78 GB | $7.77 |
| First | 100% | 2 months | 15 GB | $20.13 |
| First Suite | 100% | 2 months | 26.8 GB | $35.99 |
| Cockpit | 100% | annual | 4.8 GB | $6.45 |
| Refuel | 0% | — | 0 | $0 |

## $4.03 breakdown (Premium worked example with Aiko)
1. Pool: 10 GB
2. % Consumed: 40% → 4 GB used
3. Unused: 6 GB
4. Carry %: 50% → 3 GB carried
5. Cost at exact blended ($1.3425/GB): 3 × $1.3425 = $4.0275 ≈ $4.03

## Cost vs revenue clarification
$4.03 = our COST from supplier, NOT selling price. Aiko already paid us $17.99. The $4.03 is the future out-of-pocket we owe supplier if she redeems.

## Rounding note
Sheet uses exact $1.3425/GB blended, not rounded $1.34. That's why per-user figures show .03 not .02. Important for accuracy at scale.

## The 20% redemption rate is a placeholder
- 5% (hoarders): M12 liability at 1K users = ~$25K
- 20% (current): ~$10.5K
- 50% (active): ~$5K
- Reality: crew probably hoard for summer/long-haul months → real rate likely 5-15%
- Model probably under-estimates liability by 2-3×

## First Suite concentration risk
At 100K users with 3% First Suite = 3,000 users × $35.99 = $108K floating liability JUST from this one tier.

## Accounting/investor implications
- Deferred revenue / unfunded service liability
- At 5K users: ~$50K balance sheet liability
- Reduces book equity by that amount
- Should be backed by cash (hold ~$50K liquid)
- Investors WILL ask

## Three policy options to limit carry
| Option | Change | Liability impact |
|---|---|---|
| A. Keep current (1-2 mo carry) | Status quo | $50K at 5K users |
| B. Cap carry at 1 month for ALL | First/Suite from 2mo→1mo | Cuts liability ~30% |
| C. Add 6-month expiry | Old carry auto-expires | Caps total exposure |

Recommendation: Option C — cleanest accounting, can still market "data doesn't expire for 6 months."

## THE PERCEPTION PROBLEM (Balraj's insight)
Even if user is mathematically getting great value, seeing "6 GB unused this month" repeatedly triggers cancel impulse.

### Aiko's downward churn spiral
| Month | What she sees | What she thinks |
|---|---|---|
| Jan | 4 GB used / 6 GB wasted | "I'm only using half" |
| Feb | 4 GB used / 6 GB wasted | "I keep over-paying" |
| March | 4 GB used / 6 GB wasted | "I'm canceling Premium" |

### LTV impact
If display triggers +5% churn (15% vs 10%):
- Avg Premium lifetime: 10mo → 6.7mo
- LTV per Premium user: $134 → $89
- At 5K Premium users (M24): ~$2.7M/yr LTV loss

## THE UX FIX (Option 3 — reframe as savings)
Don't show "unused." Show "savings vs PAYG."

### App display
Instead of: "4 GB used / 10 GB pool / **6 GB unused**" (triggers cancel)

Show: "4 GB used / **You saved $1.97 vs Pay-As-You-Go this month**" (keeps subscribed)

### Math behind the savings number
- If Aiko bought 4 GB as PAYG Refuel: 4 × $4.99 = $19.96
- What she paid for Premium: $17.99
- Savings: $1.97

### Cumulative running total framing
"This year you've saved $23.64 on Peanut vs Pay-As-You-Go" — makes the number feel meaningful.

## THE GIFT DATA IDEA (Balraj's brilliant insight)
Let users gift their CARRYOVER pool (not main pool) to family/colleagues. Three wins at once:
1. **Aiko uses up stored data** → our liability shrinks faster
2. **Recipient experiences Peanut for free** → becomes hot acquisition lead
3. **Aiko feels good** → "I gave mom data" eliminates perception churn

### Economics
- 3 GB gifted = $4.03 COGS we incur (was eventually anyway)
- Recipient potential LTV: $134 if they convert
- 2% recipient conversion rate flips this massively positive

### Implementation rules
| Rule | Why |
|---|---|
| Only from carryover pool (not main) | Prevents reselling/abuse |
| Max 3 gifts/month | Stops grey-market activity |
| Recipient gets 7-day expiry | Forces install and try |
| One-tap from app | Friction kills features |
| Branded confirmation message | "Aiko sent you 1 GB on Peanut" → viral surface |

### Build priority
v1.1 or v1.2 — low engineering cost, high emotional value, self-funding viral acquisition.

## OPEN: UAE REDEMPTION IDEA
Letting carryover GB work in UAE (where crew live). NOT YET EVALUATED in detail.
- PRO: Eliminates "waste" perception entirely
- CON: UAE is where crew spend 70%+ of time → consumption explodes → COGS up massively
- CON: Could turn carryover from $4 liability into $20+ per user
- Verdict: HIGH RISK, would need pool size cuts or price hike to offset

## BALRAJ'S RISK 1 REFRAME — expired margin is real money

Insight: data that DOESN'T carry over = pure margin we keep. User paid for capacity they didn't use; we never paid supplier for it.

Per-plan expired margin (verified math, unused × (1 − carry%)):
| Plan | Unused GB | Carry % | Expired GB | Pure margin/user/mo |
|---|---|---|---|---|
| Economy PAYG | 0 | 0% | 0 | $0 |
| Roster Bundle | 0 | 0% | 0 | $0 |
| **Premium** | 6 | 50% | 3 | **$4.03** |
| **Business** | 8.25 | 70% | 2.48 | **$3.32** |
| First | 15 | 100% | 0 | $0 |
| First Suite | 26.8 | 100% | 0 | $0 |
| Cockpit | 4.8 | 100% | 0 | $0 |

Premium and Business have expired margin. First / Suite / Cockpit at 100% carry have NONE.

## BALRAJ'S "100% CARRY + SHORT EXPIRY" STRATEGY

Marketing says "100% carryover" (sounds generous, no one rejects). Fine print: must be used within X days.

Modeling expiry windows for First Suite (the biggest tier):
| Window | User redemption | Expired GB/mo | Expired margin |
|---|---|---|---|
| 60 days | 80% used | ~5 GB | $6.71 |
| **30 days** | 50% used | ~13 GB | $17.45 |
| 14 days | 25% used | ~20 GB | $26.85 |
| 7 days | 10% used | ~24 GB | $32.22 |

Recommendation: **30 days expiry.** Captures ~50% expired margin (~$17/user Suite), users feel it's fair, low PR risk if exposed.

At 5,000 users mature mix → ~$10,620/mo expired margin → **$127K/year of free margin** from this trick.

Mitigation against backlash: show explicit expiry date in app at top-up time. No "gotcha."

## RISK 2 — SAME-SIM DYNAMIC ALLOCATION (the technical architecture)

Question: when user has 10 GB pool and withdraws 1 GB, does it go on same SIM or new SIM?

Answer: **same SIM, dynamically topped up via supplier API**. This is industry standard (Airalo, Holafly, Crew SIM, eSIM Access all do this).

Flow:
1. User signs up → we provision ONE eSIM profile (e.g., ICCID 8901260...)
2. We pre-load 1 GB (or 0) on it
3. App UI shows full pool balance (10 GB)
4. User taps "load 1 GB" → backend calls supplier API: "add 1 GB to ICCID 8901260..."
5. eSIM gains 1 GB capacity
6. User sees pool decrement in app
7. Supplier bills us when we trigger top-up (matches Option A pay-per-order)

Key benefit: **we only pay supplier when we trigger top-up**, not at signup. 10K signups = $0 supplier cost. Only allocated data gets billed.

UX psychology: pool feels like a savings account user can withdraw from. Strong retention signal.

Caveat: suppliers usually have minimum allocation block (1 GB, 100 MB, or 50 MB). Need to confirm with chosen supplier.

## RISK 3 — UAE REDEMPTION via SAME ARCHITECTURE (Balraj's key insight)

Because of Risk 2's dynamic allocation, carryover ISN'T tied to original travel eSIM. It's a balance in our system. We can route it ANYWHERE — including a fresh UAE-roaming eSIM.

This unlocks 3 carryover redemption channels:
| Channel | What we do |
|---|---|
| Next trip | Allocate to original travel eSIM |
| **UAE (home)** | **Allocate to a UAE-compatible eSIM** |
| Gift to family | Allocate to recipient's country-specific eSIM |

This kills 3 of 4 original UAE concerns:
| Original UAE risk | Status |
|---|---|
| Consumption explodes in UAE | MITIGATED — limited to carryover only (~2-3 GB/mo max) |
| Supplier doesn't support UAE | MITIGATED — route to different profile |
| TDRA regulatory | STILL A RISK — legal check needed |
| Cannibalizes UAE Home Plan | MITIGATED — 2 GB/mo too little to replace local plan |

UAE cost: ~$1.40/GB × 3 GB = $4.20/user/mo. Vs $4.03 expired margin we'd give up. Net trade: $0.17/user/mo for massive UX win.

Marketing: "Premium gives you 10 GB for travel + your leftovers come home with you. Use anywhere — next trip, UAE, or gift to family."

## STRATEGIC RECOMMENDATION (final)

Build all three carryover redemption channels (next-trip + UAE + gift). User picks where to spend. Each channel solves a different problem:
- Next-trip → preserves natural usage
- UAE → drives daily engagement + retention
- Gift → viral acquisition mechanism

Combined with 30-day expiry: maintains "100% carryover" marketing, captures expired margin from unused balances, and turns liability into an engagement engine.

## What needs supplier/legal verification before launch

| Item | Action |
|---|---|
| Supplier UAE-roaming capability | Ask wholesale supplier for UAE rate sheet + ICCID provisioning |
| TDRA regulatory check | Legal consult on resident-using-foreign-eSIM-from-paid-travel-plan |
| Multi-eSIM-per-user technical | Confirm provisioning multiple country-specific eSIMs per user |
| Carry balance tracking backend | Build database to track "balance" vs "allocated" GB by destination |
| Minimum allocation block size | Confirm supplier supports small block sizes (1 GB or below) |

## LOCKED RULES (decided 2026-06-02)

### Universal Carry Rule (Balraj's design)
The carryover pool always stays the same, with its original expiry date intact. The ONLY exception: when upgrading to a plan with a longer expiry window, the existing carry's expiry expands to match the new plan.

| Scenario | What happens |
|---|---|
| Downgrade (Premium → Roster) | Carry keeps original expiry, sits alongside new pool |
| Upgrade with longer expiry (Business → First) | Carry expiry EXPANDS to match new plan |
| Lateral move | No change |
| Cancel + resubscribe | Carry expired during gap, gone |

### Mid-cycle changes
**Option A LOCKED — no mid-cycle refunds.** User finishes paid month. Downgrade takes effect next billing cycle. Industry standard, simpler accounting.

### Expiry notifications
**BOTH LOCKED:**
- 7-day soft reminder: "Your 3 GB Premium carry expires Mar 1 — use it on your next trip!"
- 3-day urgent reminder: same message, urgent styling
- Both push notifications + email (if email opted in)

### Cancellation rule (LOCKED)
**No refund. Gifting is the ONLY exit option for stored carry.**

When Aiko cancels:
- App shows: "You have 3 GB stored. Want to gift it before you go?"
- Option 1: Gift to another user (recipient onboards to Peanut)
- Option 2: Just cancel (carry forfeited, pure margin for us)
- No cash refund. No ghost account.

Why this works:
- Zero refund overhead → clean books
- No ghost account → clean ops
- Forces gifting CTA at cancellation → viral acquisition hook
- If she forfeits → pure margin recovered
- Emotionally positive last moment with brand ("I gave mom data")

### Why these locked rules work
- Predictable liability (each carry has known expiry)
- No gaming possible (can't extend or accumulate)
- Honest UX (user keeps what they earned)
- Simple accounting (each carry bucket tracked separately)
- Notifications drive redemption (reduces liability faster)
- Notifications protect against "expired without warning" complaints
- Cancellation = gift-only exit reinforces viral mechanism

### App UI implication
Pool display must show carry buckets separately:
| Bucket | GB | Expiry |
|---|---|---|
| Current month pool | 5 GB | Feb 28 |
| Premium legacy carry | 3 GB | Feb 15 (10 days left) |
| First legacy carry | 1 GB | Mar 1 (20 days left) |

Use FIFO — burn the soonest-expiring bucket first.

## Strategic queue for Tab 20
- [ ] Decide carry policy: 30-day expiry recommended (vs 60-day or "use immediately")
- [ ] Build perception-fix UX in app (show savings vs PAYG, hide "unused")
- [ ] Build gifting feature in v1.1 or v1.2
- [ ] Build UAE redemption in v1.2 (after supplier validation)
- [ ] Stress-test liability at 5K/100K users with real redemption rate
- [ ] Set cash reserve = monthly carryover liability balance
- [ ] Legal: TDRA consult on UAE redemption mechanic
- [ ] Supplier: ask about UAE rate sheet + multi-eSIM provisioning
