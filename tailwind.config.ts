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
      // One typeface for everything.
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        body: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        headline: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
      // Semantic type scale. Large roles are fluid so pages never pick their own responsive pairs.
      fontSize: {
        // Display: 60px/500, compact block with -1.5px tracking. Hero only.
        "display-2xl": ["clamp(2.5rem, 1.75rem + 3.2vw, 3.75rem)", { lineHeight: "1", letterSpacing: "-0.025em", fontWeight: "500" }],
        "display-xl": ["clamp(1.875rem, 1.55rem + 1.3vw, 2.25rem)", { lineHeight: "1.11", fontWeight: "500" }],
        display: ["2.25rem", { lineHeight: "1.11", fontWeight: "500" }],
        // Section headings: 36px/500.
        "heading-lg": ["clamp(1.75rem, 1.5rem + 1vw, 2.25rem)", { lineHeight: "1.11", fontWeight: "500" }],
        // Feature headings: 24px/600.
        heading: ["1.5rem", { lineHeight: "1.17", fontWeight: "600" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }],
        subheading: ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }],
        stat: ["2.25rem", { lineHeight: "1.11", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.25" }],
        body: ["1rem", { lineHeight: "1.5" }],
        label: ["0.875rem", { lineHeight: "1.43", fontWeight: "500" }],
        caption: ["0.75rem", { lineHeight: "1.33" }],
        announcement: ["0.875rem", { lineHeight: "1.43", fontWeight: "600" }],
        meta: ["0.75rem", { lineHeight: "1.33" }],
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
      minHeight: {
        demo: "27rem", // keeps the frame steady when demo tabs change
      },
      maxWidth: {
        form: "32rem",    // 512px single form or card column
        narrow: "45rem",  // 720px reading column
        medium: "60rem",  // 960px
        page: "76rem",    // 1152px of content plus side gutters
      },
      spacing: {
        30: "7.5rem", // 120px spacious section rhythm
      },
      gridTemplateColumns: {
        // Article layout: a 720px reading column beside a flexible sidebar
        article: "minmax(0, 45rem) minmax(0, 1fr)",
        // Main content beside a 384px summary column (checkout)
        aside: "minmax(0, 1fr) 24rem",
        // Homepage hero: the statement beside the polygon artwork
        hero: "minmax(0, 1fr) 28rem",
        // Product demo: category rail beside the player
        demo: "11rem minmax(0, 1fr)",
      },
      aspectRatio: {
        poster: "2 / 3",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        badge: "20px",
        control: "8px",
        panel: "10px",
        card: "10px",
        "card-lg": "10px",
        input: "10px",
        pill: "9999px",
        tab: "4px",
        nav: "10px",
      },
      // Black drop shadows only, plus the muted inset that frames product media.
      boxShadow: {
        nav: "rgba(0, 0, 0, 0.25) 0px 4px 4px 0px",
        overlay: "rgba(0, 0, 0, 0.3) 0px 8px 10px 0px",
        mockup: "rgba(101, 129, 128, 0.15) 0px 0px 2px 2px inset, rgba(32, 47, 46, 0.15) 0px 0px 4px 4px inset",
        "button-primary": "rgb(255, 255, 255) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -2px 6px 0px inset",
        "button-secondary": "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px",
      },
      backgroundColor: {
        field: "rgb(23 23 23 / 0.7)",
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
        "hero-rise": "hero-rise 0.5s ease-out 0.1s both",
        "hero-drop": "hero-drop 0.6s ease-out both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
