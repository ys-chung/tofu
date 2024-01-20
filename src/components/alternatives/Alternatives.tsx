import { type Component, createSignal } from "solid-js"
import { data } from "./altdata"

const Alternatives: Component<{}> = (props) => {
  const [text, setText] = createSignal("禮物")
  let editDiv: HTMLDivElement

  function setText2(t: string) {
    setText(t)
    editDiv.innerHTML = t
  }

  function handleInput(event: InputEvent) {
    const target = event.target as HTMLDivElement
    const text = target.innerText
    setText(text)
  }

  function replaceChar(index: number, oldChar: string, newChar: string) {
    const t = text()
    console.log("REPLACE", index, oldChar, oldChar.length, newChar, newChar.length)
    const newText = Array.from(t)
    newText[index] = newChar
    setText2(newText.join(""))
  }

  function genDisplayText(displayText: string) {
    return Array.from(displayText).map((char, index) => {
      const d = data.get(char)

      console.log(char, d)

      if (!d) {
        return <span>{char}</span>
      }

      const replacementChar = d[0]

      return (
        <span
          class="text-blue pointer-events-auto cursor-pointer"
          onClick={() => replaceChar(index, char, replacementChar)}
          role="button"
        >
          {char}
        </span>
      )
    })
  }

  return (
    <div
      class="relative"
      lang="yue-hk"
      style={{
        "font-family": [
          "Source Han Sans HK",
          "Source Han Sans TC",
          "Source Han Sans SC",
          "Source Han Sans JP",
          "Source Han Sans KR"
        ].join(",")
      }}
    >
      <div
        contenteditable="plaintext-only"
        onInput={handleInput}
        class="w-full text-6xl tracking-widest line-height-normal bg-stone-200 px-2 rd-2"
        ref={(e) => (editDiv = e)}
      >
        禮物
      </div>
      <div class="pointer-events-none absolute w-full text-6xl select-none tracking-widest line-height-normal px-2">
        {genDisplayText(text())}
      </div>
      <div>{Array.from(text()).map(c => c.codePointAt(0)?.toString(16)).join(" ")}</div>
    </div>
  )
}

export default Alternatives
