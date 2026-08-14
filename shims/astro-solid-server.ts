import type { NamedSSRLoadedRendererValue } from "astro"
import {
  createComponent,
  generateHydrationScript,
  NoHydration,
  renderToString,
  renderToStream,
  ssr
} from "@solidjs/web"
import { Loading } from "solid-js"

const slotName = (str: string) =>
  str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase())

type RenderStrategy = "sync" | "async"

type RendererContext = {
  result: object
}

type Context = {
  id: string
  c: number
}

const contexts = new WeakMap<object, Context>()

function getContext(result: object): Context {
  const existing = contexts.get(result)
  if (existing) return existing
  const ctx: Context = {
    c: 0,
    get id() {
      return "s" + this.c.toString()
    }
  }
  contexts.set(result, ctx)
  return ctx
}

function incrementId(ctx: Context): string {
  const id = ctx.id
  ctx.c++
  return id
}

async function check(
  this: RendererContext,
  Component: any,
  _props: Record<string, any>,
  children: any
) {
  if (typeof Component !== "function") return false
  if (Component.name === "QwikComponent") return false
  const componentStr = Component.toString()
  if (componentStr.includes("$$payload") || componentStr.includes("$$renderer"))
    return false

  let html: string | undefined
  try {
    const result = await renderToStaticMarkup.call(
      this,
      Component,
      _props,
      children,
      {
        renderStrategy: "sync" as RenderStrategy
      }
    )
    html = result.html
  } catch {}

  return typeof html === "string"
}

async function renderToStaticMarkup(
  this: RendererContext,
  Component: any,
  props: Record<string, any>,
  { default: children, ...slotted }: any,
  metadata?: Record<string, any>
) {
  const ctx = getContext(this.result)
  const renderId = metadata?.hydrate ? incrementId(ctx) : ""
  const needsHydrate = metadata?.astroStaticSlot ? !!metadata.hydrate : true
  const tagName = needsHydrate ? "astro-slot" : "astro-static-slot"

  const renderStrategy = (metadata?.renderStrategy ?? "async") as RenderStrategy

  const renderFn = () => {
    const slots: Record<string, any> = {}
    for (const [key, value] of Object.entries(slotted)) {
      const name = slotName(key)
      slots[name] = ssr(`<${tagName} name="${name}">${value}</${tagName}>`)
    }
    const newProps = {
      ...props,
      ...slots,
      children:
        children != null
          ? ssr(`<${tagName}>${children}</${tagName}>`)
          : children
    }

    if (renderStrategy === "sync") {
      return createComponent(Component, newProps)
    } else {
      if (needsHydrate) {
        return createComponent(Loading, {
          get children() {
            return createComponent(Component, newProps)
          }
        })
      } else {
        return createComponent(NoHydration, {
          get children() {
            return createComponent(Loading, {
              get children() {
                return createComponent(Component, newProps)
              }
            })
          }
        })
      }
    }
  }

  const componentHtml =
    renderStrategy === "async"
      ? await renderToStream(renderFn, {
          renderId,
          ...({ noScripts: !needsHydrate } as { noScripts?: boolean })
        })
      : renderToString(renderFn, { renderId })

  return {
    attrs: {
      "data-solid-render-id": renderId
    },
    html: componentHtml
  }
}

const renderer: NamedSSRLoadedRendererValue = {
  name: "@astrojs/solid",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true,
  renderHydrationScript: () => generateHydrationScript()
}

export default renderer
