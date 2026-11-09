# OTTV complete website optimization report

Date: 2026-11-09. Branch: `migrate/ottv`, working tree only. Nothing was committed, merged, pushed or deployed.

Page-by-page results for all 216 URLs are in [site-audit-216-urls.csv](site-audit-216-urls.csv).

A check is marked as passed only where a run on the final production build produced the evidence. No page has been tested on the live domain, on a physical device, or with real users. Nothing here predicts rankings or AI citations.

## 1. Verified improvements

### Preservation

| Check on the final build | Result |
| --- | --- |
| URLs in the sitemap | 216 |
| Country URLs | 199 |
| Indexable, self-canonical, HTTP 200 | 216 of 216 |
| Pages deleted, slugs changed, new `noindex`, new redirects | 0 |
| Internal link targets returning 200 | 216 of 216 |

`/iptv-subscription` (301 to `/pricing`) and `/checkout` (`noindex`) are outside the 216 and were already that way.

### Accuracy corrections visitors would have been harmed by

- **Fire TV.** Country pages were steering visitors toward the Fire TV Stick HD (2026). Amazon lists it as running Vega OS, and AFTVnews reports Vega OS sticks do not support the Downloader app or sideloading. Country pages, the FAQ and the guide now say to choose a Fire OS model, and the guide warns about the affected models first.
- **Setup guides.** Corrected app prices (GSE is paid, not free), a wrong website address for SET IPTV, wrong screen and button names on Samsung, LG, Roku and MAG, the Fire TV install order, and VLC's lack of TV-guide support for M3U playlists.
- **Roku.** Added AirPlay for Apple devices and Roku's exclusion of Pixel and Nexus phones.
- **Promises removed.** "24/7 support team", "most effective" VPN claim, "unmatched", "superior", "most reliable", "future-proof", "Risk-Free" heading, and "fix most problems".
- **Device support versus streams.** "Multi-Device Compatibility" is gone. Plan cards, homepage facts, comparison, pricing, free trial and FAQ now state one stream at a time on a standard plan, separately from which devices work.
- **Form description.** The floating contact form said "we'll get back to you shortly". It actually opens WhatsApp, and now says so.

### Other improvements

- Country pages answer availability first, offer the trial directly, and dropped repeated disclaimers and generic FAQs.
- `/locations` is grouped by continent. `/checkout` has one order link per plan, each naming the plan.
- Added "Setup Guides" to the navigation and more guide and help links to the footer.
- Content no longer depends on JavaScript to become visible. The previous animation library rendered it hidden until scripts ran.
- Added `WebPage`, `ContactPage` and `CollectionPage` markup, an Organization description, and cleaner HowTo text.

## 2. Measured performance

Same machine, script and throttling: mobile 375 px, 1.6 Mbps, 150 ms latency, 4× CPU slowdown, median of 3 runs, production build on localhost.

**These are lab figures, not real-world speed.** The "before" run happened while audit agents were active and the "after" run did not, so the timing changes may be partly due to that. Byte sizes are not affected. Interaction to Next Paint could not be measured without real users; Total Blocking Time is only a lab proxy.

| Page | LCP ms | TBT ms | JS KB | HTML KB | Images KB | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 1432 → 1176 | 744 → 479 | 311 → 252 | 69 → 75 | 9 → 9 | 0 → 0 |
| `/pricing` | 992 → 864 | 218 → 121 | 311 → 252 | 22 → 24 | 1 → 1 | 0 → 0 |
| `/iptv-free-trial` | 908 → 844 | 147 → 109 | 311 → 252 | 20 → 21 | 1 → 1 | 0 → 0 |
| `/faq` | 904 → 808 | 170 → 119 | 311 → 252 | 15 → 17 | 1 → 1 | 0 → 0 |
| `/contact` | 908 → 832 | 136 → 96 | 311 → 267 | 15 → 16 | 1 → 1 | 0 → 0 |
| `/locations` | 1112 → 836 | 163 → 146 | 311 → 267 | 76 → 23 | 1 → 53 | 0 → 0 |
| `/country/france` | 952 → 812 | 124 → 102 | 311 → 252 | 21 → 19 | 1 → 2 | 0 → 0 |
| `/devices/samsung-tv` | 956 → 868 | 127 → 95 | 317 → 258 | 19 → 20 | 1 → 1 | 0 → 0 |

Sizes are compressed transfer. The homepage HTML grew by 6 KB because it now holds more content. On `/locations`, flags moved from the HTML to lazy-loaded, cacheable files, so total bytes are similar but the HTML is much smaller.

