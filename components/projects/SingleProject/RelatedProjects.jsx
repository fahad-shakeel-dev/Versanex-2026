"use client"

import Image from "@/components/optimized-image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion"
import { isPublicProject, withProjectMedia } from "@/data/project-media"
import styles from "./project-details.module.css"

export default function RelatedProjects({ relatedProjects = [] }) {
  const reducedMotion = useHydratedReducedMotion()
  const visibleProjects = relatedProjects.filter(isPublicProject).map(withProjectMedia)
  if (!visibleProjects.length) return null
  return (
    <section className={styles.related} aria-labelledby="related-projects-heading">
      <div className={styles.relatedHeader}>
        <h2 id="related-projects-heading">More to explore.</h2>
        <Link href="/projects">All projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className={styles.relatedGrid}>
        {visibleProjects.slice(0, 3).map(project => (
          <motion.article key={project._id || project.slug}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.7 }}>
            <Link href={`/projects/${project.slug}`} className={styles.relatedLink}>
              <figure className={styles.relatedImage}>
                <Image src={project.images?.[0]?.url || "/placeholder.svg"} alt={project.title} fill
                  sizes="(max-width: 767px) 90vw, 30vw"
                  onError={event => { if (!event.currentTarget.src.endsWith("/placeholder.svg")) event.currentTarget.src = "/placeholder.svg" }} />
              </figure>
              <div className={styles.relatedCaption}><h3>{project.title}</h3><ArrowUpRight size={19} aria-hidden="true" /></div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
