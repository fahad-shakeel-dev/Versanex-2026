"use client"

import { useRef } from "react"
import Image from "@/components/optimized-image"
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion"
import styles from "./project-about.module.css"

const ease = [0.22, 1, 0.36, 1]

export function getAboutImages(images = []) {
  const unique = new Map()
  ;(Array.isArray(images) ? images : []).forEach(image => {
    const url = typeof image === "string" ? image : image?.url
    if (typeof url === "string" && url.trim() && !unique.has(url)) {
      unique.set(url, { url, alt: typeof image === "object" ? image.alt : "", width: typeof image === "object" ? image.width : undefined, height: typeof image === "object" ? image.height : undefined })
    }
  })
  const gallery = [...unique.values()]
  return [gallery[1] || gallery[0], gallery[2] || gallery[0]]
}

function ProjectImage({ image, name, small = false, mobile, logo = false, reducedMotion }) {
  const deviceScene = image.url.startsWith("/mockups/finance-flow/") || image.url.startsWith("/mockups/callmind-ai/") || image.url.startsWith("/mockups/luxurystay/") || image.url.startsWith("/mockups/petrol-management/") || image.url.startsWith("/mockups/hrms-system/") || image.url.startsWith("/mockups/salon-system/")
  const keepFrame = mobile || logo || deviceScene
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const y = useTransform(progress, [0, 1], small ? [18, -18] : [24, -24])
  const scale = useTransform(progress, [0, 1], [1.075, 1.015])

  return (
    <div ref={imageRef} className={small ? styles.smallVisual : styles.largeVisual}>
      <motion.figure className={`${styles.imageFrame} ${logo ? styles.logoFrame : ""} ${deviceScene ? styles.deviceScene : ""}`} style={(image.url.startsWith("/mockups/petrol-management/") || image.url.startsWith("/mockups/hrms-system/") || image.url.startsWith("/mockups/salon-system/")) && image.width && image.height ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
        initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(12% 0 12% 0 round 22px)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0 round 22px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reducedMotion ? 0 : 1.15, ease }}>
        <motion.div className={`${styles.imageLayer} ${keepFrame ? styles.appLayer : ""}`}
          style={{ y: reducedMotion || keepFrame ? 0 : y, scale: reducedMotion || keepFrame ? 1 : scale }}>
          <Image src={image.url} alt={image.alt || `${name} project screenshot`}
            fill sizes={small ? "(max-width: 767px) 65vw, 28vw" : "(max-width: 767px) 90vw, 45vw"}
            className={logo ? styles.logoImage : mobile || deviceScene ? styles.appImage : styles.image}
            onError={event => {
              if (!event.currentTarget.src.endsWith("/placeholder.svg")) event.currentTarget.src = "/placeholder.svg"
            }} />
        </motion.div>
      </motion.figure>
      <div className={styles.imageCaption}><span>{small ? "01 / A closer look" : "02 / The experience"}</span><span aria-hidden="true">↗</span></div>
    </div>
  )
}

function ScrollParagraph({ text, reducedMotion }) {
  const paragraphRef = useRef(null)
  const visible = useInView(paragraphRef, { amount: 0.3, once: true })
  const stagger = Math.min(0.006, 1.6 / Math.max(1, Array.from(text).length))

  if (reducedMotion) return <p className={styles.paragraph}>{text}</p>

  return (
    <motion.p ref={paragraphRef} className={styles.paragraph}
      initial="hidden" animate={visible ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: 0.06 } } }}>
      <span className={styles.screenReaderText}>{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => /^\s+$/.test(word) ? word : (
          <span key={wordIndex} className={styles.revealWord}>
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span key={letterIndex} className={styles.revealLetter}
                variants={{ hidden: { opacity: 0.08, y: 4 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease }}>{letter}</motion.span>
            ))}
          </span>
        ))}
      </span>
    </motion.p>
  )
}

export default function ProjectAbout({ project }) {
  const reducedMotion = useHydratedReducedMotion()
  const [galleryDetailImage, galleryOverviewImage] = getAboutImages(project.images)
  const overviewImage = project.focusImage || (project.slug === "food-delivery-web-app"
    ? { url: "/mockups/Indus&Olive/laptop-Mockup.png", alt: "Indus & Olive restaurant website in a laptop mockup" }
    : galleryOverviewImage)
  const hasTimeCenterLogo = project.slug === "time-center-modern-watch-retail-website"
  const detailImage = hasTimeCenterLogo
    ? { url: "/clients-logo/timecenter..png", alt: "Time Center — Clocks & Watches logo" }
    : project.logo || galleryDetailImage
  const name = (project.title || "Project").split(/\s+[–—-]\s+/)[0]
  const paragraphs = (project.focusDescription || project.description || "").trim().split(/\n\s*\n/).filter(Boolean)
  const mobile = project.category === "mobile-app-development"
  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.85, ease },
  }

  return (
    <section className={styles.section} aria-labelledby="project-about-heading">
      <div className={styles.inner}>
        <motion.div {...reveal} className={styles.sectionBar}>
          <span className={styles.eyebrow}>Inside the project</span>
          <span className={styles.sectionNote}>The thinking behind the build</span>
        </motion.div>
        <div className={styles.layout}>
          <div className={styles.headingBlock}>
            <motion.h2 id="project-about-heading" aria-label="About the project" className={styles.heading}
              initial={reducedMotion ? false : "hidden"} whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}>
              {["About", "the project."].map((line, index) => (
                <span key={line} className={styles.headingMask}>
                  <motion.span className={index ? styles.mutedHeading : undefined}
                    variants={{ hidden: { y: "105%" }, visible: { y: 0 } }}
                    transition={{ duration: reducedMotion ? 0 : 0.95, delay: reducedMotion ? 0 : index * 0.12, ease }}>{line}</motion.span>
                </span>
              ))}
            </motion.h2>
            <motion.p {...reveal} className={styles.projectName}>{name}</motion.p>
          </div>

          {detailImage && (
            <div className={styles.detailVisual}>
              <ProjectImage image={detailImage} name={name} small mobile={mobile} logo={hasTimeCenterLogo || !!project.logo} reducedMotion={reducedMotion} />
            </div>
          )}

          {overviewImage && (
            <div className={styles.overviewVisual}>
              <ProjectImage image={overviewImage} name={name} mobile={mobile} reducedMotion={reducedMotion} />
            </div>
          )}

          <div className={styles.copy}>
            <motion.p {...reveal} className={styles.copyLabel}>The project, in focus</motion.p>
            {(paragraphs.length ? paragraphs : [`Explore ${name} through the project previews and details below.`]).map((paragraph, index) => (
              <ScrollParagraph key={`${project.slug || name}-${index}`} text={paragraph} reducedMotion={reducedMotion} />
            ))}
            {!!project.skills?.length && (
              <motion.div {...reveal} className={styles.tools}>
                <span>Built with</span>
                <p>{project.skills.slice(0, 5).join(" / ")}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
