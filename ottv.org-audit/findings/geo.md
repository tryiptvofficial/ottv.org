# GEO audit: OTTV (https://www.ottv.org)

Audit date: 2026-11-09. Scope: AI crawler access, llms.txt, passage-level citability, entity clarity, brand and authority signals.

Source: production build snapshot (216 URLs, `robots.txt`, `pages.json`, `html/*.html`), `public/llms.txt`, and `http://localhost:9010` for extra files. URLs below use the canonical domain, but the evidence comes from the snapshot.

**Precondition, not scored:** the live domain is disabled, so no crawler can reach the site today. The score describes readiness if this build goes live unchanged.

**No outcome is promised.** Nothing here guarantees citations or AI Overview inclusion. No AI visibility was measured, because no live ChatGPT or LLM-mention tool was available.

## Score: 60 / 100

| Dimension | Weight | Score | Points | Basis |
|---|---|---|---|---|
| Citability | 25% | 70 | 17.5 | Direct, self-contained answers and exact prices. Headline claims have no source or supporting list, and country pages cannot answer their main question. |
| Structural Readability | 20% | 85 | 17.0 | One H1 per page, 0 heading skips, many question headings, real pricing table. Homepage lede does not name the brand. |
| Multi-Modal Content | 15% | 35 | 5.3 | Tables and poster alts exist. 0 pages have video, and guides have no step screenshots. |
| Authority & Brand | 20% | 18 | 3.6 | No legal identity, About, Terms, Privacy, `sameAs` or named author. No off-site entity found, and the name is ambiguous. |
| Technical Accessibility | 20% | 85 | 17.0 | All 216 URLs return 200 and are prerendered. Search crawlers are allowed. Small robots.txt defects. |
| **Total** | | | **60** | 60.4, rounded |

The dimension scores are auditor judgement against the evidence below, not an external metric. The content and technical work is largely done. The score is held down by trust and entity gaps, and most of those need facts only the owner has.

### Platform readiness (judgement, not measured visibility)

| Platform | Readiness | Main limit |
|---|---|---|
| Google AI Overviews | 50 | Follows Googlebot and Google Search eligibility. Weak trust signals and 199 templated country pages. |
| ChatGPT Search | 55 | OAI-SearchBot is allowed. No third-party entity corroboration found. |
| Perplexity | 58 | PerplexityBot is allowed. Answers are extractable, but the site has few sources. |
| Bing Copilot | 52 | Bingbot falls under `*`, so it is allowed. Same entity gaps. |

## AI crawler access

robots.txt evaluated per RFC 9309: a bot obeys only its most specific matching group.

| Crawler | Governs | Rule that applies | Status |
|---|---|---|---|
| OAI-SearchBot | ChatGPT Search | No named group, inherits `*` | Allowed |
| ChatGPT-User | User-initiated ChatGPT visits | `Allow: /` | Allowed. OpenAI says robots rules "may not apply" to it |
| GPTBot | OpenAI model training only | `Disallow: /` | **Blocked**. No bearing on ChatGPT Search |
| Claude-SearchBot | Claude search | No named group, inherits `*` | Allowed |
| Claude-User | User-directed Claude fetches | No named group, inherits `*` | Allowed |
| ClaudeBot | Anthropic training only | No named group, inherits `*` | Allowed |
| anthropic-ai | Not listed in Anthropic's current crawler article | `Allow: /` | Allowed, likely no effect |
| PerplexityBot | Perplexity search | `Allow: /` | Allowed |
| Google-Extended | Gemini/Vertex training and grounding, plus training of models behind Search gen-AI features. Not Search or AI Overviews inclusion | `Allow: /` | Allowed |
| Googlebot | Google Search and AI Overviews | Inherits `*` | Allowed |
| Bingbot | Bing and Copilot grounding | Inherits `*` | Allowed |
| Applebot-Extended | Apple Intelligence training only | Inherits `*` | Allowed |
| CCBot | Common Crawl, training use | Inherits `*` | Allowed |
| cohere-ai | Training | Inherits `*` | Allowed |

