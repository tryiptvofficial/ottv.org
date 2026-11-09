import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

// Maps the CSS variables in src/app/globals.css onto Tailwind utilities.
// Spec and usage rules: docs/design-system.md.
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

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
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Helvetica Neue", "Arial", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        headline: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "Menlo", "Monaco", "monospace"],
      },
      // Semantic type scale. Large roles are fluid so pages never pick their own responsive pairs.
      fontSize: {
        display: ["clamp(2.5rem, 1.6rem + 3.6vw, 4rem)", { lineHeight: "1.1", fontWeight: "600" }],
        "heading-lg": ["clamp(2rem, 1.25rem + 3.2vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "0.004em", fontWeight: "500" }],
        heading: ["clamp(1.75rem, 1.6rem + 0.6vw, 2rem)", { lineHeight: "1.2", fontWeight: "500" }],
        "heading-sm": ["clamp(1.375rem, 1.3rem + 0.3vw, 1.5rem)", { lineHeight: "1.25", fontWeight: "500" }],
        subheading: ["clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        stat: ["clamp(2.25rem, 1.9rem + 1.4vw, 2.75rem)", { lineHeight: "1", fontWeight: "500" }],
        "body-lg": ["clamp(1rem, 0.95rem + 0.3vw, 1.125rem)", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        label: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.014em", fontWeight: "500" }],
        caption: ["0.8125rem", { lineHeight: "1.45", letterSpacing: "0.008em" }],
        meta: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.017em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.073em", fontWeight: "500" }],
      },
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        brand: {
          DEFAULT: token("brand"),
          tint: token("brand-tint"),
        },
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
        page: "75rem",    // 1200px page width
      },
      spacing: {
        30: "7.5rem", // 120px spacious section rhythm
      },
      gridTemplateColumns: {
        // Article layout: a 720px reading column beside a flexible sidebar
        article: "minmax(0, 45rem) minmax(0, 1fr)",
        // Main content beside a 384px summary column (checkout)
        aside: "minmax(0, 1fr) 24rem",
      },
      aspectRatio: {
        poster: "2 / 3",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        badge: "6px",
        control: "8px",
        panel: "12px",
        card: "16px",
        "card-lg": "20px",
      },
      // Elevation comes from edges, not drop shadows. Only filled buttons and overlays cast a shadow.
      boxShadow: {
        edge: "inset 0 1px 0 0 rgb(255 255 255 / 0.05), inset 0 -1px 0 0 rgb(0 0 0 / 0.2)",
        key: "inset 0 1px 0 0 rgb(255 255 255 / 0.05), 0 0 0 1px rgb(255 255 255 / 0.1), inset 0 -1px 0 0 rgb(0 0 0 / 0.2)",
        raised: "0 4px 4px 0 rgb(0 0 0 / 0.25), 0 7px 3px 0 rgb(0 0 0 / 0.03)",
        overlay: "0 4px 40px 8px rgb(0 0 0 / 0.4), 0 0 0 0.5px rgb(0 0 0 / 0.8), inset 0 0.5px 0 0 rgb(255 255 255 / 0.3)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        standard: "var(--duration-standard)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
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
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        // Hero entrances run in CSS and move only, never fade: Chrome does not count text first
        // painted at opacity 0 as the LCP element, so a fade would push LCP to a later element.
        "hero-rise": {
          from: { transform: "translateY(20px)" },
          to: { transform: "translateY(0)" },
        },
        "hero-drop": {
          from: { transform: "translateY(-20px)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down var(--duration-standard) var(--ease-standard)",
        "accordion-up": "accordion-up var(--duration-standard) var(--ease-standard)",
        "border-beam": "border-beam calc(var(--duration) * 1s) infinite linear",
        "hero-rise": "hero-rise 0.5s ease-out 0.1s both",
        "hero-drop": "hero-drop 0.6s ease-out both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
