"use client"

import Link from "next/link"
import Image from "@/components/optimized-image"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useReducedMotion } from "framer-motion"
import IntroOverlay from "./intro-overlay"
import ShowcaseVideo from "./ShowcaseVideo"
import desktopStyles from "./desktop-header.module.css"
import aboutStyles from "./desktop-about.module.css"
import { FiArrowUpRight } from "react-icons/fi"

const textContent =
  "At VersaNex, we craft fast, scalable, and beautiful digital products that drive real business results. From strategy and UX design to full-stack development, our multidisciplinary teams collaborate closely to transform ideas into impactful digital experiences that stand out in the modern web landscape."

/* Word-by-Word Scroll Reveal Component — kept for short headings/labels only.
   (Removed from the long paragraph: per-word color interpolation across 40+ words
   was the main cause of the About-section lag — see paragraph below.) */
function ScrollRevealText({
  text,
  progress,
  className = "",
  baseColor = "#a3a3a3",
  targetColor = "#111827"
}) {
  const words = text.split(" ")
  const totalWords = words.length

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] gap-y-1 ${className}`}>
      {words.map((word, index) => {
        const start = index / totalWords
        const end = start + 1 / totalWords

        const opacity = useTransform(progress, [start, end], [0.35, 1])
        const color = useTransform(progress, [start, end], [baseColor, targetColor])

        return (
          <motion.span key={index} style={{ opacity, color }} className="inline-block">
            {word}
          </motion.span>
        )
      })}
    </span>
  )
}

function MobileAboutCards() {
  const reduceMotion = useReducedMotion()
  return (
    <div className="w-full min-w-0 py-10 sm:py-12">
      <motion.div initial={reduceMotion ? "open" : "stacked"} whileInView="open" viewport={{ once: true, amount: 0.35 }} className="relative mx-auto w-[70%] max-w-[420px] aspect-[3/4]">
        {[-1, 1].map((direction, index) => (
          <motion.div key={direction} variants={{ stacked: { x: "0%", y: "0%", rotate: 0, scale: 0.9 }, open: { x: direction === -1 ? "-22%" : "22%", y: "3%", rotate: direction * 4, scale: 0.94 } }} transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(27,43,64,0.10)] border-[5px] border-white bg-white origin-bottom">
            <Image src={direction === -1 ? "/home-about-left-v3.webp" : "/home-about-right-v3.webp"} alt="" fill sizes="(min-width: 1024px) 1px, (min-width: 640px) 420px, 70vw" className="object-cover" />
          </motion.div>
        ))}
        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(27,43,64,0.16)] border-[5px] border-white bg-white">
          <Image src="/home-about-mid-v3.webp" alt="Team collaborating on a digital product in a modern studio" fill sizes="(min-width: 1024px) 1px, (min-width: 640px) 420px, 70vw" className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

function DesktopAboutCards({ progress, mainOpacity, mainScale }) {
  const reduceMotion = useReducedMotion()
  const leftX = useTransform(progress, [0.7, 1], ["0%", "-36%"])
  const rightX = useTransform(progress, [0.74, 1], ["0%", "36%"])
  const leftRotation = useTransform(progress, [0.7, 1], [0, -4])
  const rightRotation = useTransform(progress, [0.74, 1], [0, 4])
  const backY = useTransform(progress, [0.7, 1], ["0%", "4%"])
  const backScale = useTransform(progress, [0.7, 1], [0.9, 0.96])
  const backOpacity = useTransform(progress, [0.7, 0.85], [0, 1])
  return (
    <div className="col-span-6 relative flex items-center justify-center px-4 py-10">
      <div className={`${aboutStyles.cards} relative w-[60%] max-w-[380px] aspect-[3/4] mx-auto isolate`}>
        {[0, 1].map((index) => (
          <motion.div key={index} style={{ x: reduceMotion ? (index === 0 ? "-36%" : "36%") : index === 0 ? leftX : rightX, y: reduceMotion ? "4%" : backY, rotate: reduceMotion ? (index === 0 ? -4 : 4) : index === 0 ? leftRotation : rightRotation, scale: reduceMotion ? 0.96 : backScale, opacity: reduceMotion ? 1 : backOpacity }} className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(27,43,64,0.10)] border-[6px] border-white bg-white origin-bottom">
            <Image src={index === 0 ? "/home-about-left-v3.webp" : "/home-about-right-v3.webp"} alt="" fill sizes="(min-width: 1101px) min(520px, 45vh, 30vw), 30vw" className="object-cover" />
          </motion.div>
        ))}
        <motion.div style={{ opacity: mainOpacity, scale: mainScale }} className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(27,43,64,0.16)] border-[6px] border-white bg-white">
          <Image src="/home-about-mid-v3.webp" alt="Team collaborating on a digital product in a modern studio" fill sizes="(min-width: 1101px) min(520px, 45vh, 30vw), 30vw" className="object-cover" />
        </motion.div>
      </div>
    </div>
  )
}

/* Intro Overlay */
function DesktopHero({ introVisible, isRevealed }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Re-added useSpring for an ultra-smooth, trailing scroll feel.
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 1,
    restDelta: 0.001,
  })

  // --- REVISED TIMELINE MAP (Slowed down the final zoom) ---
  // 0.00 - 0.15 : Hero Video scale to 100vh
  // 0.15 - 0.25 : Hero Video briefly holds, then begins slide
  // 0.25 - 0.45 : Track slides to About section & completes reveals
  // 0.45 - 0.55 : About section stays fully visible for reading
  // 0.55 - 0.70 : Track slides to "THE PROJECTS" text
  // 0.70 - 1.00 : Projects center video fades/scales up (Slower zoom)

  // 1. Hero Video Scale & Headline Fade
  const videoHeight = useTransform(progress, [0, 0.15], ["32vh", "100vh"])
  const videoWidth = useTransform(progress, [0, 0.15], ["calc(100% - 20px)", "100%"])
  const videoRadius = useTransform(progress, [0, 0.15], [24, 0])
  const textOpacity = useTransform(progress, [0, 0.10], [1, 0])

  // 2. Track Translation Across 3 Panels
  const x = useTransform(
    progress,
    [0.25, 0.45, 0.55, 0.70],
    ["0vw", "-100vw", "-100vw", "-200vw"]
  )

  // 3. About Section Animation
  const aboutProgress = useTransform(progress, [0.25, 0.45], [0, 1])

  const mainImageOpacity = useTransform(aboutProgress, [0.7, 0.85], [0, 1])
  const mainImageScale = useTransform(aboutProgress, [0.7, 1], [0.92, 1])

  const paragraphOpacity = useTransform(aboutProgress, [0.15, 0.55], [0, 1])
  const paragraphColor = useTransform(aboutProgress, [0.15, 0.55], ["#a3a3a3", "#111827"])

  // 4. Projects Panel — Slower, smoother zoom (0.70 to 1.0)
  const projectsProgress = useTransform(progress, [0.70, 1], [0, 1])
  const projectVideoOpacity = useTransform(projectsProgress, [0, 0.1], [0, 1])
  const projectVideoScale = useTransform(projectsProgress, [0, 1], [0.05, 1])
  const projectRadius = useTransform(projectsProgress, [0, 0.85], [999, 0])
  const theWordX = useTransform(projectsProgress, [0, 1], ["0vw", "-60vw"])
  const projectsWordX = useTransform(projectsProgress, [0, 1], ["0vw", "60vw"])

  return (
<section ref={containerRef} id="hero" className="hidden lg:block relative h-[350vh] bg-[#f5f5f5]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">


          {/* Top Headline Overlay */}
          <motion.div
            style={{ opacity: textOpacity }}
            initial={false}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${desktopStyles.frame} ${desktopStyles.heroHeading} absolute inset-x-0 top-0 z-20 mx-auto max-w-7xl px-6 lg:px-12 w-full pt-16 md:pt-20 pointer-events-none`}
          >
            <div className={`${desktopStyles.heroGrid} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end`}>
              <div className="lg:col-span-7 pointer-events-auto">
                <h1 className={`${desktopStyles.heroTitle} text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] font-normal tracking-[-0.03em] text-[#000000] leading-[0.9] text-balance`}>
                  Software<br className="hidden sm:block" />
                  Development<br className="hidden sm:block" />
                  &amp; Digital Product<br className="hidden sm:block" />
                  Design Company.
                </h1>
              </div>

              <div className={`${desktopStyles.heroAside} lg:col-span-5 flex flex-col justify-end space-y-6 lg:pb-2 pointer-events-auto`}>
                <p className={`${desktopStyles.heroCopy} text-base sm:text-[17px] text-[#556377] font-normal leading-[1.65] max-w-md tracking-tight`}>
                  You bring the &quot;what if.&quot; We bring the code, the systems, and the launch.
                </p>

                <div className={`${desktopStyles.heroActions} flex flex-wrap items-center gap-3 pt-1`}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-normal text-white bg-black hover:bg-[#f2ad08] hover:text-[#141b26] transition-all duration-300 shadow-sm group"
                  >
                    Start a Project
                    <FiArrowUpRight className="h-4 w-4 stroke-[2]" />
                  </Link>

                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300/80 bg-[#f8f8f8] hover:bg-white px-6 py-3.5 text-[15px] font-normal text-[#111111] transition-all duration-300"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Horizontal Track */}
          <motion.div
            style={{ x }}
            className="flex h-full w-[300vw] will-change-transform"
          >
            {/* PANEL 0 — Hero Video */}
            <div className="w-screen h-full relative flex items-end justify-center overflow-hidden shrink-0">
              <motion.div
                initial={false}
                animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: videoHeight,
                  width: videoWidth,
                  borderRadius: videoRadius,
                }}
                className="relative z-10 overflow-hidden bg-black shadow-2xl"
              >
                <ShowcaseVideo eager
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* PANEL 1 — Who We Are */}
            <div id="about" className={`${aboutStyles.panel} w-screen h-full flex items-center justify-center bg-[#fafaf8] px-8 md:px-16 xl:px-24 py-12 lg:py-16 overflow-hidden shrink-0`}>
              <div className={`${aboutStyles.layout} mx-auto max-w-7xl w-full grid grid-cols-12 gap-8 lg:gap-12 items-center`}>
                <div className={`${aboutStyles.content} col-span-6 pr-2 lg:pr-6`}>
                  <span className="block mb-2">
                    <ScrollRevealText
                      text="Who We Are"
                      progress={aboutProgress}
                      className={`${aboutStyles.label} text-xs sm:text-sm font-semibold uppercase tracking-widest`}
                      baseColor="#e0b240"
                      targetColor="#f2ad08"
                    />
                  </span>

                  <h2 id="about-heading" className="max-w-2xl text-balance">
                    <ScrollRevealText
                      text="Building Digital Experiences That Drive Real Impact"
                      progress={aboutProgress}
                      className={`${aboutStyles.heading} text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight leading-[1.15] text-neutral-900`}
                      baseColor="#a3a3a3"
                      targetColor="#111827"
                    />
                  </h2>

                  <div className="mt-6 pt-6 border-t border-neutral-200/80">
                    <motion.p
                      style={{ opacity: paragraphOpacity, color: paragraphColor }}
                      className={`${aboutStyles.copy} text-lg lg:text-xl font-normal leading-relaxed`}
                    >
                      {textContent}
                    </motion.p>
                  </div>
                </div>

                <DesktopAboutCards progress={aboutProgress} mainOpacity={mainImageOpacity} mainScale={mainImageScale} />
              </div>
            </div>

            {/* PANEL 2 — THE PROJECTS */}
            <div id="projects" className="w-screen h-full relative flex items-center justify-center bg-[#fafaf8] overflow-hidden shrink-0">

              {/* Text — sized with a viewport-width clamp instead of fixed rem jumps,
                  so it stays properly sized (and never overflows) across laptop,
                  desktop, and large/ultra-wide monitors. Stays on top (z-20) at all
                  times so the video growing behind it can never cover it. */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
                <motion.span
                  style={{ x: theWordX }}
                  className="absolute right-1/2 mr-4 sm:mr-[clamp(1.5rem,2.18vw,3rem)] font-black text-[clamp(2.25rem,6vw,9.75rem)] tracking-tight text-neutral-950 uppercase leading-none whitespace-nowrap select-none"
                >
                  THE
                </motion.span>
                <motion.span
                  style={{ x: projectsWordX }}
                  className="absolute left-1/2 ml-4 sm:ml-[clamp(1.5rem,2.18vw,3rem)] font-black text-[clamp(2.25rem,6vw,9.75rem)] tracking-tight text-neutral-950 uppercase leading-none whitespace-nowrap select-none"
                >
                  PROJECTS
                </motion.span>
              </div>

              {/* Video — invisible at rest (opacity 0), so only the text shows when
                  this panel first arrives. Fades in and grows from a tiny centered
                  pill to fullscreen purely via opacity + scale (GPU-accelerated, no
                  layout recalculation per frame) as the user keeps scrolling. Sits at
                  z-10, behind the text, so it emerges from between the words without
                  ever covering them. */}
              <motion.div
                style={{
                  opacity: projectVideoOpacity,
                  scale: projectVideoScale,
                  borderRadius: projectRadius,
                }}
                className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-black shadow-2xl will-change-transform"
              >
                <ShowcaseVideo enabled={!introVisible}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>

            </div>

          </motion.div>
        </div>
      </section>
  )
}

