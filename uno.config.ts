import { defineConfig, presetUno, presetTypography } from "unocss"
import { fontFamily, colors } from "@unocss/preset-uno/theme"

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography({
      cssExtend: {
        h2: {
          "font-size": "1em",
          color: colors.stone[800]
        },
        a: {
          "text-decoration-color": colors.stone[300],
          color: colors.stone[600],
          transition:
            "text-decoration-color cubic-bezier(0.4, 0, 0.2, 1) 150ms",
          "text-decoration-offset": "2px"
        },
        "a:hover": {
          "text-decoration-color": colors.current
        }
      }
    })
  ],
  theme: {
    fontFamily: {
      sans: "PP Mori," + fontFamily.sans
    }
  }
})
