import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import type { AstroIntegration } from "astro"
import { satteri } from "@astrojs/markdown-satteri"
import { externalLinks } from "./src/plugins/external-links"
import solidJs from "@astrojs/solid-js"
import solid from "@solidjs/vite-plugin"
import tailwindcss from "@tailwindcss/vite"

const astroSolidClient = fileURLToPath(
  new URL("./shims/astro-solid-client.ts", import.meta.url)
)
const astroSolidServer = fileURLToPath(
  new URL("./shims/astro-solid-server.ts", import.meta.url)
)

function flattenPlugins(plugins: unknown): { name?: string }[] {
  return [plugins].flat(Infinity).filter(Boolean) as { name?: string }[]
}

/** @astrojs/solid-js still wires vite-plugin-solid 2.x; swap in the Solid 2 compiler. */
function solidJs2(): AstroIntegration {
  const inner = solidJs()
  const setup = inner.hooks["astro:config:setup"]
  return {
    ...inner,
    hooks: {
      ...inner.hooks,
      "astro:config:setup": async (args) => {
        const origUpdateConfig = args.updateConfig
        args.updateConfig = (cfg) => {
          if (cfg.vite?.plugins) {
            const rest = flattenPlugins(cfg.vite.plugins).filter(
              (plugin) => plugin.name !== "solid"
            )
            cfg = {
              ...cfg,
              vite: {
                ...cfg.vite,
                plugins: [
                  solid({ ssr: true }),
                  ...rest
                ] as typeof cfg.vite.plugins
              }
            }
          }
          return origUpdateConfig(cfg)
        }
        await setup?.(args)
      }
    }
  }
}

export default defineConfig({
  integrations: [solidJs2()],
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] })
  },
  vite: {
    resolve: {
      alias: {
        "solid-js/web": "@solidjs/web",
        "solid-js/store": "solid-js",
        "@astrojs/solid-js/client.js": astroSolidClient,
        "@astrojs/solid-js/server.js": astroSolidServer
      }
    },
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
