import { writable, derived } from "svelte/store"

export const char = writable("返")
export const displayChar = derived(char, ($char) => $char.substring(0, 1))
export const weight = writable(400)
export const mode = writable<"grid" | "overlay">("grid")
export const overlayDisplay = writable<"outline" | "solid">("outline")
export const overlayRegions = writable({
  "Hong Kong": false,
  Japan: true,
  Korea: true,
  "Mainland China": false,
  Taiwan: false
})
