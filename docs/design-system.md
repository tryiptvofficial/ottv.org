# Design system

OTTV's identity is premium streaming technology in black and green. The page is black (`#000000`) with warm off-white bands, cards one step above their band, a single green accent (`#25F07C`) for every action, link and check, and original illustrations throughout. The homepage started from the structure of a reference IPTV homepage the owner supplied in November 2026: a circular photo collage with facts, pricing, devices, steps, reasons, an explainer, editorial guides, FAQ, a promotional band and a dark footer. Its branding, copy, images, logos and unverifiable claims are not used.

Its order now follows the visitor's decision:
1. the offer and the plans, with how ordering works;
2. why OTTV and what IPTV is;
3. the devices, with a row of setup guides and a button to all of them;
4. the FAQ, then a free trial button;
5. the comparison with cable;
6. the free trial, to close.

The promotional band "What You Get With OTTV" was removed on 2026-11-11: it repeated the plans and "Why OTTV". Later that day "Latest Updates" went too, and the setup guides went from six cards and a list of links to one row of three: the device grid and the footer already link every guide.

Stack note: Tailwind 3.4, so the source of truth is the CSS variables in `src/app/globals.css`, exposed through `tailwind.config.ts`. Components use semantic tokens (`bg-card`, `text-muted-foreground`, `rounded-card`, `shadow-card`), never raw values.

## Colour

| Token | Hex | Role |
|---|---|---|
| `--black` | `#000000` | The page and every dark band (`--background`) |
| `--char` | `#090909` | Cards on black (`--card`) |
| `--char-raised` | `#141413` | Hover fills on black |
| `--char-line` | `#232220` | Borders on black (`--border`) |
| `--stone-dark` | `#6b665f` | Field edges on black (3.7:1) |
| `--ash-warm` | `#8c877f` | Captions on black (5.9:1) |
| `--fog-warm` | `#a8a39b` | Reading text on black (8.4:1) |
| `--bone` | `#f0ece5` | Text on black (17.8:1) |
| `--linen` | `#f5f3ee` | Light bands |
| `--pure-white` | `#ffffff` | Cards on light bands |
| `--linen-line` | `#e3ded5` | Borders on light bands |
| `--umber` / `--taupe` | `#57534e` / `#6b665f` | Reading text and captions on light bands (6.9:1 and 5.1:1) |
| `--ink` | `#0b0b0a` | Text on light bands |
| `--green` | `#25f07c` | The accent on black: primary buttons (with black text, 13.8:1), links, checks and icons |
| `--green-deep` | `#086a35` | The accent as text and icons on light bands (6.1:1) |
| `--danger-on-dark` / `--danger-on-light` | `#f26d6d` / `#c62828` | Form errors only |

**Surfaces.** Each one redefines the semantic tokens, so components need no band-specific variants:

| Class | Where | Result |
|---|---|---|
| (page), `.band-ink` | `<Section>` and `<Section tone="ink">`, the header, the footer | Black band, `#090909` cards, bone text, green actions |
| `.band-light` | `<Section tone="light">` | Warm off-white band, white cards, ink text, deep-green links; the primary button turns ink, since green on off-white stands out only 1.4:1 |
| `.surface-invert` | `Card variant="accent"`: plan cards, `Callout` | A black card on any band |
| `.surface-paper` | `Card variant="spotlight"` | A white card on black |

## Type

Geist Sans, with Geist Mono for labels, both under the SIL Open Font License, loaded through `next/font/google`. Headings are weight 600, never heavier, with tight tracking.

| Level | Token | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| H1 | `display-2xl` | 40-56px fluid | 600 | 1.05 | -0.04em | Homepage hero |
| H1 | `display-xl` | 36-48px fluid | 600 | 1.05 | -0.04em | Inner page titles |
| H2 | `heading-lg` | 30-40px fluid | 600 | 1.1 | -0.035em | Section headings |
| H2 | `heading-md` | 24-30px fluid | 600 | 1.2 | -0.03em | Article and panel headings, `Callout` |
| H3 | `heading` | 20-22px fluid | 600 | 1.3 | -0.02em | Card, step, plan and guide titles |
| H4 | `heading-sm`, `subheading` | 17px | 600 | 1.4 | -0.01em | Guide steps, sidebar panels |
| H5 | `heading-xs` | 15px | 600 | 1.45 | normal | Small titles |
| H6 / stamp | `eyebrow` + `.stamp` | 11px Geist Mono, uppercase | 500 | 1.5 | +0.071em | Labels, tags, dates |
| | `stat` | 36-48px fluid | 600 | 1 | -0.04em | Prices and figures, tabular numerals |
| | `body-lg` | 18px | 400 | 1.6 | normal | Lead paragraphs |
| | `body` | 16px | 400 | 1.6 | normal | Reading text |
| | `label` | 14px | 400 / 500 | 1.55 | normal | Buttons (500), navigation, link lists |
| | `caption` | 13px | 400 | 1.5 | normal | Small print, plan features |

