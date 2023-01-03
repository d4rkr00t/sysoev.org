import { defineConfig } from "astro/config";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://sysoev.org",
  outDir: "docs",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "rose-pine",
    }
  }
});
