/**
 * Preset oficial de tema da Terus Platform — identidade dark enterprise.
 * Fonte única de tokens de cor/tipografia/espaçamento (CLAUDE.md · PROJECT_RULES.md).
 * Os apps consomem via `presets: [require("@terus/config/tailwind.config.js")]`.
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  darkMode: ["class"],
  content: [],
  theme: {
    extend: {
      colors: {
        // Cores via CSS variables (canais RGB) — permitem tema dark/light
        // e modificadores de opacidade (ex.: bg-brand-primary/25).
        surface: {
          base: "rgb(var(--surface-base-rgb) / <alpha-value>)",
          "elevated-1": "rgb(var(--surface-elevated-1-rgb) / <alpha-value>)",
          "elevated-2": "rgb(var(--surface-elevated-2-rgb) / <alpha-value>)",
          "elevated-3": "rgb(var(--surface-elevated-3-rgb) / <alpha-value>)",
          overlay: "var(--surface-overlay)",
          border: "rgb(var(--surface-border-rgb) / <alpha-value>)",
          "border-subtle": "rgb(var(--surface-border-subtle-rgb) / <alpha-value>)",
        },
        brand: {
          primary: "rgb(var(--brand-primary-rgb) / <alpha-value>)",
          "primary-hover": "rgb(var(--brand-primary-hover-rgb) / <alpha-value>)",
          "primary-dim": "var(--brand-primary-dim)",
          secondary: "rgb(var(--brand-secondary-rgb) / <alpha-value>)",
          dark: "rgb(var(--brand-dark-rgb) / <alpha-value>)",
          glow: "rgb(var(--brand-primary-rgb) / 0.20)",
        },
        status: {
          success: "rgb(var(--status-success-rgb) / <alpha-value>)",
          "success-dim": "var(--status-success-dim)",
          warning: "rgb(var(--status-warning-rgb) / <alpha-value>)",
          "warning-dim": "var(--status-warning-dim)",
          error: "rgb(var(--status-error-rgb) / <alpha-value>)",
          "error-dim": "var(--status-error-dim)",
          neutral: "rgb(var(--status-neutral-rgb) / <alpha-value>)",
          "neutral-dim": "var(--status-neutral-dim)",
        },
        text: {
          primary: "rgb(var(--text-primary-rgb) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
          tertiary: "rgb(var(--text-tertiary-rgb) / <alpha-value>)",
          disabled: "rgb(var(--text-disabled-rgb) / <alpha-value>)",
          link: "rgb(var(--text-link-rgb) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["64px", { lineHeight: "1.1", fontWeight: "700" }],
        "display-xl": ["48px", { lineHeight: "1.15", fontWeight: "700" }],
        "display-lg": ["36px", { lineHeight: "1.2", fontWeight: "600" }],
        "heading-xl": ["28px", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-lg": ["22px", { lineHeight: "1.35", fontWeight: "600" }],
        "heading-md": ["18px", { lineHeight: "1.4", fontWeight: "500" }],
        "body-lg": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "1.55", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["11px", { lineHeight: "1.4", fontWeight: "500" }],
        "code-md": ["13px", { lineHeight: "1.6", fontWeight: "400" }],
        "code-sm": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      spacing: {
        4.5: "18px",
        5.5: "22px",
        13: "52px",
        15: "60px",
        17: "68px",
        18: "72px",
        21: "84px",
        22: "88px",
        25: "100px",
        30: "120px",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        // Sombras tematizáveis — valores definidos em globals.css por tema
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        floating: "var(--shadow-floating)",
        premium: "var(--shadow-premium)",
        "glow-sm": "var(--glow-sm)",
        glow: "var(--glow)",
        "glow-lg": "var(--glow-lg)",
      },
      animation: {
        "fade-in": "fade-in 300ms ease-out",
        "slide-up": "slide-up 300ms ease-out",
        "slide-down": "slide-down 300ms ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
