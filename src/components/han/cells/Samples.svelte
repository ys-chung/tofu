<script lang="ts">
  import BaseCell from "./BaseCell.svelte"
  import Button from "./Button.svelte"
</script>

<BaseCell title="Samples">
  <div class="grid h-[5rem] grid-cols-2 grid-rows-2 gap-2 sm:h-auto sm:grow">
    <Button sampleChar="返" />
    <Button sampleChar="扇" />
    <Button sampleChar="骨" />
    <Button sampleChar="曜" />
  </div>
</BaseCell>
