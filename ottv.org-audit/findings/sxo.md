# OTTV Search Experience (SXO) Findings

Audit date: 2026-11-09. Source: production-build snapshot (216 pages, `pages.json` mapping) and screenshots. The live domain is disabled and was not fetched. Nothing in src, public or config was changed. This report makes no ranking promises.

## SXO Gap Score: 50/100

This is separate from any SEO Health Score. Each page was scored on seven dimensions, then the six pages were averaged equally (no search-volume data was available for weighting): 301 / 6 = 50.2.

| Page | Page type /15 | Depth /15 | UX /15 | Schema /15 | Media /15 | Authority /15 | Freshness /10 | Total |
|---|---|---|---|---|---|---|---|---|
| /pricing | 10 | 9 | 10 | 12 | 3 | 2 | 6 | 52 |
| /iptv-free-trial | 14 | 11 | 12 | 10 | 3 | 2 | 6 | 58 |
| /country/france | 6 | 4 | 10 | 8 | 3 | 2 | 5 | 38 |
| /country/japan | 3 | 3 | 10 | 8 | 3 | 2 | 5 | 34 |
| /devices/fire-tv | 14 | 10 | 11 | 11 | 2 | 6 | 8 | 62 |
| /devices/samsung-tv | 14 | 8 | 9 | 11 | 3 | 4 | 8 | 57 |

The average flatters order-readiness. Authority scores 2 to 6 of 15 on every page, and that is the dimension that decides whether a stranger pays.

Basis for the low scores:
- Authority: no seller identity, reviews, policies or licensing statement on any page (see C1). The device guides score higher because they cite Amazon and AFTVnews and say what was not tested.
- Media: /pricing, /iptv-free-trial and /devices/fire-tv contain only the favicon image. /devices/samsung-tv adds one stock photo.
- Freshness: guides carry an "Updated" date. /pricing and /iptv-free-trial have only "2026" in the title, and country pages show no date.

## Page-type mismatch against the SERP (primary finding)

The commercial pages are product pages, while most observed results for those terms are guides. The setup guides match their SERPs. Types follow `page-type-taxonomy.md`, which has no how-to type, so how-to guides fall under Blog Post.

| Keyword | Target page type | First 10 results returned | Consensus | Mismatch |
|---|---|---|---|---|
| iptv subscription | /pricing: Product | Guides 9, unclassifiable 1, seller pages 0 | Blog Post 90% | HIGH, low confidence |
| iptv free trial | /iptv-free-trial: Landing with testing guide | Seller trial pages 4, guides 3, other 3. All 34: sellers 14, guides 16, other 4 | Split Landing and Blog | ALIGNED |
| iptv france | /country/france: Product (price and order CTA) | Articles 5, blog tag archives 3, seller pages 2 | Blog Post 80% with archives | HIGH |
| iptv japan | /country/japan: Product (same template) | Research, data, B2B, news, playlists, 1 how-to. Consumer subscription sales pages 0 of 10 and 0 of all 16 | Informational and B2B | CRITICAL (see below) |
| iptv on fire tv | /devices/fire-tv: Blog Post (how-to) | How-to 8, comparison 1, repository 1 | Blog Post 80% | ALIGNED |
| iptv on samsung tv | /devices/samsung-tv: Blog Post (how-to) | How-to 6, comparison 1, other 3 | Blog Post 60% | ALIGNED |

Severity notes:
- The taxonomy's default for a Product page on an informational keyword is HIGH. Japan is raised to CRITICAL because no consumer sales page appears at all, and the page cannot name one Japanese channel.
- Many "guides" are sales content on hijacked subdomains (for example centennialaccessories.delta.com and store-test.haworth.com). The format signal is real; the quality bar is not one to imitate.

## Would a cautious visitor order?

**No, not as the site stands.** Some would request the no-card trial; few would pay. In the order they would hit them, these stop the purchase:

