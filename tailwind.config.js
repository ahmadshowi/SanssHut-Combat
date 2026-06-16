/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        charcoal: "#121212",
        "charcoal-light": "#1a1a1a",
        "deep-gray": "#1f1f1f",
        primary: {
          DEFAULT: "#e8131f",
          dark: "#a30d15",
          light: "#ff3b44",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#f1d97a",
          dark: "#a8862a",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 60%, rgba(10,10,10,1) 100%)",
      },
      boxShadow: {
        glow: "0 0 25px rgba(232, 19, 31, 0.45)",
        "glow-gold": "0 0 25px rgba(212, 175, 55, 0.45)",
        card: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(232, 19, 31, 0.4)" },
          "50%": { boxShadow: "0 0 45px rgba(232, 19, 31, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
