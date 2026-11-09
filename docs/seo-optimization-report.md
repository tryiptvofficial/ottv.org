# OTTV SEO optimization report

> Superseded by [complete-optimization-report.md](complete-optimization-report.md). Its Fire TV device advice and several figures are out of date.

Date: 2026-11-09. Branch: `migrate/ottv`, uncommitted working tree. Nothing was deployed, merged or pushed.

All measurements come from a production build served locally. Nothing here predicts rankings, AI Overview inclusion or AI citations.

## 1. Pages preserved

**216 of 216.** That is 199 country pages, 11 device guides, the homepage and 5 static pages. No page was deleted, redirected or given `noindex`, no slug changed, and none left the sitemap.

Two URLs outside the 216 were already that way and were not touched: `/iptv-subscription` is a 301 to `/pricing`, and `/checkout` is `noindex`.

## 2. Pages improved

| Group | Pages | Change |
| --- | --- | --- |
| Country pages | 197 | Rebuilt from verified regional data |
| Former states | 2 | Truthful history page linking to the present-day country |
| Device guides | 11 | Server-rendered related links, corrected wording |
| Homepage | 1 | Unsupported "Best ... 2026" claim removed from title and H1 |
| `/locations` | 1 | Grouped by continent with H2s and jump links |
| `/faq` | 1 | New two-device answer, contextual links |
| `/pricing` | 1 | Superlative removed from the subtitle |
| `/contact`, `/iptv-free-trial` | 2 | Site-wide changes only |

Site-wide changes reach all 216: factual footer with "formerly IPTVMax", `alternateName` on WebSite, meta keywords removed, manifest descriptions corrected.

## 3. SEO issues fixed

- Country pages repeated the same text with only the name swapped. Each now has its own currency, language, time zone and device content, and a country-specific FAQ.
- Unsupported claims removed: "Best IPTV" in country titles and H1s, "most reliable", "premier", "one of the best".
- Device guide related links loaded only through client JavaScript. They are now in the server HTML.
- Guides said logins arrive by email while the FAQ says WhatsApp. Guides now say "the login details we sent you".
- Four guide photos showed the wrong subject (Fire TV: fireplace, Roku: microphone, LG: CRT, Android: payment terminal). Removed from the pages and the schema.
- `data-ai-hint` attributes removed, Samsung guide sentence fixed.
- `korea` now displays as South Korea, matching its ISO code. The slug is unchanged.
- `llms.txt` now lists plans, guides and the limits of the country pages.
- Regression tests added for the 216 URLs, `noindex`, availability claims and country text.

## 4. Remaining SEO issues

- Country pages still share a lot of text (section 5).
- `/locations` is 506 KB raw and 77 KB gzipped, and `/` is 482 KB and 70 KB, mostly inline flag SVGs and carousels.
- Guide `dateModified` values stay in 2024 because the steps were not re-tested. Changing dates alone would be misleading.
- Four guides have no photo until real device images exist.
- The troubleshooting guide recommends a VPN for "bypassing" ISP throttling. Owner review needed.
- No field Core Web Vitals, Search Console or backlink data exists for the new domain yet.

## 5. Country-page quality

| Metric (197 current countries, country name masked) | Result |
| --- | --- |
| Pages with text distinct from every other page | 185 of 197 |
| Pages sharing all their facts with another page | 12, in 3 groups |
| Median words in main content | 999 |
| Median share of sentences found on over 90% of pages | 75.6% |
| Median similarity to the closest other page (Jaccard) | 0.78 |

The 12 are Antigua and Barbuda, Dominica, Grenada, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines; Benin and Niger; Burkina Faso, Côte d'Ivoire, Mali and Togo. They have the same currency, language, offset and device lists, so identical facts are the accurate result.

Assessment: the pages are accurate and more useful than before, but they are still template pages built from a limited set of facts. Rewording shared sentences would only hide that. Local channels, coverage, availability and testimonials were not added because no verified source exists.

Regional facts come from Unicode CLDR 49, device lists from Amazon and Roku documentation, and each page names its sources.

### Conflict with search guidelines

Keeping all 199 URLs indexable is what you asked for. Google's doorway and scaled-content policies and Bing's guidelines on duplicate and auto-generated content still apply to large sets of near-identical location pages, and fewer than all of them may be indexed.

Safe path that keeps every page: add owner-verified details (channels, support hours, payment methods, real customer feedback) to the markets that matter first, then watch "Crawled, currently not indexed" in Search Console after launch. Any consolidation stays your decision.

### For owner review (URLs preserved)

| URL | Question |
| --- | --- |
| `/country/east-germany` | Former state, 1949–1990 |
| `/country/congo-free-state` | Former state, 1885–1908 |
| `/country/korea` | Slug is ambiguous; page now says South Korea |
| `/country/burma` | ISO and UN name is Myanmar |
| `/country/turkey` | ISO and UN name is Türkiye |
| `/country/kosovo` | `xk` is a user-assigned code |
| `/country/holy-see` | Whether this is a real market |

## 6. Google and Bing readiness

Technically ready, pending launch. On the production build:

| Check | Result |
| --- | --- |
| TypeScript, production build | Pass |
| ESLint | Pass, 0 errors, 2 existing warnings in files not changed here |
| Automated tests | 28 of 28 |
| `npm run seo` | 216 indexable, 0 errors, 0 warnings |
| `seo:countries` | 199 of 199 |
| Self-canonicals matching the sitemap | 216 of 216 |
| Duplicate titles or descriptions | 0 |
| Pages with exactly one H1, no skipped heading levels | All |
| JSON-LD parse errors | 0 |
| FAQ schema questions visible on the page | All |
| Internal link targets | 216, all 200 |
| Images missing `alt` | 0 |
| Mobile 375 px: `/`, `/locations`, country, guide | No horizontal overflow |
| Lab LCP at 375 px, unthrottled localhost | 148–200 ms |
| Lab CLS | 0 |

The lab timings show there are no layout shifts or rendering faults, not real-world speed. PageSpeed Insights cannot test this unpublished build.

## 7. AI-search discoverability

Ready in structure: answer-first leads, visible Q&A, consistent Organization and WebSite entities, server-rendered content and an accurate `llms.txt`. Google states that AI features need no special files or schema, so `llms.txt` is optional.

`robots.ts` still blocks GPTBot and allows ChatGPT-User, Google-Extended and others. That policy was left unchanged and is your call.

## 8. Launch blockers

1. `www.ottv.org` is not serving this build, and `ottv.org` has returned 402 or timed out. Redirects from the old domain cannot be verified until it does.
2. There are no Terms, Privacy or About pages. They need your business and legal facts.
3. Legal review of content rights for the channels and on-demand titles. No licensing claim is made anywhere on the site.
4. Confirm how login details are delivered, and which countries you actually serve.
5. After launch: Search Console and Bing verification, Change of Address, sitemap submission.
6. This work is uncommitted on `migrate/ottv`.