1. Who is selling this? No company name, address, email or founder appears anywhere. The only identifier is a WhatsApp number whose +212 prefix is Morocco's calling code, and the site states no location.
2. Is it licensed? "Licen[cs]e", "legal", "copyright" and "DMCA" appear on 0 of 216 pages. Meanwhile the homepage shows Premier League, NFL, UFC and Formula 1 posters and "Pay-Per-View (PPV) Events Included".
3. How do I pay? No payment method is named on any page. The visitor learns only that "the purchase is completed in that chat".
4. What protects me? No terms, privacy or refund policy page exists. The guarantee is one sentence, with no stated conditions or refund route.
5. Who else says it is good? No reviews or testimonials appear on any page. A search for the brand returned nothing about OTTV or IPTVMax.
6. Setup asks for more trust. The Fire TV guide has the visitor sideload an app from a URL sent in chat.

To its credit, the site invents no reviews and states its limits openly. That removes reasons for distrust but does not supply reasons for trust.

## What works

- Pricing is transparent: four plans, totals, monthly equivalents and savings in one table on /pricing. The arithmetic checks out ($15.82 x 12 = $189.84; saving $101.61).
- Billing is clear: "Nothing renews on its own, so there is nothing to cancel." (/pricing)
- /iptv-free-trial fits intent. The H1 states duration and no card, the CTA is in the hero, and "How Should You Test OTTV During the 24 Hours?" gives it more substance than a bare offer page.
- Limits are stated plainly: "One Stream at a Time" on every plan card, and "A person answers every request, so the reply is not always instant."
- /devices/fire-tv opens with a direct answer and a "Check your model first" warning about Vega OS, citing Amazon and AFTVnews. It also says it was "Checked against vendor documentation, not re-tested on every device or app version."
- /devices/fire-tv answers its safety question honestly: "Amazon warns that apps from unknown sources may make your device..."
- Structured data is parseable (0 errors in crawl) and prices match the visible page.
- Order links prefill the chosen plan in WhatsApp, which keeps the order step short.

## Findings

### Critical

**C1. The site gives no basis for trusting the seller, and it is silent on licensing (all 216 pages).**
Evidence:
- 0 of 216 pages contain "licen[cs]e", "legal", "copyright", "DMCA", "terms of service", a privacy notice or a company name. "Privacy" appears only in a macOS settings path on /devices/macos; "terms" only as "Billing terms" and in /devices/ios.
- Organization schema has only a name, logo and WhatsApp contact: no address, email or legal name.
- "All OTTV support runs through WhatsApp." (/contact). The /contact form collects name and email with no privacy notice.
- "OTTV, formerly IPTVMax" appears in the footer and FAQ with no explanation of the change.
- SERP: legality and safety recur in titles, such as "IPTV Subscription Service Guide: How It Works & How to Buy Safely" and "Is Your IPTV Service Legal? A Guide to Identification". A search on legality surfaced these checks: named carriage and licensing, physical address, public terms, clear refund policy. That search also listed very cheap premium-sports bundles and APK-only distribution as warning signs. OTTV fails or is silent on each. Those sources are commercial blogs, not regulators.

Fix (owner decision throughout; do not publish any of this until true):
- Licensing: if OTTV holds distribution rights, say so on /pricing, /faq and the footer with verifiable specifics. If it does not, no page copy can fix this, and none should imply otherwise. Take legal advice before continuing to advertise those channels, events or league marks. This audit does not determine licensing status.
- Remove the league and film posters from the homepage unless rights to use them are in hand.
- Publish the seller: legal name, country of operation, a non-WhatsApp contact, and why the name changed.
- Add Terms, Privacy and Refund Policy pages and link them in the footer. Adding URLs does not affect the 216 being kept.
- Once real, add those identity fields to Organization schema.

**C2. No payment method is disclosed (all commercial pages).**
Evidence: "your payment provider converts the amount at its own" rate (/pricing, /country/france, /country/japan) names no provider. No card network, PayPal, crypto or transfer term appears on any of the 216 pages. /pricing step 2 says only "the purchase is completed in that chat".
Why it matters: the refund promise cannot be judged without knowing how money moves. The SERP guidance above also warns about crypto-only providers.
Fix (owner decision): add a "How you pay" row to the /pricing "Billing terms at a glance" block and the homepage "OTTV at a Glance" table. List actual methods and how a refund is returned.