## 3. Setup guide verification

**Physically tested on a real device: none of the 11 guides.** Each guide page now states that it was checked against vendor documentation and not re-tested on every device or app version.

An independent reviewer compared the corrected text with vendor sources. It found 3 small mismatches, which were corrected with its wording, and flagged 5 further items, also addressed. Counts below are from that review.

| Guide | Matched to a source | Could not be documented |
| --- | --- | --- |
| Fire TV | 9 | 4: store search, install prompts, APK link from OTTV, app login |
| Android | 2 | 4: Smarters listing, login label, auto-load, guide comparison |
| Troubleshooting | 3 | 5: 25–30 Mbps (OTTV's own figure), restart timing, adapter, VPN and ISP traffic, cache slowdown |
| iPhone and iPad | 2 | 6: app screen labels, one-stream rule, guide refresh |
| Windows | 9 | 2: download and install steps, first channel autoplay |
| Mac | 2 | 5: `iptvsmarters.com` failed to load, so the Mac download is unconfirmed |
| Samsung | 8 | 3: MAC shown on opening, field layout, SET in Samsung's store |
| LG | 4 | 4: Smarters on LG, SET on LG, regional availability |
| Apple TV | 4 | 2: app menu labels, App Store navigation |
| Roku | 7 | 3: Roku menu path (now removed), a label, Store app claim |
| MAG | 8 | 3: MAC sticker location, activation on OTTV's server, cause of loading hang |

## 4. `dateModified` consistency

All 11 guides changed materially, so `dateModified` is 2026-11-09. Checked per guide: visible date, `<time>` value, Article JSON-LD and sitemap `lastmod` all match, **11 of 11**. `datePublished` stays in 2024. Country and core pages use the sitemap date 2026-11-09 and also changed today.

## 5. Claims and their evidence

| Claim | Evidence | Status |
| --- | --- | --- |
| Plan prices, per-month figures | `pricing.ts`, consistent everywhere | Owner data; arithmetic verified |
| "Save 19%, 38%, 54%" | Calculated from prices | Verified |
| 25,000+ channels, 120,000+ titles | Source comment says owner-confirmed 2026-11-02 | **Owner-stated, no independent evidence** |
| PPV included, HD and 4K, catch-up, EPG | Site text only | **Owner to confirm** |
| 24-hour trial, no card, full access | Site text only | **Owner to confirm** |
| 7-day money-back guarantee | Site text only; no written terms | **Owner to confirm** |
| One stream at a time, additional connection | One older guide answer | **Owner to confirm** |
| Logins delivered on WhatsApp | FAQ text | **Owner to confirm** |
| APK link supplied by OTTV | Guide text | **Owner to confirm** |
| 25–30 Mbps | OTTV's recommendation, labelled as such | Unverified; Netflix's 15 Mbps for 4K cited for comparison |
| Currency, language, time zone | Unicode CLDR 49 | Verified source |
| Fire TV and Roku market lists | Amazon and Roku documentation | Verified source |

## 6. Customer journeys

Tested in headless Chromium at 375 px and 1366 px on the production build. WhatsApp itself was not used, so no real message was sent and no real order, trial or credential delivery was tested.

| Step | Result |
| --- | --- |
| Discover: homepage to free trial or pricing section | Pass |
| Request trial: WhatsApp link with trial message | Pass |
| Select plan: four plan links naming the plan, from pricing, country pages and checkout | Pass |
| Compare billing terms | Pass, content present |
| Receive credentials | **Not testable**; depends on your team |
| Set up: guide headings, steps, trial and related links | Pass |
| Get help: form validation, errors, opens WhatsApp with the message | Pass |
| Floating contact form loads on demand and returns focus on close | Pass |
| Mobile menu and "Setup Guides" anchor | Pass, after fixing a defect found in testing |
| Locations to country page | Pass |
| Missing page returns 404 with useful links | Pass |
| JavaScript errors during journeys | 0 |

**Without JavaScript**, 10 representative page types show their expected headings, prices, FAQs and links, with no hidden text.

## 7. Accessibility

| Check | Result |
| --- | --- |
| axe-core WCAG 2.0–2.2 A/AA and best practice, 217 pages at 375 px and 11 at 1366 px | 243 violation nodes → **0** |
| Horizontal overflow | 1 page → **0** |
| Skip link first in tab order | Pass |
| FAQ opens by keyboard | Pass |
| Form errors announced and linked to fields | Pass |

Automated tools catch only part of WCAG. No screen reader or human accessibility test was run, so WCAG 2.2 AA conformance is **not** claimed.

## 8. Technical SEO and structured data

| Check | Result |
| --- | --- |
| TypeScript, production build (238 of 238 pages) | Pass |
| ESLint | Pass, 0 errors, 2 warnings in existing files |
| Automated tests | 28 of 28 |
| SEO audit | 216 indexable, 0 errors, 0 warnings |
| Country page check | 199 of 199 |
| Duplicate titles or descriptions, heading faults | 0 |
| JSON-LD parse errors | 0 |
| FAQ markup visible on the page | All |

## 9. How the 9 skills contributed

The scores are the specialists' judgment **before** these changes. They were not re-scored, because raising a score was not the goal.

| Skill and location | Pre-change score | Contribution |
| --- | --- | --- |
| `squad-seo-audit`, `~/.claude/skills/` | 87 (7 of 8; speed 51) | Speed fixes, footer and navigation links, heading changes |
| `schema-review`, `~/.claude/skills/` | 78 | WebPage types, Organization description, HowTo text |
| `content-analysis`, `~/.claude/skills/` | 71 (topic gaps 52) | Login, speed and TV-guide answers, trial-first country pages, checkout order links |
| `aeo-audit`, `~/.claude/skills/` | 77 | Direct answers, question headings, shorter FAQ leads |
| `geo-audit`, `~/.claude/skills/` | 55 (E-E-A-T 28) | Sources cited, entity statement, unsupported-claim list |
| `anthropic-skills:google-seo`, Claude plugin | Checklist | People-first review, Core Web Vitals focus, dates |
| `anthropic-skills:bing-seo`, Claude plugin | Checklist | Title and H1 review. IndexNow and Webmaster setup wait for launch |
| `anthropic-skills:ai-overviews-aeo`, Claude plugin | Checklist | Answer-first structure |
| `anthropic-skills:geo-ai-citations`, Claude plugin | Checklist | Citable facts and source links |

Deviations and gaps: the backlink specialist did not run (Ahrefs plan blocked, domain not live). Audit files were kept in the session scratchpad, not `./seo-reports/`, and consolidated here. `full-audit` was excluded because it only bundles five of these.

Recommendations deliberately rejected: stating that OTTV works in each country, `InStock` markup, a placeholder legal answer, a refund page built from a single sentence, and adding text only to raise word counts.

## 10. Remaining weaknesses

- Country pages remain templates: a median 67.6% of their sentences appear on over 90% of them (was 75.6%). 188 of 197 are distinct with the name masked; 12 pages in 3 groups share every fact.
- The doorway and scaled-content risk is reduced, not removed. Some country pages may not be indexed.
- East Germany and Congo Free State are very thin (about 73 words).
- The homepage is heavy at 507 KB raw.
- Guide steps that depend on third-party apps can go out of date.
- The `framer-motion` package is unused but still listed in `package.json`.

## 11. Issues that could still mislead visitors

- Movie posters and sports leagues on the homepage imply those titles are available.
- TV-brand logos are hotlinked from a third-party demo site, `iptvwell.com`.
- The channel, title, PPV and quality claims are unproven.
- The site does not say whether the service is licensed. It makes no such claim, and it does not address the question.

## 12. Business decisions requiring owner confirmation

1. Do you hold the rights to distribute the channels and titles? What should the site say about licensing?
2. Confirm the channel and title counts, PPV, 4K and catch-up.
3. Confirm the one-stream rule, the additional-connection process and its price.
4. Confirm the trial terms: limits per person and screens allowed.
5. Provide refund conditions and the accepted payment methods.
6. Confirm logins are always delivered on WhatsApp, and how APK links are provided.
7. Which countries do you serve?
8. Provide the legal entity, address, support hours, and any email or social profiles.
9. Review the former-state and naming pages: `east-germany`, `congo-free-state`, `korea`, `burma`, `turkey`, `kosovo`, `holy-see`.
10. Keep or replace homepage posters and brand logos.
11. Should GPTBot stay blocked?
12. Should a `/devices` hub page be added? It would be a new URL, so it was not added.

## 13. Production launch blockers

1. `www.ottv.org` is not serving this build, and old-domain redirects cannot be verified until it does.
2. No Terms, Privacy or Refund pages exist, and they need your facts and legal review.
3. Content-rights legal review.
4. Physical testing of the setup guides on real devices is strongly recommended.
5. A real end-to-end trial and order on WhatsApp has not been done.
6. Field performance and Search Console data do not exist until launch.
7. After launch: Search Console and Bing setup, Change of Address, sitemap submission, IndexNow.
8. This work is still uncommitted.
