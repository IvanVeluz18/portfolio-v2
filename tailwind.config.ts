import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        'cinzel-deco': ['var(--font-cinzel-deco)', 'serif'],
      },
      colors: {
        ds: {
          gold: "#c8b89a",
          goldDark: "#8a7a5a",
          goldMuted: "#6b5e48",
          text: "#7a6a50",
          bg: "#000000",
          panel: "rgba(0,0,0,0.95)",
          border: "#2a2218",
          soul: "#8ab0d0",
        }
      }
    },
  },
  plugins: [],
};
export default config;