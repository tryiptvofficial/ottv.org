# OTTV SEO action plan

From the audit of 9 November 2026. Items are marked **Code** if they can be done without new information, or **Owner** if they need your decision or facts.

## Critical: blocks indexing or risks penalties

| # | Action | Type | Effort | Verify by |
|---|---|---|---|---|
| 1 | Restore the Vercel deployment for `www.ottv.org` | Owner | S | `curl -I https://www.ottv.org/` returns 200 |
| 2 | Decide what happens to the 197 templated country pages: keep and add real per-country service facts, consolidate, or noindex | Owner | L | Decision recorded. Unique content per page if kept |
| 3 | Remove the 15 third-party service logos, or confirm you have the right to use them; move any you keep off `iptvwell.com` | Owner | S | No `iptvwell.com` in `placeholder-images.json` |
| 4 | Get legal review of content rights and decide what the site says about licensing | Owner | M | Statement published or legal sign-off |

## High: fix before launch

| # | Action | Type | Effort | Verify by |
|---|---|---|---|---|
| 5 | **Done 9 Nov, uncommitted.** Language and time facts corrected on 25 countries after comparing all 197 language rows with a second open dataset. Not checked against each government source | Code | M | Spot check against government sources |
| 6 | **Done 9 Nov, uncommitted.** Fixed Comoros raw codes and "the the" on Congo Free State | Code | S | Page text check |
| 7 | **Done 9 Nov, uncommitted.** Fire TV, Android and iPhone steps now work for free-trial users. Owner must confirm trial users really get the APK URL | Code | S | Guide wording |
| 8 | **Done 9 Nov, uncommitted.** App fees shown on the trial page; upfront cost shown in the `/pricing` header | Code | S | Pricing and trial pages |
| 9 | **Done 9 Nov, uncommitted.** Price summary and plan link added to the first screen of `/pricing` | Code | S | 375 px screenshot |
| 10 | Publish legal entity, Terms, Privacy and Refund pages. These are new URLs and need your approval | Owner | M | Pages live and linked in footer |
| 11 | Name accepted payment methods and refund conditions | Owner | S | Visible on `/pricing` and `/checkout` |
| 12 | Substantiate or soften "25,000+" and "120,000+" | Owner | S | Evidence on file or copy changed |
| 13 | Name the Fire TV app source and confirm how logins and APK links are delivered | Owner | S | Guide updated |
| 14 | Decide on `/country/east-germany` and `/country/congo-free-state` | Owner | S | Decision recorded |
| 15 | Run a real WhatsApp trial and order, and test the guides on real devices | Owner | M | Results recorded per guide |

## Medium: within a month of launch

| # | Action | Type | Effort |
|---|---|---|---|
| 16 | Add internal links to US, Canada, Australia and New Zealand pages | Code | S |
| 17 | Reword "does not name [country]" to reflect Amazon's "Other supported countries" | Code | S |
| 18 | Set guide dates to real change times; update `lastmod` per page from launch onward | Code | S |
| 19 | Add a Content-Security-Policy in report-only mode; drop X-XSS-Protection | Code | M |
| 20 | Automate IndexNow after each deploy | Code | S |
| 21 | Add `availability` to Offers | Code | S |
| 22 | Decide and state the AI crawler policy in robots.txt | Owner | S |
| 23 | Re-measure INP and homepage main-thread work on the live domain | Code | S |

## Low: backlog

| # | Action | Type |
|---|---|---|
| 24 | Remove the unused `next-sitemap` config and dependency | Code |
| 25 | Align the homepage `@id`, label the second nav, review small tap targets | Code |
| 26 | Split the sitemap so country pages report separately | Code |

## After launch

Verify Search Console and Bing Webmaster Tools, submit the sitemap, file the Change of Address, test old-domain redirects on real hosts, and capture a drift baseline. Review field data after 28 days.
