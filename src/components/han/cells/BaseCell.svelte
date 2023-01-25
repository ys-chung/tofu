<script lang="ts">
  export let title: string
  export let spaceBetween: boolean = false
</script>

<div
  class="flex aspect-square flex-col gap-2 bg-white p-2"
  class:justify-between={spaceBetween}
>
  <h2 class="text-sm font-semibold">{title}</h2>
  <slot />
</div>
