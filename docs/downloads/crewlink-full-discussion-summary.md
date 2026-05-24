# CrewLink eSIM — Full Discussion Summary
*From day one (2026-05-21) to 2026-05-24. Compiled from Claude Code session transcripts by Researcher sub-agent.*

---

## Quick context for Claude native app readers

Balraj Singh Kalra (Dubai, UAE) and Akito (Japan-based co-founder) are building a travel eSIM brand called **Peanut eSIM** (brand name still TBD as of 2026-05-24; "Peanut" is a working codename). The core thesis: Emirates cabin crew are frequent travelers who complain in Facebook groups about which eSIM to use — Balraj and Akito spotted that pain and decided to build a crew-specific eSIM app instead of competing head-on in the generic travel-eSIM mass market. The business is structured as a Delaware LLC, white-labeling eSIM inventory from a wholesale aggregator via API, and wrapping it in a crew-centric brand with a signature schedule-upload feature and a planned community-intelligence layer. As of 2026-05-24, the company is mid-Phase 0 (validation), no code shipped to production, no revenue, legal entity not yet filed, brand name not yet locked.

The dominant working platform is **Claude Code (Anthropic CLI)** running in the Antigravity IDE. Balraj does all planning and builds with Claude. The GitHub org is **peanut-e-sim**, public repo at **peanut-e-sim.github.io/peanut-esim-business-overview**. All downstream decisions are tracked as "Open Discussion" cards on that site. Every session across all Claude Code conversations feeds into the same memory system, which is how continuity is maintained.

---

## Timeline of decisions and pivots

