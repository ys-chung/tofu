import { BaseCell } from "./BaseCell"

export const Han = () => {
  return (
    <div class="grid grid-cols-2 gap-[1px] border border-stone-300 bg-stone-300 sm:grid-cols-3">
      <BaseCell title="1" />
      <BaseCell title="2" />
      <BaseCell title="3" />
      <BaseCell title="4" />
      <BaseCell title="5" />
      <BaseCell title="6" />
    </div>
  )
}
