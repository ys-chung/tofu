import {
  type Accessor,
  type Setter,
  For,
  onMount,
  createSignal
} from "solid-js"

import { Mode } from "../util"

import { Button } from "../Button"

export const ControlCell = (props: {
  char: Accessor<string>
  setChar: Setter<string>
  weight: Accessor<number>
  setWeight: Setter<number>
  mode: Accessor<Mode>
  setMode: Setter<Mode>
}) => {
  const { char, setChar, weight, setWeight, mode, setMode } = props

  const onInput = (e: InputEvent) => {
    if (e.inputType === "insertFromPaste") {
      const target = e.target as HTMLInputElement
      const newChar = target.value.slice(-1)

      setChar(newChar)
      target.value = newChar
      return
    }

    if (e.isComposing === false) {
      setChar(e.data ?? "")
    }
  }

  const onCompositionEnd = (e: CompositionEvent) => {
    setChar(e.data ?? "")
  }

  const onModeChange = (
    m: Mode,
    e: Event & {
      currentTarget: HTMLInputElement
      target: HTMLInputElement
    }
  ) => {
    if (e.target.checked) {
      setMode(m)
    }
  }

  const [sliderWidth, setSliderWidth] = createSignal<number>(100)

  let sliderContainer: HTMLDivElement | undefined

  onMount(() => {
    setSliderWidth(sliderContainer!.clientWidth)

    window.addEventListener("resize", () => {
      setSliderWidth(sliderContainer!.clientWidth)
    })
  })

  return (
    <div class="col-span-2 row-span-2 grid aspect-square grid-cols-2 gap-[1px] sm:col-span-1 sm:row-span-1">
      {/* Input */}
      <div class="flex aspect-square flex-col gap-2 bg-white p-2 justify-between">
        <h2 class="text-sm font-semibold">Character</h2>
        <div>
          <input
            type="text"
            name="character"
            class="block w-full text-7xl outline-none sm:text-5xl"
            oninput={onInput}
            oncompositionend={onCompositionEnd}
            aria-label="Character"
            value={char()}
          ></input>
        </div>
      </div>

      {/* Samples */}
      <div class="flex aspect-square flex-col gap-2 bg-white p-2">
        <h2 class="text-sm font-semibold">Samples</h2>
        <div class="grid h-[5rem] grid-cols-2 grid-rows-2 gap-2 sm:h-auto sm:grow">
          <Button sampleChar="返" setChar={setChar} />
          <Button sampleChar="扇" setChar={setChar} />
          <Button sampleChar="骨" setChar={setChar} />
          <Button sampleChar="曜" setChar={setChar} />
        </div>
      </div>

      {/* Weight */}
      <div class="flex aspect-square flex-col gap-2 bg-white p-2">
        <h2 class="text-sm font-semibold">Weight</h2>
        <div
          class="bg-triangle cover relative grow bg-contain bg-center bg-no-repeat relative"
          ref={sliderContainer}
          style={`--slider-width: ${sliderWidth()}px`}
        >
          <input
            type="range"
            value={weight()}
            min="250"
            max="900"
            class="peer absolute cursor-ns-resize inset-0 w-full h-full write-vertical-right opacity-0 [&::-webkit-slider-thumb]-w-[var(--slider-width)] [&::-webkit-slider-thumb]-h-7"
            style="direction: rtl"
            aria-label="Weight"
            oninput={(e) => setWeight(parseInt(e.target.value))}
          />

          <div
            class="pointer-events-none absolute w-full rounded-full bg-neutral-300 text-center text-sm leading-[1.75rem] text-neutral-900 transition peer-hover:bg-neutral-200 peer-active:bg-neutral-400 
              peer-active:font-semibold bottom-[calc(var(--offset)*(100%_-_1.75rem))]"
            style={"--offset:" + (weight() - 250) / 650}
          >
            {weight()}
          </div>
        </div>
      </div>

      {/* Mode */}
      <div class="flex aspect-square flex-col gap-2 bg-white p-2">
        <h2 class="text-sm font-semibold">Mode</h2>
        <fieldset class="flex flex-col gap-1 text-sm">
          <For
            each={
              [
                ["Grid", Mode.Grid],
                ["Overlay", Mode.Overlay]
              ] as const
            }
          >
            {(itemMode) => (
              <label class="group flex w-min cursor-pointer items-center gap-1">
                <input
                  type="radio"
                  name="mode"
                  checked={mode() === itemMode[1]}
                  onchange={[onModeChange, itemMode[1]]}
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
