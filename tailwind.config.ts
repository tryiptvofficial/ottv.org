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
        "display-2xl": ["clamp(2.25rem, 1.2rem + 4.2vw, 3.5rem)", { lineHeight: "1.17", fontWeight: "700" }],
        "display-xl": ["clamp(1.75rem, 1.2rem + 2.4vw, 3rem)", { lineHeight: "1.17", fontWeight: "700" }],
        display: ["clamp(2rem, 1.7rem + 1.25vw, 2.5rem)", { lineHeight: "1.17", fontWeight: "700" }],
        "heading-lg": ["clamp(1.5rem, 1.3rem + 0.8vw, 2rem)", { lineHeight: "1.2", fontWeight: "700" }],
        heading: ["1.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.25", fontWeight: "700" }],
        subheading: ["1.25rem", { lineHeight: "1.25", fontWeight: "500" }],
        stat: ["2.5rem", { lineHeight: "1", fontWeight: "900" }],
        "body-lg": ["clamp(1rem, 0.9rem + 0.5vw, 1.25rem)", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.5" }],
        label: ["0.875rem", { lineHeight: "1.43", fontWeight: "500" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
        meta: ["0.75rem", { lineHeight: "1.5" }],
      },
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        brand: token("brand"),
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
        page: "80rem",    // 1280px page width
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
        badge: "4px",
        control: "4px",
        panel: "8px",
        card: "16px",
        "card-lg": "16px",
        input: "4px",
        pill: "4px",
        nav: "4px",
      },
      // No cast shadows: depth comes from layering on black and from the feature gradient.
      boxShadow: {
        nav: "none",
        mockup: "none",
        overlay: "none",
      },
      backgroundImage: {
        feature: "var(--feature-gradient)",
      },
      backgroundColor: {
        field: "rgb(22 22 22 / 0.7)",
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
