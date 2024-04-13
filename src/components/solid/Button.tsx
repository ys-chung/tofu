import type { Setter } from "solid-js"

export const Button = (props: {
  sampleChar: string
  setChar: Setter<string>
}) => {
  const { sampleChar, setChar } = props
  return (
    <button
      class="rounded-full bg-neutral-300 transition hover:bg-neutral-200 active:bg-neutral-400"
      onclick={() => setChar(sampleChar)}
    >
      {sampleChar}
    </button>
  )
}