## llms.txt and licensing

- **llms.txt: present and well formed.** It has an H1, a blockquote summary and H2 link sections. All 17 linked pages return 200, and its prices match `/pricing`.
- llms.txt is optional and **ignored by Google Search**. Treat it as low-cost tidiness, not a visibility lever.
- `/.well-known/llms.txt` and `/llms-full.txt` return 404. No action needed.
- **RSL 1.0: absent.** There is no `License:` line in robots.txt, and `/license.xml` returns 404. Adopting it is an owner decision.

## Brand mention analysis

| Source | Result | Confidence |
|---|---|---|
| Wikipedia | No OTTV article. Search results mostly mean Overall Thermal Transfer Value. No IPTV brand, no ottv.org | Checked |
| Wikidata | 11 results, none an IPTV brand: building-energy papers, Austrian table tennis association | Checked |
| YouTube | Fetch returned only footer content | Not verified |
| Reddit | Fetch refused | Not verified |
| LinkedIn | Not checked | Not verified |
| General web search | Bing returned unrelated results, DuckDuckGo showed a bot check, Brave returned 429 | Not verified |
| Wayback Machine | ottv.org has a capture from 2025-01-27 with status 200, so the domain has history. Content could not be fetched | Partial |

The correlation figures often quoted for YouTube, Reddit and Wikipedia are third-party correlations, not causes. They are no reason to manufacture mentions.

## What works

- **Server-rendered:** all 216 URLs return 200 with `x-nextjs-prerender: 1`. Main text is in the raw HTML, and no render step is needed.
- **Answer-first passages:** https://www.ottv.org/faq, "OTTV costs $15.82 for one month".
- **Exact, checkable pricing:** the per-month figures and savings percentages on https://www.ottv.org/pricing were recalculated and are correct. Schema `Offer` values match the page.
- **Rebrand declared:** "OTTV, formerly IPTVMax, is an IPTV subscription" appears on all 216 pages, and `Organization.alternateName` is `IPTVMax`.
- **Honest limits, which help accuracy:** https://www.ottv.org/devices/fire-tv, "not re-tested on every device or app version".
- **Named sources on device and country facts:** https://www.ottv.org/country/canada, "Regional data from Unicode CLDR 49."
- **Clean structure:** 0 heading skips, 0 JSON-LD errors, 0 duplicate titles. `Organization` and `WebSite` use stable `@id` values.
- **No fabricated reviews or ratings in the schema or copy.** Keep it that way.
- **Answer block length needs no padding.** Sections are mostly 20 to 80 words, below the third-party 130-170 word heuristic. Google says content need not be chunked for AI.

## Findings by severity

### Critical

**C1. The business behind OTTV cannot be identified.**
- Evidence: https://www.ottv.org/contact, "All OTTV support runs through WhatsApp."
- Evidence: https://www.ottv.org/, "© 2026 OTTV. All rights reserved."
- Evidence: `/about`, `/terms` and `/privacy` return 404, and none is in the sitemap. "privacy policy" and "terms of service" appear on 0 of 216 pages. `sameAs` appears on 0 of 216 pages. `Organization` has only a `wa.me` contact point.
- Why it matters: answer engines and users have nothing to corroborate who sells this service, who takes payment or who honours the "7-day money-back guarantee". The contact form also collects name and email with no privacy notice.
- Fix (**owner decision: all facts**): publish About, Terms, Privacy and Refund pages with the real legal entity, jurisdiction and a non-WhatsApp contact. Then add only those true values to `Organization` (`legalName`, `address`, `email`, `sameAs`) and link the pages in the footer and llms.txt.