The mono stamp is for labels and metadata (breadcrumbs, device-group labels, category tags, dates, footer group titles). It is never used for sentences, and never as a label above a section heading.

## Layout

- **Container:** 1280px wide, with 24px gutters on phones and 48px from 1024px.
- **Bands:** every section is a full-width band through `Section`.
  - `tone`: `canvas` (black), `light` or `ink`.
  - `spacing`: `default` is 64px top and bottom on phones, 96px from 768px.
  - `flushTop`: for the second of two same-colour bands in a row. It overlaps the band above by 1px, which hides the hairline a boundary on a fraction of a pixel can leave.
  - On the homepage two groups share a band on purpose: the plans with how ordering works (light), and the devices with their setup guides (black). Every other pair of neighbours alternates.
- **Grids:** 12 columns.
  - Four across: facts and plans.
  - Three across: steps, guides and updates.
  - Two across: reasons and the explainer.
  - Device groups: four across from 1024px, two below, one on phones (with links in two columns).
- **Section headers:** from 1024px the heading takes the left seven columns and the subtitle the right four.
- **Breakpoints:** Tailwind defaults (640, 768, 1024, 1280), plus `short` for screens under 500px tall.

## Shape, depth and motion

- **Corners:**
  - `rounded-card` 16px (`card-lg` 20px);
  - `rounded-control` and `rounded-input` 10px;
  - `rounded-panel` 12px;
  - `rounded-pill` for tags, the nav action and the floating contact button.
- **Depth:**
  - `shadow-card` is a fine border plus a long, faint offset shadow.
  - `shadow-hairline` is the border alone.
  - `shadow-glow` is the green ring and soft glow, kept for one element only: the featured plan. Nothing else glows, on hover either.
- **Gradients:** one subtle green wash, behind the hero. No gradient text.
- **Motion:**
  - Buttons and cards transition in 150-200ms; cards lift 2px on hover.
  - Cards use `.reveal`, a subtle scroll reveal: a 16px rise at full opacity (CSS scroll-driven). It never fades text, because faded text fails contrast checks for anything not yet scrolled to.
  - Scrolling is smooth.
  - Under `prefers-reduced-motion`, all of it stops.

## Imagery

- Every homepage image is listed with its source and licence in `public/demo-assets/manifest.json`. Components read it through `src/lib/site-data/visual-assets.ts`, never through a hard-coded URL.
- **No photos:** every image is an original drawing, and every drawing explains something. The hero's four stock photos were replaced on 2026-11-11 by a drawing of the order flow; the promotional band's photo and the guide photos went the same day.
- **Illustrations:** original SVGs in `public/demo-assets/illustrations/`: the hero's order flow, the explainer's TV guide, the three step illustrations, the device lineup and the six guide drawings.
  - They show generic devices with no manufacturer marks, with bars in place of text.
  - The palette is ink outlines, white device bodies, dark screens and green highlights.
- **Guide images:** one drawing per featured guide, showing that guide's main step, in colour.
  - `src/lib/placeholder-images.json` points each guide to its drawing.
  - They replaced stock photos on 2026-11-11, after logos were found in three of them.
- **Device grid:** generic line icons only, never a manufacturer's logo.

## Components

- **Header:**
  - the offer bar with a solid green dot;
  - a 64px sticky black bar with a backdrop blur and a fine bottom border;
  - menu: IPTV Subscription, Devices & Setup, FAQ, Contact. The logo goes home. "IPTV Subscription" stays because it is the only link text on the site with the pricing page's search phrase; the footer uses the same name. The item for the current page is highlighted, and "Devices & Setup" also on a guide page;
  - the green "Free Trial" pill and a WhatsApp icon button;
  - on phones, the menu sheet opens from the right, the side of its button, and ends with a "Get IPTV Free Trial" button, because the sheet covers the header's pill.
