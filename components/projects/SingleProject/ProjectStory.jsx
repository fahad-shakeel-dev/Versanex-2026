"use client"

import { useRef } from "react"
import Image from "@/components/optimized-image"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion"
import { getProjectStory } from "@/data/project-stories"
import styles from "./project-story.module.css"

function ScrollFade({ children, className = "", reducedMotion }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.82, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.16, 0.82, 1], [28, 0, 0, -20])
  return <motion.div ref={ref} className={`${styles.fade} ${className}`} style={{ opacity: reducedMotion ? 1 : opacity, y: reducedMotion ? 0 : y }}>{children}</motion.div>
}

function LetterReveal({ text, className, reducedMotion }) {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: 0.3, once: true })
  const stagger = Math.min(0.008, 1.8 / Math.max(1, Array.from(text).length))

  if (reducedMotion) return <p className={className}>{text}</p>

  return (
    <motion.p ref={ref} className={`${className} ${styles.letterParagraph}`}
      initial="hidden" animate={visible ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } } }}>
      <span className={styles.screenReaderText}>{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => /^\s+$/.test(word) ? word : (
          <span key={wordIndex} className={styles.revealWord}>
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span key={letterIndex} className={styles.revealLetter}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}>{letter}</motion.span>
            ))}
          </span>
        ))}
      </span>
    </motion.p>
  )
}

function StoryLabel({ children, active }) {
  return <p className={styles.label}><span className={styles.dots} aria-hidden="true">{[0, 1, 2].map(index => <i key={index} data-active={index === active} />)}</span>{children}</p>
}

function Screenshot({ image, name, mobile, className, preserveAspect = false }) {
  const deviceScene = image.url.startsWith("/mockups/fixit/") || image.url.startsWith("/mockups/finance-flow/") || image.url.startsWith("/mockups/callmind-ai/") || image.url.startsWith("/mockups/luxurystay/")
  return <figure className={`${className} ${deviceScene ? styles.deviceScene : ""}`}
    style={preserveAspect ? { aspectRatio: `${image.width || 4} / ${image.height || 3}` } : undefined}>
    <Image src={image.url} alt={image.alt || `${name} interface preview`}
      fill sizes="(max-width: 767px) 90vw, 80vw"
      className={mobile ? styles.appImage : styles.image}
      onError={event => { if (!event.currentTarget.src.endsWith("/placeholder.svg")) event.currentTarget.src = "/placeholder.svg" }} />
  </figure>
}