| Date | Event | What it replaced / why |
|---|---|---|
| 2026-05-21 | Project started — Balraj dumps context to Claude | First articulation of the eSIM idea, inspired by Akito |
| 2026-05-21 | Akito's name corrected (was "Hikito") | Misheard on first description; immediately fixed in memory |
| 2026-05-21 | Working name locked as **Peanut eSIM** | Placeholder — cute, bilingual-friendly; decision pending final name |
| 2026-05-21 | React Native + Expo locked as tech stack | Evaluated against Flutter and native Swift/Kotlin; cross-platform wins for small team |
| 2026-05-21 | UAE incorporation rejected → Delaware LLC | TDRA regulatory gray area + Stripe UAE blocks SIM merchants |
| 2026-05-21 | Supplier identified as **Samurai Wifi** (Akito's contact) | Starting point for aggregator diligence |
| 2026-05-21 | 40% flat margin + CNY pricing flagged as suspicious | Implies Samurai is a sub-reseller, not Tier-1 |
| 2026-05-21 | eSIM Access account opened; compared against Samurai | Samurai was *cheaper* on some routes — theory partially reversed |
| 2026-05-21 | eSIM Go disqualified — explicitly blocks UAE users | Per eSIM Go's own rate sheet: "no eSIM should be sold in UAE without a license" |
| 2026-05-21 | Day-1 wedge: original lean was "better price" | Changed after Crew SIM research |
| 2026-05-21 | GitHub org created, public repo, GitHub Pages enabled | First deployment; bilingual EN/JP from day one |
| 2026-05-21 | Thesis articulated: crew-first vertical, eSIM as wedge | Changed positioning from "travel eSIM brand" to "crew vertical platform" |
| 2026-05-21 | Crew Recs feature spec'd (Michelin layer) | iOS Share Sheet as contribution mechanic — idea from Balraj |
| 2026-05-21 | Like-only + Peanut Points reward system spec'd | No dislikes; data redemption as reward |
| 2026-05-21 | Crew Accommodation feature spec'd | Layover hotel intelligence; crew-specific amenity checklist |
| 2026-05-21 | AI Support tab spec'd | In-app chat; 24/7, AI-first, escalate to human |
| 2026-05-22 | Akito intel: "Global WiFi is Samurai's upstream" | Filed; led to research investigation |
| 2026-05-22 | Crew SIM deep-dive completed | eSIM Mobile GmbH, German, pilot-founded, ~5K users, pay-per-MB |
| 2026-05-22 | Day-1 wedge revised: **schedule-upload** (not price) | Crew SIM has no such feature; it's defensible and crew-specific |
| 2026-05-22 | Airalo + Holafly competitor teardown completed | 11-section document with real iOS screens and 12 moves |
| 2026-05-22 | Full plan audit: 25 items → 102 items + 6 cross-cutting | Phase 3-7 fully fleshed for the first time |
| 2026-05-22 | Role split formalized: Balraj = system, Akito = face | Affects every future task assignment |
| 2026-05-22 | Plan tier naming locked: Economy → Cockpit + Refuel | Aviation cabin-class metaphor |
| 2026-05-22 | Samurai upstream initially thought to be Vision Inc. | Akito's intel re: Global WiFi / Vision Inc. |
| 2026-05-24 | Samurai upstream corrected to **Billion Connect** (HK) | Data analysis of Samurai's own price file (5,294 rows showing "Billion Connect Carrier") |
| 2026-05-24 | Vision Inc. link to eSIM **refuted** for eSIM product | Vision Inc. = Global WiFi = Samurai's pocket-WiFi upstream only, not eSIM |
| 2026-05-24 | Sub-agent architecture established | Coder + Researcher + Banana Coder + GitHub Coder + Akito's Assistant + Baru's Assistant |
| 2026-05-24 | Sonnet 4.6 for sub-agents confirmed | 3-5× faster, ~5× cheaper; Opus stays on main thread |

---

## Section 1: The Thesis

**How it started:** On 2026-05-21, Balraj opened a new Claude Code session with: *"I'm starting a new project and I would really want you to understand the context and the details about my project."* He then delivered a voice dump explaining that Akito (initially transcribed as "Hikito" due to mishearing — corrected early in the session) had met a business owner in Thailand who runs an eSIM aggregator. Akito proposed: let's white-label this, brand it for the UAE market, target Emirates crew as our seed users.

The original framing was simple: travel eSIM brand → Emirates crew as distribution channel. Claude initially accepted this framing and discussed it in those terms.

**The pivot:** Partway through Phase 0, Balraj clarified: *"the entire idea came from seeing which eSIM should I use threads in Emirates crew Facebook groups."* This shifted the framing fundamentally. It's not a travel eSIM brand that happens to market to crew. It's a **crew-first vertical** where eSIM is the entry product.

**The actual thesis (as articulated by Balraj):**
1. Crew are DXB-based, fly 4-8 layover destinations monthly, have data needs at every stop
2. They form closed communities (Facebook groups, WhatsApp) where they ask about eSIMs constantly — that's the demand signal
3. eSIM data is the wedge product; crew-curated travel intelligence is the moat
4. Closed gating (crew-only) creates quality and exclusivity — direct parallel to Crew SIM's own gating mechanic
5. Network effect: every crew member who joins makes the platform more valuable for the next

**Long-term arc:** Phase-by-phase airline expansion: Emirates → Etihad → JAL/ANA → other carriers. Each airline unlocked after reaching critical crew mass at the previous one.

**Revenue stages:**
- Stage 1: eSIM data sales (margin on aggregator wholesale)
- Stage 2: Subscription plans once user base justifies recurring pricing
- Stage 3: Merchant referrals and discount commerce on community recommendations

---

## Section 2: Brand Identity Journey

**Working name: "Peanut eSIM"** — established 2026-05-21 as a placeholder. Balraj wanted something cute and bilingual-friendly. Claude accepted it and started building everything under that name.

**Brand naming session (2026-05-22):** With the plan audit done, Balraj raised the naming question. Claude generated two rounds of suggestions:

*Round 1 — Japanese-inspired:*
- **Sora** (空, sky) — top lean from Claude
- Tabi (旅, travel), Yuki (journey), Hoshi (star), Sorana, Torabi, Esobi

*Round 2 — Invented/abstract:*
- **Yonder** — "the place in the distance"
- Aerie, Volo, Glide, Slipstream, Wayve, Passé, Tether, Navi, Wandl, Crew

Balraj also raised Japanese café/restaurant names as inspiration: "Bocasu / Bonsai / Café / Sushi / something like this."

**None were locked.** The brand name is Decision 00 on the live site's Open Discussion board, marked as a blocker for Phase 1 Items 1, 2, 3 (LLC filing, trademark, domains).

**What changed in the repo naming:** The GitHub org and public site still say "Peanut eSIM" but the plans document on the site already says "CrewLink" — the name Claude used in a spec document created on 2026-05-22. Whether CrewLink is the actual final name has not been confirmed by Balraj. The memory files continue to refer to "Peanut eSIM" as the working name.

**Starnet:** Mentioned in the mission brief for this summary as a name that was considered. Not found in the session transcripts reviewed — may have been a brief discussion that predated the formal Claude Code sessions.

**Trademark situation for "Crew SIM":** Balraj asked whether "Crew SIM" is trademarked (2026-05-22). Claude's assessment: the wordmark "Crew SIM" is descriptive (two generic words) so direct word-mark trademark protection is difficult. They likely hold a stylized logo trademark, not the words themselves. Relevance: Peanut eSIM can use "crew" in its brand without necessarily infringing on Crew SIM's trademark.

---

## Section 3: The Supplier Story

This is the most technically complex thread in the project. It evolved through multiple pivots over three days.

### The starting point: Samurai Wifi

Akito's contact in Thailand gave him an introduction to **Samurai Wifi** — a Japan-based brand operated by BS Mobile. Originally a pocket-WiFi rental brand for Japanese outbound tourists. In 2026 they offer eSIM reseller packages.

Balraj uploaded Samurai's wholesale price list to Claude on 2026-05-21 — a file called `Purchase goods and price information(CHY).xlsx`. Key observations Claude made immediately:
- **9,091 SKUs** — enormous catalog for a small Japanese brand
- **Priced in CNY (Chinese Yuan), not Thai Baht** — wrong for a "Thailand-connected" company
- **Perfectly flat 40% margin across ALL rows** — Settlement price is exactly 60% of Retail on 8,093 of 9,087 rows

Claude's initial interpretation: *"The flat 40% is the textbook signature of a Tier-3 sub-reseller of eSIM Access (Redtea Mobile's wholesale arm)."* This became the "40% markup issue" and was filed to memory so it could be recalled any time.

### Theory 1: eSIM Access as Samurai's upstream (refuted)

The Deep Research report on aggregators said the CNY pricing + flat margin was "almost certainly" the signature of eSIM Access. Claude accepted this and opened an eSIM Access account to compare pricing.

**Plot twist (2026-05-21):** When Balraj shared the eSIM Access price file (`Price.csv`, renamed `eSIM-Access-Price.csv`), the 3-way comparison showed:

| Country | Samurai (settlement) | eSIM Access (wholesale) | Winner |
|---|---|---|---|
| Japan 5GB/30d | $2.57 | $2.70 | Samurai |
| USA 5GB/30d | $2.64 | $3.31 | Samurai by $0.67 |
| Indonesia 5GB/30d | $2.57 | $2.70 | Samurai |

