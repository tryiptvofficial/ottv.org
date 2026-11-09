# Structured data audit: www.ottv.org

Source: production build snapshot, 216 pages, all HTTP 200 (`.../scratchpad/seo_audit/crawl/html/*.html`). Generator: `src/lib/schema.ts`. Every `application/ld+json` block on every page was parsed by script (0 parse errors, 0 pages without JSON-LD, 0 Microdata/RDFa). Home, pricing, faq, contact, locations, trial, fire-tv, android/ios/roku head blocks and Australia were read by hand. All FAQ text was compared to visible text of the same page by script.

## Score: 76 / 100

Method: start at 100 and deduct for verified issues only: HowTo still emitted on 11 pages (-4); FAQPage on 212 pages with no Google benefit (-3); Service boilerplate on 198 pages with no areaServed (-4); Product/Offer thin and the Product type fits a subscription loosely (-5); Article missing image and byline person (-3); identical dateModified on 11 guides (-2); @id/URL trailing-slash inconsistency (-2); thin Organization (-2); no AggregateOffer-level defects in validity (0). Remaining deductions (-3) for lack of any rich-result-eligible types beyond Breadcrumb and Product snippet. No syntax, @context, type or fabricated-data errors found. The score measures markup quality, not rich-result likelihood.

## Detection

| Block | Pages | Notes |
|---|---|---|
| Organization, WebSite | 216 (all) | `schema.ts:33-64` |
| BreadcrumbList | 212 | absent on home and 3 others |
| FAQPage | 212 | 844 Q&A pairs |
| Service | 200 | 198 country pages + trial (+1) |
| Article + HowTo | 11 device guides | `schema.ts:156`, `:193` |
| Product + AggregateOffer | home, pricing | same `@id` `/#product` on both |
| WebPage / ContactPage / CollectionPage | home / contact / locations | `schema.ts:75` |

## What works
- All blocks are valid JSON, `@context` is `https://schema.org`, URLs absolute, dates ISO 8601.
- Markup matches visible content: 844/844 FAQ questions and answers appear on their pages (after HTML-entity decoding). Prices 15.82, 38.30, 59.15, 88.23 are visible on `/pricing` and `/` and equal the Offer prices. The trial Offer price 0 matches the visible "free 24-hour trial". Guide `dateModified` equals the visible "Updated: November 9, 2026", and HowTo `totalTime` PT5M equals the visible "5 minutes" (`/devices/fire-tv`).
- No invented ratings, reviews, addresses, sameAs or licence claims (comment at `schema.ts:46`). Product has no aggregateRating, correctly, since the site shows no reviews (`schema.ts:87`).
- Entity graph uses `@id` references (Organization, WebSite, Product) and `alternateName` for the IPTVMax rename and the site name.

## Findings

### Critical
None.

### High
None.

### Medium

**M1. HowTo emitted on 11 device guides (no rich result since Sept 2023).**
Evidence: `schema.ts:179-216`, used at `src/app/devices/[device]/page.tsx:99`; present in `/devices/fire-tv` and 10 others. It is not invalid, but adds about 2 KB per page and no benefit. Fix: stop emitting HowTo; keep the visible numbered steps and the Article. Not harmful if left, so cleanup priority only.

**M2. FAQPage on 212 pages: no Google SERP feature (retired May 7, 2026).**
Evidence: `schema.ts:117`; all 197 country pages carry 4 FAQs each, e.g. `/country/australia`. Content is accurate and matches the page, so there is no spam risk; severity is Info-level per policy, listed here only because of volume. Do not add more. Any AI/GEO benefit is unconfirmed. Keeping it is optional; if kept, no change needed. The visible FAQ content on the page is the valuable part. (Genuine user Q&A pages would use QAPage; none exist.)

