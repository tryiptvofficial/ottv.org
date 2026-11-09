# OTTV full SEO audit

**Audited:** 9 November 2026
**Target:** production build of commit `32303a2`, served locally. `www.ottv.org` returns HTTP 402 `DEPLOYMENT_DISABLED`, so nothing here describes a live site.
**Pages crawled:** 216 of 216, all HTTP 200.
**Business type:** online IPTV subscription sold over WhatsApp, with 199 country landing pages. Not a local business.

## Executive summary

### SEO Health Score: 72 / 100 for the build. Nothing is indexable today.

The technical build is strong. The score is held back by content and trust, and most of that cannot be fixed by code: it needs facts only the owner has.

| Category | Weight | Score | Basis |
|---|---|---|---|
| Technical SEO | 22% | 88 | `findings/technical.md` |
| Content Quality | 23% | 37 | `findings/content.md` |
| On-Page SEO | 20% | 90 | Crawl results below, judged by the lead auditor |
| Schema / Structured Data | 10% | 76 | `findings/schema.md` |
| Performance (CWV) | 10% | 75 | **Provisional**, lab only, `findings/performance.md` |
| AI Search Readiness | 10% | 69 | Average of GEO 60 and agent readiness 78 |
| Images | 5% | 85 | Crawl results, judged by the lead auditor |
| **Weighted total** | | **72** | |

Also reported, not weighted: Search experience 50 (`findings/sxo.md`), Sitemap 66 (`findings/sitemap.md`).

These are audit-tool estimates. They were scored by different specialists and do not predict rankings.

### Top 5 critical and high issues

1. **Critical: the domain is disabled.** Every URL on `www.ottv.org` and `ottv.org` returns 402. Nothing can be crawled until hosting is restored.
2. **Critical: 197 country pages are one template.** Content audit measured an 88% median word match, with no OTTV fact that varies by country. Google's scaled-content and doorway policies are a real risk. Keep, consolidate or noindex is an owner decision.
3. **Critical: third-party brand logos with no rights statement.** The homepage strip shows 15 logos including Netflix, HBO, Disney+ and beIN Sports, hotlinked from another IPTV site's demo at `iptvwell.com`. Their source entries mislabel them as Forbes, TechCrunch and similar press brands.
4. **High: a buyer cannot tell who is selling.** No legal entity, Terms, Privacy Policy, named payment method, or content-rights statement appears on any of the 216 pages.
5. **High: some country facts are wrong** (details under Content Quality). They were introduced by the recent country rebuild.

### Top 5 quick wins (no owner input needed)

1. Correct the language facts on the affected country pages and the raw codes on Comoros.
2. Fix "the the" on `/country/congo-free-state`.
3. Make Fire TV step 3 and step 5 work for free-trial users.
4. Put "OTTV trial cost" on the `$0` caption and link the guides whose apps charge a fee.
5. Add a price summary to the first screen of `/pricing`.

## Technical SEO: 88

**Passed on the local build:** 216 of 216 return 200; every URL is in the sitemap and vice versa; no noindex; no orphans; canonicals self-reference; single-hop 301s for old host, non-www and http; real 404s; server-rendered HTML; HSTS and core security headers set.

| Severity | Issue | Fix |
|---|---|---|
| Critical | Live domain returns 402 | Restore the Vercel deployment (owner) |
| Medium | No Content-Security-Policy; deprecated X-XSS-Protection | Add a CSP in report-only mode first |
| Medium | IndexNow is not automated | Set `INDEXING_API_SECRET` and call it after each deploy |
| Low | `next-sitemap` config and dependency are unused | Remove |
| Low | robots.txt AI policy is inconsistent: GPTBot blocked, ChatGPT-User allowed, ClaudeBot and OAI-SearchBot unlisted | Owner decision on intent, then list each crawler |

## Content Quality: 37

The score covers the whole site, 91% of which is the country template. Core pages and guides read well.

| Severity | Issue | Evidence | Fix |
|---|---|---|---|
| Critical | Scaled template pages | 88% median word match; 0 OTTV facts vary by country | Owner decision. Rewording will not resolve it; real per-country service facts would |
| High | Wrong or incomplete language facts | South Africa "English" only (several official languages); Ukraine "Ukrainian and Russian" (Ukrainian is the state language); Montenegro "Serbian" (constitution names Montenegrin); Comoros prints raw codes "zdj, wni"; Zimbabwe and Nigeria look incomplete or doubtful | Review all 197 language rows, not only these. Consider relabelling to a softer field if official status can't be confirmed |
| High | Ukraine time range | "UTC+2 to UTC+3" appears to come from Crimea's zone entry | Show UTC+2 |
| High | "25,000+" channels and "120,000+" titles unsubstantiated | Homepage and title tag; country pages say no channel list is published | Owner must substantiate or soften |
| High | Former-state pages are thin | `/country/east-germany` 61 words, `/country/congo-free-state` 73 words | Owner decision |
| High | Fire TV guide relies on a seller-supplied APK link with no named source | `/devices/fire-tv` | Owner must confirm the app and delivery |
| Medium | E-E-A-T is weak, 29 in the content audit | No author, company, or real-device evidence | Requires owner facts and device testing |
| Medium | "does not name [country]" on 179 pages omits Amazon's "Other supported countries" line | Country pages | Reword so it doesn't imply unavailability |

