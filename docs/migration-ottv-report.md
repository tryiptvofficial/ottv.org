# IPTVMax → OTTV migration report

Prepared 2026-11-09. **Status: repository changes are done and verified locally. Nothing has been deployed, and no DNS or hosting setting has been changed. The migration is not complete until the owner actions in section J are done and verified on the real hostnames.**

Legend: **VERIFIED** (checked and true), **FIXED** (changed and tested), **REQUIRES OWNER ACTION**, **NOT TESTED**.

## A. Initial domain audit

| Item | Finding |
|---|---|
| Framework | Next.js 16.4.3 App Router, React 19, Turbopack |
| Old domain | `www.iptvmax.co`, live. Cloudflare in front of Vercel (`x-vercel-id` and `server: cloudflare` headers). Apex and http 308 to `https://www.iptvmax.co` |
| New domain | **Not serving.** `www.ottv.org` has a CNAME to Vercel DNS but timed out. `ottv.org` returned HTTP 402 `DEPLOYMENT_DISABLED` |
| Hosting config in repo | `apphosting.yaml` (Firebase, unused by the live site). No `vercel.json` or `.vercel` link |
| Domain references | 7 full URLs, centralised in `site-config.ts`; middleware, `next-sitemap.config.js`, audit scripts and `llms.txt` held the rest |
| Brand references | 105 `IPTVMax`, plus the header logo split as `<span>IPTV</span>Max` |
| Env vars read by code | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` (read by the GA library), `INDEXING_API_SECRET`, `GOOGLE_INDEXING_SERVICE_ACCOUNT_BASE64` |
| Checkout and payment | WhatsApp only (`wa.me/212694833293`). No payment provider or credentials in the repo. The site sends no email |
| Analytics | Google Analytics (via env var), Ahrefs, Visitors.now |
| Verification | Two Google tags, Bing, Yandex meta tags, and an IndexNow key file |
| Version control | The folder had no git repository at audit time. One now exists: `main` holds the original code, `migrate/ottv` holds this migration. No remote is configured |

## B. URL inventory

216 indexable URLs in the sitemap, unchanged from the live site's count.

| Group | Count | Paths |
|---|---|---|
| Core | 6 | `/`, `/pricing`, `/iptv-free-trial`, `/locations`, `/faq`, `/contact` |
| Device guides | 11 | `/devices/[device]` |
| Country pages | 199 | `/country/[country]` (frozen list in `scripts/country-urls.baseline.json`) |

Not in the sitemap: `/checkout` (now noindex), `/iptv-subscription` (redirects), `/api/*` (blocked in robots.txt except `/api/og`).

## C. Code changes

51 paths differ from the pre-migration snapshot: 45 modified, 4 added (`public/llms.txt`, `src/lib/redirects.ts`, `src/components/sections/WhyOttv.tsx`, `tests/`), 2 removed (root `llms.txt`, `WhyIptvmax.tsx`). `docs/migration-ottv-report.md` is this report.

| Area | Change |
|---|---|
| Domain | `site-config.ts`, `next-sitemap.config.js`, `scripts/seo-audit.mjs`, `scripts/check-country-indexability.mjs` now use `https://www.ottv.org` |
| Brand | All public `IPTVMax` copy, titles, schema, manifests, SVG titles, OG images, logo and WhatsApp pre-filled messages now say OTTV |
| Redirects | New `src/lib/redirects.ts`, called from `src/middleware.ts`. `next.config.js` redirects removed and `skipTrailingSlashRedirect` set |
| Metadata | The helper now sets `og:url`, `og:type` and `og:site_name`. `/checkout` is noindex with an accurate description |
| Claims | Removed "The world's most reliable streaming service" from OG images and "Best Streaming Service" from image alt text |
| Schema | See section E |
| Sitemap | One hand-maintained content date, see section F |
| llms.txt | Moved to `public/` so it is actually served; old claims replaced with approved facts |
| Tests | `tests/redirects.test.mjs`, `tests/migration.test.mjs`, `npm test`, added to `seo:gate` |
| Build dependencies | `node_modules` installed from the lockfile with `npm ci`. No dependency was added or changed |

Deliberately unchanged: WhatsApp number, prices, analytics and verification IDs, IndexNow key, crawler policy, country and device URLs.

## D. Redirect mapping

All are 301, one hop, on any host other than `www.ottv.org` (including `iptvmax.co`, `www.iptvmax.co`, `ottv.org`, and http). Query strings are kept, except `token`, `access_token`, `id_token`, `secret`, `password`, `api_key` and `apikey` when changing host. Trailing slashes are removed.

| Old path | New URL on `https://www.ottv.org` |
|---|---|
| Every existing path | Same path (`/pricing` → `/pricing`) |
| `/iptv-subscription` | `/pricing` |
| `/tv` | `/` |
| `/tv/pricing`, `/tv/faq`, `/tv/iptv-free-trial` | Same path without `/tv` |
| `/tv/devices/:device` | `/devices/:device` |
| `/tv/guides/iptv-buffering-troubleshooting` | `/devices/troubleshooting` |
| `/tv/country/us`, `/uk`, `/ca` | `/country/united-states`, `/united-kingdom`, `/canada` |
| `/tv/country/:slug` | `/country/:slug` |
| `/country/south-korea` (and the `/tv/` form) | `/country/korea` |
| `/country/myanmar` (and the `/tv/` form) | `/country/burma` |

**FIXED:** the previous setup would have taken two hops for legacy paths and trailing slashes on the old host. **FIXED:** `/tv/country/south-korea` previously needed two hops on any host.

The `_next/static`, `_next/image` and `favicon.ico` paths are excluded from the middleware, as before, so those are not redirected.

## E. Metadata and structured data

**VERIFIED on all 216 URLs of the production build:** one self-referencing canonical on `www.ottv.org`, unique title and description, complete Open Graph and Twitter tags, valid JSON-LD with no ratings or reviews, breadcrumbs ordered and pointing at live pages.

**FIXED:**
- `WebSite` now has `@id` `https://www.ottv.org/#website`.
- `Organization` keeps `https://www.ottv.org/#organization` and gains `alternateName: IPTVMax` for entity continuity.
- `Article` publisher now references the Organization `@id` and uses the same logo.

**Content concerns left for the owner (not changed):**
- "Best IPTV Service in [Country]" and "2026 Best IPTV Service" are unsupported superlatives. They were kept to preserve keyword relevance, as instructed.
- The homepage shows third-party brand logos (HBO, Disney+, F1, Discovery and others). See section J, item 12.
- `sameAs` is absent because no official profiles were confirmed.

## F. Sitemap and robots.txt

**VERIFIED:** valid XML, 216 unique URLs, all on `www.ottv.org`. robots.txt references `https://www.ottv.org/sitemap.xml`. CSS and JS are not blocked.

**lastmod:** one-time manual update to 2026-11-09, because the brand text on every page changed on that date. It remains a hand-edited constant, not build-generated, and a test enforces that. Article `dateModified` values in the device guides were left alone.

**AI crawlers (unchanged, needs a decision):** GPTBot is blocked, while `Google-Extended` and `anthropic-ai`, which are also training-related, are allowed. `OAI-SearchBot`, `Claude-SearchBot` and `Bingbot` fall under the `*` rule and are allowed. I did not change this policy, because it is yours to set.

`next-sitemap.config.js` is not run by any script; the live sitemap comes from `src/app/sitemap.ts`. Its domain was updated anyway.

## G. International SEO

**VERIFIED:** 199 of 199 baseline country URLs return 200, are self-canonical, are indexable, are in the sitemap, and are linked from `/locations`.

Hreflang exists only on the homepage (`en-US` and `x-default`, both self-referencing), and it is valid. Country pages are all English with no language alternates, so no hreflang was invented for them.

**Quality concern (kept indexable as instructed):** all 199 country pages share one template, title pattern and FAQ set, with only limited country-specific text. That is a thin or near-duplicate content risk independent of this migration.

## H. Core Web Vitals

**NOT TESTED.** Google's PageSpeed API returned a daily quota error (429), and localhost numbers would not represent real users. No LCP, INP or CLS figure is claimed, and no performance change was made.

From the build and source: total client JS is 1.2 MB uncompressed, with a largest chunk of 228 KB. Fonts use `next/font` with swap. Three third-party scripts load after interaction readiness. Images and preconnects depend on third-party hosts (`iptvwell.com`, `images.unsplash.com`, `image.tmdb.org`), which is worth reviewing for LCP.

## I. Test commands and outcomes

Run on the final code, Node 24.22.0.

| Command | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass: 0 errors, 2 existing unused-variable warnings |
| `npm run build` | Pass |
| `npm run seo` | Pass: 216 URLs, 216 indexable, 216 links, 57 images, 13 redirects, 0 errors |
| `npm run seo:countries -- http://localhost:9010` | Pass: 199 of 199 |
| `npm test` | Pass: 26 of 26 |

Redirect tests send the old hostnames in the `Host` header to the production build. They prove the code's behaviour, **not** behaviour on the real old domain.

`tests/redirects.test.mjs` needs Node 22.18 or newer to load TypeScript directly; `package.json` allows 20.9 and up for the app itself.

**NOT TESTED:** anything on the real domains, TLS on `ottv.org`, deployment, real WhatsApp delivery, GA events (no measurement ID available locally), the Rich Results Test, and `/api/indexing` and `/api/indexnow` (these need secrets and would submit live URLs).

## J. Remaining actions (REQUIRES OWNER ACTION)

**Order matters. Deploying this code before step 4 is finished would redirect the whole live site to a domain that is not serving.**

1. Identify the Vercel project serving `www.iptvmax.co`. It was not found under the connected `anouarai` team, so it may be on another account.
2. Connect the local git repository to the remote your deployment uses, then deploy from `migrate/ottv`. It has no remote yet, and nothing has been pushed.
3. Resolve `DEPLOYMENT_DISABLED` on the project `ottv.org` currently points to (billing or a paused project).
4. Add `www.ottv.org` and `ottv.org` to the production project. Confirm valid TLS on both.
5. In production env vars, set `NEXT_PUBLIC_SITE_URL` to `https://www.ottv.org` or remove it. **If it still holds the old domain, every canonical will be wrong.** Confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
6. Test a preview deployment. Previews are exempt from the host redirect, so they can be checked before go-live.
7. Keep `iptvmax.co` and `www.iptvmax.co` attached to the same project. The redirects only work while the old domain reaches this app.
8. Check Cloudflare on the old domain: no cached 200s, no rules that interfere with redirects. Purge the cache at cutover.
9. Deploy to production, then run the checks in section L, day 0.
10. HSTS: the site sends `includeSubDomains; preload`. Confirm every `ottv.org` subdomain supports HTTPS before going live; this is hard to undo if the domain is submitted to the preload list.
11. Add a real support email if you want one published. `support@iptvmax.co` appeared only in the old, unserved `llms.txt` and was left out of the public file, because the site's schema policy is not to publish an email until confirmed, and it sits on the old domain.
12. **Get legal review of the content rights.** The site advertises 25,000+ channels alongside logos of HBO, Disney+, F1 and others. I found no licensing information in the repo and made no licensing claims. Unlicensed-streaming concerns, trademark use of those logos, and search-engine or host policy could affect this migration more than any technical factor.
13. Check whether the Ahrefs and Visitors.now projects are tied to the old domain, and update them.
14. Decide the AI crawler policy (section F).

## K. Search console instructions

**Google Search Console**
1. Verify `ottv.org` as a Domain property, by DNS record. Keep the old property verified. The current meta tags belong to the old property.
2. Submit `https://www.ottv.org/sitemap.xml` on the new property.
3. Use URL Inspection on a sample of old URLs to confirm they redirect, and on new URLs to confirm they are indexable.
4. Open Settings → Change of Address on the **old** property and select the new one. Do this only after the 301s are live on the real old domain.
5. Keep the old sitemap submitted for a few weeks so the redirects get crawled.

**Bing Webmaster Tools**
1. Verify `www.ottv.org` and replace the `msvalidate.01` tag if Bing issues a new one.
2. Submit the new sitemap.
3. Use the Site Move tool from the old site once redirects are live.
4. IndexNow: the key file ships at `/34703b31e96542ffb49bffed790d5e29.txt`, and the route submits under the new host. Confirm the key file is reachable on `www.ottv.org`, then call `/api/indexnow` with the bearer secret.

None of this has been done. I have no authorised access to either console.

## L. First 30 days

**Day 0, immediately after deploy**
```bash
curl -sI https://www.iptvmax.co/pricing
curl -sI https://iptvmax.co/tv/pricing/
curl -sI https://www.ottv.org/pricing
curl -s https://www.ottv.org/robots.txt
curl -s https://www.ottv.org/sitemap.xml | grep -c '<loc>'
```
Expect one 301 straight to `https://www.ottv.org/...`, a 200 on the new URL, the new sitemap line in robots.txt, and 216 URLs. Also run `npm run seo:countries -- https://www.ottv.org`. Check a canonical in the page source, send a test WhatsApp order, and confirm GA receives a page view.

| When | Check |
|---|---|
| Daily, week 1 | Coverage and crawl errors in both consoles, 404s and 5xx in Vercel logs, redirect sample, WhatsApp orders |
| Weekly, weeks 2–4 | Indexed count on new vs old, impressions and clicks across both properties, queries for "OTTV" and "IPTVMax", Core Web Vitals |
| Day 30 | Old URLs dropping out and new URLs replacing them. Temporary ranking movement is normal in a migration |

Keep the redirects and the old domain registered for at least a year, and preferably indefinitely.

## M. Rollback plan

- **Before Change of Address:** in Vercel, promote the last production deployment built before this migration. `www.iptvmax.co` serves as before.
- **Source:** the original code is the `main` branch of the local git repository. Keep the old production deployment available as well.
- **After Change of Address:** roll back only for a serious outage, and withdraw the Change of Address in Search Console at the same time. Redirecting back and forth causes more ranking damage than a short fix-forward.
- **Partial failure:** if only redirects misbehave, fix `src/lib/redirects.ts`, since all rules live there. If a single page breaks, fix forward rather than rolling back the domain.
