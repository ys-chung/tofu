import { type Accessor, For } from "solid-js"
import { OverlayDisplayMode, type newLangDataType } from "../util"

const colorClasses: Record<string, { stroke: string; fill0: string; fill100: string }> = {
  red: { stroke: "text-stroke-red-500", fill0: "text-red-500/0", fill100: "text-red-500/100" },
  yellow: { stroke: "text-stroke-yellow-500", fill0: "text-yellow-600/0", fill100: "text-yellow-600/100" },
  green: { stroke: "text-stroke-green-500", fill0: "text-green-500/0", fill100: "text-green-500/100" },
  blue: { stroke: "text-stroke-blue-500", fill0: "text-blue-500/0", fill100: "text-blue-500/100" },
  fuchsia: { stroke: "text-stroke-fuchsia-500", fill0: "text-fuchsia-500/0", fill100: "text-fuchsia-500/100" },
}

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
        {({ langAttr, colour, fontName, showOverlay }) => {
          const isSolid = () => showOverlay() && overlayMode() === OverlayDisplayMode.Solid
          const isOutline = () => showOverlay() && overlayMode() === OverlayDisplayMode.Outline
          const c = colorClasses[colour]

          return (
            <div
              class="absolute inset-0 select-none text-[18rem] mix-blend-multiply"
              lang={langAttr}
              style={`font-variation-settings: 'wght' ${weight()}; font-family: ${fontName}, AdobeBlank;`}
            >
              <div
                class={`absolute inset-0 flex items-center justify-center ${c.stroke}`}
                classList={{
                  [c.fill0]: !isSolid(),
                  [c.fill100]: isSolid(),
                  "text-stroke-2": isOutline()
                }}
              >
                {displayChar()}
              </div>
              <div
                class="absolute inset-0 flex items-center justify-center"
                classList={{
                  "text-white/0": !isOutline(),
                  "text-white/100": isOutline()
                }}
              >
                {displayChar()}
              </div>
            </div>
          )
        }}
      </For>
    </div>
  )
}