**C3. /country/japan targets an intent the SERP does not show.**
Evidence: of 16 results for "iptv japan", none is a consumer sales page. They include "IPTV Standardization and Global Testbed Trials by Japan", Statista penetration data, "6 Best Hotel IPTV Solution Suppliers in Tokyo, JAPAN" and M3U playlists. One guide names Hikari TV and AbemaTV as licensed options. The page leads with billing currency. Its answer on Japanese content is "Japanese is the official language of Japan."
Fix: keep the URL. Rebuild the first screen around what the consumer results cover: how to access Japanese content, and what is allowed in Japan. Add a short cited explainer of what IPTV means in Japan and which licensed services exist. Whether to name those services is an owner decision. Prices move below the explainer. Replace the channel paragraph as described in H1.

### High

**H1. Country pages cannot answer the query they target (/country/france, /country/japan, 197 pages in total).**
Evidence:
- First screen: "OTTV has not published a country-by-country availability or channel list." (/country/france, mobile screenshot). The same sentence is on 197 country pages.
- "Is OTTV available in France?" is answered with no yes or no.
- "French is the official language of France."
- Zero mentions of TF1, Canal+, M6, NHK or any named channel.
- Body overlap between France and Japan is 56% by 5-word shingles; France against all other country pages has a 46% median.
- SERP: "IPTV for French Channels 2026 – TF1, Canal+ and IPTV Abroad"; "is iptv france abonnement fr legal"; a follow-up French-language search returned comparison and channel-list content (selectra.info, tomsguide.fr, free.fr channel PDF).
- The filler does not help: a Unicode CLDR table of region and time zone, London kick-off conversions, and "Amazon's specification for the Fire TV Stick HD (2026) names France among its markets".

Fix:
- Owner decision: supply a verified channel list and an availability answer by country, starting with the priority markets. Publish only what can be confirmed.
- Do not delete the disclaimer until that data exists; it is honest. Until then, move it from the hero to the channels section and add a prefilled WhatsApp link: "Do you carry these channels in France: ___?"
- Replace the CLDR table and Fire TV market sentence with the three questions these searchers ask: which channels, does it work where I am, and is it allowed.
- Keep all 216 URLs; prioritise depth on a short list rather than rewriting 197 pages evenly.

**H2. /pricing is a product page on a guide-heavy SERP, with nothing to order on the first screen.**
Evidence: 9 of the first 10 results are guides, with titles built on "How It Works", "Safety Tips" and "Best Plans & Tips". On desktop (1366 wide) and mobile screenshots, the hero ends in tick marks with no plan card and no CTA in the page body. The only action is the header WhatsApp button.
Confidence is low: see Not verified, because the tool does not show ads or Shopping results.
Fix: keep /pricing as the buying page.
- Cut the hero's tick list, which repeats the sentence above it, and bring the 12-month and 1-month cards onto the first screen.
- Add "Choose a plan" and "Start free trial" buttons in the hero.
- Add a "Before you buy" section between the plan cards and the FAQ answering who sells it, how payment works, how refunds work, what player apps cost, and how to check your channels. It needs the C1 and C2 answers.

**H3. The "from $7.35" and "$0" promises leave out player-app fees that some devices require.**
Evidence:
- /pricing says "Works on TVs, Phones and Computers" and never mentions app fees.
- "These apps charge a fee paid directly to the developer, usually around €7-€16" appears only in the Samsung FAQ, after all the steps.
- iPhone and Apple TV: "Both are paid apps" (/devices/apple-tv); "which is a paid app" (/devices/ios).
- /iptv-free-trial shows "$0" and "If it does not, you owe nothing." while listing those same devices. Only SET IPTV's 7-day trial is mentioned as a way round it.
- SERP: "smart iptv on samsung and lg app setup without confusing it with a subscription" shows searchers already confuse the two.

Fix:
- Add a row to the /pricing "Billing terms" block: "Some TV and Apple players charge their own fee, paid to the app developer."
- On /iptv-free-trial, change the "$0" caption to "OTTV trial cost" and add a note linking each affected guide.
- On /devices/samsung-tv, move the fee from the FAQ to "What You'll Need".

