"use client"

import { useEffect, useRef } from "react"

// Discover eager videos in the initial HTML; keep later panels lazy.
export default function ShowcaseVideo({ eager = false, enabled = true, ...props }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
    }
    if (!video || !enabled) {
      video?.pause()
      return
    }
    const source = window.matchMedia("(min-width: 1024px)").matches
      ? "/hero-showreel-desktop-v2.mp4" : "/hero-showreel-mobile-v2.mp4"
    let visible = eager
    const syncPlayback = () => {
      if (visible && !document.hidden) {
        if (!eager && !video.getAttribute("src")) video.src = source
        video.play()?.catch(() => {})
      } else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.01 })
    observer.observe(video)
    syncPlayback()
    document.addEventListener("visibilitychange", syncPlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", syncPlayback)
      video.pause()
    }
  }, [enabled, eager])

  return <video {...props} ref={videoRef}
    poster="/hero-showcase.webp" muted loop playsInline autoPlay={eager && enabled} preload={eager ? "auto" : "none"}
    aria-hidden="true" tabIndex={-1}>
    {eager && <>
      <source src="/hero-showreel-desktop-v2.mp4" type="video/mp4" media="(min-width: 1024px)" />
      <source src="/hero-showreel-mobile-v2.mp4" type="video/mp4" />
    </>}
  </video>
}
