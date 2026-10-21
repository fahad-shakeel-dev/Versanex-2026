"use client"

import { useEffect, useId, useRef, useState } from "react"
import Image from "@/components/optimized-image"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react"
import styles from "./project-hero.module.css"

const categories = {
  "website-developing": "Web Design & Development",
  "mobile-app-development": "Mobile App Development",
  "ui-ux": "UX/UI Design",
  "graphic-designing": "Graphic Design",
}

export default function ProjectHeader({ project }) {
  const source = project.images?.[0]?.url
  const [imgSrc, setImgSrc] = useState(source || "/placeholder.svg")
  const [expanded, setExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)
  const descriptionRef = useRef(null)
  const descriptionId = useId()
  useEffect(() => { setImgSrc(source || "/placeholder.svg") }, [source])
  const category = categories[project.category] || project.category?.replace(/-/g, " ") || "Digital experience"
  const date = project.createdAt ? new Date(project.createdAt) : null
  const year = date && !Number.isNaN(date.getTime()) ? date.getUTCFullYear() : null
  const liveLink = /^https?:\/\//i.test(project.liveLink || "") ? project.liveLink : null
  const titleParts = (project.title || "Project").split(/\s+[–—-]\s+/)
  const name = titleParts[0]
  const description = (project.description || titleParts.slice(1).join(" — ") || "").trim()

  useEffect(() => { setExpanded(false) }, [description])

  useEffect(() => {
    const element = descriptionRef.current
    if (!element || expanded) return
    let active = true
    const measure = () => {
      if (active) setCanExpand(element.scrollHeight > element.clientHeight + 1)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    measure()
    document.fonts?.ready.then(measure)
    return () => {
      active = false
      observer.disconnect()
    }
  }, [description, expanded])

  function explore(event) {
    event.preventDefault()
    document.getElementById("project-details")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    })
  }

  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.topline}>
          <Link href="/projects" className={styles.back}><ArrowLeft size={15} aria-hidden="true" /> All projects</Link>
          <span className={styles.eyebrow}>{category}{year ? ` / ${year}` : ""}</span>
        </div>
        <div className={styles.intro}>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.descriptionRow}>
            {description && (
              <div className={styles.descriptionBlock}>
                <p ref={descriptionRef} id={descriptionId}
                  className={`${styles.description} ${expanded ? styles.descriptionExpanded : styles.descriptionPreview}`}>
                  {description}
                </p>
                {canExpand && (
                  <button type="button" className={styles.readMore} aria-expanded={expanded}
                    aria-controls={descriptionId} onClick={() => setExpanded(value => !value)}>
                    {!expanded && <span aria-hidden="true">...</span>}
                    {expanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
            )}
            <div className={styles.actions}>
              {project.contactCta
                ? <Link href="/contact" className={styles.visit}>{project.contactCta} <ArrowUpRight size={18} aria-hidden="true" /></Link>
                : liveLink && <a href={liveLink} target="_blank" rel="noopener noreferrer" className={styles.visit}>Visit project <ArrowUpRight size={18} aria-hidden="true" /></a>}
              <a href="#project-details" onClick={explore} className={styles.explore} aria-label="Explore project details"><ArrowDown size={21} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <div className={styles.visualContainer}>
          {project.images && project.images.length > 0 ? (
            project.images.slice(0, 3).map((img, i) => (
              <figure key={i} className={styles.visual} style={{
                top: `calc(80px + ${i * 16}px)`,
                zIndex: i + 1,
                ...((img.url?.startsWith("/project-mockups/") || img.url?.startsWith("/mockups/")) ? { height: "auto", aspectRatio: "3 / 2" } : {}),
              }}>
                <Image src={img.url} alt={img.alt || project.title || "Project preview"}
                  fill priority={i === 0} sizes="90vw" className={styles.cover} />
              </figure>
            ))
          ) : (
            <figure className={styles.visual} style={{ top: '120px' }}>
              <Image src={imgSrc} alt={project.title || "Project preview"}
                fill priority sizes="90vw" className={styles.cover}
                onError={() => { if (imgSrc !== "/placeholder.svg") setImgSrc("/placeholder.svg") }} />
            </figure>
          )}
        </div>
        <dl className={styles.facts}>
          <div><dt>Discipline</dt><dd>{project.subCategory || category}</dd></div>
          <div><dt>Created by</dt><dd>{project.creatorName || "VersaNex"}</dd></div>
          {year && <div><dt>Year</dt><dd>{year}</dd></div>}
          {project.status && <div><dt>Status</dt><dd>{project.status}</dd></div>}
        </dl>
      </div>
    </header>
  )
}
