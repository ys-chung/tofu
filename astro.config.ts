import * as dotenv from "dotenv"
dotenv.config()

import { defineConfig } from "astro/config"

// https://astro.build/config
import svelte from "@astrojs/svelte"
import vercel from "@astrojs/vercel/static"

import unocss from "unocss/astro"

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    unocss({
      injectReset: true
    })
  ],
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
  output: "static",
  adapter: vercel(),
  site:
    process.env.SITE ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
})
