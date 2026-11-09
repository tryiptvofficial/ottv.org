# OTTV content quality audit

Audited: 9 November 2026. Source: production build snapshot of http://localhost:9010 (216 URLs, all HTTP 200), with `src/lib` as read-only reference.
Scope: E-E-A-T, usefulness, readability, thin content, near-duplication at scale, and substantiation of claims. Technical and schema checks are excluded.

Rules applied here: quotes are under 15 words and taken from the site. Anything only the owner can supply is tagged **Owner decision**. All 216 URLs are assumed to stay; merging, deleting or noindexing is an owner decision and not offered as a fix. Nothing in this report predicts rankings.

## 1. Score

**Content quality: 37/100**

The score uses this skill's internal model. Google publishes no numeric E-E-A-T or content weights.

| Component | Weight | Score | Points | Basis |
|---|---|---|---|---|
| E-E-A-T (see below) | 30% | 29 | 8.7 | Honest copy, but no identifiable business and no external proof |
| Usefulness to a real visitor | 25% | 45 | 11.25 | Core pages and guides are useful; 199 of 216 URLs add almost nothing |
| Originality at scale | 20% | 15 | 3.0 | 197 pages from one template, with no OTTV fact that varies by country |
| Substantiation and accuracy | 15% | 40 | 6.0 | Arithmetic is correct; headline claims are unproven; country data has errors |
| Readability | 10% | 85 | 8.5 | Plain, short sentences across all page types |
| **Total** | 100% | | **37.45, reported as 37** | |

### E-E-A-T breakdown

| Factor | Weight | Score | Why |
|---|---|---|---|
| Experience | 20% | 25 | Guides say they were checked against vendor docs and not tested. No screenshots of a real setup, no test results, no customer evidence |
| Expertise | 25% | 50 | Device guides are specific and careful about limits. No named author or stated qualifications; country data contains errors |
| Authoritativeness | 25% | 10 | The site shows no third-party recognition of OTTV |
| Trustworthiness | 30% | 30 | Disclosures are candid, but there is no legal entity, terms, privacy notice, payment information or rights statement |
| **Weighted** | | **29** | |

### AI citation readiness: 55/100

Strong points are answer-first guide intros, question headings, and a quotable "OTTV at a Glance" block on the homepage. Weak points are that the entity behind the service cannot be identified, the headline figures have no source, and country pages tell a reader that the key fact is unknown. Outside this audit's scope, but relevant: `robots.txt` disallows GPTBot while allowing ChatGPT-User.

### Measurements

| Page type | Words, main content | Coverage floor | Flesch Reading Ease (median) | FK grade (median) |
|---|---|---|---|---|
| Core (6) | 353 to 1,929 | Homepage 500, service 800 | 80 | 5.6 |
| Guides (11) | 455 to 651 | No floor in this model; judged on task completion | 71 | 6.8 |
| Live country (197) | 642 to 761, median 660 | Location 500 to 600 | 75 | 6.7 |
| Former states (2) | 61 and 73 (crawler count) | Location 500 to 600 | Not meaningful | Not meaningful |

Word counts are not a ranking factor and are used only as a coverage floor. The 197 live pages clear the floor mainly through repeated copy (see C1).

## 2. What works

Keep these. They are the best assets on the site and they are unusual for this category.

- **Candid limits.** /locations says "these pages do not confirm coverage", and plans list "One Stream at a Time" as a plain line item.
- **Third-party costs disclosed.** /devices/samsung-tv states "This fee is separate from your OTTV plan."
- **Real device caution.** /devices/fire-tv explains that Vega OS models will not run the guide. I fetched the Amazon and AFTVnews sources on 9 November and they support the Vega OS statements.
- **No fabricated proof.** I found no invented authors, reviews, ratings, certifications or statistics in the rendered text.
- **Billing is plain.** /pricing says "Nothing renews on its own, so there is nothing to cancel." All plan arithmetic checks out (19%, 38%, 54%, and the $101.61 annual saving).
- **Rebrand disclosed.** The footer says "OTTV, formerly IPTVMax", on every page.
- **Readable and answer-first.** Guide intros give the method in the first sentence. /devices/roku is explicit about the screen-mirroring limits.
- **Guides are genuinely distinct.** Across the 11 guides, 8-word shingle Jaccard similarity has a median of 0.10 and a maximum of 0.14 (Samsung and LG).
- **Metadata does not show bulk-CTA templating.** `metadata_template.py` over 216 pairs returned site_risk low, templated_ratio 0.0, and no shared_cta_phrases. Caveat in L7: that tool compares each title with its own description, so it cannot see a site-wide sentence frame.

