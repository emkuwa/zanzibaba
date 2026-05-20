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
          "surface-warm": "#FAF8F5",
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
      borderRadius: {
        zb: "0.125rem",
        "zb-md": "0.25rem",
      },
      boxShadow: {
        "zb-sm": "0 1px 2px rgba(7, 36, 90, 0.06)",
        "zb-md": "0 4px 16px rgba(7, 36, 90, 0.1)",
        "zb-lg": "0 16px 48px rgba(7, 36, 90, 0.12)",
        "zb-xl": "0 24px 64px rgba(7, 36, 90, 0.14)",
        "zb-card":
          "0 2px 8px rgba(10, 46, 115, 0.06), 0 1px 2px rgba(10, 46, 115, 0.04)",
        "zb-card-hover":
          "0 12px 40px rgba(10, 46, 115, 0.12), 0 4px 12px rgba(10, 46, 115, 0.06)",
        "zb-gold": "0 4px 24px rgba(200, 155, 60, 0.2)",
        "zb-gold-glow":
          "0 0 0 1px rgba(200, 155, 60, 0.25), 0 8px 32px rgba(200, 155, 60, 0.15)",
        "zb-elevate":
          "0 8px 32px rgba(7, 36, 90, 0.14), 0 2px 8px rgba(10, 46, 115, 0.08)",
      },
      letterSpacing: {
        "hero-tight": "-0.02em",
        "hero-wide": "0.04em",
        editorial: "0.28em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
