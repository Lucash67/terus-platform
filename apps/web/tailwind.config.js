/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "#050A14",
          "elevated-1": "#0A1628",
          "elevated-2": "#0F1E36",
          "elevated-3": "#162440",
          overlay: "#1A2B4A",
          border: "#1E3256",
          "border-subtle": "#152A4A",
        },
        brand: {
          primary: "#00C2FF",
          "primary-hover": "#00A8E0",
          "primary-dim": "#00C2FF1A",
          secondary: "#0066CC",
          glow: "#00C2FF33",
        },
        status: {
          success: "#00E676",
          "success-dim": "#00E6761A",
          warning: "#FFB300",
          "warning-dim": "#FFB3001A",
          error: "#FF3D57",
          "error-dim": "#FF3D571A",
          neutral: "#546E8A",
          "neutral-dim": "#546E8A1A",
        },
        text: {
          primary: "#E8F4FF",
          secondary: "#8BA9C5",
          tertiary: "#546E8A",
          disabled: "#2D4A6A",
          link: "#00C2FF",
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
        "caption": ["11px", { lineHeight: "1.4", fontWeight: "500" }],
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
        lg: "12px",
        md: "8px",
        sm: "6px",
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