Samurai was **cheaper** than eSIM Access on multiple routes. The eSIM Access sub-reseller theory was substantially weakened. Claude acknowledged the error honestly: *"The data tells a different story than the Deep Research predicted."*

### eSIM Go disqualified (2026-05-21)

When Balraj downloaded eSIM Go's rate sheet, it contained an explicit warning: *"To comply with local telecoms regulations and the terms of our agreement with du, no eSIM, for any country or region, should be sold within the geographical boundary of the UAE without a license."* eSIM Go was disqualified as a primary supplier for UAE sales. Kept for intel.

### Theory 2: Vision Inc. / Global WiFi as Samurai's upstream (Akito's intel, 2026-05-22)

On 2026-05-22, Balraj relayed: *"by the way global wifi is the supplier for samurai wifi from japan."* Akito provided this intel based on his knowledge of the Japanese travel connectivity industry.

Claude's immediate response: *"Huge intel — that completely changes the supply-chain map we had. Saving immediately."* A recommendation was drafted: launch with Samurai, plan migration to Vision Inc. / Global WiFi directly.

**BUT** — this was later found to be partially wrong.

### The final answer: Billion Connect (HK) — confirmed 2026-05-24

A Researcher sub-agent analyzed Samurai's price file at the column level. In the `eSIM Recharged Product` sheet, column **"Matching Carrier"** = `"Billion Connect Carrier"` on **5,294 rows**. Zero mentions of Vision Inc. anywhere in the eSIM file.

Separate finding: Samurai's own legal page (特定商取引法) says 屋号 = *"SAMURAI WiFi powered by Global WiFi"*. This is real — but it describes Samurai's **pocket-WiFi device rental** business. Global WiFi / Vision Inc. IS the upstream for that product line. It was incorrectly extrapolated to the eSIM product line. Akito's intel was correct but applied to the wrong product.

**Verified supply chain (as of 2026-05-24):**
```
MNOs (carriers) 
    ↓
Billion Connect (HK) — API aggregator, consumer brand "BC eSIM"
    ↓
Samurai Wifi / BS Mobile (Japan) — ~40% markup
    ↓
Peanut eSIM (us) — if we stay with Samurai
```

**BD contact for Billion Connect:** Cecilia Hsin Cheng, Singapore office.

**The margin math (confirmed):**
| Cost | USA 10GB/7d |
|---|---|
| Samurai settlement (what we pay) | $3.61 |
| Billion Connect direct (estimated) | ~$2.50 |
| After Apple IAP + Stripe on $6.04 retail with Samurai | Net: $0.44 (7%) |
| Same sale via direct Billion Connect | Net: ~$1.55 (26%) |
| Difference per sale | +$1.11 |
| Annual difference at 1,000 sales/month | +$13,320/year |

**Strategy (2026-05-24):** Reach out to Billion Connect directly (Cecilia Hsin Cheng). Open eSIM Go + Telna accounts in parallel as leverage. Vision Inc. outreach reframed as Japan-market partnership play, not margin-recovery play.

### Other providers contacted:
- **eSIM Access** — account opened 2026-05-21, rate sheet compared, Samurai cheaper on some routes
- **eSIM Go** — rate sheet obtained, disqualified for UAE sales
- **Telna Connect Flex** — account opened, 10-row sample only, not full catalog; Africa bundle very expensive
- **Maya Mobile** — website failed to load
- **1GLOBAL (formerly Truphone)** — partnership form submitted using `balraj@exceed-re.ae` (gmail rejected); powers Revolut, Jazeera Airways; awaiting response
- **BNESIM** — also found to block UAE users per research

---

## Section 4: The Pricing Model

### Plan tier naming (locked 2026-05-22)

Aviation cabin-class metaphor. Crew understand instantly. The plan tiers and pricing (from the plans spec document):

| Tier | Price | Data | Notes |
|---|---|---|---|
| **Economy** | $3–7/trip | 1 GB, 3-day validity | Pay-as-you-go, one country, no renewal |
| **Roster Bundle** | $22–55/month | Varies by schedule | Signature feature; OCR roster upload; 15-20% discount vs buying individually |
| **Premium Economy** | $24/month | 10 GB pool | 50% carryover of unused data |
| **Business** | $34/month | 15 GB pool | 75% carryover; most popular subscription tier |
| **First** | $44/month | 20 GB pool | 100% carryover, indefinite, up to plan max |
| **Cockpit** | $249/year | ~15 GB/month equivalent | Annual commitment; saves $50+ vs monthly Business |
| **Refuel** | $1.99–2.99/GB | Add-on | Top-up for any tier |

### Refund policy — 6-scenario framework

Designed specifically for eSIM's unusual refund dynamics (digital delivery, instant activation, carrier-dependent connectivity):

| Scenario | Policy |
|---|---|
| Purchased but not installed | Full refund within 30 days |
| Installed but never used | Full refund within 7 days |
| Installed, used, connectivity failed | Full refund — carrier failure is our problem |
| Installed, used, underperformed | Partial refund or credit at support discretion |
| Roster Bundle — itinerary changed | Pro-rated credit for unused countries |
| Subscription mid-cycle cancel | Remaining days as account credit |

### The Apple tax problem

A significant portion of Phase 1 planning was about this. Apple takes 30% of all in-app purchases. On a $6.04 plan:
- Apple takes $1.81
- Stripe takes $0.18
- Samurai settlement: $3.61
- Net: $0.44 (7%)

