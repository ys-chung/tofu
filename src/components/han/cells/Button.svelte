<script lang="ts">
  export let sampleChar: string

  import { char } from "../stores"

  function setChar() {
    char.set(sampleChar)
  }
</script>

<button
  on:click={setChar}
  class="rounded-full bg-neutral-300 transition hover:bg-neutral-200 active:bg-neutral-400"
>
  {sampleChar}
</button>