## 3. Findings

### Critical

#### C1. 197 country pages are one template with no country-specific OTTV information

Evidence, measured across all 197 live pages:

| Test | Result |
|---|---|
| Word-sequence match between pages (250 random pairs) | median 88%, range 72% to 96% |
| Close regional pairs | Mali and Togo 97%, Kenya and Tanzania 96%, Tuvalu and Niue 94% |
| Raw 8-word shingle Jaccard (all 19,306 pairs) | median 0.44, max 0.66. Understated, because inserted country names break shingles |
| Words in lines identical on at least 90% of pages, after masking name, currency, language and time | median 79% |
| Same, lines on at least 50% of pages | median 90% |
| Distinct page bodies after masking and removing neighbour links | 98 skeletons for 197 pages; largest clusters hold 11, 11, 10, 9 and 7 pages |
| Number of OTTV facts that vary by country | **0**, confirmed in `src/lib/country-content.ts` |

Every variable on these pages is public reference data (Unicode CLDR) or membership of an Amazon or Roku list. Price, service, trial, ordering and guides are the same everywhere.

- /country/kenya and /country/tanzania open with the same frame: "OTTV plans are charged in US dollars, not the"
- /country/germany: "OTTV has not published a country-by-country availability or channel list."
- /country/tuvalu: "OTTV does not publish a channel list by language."
- All 197 pages contain both of those statements.

**Honest risk assessment.** I think this set carries real exposure under Google's spam policies. Scaled content abuse covers producing many pages with little value primarily for search visibility, however they are generated. Doorway abuse covers near-identical pages aimed at specific regions that funnel to one destination, and here all 197 lead to the same WhatsApp order. The candour of the copy is good for users, but it does not add value and it documents that the pages have nothing local to say. Rewording, spinning or adding more reference facts would not change this, because the gap is missing information and not missing words. Because 197 of 216 URLs are affected, weakness here could colour how the whole site is assessed. I cannot tell whether any action has been or will be taken.

**Fix, keeping all URLs:**
1. Stop treating template variation as the goal. Only country content that OTTV itself knows can differentiate these pages.
2. Have the owner supply, per country, what can be stated truthfully: tested channel groups or sample channel names by language, payment methods that work there, any service restrictions, and support languages or hours.
3. Start with the markets OTTV really serves. Hand-write those pages with the supplied facts and leave the rest plainer and shorter, so that the pages stop pretending to equal depth.
4. Remove generic padding from every page (see M1 and M5).

**Owner decision:** whether to keep 197 indexable location pages, consolidate into a smaller set of regional pages, or noindex countries with no market activity. If the owner cannot supply country-level facts, I recommend reconsidering the indexable footprint, since no copy change can substitute for those facts.

#### C2. The business behind the service cannot be identified, and the transaction terms are missing

A visitor is asked to pay through a chat with no way of knowing who they are paying.

- /contact: "All OTTV support runs through WhatsApp."
- Footer, all pages: "© 2026 OTTV. All rights reserved." No company name, address or jurisdiction appears anywhere.
- /pricing: "the purchase is completed in that chat." No page names an accepted payment method.
- /country/germany: "your payment provider converts the amount at its own rate" while never saying what provider can be used.
- /faq: "Paid plans come with a 7-day money-back guarantee." No conditions, exclusions, or how money is returned.
- /contact collects a name and email through its form, and no privacy notice exists. `src/app` has no terms, privacy or refund route, and the footer links to none.

