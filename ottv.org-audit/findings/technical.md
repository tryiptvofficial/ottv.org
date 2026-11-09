# Technical SEO findings: OTTV (https://www.ottv.org)

Scope: production build of the committed code at http://localhost:9010 (curl plus the 216-page crawl snapshot). The live domain returns 402 DEPLOYMENT_DISABLED, so nothing below was verified on the live host. Source was read only.

## Score: 88/100
Method: start at 100 and deduct by severity. Deployment is not live (-5, shown as a finding but caused by hosting, not code). Medium findings -2 each, Low findings -1 each, with Low issues capped at -4 in total. Every code-level indexing check passed.
- Live domain 402: -5
- No CSP and legacy header: -2
- IndexNow not automated and the route is a GET with side effects: -2
- Homepage HTML weight (risk only): -2
- Low items (lastmod, stale next-sitemap, robots AI policy, thin pages): -1 net
This is a rubric score for the build, not a ranking prediction.

## What works (evidence)
- Crawl summary.json: 216/216 pages return 200, with no non-200 sitemap entries, no duplicate sitemap URLs, no noindex pages, no orphans (minimum 2 inlinks) and no bad canonicals. Every page has exactly one h1, a unique title and a unique description. The longest title is 60 characters.
- Sitemap: 216 URLs, all on https://www.ottv.org, none with a trailing slash, matching the crawled set. The helper (`sitemap.ts`) builds them and robots.txt declares `Sitemap: https://www.ottv.org/sitemap.xml`. The declaration was checked against the local file only.
- Canonicals: home is `https://www.ottv.org` and are self-referencing and absolute. `/pricing?x=1` canonicalises to `https://www.ottv.org/pricing`.
- Redirects in `src/middleware.ts:8-19` and `src/lib/redirects.ts:67-76` are single-hop 301s. Tested with curl:
  - Host `ottv.org`, `iptvmax.co` or `www.iptvmax.co` on `/pricing/?a=1` goes to `https://www.ottv.org/pricing?a=1`.
  - `X-Forwarded-Proto: http` goes to https.
  - `/pricing/` goes to `/pricing`.
  - `/iptv-subscription` goes to `/pricing`.
  - `/tv/country/us` goes to `/country/united-states`.
  - `/country/south-korea` goes to `/country/korea`.
  - Sensitive query parameters (token, password and similar) are removed on host change.
- Internal links: the crawl found no links to redirected or legacy URLs (`/tv/`, `/iptv-subscription`, `/country/south-korea`, `/country/myanmar`).
- Soft 404s: `/nope`, `/Pricing` and `/admin/x` return a real 404 with `noindex`. The 404 response has `Cache-Control: no-store`.
- Security headers in `next.config.js` (confirmed in the pages.json headers on all pages):
  - HSTS `max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: origin-when-cross-origin`
  - `Permissions-Policy`
  - `poweredByHeader: false`
- Mobile: `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">`. Zooming is allowed.
- JavaScript rendering: pages are server-rendered or pre-rendered. Headers show `x-nextjs-prerender: 1` and the title, h1, canonical and JSON-LD are all in the raw HTML. No client-side-only shell was found.
- robots.txt (`src/app/robots.ts`): the sitemap is declared, `Allow: /api/og` keeps social images fetchable, and only /api/, /admin/ and /staging/ are blocked. The 216 URLs are not blocked.
- IndexNow key file: `public/34703b31e96542ffb49bffed790d5e29.txt` returns 200 and its content matches the key in `src/app/api/indexnow/route.ts:10`. The route is protected by `rejectUnlessAuthorized` and fails closed (503 locally because no `INDEXING_API_SECRET` is set).

## Findings

### Critical
None in the code. The live-domain status below is a deployment issue, not a code defect.

### High
1. **Live domain returns HTTP 402 DEPLOYMENT_DISABLED (hosting, not code).** Nothing on the live host can be crawled or indexed until it is re-enabled, so every finding above is for the local build only.
   - Fix: re-enable the deployment or billing and then re-run the checks listed in "Not verified".
   - If the domain stays on 402 for long, search engines may drop it. I cannot quantify that.

