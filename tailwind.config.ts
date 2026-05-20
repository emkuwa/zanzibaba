import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zb: {
          navy: "#0A2E73",
          "navy-deep": "#07245A",
          gold: "#C89B3C",
          ink: "#0F172A",
          muted: "#64748B",
          surface: "#F8FAFC",
          border: "#E2E8F0",
        },
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36aaf5",
          500: "#0c8ee6",
          600: "#0070c4",
          700: "#01599f",
          800: "#064c83",
          900: "#0b406d",
          950: "#072849",
        },
        sand: {
          50: "#faf9f7",
          100: "#f3f0eb",
          200: "#e8e2d9",
          300: "#d4c9b9",
          400: "#b8a892",
          500: "#a08f76",
          600: "#927d67",
          700: "#796656",
          800: "#645549",
          900: "#53473d",
          950: "#2b2520",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        "zb-sm": "0 1px 2px rgba(7, 36, 90, 0.06)",
        "zb-md": "0 4px 12px rgba(7, 36, 90, 0.08)",
        "zb-lg": "0 12px 32px rgba(7, 36, 90, 0.1)",
        "zb-card":
          "0 2px 8px rgba(10, 46, 115, 0.06), 0 1px 2px rgba(10, 46, 115, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
