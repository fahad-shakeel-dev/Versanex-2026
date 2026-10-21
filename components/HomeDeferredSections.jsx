"use client"

import { lazy, Suspense, useEffect, useState } from "react"
import LazySection from "./LazySection"

const Portfolio = lazy(() => import("./portfolio"))
const Process = lazy(() => import("./Process-Section"))
const Brands = lazy(() => import("./brands-we-work-with"))
const Instagram = lazy(() => import("./instagram"))
const Contact = lazy(() => import("./contact"))
const Popup = lazy(() => import("./DynamicPopup"))

function ResolvedSection({ component: Component, anchor }) {
  useEffect(() => {
    if (anchor && window.location.hash === `#${anchor}`) {
      document.getElementById(anchor)?.scrollIntoView()
    }
  }, [anchor])
  return <Component />
}

function Deferred({ component: Component, minHeight, anchor }) {
  return <LazySection minHeight={minHeight} anchor={anchor}>
    <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
      <ResolvedSection component={Component} anchor={anchor} />
    </Suspense>
  </LazySection>
}

export function LazyPortfolio() { return <Deferred component={Portfolio} minHeight="500px" anchor="work" /> }
export function LazyProcess() { return <Deferred component={Process} minHeight="400px" /> }
export function LazyBrands() { return <Deferred component={Brands} minHeight="400px" /> }
export function LazyInstagram() { return <Deferred component={Instagram} minHeight="400px" anchor="instagram" /> }
export function LazyContact() { return <Deferred component={Contact} minHeight="500px" anchor="contact" /> }
export function LazyPopup() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 3500)
    return () => clearTimeout(timer)
  }, [])
  return ready ? <Suspense fallback={null}><Popup /></Suspense> : null
}
