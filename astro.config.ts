import { defineConfig } from "astro/config"

import vercel from "@astrojs/vercel"
import unocss from "unocss/astro"
import rehypeExternalLinks from "rehype-external-links"

// https://astro.build/config
import solidJs from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      injectReset: true
    }),
    solidJs()
  ],
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
    }
  },
  output: "server",
  adapter: vercel(),
  site:
    process.env.SITE ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
})
