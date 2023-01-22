<script lang="ts">
  import {
    displayChar,
    weight,
    overlayRegions,
    overlayDisplay
  } from "../stores"
  import type { data } from "../data"

  export let d: typeof data
</script>

<div
  class="relative col-span-2 row-span-2 aspect-square bg-white p-2 text-sm sm:aspect-auto"
>
  {#each d as { fontName, langAttr, colour, placeName }}
    <div class="absolute inset-0 text-[18rem] mix-blend-multiply">
      <div
        class="absolute inset-0 flex items-center justify-center text-opacity-0"
        class:text-stroke-red-500={colour === "red"}
        class:text-red-500={colour === "red"}
        class:text-stroke-yellow-500={colour === "yellow"}
        class:text-yellow-600={colour === "yellow"}
        class:text-stroke-green-500={colour === "green"}
        class:text-green-500={colour === "green"}
        class:text-stroke-blue-500={colour === "blue"}
        class:text-blue-500={colour === "blue"}
        class:text-stroke-fuchsia-500={colour === "fuchsia"}
        class:text-fuchsia-500={colour === "fuchsia"}
        class:text-stroke-2={$overlayRegions[placeName] &&
          $overlayDisplay === "outline"}
        class:text-opacity-100={$overlayRegions[placeName] &&
          $overlayDisplay === "solid"}
        lang={langAttr}
        style="font-variation-settings: 'wght' {$weight}; font-family: {fontName}"
      >
        {$displayChar}
      </div>
      <div
        class="absolute inset-0 flex items-center justify-center text-white text-opacity-0"
        class:text-opacity-100={$overlayRegions[placeName] &&
          $overlayDisplay === "outline"}
        style="font-variation-settings: 'wght' {$weight}; font-family: {fontName}"
      >
        {$displayChar}
      </div>
    </div>
  {/each}
</div>
