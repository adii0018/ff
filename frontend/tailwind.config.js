/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00C853",
        neon: "#00FF88",
        dark: "#050A05",
        card: "#0a120a",
        border: "#1a2e1a",
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
          "0%": { textShadow: "0 0 10px #00FF88, 0 0 20px #00FF88" },
          "100%": { textShadow: "0 0 20px #00C853, 0 0 40px #00C853, 0 0 60px #00FF88" },
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