**Three escape paths evaluated:**
1. **Web-first checkout** (Netflix model): first purchase on peanutesim.com, app handles activation only. Keeps 100% margin on first sale. Apple has been cracking down on "thin wrapper" apps that steer off-platform.
2. **IAP for everything**: simple, Apple-compliant, but crushes margin — especially at Samurai rates
3. **Hybrid**: first purchase web, top-ups via IAP (smaller, less frequent transactions). This is what Netflix, Spotify, Amazon Kindle do. Claude's recommendation leaned here.

Decision 01 on the Open Discussion board. Not yet locked — pending Akito alignment.

---

## Section 5: The Wedge Feature

### Original lean: "better price"

On Day 1, the initial competitive positioning was to undercut Airalo, Holafly, and Crew SIM on price. Given Samurai's wholesale rates and a targeted 20-25% margin, Peanut could in theory price 10-20% below Crew SIM on most destinations.

### Why that changed

Crew SIM research (2026-05-22) showed their pricing is already at $1.50/GB on most major destinations — competitive with Airalo. Trying to undercut by 10-20% would not be a meaningful differentiator. Additionally, price is the easiest thing to copy; any competitor can drop price.

**The revised wedge: schedule-upload / Roster Bundle.** The insight: crew don't want to shop for eSIMs country-by-country. They get their monthly roster from Crew Pulse and want one click to buy data for all of next month's destinations. Crew SIM has nothing like this. Their solo founder team can't build it fast. And it's genuinely crew-specific — no generic travel eSIM brand would ever build OCR for Crew Pulse.

This was independently confirmed by the Airalo/Holafly teardown, which listed "Calendar-first search, not country-first" as move #6 in its 12 actionable recommendations for Peanut.

**New positioning:** *"Built around your roster, by people who know your airline."*

### Technical spec for the OCR engine (Phase 3 Item 5)

From two real Crew Pulse screenshots shared by Balraj:
- App: "Crew Pulse" — Emirates' official crew/roster app
- Format: monthly calendar grid, 7 columns Mon-Sun
- Each cell: day number + 3-letter IATA airport code + icon (flight/day-off/standby)
- Background color encodes pairing: purple = active trip, white = day off, gray = standby
- Emirates crew are DXB-based — almost every trip ends at DXB (home). DXB legs don't need eSIM

**Smart-plan engine logic:**
1. Drop all DXB legs
2. Group remaining days into layovers (outbound → destination → return to DXB)
3. Estimate data needs by layover duration (2GB for 24h, 5GB for 36h, 10GB for longer)
4. Match to aggregator catalog
5. Output: full-month bundle, total price, savings vs à la carte

**Privacy decision:** Decision 09 — OCR should run on-device only. Roster data reveals Emirates operational information (routes, schedules, timing). Never upload raw roster screenshots to Peanut servers.

---

## Section 6: The Moat

Three community-intelligence features spec'd by Balraj on 2026-05-22. All filed to memory, awaiting Phase 2 Item 5 integration.

### Crew Recs (the Michelin layer)

**Flow:** Crew at a restaurant → opens it in Safari/Google Maps → taps iOS Share Sheet → Peanut eSIM appears as share target → modal opens with URL prefilled + place name auto-detected → add category, rating (airplane icons, not stars), photos, notes → posted to crew database.

**Discovery side:** Browse by country/city → Crew Recommendations section → filter by category → see photos + ratings + crew notes + last-visited timestamp.

**Like-only mechanic:** No dislikes — keeps community positive. Likes accumulate as **Peanut Points**. 100 likes = 1 GB free data. Top contributors get badges + bonus multipliers.

**Why this is a moat:**
- iOS Share Extension is rare — most consumer apps don't ship it
- Crew-only verified posts prevent Yelp-style degradation
- Cross-airline ecosystem (once we expand to Etihad/JAL/ANA, the database is universal)
- Free data costs us <$0.50/GB at wholesale — effectively a marketing expense

**Tech notes:** iOS Share Extension (React Native library or native module), Google Places API for canonical deduplication, image storage on S3/Cloudflare R2, points ledger + redemption API.

### Crew Accommodation

**The problem:** Emirates assigns crew to specific hotels at each layover city. Crew can't choose the hotel, but they can prepare if they know what to expect. Today this knowledge is scattered across WhatsApp groups.

**Feature:** Dedicated bottom-nav tab. Per hotel: crew-contributed photos, amenity checklist (dryer, iron, closet, quiet rooms, blackout curtains, 24h gym, pool, restaurant hours, WiFi quality, transport distance), and auto-generated pre-trip checklist ("You're staying at Hilton Narita next week. Tips from 12 crew: bring extra hangers, gym closes at 11pm…").

Same like-only + Peanut Points mechanics as Crew Recs. Backend extends the Places table with amenity-checklist structure.

### AI Support Tab

**Feature:** Persistent Support tab or floating help button. AI chat for: eSIM installation walkthroughs, top-up questions, connectivity issues, Crew Recs questions, refund/cancellation.

**Stack decision:** Custom GPT via Claude/OpenAI API for v1 (most flexible, ~$0.10-0.50/conversation). Migrate to Intercom Fin at scale (Phase 5+).

**Why it differentiates:** Crew SIM has email/ticket support only. Crew work red-eyes — they can't wait 8 hours for a reply.

---

## Section 7: Competitive Landscape

### Crew SIM (direct competitor)

