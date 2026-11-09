# Design system

A neo-botanical dark-and-light system: Forest Depths bands alternate with Pure White bands, and one green, Electric Sprout, carries every action. Pages are mostly type on flat surfaces.

Stack note: Tailwind 3.4, so the source of truth is the CSS variables in `src/app/globals.css`, exposed through `tailwind.config.ts`. Components use semantic tokens (`bg-card`, `text-muted-foreground`, `rounded-pill`, `text-display`), never raw values.

## Tone

Sections are dark by default. `<Section tone="light">` applies `.tone-light`, which re-points the same semantic tokens, so no component needs a light variant. The colour change is the divider: never add a rule between bands. Bands alternate, and the home page and inner pages set their order explicitly.

`Card variant="accent"` applies `.surface-invert`: Bone White on a dark band, Forest Depths on a white one. Use it for the featured plan or the closing call to action.

## Colour

| Token | Hex | Role |
|---|---|---|
| `--forest-depths` | `#122314` | Dark canvas and dark cards |
| `--moss-shadow` | `#273f2b` | Muted text on light, field borders on dark. Not a surface |
| `--lichen-sage` | `#7e8371` | Reserved decorative tone. Fails AA as text |
| `--lichen-deep` | `#5c6152` | Lichen Sage darkened for AA metadata on white. Added to the spec |
| `--pale-fern` | `#b7bda5` | Secondary text on dark, field borders on light |
| `--electric-sprout` | `#68ef3f` | The only filled action colour, and the accent on dark |
| `--deep-verdant` | `#26a200` | The accent on light, where Sprout has no contrast |
| `--sprout-wash` | `#e7f9dd` | Soft badges and icon backings on light |
| `--mist-green` | `#d9deca` | Hover wells on light |
| `--onyx-olive` | `#30322a` | Text on light, every hairline, the nav bar |
| `--pure-white` | `#ffffff` | Light band, text on dark |
| `--bone-white` | `#f2f5eb` | Cards on light bands |

Do not add a second accent. `--danger-hue` and `--warning-hue` exist for states only.

## Type

Ozik and Aeonik are commercial and not licensed here, so the site uses the spec's substitutes. If the licences are bought, change only the font loading in `src/app/layout.tsx`, then restore Ozik's 0.86-0.90 line-height.

| Face | Stands in for | Use |
|---|---|---|
| Boldonse (`font-display`) | Ozik | `h1` only, through `display-2xl` and `display-xl` |
| Geist (`font-headline`, `font-body`) | Aeonik | All UI, body and section titles, up to 40px |
| Instrument Serif (`font-serif`) | Itself | Accents only, 16-32px: closing headings, small notes |

Boldonse capitals are about 1.07em tall, against roughly 0.7em for Ozik, so its line-height is 1.2 and its sizes are smaller than the spec's 56-80px. The visual stack is the same; lines would collide at 0.86.

Hierarchy comes from size and from one accent word in green, never from bold body text. The logo and the hero both set "TV" in green.

| Token | Size | Line height | Tracking |
|---|---|---|---|
| `display-2xl` | 32-72px fluid | 1.2 | -0.01em |
| `display-xl` | 24-48px fluid | 1.2 | -0.014em |
| `display` | 32-40px fluid, 700 | 1.2 | -0.031em |
| `heading-lg` | 28-32px fluid, 700 | 1.2 | -0.021em |
| `heading` | 24px, 600 | 1.33 | -0.015em |
| `heading-sm` | 20px, 600 | 1.43 | -0.015em |
| `subheading` | 18px, 600 | 1.5 | -0.021em |
| `body-lg` | 18px | 1.5 | -0.021em |
| `body` | 16px | 1.5 | -0.031em |
| `label` | 14px, 500 | 1.43 | -0.003em |
| `caption` | 14px | 1.5 | -0.003em |
| `meta` | 12px | 1.5 | -0.003em |

## Shape and space

The base unit is 8px and the page width is 1200px. Section padding is 80-120px through `Section`'s `spacing` variants; sections never set their own.

| Radius | Value | Use |
|---|---|---|
| `rounded-nav`, `rounded-pill` | 28px | Nav, default buttons |
| `rounded-control` | 8px | Compact buttons (`size="sm"`) |
| `rounded-card`, `rounded-card-lg` | 20px, 24px | Cards |
| `rounded-input` | 24px | Fields |
| `rounded-badge` | 40px | Badges |

Surfaces are flat and framed by a 1px Onyx Olive hairline. Only three things cast a shadow: the nav (`shadow-nav`), tilted mockups (`shadow-mockup`) and overlays (`shadow-overlay`).

## Components

- **Nav:** a floating Onyx Olive pill at 90% opacity. Sits on the root dark tone at every scroll position.
- **`Button`:** `primary` is the Sprout fill and should appear once per view where possible. `secondary` is outlined in the current foreground. Do not add another filled colour.
- **`AnnouncementPill`:** the only chip above a headline, and it must state a real offer. Section labels above headings are not part of this system.
- **`SetupMockup`:** tilted white cards showing the real order and login flow. Decorative, hidden from assistive tech.
- **`.hero-orb`:** the one gradient on the site, grainy and cropped by the hero. Text is never gradient-filled.
- **Trust strip:** logos in white at 50% opacity, directly under the hero.

## Motion

The hero moves in once, without a fade, because text first painted at opacity 0 delays LCP. Sections reveal once on scroll, and the logo row loops slowly. Everything stops under `prefers-reduced-motion`.

## Accessibility decisions that differ from the spec

- Nav links use Pale Fern, not Lichen Sage, which is under 4.5:1 on Onyx Olive.
- Muted text on white uses Moss Shadow and metadata uses `--lichen-deep`, because Lichen Sage is under 4.5:1 on white.
- The accent on white bands is Deep Verdant, because Electric Sprout is unreadable on white.
