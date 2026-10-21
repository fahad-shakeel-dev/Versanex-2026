"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion"
import styles from "./project-details.module.css"

export default function ProjectDetails({ project, reviews = [] }) {
  const reducedMotion = useHydratedReducedMotion()
  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] },
  }

  if (!reviews.length) return null

  return (
    <section className={styles.section} aria-label="Client feedback">
      <div className={styles.inner}>
        {!!reviews.length && (
          <div className={`${styles.layout} ${styles.reviews}`}>
            <motion.div {...reveal}><p className={styles.eyebrow}>Client feedback</p><h2 className={styles.heading}>In their<br /><span>words.</span></h2></motion.div>
            <div>{reviews.map((review, index) => {
              const rating = Math.min(5, Math.max(0, Number(review.rating) || 0))
              return <motion.article {...reveal} key={review._id || index} className={styles.review}>
                <div className={styles.rating} aria-label={`${rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill={star <= rating ? "currentColor" : "none"} aria-hidden="true" />)}</div>
                {review.title && <h3>{review.title}</h3>}
                {review.description && <blockquote>{review.description}</blockquote>}
                <p className={styles.reviewer}>{review.reviewerName || "Anonymous"}</p>
                {review.adminReply && <p className={styles.reply}><span>VersaNex response</span>{review.adminReply}</p>}
              </motion.article>
            })}</div>
          </div>
        )}
      </div>
    </section>
  )
}
