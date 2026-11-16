import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "#03070E",
          secondary: "#060E1A",
        },
        card: {
          DEFAULT: "#091524",
          hover: "#0E2036",
        },
        // Mapped primary brand accent to Electric Ocean Blue / Ice Cyan (Images 5, 6, 7)
        gold: {
          DEFAULT: "#00C2FF",
          light: "#5CE6FF",
          dark: "#0284C7",
          muted: "rgba(0, 194, 255, 0.14)",
        },
        ocean: {
          DEFAULT: "#00C2FF",
          light: "#67E8F9",
          bright: "#38F2FF",
          deep: "#0369A1",
          abyss: "#040B14",
        },
        vip: {
          DEFAULT: "#F5B942",
          light: "#FDE08D",
        },
        ink: {
          primary: "#F2F8FF",
          secondary: "#94A8C4",
          muted: "#5C7394",
        },
        success: {
          DEFAULT: "#10E5A3",
          muted: "rgba(16, 229, 163, 0.12)",
        },
        danger: {
          DEFAULT: "#FF5A6E",
          muted: "rgba(255, 90, 110, 0.12)",
        },
        line: {
          DEFAULT: "rgba(56, 214, 255, 0.11)",
          strong: "rgba(56, 214, 255, 0.22)",
          gold: "rgba(0, 194, 255, 0.45)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        "card-lg": "24px",
        btn: "12px",
        input: "12px",
      },
      boxShadow: {
        card: "0 16px 40px -14px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(103, 232, 249, 0.07)",
        "card-hover":
          "0 22px 48px -14px rgba(0, 140, 255, 0.22), 0 0 0 1px rgba(0, 194, 255, 0.38)",
        gold: "0 8px 28px -4px rgba(0, 194, 255, 0.35)",
        "ocean-glow":
          "0 0 36px -6px rgba(0, 194, 255, 0.42), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #5CE6FF 0%, #00C2FF 48%, #0077FF 100%)",
        "ocean-pill":
          "linear-gradient(90deg, #38F2FF 0%, #00C2FF 50%, #0284C7 100%)",
        "surface-gradient":
          "linear-gradient(180deg, rgba(11, 26, 46, 0.92) 0%, rgba(5, 12, 24, 0.97) 100%)",
        "hero-glow":
          "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0, 194, 255, 0.16), rgba(0, 90, 255, 0.05) 45%, transparent 75%)",
        "card-radial":
          "radial-gradient(circle at 85% 0%, rgba(0, 194, 255, 0.14), transparent 55%)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