The Quality Rater Guidelines treat knowing who is responsible for a site as central to trust, especially where money changes hands. Trust is the largest gap on this site.

**Fix:** add About, Terms, Privacy and Refund pages and link them in the footer. Add a payment-methods line to /pricing and replace the "payment provider" wording on country pages once methods are known. Add a short privacy notice beside the contact form.

**Owner decision:** all of the content for this: legal entity, address or jurisdiction, accepted payment methods, full refund terms, data handling, and support hours or response targets. Nothing should be published here that the owner cannot stand behind.

#### C3. No rights statement, while the homepage displays major broadcaster logos, film posters and league artwork

- /: "120,000+ On-Demand (VOD) Movies & TV Shows" and "PPV events come with every plan at no extra cost."
- / shows the headings "Top 10 Movies" and "Sports Events", with poster images labelled for films and leagues including Clayface, Practical Magic 2, NFL, UFC, Premier League, Champions League and Formula 1.
- The homepage logo strip, which sits directly below the hero in `src/app/page.tsx`, contains 15 images. I viewed all 15 from the build: Netflix, HBO, Disney+, Prime Video, Apple TV, Hulu, Discovery Channel, beIN Sports, Formula 1, Viaplay, Videoland, Ziggo Sport, NLZIET, NPO Plus and Film1.
- Those logos load from `iptvwell.com/demo13`, a different IPTV site's template demo.
- `src/lib/site-data/brands.ts` labels the same slots as Forbes, TechCrunch, Wired and others, and `placeholder-images.json` describes them as "representing media mentions and authority". The labels and the actual images do not match. No press claim appears in the rendered text, and it should stay that way.
- No page says whether OTTV holds rights to distribute any channel, film or event. /faq has no question on legality or licensing.

A visitor sees the marks of services and rights holders next to a $7.35 a month offer and reasonably infers a relationship. I am not asserting what OTTV's rights position is, because the site does not say and only the owner knows. The combination is still a serious trust and legal exposure, and low-priced IPTV with thousands of channels is a category that draws scrutiny over rights.

**Fix:** remove the logo strip and the poster and league carousels unless documented permission exists for each mark. Replace them with what OTTV can prove, such as genuine screenshots of its own player interface.

**Owner decision:** whether OTTV holds distribution rights and what can be said about them, including any statement on licensing, takedown contact or a rights-holder complaint route. Take legal advice before publishing. Do not write any "fully licensed" style claim unless it is true and documented.

### High

#### H1. Country data states verifiable errors as fact

The pages cite "Regional data from Unicode CLDR 49", but CLDR language data is not a list of legal official languages, and the template turns it into flat claims. The errors below come from general reference knowledge and should be checked against each country's constitution or government source.

| URL | Quote | Problem |
|---|---|---|
| /country/south-africa | "English is the official language of South Africa." | South Africa has multiple official languages |
| /country/ukraine | "Ukraine has several official languages, including Ukrainian and Russian." | Ukrainian is the sole state language; sensitive error |
| /country/ukraine | "Ukraine spans 2 standard time offsets, from UTC+2 to UTC+3" | The UTC+3 appears to come from occupied Crimea's timezone entry; sensitive error |
| /country/montenegro | "Serbian is the official language of Montenegro." | The constitution names Montenegrin |
| /country/liechtenstein | "including German and Swiss German" | German is the official language; Swiss German is a dialect |
| /country/nigeria | "Nigeria has several official languages, including English and Yoruba." | English is the official language |
| /country/senegal | "Senegal has several official languages, including Wolof and French." | French is the official language; Wolof is a national language |
| /country/comoros | "including Arabic, zdj, wni and French" | Raw language codes published to readers |
| /country/china | "China spans 2 standard time offsets" | China officially uses a single time, UTC+8 |
| /country/morocco | "Morocco is on UTC+1 all year." | Morocco moves its clocks back for Ramadan |

These pages also present a quick-facts panel, so a wrong value is prominent. 68 pages carry the "several official languages" sentence and none has been checked individually.

