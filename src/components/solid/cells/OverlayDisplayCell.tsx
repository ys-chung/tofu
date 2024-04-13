import { type Accessor, type Setter, For } from "solid-js"
import { OverlayDisplayMode, type newLangDataType } from "../util"

export const OverlayDisplayCell = (props: {
  newLangData: newLangDataType
  weight: Accessor<number>
  displayChar: () => string
  overlayMode: Accessor<OverlayDisplayMode>
}) => {
  const { newLangData, weight, displayChar, overlayMode } = props

  return (
    <div class="relative col-span-2 row-span-2 aspect-square bg-white p-2 text-sm sm:aspect-auto">
      <For each={newLangData}>
        {({ langAttr, colour, fontName, showOverlay }) => (
          <div
            class="absolute inset-0 select-none text-[18rem] mix-blend-multiply"
            lang={langAttr}
            style={`font-variation-settings: 'wght' ${weight()}; font-family: ${fontName}, AdobeBlank;`}
          >
            <div
              class="absolute inset-0 flex items-center justify-center text-opacity-0"
              classList={{
                "text-stroke-red-500": colour === "red",
                "text-red-500": colour === "red",
                "text-stroke-yellow-500": colour === "yellow",
                "text-yellow-600": colour === "yellow",
                "text-stroke-green-500": colour === "green",
                "text-green-500": colour === "green",
                "text-stroke-blue-500": colour === "blue",
                "text-blue-500": colour === "blue",
                "text-stroke-fuchsia-500": colour === "fuchsia",
                "text-fuchsia-500": colour === "fuchsia",
                "text-stroke-2":
                  showOverlay() && overlayMode() === OverlayDisplayMode.Outline,
                "text-opacity-100":
                  showOverlay() && overlayMode() === OverlayDisplayMode.Solid
              }}
            >
              {displayChar()}
            </div>
            <div
              class="absolute inset-0 flex items-center justify-center text-white text-opacity-0"
              classList={{
                "text-opacity-100":
                  showOverlay() && overlayMode() === OverlayDisplayMode.Outline
              }}
            >
              {displayChar()}
            </div>
          </div>
        )}
      </For>
    </div>
  )
}
