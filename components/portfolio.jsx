"use client"

import { useMemo, useState, useEffect } from "react"
import Image from "@/components/optimized-image"
import Link from "next/link"
import { motion } from "framer-motion"
import { withProjectMedia } from "@/data/project-media"
import { absoluteUrl } from "@/lib/seo"
import styles from "./portfolio.module.css"

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data.map(withProjectMedia))
        }
      })
      .catch((err) => { console.error("Error fetching projects:", err) })
      .finally(() => { setLoading(false) })
  }, [])

  const displayProjects = useMemo(() => projects.slice(0, 4), [projects])
  const leftColumn = useMemo(() => displayProjects.filter((_, i) => i % 2 === 0), [displayProjects])
  const rightColumn = useMemo(() => displayProjects.filter((_, i) => i % 2 !== 0), [displayProjects])

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: displayProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/projects/${p.slug}`),
      name: p.title,
    })),
  }), [displayProjects])

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }
  const leftCardVariants = {
    hidden: { opacity: 0, y: -35 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } })
  }
  const rightCardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] } })
  }

  const ProjectCard = ({ p, variants, index }) => (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className="group relative flex flex-col cursor-pointer"
    >
      <Link href={`/projects/${p.slug}`} className="block">
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-neutral-900 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
          <Image
            src={p.homeImage?.url || p.images?.[0]?.url || "/placeholder.svg"}
            alt={p.homeImage?.alt || `${p.title} preview`}
            fill
            sizes="(min-width: 1920px) 860px, (min-width: 1101px) calc((100vw - 160px) / 2), (max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 45vw, 560px"
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
          <div className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
          {p.category && (
            <div className={`${styles.badge} absolute bottom-3.5 right-3.5 z-10 px-3 py-1 rounded-md bg-[#121417]/85 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white tracking-wider uppercase`}>
              {p.category.replace(/-/g, " ")}
            </div>
          )}
        </div>
        <div className="mt-3.5 flex items-start justify-between gap-4">
          <div>
            <h3 className={`${styles.cardTitle} text-lg sm:text-xl font-normal text-slate-900 dark:text-white tracking-tight group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors`}>
              {p.title}
            </h3>
            <p className={`${styles.cardDescription} mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal line-clamp-1`}>
              {p.description || "Digital Platform & Custom Code"}
            </p>
          </div>
          <span className={`${styles.year} text-[11px] font-mono text-slate-500 dark:text-slate-500 font-normal pt-1 shrink-0`}>
            {p.year || "2026"}
          </span>
        </div>
      </Link>
    </motion.article>
  )

  return (
    <section id="work" aria-labelledby="work-heading" className={`${styles.section} py-20 sm:py-28 bg-[#F8F9FA] dark:bg-[#0B0C0E] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 antialiased`}>
      <div className={`${styles.frame} mx-auto max-w-7xl px-6 lg:px-12`}>

        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className={`${styles.header} mb-16 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6`}
        >
          <div className={`${styles.headingBlock} max-w-2xl`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />
              <span className={`${styles.label} text-[11px] font-mono font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400`}>OUR PROJECTS</span>
            </div>
            <h2 id="work-heading" className={`${styles.heading} text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08]`}>
              Selected Works &amp;<br />Digital Experiences.
            </h2>
          </div>
          <p className={`${styles.intro} max-w-xs text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal md:pb-1`}>
            A curated collection of modern web platforms, bespoke applications, and high-performance digital products engineered for precision.
          </p>
        </motion.div>

        <div className="min-h-[400px]">
          {loading ? (
            <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14`}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[16/11] rounded-2xl bg-slate-200 dark:bg-neutral-800 animate-pulse" />
                  <div className="h-5 w-1/2 bg-slate-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : displayProjects.length > 0 ? (
            <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start`}>
              <div className={`${styles.column} flex flex-col gap-12 sm:gap-16`}>
                {leftColumn.map((p, i) => <ProjectCard key={p.slug || i} p={p} index={i} variants={leftCardVariants} />)}
              </div>
              <div className={`${styles.column} ${styles.rightColumn} flex flex-col gap-12 sm:gap-16 md:pt-20`}>
                {rightColumn.map((p, i) => <ProjectCard key={p.slug || i} p={p} index={i} variants={rightCardVariants} />)}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-neutral-800 p-16 text-center">
              <h3 className="text-base font-normal text-slate-900 dark:text-white">No projects found</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-normal">Check back later for recent case studies.</p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
          className={`${styles.footer} mt-16 sm:mt-24 flex justify-center`}
        >
          <Link href="/projects" className={`${styles.viewAll} inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-black hover:bg-[#f2ad08] text-white hover:text-[#141b26] font-medium text-xs tracking-wide shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
            View All Projects
          </Link>
        </motion.div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
    </section>
  )
}