**H4. The Fire TV guide locks out trial users at step 3 and asks for a leap of faith.**
Evidence: "What You'll Need" accepts "An active OTTV plan or free trial". Step 3 then says "You will receive this unique URL from us after you subscribe". Step 5 refers to the login "we sent you when you ordered". /iptv-free-trial tells trial users this guide is what to follow.
SERP: results summarise a player-install path with named apps, such as IPTV Smarters Pro and TiviMate. The legality search listed APK-only distribution as a warning sign. A vendor-supplied download link sent in chat is the riskiest moment in the journey.
Fix: owner decision on whether trial users receive the URL. If yes, reword steps 3 and 5 to "when you request the trial or order". Say what the file is and who makes it, and, where a player has an official download page, link it. Add step screenshots from a real device (the page has only the favicon image).

**H5. Samsung compatibility is disclosed only after the steps.**
Evidence: "NET IPTV lists Samsung TVs from 2016 to 2020." is in the last FAQ. The intro promises installation without qualification. /devices/fire-tv puts its equivalent warning first. SERP results stress model and firmware checks and a Fire Stick fallback, and they conflict on which apps exist, so a clear answer has value.
Fix: add a "Check your model first" box before "What You'll Need", as on the Fire TV guide. State supported years per app from each developer's site, and put the "external streaming device" fallback in that box. Coverage for SET IPTV needs checking at source; the page gives none.

### Medium

**M1. Trial terms have gaps that decide whether someone starts.** Evidence: /iptv-free-trial does not say when the 24 hours start (request or first login), who is eligible, or typical reply time. "A person answers every request, so the reply is not always instant." sits alongside "Start Your OTTV Free Trial Tonight". "No card" is stressed, while sharing a phone number with the seller is not mentioned. SERP: "Free trial · 24h · no cardNo payment info ever taken" shows no-card is table stakes. Fix (owner decision): state clock start, one-per-person rules and support hours with time zone.

**M2. "25,000+ channels" and "120,000+ titles" are unsupported and read like competitors' spam.** Evidence: repeated on every commercial page with no list, sample or search. SERP pages use the same pitch ("Best IPTV Subscription: No Buffering, 25K+ Channels"), and a French search result warned against offers like "12,000 channels for 5 €/month". Fix (owner decision): a browsable sample by country or category, only if accurate.

**M3. English-only pages for non-English markets.** Evidence: all 216 pages are `lang="en"`. French-language queries return French pages (lepetitjournal.com, selectra.info). Fix (owner decision): translate /country/france and the order path if France is a real market; the English page can stay for expats.

**M4. Refund wording is too thin for a prepaid plan.** Evidence: "Paid plans come with a 7-day money-back guarantee." has no conditions, timing or method. A cautious buyer on an $88.23 prepaid plan will want them. Fix (owner decision): publish the conditions in the Refund Policy from C1, and have counsel review it for EU and other consumer rules.

**M5. The two "from" prices need the upfront cost beside them.** Evidence: /pricing title and hero say "From $7.35", while step 1 says "Plans start at $15.82". $7.35 requires paying $88.23 at once. Both are true, and the table is clear further down. Fix: in the hero, write "$7.35 a month on the 12-month plan ($88.23 once), or $15.82 for one month."

**M6. Possible same-name site in the results.** Evidence: `ottv.vercel.app/docs/how-to-install-iptv-on-firestick` and the matching Samsung path appeared for both device queries. The page returned HTTP 402, so ownership is unknown. Fix (owner decision): if it is yours, retire or redirect it; if not, note the brand overlap when deciding how to present OTTV.

### Low

**L1.** Every guide shows "Updated: November 9, 2026", and 11 of 11 share that date, which reads like a build date. Show a date only when a guide was reviewed.

**L2.** /devices/fire-tv breadcrumb is "Home / How Do I Install IPTV..." with no "Setup Guides" level, although the nav has one at `/#devices`. Add it.

**L3.** Plan cards on /pricing have no recommended marker, although /iptv-free-trial labels 12 months "Best value". Align them.

