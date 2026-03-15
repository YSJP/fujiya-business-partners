/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        site: {
          page: "#f9f9f9",
          text: "#7a7a7a",
          muted: "#9a9a9a",
          link: "#5a5a5a",
          border: "#dddddd",
          overlay: "rgba(0, 0, 0, 0.9)",
          strong: "#555555",
          inverse: "#ffffff",
        },
      },
      boxShadow: {
        card: "0 4px 8px rgba(0, 0, 0, 0.1)",
        faq: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        card: "8px",
        panel: "10px",
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
      fontSize: {
        title: "1.5rem",
        term: "1rem",
        body: "0.9rem",
        intro: "0.95rem",
        note: "0.8rem",
        menu: "1.5rem",
        form: "18px",
      },
      lineHeight: {
        relaxedBody: "1.6",
      },
      maxWidth: {
        site: "600px",
        faq: "800px",
      },
      spacing: {
        "site-page": "20px",
        "site-gap": "20px",
        "card-pad": "30px",
        "logo-width": "120px",
        "menu-offset": "20px",
        "menu-close-offset": "30px",
        "faq-gap": "1.5rem",
        "faq-pad-y": "1.25rem",
        "faq-pad-x": "1.5rem",
        "faq-pad-x-mobile": "0.75rem",
        "faq-answer-x": "0.5rem",
        "redirect-pad": "20px",
      },
    },
  },
  plugins: [],
};