**Verified directly by the lead auditor:** the four named language rows, the Comoros codes, "the the", no payment term on core pages, and the Fire TV wording. The legal status of each language was reported by the content specialist and matches general knowledge, but was not checked against each constitution.

## On-Page SEO: 90

**Passed:** titles unique and at most 60 characters; descriptions unique, 70-160 characters; exactly one H1 per page; no skipped heading levels; no empty links; Open Graph image on every page.

| Severity | Issue | Fix |
|---|---|---|
| High | `/pricing` has no plans on its first screen | Add a price summary |
| High | `$0` and "from $7.35" leave out player-app fees on some devices; $7.35 needs $88.23 upfront | State the upfront figure and the app cost |
| Medium | Largest markets have few internal links: US, Canada and Australia 3 each, New Zealand 2 | Add them to guides or the footer |
| Medium | `/country/japan`: a search sample returned no consumer sales pages among 16 results. One query; indicative only | Re-test with real SERP data after launch |

## Schema: 76

All JSON-LD parses on all 216 pages. All 844 FAQ pairs appear on their pages, and prices match. No invented ratings or reviews.

| Severity | Issue | Fix |
|---|---|---|
| Medium | HowTo on 11 guides has had no rich result since September 2023 | Harmless. Leave, or remove when next touched |
| Medium | FAQPage on 212 pages has no Google feature on a site like this | Add no more |
| Medium | Offers lack `availability`; return policy needs owner confirmation | Add `availability`; rest is an owner decision |
| Low | Homepage `@id` lacks the `/` used elsewhere; Article has no `image`; Service has no `areaServed` (correct while availability is unconfirmed) | Tidy when convenient |

## Sitemap: 66

Valid XML, 216 unique URLs, referenced from robots.txt.

| Severity | Issue | Fix |
|---|---|---|
| High | 199 location URLs exceed the audit tool's quality gate of 50 | Same owner decision as the template issue |
| Medium | All 216 `lastmod` values are 9 November 2026. That is accurate today, because the rebrand and rebuild touched every page, but it must not stay a blanket date | From launch, change each date only with real content changes |
| Medium | Guide `dateModified` is hand-set to 12:00Z, later than the commit time | Use the real change time or date only |
| Low | `changefreq` and `priority` are ignored by Google; one file prevents separate reporting for country pages | Optional sitemap split |

## Images: 85

0 images missing `alt`, 0 missing dimensions, all served through the site's own route. 1,633 of 1,668 have empty alt: right for decorative flags, wrong for meaningful brand logos if those stay. Source files for logos and posters still point to outside hosts.

## AI Search Readiness: 69

Readiness only; AI visibility was not measured.

| Severity | Issue |
|---|---|
| High | No identifiable business entity, `sameAs` or About page |
| High | "OTTV" mostly means a building-energy metric on Wikipedia and Wikidata, so the name is ambiguous |
| Medium | robots.txt policy inconsistency (see Technical) |
| Low | No Content-Signal (a draft proposal). Markdown delivery, WebMCP and `.well-known` files are absent but don't matter for a WhatsApp-order site |

## Search experience: 50

Free-trial and device-guide pages match what searchers expect. A cautious visitor would probably not pay yet, though some would try the no-card trial. What stops them is seller identity, payment method, refund conditions and licensing, plus country pages that can't confirm availability or name a channel.

## Not run or not verified

| Item | Reason |
|---|---|
| Everything on the live domain | 402 |
| Google field data, indexation, GA4 | No credentials configured |
| Matomo | Not configured |
| Backlinks | `www.ottv.org` is not in Common Crawl; no Moz or Bing keys |
| Drift comparison | No baseline exists |
| Local, maps, clustering, e-commerce | Not relevant to this site type |
| claude-seo page renderer, Lighthouse agentic score | Both refuse localhost |
| Whether the service delivers what the site claims | No account or credentials were used |
| Real-device setup testing | 0 of 11 guides tested on a device |
