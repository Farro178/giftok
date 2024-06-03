import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-background": "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
      },
      colors: {
        "green-custom": "#85FFBD",
        "yellow-custom": "#FFFB7D",
      },
      keyframes: {
        fadeInScale: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        fadeInScale: "fadeInScale 0.8s ease-out",
        "scale-hover": "scaleHover 0.2s ease-in ",
      },
    },
  },
  plugins: [],
};
export default config;
