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

  const update = debounce(() => {
    $weight = w
  }, 5)

  let thumbWidth
</script>

<BaseCell title="Weight">
  <div class="relative grow" bind:clientWidth={thumbWidth}>
    <div
      class="bg-triangle peer mx-auto flex aspect-square h-full w-min -rotate-90 items-center bg-cover bg-no-repeat text-slate-300"
      style="--thumb-width: {thumbWidth}px"
    >
      <input
        type="range"
        bind:value={w}
        min="250"
        max="900"
        class="w-full"
        on:input={() => update()}
      />
    </div>
    <div
      class="pointer-events-none absolute w-full py-1 text-center text-xs text-slate-900 transition-[font-weight] peer-active:font-semibold"
      style="bottom: calc({(w - 250) / 650} * (100% - 1.5rem));"
    >
      {w}
    </div>
  </div>
</BaseCell>

<style>
  .bg-triangle {
    background-image: url("./triangle.svg");
  }

  input[type="range"] {
    appearance: none;
    width: 100%;
    background: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    background: currentColor;
    height: var(--thumb-width);
    width: 1.5rem;
    cursor: ns-resize;
    border-radius: 100px;
    box-shadow: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    margin: calc(var(--thumb-width) / 2 * -1) 0;
  }

  input[type="range"]:focus {
    outline: none;
  }
</style>
