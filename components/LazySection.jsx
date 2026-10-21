"use client"

import { useState, useEffect, useRef } from "react"

export default function LazySection({ children, minHeight = "300px", rootMargin = "400px", anchor }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(ref.current)

    const revealAnchor = () => {
      if (anchor && window.location.hash === `#${anchor}`) setIsVisible(true)
    }
    revealAnchor()
    window.addEventListener("hashchange", revealAnchor)

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", revealAnchor)
    }
  }, [rootMargin, anchor])

  return (
    <div ref={ref} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : null}
    </div>
  )
}
