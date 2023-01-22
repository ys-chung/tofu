<script lang="ts">
  import Input from "./cells/Input.svelte"
  import Samples from "./cells/Samples.svelte"
  import Weight from "./cells/Weight.svelte"
  import Mode from "./cells/Mode.svelte"
  import Display from "./cells/Display.svelte"
  import OverlayDisplay from "./cells/OverlayDisplay.svelte"
  import OverlaySettings from "./cells/OverlaySettings.svelte"

  import { mode } from "./stores"
  import { data } from "./data"
</script>

<div
  class="grid grid-cols-2 gap-[1px] border border-slate-300 bg-slate-300 sm:grid-cols-3"
>
  <div
    class="col-span-2 row-span-2 grid aspect-square grid-cols-2 gap-[1px] sm:col-span-1 sm:row-span-1"
  >
    <Input />
    <Samples />
    <Weight />
    <Mode />
  </div>

  {#if $mode === "grid"}
    {#each data as { fontName, placeName, langAttr }}
      <Display {fontName} {placeName} {langAttr} />
    {/each}
    <div class="bg-white sm:hidden" />
  {:else}
    <OverlayDisplay d={data} />
    <OverlaySettings d={data} />
  {/if}
</div>
