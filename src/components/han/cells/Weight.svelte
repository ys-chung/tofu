<script lang="ts">
  import BaseCell from "./BaseCell.svelte"
  import { weight } from "../stores"

  let sliderWidth
  let sliderHeight
</script>

<BaseCell title="Weight">
  <div
    class="bg-triangle cover relative grow bg-contain bg-center bg-no-repeat"
    bind:clientWidth={sliderWidth}
    bind:clientHeight={sliderHeight}
  >
    <input
      type="range"
      bind:value={$weight}
      min="250"
      max="900"
      class="appearance-slider-vertical peer absolute h-[var(--sliderHeight)] w-[var(--sliderWidth)] cursor-ns-resize opacity-0"
      style="--sliderWidth: {sliderWidth}px; --sliderHeight: {sliderHeight}px"
      aria-label="Weight"
      {...{ orient: "vertical" }}
    />
    <div
      class="pointer-events-none absolute w-full rounded-full bg-neutral-300 text-center text-sm leading-[1.75rem] text-neutral-900 transition peer-hover:bg-neutral-200 peer-active:bg-neutral-400 peer-active:font-semibold"
      style="bottom: calc({($weight - 250) / 650} * (100% - 1.75rem));"
    >
      {$weight}
    </div>
  </div>
</BaseCell>

<style>
  .bg-triangle {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iODYiIHZpZXdCb3g9IjAgMCAyNSA4NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI1IDBMMTIuNSA4NkwwIDBMMjUgMFoiIGZpbGw9IiMwRjE3MkEiLz4KPC9zdmc+Cg==);
  }

  .appearance-slider-vertical {
    appearance: slider-vertical;
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: var(--sliderWidth);
    height: 1.75rem;
  }
</style>
