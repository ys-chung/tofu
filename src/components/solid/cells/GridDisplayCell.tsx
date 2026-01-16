import { type Accessor, Show } from "solid-js"

export const GridDisplayCell = (props: {
  displayChar: () => string
  weight: Accessor<number>
  fontName: string
  displayFontName: string
  placeName: string
  langAttr: string
  writingSystemName: string | null
}) => {
  const {
    displayChar,
    weight,
    fontName,
    displayFontName,
    placeName,
    langAttr,
    writingSystemName
  } = props

  return (
    <div class="relative flex aspect-square flex-col justify-between bg-white p-2 text-sm">
      <div class="flex-row flex">
        <h2 class="z-10 font-semibold">{placeName}</h2>
        <Show when={writingSystemName}>
          <span class="text-stone-500">&nbsp;·&nbsp;{writingSystemName}</span>
        </Show>
      </div>
      <div
        class="absolute inset-0 flex select-none items-center justify-center text-7xl sm:text-9xl pointer-events-none"
        lang={langAttr}
        style={`font-variation-settings: 'wght' ${weight()}; font-family: ${fontName}, AdobeBlank;`}
      >
        {displayChar()}
      </div>
      <p class="z-10 text-right">{displayFontName}</p>
    </div>
  )
}
