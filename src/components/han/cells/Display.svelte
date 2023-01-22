<script lang="ts">
  import { displayChar, weight } from "../stores"

  export let fontName: string
  export let placeName: string
  export let langAttr: string
</script>

<div
  class="relative flex aspect-square flex-col justify-between bg-white p-2 text-sm"
>
  <h4 class="z-10 font-semibold">{placeName}</h4>
  <div
    class="absolute inset-0 flex items-center justify-center text-7xl sm:text-9xl"
    lang={langAttr}
    style="font-variation-settings: 'wght' {$weight}; font-family: {fontName}"
  >
    {$displayChar}
  </div>
  <p class="z-10 text-right">{fontName}</p>
</div>