**C2. The site says nothing about content rights while advertising premium sports and film.**
- Evidence: https://www.ottv.org/, "Pay-Per-View (PPV) Events Included".
- Evidence: https://www.ottv.org/, alt text "Premier League poster" and "UFC poster".
- Evidence: "legal", "DMCA" and "copyright holder" appear on 0 of 216 pages. "licen" appears in no visible page text.
- This is not a legal conclusion. The audit found no information either way about OTTV's rights.
- Why it matters: "Is it legal?" is an obvious question for this product, and the site leaves it unanswered. How each AI engine treats such sites was not tested. Using league and film imagery without documented permission is a separate exposure.
- Fix (**owner decision, with legal counsel**): state how rights are held, by territory, and publish a takedown contact, only if this can be substantiated. Do not add "licensed" or "legal" wording unless it is true and documented. If it cannot be substantiated, copy cannot solve this and GEO work should not proceed ahead of the legal question. Confirm permission for the poster and logo imagery or remove it.

### High

**H1. No off-site entity was found, and the name collides with other meanings.**
- Evidence: https://en.wikipedia.org/w/index.php?search=OTTV&ns0=1, "overall thermal transfer value (OTTV)".
- Evidence: https://www.wikidata.org/w/index.php?search=OTTV returned 11 results, none an IPTV brand.
- Evidence: the schema is self-referential only: `"alternateName": "ottv.org"`, with no `sameAs`.
- Fix: use "OTTV IPTV" as the disambiguating phrase in the homepage intro. **Owner decision:** create real profiles (for example YouTube or LinkedIn) and list them in `sameAs`. Earn mentions through genuine customer and press activity. Do not buy or seed fake mentions, and do not create a Wikipedia article unless independent sources establish notability.

**H2. The core catalogue claims cannot be verified from the site.**
- Evidence: https://www.ottv.org/, "25,000+ live TV channels worldwide".
- Evidence: https://www.ottv.org/country/canada, "OTTV does not publish a channel list by language."
- Scale: "25,000+" appears 38 times on 15 pages, with no date, method or breakdown. The "no channel list" statement appears on 197 country pages.
- Fix (**owner decision**): publish a dated breakdown by category, language or region from the real inventory, stating how it was counted. If no reliable count exists, soften the claim to what can be supported. Do not invent figures.

**H3. 199 of 216 URLs (92%) are country pages that cannot answer their own main question.**
- Evidence: https://www.ottv.org/country/canada, "OTTV has not published a country-by-country availability list."
- Evidence: 198 pages carry this sentence (197 country pages and `/locations`). Using 5-word shingles against the Canada page, median overlap is 0.44 and the highest is 0.65 (`/country/australia`).
- The disclosure is honest and should stay. But the unique content is mostly CLDR facts and device-market notes, which are available from primary sources, so these pages offer little to cite for "IPTV in [country]". Templated pages at this scale also carry a scaled-content risk in Google Search.
- Fix (**owner decision**): supply real coverage data for priority markets and enrich those pages. Consolidate or noindex the long tail where there is nothing country-specific to say.

### Medium

**M1. The homepage opening does not define the entity.**
- Evidence: https://www.ottv.org/, H1 "IPTV Service With a 24h Free Trial".
- Evidence: https://www.ottv.org/, lede "Get access to 25,000+ live TV channels worldwide".
- Fix: open with the definition the site already uses: "OTTV, formerly IPTVMax, is an IPTV subscription with plans in US dollars, a free 24-hour trial and support on WhatsApp."

**M2. Key buying facts are missing.**
- Evidence: https://www.ottv.org/pricing, "the purchase is completed in that chat."
- Evidence: https://www.ottv.org/faq, "allow a short wait for the reply."
- PayPal, Visa, Mastercard, crypto and bank transfer appear on 0 pages, and so do support hours.
- Fix (**owner decision: facts**): add self-contained answers on accepted payment methods, typical time to receive a login, support hours and exactly how a refund is paid.

