import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f0f0",
          100: "#d1e0e1",
          200: "#a3c1c3",
          300: "#75a2a5",
          400: "#478387",
          500: "#2e5f62",
          600: "#244D4F",
          700: "#1d3e40",
          800: "#162f30",
          900: "#0f1f20",
        },
        verde: {
          DEFAULT: "#244D4F",
          light: "#8C9777",
          50: "#f2f4f0",
          100: "#e1e5da",
          200: "#c3cbb5",
          300: "#a5b190",
          400: "#8C9777",
          500: "#6e7a5c",
          600: "#566148",
        },
        areia: {
          DEFAULT: "#F5F0EB",
          50: "#FDFCFA",
          100: "#F5F0EB",
          200: "#EBE3DA",
          300: "#DDD2C5",
          400: "#C9BAA8",
          500: "#B5A28C",
        },
        terracota: {
          DEFAULT: "#C4956A",
          50: "#FCF5EF",
          100: "#F5E3D2",
          200: "#EBCBA9",
          300: "#D9AD82",
          400: "#C4956A",
          500: "#A87A50",
          600: "#8C633D",
        },
        cinza: {
          DEFAULT: "#4A4A4A",
          50: "#F7F7F7",
          100: "#E8E8E8",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#888888",
          500: "#6B6B6B",
          600: "#4A4A4A",
          700: "#333333",
        },
      },
      fontFamily: {
        heading: ["Cambria", "Georgia", "Times New Roman", "serif"],
        body: ["Browallia New", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