**L4.** The homepage logo strip loads 15 logos from `iptvwell.com/demo13/`, a third-party demo path, with empty alt text. Replace with owned assets or remove.

**L5.** FAQPage and HowTo markup is fine for accuracy, but Google has restricted those rich results, so do not expect SERP features from them.

## User stories (from SERP signals)

Only titles and URLs were available, so these cite titles rather than PAA or ads.

1. As a cautious first-time buyer (consideration), I want to know a provider is real and allowed, because I am paying a stranger upfront, but I am blocked by no seller identity or licensing statement. Signal: "How It Works & How to Buy Safely"; "Is Your IPTV Service Legal?"
2. As a plan shopper (decision), I want the real total cost, because prices vary by length and device, but I am blocked by undisclosed payment methods and app fees. Signal: "Best Plans & Tips"; "IPTV Subscription Buy Now".
3. As a trial tester (decision), I want to test without commitment, because I have been warned about these services, but I am blocked by unclear start time and reply time. Signal: "explained without the hype"; "no card".
4. As a French-speaker abroad (consideration), I want to confirm TF1 and Canal+ before paying, because those channels are the reason I am searching, but I am blocked by no channel information. Signal: "IPTV for French Channels 2026 – TF1, Canal+ and IPTV Abroad".
5. As a Samsung owner mid-setup (awareness to action), I want to know which app works on my model, because sources conflict, but I am blocked by a compatibility note at the end of the page. Signal: "How to Set Up IPTV on Samsung Smart TV (Tizen OS Guide)".

## Persona scores (weakest first)

| Persona | SERP evidence | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Japan content researcher | "IPTV in Japan: What You Need to Know"; M3U results | 5 | 13 | 5 | 10 | 33 | Critical Mismatch |
| Cautious first-time buyer | "How to Buy Safely"; legality titles | 8 | 12 | 4 | 10 | 34 | Critical Mismatch |
| French channel seeker | "TF1, Canal+ and IPTV Abroad" | 9 | 14 | 5 | 12 | 40 | Needs Work |
| Samsung TV owner | "Tizen OS Guide" | 18 | 14 | 10 | 14 | 56 | Needs Work |
| Fire TV owner | "How to Install IPTV on Fire Stick" | 20 | 17 | 11 | 13 | 61 | Good |
| Plan shopper | "Best Plans & Tips" | 20 | 20 | 8 | 18 | 66 | Good |
| Trial tester | "24h, no card" pages | 23 | 22 | 9 | 20 | 74 | Good |

Trust is the systemic weakness: it is the lowest or joint-lowest dimension for all seven personas.

Improvements, weakest first:
1. Japan researcher: rebuild the first screen as an explainer (C3).
2. Cautious buyer: identity, licensing, payment, policies (C1, C2). Nothing else moves this persona.
3. French channel seeker: verified channel answer and a channel-question WhatsApp link (H1, M3).
4. Samsung owner: model check and app fee before the steps (H3, H5).
5. Fire TV owner: unblock trial users at step 3 and add screenshots (H4).
6. Plan shopper: first-screen plan cards and a payment row (H2, C2, M5).
7. Trial tester: clock start, eligibility and reply hours (M1).

## Not verified

- **No real Google SERP.** WebSearch returned titles and URLs only, from a US vantage point. There were no positions, PAA, ads, Shopping, AI Overview, local pack or related searches. Result order is treated as an approximation. Live Google results may differ, notably for /pricing.
- Result types were judged from titles and URLs. Competitor pages were not opened, so their depth, schema and media are unassessed.
- Search volume was not available, so personas and pages are unweighted.
- Licensing status, channel counts, trial and refund handling, reply times and payment methods cannot be verified from the site.
- OTTV's and IPTVMax's reputation: one search found nothing. The live domain is disabled, so third-party coverage may not reflect the brand.
- The rendered experience comes from the snapshot and viewport-sized screenshots of /, /pricing, /locations, /country/france, /country/east-germany and /devices/fire-tv. /iptv-free-trial, /country/japan and /devices/samsung-tv have no screenshots, so their first-screen layout is inferred from markup. Core Web Vitals and real-device interaction were not measured.
- `render_page.py` and `parse_html.py` were not used, because the live domain is disabled; the parsed crawl snapshot was used instead.
- Accuracy of the setup steps, app availability and third-party app pricing were not tested on devices.
- The current state of Google's FAQ and HowTo rich-result policy was not re-checked for this audit.
- The content of the iptvwell.com logos and the ownership of ottv.vercel.app are unknown.
- The homepage posters were read from the HTML (a streamed section). The viewport-sized homepage screenshot does not reach them, so their on-screen appearance was not seen.