**M3. Some passages mislead when extracted alone.**
- Fire OS limit omitted: https://www.ottv.org/iptv-free-trial, "Any device that runs a player app: Amazon Fire TV Stick". Elsewhere the site limits this to Fire OS models. Fix: use the `/pricing` wording, "models running Fire OS".
- Price framing: https://www.ottv.org/pricing, "from $7.35 a month", while the same page says "Plans start at $15.82 for one month." Fix: "from $7.35 a month on the 12-month plan, paid once as $88.23".
- Trial conflict: https://www.ottv.org/devices/fire-tv, "after you subscribe to our service", but the same page requires "An active OTTV plan or free trial". Fix: **owner to confirm** whether trial users get the URL, then reword.

**M4. Many answers lack a named subject.**
- Evidence: https://www.ottv.org/faq, "Yes. We offer a free 24-hour trial with full access".
- Evidence: https://www.ottv.org/faq, "We recommend a steady download speed of 25 to 30 Mbps".
- Fix: name OTTV in the first sentence of FAQ answers, so that a lifted passage still says who it is about.

**M5. The speed recommendation has no stated basis.**
- Evidence: https://www.ottv.org/faq, "25 to 30 Mbps for HD and 4K".
- Evidence: https://www.ottv.org/devices/troubleshooting, "Netflix lists 15 Mbps or higher for its own 4K streams".
- One range covers both HD and 4K, and the only source cited is a different service's lower figure.
- Fix (**owner decision: facts**): give OTTV's actual stream bitrates, separately for HD and 4K.

**M6. Guide authorship and first-hand evidence are thin.**
- Evidence: https://www.ottv.org/devices/fire-tv, JSON-LD `"author": {"@type": "Organization"`.
- Evidence: https://www.ottv.org/devices/fire-tv, "Checked against vendor documentation, not re-tested".
- Fix (**owner decision**): name a real reviewer if one exists, and record real device testing. Never invent an author or test result.

**M7. Bulk date stamps weaken freshness signals.**
- Evidence: https://www.ottv.org/devices/mag, `"dateModified": "2026-11-09T12:00:00Z"`, identical on all 11 guides.
- Evidence: https://www.ottv.org/devices/fire-tv, "Updated: November 9, 2026".
- `datePublished` values run 2024-07-18 to 2024-07-28 and were inherited from the pre-migration baseline in `src/lib/site-data/how-to.json`.
- Fix: from now on, change `dateModified` per guide only on a substantive edit. **Owner to confirm** the 2024 publish dates are real, and correct them if not.

**M8. Multi-modal content is minimal.**
- Evidence: 0 of 216 pages have a `<video>`, an `<iframe>` or `VideoObject`.
- Evidence: https://www.ottv.org/devices/samsung-tv, stock image alt "Hand holding a TV remote in front of a television".
- Fix (**owner decision: assets**): add real step screenshots to guides, and optionally short setup videos with transcripts. Stock photos add nothing a machine can use.

### Low

**L1. Named robots.txt groups drop the private-path rules.**
- Evidence: robots.txt, `User-Agent: PerplexityBot` followed only by `Allow: /`. The same pattern applies to ChatGPT-User, Google-Extended and anthropic-ai.
- These bots are therefore not told to avoid `/api/`, `/admin/` or `/staging/`. Impact is low today, because `/admin`, `/staging` and `/api` return 404 on the snapshot.
- Fix: repeat the three `Disallow` lines in each named group, or remove groups that only restate the default.

**L2. robots.txt names a legacy token and omits the current search bots.**
- Evidence: robots.txt, `User-Agent: anthropic-ai`. It is not listed in Anthropic's crawler article.
- OAI-SearchBot and Claude-SearchBot are allowed only by inheritance, which works.
- Fix (optional): replace `anthropic-ai` with explicit `OAI-SearchBot`, `Claude-SearchBot` and `Claude-User` groups, including the `Disallow` lines from L1.

