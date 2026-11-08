/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral dingin yang bersih, seperti kain baru selesai dicuci.
        cream: {
          50: "#FBFDFF",
          100: "#F3F8FE",
          200: "#E7F1FA",
          300: "#D6E6F4",
        },
        ink: {
          300: "#7B8FAA",
          400: "#50698A",
          500: "#365274",
          600: "#243F60",
          700: "#172F4B",
          800: "#0E2138",
          900: "#071626",
        },
        // Biru utama diambil langsung dari logo Harmony Laundry.
        brand: {
          50: "#EFF7FE",
          100: "#DBEEFC",
          200: "#BEE2FA",
          300: "#8FCDF5",
          400: "#5AB1EC",
          500: "#29A0E6",
          600: "#1683C9",
          700: "#0E5AA4",
          800: "#0B4A87",
          900: "#0A3D70",
        },
        citrus: {
          100: "#FFF8DC",
          200: "#FFEFB8",
          300: "#FFE08A",
          400: "#FFD166",
          500: "#F5B700",
        },
        coral: {
          300: "#FFB4A2",
          400: "#FF8A70",
          500: "#FF6B4A",
          600: "#E24E2F",
        },
        lilac: {
          200: "#E8F0FF",
          300: "#D2E2FF",
          400: "#A9C6FF",
          500: "#7FA9FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px -24px rgba(8,17,32,0.22)",
        lift: "0 36px 90px -36px rgba(8,17,32,0.35)",
        sticker: "0 14px 34px -12px rgba(245,183,0,0.65)",
        card: "0 24px 60px -38px rgba(8,17,32,0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tw-rotate, 0deg))" },
          "50%": { transform: "translateY(-14px) rotate(var(--tw-rotate, 0deg))" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.55" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        pop: "pop 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
