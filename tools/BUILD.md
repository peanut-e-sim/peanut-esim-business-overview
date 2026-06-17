# eSIM Pricing Explorer — Build & Maintenance

**Live:** https://peanut-e-sim.github.io/peanut-esim-business-overview/tools/pricing-dashboard.html
**Page title:** "Peanut eSIM — Pricing Explorer"
**Purpose:** Compare wholesale eSIM supplier rates (our cost) side-by-side, by country / data size / validity, so we can pick the cheapest direct supply path per destination.

> ⚠️ This is a **cost-comparison** tool (what *we* pay suppliers), not a retail pricing tool.

---

## History (why it's built this way)

- **Originally hand-curated** — supplier prices were typed inline into the HTML. It silently drifted to ~43% coverage and went stale (an audit on 2026-06-10 caught it).
- **Rebuilt 2026-06-10** as a **generated artifact**: a Python script reads the raw supplier catalogs and emits the data, so the dashboard can never silently fall out of sync again. **Never hand-edit the price data in the HTML.**
- **2026-06-17** — added **eSIM Go** and **Telna** as suppliers (this doc written same day).

---

## Architecture

```
source catalogs (vault 04-Pricing-Supply/)        build-pricing-data.py            outputs
─────────────────────────────────────────   ──>   parse + normalize + join   ──>   pricing-data.json  (inspection / future fetch)
 eSIM-Access-Price.csv          (EA, USD)          key = country|data|validity        const DATA  + const FLAGS  (patched inline into the HTML)
 Samurai-Wifi-Wholesale-CNY.xlsx (Sam, CNY)
 eSIM-Go-Rate-Sheet-...xlsx     (EGo, USD)
 Telna-Connect-Flex-Products.csv (Telna, USD)
```

- The dashboard reads its data from the **inline `const DATA`** block (no network fetch). `pricing-data.json` is the same data dropped to disk for inspection.
- `SEARCH_INDEX` and `FLIGHTS` in the HTML are **hand-curated** (airport/city aliases, Emirates routes) and are **NOT** regenerated — the patcher only touches `DATA` and `FLAGS`.

### Files
| File | Role |
|---|---|
| `build-pricing-data.py` | The generator. Reads the 4 source files, writes `pricing-data.json`, and (`--patch`) rewrites `const DATA`/`const FLAGS` in the HTML. |
| `pricing-dashboard.html` | The app. UI + inline data. Supplier display is driven by the `const SUP` registry. |
| `pricing-data.json` | Generated data snapshot (~3 MB). |
| `validate-pricing-data.py` | Sanity checks on the generated data. |

---

## Data model

**Single** (per-country plan) — *illustrative placeholder values, not real rates*:
```json
{ "s":"EGo", "c":"Japan", "d":"10GB", "gv":10.0, "sp":"Fixed data",
  "pd":0, "v":30, "p":0.00, "n":"Japan 10GB/30d", "t":"S" }
```
`s`=supplier code · `c`=canonical country · `d`=data label · `gv`=GB value · `sp`=speed/type · `pd`=pre-activation days · `v`=validity days · `p`=**price USD (our cost)** · `n`=raw SKU name · `t`=type tag.

**Bundle** (multi-country) — *illustrative placeholder values*:
```json
{ "name":"Global Bundle-1 GB 5 Days", "supplier":"Telna",
  "covers":["Canada","Colombia", ...], "skus":[{ "s":"Telna","b":"...","d":"1GB","v":5,"p":0.00,"n":"..." }] }
```

The cross-supplier join key is **ISO2 → one canonical country name**, so the same country lines up across suppliers.

---

## Suppliers

| Code | Name | Currency | Source | Parser | Notes |
|---|---|---|---|---|---|
| `Sam` | Samurai | **CNY → USD** | `Samurai-Wifi-Wholesale-CNY.xlsx` | `build_sam()` | Day-tiered. Settlement CNY ÷ `FX_CNY_PER_USD`. Single-country for ~23 countries; rest via bundles. |
| `EA` | eSIM Access | USD | `eSIM-Access-Price.csv` | `build_ea()` | USD pass-through. Broadest single coverage. |
| `EGo` | eSIM Go | USD | `eSIM-Go-Rate-Sheet-Standard-CONFIDENTIAL.xlsx` (sheet **Standard - Fixed**) | `build_esimgo()` | Each country row carries 8 GB tiers (1/2/3/5/10/20/50/100 GB). Region rows (ISOCode with `;`) → bundles. `pd` unknown from sheet → set 0. |
| `Telna` | Telna | USD | `Telna-Connect-Flex-Products.csv` | `build_telna()` | Connect Flex catalog. ISO3 lists → ISO2. MB → GB. Mostly multi-country bundles. |

