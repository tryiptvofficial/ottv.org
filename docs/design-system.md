# Design system

One dark, achromatic interface with a single coral accent. Every page is built from the tokens and
components below; nothing on a page should invent its own colour, radius, shadow, type size,
section spacing or button style.

Stack note: Tailwind 3.4 (not v4), so the single source of truth is the CSS variables in
`src/app/globals.css`, exposed to Tailwind through `tailwind.config.ts`. Components read semantic
tokens (`bg-card`, `text-muted-foreground`, `shadow-key`, `rounded-card`, `text-heading`), never raw
values.

---

## A. Audit of the system before migration

Scope: 11 routes (`/`, `/pricing`, `/iptv-free-trial`, `/checkout`, `/contact`, `/faq`, `/locations`,
`/country/[country]` ×200, `/devices/[device]` ×11, `not-found`, `error`, `global-error`;
`/iptv-subscription` only redirects). No blog, legal or search routes exist.

| Area | What was there | Problem |
|---|---|---|
| Palette | Tokens already near the reference (canvas `#040506`, Mist actions, coral brand) after the last pass; `global-error` used `#0a0a0a`, `#fafafa`, a leftover green `#22c55e`; `themeColor` `#0a0a0a` | Raw hex outside tokens; a stale green |
| Text colour | `text-primary` ×45 (Mist), `text-muted-foreground` ×63, `text-foreground` ×5 | Icons were Mist everywhere: no difference between default and emphasis |
| Type sizes | 16 distinct size classes; headings mixed `text-3xl/4xl/5xl/6xl/7xl`, each page picking its own responsive pair; `text-[11px]`, `xl:text-[2.75rem]` one-offs | No type scale; h1 on inner pages ≠ h1 on 404 ≠ hero |
| Weights | semibold ×35, medium ×11, bold ×3 | Mostly fine; bold remnants on 404 and step numbers |
| Tracking | `tracking-normal` ×16, `tracking-[0.08em]` ×4, `tracking-[0.004em]` | Arbitrary values instead of tokens |
| Radius | `2xl` ×16, `full` ×13, `lg` ×7, `md` ×2, `xl` ×1, `sm` ×1 | No named radii; pills used for non-pill chips |
| Shadow | `shadow-edge` ×14, `shadow-lift` ×4 in pages; shadcn overlays still on Tailwind `shadow-md/lg` | No key/overlay tokens |
| Containers | `Container` at `max-w-7xl` (1280px) ×30; ad-hoc `max-w-lg/2xl/3xl/4xl/5xl/6xl` inside pages | No 1200px page width, no narrow/medium widths |
| Section rhythm | `py-16 sm:py-24` ×7, `py-12 sm:py-16` ×4, `py-10 sm:py-12` ×3, `py-20 sm:py-32` ×1, `py-14` ×1 | Each section decided its own spacing |
| Breadcrumb + page header | Copied verbatim into 5 routes | Duplication |
| Cards | `Card` (shadcn) + 6 hand-rolled card class strings (`rounded-2xl border bg-card p-6/p-8 shadow-edge`, accent gradients) | No variants |
| Buttons | `default`, `neutral` (same look), `outline`, `secondary`, `ghost`, `link`, `destructive`; page-level overrides `h-11 px-8`, `hover:bg-white` | Two names for one look, overrides on every hero/CTA |
| Icon tiles | `bg-primary/10 text-primary` squares/circles in 5 places with 3 sizes | Not a component |
| Badges | `rounded-md` default + one coral override | No semantic variants |
| Inputs | `bg-background`, 40px tall | Not recessed; under 44px target |
| Icons | lucide-react ×18 files, react-icons/si ×5 (brand marks: WhatsApp etc.) | Acceptable: Lucide has no brand marks |
| Inline styles | `global-error` (required: no CSS loaded), Hero video opacity (dynamic), FlagIcon fallback, Brands mask, BorderBeam size | FlagIcon one is avoidable |
| Arbitrary values | 44 in pages: hero atmosphere, dot grids, ambient glows, connector position, poster size, marquee animation | Belong in named utilities |
| Motion | Infinite: logo marquee, scroll-cue bounce, Best Value beam; no global reduced-motion rule | Looping cue; no global reduced-motion fallback |
| Theme | `:root` and `.dark` hold identical values; the toggle switches nothing | Dead control (see risks) |

---

## B. Master design system

