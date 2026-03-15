/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        page: "#f9f9f9",
        text: "#7a7a7a",
      },
      boxShadow: {
        card: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};
