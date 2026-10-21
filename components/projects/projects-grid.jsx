"use client"

import { useEffect, useState } from "react"
import Image from "@/components/optimized-image"
import Link from "next/link"
import { projectCategories } from "./portfolio-header"
import styles from "./projects-gallery.module.css"
import ProjectListRow from "./project-list-row"
import { withProjectMedia } from "@/data/project-media"

const HIDDEN_CATEGORIES = ["graphic-designing", "video-editing", "content-writing", "digital-marketing", "software-quality-assurance"]
const PER_PAGE = 8
const MOCKUP_PREVIEW_SLUGS = new Set([
  "maxcoat",
  "apex-ielts-writing",
  "time-center-modern-watch-retail-website",
  "food-delivery-web-app",
])

export default function ProjectsGrid({ category, view = "grid" }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store", signal: controller.signal })
        const result = await res.json()
        if (!res.ok || !result.success || !Array.isArray(result.data)) throw new Error("Unable to load projects. Please refresh and try again.")
        setProjects(result.data.map(withProjectMedia))
      } catch (err) {
        if (err.name !== "AbortError") setError("Unable to load projects. Please refresh and try again.")
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [])

  useEffect(() => { setCurrentPage(1) }, [category])

  const filtered = projects.filter(project => {
    const key = project.category?.toLowerCase().replace(/\s+/g, "-") || ""
    return !HIDDEN_CATEGORIES.includes(key) && (!category || category === "All" || key === category)
  })
  let ordered = filtered
  if (!category || category === "All") {
    const categories = [...new Set(filtered.map(project => project.category))].sort()
    const groups = categories.map(key => filtered.filter(project => project.category === key))
    ordered = []
    for (let index = 0; index < Math.max(0, ...groups.map(group => group.length)); index++) {
      groups.forEach(group => { if (group[index]) ordered.push(group[index]) })
    }
  }
  const pages = Math.ceil(ordered.length / PER_PAGE)
  const page = Math.min(currentPage, Math.max(1, pages))
  const gridClass = `${styles.grid} ${view === "list" ? styles.list : ""}`

  if (loading) return (
    <div className={gridClass} aria-busy="true" aria-label="Loading projects">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} aria-hidden="true" className={view === "list" ? styles.rowSkeleton : undefined}>
          {view !== "list" && <div className={styles.image} />}<div className={styles.skeleton} />
        </div>
      ))}
    </div>
  )
  if (error) return <p role="alert" className={styles.message}>{error}</p>
  if (!ordered.length) return <p role="status" className={styles.message}>No projects found in this category.</p>

  function changePage(nextPage) {
    setCurrentPage(nextPage)
    document.getElementById("projects")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    })
  }

  return (
    <>
      <div className={gridClass}>
        {ordered.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((project, index) => {
          const image = (MOCKUP_PREVIEW_SLUGS.has(project.slug) && project.homeImage) || project.images?.[0]
          const imageUrl = typeof image?.url === "string" && image.url.trim() ? image.url : "/placeholder.svg"
          const label = projectCategories.find(item => item.key === project.category)?.label || project.category?.replace(/-/g, " ")
          const date = project.createdAt ? new Date(project.createdAt) : null
          const year = date && !Number.isNaN(date.getTime()) ? date.getFullYear() : null
          const tags = [...new Set([label, project.subCategory || project.skills?.[0]])].filter(Boolean)
          if (view === "list") return (
            <ProjectListRow key={`${category}-${page}-${project._id}`} project={project}
              number={(page - 1) * PER_PAGE + index + 1} imageUrl={imageUrl} label={label} />
          )
          return (
            <article key={project._id} className={styles.card}>
              <Link href={`/projects/${project.slug}`} className={styles.cardLink} aria-label={`View project: ${project.title}`}>
                <div className={styles.image}>
                  <Image src={imageUrl} alt={image?.alt || project.title || "Project preview"}
                    fill sizes="(max-width: 767px) 100vw, 45vw"
                    onError={event => { event.currentTarget.src = "/placeholder.svg" }} />
                </div>
                <div className={styles.caption}>
                  <h3 className={styles.title}>{project.title}{year && <span className={styles.year}> - {year}</span>}</h3>
                  <div className={styles.cardTags}>
                    {tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
      {pages > 1 && (
        <nav className={styles.pagination} aria-label="Project pages">
          {Array.from({ length: pages }, (_, index) => index + 1).map(number => (
            <button key={number} type="button" className={styles.page} onClick={() => changePage(number)}
              aria-label={`Page ${number}`} aria-current={page === number ? "page" : undefined}>{number}</button>
          ))}
        </nav>
      )}
    </>
  )
}
