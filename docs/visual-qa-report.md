# Visual QA — master report

Inspection only; no site code was changed. Five specialist audits (spacing, alignment, typography,
component consistency, responsive) ran on the same evidence: headless-Chrome captures of 10 routes
at 1440 / 1024 / 768 / 390px (plus 360 / 640 / 900 / 1280 probes for breakpoint defects), with
full-page screenshots and rendered measurements. The 108 raw findings were merged into 46 distinct
issues below. High-severity items were re-checked against the measurements before inclusion.

Per-agent reports with every measurement and screenshot reference live in the session scratchpad
(`qa/reports/agent1-spacing.md` … `agent5-responsive.md`).

**What already passes:** no horizontal overflow on any route at any width; the 1200px container
edges (152–1288 at 1440, 32–992, 24–744, 16–374); section padding, SectionHeader rhythm
(eyebrow → 16 → H2 → 16 → lead → 48 → content), card padding 24px and grid gaps render as specified;
the type scale renders as specified at every width; navbar items and icon tiles are optically
centred; pricing CTAs share one baseline at every width; inputs, badges, base cards and accordions
are identical everywhere.

No issue is **Critical** (nothing is broken, hidden or unusable).

---

## HIGH

| # | Route | Component | Width | Issue | Correction |
|---|---|---|---|---|---|
| H1 | /devices/* (11 pages) | Install-steps list | all | Steps indented 24px off the article edge (tile x=176 vs H2 x=152; 40 vs 16 at 390). The `.prose` rules exclude children of `.not-prose` but not the `.not-prose` element itself, so the `<ol>` still gets `pl-6` | `globals.css` prose selectors: `:not(:where(.not-prose *))` → `:not(:where(.not-prose, .not-prose *))` |
| H2 | /iptv-free-trial | "3 Easy Steps" grid + Signal Line | 640–1023 | `Grid cols={3}` is 2 columns there: step 03 sits alone under 01; the connector spans 144–624 and joins only two steps, ~6px below the circle centres. Same content is built differently from the home How-it-works (cards, `01 / STEP`, 40px tiles vs bare centred columns, 48px tiles with card-coloured fill) | Rebuild on the HowItWorks pattern, or `grid-cols-1 lg:grid-cols-3` with the line `lg:block` and centred on the tiles; tiles `IconTile` default (md) without `bg-card` |
| H3 | /checkout, /faq, /contact, /iptv-free-trial | Page top | all | Title starts at y=199 on PageHeader pages but 215 (checkout), 239 (free trial), 242 (FAQ); contact has no title block. Breadcrumb→title 48px vs 32px elsewhere; free-trial hero uses `spacious` (+40px, 125px dead space below) | Free trial: drop `spacing="spacious"`. Others: Breadcrumb `mb-8` and title block → content 64px (or `PageHeader`; see decision D1 on H1 tags) |
| H4 | /, /pricing | Pricing plan grid | 1024–1279 | Grid is 768px wide (x=128–896) while the page is 960px (x=32–992): edges step in 96px against every other section | `Pricing.tsx` grid: add `lg:max-w-none` |
| H5 | /devices/* | Aside image + article grid | 640–1023, ≥1280 | 640px image renders as a 718px square at 768 (upscaled, 1.12–1.33×); aside wider than the 720px reading column. At ≥1280 the gutter reads 69px instead of 48; the sidebar ends ~1100px above the article end | Aside `max-lg:max-w-narrow`, image `aspect-[4/3]` capped height; article grid `lg:grid-cols-[minmax(0,45rem)_1fr]`; aside `lg:sticky lg:top-24 lg:self-start` |
| H6 | /checkout | Form / summary grid | 640–1023 | Two equal columns squeeze Expiry/CVC to 107px (640) and 135px (768); summary/form order flips between sm and md; at ≥768 the 278px summary beside the 583px form leaves ~300px empty | `lg:grid-cols-[1fr_24rem]` (stack below lg, summary first); summary `lg:sticky lg:top-24 lg:self-start`; card gap `default` (24) not `loose` |
| H7 | / | Hero H1 | 640–1440 | "Provider" alone on line 2 (last-line ratio 0.32) under the underline | `Hero.tsx` textClassName: add `text-balance` |
| H8 | / | Hero scroll indicator | all | Centre 12px right of page centre (732 vs 720; 207 vs 195 at 390): framer-motion's inline transform overrides `-translate-x-1/2`. Inner 24×24 icon squeezed to 4×8 | `inset-x-0 mx-auto w-fit` on the wrapper; drop the squeezed `<Image>` or size it correctly |
| H9 | site-wide | Centred text widths | ≥1024 | Seven different centred widths (768 / 672 / 576 / 896 / 512 / 656 / 720px), none matching the system's narrow 720 / medium 960. SectionHeader leads run 768px (~90 characters) and end on lone words ("feature set.", "contact us." ratio 0.12–0.13) | SectionHeader/PageHeader/FaqList `max-w-3xl` → `max-w-narrow`; leads `max-w-2xl text-balance`; Devices `max-w-4xl` → `max-w-medium` |

## MEDIUM

| # | Route | Component | Width | Issue | Correction |
|---|---|---|---|---|---|
| M1 | / | How-it-works cards | 768–1023 | 3 columns of 224px: text column 176px, descriptions 6 lines, titles wrap unevenly | `md:grid-cols-3` → `lg:grid-cols-3`; Signal Line `lg:block` |
| M2 | /pricing, /iptv-free-trial | `Grid cols={4}` | 1024–1279 | 222px cards: titles wrap to 3 lines, descriptions 5–6 lines, cards 355px tall | `Grid.tsx` cols 4: `lg:grid-cols-4` → `xl:grid-cols-4` |
| M3 | / | Poster carousels | all (worst 1024) | Posters forced to `h-[300px]` with variable width: 150×300 at 1024 crops 25% of each poster; upscaled at 640/900. Prev/next arrows (44px) sit on the first and last posters | Poster `aspect-[2/3] h-auto w-full` (+ skeleton); arrows `hidden md:flex` outside the track (`-left-5` / `-right-5`) |
| M4 | all | Footer | 768 (also 360–390) | Four 156px columns at 768: blurb 6 lines, email overflows its column by 2px; address↔email gap 1px (inline link ignores margin) vs 8px in link lists; at 390 Contact sits alone at 163px wide and the bottom bar centres while the grid is left-aligned; brand blurb starts 17px below the column lists | Grid `grid-cols-2 lg:grid-cols-4`, brand `col-span-2 lg:col-span-1`; mailto `block`; Contact `col-span-2 md:col-span-1`; bottom bar `items-start sm:items-center`; `text-pretty` on blurb |
| M5 | / | Movies / Events headers | all | Hand-built: left-aligned among centred section headers, centred only below 640 (jumps at the breakpoint), 32px to content vs 48 everywhere else | `SectionHeader` (`align="start"` if left is intended) and drop `max-sm:text-center` |
| M6 | /pricing | Reused Pricing section | all | `compact` (64px) with no divider between `default` divided sections: 144px gap with no hairline under the hero | Add `spacing` / `divided` props to `Pricing`; render `spacing="default" divided` on /pricing |
| M7 | /iptv-free-trial | "What You Get" cards | all | 48px tile (24px icon) centred vs 40px left-aligned tiles on every other feature card; icon→title 16 vs 24; title is a `<p>` with "Trial" alone; stacks to 604px at 390 | Same pattern as SubscriptionFeatures: default tile, `mb-6`, `Heading level={3} size="subheading"`; `max-sm:grid-cols-2` optional |
| M8 | several | Button sizes | all | Device-guide Callout button 44px vs 48 in the other Callouts; contact "Send Message" 44 vs checkout 48; at 768 the navbar mixes 36 (WhatsApp), 44 (menu) and the 24px theme toggle; floating contact button 56px (off the 36/44/48 scale) | Callout action `size="lg"`; ContactSubmitButton `size="lg"`; MobileNav `h-9 w-9 max-sm:h-11 max-sm:w-11`; ContactSheet drop `sm:h-14 sm:w-14` |
| M9 | FAQ everywhere | FaqList | <640, ≥640 | `px-6 sm:px-8` insets text 33px vs 25px in other cards; at 390 the question column is 260px so 9 of 10 questions wrap; device-guide FAQ heading→list gap 16 vs 48 | `px-6` (and `max-sm:px-4`); trigger `text-pretty`; device FAQ heading `mb-12` |
| M10 | /locations | Country list | all | Rows 44 / 55 / 75px in one grid as long names wrap; flags inset 12px from the content edge; page 6594px long at 390 | `-mx-3` on the list; `line-clamp-2 items-start` or `auto-rows-fr`; consider `lg:grid-cols-4` |
| M11 | /devices/* | Breadcrumb | <640 | Wraps so line 2 starts with "/" | Separator belongs to the following item; last crumb `min-w-0 truncate` |
| M12 | /devices/* | H1 / H2 | 360, 1440 | H1 runs to 4 lines at 360; article H2 leaves "Stick" alone (ratio 0.12) | `text-balance` on `.prose h2/h3`; consider `heading` size for long H1s below 400px |
| M13 | / | Hero CTA pair | 390 | Stacked buttons 134px and 225px wide: ragged centred stack | `w-full sm:w-auto` on both inside a `max-w-xs` wrapper |
| M14 | / | Hero highlight pills | all | 33px tall, fully round, 13px text: off the Badge/pill scale | `h-8` or document as a separate chip component |
| M15 | / | Device icon row | ~576–700 | Wraps 7 + 1, leaving Apple TV alone | `grid grid-cols-4 md:grid-cols-8 justify-items-center` |
| M16 | / | Device tiles | all | 12px radius (system: 8 / 16 / round); brand-logo glyphs (macOS, Samsung) render much smaller than pictograms | `rounded-card` (or `rounded-control`); normalise glyph sizes |
| M17 | /pricing | Guarantee Callout | all | 24px heading vs 32px on every other page-closing Callout | `<Callout size="large">` |
| M18 | /devices/*, /pricing, /country/* | PageHeader lead | 390 | 18px lead runs to 5–6 centred lines | Lead `max-sm:text-body` |

## LOW

| # | Route | Component | Width | Issue | Correction |
|---|---|---|---|---|---|
| L1 | 404 | Divider block | all | 64px above the hairline, 32 below | `mt-12 border-t pt-12` |
| L2 | 404 | Container | 768–1440 | Text area 656px; at 768 sits 24px inside the nav/footer edge | Wide Container + inner `mx-auto max-w-narrow` |
| L3 | 404 | Secondary buttons | all | "View Pricing" and "Browse Locations" share the Compass icon | `Tag` icon for pricing |
| L4 | /contact | Breadcrumb vs card | ≥768 | Breadcrumb at x=152, card centred at ~464 | Wrap both in the same narrow column |
| L5 | /iptv-free-trial | Hero microcopy | <400 | "access" alone on line 2 | Items as nowrap spans in a flex-wrap row |
| L6 | /pricing | FAQ H2 | <640 | 3 lines, line 2 starts with the em dash | `text-balance`; non-breaking space before the dash |
| L7 | /, /pricing | Plan savings line | 1440 | Wraps "vs the / 1-month price" | Nowrap the phrase; `text-balance` on the line |
| L8 | all inner | PageHeader lead → action | all | 24px vs 32px in Hero, 404 and Callout | PageHeader children `mt-8` |
| L9 | navbar | Inner padding | all | 16px left vs 8px right | `px-3` (or keep the tighter right inset deliberately) |
| L10 | all | Focus-ring radius | all | FAQ triggers and nav links ring at 4px vs 8px on buttons | `rounded-sm` → `rounded-control` |
| L11 | all | Floating contact button | <640 | Covers FAQ chevrons and line ends | `right-3 h-11 w-11` + safe-area bottom offset |
| L12 | / | Poster overlay icons | all | Hand-made 32px circles next to the IconTile scale | `IconTile size="sm"` |
| L13 | /pricing | "What's Included" | <640 | 8 stacked 250px cards (2401px section) | Icon beside title on phones |
| L14 | /, /pricing | Pricing cards on phones | <768 | Four 554px cards repeat the same feature list | Needs a decision (see D4) |

---

## Decisions needed (not straight fixes)

- **D1 — H1 on /faq, /contact, /checkout.** These pages have no H1 (title is an H2 or a card title). Using `PageHeader` would give them the same 56px H1 as every other page but changes heading structure, which was kept as-is for SEO.
- **D2 — Section eyebrows.** Only home and /faq show the mono eyebrow; pricing, free-trial and country sections don't. Add labels everywhere (needs label copy) or document "home only".
- **D3 — Warm panels.** Home and /pricing show two warm-tinted surfaces (featured plan + Callout) while `Callout` says "one per page". Pick the rule.
- **D4 — Pricing cards on phones.** Collapse the repeated feature list on non-featured cards below 768, or keep full parity.
- **D5 — Round carousel arrows.** Keep fully round (document) or switch to the 8px control radius.

---

## Top 15 to fix first

| Rank | Route | Component | Breakpoint | Issue | Correction | Impact |
|---|---|---|---|---|---|---|
| 1 | /devices/* | Install steps | all | 24px off-grid indent (11 pages) | Fix `.not-prose` selector in `globals.css` | High — one line fixes 11 pages |
| 2 | /iptv-free-trial | 3-step grid | 640–1023 | Orphan step, broken connector, off-pattern | HowItWorks pattern, `lg:grid-cols-3`, line `lg:block` | High — conversion page on tablets |
| 3 | /checkout, /faq, /contact, free trial | Page top | all | Title y 199 vs 215–242; spacious hero | Breadcrumb `mb-8`, free trial `default` spacing (+ D1) | High — first impression on 4 pages |
| 4 | /, /pricing | Pricing grid | 1024–1279 | 96px inset vs page | `lg:max-w-none` | High — key conversion block |
| 5 | /checkout | Form grid | 640–1023 | 107–135px card fields, order flip | `lg:grid-cols-[1fr_24rem]`, sticky summary | High — checkout usability |
| 6 | /devices/* | Aside image / grid | 640–1023, ≥1280 | Upscaled 718px image, 69px gutter | Cap aside + image ratio, fixed column track | High — 11 pages |
| 7 | site-wide | Centred widths + leads | ≥1024 | 7 widths, 90-char leads, orphans | `max-w-narrow` / `medium`, lead `max-w-2xl text-balance` | High — every page |
| 8 | / | Hero H1 | 640–1440 | "Provider" orphan | `text-balance` | Medium-high — hero |
| 9 | / | Scroll indicator | all | 12px off-centre, squeezed icon | `inset-x-0 mx-auto w-fit` | Medium — hero |
| 10 | / | Posters + arrows | all | Cropped posters, arrows over art | `aspect-[2/3]`, arrows outside track | Medium |
| 11 | all | Footer | 768, 390 | Cramped 4 columns, 1px email gap | 2→4 grid, `block` email, col spans | Medium — every page |
| 12 | /, /pricing, /iptv-free-trial | Grid breakpoints | 768–1279 | 3-col at 768, 4-col at 1024 too narrow | `lg:` for 3-col steps, `xl:` for 4-col | Medium |
| 13 | / | Movies/Events headers | all | Off-pattern header, jumps at 640 | `SectionHeader` | Medium |
| 14 | several | Button heights | all | 44 vs 48 in equivalent spots; navbar 36/44 at 768 | `size="lg"` / navbar sizes | Medium |
| 15 | FAQ everywhere | FaqList inset | <640 | 33 vs 25px inset; 260px text column | `px-6 max-sm:px-4`, `text-pretty` | Medium |

---

## Status after the top-15 pass

All 15 fixed and re-verified with a fresh capture at 1440 / 1024 / 768 / 390 (no horizontal overflow anywhere):
device steps align with the article edge (title x=216, not 240); free-trial and home steps share one `StepList`
(single column below 1024); every inner page title starts at y=199; pricing grid spans 960px at 1024; checkout
CVC 327px at 768 with a sticky summary from 1024; device image capped (no upscaling) and a fixed 720px reading
track; centred widths are narrow/medium only; hero H1 balanced and scroll cue centred; posters keep 2:3; footer
is two columns until 1024; equivalent buttons share heights; FAQ inset 16/24px.

Partial: carousel arrows now straddle the shelf edge instead of sitting on posters, but at 1024 they still cover
~24px of the first and last poster (the 32px gutter leaves no room to sit fully outside).

Not done (outside the top 15): the remaining Medium/Low items and decisions D1–D5.

## Checklist

- [x] spacing fixed (top-15 scope)
- [x] grid fixed (top-15 scope)
- [x] typography rhythm fixed (top-15 scope)
- [ ] repeated components normalized (M7, M14, M16 and Low items remain)
- [x] responsive defects fixed (top-15 scope; M10–M12, M15, L5–L6, L11, L13–L14 remain)
