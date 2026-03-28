import { createSignal, Switch, Match, For } from "solid-js"

import { Mode, OverlayDisplayMode, FontMode } from "./util"
import { type LangData } from "../../private/data"

import { ControlCell } from "./cells/ControlCell"
import { GridDisplayCell } from "./cells/GridDisplayCell"
import { OverlayDisplayCell } from "./cells/OverlayDisplayCell"
import { OverlayControlCell } from "./cells/OverlayControlCell"

export const Han = (props: { langData: LangData }) => {
  const [char, setChar] = createSignal("返")
  const displayChar = () => char().substring(0, 1)
  const [weight, setWeight] = createSignal<number>(400)
  const [mode, setMode] = createSignal<(typeof Mode)[keyof typeof Mode]>(
    Mode.Grid
  )
  const [overlayMode, setOverlayMode] = createSignal<
    (typeof OverlayDisplayMode)[keyof typeof OverlayDisplayMode]
  >(OverlayDisplayMode.Outline)
  const [fontMode, setFontMode] = createSignal<
    (typeof FontMode)[keyof typeof FontMode]
  >(FontMode.Sans)
  const newLangData = props.langData.map((lang) => {
    const [showOverlay, setShowOverlay] = createSignal(lang.initialShowOverlay)
    return { ...lang, showOverlay, setShowOverlay }
  })

  return (
    <div class="grid grid-cols-2 gap-px border border-stone-300 bg-stone-300 sm:grid-cols-3">
      <ControlCell
        char={char}
        setChar={setChar}
        weight={weight}
        setWeight={setWeight}
        mode={mode}
        setMode={setMode}
        fontMode={fontMode}
        setFontMode={setFontMode}
      />

      <Switch>
        <Match when={mode() === Mode.Grid}>
          <For each={newLangData}>
            {(lang) => (
              <GridDisplayCell
                displayChar={displayChar}
                weight={weight}
                fontName={fontMode() === FontMode.Sans ? lang.fontName : lang.serifFontName}
                displayFontName={fontMode() === FontMode.Sans ? lang.displayFontName : lang.serifDisplayFontName}
                placeName={lang.placeName}
                langAttr={lang.langAttr}
                writingSystemName={lang.writingSystemName}
              />
            )}
          </For>
          <div class="bg-white sm:hidden" />
        </Match>
        <Match when={mode() === Mode.Overlay}>
          <OverlayDisplayCell
            newLangData={newLangData}
            weight={weight}
            displayChar={displayChar}
            overlayMode={overlayMode}
            fontMode={fontMode}
          />
          <OverlayControlCell
            newLangData={newLangData}
            overlayMode={overlayMode}
            setOverlayMode={setOverlayMode}
          />
        </Match>
      </Switch>
    </div>
  )
}