**Company:** eSIM Mobile GmbH (Germany). Founder/CEO: Michael Schoepfer, a real commercial pilot. Team: likely solo or near-solo (his name appears 5× on the About page).

**Scale:** Claims 5,000+ crew, 180+ countries, 30+ airline partnerships. App: v2.0.4 (1 May 2026), 30 ratings, 5.0 stars.

**Pricing model:** One global credit balance, pay-per-MB, no expiry on credit. Rates:
- $1.50/GB tier: USA, UK, Thailand, Japan, EU, Hong Kong, New Zealand
- $2-2.50/GB: Australia, Vietnam, Singapore
- $3+/GB: UAE ($3.42!), Brazil, India, South Korea, Canada
- $4-5/GB: China, Japan, Mexico (on higher plans)

**Key finding:** Crew SIM DOES sell eSIMs that work in UAE (at $3.42/GB via du/Etisalat) — they've routed around the regulatory block. How remains unclear; worth diligence.

**Weaknesses Peanut can exploit:**
1. No schedule-upload — crew must shop country-by-country
2. No crew travel intelligence layer
3. Solo team = slow product velocity
4. Pay-per-MB creates anxiety; crew may prefer predictable per-trip pricing
5. Broad paid advertising, not embedded in Emirates Facebook groups
6. B2B distraction (chasing enterprise airline contracts = slower consumer product)

**Strengths that are hard to beat:**
- Pilot-founder credibility (trust in crew community)
- Single-balance model is genuinely clever
- 30+ airline partnerships for distribution
- Already routed around the UAE regulatory issue

### Airalo

Market leader, ~1,500-2,000 SKUs, most coverage, per-country fixed plans. App Store: mature, well-reviewed. Weaknesses per Trustpilot: support is slow, install instructions unclear for less tech-savvy users.

### Holafly

Unlimited daily plan model, higher prices. Does not disclose data throttling clearly — a Trustpilot complaint pattern. Targets leisure travelers.

### The Airalo/Holafly teardown

A full 11-section competitive intelligence document was built on 2026-05-22 with real iOS screens, verbatim copy, pricing comparisons, IA maps, and Trustpilot analysis. File: `/Users/a44/Downloads/peanut esim /competitor_research/Airalo_Holafly_Teardown.html` (local only, not on public repo).

