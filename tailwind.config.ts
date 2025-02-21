import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        primary: "#00adee",
        secondary: "#5236e4",
        success: "#30bc81",
        warning: "#ffc107",
        danger: "#DA1A1C",
        background: "#e6eaee",
        textPrimary: "#141719",
        textSoft: "#6f787b",
      },
    },
  },
  plugins: [],
} satisfies Config;
