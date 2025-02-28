/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // safelist: [
  //   "border-sky-600",
  //   "bg-sky-700/25",
  //   "border-emerald-700",
  //   "bg-emerald-700/25",
  //   "text-emerald-900",
  //   "text-sky-900",
  // ],
  theme: {
    extend: {
      colors: {
        "background-amber": "#fffefa",
      },

      keyframes: {
        "pulse-once": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        wave: {
          "0%": { transform: "rotate(28deg)" },
          "25%": { transform: "rotate(-24deg)" },
          "50%": { transform: "rotate(28deg)" },
          "75%": { transform: "rotate(-24deg)" },
          "100%": { transform: "rotate(28deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "10%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "10%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "quick-bounce": {
          " 0%, 100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        slowSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        wave: "wave 2s linear infinite",
        "spin-slow": "spin 2s linear infinite",
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
        text: "text 5s ease infinite",
        "quick-bounce": "quick-bounce 0.8s infinite",
        "spin-slow": "slowSpin 6s linear infinite",
        "spin-slower": "slowSpin 10s linear infinite",
        "spin-reverse": "slowSpin 8s linear infinite reverse",
        "pulse-once": "pulse-once 2s cubic-bezier(0.4, 0, 0.6, 1) forwards",
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
