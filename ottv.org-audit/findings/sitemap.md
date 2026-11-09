# OTTV sitemap audit (snapshot of production build)

Sources: crawl/sitemap.xml, robots.txt, pages.json, summary.json, html/; generator src/app/sitemap.ts; git log.

## Score: 66/100
Start 100. Deductions: location quality gate tripped with low unique content (-15); all 216 lastmods collapse to one day after a rebrand, with 11 device dates hand-set to 12:00Z, 3 hours after the commit (-10); deprecated priority/changefreq on all 216 entries (-3); historical/non-country entries (-3); minor items (-3). Technical validity is otherwise clean.

## What works
- XML is well-formed (xmllint OK), 216 `<url>`, no duplicates, 35,559 bytes (limits: 50,000 URLs / 50MB).
- summary.json: 216 fetched, all 200; no noindex; no sitemap URL missing from crawl; no indexable crawled page missing from sitemap; no orphans.
- Canonical == sitemap loc for all 216 pages (0 mismatches). All `robots: index, follow`. Homepage loc has no trailing slash and matches its canonical.
- robots.txt declares `Sitemap: https://www.ottv.org/sitemap.xml` (correct host); does not block /country/, /devices/ or the sitemap.
- Generator comment says lastmod is hand-maintained, not build-derived. Country/static lastmod is a constant (`siteContentUpdatedAt = '2026-11-09'`), not `new Date()`.

## Findings

### Critical
None.

### High
1. **Location-page gate tripped: 199 country pages (>=50 HARD STOP; >=30 WARNING).** Evidence: 199 `/country/*` of 216 sitemap URLs (92%). Measured overlap across the 199 pages (visible text incl. shared nav/footer, 4-word shingles): average pairwise Jaccard 0.58 (max 0.78 in a 300-pair sample); only about 13% of a page's 4-grams (median; range 5-33%) appear on no other country page. That is far under the 60% unique-content bar, though the figure includes site chrome, so it overstates the overlap somewhat. Titles and descriptions are unique (dup_titles/dup_desc empty), and pages have 61-755 main words (median 654), so this is not a pure city-swap, but the body is templated. Doorway-page risk. Fix (owner decision, entries are kept): add country-specific content (local channels, local payment/currency, legal note, FAQs) to reach 60%+ unique text per page, or prioritize the top markets and enrich those first. Do not add noindex without owner sign-off, since all 216 must stay.
2. **lastmod is not informative: 205 entries = 2026-11-09T00:00:00.000Z, 11 = 2026-11-09T12:00:00.000Z.** Evidence: sitemap.xml; sitemap.ts constant. Git: baseline 786a533 and rebrand 5d57f12 are both 2026-11-09 03:11, and 32303a2 is 09:05 the same day. The prior per-page dates (2026-11-01/02 statics, device dates 2024-07-18..2024-09-06) were overwritten. Honest in the sense that the rebrand did change the content, but a sitemap where every URL carries one date gives Google nothing to prioritize and risks the field being ignored. Fix: keep the constant, but set it per page group and bump only when that page's content actually changes (e.g. a `lastUpdated` field per country in countries.ts).
3. (see Medium 1 for device date detail.)

### Medium
1. **Device lastmod 12:00:00Z is later than the commit time (09:05Z) that introduced it.** Evidence: how-to.json, 11 identical `"dateModified": "2026-11-09T12:00:00Z"`, previously 11 distinct 2024 dates. Hand-typed, future-dated at commit time, and uniform. Also feeds the Article JSON-LD dateModified, so the same value is claimed there. Fix: use the real date of each guide's last edit; I did not verify whether the rewrite justifies a bump for every guide.
2. **Non-standard country entries in the sitemap**: `/country/east-germany`, `/country/congo-free-state` (defunct states, no ISO code), `/country/kosovo` (user-assigned code xk), `/country/korea` (ambiguous slug), per countryReviewNotes in src/lib/countries.ts. They are internally linked (min inlinks 2). Owner decision: these are likely low-value targets for an IPTV audience.

### Low
1. `<priority>` and `<changefreq>` on all 216 entries are ignored by Google. Also inaccurate: homepage `daily`, device guides `weekly`, yet content changes are rare. Fix: drop both from sitemap.ts (optional; harmless).
2. Single 216-URL file with no index or segmentation. Not required, but splitting into static/devices/countries sitemaps (via `generateSitemaps`) would let Search Console report indexation of the 199 location pages separately and is useful for monitoring the doorway risk.
3. lastmod uses full ISO datetime with `.000Z`; valid W3C Datetime, but date-only values would be more honest where no time is known.
4. robots.txt: GPTBot blocked while ChatGPT-User and other AI bots are allowed; unrelated to sitemap but noted as an inconsistent AI policy. Not a sitemap defect.

## Not verified
- Live domain disabled: no live HTTP check, redirects (www vs apex, http to https, trailing slash), or live robots.txt/sitemap serving and headers.
- Whether the sitemap is submitted or accepted in Search Console; actual indexation of the 199 pages.
- Statuses were taken from the snapshot's pages.json, not re-fetched. No hreflang is present; not assessed as needed.
- Content-uniqueness figure is an approximate shingle-overlap on raw visible text including template chrome, not a boilerplate-stripped measure. The 60% threshold is a heuristic, not a Google rule.
- Whether country-page content (pricing in USD, "French channels") is factually accurate per country.
- The earlier history of lastmod before the baseline commit.
