import { defineConfig, presetWind3, presetTypography } from "unocss"
import { font, colors } from "@unocss/preset-wind4/theme"

export default defineConfig({
  presets: [
    presetWind3(),
    presetTypography({
      cssExtend: {
        h2: { "font-size": "1em", color: colors.stone[800] },
        a: {
          "text-decoration-color": colors.stone[300],
          color: colors.stone[600],
          transition:
            "text-decoration-color cubic-bezier(0.4, 0, 0.2, 1) 150ms",
          "text-underline-offset": "2px",
          "text-decoration-thickness": "2px"
        },
        "a:hover": { "text-decoration-color": "currentColor" }
      }
    })
  ],
  theme: { fontFamily: { sans: "PP Mori," + font.sans } }
})
