"use client"

import { useEffect } from "react"

export default function LenisProvider({ children }) {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let instance
    let revision = 0
    const update = async () => {
      const current = ++revision
      instance?.destroy()
      instance = undefined
      // Touch scrolling is already native; it needs no continuous animation loop.
      if (!desktop.matches || reduced.matches) return
      const { default: Lenis } = await import("lenis")
      if (current !== revision) return
      instance = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })
    }
    update()
    desktop.addEventListener("change", update)
    reduced.addEventListener("change", update)
    return () => {
      revision++
      instance?.destroy()
      desktop.removeEventListener("change", update)
      reduced.removeEventListener("change", update)
    }
  }, [])

  return children
}
