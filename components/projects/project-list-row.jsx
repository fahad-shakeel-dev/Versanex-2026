"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "@/components/optimized-image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import styles from "./projects-gallery.module.css"

export default function ProjectListRow({ project, number, imageUrl, label }) {
  const [preview, setPreview] = useState(null)
  const previewRef = useRef(null)
  const date = project.createdAt ? new Date(project.createdAt) : null
  const year = date && !Number.isNaN(date.getTime()) ? date.getFullYear() : null
  const tags = [...new Set([label, ...(project.skills || []).slice(0, 1)])].filter(Boolean)

  useEffect(() => {
    const hide = () => setPreview(null)
    window.addEventListener("scroll", hide, true)
    window.addEventListener("resize", hide)
    window.addEventListener("blur", hide)
    return () => {
      window.removeEventListener("scroll", hide, true)
      window.removeEventListener("resize", hide)
      window.removeEventListener("blur", hide)
    }
  }, [])

  function position(x, y) {
    const width = Math.min(288, window.innerWidth - 32)
    const height = width * 0.68
    return {
      left: Math.max(16, Math.min(x + 24, window.innerWidth - width - 16)),
      top: Math.max(16, Math.min(y - height * 0.65, window.innerHeight - height - 16)),
    }
  }

  function show(event) {
    if (event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    setPreview(position(event.clientX, event.clientY))
  }

  function move(event) {
    if (!previewRef.current) return
    const point = position(event.clientX, event.clientY)
    previewRef.current.style.left = `${point.left}px`
    previewRef.current.style.top = `${point.top}px`
  }

  return (
    <article>
      <Link href={`/projects/${project.slug}`} className={styles.listRow}
        onPointerEnter={show} onPointerMove={move} onPointerLeave={() => setPreview(null)}
        onBlur={() => setPreview(null)} onClick={() => setPreview(null)}
        onKeyDown={event => { if (event.key === "Escape") setPreview(null) }}
        onFocus={event => {
          if (!event.currentTarget.matches(":focus-visible") || window.innerWidth < 768) return
          const bounds = event.currentTarget.getBoundingClientRect()
          setPreview(position(bounds.left + bounds.width * 0.6, bounds.top + bounds.height / 2))
        }}>
        <span className={styles.rowNumber}>{String(number).padStart(2, "0")}</span>
        <h3 className={styles.rowTitle}>{project.title}{year && <span className={styles.year}> - {year}</span>}</h3>
        <div className={styles.rowTags}>{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <span className={styles.rowCategory}>{project.subCategory || label}</span>
        <ArrowUpRight className={styles.rowArrow} size={22} aria-hidden="true" />
      </Link>
      {preview && createPortal(
        <div ref={previewRef} className={styles.hoverPreview} style={preview} aria-hidden="true">
          <div className={styles.previewImage}>
            <Image src={imageUrl} alt="" fill sizes="288px"
              onError={event => { event.currentTarget.src = "/placeholder.svg" }} />
          </div>
        </div>, document.body
      )}
    </article>
  )
}
