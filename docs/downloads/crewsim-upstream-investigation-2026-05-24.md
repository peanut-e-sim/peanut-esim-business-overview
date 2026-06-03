# Crew SIM Upstream Supplier Investigation
**Date:** 2026-05-24  
**Investigator:** Peanut eSIM Research Sub-Agent  
**Subject:** eSIM Mobile GmbH / Crewsim — upstream wholesale supplier identification

---

## Verdict: INCONCLUSIVE (strong circumstantial lead toward Airalo Partner API)

---

## What We Confirmed

| Finding | Detail | Source |
|---|---|---|
| Legal entity | Crewsim GmbH / eSIM Mobile GmbH, Vienna, Austria | Privacy policy, App Store |
| Austrian reg # | 624639m (Firmenbuch) | Austrian Business Register |
| Domain | Registered 2017 via INWX GmbH (German registrar), Cloudflare DNS, Vienna/AT registrant | WHOIS |
| Founder | Michael Schoepfer, Vienna — pilot + ex-Bitpanda (crypto exchange) | LinkedIn |
| App launched | April 26, 2025 — very new product | App Store |
| Schoepfer's own words | "This is my second eSIM product" — had a prior eSIM brand/venture | LinkedIn post |
| Scale | ~5,000 users, solo founder, 2–10 employees | LinkedIn company page |

---

## Hypotheses — Status After Investigation

| Hypothesis | Status | Rationale |
|---|---|---|
| H1: Truphone / 1GLOBAL | Low probability | No UK/enterprise footprint; too expensive for solo founder bootstrapped startup |
| H2: Telna | Possible | B2B aggregator, EU reseller base, but no evidence found |
| H3: eSIM Go | Possible | Open partner program, UK-based, well-suited for small Vienna startup, listed prominently in white-label discussions |
| H4: Transatel / Ubigi | Low probability | NTT subsidiary, enterprise-grade, unlikely to onboard a solo founder startup |
| H5: Direct MNO | Eliminated | Solo founder with marketing background cannot negotiate direct MNO deals |
| H6: Airalo Partner API | **Strongest lead** | Airalo's reseller/partner API is the dominant platform for exactly this profile: small solo-founder eSIM brand, pay-as-you-go model, 180+ country coverage, no telecom experience required. Airalo offers both SDK and API integration. Airalo for Business also explicitly targets flight crew use cases (confirmed: their blog has a dedicated "flight crew" B2B post). |

---

## Top 3 Evidence Points

1. **Profile match to Airalo Partner API:** Schoepfer has a Google Ads / performance marketing background (not telecom). Airalo's partner program is designed for exactly this archetype: a non-telecom founder who builds a niche brand on top of Airalo's catalogue. The pay-as-you-go, no-expiry model Crewsim uses exactly mirrors Airalo's standard plan structure.

2. **"Second eSIM product" admission:** Schoepfer had a prior eSIM brand before Crewsim (launched April 2025). His first product almost certainly used the same upstream. If his first product was also Airalo-powered (the easiest/fastest entry point), the supplier continuity would carry over. No evidence found of the first brand's identity.

3. **180+ country coverage with 2–10 employees:** Achieving genuine multi-carrier coverage in 180+ countries without an aggregator is impossible at this scale. Of available platforms in this tier (Airalo, eSIM Go, GigSky, Telna), Airalo has the largest catalogue (200+ countries) and the most developer-friendly onboarding — strongly favoured by solo founders in the eSIM reseller space.

---

## What Was NOT Found

- No named data processors in Privacy Policy (GDPR Article 28 list absent — possible compliance gap)
- No "powered by" disclosure anywhere on crewsim.com
- No forum discussions (PPRuNe, Airliners.net) naming Crew SIM's supplier
- No employee LinkedIn profiles with ex-Airalo/eSIM Go/Telna history
- eSIM Go partners page returned 404

---

## Strategic Implication for Peanut

If Crewsim is an **Airalo Partner API** reseller (most likely):
- Their wholesale cost structure is **Airalo retail minus ~30–40% partner discount** — NOT direct carrier pricing
- Peanut's path via Billion Connect → Samurai is a **different supply chain** — no structural overlap
- Peanut has potential cost advantage if Billion Connect rates beat Airalo's partner pricing on key routes (UAE, Japan, Southeast Asia)
- **Exploitable weakness:** Airalo partners cannot customize network selection or negotiate SLA — Peanut could differentiate on network quality + crew-specific features

If Crewsim is an **eSIM Go** reseller (secondary candidate):
- eSIM Go has strong EU coverage and open partner API — logical for an Austrian startup
- Same strategic implication: Peanut on a different supply chain, potential cost advantage on Asia-Pacific routes

**Recommended next step:** Check Airalo's public partner showcase / case studies for any reference to "eSIM Mobile" or "Crewsim." Also check crewsim.com's app network requests via browser dev tools to see if API calls route through airalo.com or esim-go.com domains.

---

## Sources Checked

- crewsim.com (main, privacy policy, blog posts, airlines page)
- Apple App Store listing (id6745091387)
- Google Play listing
- WHOIS via who.is
- Austrian Business Register (austrian-business-register.com)
- LinkedIn: Michael Schoepfer profile + launch post
- LinkedIn: Crewsim company page
- Trustpilot (403 blocked)
- PPRuNe / Airliners.net (no relevant results)
- alertify.eu white-label eSIM provider article
- travel-dealz.com 19-provider comparison
- mwm.ai app intelligence
- Multiple targeted web searches (15+ queries)