Related follow-ups: `/seo content` for E-E-A-T, `/seo schema` for Organization fields once real, `/seo page` for thin country pages. Generate a PDF report? Use `/seo google report`.

## Sources

SERP queries run 2026-11-09: iptv subscription; iptv free trial; iptv france; iptv japan; iptv on fire tv; iptv on samsung tv; OTTV IPTV reviews; is iptv subscription legal; IPTV for French channels.

- [IPTV Subscription Service Guide: How to Buy Safely](https://market.phonehouse.es/blogs/news/iptv-subscription-service-guide-how-it-works-how-to-buy-safely)
- [IPTV Subscription Guide 2026 – Best Plans & Tips](https://top10iptv.substack.com/p/iptv-subscription)
- [Best IPTV Subscription: No Buffering, 25K+ Channels](https://offline.lilysilk.com/blogs/news/best-iptv-subscription-no-buffering-25k-channels)
- [Free trial · 24h · no card](https://iptvukfreetrial.it.com/free-trial)
- [iptv subscription free trial explained without the hype](https://www.indiehackers.com/post/iptv-subscription-free-trial-explained-without-the-hype-UBQcqBw6YBKJPAmAcPVP)
- [IPTV for French Channels 2026](https://shop-test.natmus.dk/blogs/news/iptv-for-french-channels-2026-tf1-canal-and-iptv-abroad)
- [is iptv france abonnement fr legal](https://france-iptv.it.com/blog/is-iptv-france-abonnement-fr-legal/)
- [L'essentiel sur l'abonnement IPTV en France](https://selectra.info/telecom/tv/iptv)
- [Meilleures IPTV (Tom's Guide FR)](https://www.tomsguide.fr/meilleures-iptv-quel-abonnement-choisir)
- [Free channel list PDF](https://portail.free.fr/media/003_Liste_des_chaines_7cd0f207d5.pdf)
- [IPTV Standardization and Global Testbed Trials by Japan](https://www.ituaj.jp/wp-content/uploads/2014/01/nb26-1_4_iptv.pdf)
- [Statista: IPTV penetration in Japan](https://www.statista.com/forecasts/1137626/iptv-penetration-forecast-in-japan/)
- [6 Best Hotel IPTV Solution Suppliers in Tokyo](https://issuu.com/sharonwright123/docs/117-japan.html)
- [IPTV in Japan: What You Need to Know](https://skdesu.com/en/iptv-in-japan-what-you-need-to-know/)
- [How to Install IPTV on Fire Stick: Complete 2026 Guide](https://iptv.us.com/blog/how-to-install-iptv-on-firestick)
- [How to Set Up IPTV on Samsung Smart TV (Tizen OS Guide)](https://iptv.us.com/blog/how-to-set-up-iptv-on-samsung-smart-tv)
- [smart iptv on samsung and lg without confusing it with a subscription](https://www.indiehackers.com/post/smart-iptv-on-samsung-and-lg-app-setup-without-confusing-it-with-a-subscription-ac11f9f78c)
- [ottv.vercel.app Fire TV doc](https://ottv.vercel.app/docs/how-to-install-iptv-on-firestick)
- [ottv.vercel.app Samsung doc](https://ottv.vercel.app/docs/how-to-install-iptv-on-samsung-smart-tv)
- [How to tell if an IPTV provider is legitimate](https://iptv-smarters-pro.ai.studio/guides/how-to-tell-if-iptv-provider-is-legitimate/)
- [Is Your IPTV Service Legal? A Guide to Identification](https://ulcm.s3.amazonaws.com/mdx/iptv-service-subscription-provider-639.html)