**M3. Product/AggregateOffer is thin and loosely fits a subscription.**
Evidence: `schema.ts:88-113`, `/pricing` and `/` JSON-LD. Valid for Product snippets (name + offers), but missing recommended Offer fields: `availability`, `priceValidUntil` (only if the owner has a real end date), `itemCondition` not relevant. Also `image` is `https://www.ottv.org/api/og` (`site-config.ts:6`), a dynamic endpoint with no file extension, so image crawlability is unconfirmed. Offer `url` is the same `/pricing` for all four plans, and the Product is duplicated on home and pricing with one `@id`. A 7-day money-back guarantee is visible (`/pricing`, `/faq` "Do you offer refunds?"), so a return policy could be expressed, but needs owner decisions (applicable countries, return method), so do not guess. Do not expect a price or merchant rich result.
Safe fix (availability is a fact the site shows: plans can be ordered now), per Offer:
```json
{ "@type": "Offer", "name": "12 Months", "price": "88.23", "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "url": "https://www.ottv.org/pricing", "seller": { "@id": "https://www.ottv.org/#organization" } }
```
Owner decision: whether to publish a MerchantReturnPolicy (7 days, FullRefund) and for which countries.

### Low

**L1. Service on 198 country pages is boilerplate and says nothing about the country.**
Evidence: `/country/australia` Service has no `areaServed`, identical description and 4 offers on every country page (`src/lib/data/country-page.ts:32`). Service has no Google rich result. `generateServiceSchema` supports `areaServed` (`schema.ts:233`) but it is unused. Adding it would assert availability, which the page itself denies ("OTTV has not published a country-by-country availability list"), so do not add areaServed. Option: remove Service from country pages, keep it on `/iptv-free-trial`.

**L2. Article: no `image`, no person author.**
Evidence: `/devices/fire-tv` Article lacks `image` (`how-to.json` has no image fields; `page.tsx:93` passes undefined). Author is the Organization, which Google accepts. Recommended not required. Fix only if a real screenshot exists: add `image` URL(s). Named human authors: owner decision; do not invent.

**L3. dateModified identical on all 11 guides.**
Evidence: `2026-11-09T12:00:00Z` for every guide, `src/lib/site-data/how-to.json:13`; the visible date shows the same, and the sitemap uses the same constant (`sitemap.ts:11-12`). Consistent, but if the date is bulk-set rather than tied to a real edit, it risks being treated as untrustworthy. Update only on genuine content changes.

**L4. Trailing-slash/ID inconsistency.**
Evidence: home WebPage `@id` is `https://www.ottv.org#webpage` (`schema.ts:79` with empty path), canonical is `https://www.ottv.org`, while Organization/WebSite/Product IDs use `https://www.ottv.org/#...`, and Breadcrumb home item is `https://www.ottv.org/`. Browsers normalise both to the same URL, so impact is small. Fix: use `/` consistently, e.g. `"@id": "https://www.ottv.org/#webpage"`.

**L5. Organization is minimal.**
Evidence: `schema.ts:47-63`: logo is the 180x180 `apple-touch-icon.png` (meets the 112px minimum; whether it is the brand logo is the owner's call), contactPoint has only a `wa.me` URL. No `telephone`, `email`, `address`, `sameAs`. Owner decision: add only what the site publicly shows and the owner confirms. Not needed for any rich result.

**L6. Article publisher logo and FAQ in the contact page.**
Evidence: `/contact` FAQ question "My app says "expired" or asks me to pay. Is my subscription over?" initially failed a raw string match only because of quote encoding; after decoding it matches. No action.

## Missing opportunities (genuine only)
- None that would add a Google rich result. Review/AggregateRating: owner decision, only if real, verifiable reviews are shown on-page; do not add otherwise.
- Home has no BreadcrumbList (correct for a root page).
- VideoObject, Event, JobPosting, LocalBusiness: no matching visible content; do not add (no address is shown).
- Do not add HowTo, SpecialAnnouncement or new FAQPage.

## Not verified
- Live Google Rich Results Test / Search Console enhancement reports (domain disabled, snapshot only).
- Whether `/api/og` returns a valid image with a correct content type and size (route at `src/app/api/og/route.tsx` not tested).
- Whether the 4 pages without FAQPage/Service (2 not hand-read) are privacy/terms pages.
- Policy fit: whether Google or merchant policies allow Product/Offer for this category of service; no rich result is promised.
- Android, iOS, Roku and the other guides were checked by script (type list, dates, FAQ text) rather than line by line.
