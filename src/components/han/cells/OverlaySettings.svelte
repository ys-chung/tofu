<script lang="ts">
  import { overlayDisplay, overlayRegions } from "../stores"

  import type { data } from "../data"

  export let d: typeof data
</script>

<div class="col-span-2 flex flex-col gap-[1px] sm:col-span-1">
  <div class="bg-white p-2 text-sm">
    <h4 class="mb-1.5 text-sm font-semibold">Regions</h4>
    <fieldset class="flex flex-col gap-1">
      {#each d as { placeName, langAttr, colour }}
        <label
          class="group flex w-min cursor-pointer items-center gap-1 whitespace-nowrap"
        >
          <input
            type="checkbox"
            value={langAttr}
            class="h-3 w-3 appearance-none rounded-none border border-slate-400 bg-opacity-0 transition checked:border-none checked:bg-opacity-100 checked:transition-none group-hover:bg-opacity-10 checked:group-hover:bg-opacity-100"
            class:bg-red-500={colour === "red"}
            class:bg-yellow-500={colour === "yellow"}
            class:bg-green-500={colour === "green"}
            class:bg-blue-500={colour === "blue"}
            class:bg-fuchsia-500={colour === "fuchsia"}
            bind:checked={$overlayRegions[placeName]}
          />
          {placeName}
        </label>
      {/each}
    </fieldset>
  </div>

  <div class="grow bg-white p-2 text-sm">
    <h4 class="mb-1.5 text-sm font-semibold">Display</h4>
    <fieldset class="flex flex-col gap-1 text-sm">
      {#each ["solid", "outline"] as displayModeName}
        <label class="group flex w-min cursor-pointer items-center gap-1">
          <input
            type="radio"
            value={displayModeName}
            bind:group={$overlayDisplay}
            class="h-3 w-3 appearance-none rounded-full border border-slate-400 transition checked:border-none checked:bg-slate-900 checked:transition-none group-hover:bg-slate-100 checked:group-hover:bg-slate-900"
          />
          <span class="capitalize">{displayModeName}</span>
        </label>
      {/each}
    </fieldset>
  </div>
</div>