- **`Hero`:** on the left, the H1; the lead in full colour, saying what sets OTTV apart (a person in a WhatsApp chat sends the login and helps if setup gets stuck; one payment per plan, nothing renews); the size of the service in quieter body text; two buttons; and a one-line note under them (the trial starts the same way, in a WhatsApp chat, no card needed; it also describes the trial button to screen readers); on the right, the order-flow drawing on a light plate (`rounded-card-lg`): the order sent in a chat with OTTV, the reply with the login details, the TV playing. Then a `StatStrip` of four facts.
  - The H1 is "IPTV Service With a 24h Free Trial". The page title keeps "Best IPTV Service" for search; the visible heading makes no superlative claim.
- **`StatStrip`:** figures, each before its label in the page text (an icon is optional and unused). Offer facts only, never user, review or uptime counts.
- **`PlanCard`:** black cards on the off-white pricing band.
  - Each card shows the price as "one payment", the monthly equivalent in body text and an "Order on WhatsApp" button. The 1-month card says "One month of full service" instead of repeating its price as a monthly figure.
  - Every plan includes the same service, so the cards do not repeat the features.
  - The featured plan has the glow, a "Best value" tag and the green button.
  - On phones, where the plans stack, the featured plan is shown first. From 768px the plans run from shortest to longest. The source order, which screen readers and the Tab key follow, is always shortest first.
  - The plans and the notes under them start at the heading's left edge at every width.
  - The floating contact button steps aside while the plans are on screen, so it never sits on an order button.
- **Under the plans (`Pricing`):**
  - "Included in every plan" lists the features once, with the one-stream limit set apart under a neutral icon. It carries `id="features"` for older links to `/#features`.
  - The subtitle under "Choose Your IPTV Plan" says how ordering works: the chat opens with the plan written, and a person replies with the login.
  - "Before you order" sits beside the cards: on phones right after the featured plan, from 768px in a row under the cards. It covers one payment with nothing renewing and the 7-day money-back guarantee, the free trial, the player-app fee some devices need (linked to the device grid) and that a person handles each order (so allow a short wait). How to pay is added only once the owner confirms the payment methods.
  - `/pricing` leaves out "Included in every plan", because that page lists the features in its own section.
- **Price table (`/pricing`):** on phones the headings shorten ("Total", "Per month") and each plan's saving sits under its name, so the table fits a 320px screen without scrolling sideways.
- **Devices (`#devices`):** four cards by kind of device, each labelled with a small device icon, and each device linking to its guide.
  - A note under a device's name says when its guide needs a paid player app, screen mirroring or the box's MAC address (`note` in `guideGroups`).
  - The buffering guide is a line under the grid, not a card.
- **`StepList`:** numbered circles in the primary colour (green on black, ink on off-white), with an original illustration or an icon.
  - Three columns from 1024px. Below that the steps stack, and the illustration stays small so the text leads.
  - On phones the illustration sits above the text in a 2:1 frame (295×148 on a 375px screen), at 72% of the frame's width.
  - From 640px (a phone turned sideways, a tablet) it sits beside the text at a fixed 224×140, so a 667×375 screen shows a whole step. A frame as wide as the card was 367px tall there, nearly the whole screen.
- **Why OTTV:** cards in two columns on black, heading and text only.
- **IPTV explained:** a TV-guide drawing (channels, what is on now, catch-up, the channel playing) and two cards (what IPTV is, what you need) on a light band, side by side from 1024px with the drawing first below that; then the free trial and pricing buttons. How OTTV works is the steps section's own question ("How Does OTTV Work?").
  - These buttons and the one under the FAQ are the page's only actions between the plans and the closing free-trial band.
  - Without them, that stretch ran about fifteen phone screens with nothing to tap.
- **`SetupGuides`:** three cards, one per kind of screen (Samsung TV, Apple TV, iPhone and iPad), each with its guide's drawing and a category tag, then one button, "See All 11 Setup Guides", to `/devices` (the number comes from the guide data).
  - Below 1024px the cards are compact rows: a small thumbnail, then the category and title, without the excerpt (`GuideCard compact`). From 1024px they sit in one row of three full cards; narrower cards would wrap the longest category tag over the drawing.
  - The `/devices` hub keeps full cards at every size.
  - A card's excerpt is the guide's first sentence, or a cut at a word boundary with an ellipsis. It is never half a word.
