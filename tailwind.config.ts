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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        main: "hsl(var(--main))",
        dark: "hsl(var(--main-dark))",
        light: "hsl(var(--main-light))",
        secondary: "hsl(var(--secondary))",
        mainGray: "hsl(var(--gray))"
      },
    },
  },
  plugins: [],
} satisfies Config;
