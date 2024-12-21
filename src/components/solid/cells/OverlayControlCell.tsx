import { type Accessor, type Setter, For } from "solid-js"
import { OverlayDisplayMode, type newLangDataType } from "../util"

export const OverlayControlCell = (props: {
  newLangData: newLangDataType
  overlayMode: Accessor<OverlayDisplayMode>
  setOverlayMode: Setter<OverlayDisplayMode>
}) => {
  const { newLangData, overlayMode, setOverlayMode } = props

  const onOverlayModeChange = (
    m: OverlayDisplayMode,
    e: Event & {
      currentTarget: HTMLInputElement
      target: HTMLInputElement
    }
  ) => {
    if (e.target.checked) {
      setOverlayMode(m)
    }
  }

  return (
    <div class="col-span-2 flex flex-col gap-[1px] sm:col-span-1">
      <div class="bg-white p-2 text-sm">
        <h2 class="mb-1.5 text-sm font-semibold">Regions</h2>
        <fieldset class="flex flex-col gap-1">
          <For each={newLangData}>
            {({
              langAttr,
              colour,
              showOverlay,
              placeName,
              altPlaceName,
              setShowOverlay
            }) => (
              <label class="group flex w-min cursor-pointer items-center gap-1 whitespace-nowrap">
                <input
                  type="checkbox"
                  value={langAttr}
                  class="h-3 w-3 appearance-none rounded-none border border-stone-400 bg-opacity-0 transition checked:border-none checked:bg-opacity-100 checked:transition-none group-hover:bg-opacity-10 checked:group-hover:bg-opacity-100"
                  classList={{
                    "bg-red-500": colour === "red",
                    "bg-yellow-500": colour === "yellow",
                    "bg-green-500": colour === "green",
                    "bg-blue-500": colour === "blue",
                    "bg-fuchsia-500": colour === "fuchsia"
                  }}
                  checked={showOverlay()}
                  onchange={(e) => {
                    if (e.target.checked) {
                      setShowOverlay(true)
                    } else {
                      setShowOverlay(false)
                    }
                  }}
                />
                {placeName}
              </label>
            )}
          </For>
        </fieldset>
      </div>

      <div class="grow bg-white p-2 text-sm">
        <h2 class="mb-1.5 text-sm font-semibold">Display</h2>
        <fieldset class="flex flex-col gap-1 text-sm">
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
                  checked={overlayMode() === itemMode[1]}
                  onchange={[onOverlayModeChange, itemMode[1]]}
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