- **`FaqList`:** native `<details>` rows, in two columns from 768px, so every answer stays in the HTML. Answers are plain text in the data, so they also feed FAQPage structured data; `LinkedText` turns the pages an answer mentions into links.
- **`FAQ`:** on the homepage, a "Get IPTV Free Trial" button follows the questions. Before it was added, a phone ran over seven screens from the explainer's buttons to the closing band with nothing to tap. The `/faq` page ends with its own "Where to go next" links instead.
- **`CTA`:** the free trial promotion on a light band with the device lineup illustration.
- **Comparison:** IPTV vs cable on black, four rows a side, the OTTV card filled and the cable card outlined. The one-stream limit is a note under the OTTV list, not a check.
- **Footer:** black, with the brand, quick links, every setup guide and contact.
- **Analytics choice (`ConsentManager`):** opens on a first visit and again from the footer's "Cookie settings".
  - On phones, a bar of about 104px on the bottom edge: the question and a two-line sentence, then Reject and Accept side by side with equal weight. On a 375x812 screen it leaves the hero's buttons in view.
  - From 640px, a card in the bottom-right corner, away from the hero's buttons on the left.
  - The floating contact button steps aside while it is open, since both use the bottom-right corner.
  - On screens under 500px tall (a phone turned sideways) a card would cover a third of the page, so it stays a bar on the bottom edge with the buttons beside the text: 60px tall on an 844x390 screen, where the card took 157px.
  - The sentence names the three services and says they run only if the visitor accepts.
- **`/devices`:** the setup-guides hub, grouped by kind of device.
- **Fields:** the card colour, an edge that passes 3:1 against the band, and a green focus ring. An error says what to enter ("Enter an email address like name@example.com."), and the form keeps what was typed.

## Rules

- **Copy:** use only facts the site can stand behind. There are no testimonials until verified reviews exist, no reseller section until a programme exists, no coverage or city lists, and no blog until there are articles.
- **Wording:**
  - A button that opens WhatsApp says so: "Order on WhatsApp" on plans, "Continue in WhatsApp" on the contact form, "Start Free Trial on WhatsApp" on the trial page and "Ask a Question on WhatsApp" on `/checkout`. Screen readers also hear that it opens in a new tab. The compact "Order" buttons in the `/checkout` price list name WhatsApp only for screen readers; the page heading says it.
  - The offer is the "24-hour free trial".
  - Buttons that lead to the trial page read "Get IPTV Free Trial", or "Free Trial" in the header. Links inside a sentence describe the page instead.
  - "View Pricing" and "See Plans and Pricing" both go to `/pricing`; the menu and the footer call that page "IPTV Subscription".
  - Button labels use Title Case, like headings. Links inside a sentence keep sentence case.
  - A number and its unit never split after the hyphen ("12-month", "7-day"): `keepTogether` in `src/lib/keep-together.tsx` keeps them on one line in fact labels, steps, FAQ rows, plan cards and linked text.
  - A limit is never shown with a check.
- **Green:** one green accent; on light bands, use the deep green for text and icons, and ink for the primary button.
- **Icons:** no icon tile above a heading that already says the same thing. Icons stay where they carry meaning: device groups, checks, and the numbered steps in guides.
- **Headings:** every section heading is an H2; cards are H3, with no skipped levels.
  - Page titles and section headings use Title Case.
  - Card titles, steps, list items and labels use sentence case. Guide cards are the exception: they reuse the guide's page title, a Title Case question.
  - Nothing sits above a page title or section heading: no stamp, pill or label. The heading speaks for itself.
- **Measure:** reading paragraphs stop at about 70 characters a line (`max-w-xl`, 36rem). Geist's `ch` unit runs wide, so `max-w-prose` lets about 83 through.
- **Contrast:** reading text and placeholders pass 4.5:1 on every surface; field edges pass 3:1.
- **Touch targets:** buttons and list links keep a 44px tap area that touches no other control.
  - Header icon buttons are 44px squares.
  - The 36px header pill reaches 44px through an invisible strip above and below it.
  - The menu links reach 44px the same way (`touch-target`). The offer bar's "How the trial works" link uses it too, and its tap area fills the bar's full 41px height.
  - On phones, footer links are 44px rows.
- **Button pairs:** large buttons have 16px sides on phones and 24px from 640px, so the hero's and the explainer's pairs fit one row from 360px.
