<script lang="ts">
  import { displayChar, weight } from "../stores"

  export let fontName: string
  export let placeName: string
  export let langAttr: string
  export let specialName: string | undefined = undefined
</script>

<div
  class="relative flex aspect-square flex-col justify-between bg-white p-2 text-sm"
>
  <div class="flex-row flex">
    <h2 class="z-10 font-semibold">{placeName}</h2>
    {#if specialName}
      <span class="text-stone-500">&nbsp;·&nbsp;{specialName}</span>
    {/if}
  </div>
  <div
    class="absolute inset-0 flex select-none items-center justify-center text-7xl sm:text-9xl pointer-events-none"
    lang={langAttr}
    style="font-variation-settings: 'wght' {$weight}; font-family: {fontName}, AdobeBlank;"
  >
    {$displayChar}
  </div>
  <p class="z-10 text-right">{fontName}</p>
</div>
