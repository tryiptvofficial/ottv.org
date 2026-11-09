# OTTV performance findings

Measured 9 November 2026 on a production build of commit 32303a2, served from localhost:9010, before any audit agents started.

**This is lab data on localhost, not real-world performance.** There is no field data: the live domain returns 402 and no CrUX or Google credentials are configured.

Profile: 375 px mobile emulation, 1.6 Mbps, 150 ms latency, 4x CPU slowdown, cache disabled, median of 3 runs.

| Page | LCP ms | CLS | Blocking time ms* | Tap on menu ms** | JS KB | HTML KB | Image KB | Font KB |
|---|---|---|---|---|---|---|---|---|
| / | 1216 | 0 | 737 | 320 | 267 | 75 | 12 | 61 |
| /pricing | 852 | 0 | 334 | 280 | 267 | 24 | 1 | 61 |
| /iptv-free-trial | 832 | 0 | 276 | 256 | 267 | 21 | 1 | 61 |
| /faq | 816 | 0 | 281 | 248 | 267 | 17 | 1 | 46 |
| /contact | 824 | 0 | 273 | 256 | 267 | 16 | 1 | 61 |
| /locations | 840 | 0 | 327 | 272 | 267 | 23 | 53 | 46 |
| /country/france | 808 | 0 | 261 | 248 | 267 | 19 | 2 | 61 |
| /devices/samsung-tv | 880 | 0 | 282 | 256 | 273 | 20 | 1 | 61 |

\* Sum of long-task time past 50 ms, including the tap below. **Not comparable** with the earlier before/after table, which had no tap and stopped sooner. For that comparison use the figures in `docs/complete-optimization-report.md`.

\** Longest event duration for one tap on "Toggle Navigation". This is a lab probe of a single interaction at 4x CPU slowdown, not INP. INP is a field metric and has not been measured.

The page also fetched about 85 KB of route prefetch data after load (179 KB on /locations).

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Medium | Opening the mobile menu took 248-320 ms under 4x throttling, above the 200 ms INP "good" line if a real low-end phone behaves similarly | table above | Re-measure on the live domain with real users before spending effort; if confirmed, reduce the work done when the menu sheet mounts |
| Medium | Homepage carries the highest main-thread load (737 ms) and 506 KB of uncompressed HTML (75 KB transferred) | table above; `summary.json` | Reduce inline serialized props on the homepage; the size is parsing cost, not download cost |
| Low | /locations prefetches 179 KB because it links to 199 pages | table above | Consider `prefetch={false}` on the country grid |

## What works

LCP was under 1.3 s on all 8 pages and CLS was 0 in this lab profile. All 1,668 images across the site carry dimensions and are served from the site's own image route.

## Not verified

Real-user LCP, INP and CLS; CDN and cache behaviour; real mobile networks; third-party script impact in production.