**Fix:** replace "official language" with neutral wording such as "Languages commonly used" in the template, which removes most of the legal claim at once. Correct or override the entries above in the data. Add a human-reviewed override file for sensitive countries. Consider removing time-zone and official-language claims altogether, since they do not help anyone buy or set up IPTV.

#### H2. Headline claims have no supporting evidence

- /: "25,000+ live channels and 120,000+ on-demand titles on every plan"
- /iptv-free-trial: "No channel group, library section or feature is held back for trial users."
- /iptv-free-trial: "Trial streams play at the same quality as paid ones"
- /: "HD and 4K streams on the channels and titles that offer them." No figure or example of what is 4K.
- /faq: "We recommend a steady download speed of 25 to 30 Mbps" with no basis given.

`product-facts.ts` records that the owner confirmed the two totals on 2 November 2026, so they are not invented. However, a visitor cannot verify them, and no channel list, country breakdown or category count is published. "25,000+" appears 10 times each on / and /pricing, which repeats rather than substantiates the claim.

**Fix:** state once, near the claim, what the figure covers and how it was counted. Cut repetitions on / and /pricing to about 3. Replace absolute trial promises with wording the owner confirms is operationally true.

**Owner decision:** whether to publish a channel list, a searchable lineup or a breakdown by country and language. This single item would also provide the country-level data C1 needs.

#### H3. Country pages cannot answer the visitor's main question

The H1 says "IPTV in the Holy See", but the answer to the key question is that OTTV does not say.

- /country/japan and all others: "Is OTTV available in Japan?" is answered with a referral to WhatsApp or the trial.
- /country/china: "you order on WhatsApp". WhatsApp is widely reported as blocked in China, and the site offers no other ordering or support channel. The template cannot accommodate this.
- /locations: "these pages do not confirm coverage."

**Fix:** answer the question directly once the owner confirms the position. If the service is not geo-restricted, one truthful sentence would resolve it for every page. Where a channel of contact is known not to work, say so and give an alternative.

**Owner decision:** published availability position; an ordering route that does not depend on WhatsApp; and whether OTTV should market to or take payment from sanctioned or heavily restricted markets (for example /country/iran, /country/syria, /country/cuba, /country/russia, /country/belarus). That last point needs legal review, because USD billing and payment processing can raise compliance questions.

#### H4. The two former-state pages are thin and the titles over-promise

- /country/congo-free-state, 73 words: "OTTV publishes nothing specific to Congo Free State"
- Same page has a template bug: "on the the Democratic Republic of the Congo page"
- /country/east-germany, 61 words: "This page stays online for people searching the historical name."
- Their titles end "IPTV Information | OTTV", while the body says there is no such information.
- /locations lists them under "Former States", which is a reference exercise and not useful to a buyer.

**Fix:** correct the duplicated "the" in the `historicalEntries` successor name or sentence. Change the titles to name the historical state and its present-day country, without "IPTV Information". Remove the sentence explaining why the page exists.

**Owner decision:** keep these indexed, or noindex or redirect them. I would not recommend keeping them indexed, but the URLs are the owner's call.

#### H5. Fire TV guide sends users to a seller-supplied APK without saying what it is

- /devices/fire-tv: "You will receive this unique URL from us after you subscribe"
- The same guide requires "An active OTTV plan or free trial", so it does not say how trial users get the URL.
- The page itself warns: "Amazon warns that apps from unknown sources may make your device"

Asking users to enable sideloading and install an unnamed file from a seller they cannot identify (C2) is a security and trust problem, and the safety answer offers no practical guidance about this file.

**Fix:** state the exact app, developer and where the file originates. Tell users how to check it. Make the trial path explicit in step 3.

**Owner decision:** which APK OTTV distributes, whether it is modified, and whether the developer permits that distribution.

#### H6. No first-hand experience is visible

- Every guide: "Checked against vendor documentation, not re-tested on every device or app version."
- None of the 11 guides has a screenshot of a real setup. Apart from the site logo, the only images are one Unsplash stock photo on each of 6 guides, such as "Apple TV box on a dark surface" on /devices/apple-tv.
- /devices/apple-tv: "Open the app and locate the option to add a new playlist."

