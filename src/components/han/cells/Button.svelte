<script lang="ts">
  export let sampleChar: string

  import { char } from "../stores"

  function setChar() {
    char.set(sampleChar)
  }
</script>

<button
  on:click={setChar}
  class="rounded-full bg-slate-300 transition hover:bg-slate-200 active:bg-slate-400"
>
  {sampleChar}
</button>
