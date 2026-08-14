import { type Accessor, type Setter, For } from "solid-js"
import { OverlayDisplayMode, type newLangDataType } from "../util"

const colourClasses: Record<string, string> = {
  yellow:
    "bg-yellow-500/0 checked:bg-yellow-500/100 group-hover:bg-yellow-500/10 checked:group-hover:bg-yellow-500/100",
  red: "bg-red-500/0 checked:bg-red-500/100 group-hover:bg-red-500/10 checked:group-hover:bg-red-500/100",
  green:
    "bg-green-500/0 checked:bg-green-500/100 group-hover:bg-green-500/10 checked:group-hover:bg-green-500/100",
  blue: "bg-blue-500/0 checked:bg-blue-500/100 group-hover:bg-blue-500/10 checked:group-hover:bg-blue-500/100",
  fuchsia:
    "bg-fuchsia-500/0 checked:bg-fuchsia-500/100 group-hover:bg-fuchsia-500/10 checked:group-hover:bg-fuchsia-500/100"
}

export const OverlayControlCell = (props: {
  newLangData: newLangDataType
  overlayMode: Accessor<
    (typeof OverlayDisplayMode)[keyof typeof OverlayDisplayMode]
  >
  setOverlayMode: Setter<
    (typeof OverlayDisplayMode)[keyof typeof OverlayDisplayMode]
  >
}) => {
  return (
    <div class="col-span-2 flex flex-col gap-px sm:col-span-1">
      <div class="bg-white p-2 text-sm">
        <fieldset class="flex flex-col gap-1">
          <legend class="mb-1.5 text-sm font-semibold">Regions</legend>
          <For each={props.newLangData}>
            {(lang) => (
              <label class="group flex w-min cursor-pointer items-center gap-1 whitespace-nowrap">
                <input
                  type="checkbox"
                  value={lang.langAttr}
                  class={
                    "h-3 w-3 appearance-none rounded-none border border-stone-400 transition checked:border-none checked:transition-none " +
                    (colourClasses[lang.colour] || "")
                  }
                  checked={lang.showOverlay()}
                  onChange={(e) => {
                    lang.setShowOverlay(e.currentTarget.checked)
                  }}
                />
                {lang.placeName}
              </label>
            )}
          </For>
        </fieldset>
      </div>

      <div class="grow bg-white p-2 text-sm">
        <fieldset class="flex flex-col gap-1 text-sm">
          <legend class="mb-1.5 text-sm font-semibold">Display</legend>
          <For
            each={
              [
                ["Outline", OverlayDisplayMode.Outline],
                ["Solid", OverlayDisplayMode.Solid]
              ] as const
            }
          >
            {(itemMode) => (
              <label class="group flex w-min cursor-pointer items-center gap-1">
                <input
                  type="radio"
                  name="overlayMode"
                  checked={props.overlayMode() === itemMode[1]}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      props.setOverlayMode(itemMode[1])
                    }
                  }}
                  class="h-3 w-3 appearance-none rounded-full border border-stone-400 transition checked:border-none checked:bg-stone-900 checked:transition-none group-hover:bg-stone-100 checked:group-hover:bg-stone-900"
                />
                <span>{itemMode[0]}</span>
              </label>
            )}
          </For>
        </fieldset>
      </div>
    </div>
  )
}
