<script lang="ts">
  import BaseCell from "./BaseCell.svelte"
  import { weight } from "../stores"

  function debounce<T extends Function>(cb: T, wait = 20) {
    let h: NodeJS.Timeout
    let callable = (...args: any) => {
      clearTimeout(h)
      h = setTimeout(() => cb(...args), wait)
    }
    return <T>(<any>callable)
  }

  let w: number = 400
  let sliderWidth
  let sliderHeight

  const update = debounce(() => {
    $weight = w
  }, 5)
</script>

<BaseCell title="Weight">
  <div
    class="bg-triangle cover relative grow bg-contain bg-center bg-no-repeat"
    bind:clientWidth={sliderWidth}
    bind:clientHeight={sliderHeight}
  >
    <input
      type="range"
      bind:value={w}
      min="250"
      max="900"
      on:input={() => update()}
      class="appearance-slider-vertical peer absolute cursor-ns-resize opacity-0"
      style="--sliderWidth: {sliderWidth}px; --sliderHeight: {sliderHeight}px"
      {...{ orient: "vertical" }}
    />
    <div
      class="pointer-events-none absolute w-full rounded-full bg-slate-300 text-center text-sm leading-[1.75rem] text-slate-900 transition peer-hover:bg-slate-200 peer-active:bg-slate-400 peer-active:font-semibold"
      style="bottom: calc({(w - 250) / 650} * (100% - 1.75rem));"
    >
      {w}
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

  input[type="range"] {
    height: var(--sliderHeight);
    width: var(--sliderWidth);
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: var(--sliderWidth);
    height: 1.75rem;
  }
</style>
