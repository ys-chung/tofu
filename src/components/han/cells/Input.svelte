<script lang="ts">
  import BaseCell from "./BaseCell.svelte"

  import { char } from "../stores"

  function onInput(e: Event) {
    const b = e as InputEvent
    if (b.isComposing === false) {
      char.set(b.data ?? "")
    }
  }

  function onCompositionEnd(e: CompositionEvent) {
    char.set(e.data ?? "")
  }
</script>

<BaseCell title="Character" spaceBetween={true}>
  <div>
    <input
      type="text"
      class="block w-full text-7xl outline-none sm:text-5xl"
      bind:value={$char}
      on:input={(e) => onInput(e)}
      on:compositionend={(e) => onCompositionEnd(e)}
      aria-label="Character"
    />
  </div>
</BaseCell>
