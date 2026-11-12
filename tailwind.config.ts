import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

// Maps the CSS variables in src/app/globals.css onto Tailwind utilities.
// Spec and usage rules: docs/design-system.md.
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const sans = ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"];

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Width breakpoints stay Tailwind defaults (sm 640, md 768, lg 1024, xl 1280, 2xl 1536).
      // `short` is the one height breakpoint: landscape phones and other screens under 500px tall.
      screens: {
        short: { raw: "(max-height: 500px)" },
      },
      // Geist Sans for reading, Geist Mono for stamping labels and metadata.
      fontFamily: {
        sans,
        body: sans,
        headline: sans,
        display: sans,
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      // Semantic type scale (H1-H6). Large roles are fluid so pages never pick their own responsive pairs.
      // Headings are Geist at 600 with tight tracking: compact and decisive, never heavier than 600.
      fontSize: {
        // H1, homepage hero: 40-56px.
        "display-2xl": ["clamp(2.5rem, 1.7rem + 2.6vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "600" }],
        // H1, inner pages: 36-48px.
        "display-xl": ["clamp(2.25rem, 1.6rem + 2vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "600" }],
        display: ["3rem", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "600" }],
        // H2, section headings: 30-40px.
        "heading-lg": ["clamp(1.875rem, 1.5rem + 1.2vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.035em", fontWeight: "600" }],
        // H2 inside articles and panels (guide sections, call-to-action cards): 24-30px.
        "heading-md": ["clamp(1.5rem, 1.3rem + 0.7vw, 1.875rem)", { lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "600" }],
        // H3, card and step titles: 20-22px.
        heading: ["clamp(1.25rem, 1.15rem + 0.3vw, 1.375rem)", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" }],
        // H4, small titles (guide steps, sidebar panels): 17px.
        "heading-sm": ["1.0625rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
        subheading: ["1.0625rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
        // H5: 15px.
        "heading-xs": ["0.9375rem", { lineHeight: "1.45", fontWeight: "600" }],
        // Prices and figures: 36-48px.
        stat: ["clamp(2.25rem, 1.9rem + 1.2vw, 3rem)", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        label: ["0.875rem", { lineHeight: "1.55" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
        announcement: ["0.8125rem", { lineHeight: "1.5" }],
        meta: ["0.75rem", { lineHeight: "1.5" }],
        // H6 and the mono stamp: 11px uppercase with 0.071em tracking (see `.stamp`).
        eyebrow: ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.071em" }],
      },
      fontWeight: {
        book: "450",
      },
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        brand: token("brand"),
        signal: token("signal"),
        steel: token("steel"),
        deep: token("deep"),
        placeholder: token("placeholder"),
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
        },
        popover: {
          DEFAULT: token("popover"),
          foreground: token("popover-foreground"),
        },
        recessed: token("recessed"),
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          foreground: token("secondary-foreground"),
        },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        subtle: token("subtle"),
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("destructive-foreground"),
        },
        info: token("info"),
        success: token("success"),
        warning: token("warning"),
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        chart: {
          "1": token("chart-1"),
          "2": token("chart-2"),
          "3": token("chart-3"),
          "4": token("chart-4"),
          "5": token("chart-5"),
        },
      },
      maxWidth: {
        form: "32rem",    // 512px single form or card column
        narrow: "45rem",  // 720px reading column
        medium: "60rem",  // 960px
        page: "80rem",    // 1280px including the side gutters
      },
      gridTemplateColumns: {
        // Article layout: a 720px reading column beside a flexible sidebar
        article: "minmax(0, 45rem) minmax(0, 1fr)",
        // Main content beside a 384px summary column
        aside: "minmax(0, 1fr) 24rem",
      },
      aspectRatio: {
        poster: "2 / 3",
      },
      // Rounded cards (16px), softer controls (10px), full pills for tags and the nav action.
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        badge: "9999px",
        control: "10px",
        panel: "12px",
        card: "16px",
        "card-lg": "20px",
        input: "10px",
        pill: "9999px",
        tab: "4px",
        nav: "12px",
      },
      // `card` is an elegant border plus a long, faint shadow; `hairline` the border alone; `glow` the green
      // ring for the one recommended element in a group; `overlay` for menus, sheets and the consent panel.
      boxShadow: {
        card: "var(--shadow-card)",
        hairline: "var(--shadow-hairline)",
        glow: "var(--shadow-glow)",
        overlay: "var(--shadow-card)",
      },
      backgroundColor: {
        field: token("card"),
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        standard: "var(--duration-standard)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        "out-expo": "var(--ease-out-expo)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down var(--duration-standard) var(--ease-standard)",
        "accordion-up": "accordion-up var(--duration-standard) var(--ease-standard)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