### Medium
2. **No Content-Security-Policy header; `X-XSS-Protection: 1; mode=block` is deprecated.**
   - Evidence: `next.config.js` headers() sets no CSP, and the pages.json response headers have none either.
   - Fix: add a report-only CSP first, then enforce it, and drop the X-XSS-Protection line or set it to `0`.
   - Pages rank without a CSP, so this is a hardening item.
3. **IndexNow is not automated, and the trigger is a GET with side effects.**
   - Evidence: `src/app/api/indexnow/route.ts:44-73` submits URLs only when something calls the endpoint with a bearer secret. Nothing in the repo triggers it on deploy.
   - Fix: set `INDEXING_API_SECRET` in production, then call the endpoint with `Authorization: Bearer <secret>` after each deploy. Optionally change it to POST.
   - The URL list is built in code and is separate from the sitemap. Consider building both from one source so they cannot drift (the same `howToArticles` and `allCountries` are used today).
   - Note that IndexNow does not reach Google.
4. **Homepage HTML weighs 506,769 bytes (pages.json `bytes` for `/`) and carries 1,668 images across the crawl.** This is a risk to LCP and INP on slow mobile connections, not a measured Core Web Vitals result.
   - Fix: measure on the live domain with PageSpeed Insights or CrUX once it is up. If the weight is confirmed, trim inline data from the homepage.
   - Localhost timing is not reported here.

### Low
5. **Sitemap `lastmod` is identical for the static and country pages (`2026-11-09`), and `changefreq` and `priority` are emitted.**
   - Evidence: `src/app/sitemap.ts:12`. The comment explains the date is hand-maintained, which is honest.
   - Fix: update the date only when content changes. Google ignores changefreq and priority, so they are harmless noise.
6. **Stale `next-sitemap.config.js` and `next-sitemap: latest` dependency (`package.json:53`).** It is not wired to a postbuild script, so it is dead config. Its robots policy (`allow: '/'`) would conflict with `src/app/robots.ts` if it were ever run.
   - Fix (owner's call to remove): delete the config and dependency, or leave them unused.
7. **robots.txt AI-crawler policy is mixed:** `GPTBot` is disallowed while `ChatGPT-User`, `Google-Extended`, `anthropic-ai` and `PerplexityBot` are allowed. This is a business policy decision, so it is an owner decision. Note that listing a crawler token with `Allow: /` changes nothing, because the `*` group already allows it.
8. **Thin pages: `/country/east-germany` (61 words) and `/country/congo-free-state` (73 words)** against a median of 654 (summary.json). They are in the sitemap and indexable.
   - Owner decision: any treatment such as noindex, merging or removal. This audit does not recommend deleting or redirecting them. Expanding the copy is the only option that keeps all 216 URLs.
9. **HSTS `preload` is declared.** Preload only takes effect once the domain is submitted to hstspreload.org, and it commits every subdomain to HTTPS. Confirm that is intended before submitting.
10. **Cache lifetimes differ:** `/` has `s-maxage=86400`, while `/pricing?x=1` returned `s-maxage=31536000` (curl). Whether a deploy purges the CDN cache is not verifiable locally.
11. **hreflang appears only on the homepage** (`en-US` plus `x-default`, self-referencing; summary.json `hreflang_pages: 1`). The site is English only, so nothing is broken. Defer to the seo-hreflang skill for anything further.
12. **`//pricing` returns a Next.js 308 (not 301) to `/pricing`.** On a wrong host this could add a second hop. It is a rare URL and low impact.

## Not verified (can only be checked on the live domain)
- Any behaviour on https://www.ottv.org (402 now): TLS, HSTS delivery, real response headers, CDN or Vercel-added headers.
- Real redirect behaviour from `http://`, `ottv.org` and the old `iptvmax.co` domain. Only simulated with Host and X-Forwarded-Proto headers against localhost.
- Whether `https://www.ottv.org/robots.txt` and the sitemap are served and accepted in Google Search Console and Bing Webmaster Tools. The sitemap helper was not run against the live URL.
- Core Web Vitals (LCP, INP, CLS): no field data and no lab run. Localhost timing is not real-world performance.
- Index coverage, canonical selection by Google, and crawl stats.
- IndexNow acceptance and the production `INDEXING_API_SECRET`.
- Google-side rendering of the pages (the raw HTML already contains the content).
- Whether a CDN purges stale cached pages on deploy.
