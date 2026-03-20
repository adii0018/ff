/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        neon: "#00D4FF",
        orange: "#FF6B00",
        yellow: "#FFD700",
        dark: "#0A0A0F",
        card: "#12121A",
        border: "#1E1E2E",
      },
      fontFamily: {
        gaming: ["'Rajdhani'", "sans-serif"],
        orbitron: ["'Orbitron'", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { textShadow: "0 0 10px #FF6B00, 0 0 20px #FF6B00" },
          "100%": { textShadow: "0 0 20px #FFD700, 0 0 40px #FFD700, 0 0 60px #FF6B00" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