The statement is honest and should stay until it stops being true, but it confirms that the guides show no experience signal. Generic steps like the Apple TV one are where a real walkthrough would help most.

**Fix:** have someone complete each guide on a real device, using OTTV credentials. Add dated screenshots and the app and OS versions used, and then update the statement to match exactly what was tested. Publish real support learnings, such as the three most common failures per device. Do not add authors or test claims unless they are real.

**Owner decision:** who performs the testing and whether a real staff name can be attached.

### Medium

#### M1. The Amazon paragraph on country pages misleads by omission and is padding

- /country/tuvalu: "does not name Tuvalu among its listed markets"
- Amazon's specification, fetched 9 November, ends the Fire TV Stick HD (2026) marketplace list with "Other supported countries". The statement is literally true on 179 pages but implies an unavailability the source does not state.
- The same paragraph on the other 18 pages discusses a stick that the guide cannot use anyway. /country/germany: "names Germany among its markets, but that model runs Vega OS"

**Fix:** delete the per-country Amazon and Roku claims. One line works everywhere: choose a Fire TV model running Fire OS, and check your local store. The Fire OS warning is already covered in /devices/fire-tv.

#### M2. Samsung and LG guides recommend apps whose stated range excludes many current TVs

- /devices/samsung-tv intro recommends "search for 'SET IPTV' or 'NET IPTV'"
- Only in the FAQ: "NET IPTV lists Samsung TVs from 2016 to 2020."
- /devices/lg-tv: "NET IPTV lists webOS 1.0 to 5.0."

Buyers with a recent TV learn this after following the intro, and possibly after paying.

**Fix:** move compatibility ranges to the top of each guide, as /devices/fire-tv does with its model check. State what to do for newer sets.

#### M3. "From $7.35" leads where the lowest actual outlay is higher

- /country/kenya meta description and /pricing title use "from $7.35", which requires one prepayment of $88.23.
- /pricing intro: "Choose your OTTV plan, from $7.35 a month."
- /pricing, lower down: "Plans start at $15.82 for one month."

The body copy is clear, but the two "from" statements conflict.

**Fix:** use "$15.82 for 1 month, or $7.35 a month on the 12-month plan", the phrasing already in the homepage facts block.

#### M4. Speed guidance is inconsistent

- /devices/troubleshooting intro: "check that your internet speed is at least 25 Mbps"
- Same page: "For HD and 4K, we recommend a steady download speed of 25-30 Mbps."
- Same page: "Netflix lists 15 Mbps or higher" for 4K.

One threshold for HD and 4K is unlikely to be right, and citing a lower Netflix figure undercuts it without explanation.

**Fix:** give separate HD and 4K figures with the reason OTTV's are higher. **Owner decision:** the real stream bitrates.

#### M5. The London kick-off sentence is filler on 197 pages

- /country/tuvalu: "A 20:00 winter kick-off in London is 08:00 the next day"
- It appears on every live page, assuming that the visitor cares about one fixed English football slot.

**Fix:** remove it. If time-zone advice is kept, tie it to catch-up availability that OTTV confirms.

#### M6. The free-trial FAQ drops the Fire OS caveat

- /iptv-free-trial: "Any device that runs a player app: Amazon Fire TV Stick,"
- /faq says "models running Fire OS", and /devices/fire-tv explains why that matters.

A trial user with a Vega OS stick would fail on the page most likely to attract new customers.

**Fix:** reuse the /faq wording.

#### M7. "Standard" and "custom" plans are mentioned but never defined

- /faq: "message us on WhatsApp about a custom plan."
- /pricing lists only one plan type per length.

**Fix and Owner decision:** publish what a second connection costs, or drop the "standard" framing.

#### M8. FAQ copy is duplicated between the homepage and /faq

81% of /faq's 8-word shingles also appear on /. /pricing repeats several of the same answers.

