/**
 * Config do app web — consome o preset oficial da Terus (@terus/config).
 * Tokens de tema vivem no preset; aqui só content paths.
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  presets: [require("@terus/config/tailwind.config.js")],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
