import { defineConfig } from "unocss"
import presetUno from "@unocss/preset-uno"
import { fontFamily } from "@unocss/preset-uno/theme"

export default defineConfig({
  presets: [presetUno()],
  theme: {
    fontFamily: {
      sans: "PP Mori," + fontFamily.sans
    }
  }
})