### ⚠️ FX caveat (read before trusting Samurai margins)
`FX_CNY_PER_USD = 7.149` in `build-pricing-data.py` is a **labeled placeholder** (auditor-derived from a settlement sample, **not contractual**). Every Samurai USD figure scales linearly with it. Correct it to the real contractual rate in **one line** and re-run.

### ⚠️ Validity-mismatch caveat
Samurai plans are **day-tiered** (cheapest SKU is usually 1-day); eSIM Access / eSIM Go fixed bundles are often 7–30 days. A cheap 1-day Samurai price is **not** value-equivalent to a 30-day plan. Compare like-for-like validity before declaring a "win." See `04-Pricing-Supply/samurai-wins-vs-esimaccess-above1gb-2026-06-10.md`.

---

## How to add a new supplier

1. Drop the raw catalog into the vault `04-Pricing-Supply/`.
2. In `build-pricing-data.py`: add a path constant, write `build_<x>()` returning `(singles, bundles)` in the schema above (convert currency to USD; map countries to ISO2; use `canon_name()` / `data_label()` / `money()` helpers), and call it in `main()`.
3. Add the source filename to the `meta.source` list.
4. In `pricing-dashboard.html`: add a checkbox (`id="sup<X>"`), add an entry to the `const SUP` registry (label, `tag`, `color`, `colorClass`, `textColor`), and add it to `supChecks`. Add a `.tag-<x>` CSS rule. **No other code changes** — all render sites read from `SUP` via `supMeta()`.
5. Rebuild + deploy (below).

---

## Rebuild & deploy

> 🔒 **The repo is PUBLIC and the deployed page is password-encrypted** (eSIM Go's sheet is CONFIDENTIAL). Two files exist:
> - `pricing-dashboard.source.html` — unencrypted working master, **gitignored, local only** (build script patches THIS).
> - `pricing-dashboard.html` — the **staticrypt-encrypted** artifact that GitHub Pages serves. Committed. Visitors must enter the password to view; the data is ciphertext in source.
> - `pricing-data.json` is **gitignored** (plaintext data — never published).

```bash
cd ~/code/peanut-esim-business-overview/tools
python3 build-pricing-data.py            # regenerate pricing-data.json + counts (reads vault catalogs)
python3 build-pricing-data.py --patch    # rewrite const DATA/FLAGS in pricing-dashboard.source.html (.bak written)
# encrypt the source -> the served file (password set out-of-band; do NOT hardcode it here)
STATICRYPT_PASSWORD='<password>' npx staticrypt pricing-dashboard.source.html -d /tmp/sc_out --short
cp /tmp/sc_out/pricing-dashboard.source.html pricing-dashboard.html
grep -q '"s":"EGo"' pricing-dashboard.html && echo "LEAK — do not commit" || echo "encrypted OK"
git add tools/pricing-dashboard.html tools/build-pricing-data.py tools/BUILD.md tools/.staticrypt.json
git commit -m "pricing: <change>" && git push   # GitHub Pages auto-deploys
```
- Password gate via **staticrypt** (AES; `.staticrypt.json` holds only a salt, no password). Current password is held by the founders, not in this repo.
- Deps: `openpyxl`, `pycountry` (`pip install --user openpyxl pycountry`); `staticrypt` via `npx`.
- The live URL uses a `?v=<ts>` cache-buster — bump it when sharing after a deploy.
- **Never `git add` `pricing-dashboard.source.html` or `pricing-data.json`** — they contain confidential plaintext (enforced by `tools/.gitignore`).

---

## Known limitations
- Data is a **snapshot**, not a live feed (re-run after exporting fresh catalogs).
- Samurai FX is a placeholder (see above).
- eSIM Go `pd` (pre-activation window) and Telna `pd` are not in their sheets → stored as 0.
- eSIM Go currently ingests the **Standard - Fixed** sheet only; Unlimited / Long-Duration sheets are not yet parsed (Long-Duration regional bundles are a future add).
- Telna catalog is small (10 products) and bundle-heavy.