The teardown's "12 moves for Peanut" list includes:
- Calendar-first search (move #6) — validates the schedule-upload thesis independently
- Honest network quality disclosure (move #1)
- One-click roster import (move #7, same idea)
- Sub-$1/GB Japan plans as a hook

---

## Section 8: Legal + Financial Architecture

### Why Delaware (not UAE)

**The three killers for UAE incorporation:**
1. **TDRA regulatory gray area**: Travel-eSIM resellers occupy a gray zone under UAE telecom law. TDRA can reclassify them as telecom providers requiring a license at any time. Airalo was silently blocked in UAE in July 2024 — no announcement, no appeal.
2. **Stripe UAE explicitly blocks SIM merchants**: "SIM cards / prepaid stored-value telecom products" are on Stripe UAE's restricted business list. Account suspension + MATCH list = permanent ban from Stripe globally.
3. **Tax change**: UAE introduced 9% corporate tax on income above AED 375K (~$102K) effective June 2023. Free zones get 0% only if they meet strict "Qualifying Activity" tests — which eSIM reselling likely doesn't pass.

**Why Delaware LLC wins:**
- 0% federal corporate tax on non-US sourced income for foreign-owned LLC
- Stripe US access (best payment processor in the world)
- Legal framework used by Airalo, Saily, Nomad, most consumer eSIM brands
- Annual compliance: Form 5472 + 1120 pro-forma (disclosure only, ~30 minutes, no tax owed)
- Delaware franchise fee: $300/year flat

**Structure specifics:**
- Multi-member LLC (Balraj + Akito both as members) once the founder agreement is signed
- Until then: single-member LLC with Balraj as sole owner
- **US address**: Vivek Badu (a friend/associate of Balraj in Texas) to provide registered agent/mailing address
- **Filing method**: Stripe Atlas ($500 flat, includes EIN + Mercury bank + operating agreement template + Stripe US)
- **Banking**: Mercury US business bank account

### Tax obligations for Balraj (UAE resident owning a US LLC)

This was one of the most important education moments in the sessions. Balraj asked: "We don't pay any tax but it's just formalities that we need to do so we just need to file the required form once a year just to show that we are doing business. There is no tax that we are filling out?"

Claude confirmed: yes, that's correct, with one precision — Form 5472 doesn't ask about revenue or operations. It specifically asks about **money moving between you (the owner) and the LLC** (capital injections, loans, distributions). Analogy used: it's like a customs declaration — you fill it even when you have nothing to declare. The penalty for NOT filing is $25,000/year, which is the only reason it matters.

### Partnership structure

**Decision 15** (locked as lean, pending Akito alignment): **50/50 equity split.**

Rationale: Balraj brings dev + ops + design time. Akito brings the Samurai/supplier contact + the Emirates crew network access. Both inputs are hard to value precisely → 50/50 removes the awkwardness.

**Decision 14** (lean captured): **$20K budget ceiling** — the stop-line for re-evaluation, not a target spend. Phase 0-2 setup estimated at $8-12K. Break-even reached at roughly $15K-$25K total.

**Capital split approach** (Decision 15, pending Akito): 50/50 — each contributes $10K or equivalent sweat equity.

### ITIN requirement

Both Balraj and Akito will need Individual Taxpayer Identification Numbers (ITINs) for the Form 5472 + 1065 filing — required for foreign persons who have no Social Security Number but are members of a US partnership/LLC filing with the IRS.

### The Form 1065 implication

When two members are in the LLC, it files as a partnership (Form 1065, not the single-member 5472/1120 combo). This adds some complexity — a K-1 is issued to each member. Still zero US tax on UAE-resident members' shares of foreign-sourced income.

### Payment architecture

All customer payments go: Customer → Stripe US → Mercury US → wire transfer to founders as needed. No UAE bank in the primary chain. Stripe US explicitly works for eSIM/telecom resellers (as opposed to Stripe UAE).

---

## Section 9: Role Split (Balraj vs Akito)

Formalized on 2026-05-22 after Balraj gave the clearest articulation yet: *"my job is to make the system work, the business work. I'm the mastermind. Akito's job is to show, to run the business, basically do the marketing and make sure what kind of plan structure we have."*

| Domain | Owner |
|---|---|
| Tech build (React Native + AI tooling) | Balraj |
| Operations (admin dashboard, support runbook, KPIs) | Balraj |
| Legal structure (Delaware LLC, ToS/Privacy/Refund, IP) | Balraj |
| Financial structure (Mercury, Stripe, bookkeeping, CPA, tax) | Balraj |
| Aggregator API integration and pricing engine | Balraj |
| Risk register + unit economics + runway modeling | Balraj |
| Marketing campaigns + paid ads (Instagram, TikTok) | Akito |
| Brand voice + creative direction | Akito |
| Plan structure & pricing decisions | Akito (user-facing insight) |
| Emirates crew Facebook groups + word-of-mouth | Akito |
| Samurai relationship management | Akito |
| Future airline outreach (Etihad, JAL, ANA) | Akito |
| Press / media / influencer / Harikai partnership | Akito |

**The Harikai opportunity:** @crew_illust on Instagram — friend of both founders, aviation-themed illustrator with a meaningful crew following. Free assets + cross-promotion. Balraj's lean: deep engagement (custom illustrations across app + social). To be driven by Akito. Not yet confirmed.

---

## Section 10: Tech Build

### Stack decision (locked 2026-05-21)

**React Native + Expo.** One codebase → iOS App Store + Google Play + web. Airalo itself runs on React Native (validated use case). Trade-off: fancy native iOS-only animations would require bridging; not a concern for v1.

### Scaffold created (2026-05-22)

A background Coder sub-agent bootstrapped the RN + Expo project at `/Users/a44/peanut-esim-app/`:
- 12 placeholder screens with navigation working
- Design tokens from Stitch-generated design language applied
- Stripe payment integration stubs
- TypeScript, Metro bundler boots without errors

### eSIM installation without Apple Carrier Entitlement

A key technical discovery: Apple's `esimsetup.apple.com` Universal Link can be used to install eSIMs without the full Carrier Entitlement. The carrier entitlement is needed for deep in-app management (carrier settings UI, deep network control). But for **activate eSIM from a QR code / activation code**, the Universal Link flow works on day 1. This means:

- **Day 1**: Use `esimsetup.apple.com` Universal Link for eSIM installation. No carrier entitlement needed.
- **6-12 months post-launch**: Apply for Apple Carrier Entitlement (needs 6+ months live app, real reviews, meaningful volume).

Apple reviews for carrier entitlement: (a) legitimate connectivity business, (b) mature app with real reviews and privacy policy, (c) meaningful volume, (d) existing Apple or carrier relationship. Airalo took ~3 years. Saily faster via a carrier partnership.

### Stitch design system

Google Stitch was used to generate the mobile app UI design. Three Stitch ZIP exports were produced and integrated into a working HTML demo:
- `stitch_peanut_esim_style_guide.zip` (9 screens)
- `stitch_peanut_esim_style_guide-2.zip` (26 screens, added Crew Recs, Rewards, Support, Crew Accommodation)
- `stitch_peanut_esim_style_guide-3.zip` (updated Smart Plan Result + Calendar confirmation)

Live demo URL: **https://peanut-e-sim.github.io/peanut-esim-business-overview/app-demo/**

### Key design decisions from Stitch sessions

- No emoji flags — use Lottie silk-waving flag animations (Nattu Adnan's set on LottieFiles, confirmed for USA, UK, India, Japan)
- City skyline/landmark images for destination cards, not flags in the plan browser
- **Airplane ratings** (Material Symbols `flight` icon, tilted -45° in peanut brown) replace star ratings everywhere in the community features
- Generic aircraft silhouette — NOT Emirates' logo (IP risk)
- Calendar CTA on Smart Plan Result: "Save 12 flights to calendar" → iOS calendar integration

---

## Section 11: Disagreements + Pivots Balraj Raised

This section captures every meaningful correction or course change Balraj initiated.

| Date | What Balraj said | What changed |
|---|---|---|
| 2026-05-21 09:39 | "its akito by the way" | Corrected the name from "Hikito" which Claude had been using. Fixed in memory and HTML immediately. |
| 2026-05-21 09:45 | "All the things that you are answering, why don't you answer it in a stable form? It's very easy to understand." | Claude was writing prose paragraphs; switched to tables for all decisions/comparisons. Saved as global preference. |
| 2026-05-21 10:08 | "you're moving too fast. I have told you a million times that I want each and everything step by step. Why are you giving me one, two, three, four, five?" | Claude kept listing multiple items per message. Balraj stopped it. |
| 2026-05-21 13:02 | "start working" (when Balraj went to the car) | Clarified that Claude can't work autonomously — only acts when messaged. Important for understanding Claude's limitations. |
| 2026-05-21 14:37 | "you didnt add questions to emirates crew under akito task why?" | Claude acknowledged a real miss — CSS was added but the HTML for the textarea inputs was never shipped. |
| 2026-05-21 14:49 | "yeah so just 40%, right? Where is the problem?" | Balraj pushed back on Claude's alarm about the margin. Led to the full cost-stack walkthrough showing Apple IAP + Stripe decimates gross margin. |
| 2026-05-21 (plot twist) | After seeing eSIM Access prices, Samurai was cheaper on some routes | Claude had to reverse its confident "40% markup theory." Explicitly said: "The data tells a different story." |
| 2026-05-22 09:23 | "the country flags are just emoji stamps. I would rather use better refined flags" | Triggered the Lottie flag animation research |
| 2026-05-22 09:31 | "the flags are still not good. You know it's very like an AI-made vibe." | Pushed to abandon Stitch-generated flags entirely; use a real flag library |
| 2026-05-22 09:33 | "I want to see the flags first. Can you open Rectangular Official flags first?" | Active direction of the research |
| 2026-05-22 09:33 | "can we use any motion graphics or 3D moving flags, like waving flags with a kind of a velvet or silk kind of texture?" | Discovered Lottie silk flags by Nattu Adnan |
| 2026-05-22 12:12 | "by the way global wifi is the supplier for samurai wifi from japan" | Akito's intel — led to Vision Inc. theory, later refuted 2026-05-24 |
| 2026-05-22 07:44 | "the entire session, whatever we are discussing, I feel like I should have implemented the planning mode first" | Claude pushed back: "it's not too late, but I don't think a separate plan file would help much — the live site already IS the plan." Balraj accepted this. |
| 2026-05-24 | Billion Connect confirmed as Samurai's actual upstream | Overturned the Vision Inc. theory from 2026-05-22. Claude explicitly tracked this as a refutation in memory. |

---

## Section 12: Currently Active Workstreams (as of 2026-05-24)

| Item | Status | Owner |
|---|---|---|
| Aggregator diligence — 8 providers in pipeline | In progress | Balraj |
| Billion Connect direct outreach | Just initiated | Balraj |
| 1GLOBAL partnership inquiry | Submitted, awaiting callback | Balraj |
| Brand/entity name decision | Open — Decision 00, blocks Phase 1 | Balraj + Akito |
| Founder agreement | Open — Decision 06, blocks equity + entity | Balraj + Akito |
| Delaware LLC filing via Stripe Atlas | Blocked on name decision | Balraj |
| Akito crew interview questionnaire | Live on site (Akito tab), ready to send | Akito |
| Crew SIM competitive profile | Completed locally, not on public site | Both |
| Airalo/Holafly teardown | Completed locally, not on public site | Both |
| App demo (v3.1) | Live at GitHub Pages URL | Balraj (Coder agent) |
| RN/Expo app scaffold | Created locally | Balraj |
| Stitch design language v3 | Exported, in demo | Balraj |
| Upstream supplier verification report | Completed 2026-05-24 | Researcher sub-agent |
| Vision Inc. outreach email (Japan partnership framing) | Drafted, pending Akito send | Akito |
| Beta recruitment brief | Live on Akito tab | Akito |
| Plans + refund policy document | Published on site | Both |
| P&L scenarios (3 models) | Published on site | Balraj |
| Risk register | Published on site (HTML) | Both |
| Delaware LLC how-to guide | Published on site | Both |
| Billion Connect BD outreach email | Drafted 2026-05-24 | Balraj |

---

## Section 13: Open Questions Balraj Should Think About

| Question | Why it matters |
|---|---|
| What is the final brand name? | Blocks LLC filing, trademark, domains, App Store listings. Has been an open question since 2026-05-21. |
| Is "CrewLink" the name or just a spec placeholder? | The plans document uses "CrewLink" but Balraj hasn't confirmed it. |
| Should we go direct to Billion Connect first, or launch with Samurai while negotiating? | A staged approach (launch Samurai, migrate) was the recommendation but hasn't been confirmed by Balraj. |
| When does Akito send the Vision Inc. / Global WiFi email? | Reframed as Japan-market partnership play, not margin investigation. Akito should send soon. |
| What are the crew interview results telling us? | No interviews have happened yet — Akito still needs to run them. This is the primary real-world validation still pending. |
| TDRA contingency: if UAE blocks Peanut like it blocked Airalo in 2024, what's the plan? | Three mitigations in risk register: stay below radar, supplier diversification, contingency plan. Need to decide the contingency plan concretely. |
| How does Crew SIM sell UAE eSIMs? | They sell at $3.42/GB via du/Etisalat. This means a route around the regulatory block exists. Understanding how they do it could open the same route for Peanut. |
| Should the Schedule-Upload feature ship in v1 or v1.x? | It's the wedge differentiator AND the riskiest tech piece. Shipping it in v1 is high-risk-high-reward; v1.x is safer but delays the moat. |
| Should Crew Recs ship in v1, v1.x, or v2? | Currently plotted for Phase 7 (post-scale) but Balraj noted it "could ship in v1.x." |
| Apple Developer Account — individual or organization? | Must be Organization (not Individual) to represent a business entity. Blocked on entity name anyway. |
| Harikai illustrator partnership — when to approach him? | After brand strategy lock (Phase 2 Item 1). Should be driven by Akito. |
| Who is the US CPA? | Item 14 on Phase 1 — no provider selected. Consider Bench.co + a Delaware-specialist CPA. |
| What bookkeeping tool? | Decision 17 lean = QuickBooks Online (Balraj's self-reported familiarity) but not locked. |

---

## Appendix A: Key File Locations

### Public repo (GitHub Pages)

| What | URL |
|---|---|
| Main site | https://peanut-e-sim.github.io/peanut-esim-business-overview/ |
| App demo | https://peanut-e-sim.github.io/peanut-esim-business-overview/app-demo/ |
| Plans & refund policy | https://peanut-e-sim.github.io/peanut-esim-business-overview/docs/downloads/plans-and-refunds.html |
| Delaware LLC guide | https://peanut-e-sim.github.io/peanut-esim-business-overview/docs/downloads/delaware-llc-how-to.html |
| P&L scenarios | https://peanut-e-sim.github.io/peanut-esim-business-overview/docs/downloads/pl-scenarios-2026-05-24.html |
| Risk register | https://peanut-e-sim.github.io/peanut-esim-business-overview/docs/downloads/risk-register.html |
| Crew interview script | https://peanut-e-sim.github.io/peanut-esim-business-overview/docs/downloads/crew-interview-script.html |
| Akito questionnaire builder | https://peanut-e-sim.github.io/peanut-esim-business-overview/docs/downloads/akito-crew-questionnaire-builder.html |
| Pricing benchmark (MD) | https://peanut-e-sim.github.io/peanut-esim-business-overview/docs/downloads/pricing-benchmark-2026-05-24.md |

### Local files (NOT on public repo — internal only)

| File | What it contains |
|---|---|
| `/Users/a44/Downloads/peanut esim /Samurai-Wifi-Wholesale-CNY.xlsx` | Samurai's full 9,091-SKU wholesale price list in CNY |
| `/Users/a44/Downloads/peanut esim /eSIM-Access-Price.csv` | eSIM Access's wholesale catalog |
| `/Users/a44/Downloads/peanut esim /eSIM-Go-Rate-Sheet-Standard-CONFIDENTIAL.xlsx` | eSIM Go rate sheet (note: blocks UAE users) |
| `/Users/a44/Downloads/peanut esim /Telna-Connect-Flex-Products.csv` | Telna's sample catalog (10 rows only) |
| `/Users/a44/Downloads/peanut esim /Competitor_Pricing_Benchmark.xlsx` | 22-destination × 4-competitor benchmark |
| `/Users/a44/Downloads/peanut esim /upstream-supplier-verification-2026-05-24.md` | Billion Connect confirmation report |
| `/Users/a44/Downloads/peanut esim /competitor_research/Airalo_Holafly_Teardown.html` | Full Airalo + Holafly teardown with 12 moves |
| `/Users/a44/esim-uae/crewsim-competitive-profile.html` | Full Crew SIM competitive profile |
| `/Users/a44/esim-uae/emirates-roster-reference/roster-sample-1.jpeg` | Real Crew Pulse screenshot (Aug 2024) |
| `/Users/a44/esim-uae/emirates-roster-reference/roster-sample-2.jpeg` | Real Crew Pulse screenshot (Jul 2025) |
| `/Users/a44/esim-uae/message-to-akito-margin-context.html` | Casual EN/JP note explaining 40% issue to Akito |
| `/Users/a44/esim-uae/stitch-prompts-crew-recommendations.html` | Stitch prompts for R0-R8 (7 new feature screens) |
| `/Users/a44/peanut-esim-app/` | React Native + Expo app scaffold |

---

## Appendix B: Named Sub-Agents

All sub-agents run in background with `run_in_background: true`, use Sonnet 4.6 (except complex synthesis which uses Opus 4.7), and report back to the main thread.

| Sub-agent | Scope | Trigger phrase |
|---|---|---|
| **Coder** | Build new HTML/CSS/JS pages from explicit specs | "build this page", "create the X page", "push to github" |
| **Researcher** | Web research, data analysis, competitor intel, 3-tier tool selection (WebSearch → Firecrawl → Playwright+Gemini) | "verify X", "research Y", "what's the data on Z" |
| **Banana Coder** | Browser-based Gemini image/video generation via Playwright | "generate images via Gemini", "delegate to banana coder" |
| **GitHub Coder** | Summarize chat decisions → clean HTML pages → commit + push to business-overview repo | "update GitHub", "summarize this for GitHub", "github coder" |
| **Akito's Assistant** | Akito-facing tasks: questionnaires, brand briefs, marketing prep, recruitment scripts, JP-language prep | "delegate to Akito's assistant", "prepare for Akito" |
| **Baru's Assistant** | Balraj-facing tasks: legal-step prep, financial models, ops checklists, tech architecture decisions | "delegate to Baru's assistant", "prepare for me" |

**Research tool hierarchy for Researcher agent:**
| Depth | Tool | Time |
|---|---|---|
| Quick fact-check | WebSearch + Firecrawl scrape | <2 min |
| Medium dive | Firecrawl crawl + WebFetch | 5-10 min |
| Deep investigation | Playwright → drives Google Gemini Deep Research (must verify account = balrajsinghkalra@gmail.com first) | 10-30 min |

---

*Compiled from 42 session files spanning 2026-04-07 to 2026-05-24. Core eSIM content concentrated in sessions from 2026-05-21 to 2026-05-24. Memory file count: 14 eSIM-specific project/feedback files. Total source material: ~1,100 messages in primary session (3a0db8b5) alone.*
