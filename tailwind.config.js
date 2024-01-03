/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        wave: {
          // '0%': { transform: 'rotate(0.0deg)' },
          "0%": { transform: "rotate(28deg)" },
          "25%": { transform: "rotate(-24deg)" },
          "50%": { transform: "rotate(28deg)" },
          "75%": { transform: "rotate(-24deg)" },
          "100%": { transform: "rotate(28deg)" },
          // '60%': { transform: 'rotate(0.0deg)' },
          // '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        wave: "wave 2s linear infinite",
        "spin-slow": "spin 2s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
