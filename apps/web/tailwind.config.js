/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "#FFFFFF",
          "elevated-1": "#F8FAFC",
          "elevated-2": "#F1F5F9",
          "elevated-3": "#E2E8F0",
          overlay: "rgba(0, 0, 0, 0.5)",
          border: "#E5E7EB",
          "border-subtle": "#F3F4F6",
        },
        brand: {
          primary: "#2F63F5",
          "primary-hover": "#1D4ED8",
          "primary-dim": "#DBEAFE",
          secondary: "#60A5FA",
        },
        status: {
          success: "#16A34A",
          "success-dim": "#DCFCE7",
          warning: "#D97706",
          "warning-dim": "#FEF3C7",
          error: "#DC2626",
          "error-dim": "#FEE2E2",
          neutral: "#6B7280",
          "neutral-dim": "#F3F4F6",
        },
        text: {
          primary: "#111827",
          secondary: "#374151",
          tertiary: "#6B7280",
          disabled: "#9CA3AF",
          link: "#2F63F5",
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
