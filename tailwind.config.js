/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Master Design System: Stone Luxury Palette
        primary: "#1C1917", // Deep Stone
        secondary: "#44403C", // Muted Stone
        accent: "#CA8A04", // Gold CTA
        background: "#FAFAF9", // Off-white
        text: "#0C0A09", // Near black
        
        // Extended functional colors
        "surface-container": "#F5F5F4",
        "outline-variant": "#E7E5E4",
      },
      fontFamily: {
        headline: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        px: "1px",
        "DEFAULT": "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 15px rgba(0,0,0,0.1)",
        xl: "0 20px 25px rgba(0,0,0,0.15)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "liquid-slow": "liquid 20s infinite linear",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        liquid: {
          "0%, 100%": { borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%" },
          "33%": { borderRadius: "72% 28% 48% 52% / 54% 63% 37% 46%" },
          "66%": { borderRadius: "34% 66% 39% 61% / 43% 30% 70% 57%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
    },
  },
  plugins: [],
}
