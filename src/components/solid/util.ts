export enum Mode {
  Grid,
  Overlay
}

export enum OverlayDisplayMode {
  Outline,
  Solid
}

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