### Colour — primitives (`globals.css`, HSL triplets)

| Token | Hex | Role |
|---|---|---|
| `--void` | `#040506` | Canvas (level 0) |
| `--ink` | `#07080a` | Card surface (level 1) |
| `--obsidian` | `#111214` | Recessed: inputs, wells, popovers (level 2) |
| `--graphite` | `#1b1c1e` | Dense controls, badges, hover wells (level 3) |
| `--slate` | `#2f3031` | Quiet dividers |
| `--hairline` | `#363739` | Default border |
| `--iron` | `#454647` | Text on Mist fills |
| `--smoke` | `#6a6b6c` | Subtle metadata |
| `--ash` | `#9c9c9d` | Secondary text, default icons |
| `--mist` | `#e6e6e6` | Primary action fill, emphasis icons |
| `--white` | `#ffffff` | Headings, primary text |
| `--coral` | `#ff6363` | Brand accent (rare) |
| `--ember` | `#452324` | Accent surface tint |
| `--sky` / `--cobalt` / `--deep-space` | `#63a1ff` / `#143ca3` / `#02193b` | Hero artwork only |
| `--info` / `--success` / `--warning` / `--danger` | `#56c2ff` / `#59d499` / `#f5a524` / `#e5484d` | Semantic states only |

### Colour — semantic (what components use)

| Utility | Token | Use |
|---|---|---|
| `bg-background` | void | Page canvas — the only page background |
| `bg-card` | ink | Cards |
| `bg-recessed` / `bg-muted` / `bg-popover` | obsidian | Inputs, wells, menus |
| `bg-secondary` / `bg-accent` | graphite | Badges, hover wells |
| `text-foreground` | white | Headings, body emphasis |
| `text-muted-foreground` | ash | Body copy, default icons |
| `text-subtle` | smoke | Metadata, captions |
| `text-primary` | mist | Emphasis icons only |
| `bg-primary` / `text-primary-foreground` | mist / iron | Primary action |
| `border-border` | hairline | All borders |
| `text-brand` / `bg-brand` / `bg-brand-tint` | coral / ember | Logo, Signal Line, featured beam, accent card |
| `ring-ring` | mist | Focus ring |
| `*-info/success/warning/destructive` | semantic | Status only — coral never means danger |

Budget: ≈97% achromatic. Coral appears in exactly: logo icon, hero artwork (and the share images),
Signal Line (hero underline, steps connector, active carousel marker), the featured plan's beam,
accent cards (tint only). `Badge variant="accent"` (coral fill) is available for a featured marker but
currently unused. Anything else needs a deliberate decision recorded here.

### Typography

Inter (`font-sans`) for everything; Geist Mono (`font-mono`) only for eyebrows, index labels and
footer metadata. Fluid sizes, so pages never pick responsive pairs.

| Utility | Size | Weight | Line height | Tracking | Role |
|---|---|---|---|---|---|
| `text-display` | 40→64px | 600 | 1.1 | 0 | Reserved for a display moment (unused) |
| `text-heading-lg` | 36→56px | 500 | 1.15 | +0.004em | Hero and page H1 |
| `text-heading` | 28→32px | 500 | 1.2 | 0 | Section H2 |
| `text-heading-sm` | 22→24px | 500 | 1.25 | 0 | Card/sub-section H3 |
| `text-subheading` | 18→20px | 500 | 1.4 | +0.01em | Item titles |
| `text-stat` | 36→44px | 500 | 1 | 0 | Prices and numeric callouts (tabular) |
| `text-body-lg` | 16→18px | 400 | 1.6 | 0 | Lead paragraphs (`Lead`) |
| `text-body` | 16px | 400 | 1.6 | 0 | Body |
| `text-label` | 14px | 500 | 1.4 | +0.014em | Buttons, nav, form labels |
| `text-caption` | 13px | 400 | 1.45 | +0.008em | Small print |
| `text-eyebrow` | 11px | 500 | 1 | +0.073em | Mono uppercase eyebrows |
| `text-meta` | 12px | 400 | 1.5 | +0.017em | Mono metadata |

Body line-height is 1.6 rather than the reference's measured 1.15 — the reference measures UI
labels; long-form copy needs room. Components: `Heading` (`level` + `size`), `Eyebrow`, `Lead`.

Wrapping: headings and leads use `text-balance` (short, centred blocks: even lines); paragraphs and
list items use `text-pretty` (avoid a lone last word without reshaping the block).

