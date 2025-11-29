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
