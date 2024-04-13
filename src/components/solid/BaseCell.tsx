import { mergeProps, createSignal } from "solid-js"

export const BaseCell = (props: { title: string; spaceBetween?: boolean }) => {
  const { title, spaceBetween } = mergeProps(
    {
      spaceBetween: false
    },
    props
  )

  return (
    <div
      class="flex aspect-square flex-col gap-2 bg-white p-2"
      classList={{ "justify-between": spaceBetween }}
    >
      <h2 class="text-sm font-semibold">{title}</h2>
      <slot />
    </div>
  )
}
