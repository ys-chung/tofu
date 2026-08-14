import { Loading, createStore, reconcile } from "solid-js"
import { createComponent, hydrate, render } from "@solidjs/web"

const alreadyInitializedElements = new WeakMap<
  Element,
  (next: Record<string, any>) => void
>()

export default (element: HTMLElement) =>
  (
    Component: any,
    props: any,
    slotted: any,
    { client }: { client: string }
  ) => {
    if (!element.hasAttribute("ssr")) return
    const isHydrate = client !== "only"

    let slot: HTMLElement | null
    let _slots: Record<string, any> = {}
    if (Object.keys(slotted).length > 0) {
      if (client !== "only") {
        const iterator = document.createTreeWalker(
          element,
          NodeFilter.SHOW_ELEMENT,
          (node) => {
            if (node === element) return NodeFilter.FILTER_SKIP
            if (node.nodeName === "ASTRO-SLOT") return NodeFilter.FILTER_ACCEPT
            if (node.nodeName === "ASTRO-ISLAND")
              return NodeFilter.FILTER_REJECT
            return NodeFilter.FILTER_SKIP
          }
        )
        while ((slot = iterator.nextNode() as HTMLElement | null))
          _slots[slot.getAttribute("name") || "default"] = slot
      }
      for (const [key, value] of Object.entries(slotted)) {
        if (_slots[key]) continue
        _slots[key] = document.createElement("astro-slot")
        if (key !== "default") _slots[key].setAttribute("name", key)
        _slots[key].innerHTML = value
      }
    }

    const { default: children, ...slots } = _slots
    const renderId = element.dataset.solidRenderId
    if (alreadyInitializedElements.has(element)) {
      alreadyInitializedElements.get(element)!({
        ...props,
        ...slots,
        children
      })
    } else {
      const [store, setStore] = createStore({
        ...props,
        ...slots,
        children
      })
      alreadyInitializedElements.set(element, (next) => {
        setStore((draft) => {
          reconcile(next)(draft)
        })
      })

      const fn = () => {
        const inner = () => createComponent(Component, store)

        if (isHydrate) {
          return createComponent(Loading, {
            get children() {
              return inner()
            }
          })
        } else {
          return inner()
        }
      }

      let dispose: () => void
      if (isHydrate) {
        dispose = hydrate(fn, element, { renderId })
      } else {
        element.innerHTML = ""
        dispose = render(fn, element)
      }
      element.addEventListener("astro:unmount", () => dispose(), { once: true })
    }
  }
