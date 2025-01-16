import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "var(--main)",
        dark: "var(--main-dark)",
        light: "var(--main-light)",
        secondary: "var(--secondary)",
        mainGray: "var(--gray)"
      },
    },
  },
  plugins: [],
} satisfies Config;