**L3. AI training policy is inconsistent.**
- Evidence: robots.txt, `User-Agent: GPTBot` with `Disallow: /`, while `Google-Extended` is `Allow: /`, and ClaudeBot and CCBot inherit allow.
- This does not affect ChatGPT Search. Allowing Google-Extended does not affect AI Overviews.
- Fix (**owner decision**): choose one training policy and apply it across GPTBot, ClaudeBot, CCBot, cohere-ai, Google-Extended and Applebot-Extended. Note that blocking Google-Extended also affects Gemini/Vertex grounding.

**L4. Copy error and thin former-state pages.**
- Evidence: https://www.ottv.org/country/congo-free-state, "are on the the Democratic Republic of the Congo page".
- Evidence: this page and https://www.ottv.org/country/east-germany have 73 and 61 words and are in the sitemap.
- Fix: correct the duplicated word. Redirect both pages to the present-day country pages, or remove them from the sitemap.

**L5. Homepage carousels sit after the footer in raw HTML, and logos come from a demo site.**
- Evidence: https://www.ottv.org/, `<div hidden id="S:0">` holds "Top 10 Movies", placed after "All rights reserved" in the source.
- Evidence: logo `src` includes `iptvwell.com/demo13/wp-content/uploads`, proxied through `/_next/image` with `alt=""`.
- These sections are visual and add no citable text. The logo dependency on a third-party demo URL is fragile.
- Fix: host any permitted logos locally. See C2 on permissions. Leave the streaming as is unless the carousels gain real text.

**L6. Homepage HTML is large.**
- Evidence: https://www.ottv.org/ is 506,769 bytes, and the first main section heading, "OTTV at a Glance", starts near byte 102,900.
- No documented AI crawler limit is known to be breached, so this is a precaution.
- Fix: trim the serialized page payload when convenient.

## Top 5 highest-impact changes

| # | Change | Effort | Who |
|---|---|---|---|
| 1 | Resolve the content-rights question with counsel (C2) | Unknown, potentially large | Owner and counsel |
| 2 | Publish real legal identity, About, Terms, Privacy, Refund; extend `Organization` (C1) | 1-2 days after facts arrive | Owner, then dev |
| 3 | Publish a dated channel and catalogue breakdown (H2), and use it to enrich priority country pages or consolidate the rest (H3) | 1-2 weeks | Owner, then dev |
| 4 | Build a real off-site presence and `sameAs`, with "OTTV IPTV" disambiguation (H1) | Ongoing, months | Owner |
| 5 | Copy pass: homepage definition, named-subject FAQs, passage fixes, buying facts (M1-M4) | About 1 day | Dev, with owner facts |

Item 5 is the cheapest and can ship first. Items 1 and 2 matter most.

## Not verified

- Live behaviour of https://www.ottv.org: DNS, CDN or WAF rules that may block AI bots, real response headers, and whether bots actually fetch the site. The domain is disabled, and only the local snapshot was tested.
- Whether iptvmax.co redirects to the new domain page by page. No such rule was found in the Next config, and it may live at the host.
- Any actual citation or mention in ChatGPT, Google AI Overviews, Perplexity, Copilot or Claude.
- Reddit, YouTube, LinkedIn and general web mentions of OTTV or IPTVMax. Fetches were blocked or empty, so absence is not established. Whether other businesses use "IPTVMax" was also not established.
- What ottv.org hosted before this site. A January 2025 capture exists, but its content could not be read. Inherited backlinks or reputation are unknown.
- Google Search Console or Bing Webmaster data, backlinks and Domain Rating.
- All service claims: channel and library counts, 4K availability, PPV inclusion, trial terms, refund practice and the 2024 publish dates.
- OTTV's legal status or content rights. No conclusion is drawn.
- How individual AI systems weigh trust signals for IPTV sellers.
- The accuracy of every country page. Key pages and all templates were read, and the rest were checked by pattern.
