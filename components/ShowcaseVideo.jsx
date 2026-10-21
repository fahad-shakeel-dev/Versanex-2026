"use client"

import { useEffect, useRef } from "react"

// Keep decorative loops off the network and decoder until their panel is visible.
export default function ShowcaseVideo({ eager = false, enabled = true, ...props }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !enabled) {
      video?.pause()
      return
    }
    const source = window.matchMedia("(min-width: 1024px)").matches
      ? "/hero-video-desktop.mp4" : "/hero-video-mobile.mp4"
    if (eager && !video.getAttribute("src")) video.src = source
    let visible = false
    const syncPlayback = () => {
      if (visible && !document.hidden) {
        if (!video.getAttribute("src")) video.src = source
        video.play()?.catch(() => {})
      } else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.01 })
    observer.observe(video)
    document.addEventListener("visibilitychange", syncPlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", syncPlayback)
      video.pause()
    }
  }, [enabled, eager])

  return <video {...props} ref={videoRef}
    poster="/hero-showcase.webp" muted loop playsInline preload={eager ? "metadata" : "none"}
    aria-hidden="true" tabIndex={-1} />
}
