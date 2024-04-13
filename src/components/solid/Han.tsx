import { createSignal, Switch, Match, For } from "solid-js"

import { Mode, OverlayDisplayMode } from "./mode"
import { langData } from "../../private/data"

import { PlaceholderCell } from "./cells/PlaceholderCell"

import { ControlCell } from "./cells/ControlCell"
import { GridDisplayCell } from "./cells/GridDisplayCell"

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
      />

      <Switch>
        <Match when={mode() === Mode.Grid}>
          <For each={newLangData}>
            {(lang) => (
              <GridDisplayCell
                displayChar={displayChar}
                weight={weight}
                fontName={lang.fontName}
                placeName={
                  props.useAltName ? lang.altPlaceName : lang.placeName
                }
                langAttr={lang.langAttr}
                writingSystemName={lang.writingSystemName}
              />
            )}
          </For>
        </Match>
        <Match when={mode() === Mode.Overlay}>
          <></>
        </Match>
      </Switch>
    </div>
  )
}
