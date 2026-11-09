# OTTV visual and mobile findings

Captured 9 November 2026 with Playwright against the production build at localhost:9010, at 1366x768 and 375x812. Screenshots are in `../screenshots/`. The claude-seo renderer refuses localhost, so its own visual output was not used.

| Page | Horizontal overflow | H1 top, desktop / mobile (px) | First actions in view |
|---|---|---|---|
| / | 0 | 271 / 235 | Free trial pill, Get IPTV Free Trial, View Pricing |
| /pricing | 0 | 253 / 201 | Breadcrumb "Home" only |
| /country/france | 0 | 253 / 201 | Breadcrumbs, Start the free trial |
| /devices/fire-tv | 0 | 253 / 230 | Breadcrumb, vendor specification link |
| /locations | 0 | 253 / 201 | Breadcrumb, free trial, WhatsApp |
| /country/east-germany | 0 | 253 / 201 | Breadcrumbs, See IPTV in Germany |

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | /pricing shows no plan or order action on the first screen at either viewport | Only in-page link above the fold is "Home" | Tighten the header area, or put a price summary and plan link in it |
| Low | 17-31 links or buttons per page measure under 24 px in one dimension | Automated count on 12 captures; inline text links are exempt from WCAG 2.5.8, so this is an upper bound | Check the footer and breadcrumb links on a phone |
| Low | Smallest body text on the homepage is 12 px | computed style on `main p` | Raise to 14 px if it carries information |

## What works

No horizontal overflow on any capture. Viewport meta is correct and allows zoom. The homepage shows its offer and both main actions without scrolling.

## Not verified

Real devices, screen readers, and how the pages look with fonts delayed on slow networks.