export default function ProjectStory({ project }) {
  const reducedMotion = useHydratedReducedMotion()
  const story = getProjectStory(project)
  const unique = new Map()
  ;(project.images || []).forEach(image => {
    const url = typeof image === "string" ? image : image?.url
    if (typeof url === "string" && url.trim() && !unique.has(url)) unique.set(url, { url, alt: image?.alt, width: image?.width, height: image?.height })
  })
  const images = [...unique.values()]
  const preview = images[3] || images[0]
  const gallerySecondImage = project.slug === "food-delivery-web-app"
    ? { url: "/mockups/Indus&Olive/laptop-Mockup.png", alt: "Indus & Olive restaurant website in a laptop mockup" }
    : images[5] || images[0]
  const galleryThirdImage = project.slug === "food-delivery-web-app"
    ? { url: "/mockups/Indus&Olive/foodie_admin_monitor_mockup.png", alt: "Indus & Olive restaurant admin panel in a monitor mockup" }
    : images[6] || images[2]
  const gallery = (project.galleryImages || [images[4] || images[1], gallerySecondImage, galleryThirdImage]).filter(Boolean)
    .filter((image, index, items) => items.findIndex(item => item.url === image.url) === index)
  const isCallMind = project.slug === "callmind-ai-voice-calling-platform"
  const isIndusOlive = project.slug === "food-delivery-web-app"
  const hasPhoneScenes = project.slug === "fixit-your-ai-powered-home-services-companion" || project.slug === "finance-flow-finance-management-system" || project.slug === "callmind-ai-voice-calling-platform" || project.slug === "luxurystay"
  const closingImage = isIndusOlive
    ? { url: "/mockups/Indus&Olive/all-mockup.png", alt: "Indus & Olive restaurant website across phone, laptop, and tablet mockups" }
    : images[7]
  const mobile = project.category === "mobile-app-development"
  const liveLink = /^https?:\/\//i.test(project.liveLink || "") ? project.liveLink : null
  const galleryId = `project-story-gallery-${project.slug || "preview"}`

  return (
    <>
      <section className={styles.darkSection} aria-labelledby="project-story-heading">
        <div className={styles.inner}>
          <div className={styles.storyGrid}>
            <ScrollFade className={styles.titleBlock} reducedMotion={reducedMotion}>
              <p className={styles.eyebrow}>From idea to experience</p>
              <h2 id="project-story-heading" className={styles.title}>{story.name}</h2>
            </ScrollFade>
            <ScrollFade className={styles.challenge} reducedMotion={reducedMotion}>
              <StoryLabel active={0}>The challenge</StoryLabel>
              <LetterReveal text={story.challenge} className={styles.body} reducedMotion={reducedMotion} />
            </ScrollFade>
            <ScrollFade className={styles.solution} reducedMotion={reducedMotion}>
              <StoryLabel active={1}>Our solution</StoryLabel>
              <LetterReveal text={story.solution} className={styles.solutionText} reducedMotion={reducedMotion} />
            </ScrollFade>
          </div>

          {preview && (
            <ScrollFade className={`${styles.previewWrap} ${isCallMind ? styles.callMindPreview : ""}`} reducedMotion={reducedMotion}>
              <Screenshot image={preview} name={story.name} mobile={mobile} className={styles.preview} preserveAspect={isCallMind} />
              <div className={styles.previewCaption}>
                <div><h3>{story.name}</h3><p>{project.subCategory || (mobile ? "Mobile application" : "Digital experience")}</p></div>
                {liveLink
                  ? <a href={liveLink} target="_blank" rel="noopener noreferrer" className={styles.demo}>View demo <ArrowUpRight size={19} aria-hidden="true" /></a>
                  : !!gallery.length && <a href={`#${galleryId}`} className={styles.demo}>View gallery <ArrowDown size={18} aria-hidden="true" /></a>}
              </div>
            </ScrollFade>
          )}

          <div className={styles.resultsGrid}>
            <ScrollFade className={styles.results} reducedMotion={reducedMotion}>
              <StoryLabel active={2}>{project.status?.toLowerCase() === "completed" ? "The results" : "The experience"}</StoryLabel>
              <LetterReveal text={story.results} className={styles.body} reducedMotion={reducedMotion} />
            </ScrollFade>
          </div>
        </div>
      </section>

      <section id={galleryId} className={styles.lightSection} aria-label="Project gallery and key takeaways">
        <div className={styles.inner}>
          {!!gallery.length && (
            <div className={`${styles.gallery} ${gallery.length < 3 ? styles.shortGallery : ""} ${hasPhoneScenes ? styles.deviceGallery : ""} ${isCallMind ? styles.balancedGallery : ""}`}>
              {gallery.map((image, index) => (
                <ScrollFade key={image.url} className={index === 0 ? styles.galleryMain : styles.galleryDetail} reducedMotion={reducedMotion}>
                  <Screenshot image={image} name={story.name} mobile={mobile} className={styles.galleryImage} />
                </ScrollFade>
              ))}
            </div>
          )}
          <div className={styles.takeaways}>
            <ScrollFade reducedMotion={reducedMotion}><h2 className={styles.takeawayTitle}>Key<br /><span>takeaways.</span></h2></ScrollFade>
            <ScrollFade reducedMotion={reducedMotion}>
              <p className={styles.takeawayText}>{story.results}</p>
              {!!story.features.length && <ol className={styles.featureList}>{story.features.map((feature, index) => <li key={feature}><span>{String(index + 1).padStart(2, "0")}</span>{feature}</li>)}</ol>}
            </ScrollFade>
          </div>
          {closingImage && <ScrollFade reducedMotion={reducedMotion}><Screenshot image={closingImage} name={story.name} mobile={mobile} className={`${styles.closingImage} ${isIndusOlive ? styles.allMockupsImage : ""}`} /></ScrollFade>}
        </div>
      </section>
    </>
  )
}
