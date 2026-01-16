import { createSignal, onMount, Switch, Match } from "solid-js"
import { hasAllValues } from "./util"

const Anchor = (props: { href: string; text: string }) => {
  return (
    <a
      rel="noreferrer noopener"
      target="_blank"
      class="underline decoration-stone-300 underline-offset-2 decoration-2 transition hover:decoration-current"
      href={props.href}
    >
      {props.text}
    </a>
  )
}

export const FontCheck = () => {
  const [fontCheckFailed, setFontCheckFailed] = createSignal(false)
  const isMobile = navigator.userAgent.includes("Mobile")

  onMount(async () => {
    const fontfaceSet = await document.fonts.ready

    setTimeout(() => {
      setFontCheckFailed(
        !hasAllValues(
          fontfaceSet.values(),
          "Noto Sans HK Variable",
          "Noto Sans JP Variable",
          "Noto Sans KR Variable",
          "Noto Sans SC Variable",
          "Noto Sans TC Variable"
        )
      )
    }, 1000)
  })

  return (
    <>
      {fontCheckFailed() && (
        <div class="bg-rose-50 p-2 border-stone-300 border border-b-0 text-sm flex flex-col gap-1">
          <h2 class="font-bold text-rose-700 text-base">
            !&#x20DD; Font Loading Failed
          </h2>
          <p>
            Fonts are needed to accurately display Han character comparisons.
            Try refreshing the page.
          </p>
          <p>
            If you use browser extensions that block fonts, please allow this
            site:{" "}
            <Anchor
              href="https://github.com/gorhill/uBlock/wiki/Per-site-switches#no-remote-fonts"
              text="uBlock Origin"
            />
            ,{" "}
            <Anchor
              href={
                isMobile
                  ? "https://underpassapp.com/StopTheFonts/support-ios.html#usage"
                  : "https://underpassapp.com/StopTheFonts/support-mac.html#usage"
              }
              text="StopTheFonts"
            />
            ,{" "}
            <Anchor
              href="https://noscript.net/usage/#trust-levels"
              text="NoScript"
            />
          </p>
        </div>
      )}
    </>
  )
}
