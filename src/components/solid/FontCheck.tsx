import { createSignal, onMount, Switch, Match } from "solid-js"

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
        !(
          fontfaceSet.check(`12px "Source Han Sans HK"`, "返") &&
          fontfaceSet.check(`12px "Source Han Sans JP"`, "返") &&
          fontfaceSet.check(`12px "Source Han Sans KR"`, "返") &&
          fontfaceSet.check(`12px "Source Han Sans SC"`, "返") &&
          fontfaceSet.check(`12px "Source Han Sans TC"`, "返")
        )
      )
    }, 100)
  })

  return (
    <>
      {fontCheckFailed() && (
        <div class="bg-rose-50 p-2 border-stone-300 border border-be-0 text-sm flex flex-col gap-1">
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
