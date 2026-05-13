import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://fujiya-bp.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