**Fix:** keep the 4 or 5 buying questions on the homepage and link to /faq for the rest.

#### M9. Freshness signal is uniform

All 11 guides show "Updated: November 9, 2026", from one identical timestamp in `how-to.json`.

**Fix:** change the date only when that guide is materially edited, and name what changed.

### Low

- **L1. Grammar artefacts of the template.** /country/germany: "Can I pay for OTTV in the Euro?" reads unnaturally; use "in euros". /country/tuvalu: "Does OTTV have Tuvalu-language channels?" should read Tuvaluan. /country/nauru: "including English and Nauru" should read Nauruan.
- **L2. Duplicate language labels.** /country/norway: "Norwegian Bokmål, Norwegian and Norwegian Nynorsk". Show Norwegian alone, or Bokmål and Nynorsk.
- **L3. Count includes extinct states.** /: "There are pages for 199 of them" follows "your country or territory", but two pages cover former states. Say 197 countries and territories.
- **L4. Region labels are data-feed terms.** "Other Pages in Northern America" has a single link on /country/united-states; "Micronesian Region" and Mexico under Central America are unusual to readers. Neighbour lists are alphabetical (Germany links to Liechtenstein, not France). Use plain region names and real neighbours.
- **L5. Country names that may differ from common usage.** /country/burma has H1 "IPTV in Burma", and /country/holy-see is commonly searched as Vatican City. **Owner decision** on naming, then mention the alternative name in the page text.
- **L6. Guide boilerplate.** "A compatible Apple TV" and matching lines in every guide's needs list say nothing. Name real requirements such as tvOS version, or a payment for the app.
- **L7. Metadata.** The script flagged 6 pages for brand in the description (site name inside a real sentence, so acceptable) and 3 for echoing the title (/country/central-african-republic, /country/democratic-republic-of-the-congo, /country/saint-vincent-and-the-grenadines). It cannot see that all 197 live country descriptions share one frame beginning "IPTV in", and 178 of 197 titles share one exact pattern. Differentiate them when C1 provides real differences.

## 4. Not verified

- **Whether any OTTV claim is true:** channel and title counts, PPV coverage, 4K availability, trial access, the refund being honoured, stream quality, or support speed. I had no credentials and did not test the service.
- **OTTV's licensing or legal status.** The site does not say and this audit cannot determine it.
- **Whether the homepage logos and posters display as intended on screen.** They are present in production HTML and I viewed each logo image, but the saved homepage screenshot shows only the first viewport.
- **Current cinema or streaming status of the films on the homepage,** and whether OTTV offers them.
- **Language and time-zone corrections in H1.** These rest on general reference knowledge; confirm against official sources. I reviewed the data file for all 197 countries by eye and did not verify every entry, so more errors may exist.
- **WhatsApp availability by country,** including China, and any sanctions or payment restrictions. Current status needs checking and legal input.
- **Guide accuracy on real devices.** I checked the Amazon specification and the AFTVnews article only. Not checked: Roku documentation, the Netflix figure, app store listings, developer sites or quoted app prices.
- **Search performance or any Google action.** The domain is disabled and no Search Console, traffic or link data was available, so external reputation and authority could not be assessed beyond what the site shows.
- **Rendering differences.** Text was extracted from the production snapshot's main content with a parser I wrote. Readability figures use an approximate syllable counter and are indicative only. The sequence-match statistics use a random sample of 250 pairs; shingle and line statistics cover all pages.

## 5. Owner decisions, in priority order

1. Rights position: what OTTV may legally distribute, and what can be said publicly (C3).
2. Legal entity, terms, privacy, refund terms and accepted payment methods (C2).
3. Future of the 197 country pages and 2 former-state pages: enrich, consolidate or noindex (C1, H4).
4. Publishing a channel lineup or by-country data (H2, C1).
5. Availability statement, a non-WhatsApp route, and legal review of restricted markets (H3).
6. Fire TV APK source and real-device testing of guides (H5, H6).
7. Real speeds, multi-connection pricing, and country naming (M4, M7, L5).
