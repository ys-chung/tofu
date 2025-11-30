import { defineConfig } from "astro/config"
import rehypeExternalLinks from "rehype-external-links"

// https://astro.build/config
import solidJs from "@astrojs/solid-js"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs()],
  markdown: {
    rehypePlugins: [
      () =>
        rehypeExternalLinks({
          target: "_blank",
          rel: ["noopener", "nofollow", "noreferrer"]
        })
    ]
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.match(".woff2")) {
              return `_astro/[hash]`
            }
            return `_astro/[name].[hash][extname]`
          }
        }
      }
    },
    plugins: [tailwindcss()]
  },
  output: "static",
  site:
    process.env.SITE ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
})
