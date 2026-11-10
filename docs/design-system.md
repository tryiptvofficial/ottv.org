# Design system

A dark, bordered system: one near-black canvas, precise off-white type, hairline graphite borders and monochrome controls. Colour is rare. Signal Orange marks inline links, and the spectrum gradient appears only in the hero artwork.

Stack note: Tailwind 3.4, so the source of truth is the CSS variables in `src/app/globals.css`, exposed through `tailwind.config.ts`. Components use semantic tokens (`bg-card`, `text-muted-foreground`, `rounded-card`), never raw values.

## Colour

| Token | Hex | Role |
|---|---|---|
| `--true-black` | `#000000` | Deepest backdrops and fades |
| `--obsidian-canvas` | `#0a0a0a` | Page, footer and card interiors |
| `--charcoal-surface` | `#171717` | Elevated surfaces, chips, the highlighted card |
| `--graphite-edge` | `#262626` | Every hairline, secondary button fill |
| `--steel-border` | `#464646` | Emphasised edges, field borders |
| `--cloud-white` | `#fafafa` | Headings, high-emphasis text, icons |
| `--paper-white` | `#e5e5e5` | Primary button fill |
| `--fog` | `#a1a1a1` | Navigation, secondary text |
| `--ash-grey` | `#737373` | Decoration and focus rings only |
| `--signal-orange` | `#ff8833` | Inline links only |

The canvas never changes colour. `<Section tone="light">` is only a grouping marker. `--danger-hue` and `--warning-hue` exist for states only. Do not use a saturated colour as a button fill.

## Type

Matter is commercial and not licensed here, so the site uses the spec's substitute, Inter, loaded in `src/app/layout.tsx`. If a licence is bought, only the font loading changes.

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `display-2xl` | 40-60px fluid | 500 | 1 (-1.5px tracking at 60px) | Homepage hero only |
| `display-xl` | 30-36px fluid | 500 | 1.11 | Inner page H1 |
| `heading-lg` | 28-36px fluid | 500 | 1.11 | Section headings |
| `heading` | 24px | 600 | 1.17 | Feature card headings, long-form H2 |
| `heading-sm`, `subheading` | 20px | 500 | 1.4 | Card titles |
| `body-lg` | 18px | 400 | 1.25 | Lead paragraphs |
| `body` | 16px | 400 | 1.5 | Reading text |
| `label` | 14px | 500 | 1.43 | Navigation and controls |
| `announcement` | 14px | 600 | 1.43 | Top announcement bar |
| `caption`, `meta` | 12px | 400 | 1.33 | Small print |

Never set a display headline above 600 or loosen its line height.

## Shape and space

The base unit is 8px. Content is 1152px wide. Sections sit 224px apart on desktop (128px for `compact`), set only through `Section`'s `spacing` variants. Cards use 16px padding and grids use 8px gaps.

| Radius | Value | Use |
|---|---|---|
| `rounded-control` | 8px | Buttons |
| `rounded-card`, `rounded-nav`, `rounded-input` | 10px | Cards, the nav shell, fields, media |
| `rounded-badge` | 20px | Chips |
| `rounded-pill` | 9999px | Circular controls only |

Modules are separated by 1px Graphite Edge borders, not floating shadows. Shadows are black, or the muted inset on framed media (`shadow-mockup`).

## Components

- **`AnnouncementBar`:** a shallow Charcoal strip above the nav, stating a real offer.
- **Nav:** a contained shell on the canvas with a 1px border and 10px radius.
- **`Button`:** `primary` is Paper White, for the main conversion on a view. `secondary` is a Graphite fill with a Steel edge. `ghost` is transparent with a faint edge. `pill` is the dark 32px circular control. All rectangular buttons are 36px tall.
- **`Card`:** `base` is bordered canvas. `accent` lifts to Charcoal with a Steel edge, for the featured plan or closing call to action.
- **`.text-link`:** Signal Orange, underlined.
- **`ProductDemo`:** the wide framed module after the hero, with True Black tabs along the bottom. Illustrations use generic labels and never name a channel or programme.
- **Lattice:** `Grid gap="lattice"` with `Card variant="cell"` joins modules with 1px hairlines inside one frame. Use it instead of a row of equal cards.
- **Mosaic:** `Features` leads with two wide panels holding product visuals, then four compact modules.
- **`LuminousPolygon`:** hollow rotated outlines beside the homepage hero. Decorative, never filled.
- **`ConsentManager`:** Accept and Reject must keep the same variant and size.

## Motion

The hero moves in once, without a fade, because text first painted at opacity 0 delays LCP. The one continuous moment is light travelling along the polygon. Sections do not animate in. Everything stops under `prefers-reduced-motion`.

## Decisions that differ from the spec

- Tertiary text uses Fog, not Ash, because Ash is under 4.5:1 on the canvas.
- Inline links keep an underline, because orange and Fog are too close in lightness to separate a link by colour alone.
- Buttons measure 36px as specified but carry an invisible 44px tap area.
- Long reading text uses the 1.5 line height (`body-relaxed` in the spec).
- Large headings scale down on phones.
- Customer Story Cards are not used, because the site has no verified customers to show.
