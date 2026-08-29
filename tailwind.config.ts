import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "fs-green": {
          50: "#eef4f0",
          100: "#d3e4d8",
          200: "#a7c9b1",
          300: "#7bad8b",
          400: "#4f9264",
          600: "#1f5c37",
          700: "#194a2c",
          800: "#123420", // Deep Agricultural Green (أساسي)
          900: "#0b2215",
        },
        "fs-gold": {
          100: "#f6ecd2",
          300: "#e6cd8f",
          500: "#c9a24b", // Elegant Gold (accent فقط)
          600: "#a9832f",
        },
        "fs-cream": "#faf7f0", // Off-white
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