export default function Hero() {
  const [introVisible, setIntroVisible] = useState(false)
  // Prepare the page while the opaque intro is playing above it.
  const [isRevealed, setIsRevealed] = useState(true)
  // The intro covers the page while the desktop viewport is detected.
  // Mobile visitors never hydrate the desktop scroll scene.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const key = "versanex-home-intro-played"
    try {
      if (window.sessionStorage.getItem(key) === "true") return
      const navigation = window.performance.getEntriesByType("navigation")[0]
      const firstPath = navigation ? new URL(navigation.name, window.location.href).pathname : window.location.pathname
      if (firstPath !== "/") {
        window.sessionStorage.setItem(key, "true")
        return
      }
      window.sessionStorage.setItem(key, "true")
    } catch {
      // Keep the intro available if browser storage is disabled.
    }
    setIntroVisible(true)
  }, [])
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])
  useEffect(() => {
    if (!introVisible) return
    const root = document.documentElement
    const body = document.body
    const previousRootOverflow = root.style.overflow
    const previousBodyOverflow = body.style.overflow
    root.style.overflow = "hidden"
    body.style.overflow = "hidden"
    return () => {
      root.style.overflow = previousRootOverflow
      body.style.overflow = previousBodyOverflow
    }
  }, [introVisible])


  return (
    <>
      <AnimatePresence>
        {introVisible && (
          <IntroOverlay
            onZoomStart={() => setIsRevealed(true)}
            onComplete={() => setIntroVisible(false)}
          />
        )}
      </AnimatePresence>

      {/* ===== DESKTOP / LAPTOP (lg+) ===== */}
      {isDesktop
        ? <DesktopHero introVisible={introVisible} isRevealed={isRevealed} />
        : <div aria-hidden="true" className="hidden lg:block h-[350vh] bg-[#f5f5f5]" />}

      {/* ===== MOBILE / TABLET (under lg) ===== */}
      {isDesktop !== true && <>
      <motion.section
        initial={false}
        animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden relative bg-[#f5f5f5] pt-14 pb-12 px-6 overflow-hidden"
      >
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-[#000000] leading-tight text-balance">
            Software Development &amp; Digital Product Design Company.
          </h1>
          <p className="text-base text-[#556377] font-normal leading-relaxed">
            You bring the &quot;what if.&quot; We bring the code, the systems, and the launch.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-normal text-white bg-black hover:bg-[#f2ad08] hover:text-[#141b26] transition-colors duration-300 shadow-sm"
            >
              Start a Project <FiArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300/80 bg-white px-6 py-3.5 text-sm font-normal text-slate-800"
            >
              View Our Work
            </Link>
          </div>
        </div>

        <div className="mt-10 relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black shadow-xl">
          <ShowcaseVideo eager
            className="w-full h-full object-cover"
          />
        </div>
      </motion.section>


      {/* Mobile / tablet about section follows the hero in the normal page flow. */}
      <section
        id="about-mobile"
        aria-labelledby="about-mobile-heading"
        className="lg:hidden overflow-hidden bg-[#fafaf8] px-6 sm:px-10 py-16 sm:py-20 text-[#1b2b40]"
      >
        <div className="mx-auto max-w-3xl border-t border-slate-200 pt-8 sm:pt-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#f2ad08]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#556377]">About us</span>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="min-w-0 max-w-2xl">
              <h2 id="about-mobile-heading" className="text-[clamp(2.25rem,6vw,3.5rem)] font-normal tracking-tight leading-[1.12] text-balance">
                Building Digital Experiences That Drive Real Impact
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-[1.75] text-[#556377]">
                {textContent}
              </p>
              <Link href="/about" className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#141b26] px-5 py-3.5 text-sm font-medium text-white hover:bg-[#f2ad08] hover:text-[#141b26] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2ad08]">
                Get to Know VersaNex <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <MobileAboutCards />
          </div>
        </div>
      </section>
      </>}
    </>
  )
}
