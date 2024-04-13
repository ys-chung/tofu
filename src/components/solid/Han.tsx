import { createSignal } from "solid-js"

import { Mode, OverlayDisplayMode } from "./mode"
import { langData } from "../../private/data"

import { PlaceholderCell } from "./cells/PlaceholderCell"

import { ControlCell } from "./cells/ControlCell"

export const Han = () => {
  const [char, setChar] = createSignal("返")
  const displayChar = () => char().substring(0, 1)
  const [weight, setWeight] = createSignal<number>(400)
  const [mode, setMode] = createSignal<Mode>(Mode.Grid)
  const [overlayMode, setOverlayMode] = createSignal<OverlayDisplayMode>(
    OverlayDisplayMode.Outline
  )
  const newLangData = langData.map((lang) => {
    const [showOverlay, setShowOverlay] = createSignal(lang.initialShowOverlay)
    return { ...lang, showOverlay, setShowOverlay }
  })

  return (
    <div class="grid grid-cols-2 gap-[1px] border border-stone-300 bg-stone-300 sm:grid-cols-3">
      <ControlCell
        char={char}
        setChar={setChar}
        weight={weight}
        setWeight={setWeight}
        mode={mode}
        setMode={setMode}
      ></ControlCell>

      <PlaceholderCell title="1" />
      <PlaceholderCell title="2" />
      <PlaceholderCell title="3" />
      <PlaceholderCell title="4" />
      <PlaceholderCell title="5" />
    </div>
  )
}