### Spacing, layout, grid

8px base (Tailwind's 4px scale used on even steps; 12px allowed inside compact controls).

| Primitive | Values |
|---|---|
| `Container size` | `narrow` 720px · `medium` 960px · `wide` 1200px (default) · `full` |
| Width tokens | `max-w-form` 512px (one form/card column) · `max-w-narrow` 720 · `max-w-medium` 960 · `max-w-page` 1200; `max-w-2xl` (672) is the lead measure inside narrow headers |
| Page gutter | 16px → 24px (sm) → 32px (lg) |
| `Section spacing` | `compact` 48→64px (home page flow) · `default` 64→80px (inner pages) · `spacious` 80→120px (page heroes, status pages) · `none` |
| `Section divided` | Hairline top border instead of a tinted band |
| `Grid cols` | `2` · `3` (3 from 1024) · `4` (4 from 1280) · `list` (2→3→4→5) · `aside` (main + 384px column from 1024); gap `tight` 8 · `default` 16→24 · `loose` 32→48 |
| Track tokens | `grid-cols-article` (720px reading column + sidebar) · `grid-cols-aside` · `aspect-poster` (2:3) |
| Pattern layouts | `Pricing`, `StepList` and `Footer` own their grids (pricing 1→2→4, steps 1→3, footer 2→4) because the layout is the component |
| Card padding | 24px |
| Stack gaps | 8 / 16 / 24 / 48px |

### Radius

| Utility | Value | Use |
|---|---|---|
| `rounded-badge` | 6px | Badges |
| `rounded-control` | 8px | Buttons, inputs, nav bar, list rows |
| `rounded-panel` | 12px | Small panels, media frames |
| `rounded-card` | 16px | Cards |
| `rounded-card-lg` | 20px | Large feature cards (CTA) |
| `rounded-full` | pill / circle | True pills (chips), circular icon tiles, avatars |

### Elevation

| Utility | Recipe | Use |
|---|---|---|
| `shadow-none` | — | Default |
| `shadow-edge` | inset top highlight 5% + inset bottom shade 20% | Bordered cards, nav bar |
| `shadow-key` | edge + 1px white ring at 10% (replaces the border) | `Card variant="key"` |
| `shadow-raised` | 0 4px 4px rgba(0,0,0,.25), 0 7px 3px rgba(0,0,0,.03) | Filled buttons only |
| `shadow-overlay` | 0 4px 40px 8px rgba(0,0,0,.4) + 0.5px ring + top highlight | Menus, dialogs, sheets, toasts |

The reference ring is 25% white; on this canvas that reads as a light grey outline next to
`#363739` hairlines, so the key ring uses 10% to match the hairline weight.

### Motion

| Token | Value |
|---|---|
| `duration-fast` | 150ms — hover colour |
| `duration-standard` | 200ms — open/close, accordion |
| `duration-slow` | 350ms — reveals |
| `ease-standard` | cubic-bezier(0.2, 0, 0, 1) |

Allowed: hover/opacity transitions, accordion, one-time hero reveal and Signal Line draw, the
single Best Value beam, the logo marquee. A global `prefers-reduced-motion` rule stops all of them.

### Components

| Component | Variants / sizes | Notes |
|---|---|---|
| `Button` | `primary` (default) · `secondary` · `ghost` · `link` · `danger`; sizes `sm` 40 · `default` 44 · `lg` 48 · `icon` 44 (no button under 40px; pages never override heights) | One height logic, `text-label`, 8px radius, focus ring, 50% disabled, `duration-fast` |
| `Card` | variant `base` · `edge` · `key` · `accent`; size `default` · `large` | 16px (large 20px), 24px padding via `CardHeader/Content` or `p-6`. `edge` and `key` are available, currently unused |
| `Badge` | `neutral` (default) · `accent` · `success` · `info` · `warning` · `outline` | 6px radius, 20px tall. Status variants are available, currently unused |
| `IconTile` | `sm` 32 · `md` 40 · `lg` 48 | Circular graphite tile, Mist icon |
| `Input` / `Textarea` / `Select` | one recessed style | 5% white fill, hairline, 44px, white focus ring, `aria-invalid` → danger border |
| `Accordion` | one style | Hairline dividers, `text-subheading` trigger, body copy in ash |
| `Table` | one style | Hairline rows, recessed header, no zebra, scroll wrapper on mobile |
| `Eyebrow` / `IndexLabel` | — | Geist Mono 11px uppercase |
| `Heading` | `level` 1–4 × `size` | Semantic level independent of visual size |
| `Section` / `Container` / `Grid` | see layout | Only way pages set rhythm and width |
| `PageHeader` / `Breadcrumb` | breadcrumb + H1 + lead | Replaces 5 copies; pages without an H1 before (FAQ, contact, checkout) use `Breadcrumb` alone so their heading outline is unchanged |
| `Field` | label + control + help + error | Wires `aria-invalid` / `aria-describedby`; used by `ContactForm` and checkout |
| `FaqList` | — | Every FAQ: one card + accordion (home, /faq, pricing, free trial, country, device) |
| `Callout` | `default` · `large` | The one warm-tinted panel per page (closing CTA, guarantee) |
| `.prose` (CSS class) | reading style | Device guides; `.not-prose` opts a block out |
| `StepList` | — | Numbered step cards + Signal Line (home, free trial) |
| `SignalLine` | `draw` | The brand stroke; hero underline, steps connector, carousel marker only |
| `SectionBackdrop` | — | Faint neutral light behind a section heading |
| `WhatsAppLink` | `message?` | Every WhatsApp anchor (new tab, noopener); works in `Button asChild` |
| `Reveal` + `blurFade` | — | One-time in-view reveal |
| `Navbar` / `MobileNav` / `Footer` | — | Glass bar, sheet nav, mono meta strip |

States: every interactive component defines hover, active (`active:` darken), `focus-visible`
(2px Mist ring, 2px offset on canvas), disabled (50% + no pointer). Inputs add invalid. Async
buttons show `Loader2` + disabled (`ContactSubmitButton`).

### Utilities in `globals.css` (named one-offs)

`hero-atmosphere` (blue wash + coral bars, hero only), `bg-dot-grid`, `ambient-glow`,
`ambient-glow-brand`, `mask-radial`, `mask-fade-b`, `mask-fade-x`, `animate-marquee` /
`animate-marquee-reverse`, `.text-link` (inline links), `.prose` (components layer).

---

## C. Component migration map

| Before | After |
|---|---|
| `Button` default / `neutral` / page overrides `h-11 px-8 hover:bg-white` | `Button variant="primary"` (sizes carry height) |
| `Button variant="outline"` / hero glass outline | `Button variant="secondary"` |
| `Button variant="destructive"` | `Button variant="danger"` |
| Hand-rolled `rounded-2xl border bg-card p-6/8 shadow-edge` (steps, pricing, FAQ, country, features) | `Card` (`base`) |
| CTA / free-trial gradient blocks | `Card variant="accent" size="large"` |
| Best Value article | `Card variant="accent"` + `BorderBeam` |
| `bg-primary/10 text-primary` squares and circles; numbered step circles | `IconTile` |
| Device CTA `rounded-lg bg-primary/10 p-6` | `Card variant="accent"` |
| `<section className="py-…">` (×21) and `Container className="py-…"` | `Section spacing=…` |
| 5 copied breadcrumb/H1/lead blocks | `PageHeader` |
| `SectionHeader` h2 classes | `Eyebrow` + `Heading size="heading"` |
| `h1` class strings | `Heading level={1} size="heading-lg"` |
| `text-[11px] … tracking-[0.08em]` | `text-eyebrow` |
| `max-w-7xl` container | `Container` 1200px |
| `xl:text-[2.75rem]` price | `text-stat` |
| Hero arbitrary gradients/blur | `hero-atmosphere` |
| Dot grids / radial glows | `bg-dot-grid`, `ambient-glow*` |
| `shadow-md/lg` in overlays | `shadow-overlay` |
| `shadow-lift` | `shadow-raised` |
| FlagIcon inline style | classes |
| `global-error` inline colours | system hex values (documented exception) |

---

## D. Route migration checklist

| Route | Components | Status |
|---|---|---|
| Global: layout, Navbar, MobileNav, Footer, ContactSheet, Toast | tokens, Button, overlay | VISUALLY VERIFIED |
| `/` home | Hero, Brands, HowItWorks, Pricing, carousels, Devices, CTA, FAQ | VISUALLY VERIFIED |
| `/pricing` | PageHeader, Pricing, SubscriptionFeatures, Section | VISUALLY VERIFIED |
| `/iptv-free-trial` | PageHeader-style hero, Card, IconTile, Accordion, accent CTA | VISUALLY VERIFIED |
| `/checkout` | PageHeader, Card, Input, Button | VISUALLY VERIFIED |
| `/contact` | PageHeader, Card, ContactForm inputs | VISUALLY VERIFIED |
| `/faq` | PageHeader, FAQ accordion | VISUALLY VERIFIED |
| `/locations` | PageHeader, Grid, list rows | VISUALLY VERIFIED |
| `/country/[country]` | PageHeader, Grid, Card, Accordion | VISUALLY VERIFIED |
| `/devices/[device]` | PageHeader, Prose, Card, IconTile, Accordion, InternalLinks | VISUALLY VERIFIED |
| `not-found`, `error` | Heading, Button | VISUALLY VERIFIED |
| `global-error` | inline system values | MIGRATED (cannot be triggered on demand; values match tokens) |
| `/iptv-subscription` | redirect only | N/A |

Verified at 1440 / 1024 / 768 / 390px: no horizontal overflow on any route at any width (30 route×width checks), one `<main>` per page, no button under 40px at 390px, focus ring visible on keyboard focus, form invalid state wired (`aria-invalid` + `aria-describedby`).

---

## E. Risk report

| Risk | Detail | Mitigation |
|---|---|---|
| Visual regression | Container narrows 1280 → 1200px; inner-page section rhythm drops from 96 to 80px on desktop; pricing card padding 32 → 24px | Verified at 1440/1024/768/390 |
| Responsive | Fluid type changes wrap points of every H1/H2 | Checked hero, page H1s and pricing at 390px |
| SEO | Only class names and wrapper components change; heading levels, copy, links, metadata and JSON-LD untouched. `Heading` keeps the original level | Diffed text content is unchanged |
| Accessibility | Ash `#9c9c9d` on `#040506` = 7.6:1; smoke `#6a6b6c` = 3.7:1 → only for ≥13px metadata, never body; Iron on Mist = 7.9:1; focus ring Mist on void 16:1 | Smoke restricted to `text-subtle` metadata |
| Coupling | `Card` variants are used by shadcn consumers (`InternalLinks`) — base variant keeps old API | Default variant = previous look |
| Dead theme toggle | `:root` and `.dark` are identical, so the toggle does nothing. Kept to avoid removing a control without a decision | Recommend removing it or designing a real light theme |
| Generated content | Genkit semantic-content generation is switched off (`getSemanticContent` returns the topic fallback); the flow stays for re-enabling | Needs a valid `GEMINI_API_KEY` to switch back on |
| Tech debt | shadcn primitives not used by the site (menubar, chart, slider…) keep their stock classes; tokens still theme them | Out of scope; documented |

### Remaining exceptions (design-system lint)

| Where | Value | Reason |
|---|---|---|
| `global-error.tsx` | inline hex | Replaces the root layout, so no stylesheet is loaded |
| `layout.tsx` `themeColor` | `#040506` | Browser chrome needs a literal |
| `globals.css` hero/glow utilities | rgba/hsl | Artwork recipes live in one place |
| `Hero.tsx` video `style.opacity` | dynamic | Fade-in state |
| `BorderBeam` `style` | size/duration vars | Component API |
| `ClientCarousel` item `max-w-[200px]` | poster cap | Keeps posters at their 200px source width on wide shelves |
| Pricing / StepList `[&>div]:h-full`, `[&>li]:h-full` | child selector | Stretches the reveal wrappers so cards in a row share a height |
| OG image routes (`api/og`, device `opengraph-image`) | inline hex/rgba | Rendered by `ImageResponse`, which has no stylesheet; values are the system palette |
| `not-found` / `error` `min-h-[60vh]` | status page height | Centres the message in the viewport |
| `BorderBeam` `rounded-[inherit]`, `#000` mask | component internals | Follows the parent card radius |
| Pricing featured `xl:-my-4 xl:h-[calc(100%+2rem)]`, `xl:py-10` | lift | Lets the featured card overhang its row with its content centred |
| Hero Section `min-h-[80vh] md:min-h-[600px]` | hero height | Viewport-relative hero |
| `lg:sticky lg:top-24 lg:self-start` (checkout summary, device sidebar) | navbar offset | 96px clears the 68px floating navbar plus breathing room |
