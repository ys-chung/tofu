export const Mode = { Grid: "grid", Overlay: "overlay" } as const

export const OverlayDisplayMode = {
  Outline: "outline",
  Solid: "solid"
} as const

export const FontMode = {
  Sans: "sans",
  Serif: "serif"
} as const

import type { langData } from "../../private/data"
import type { Accessor, Setter } from "solid-js"

export type newLangDataType = (ReturnType<typeof langData>[number] & {
  showOverlay: Accessor<boolean>
  setShowOverlay: Setter<boolean>
})[]

export function hasAllValues(
  iterable: Iterable<FontFace>,
  ...values: string[]
): boolean {
  const found = new Set<string>()
  const target = new Set(values)

  for (const item of iterable) {
    if (target.has(item.family)) {
      found.add(item.family)

      if (found.size === target.size) {
        return true
      }
    }
  }

  return found.size === target.size
}
