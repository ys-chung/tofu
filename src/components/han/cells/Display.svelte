<script lang="ts">
  import { displayChar, weight } from "../stores"

  export let fontName: string
  export let placeName: string
  export let langAttr: string
</script>

<div
  class="relative flex aspect-square flex-col justify-between bg-white p-2 text-sm"
>
  <h2 class="z-10 font-semibold">{placeName}</h2>
  <div
    class="absolute inset-0 flex select-none items-center justify-center text-7xl sm:text-9xl"
    lang={langAttr}
    style="font-variation-settings: 'wght' {$weight}; font-family: {fontName}, AdobeBlank;"
  >
    {$displayChar}
  </div>
  <p class="z-10 text-right">{fontName}</p>
</div>
