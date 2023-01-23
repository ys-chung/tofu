<script lang="ts">
  import BaseCell from "./BaseCell.svelte"

  import { mode } from "../stores"
</script>

<BaseCell title="Mode">
  <fieldset class="flex flex-col gap-1 text-sm">
    {#each ["grid", "overlay"] as modeName}
      <label class="group flex w-min cursor-pointer items-center gap-1">
        <input
          type="radio"
          value={modeName}
          bind:group={$mode}
          class="h-3 w-3 appearance-none rounded-full border border-stone-400 transition checked:border-none checked:bg-stone-900 checked:transition-none group-hover:bg-stone-100 checked:group-hover:bg-stone-900"
        />
        <span class="capitalize">{modeName}</span>
      </label>
    {/each}
  </fieldset>
</BaseCell>
