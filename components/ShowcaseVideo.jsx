"use client"

import { useEffect, useRef, useState } from "react"
import { mediaUrl } from "@/lib/media-url"

// Discover eager videos in the initial HTML; keep later panels lazy.
export default function ShowcaseVideo({ eager = false, enabled = true, ...props }) {
  const videoRef = useRef(null)
  const [useLocalSource, setUseLocalSource] = useState(false)
  const desktopSource = useLocalSource ? "/hero-showreel-desktop-v2.mp4" : mediaUrl("/hero-showreel-desktop-v2.mp4")
  const mobileSource = useLocalSource ? "/hero-showreel-mobile-v2.mp4" : mediaUrl("/hero-showreel-mobile-v2.mp4")

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
    // Source errors can occur before hydration attaches React's handlers.
    if (!useLocalSource && video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setUseLocalSource(true)
      return
    }
    const source = window.matchMedia("(min-width: 1024px)").matches
      ? desktopSource : mobileSource
    if (eager && useLocalSource) video.load()
    let visible = eager
    const syncPlayback = () => {
      if (visible && !document.hidden) {
        if (!eager && video.getAttribute("src") !== source) video.src = source
        video.play()?.catch(error => {
          if (!useLocalSource && (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || error.name === "NotSupportedError")) {
            setUseLocalSource(true)
          }
        })
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
  }, [enabled, eager, desktopSource, mobileSource, useLocalSource])

  return <video {...props} ref={videoRef}
    poster={useLocalSource ? "/hero-poster-v2.webp" : mediaUrl("/hero-poster-v2.webp")} muted loop playsInline autoPlay={eager && enabled} preload={eager ? "auto" : "none"}
    onError={() => setUseLocalSource(true)}
    aria-hidden="true" tabIndex={-1}>
    {eager && <>
      <source src={desktopSource} type="video/mp4" media="(min-width: 1024px)" onError={() => setUseLocalSource(true)} />
      <source src={mobileSource} type="video/mp4" onError={() => setUseLocalSource(true)} />
    </>}
  </video>
}
