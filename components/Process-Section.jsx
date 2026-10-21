'use client'
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

// ==========================================
// MOBILE PROCESS STEPS
// ==========================================
const flowSteps = [
  {
    id: "01",
    title: "DISCOVER",
    description: "We understand your goals, your users, and the challenges your digital product needs to solve.",
    progress: "25%",
  },
  {
    id: "02",
    title: "DESIGN",
    description: "We map the user journey and design intuitive interfaces that bring your vision to life.",
    progress: "50%",
  },
  {
    id: "03",
    title: "BUILD",
    description: "We develop and test your website, app, or software with performance and scalability in mind.",
    progress: "75%",
  },
  {
    id: "04",
    title: "LAUNCH",
    description: "We deploy your product, guide your team, and support you as your business grows.",
    progress: "100%",
  },
]

// ==========================================
// DESKTOP CONFIGURATION (Wave UI)
// ==========================================
const STEPS = [
  {
    num: "1",
    title: "DISCOVER",
    desc: "We understand your goals, your users, and the challenges your digital product needs to solve.",
    left: 15.8333,
    top: 80,
    capTop: 28, // Above the curve
    capTranslateX: "-50%", // Centered
    threshold: 0.12,
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="6" />
        <line x1="20" y1="20" x2="15.5" y2="15.5" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "DESIGN",
    desc: "We map the user journey and design intuitive interfaces that bring your vision to life.",
    left: 40.8333,
    top: 20,
    capTop: 58, // Below the curve
    capTranslateX: "-50%", // Centered
    threshold: 0.37,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 20l3-1 11-11-2-2L5 17l-1 3z" />
        <path d="M14.5 6.5l3 3" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "BUILD",
    desc: "We develop and test your website, app, or software with performance and scalability in mind.",
    left: 65.8333,
    top: 80,
    capTop: 28, // Above the curve
    capTranslateX: "-50%", // Centered
    threshold: 0.65,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-3-3 2.5-2.5z" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "LAUNCH",
    desc: "We deploy your product, guide your team, and support you as your business grows.",
    left: 90.8333,
    top: 20,
    capTop: 58, // Below the curve
    capTranslateX: "-70%", // Shifted slightly left to stay on screen
    threshold: 0.88,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 19l3-1 9-9a3 3 0 0 0-3-3l-9 9-1 3z" />
        <path d="M15 6l3 3" />
      </svg>
    ),
  },
]

// Extended the line to start from exactly x=0 and end exactly at x=1200
const WAVE_PATH = "M0,300 C 90,300 130,360 190,360 C 300,360 340,90 490,90 C 610,90 680,360 790,360 C 900,360 960,90 1090,90 C 1150,90 1180,70 1200,55"

// ==========================================
// DESKTOP COMPONENT (Wave UI)
// ==========================================
function DesktopWaveProcess() {
  const sectionRef = useRef(null)
  const pathFillRef = useRef(null)
  const pathLenRef = useRef(0)
  const stepThresholdsRef = useRef(STEPS.map((step) => step.threshold))
  const tickingRef = useRef(false)
  const visibleRef = useRef(false)
  const [activeSteps, setActiveSteps] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const pathFill = pathFillRef.current
    if (!section || !pathFill) return

    const setup = () => {
      pathLenRef.current = pathFill.getTotalLength()
      // Match activation to the actual distance along the wave at each point.
      stepThresholdsRef.current = STEPS.map((step) => {
        const targetX = (step.left / 100) * 1200
        let start = 0
        let end = pathLenRef.current
        for (let i = 0; i < 24; i++) {
          const midpoint = (start + end) / 2
          if (pathFill.getPointAtLength(midpoint).x < targetX) start = midpoint
          else end = midpoint
        }
        return ((start + end) / 2) / pathLenRef.current
      })
      pathFill.style.strokeDasharray = pathLenRef.current
      pathFill.style.strokeDashoffset = pathLenRef.current
    }
    setup()

    const update = () => {
      tickingRef.current = false
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const total = section.offsetHeight - vh
      if (total <= 0) return

      let progress = -rect.top / total
      progress = Math.min(1, Math.max(0, progress))

      pathFill.style.strokeDashoffset = pathLenRef.current * (1 - progress)
      
      // The line updates every frame; React only updates when a point changes state.
      setActiveSteps(stepThresholdsRef.current.filter(threshold => progress >= threshold).length)
    }

    const onScroll = () => {
      if (!visibleRef.current) return
      if (!tickingRef.current) {
        tickingRef.current = true
        window.requestAnimationFrame(update)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRef.current = entry.isIntersecting
          if (visibleRef.current) update()
        })
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0 }
    )
    io.observe(section)

    const onResize = () => {
      setup()
      if (visibleRef.current) update()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    update()

    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <>
      <style>{`
        /* Scoped colors match the home page theme */
        #process-wave-v3 { position: relative; height: 400vh; font-family: inherit; color: var(--pw-text); background: var(--pw-bg); --pw-bg: #f8f9fa; --pw-card: #fff; --pw-text: #1b2b40; --pw-muted: #556377; --pw-border: #e2e8f0; --pw-number: #edf0f4; --pw-accent: #f2ad08; }
        .dark #process-wave-v3 { --pw-bg: #090a0c; --pw-card: #0f1115; --pw-text: #f1f5f9; --pw-muted: #94a3b8; --pw-border: #28313e; --pw-number: #202938; }
        #process-wave-v3 .pw-stage { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 2vh 0; }
        
        #process-wave-v3 .pw-card { width: 98vw; max-width: 1800px; height: 96vh; max-height: 900px; background: var(--pw-card); border-radius: 28px; padding: clamp(1rem, 2vh, 2rem) 1.5vw; box-shadow: 0 30px 80px -40px rgba(20,27,38,.12); display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
        
        /* Header typography and button */
        #process-wave-v3 .pw-eyebrow { display: block; width: fit-content; margin: 0 auto 0.8vh; padding: 0.3rem 0.8rem; border: 1px solid var(--pw-border); background: var(--pw-bg); border-radius: 999px; color: var(--pw-text); font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0; }
        #process-wave-v3 h2 { text-align: center; font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 400; letter-spacing: -.02em; margin: 0 0 0.4rem; flex-shrink: 0; }
        #process-wave-v3 .pw-lede { text-align: center; color: var(--pw-muted); font-size: 0.95rem; line-height: 1.5; max-width: 38rem; margin: 0 auto 1.2vh; flex-shrink: 0; }
        
        /* Project contact link */
        #process-wave-v3 .pw-cta { display: block; width: fit-content; margin: 0 auto 1.2vh; padding: 0.6rem 1.4rem; background: #141b26; color: #fff; text-decoration: none; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 20px -6px rgba(242,173,8,0.2); flex-shrink: 0; }
        #process-wave-v3 .pw-cta:hover { background: var(--pw-accent); color: #141b26; transform: translateY(-1px); box-shadow: 0 10px 22px -6px rgba(242,173,8,0.3); }
        
        #process-wave-v3 .pw-cta:focus-visible { outline: 3px solid var(--pw-accent); outline-offset: 4px; }
        #process-wave-v3 .pw-wave { position: relative; width: 100%; flex-grow: 1; min-height: 250px; }
        #process-wave-v3 svg.pw-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; z-index: 1; }
        #process-wave-v3 .pw-idle { fill: none; stroke: var(--pw-border); stroke-width: 3; stroke-linecap: round; }
        #process-wave-v3 .pw-fill { fill: none; stroke: var(--pw-accent); stroke-width: 3; stroke-linecap: round; will-change: stroke-dashoffset; }
        
        #process-wave-v3 .pw-point { position: absolute; transform: translate(-50%, -50%); width: 44px; height: 44px; border-radius: 11px; background: var(--pw-card); border: 1.5px solid var(--pw-border); display: flex; align-items: center; justify-content: center; opacity: .35; box-shadow: 0 10px 22px -12px rgba(20,27,38,.15); transition: opacity .35s ease, border-color .35s ease, background .35s ease, transform .35s ease; z-index: 20; }
        #process-wave-v3 .pw-point svg { width: 19px; height: 19px; stroke: var(--pw-muted); fill: none; stroke-width: 1.8; transition: stroke .35s ease; }
        
        /* Reveal each step when the scrolling line reaches its point. */
        #process-wave-v3 .pw-point.step-active { opacity: 1; border-color: #000; background: #000; transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 10px 25px -10px rgba(0,0,0,.2); }
        #process-wave-v3 .pw-point.step-active svg { stroke: #fff; }
        
        /* Updated caption container */
        #process-wave-v3 .pw-caption { position: absolute; width: 230px; max-width: 38vw; z-index: 10; opacity: .35; filter: grayscale(100%); transition: opacity .5s ease, filter .5s ease; }
        #process-wave-v3 .pw-caption.step-active { opacity: 1; filter: grayscale(0%); }
        
        /* Giant background numbers */
        #process-wave-v3 .pw-caption__num { position: absolute; top: -20px; right: 0; font-size: 6rem; font-weight: 800; color: var(--pw-number); line-height: 1; z-index: 0; transition: color 0.5s ease; user-select: none; }
        #process-wave-v3 .pw-caption.step-active .pw-caption__num { color: var(--pw-number); } 
        
        /* Text content container placed above the number */
        #process-wave-v3 .pw-caption__content { position: relative; z-index: 1; }
        
        #process-wave-v3 .pw-caption h3 { font-size: 1.15rem; font-weight: 700; letter-spacing: .01em; margin: 0 0 .35rem; color: var(--pw-text); transition: color 0.5s ease; }
        #process-wave-v3 .pw-caption.step-active h3 { color: #000; }
        .dark #process-wave-v3 .pw-caption.step-active h3 { color: var(--pw-text); }
        
        #process-wave-v3 .pw-caption p { font-size: .88rem; line-height: 1.5; color: var(--pw-muted); font-weight: 500; margin: 0; transition: color 0.5s ease; }
        #process-wave-v3 .pw-caption.step-active p { color: #000; }
        .dark #process-wave-v3 .pw-caption.step-active p { color: var(--pw-text); }

        /* Scale the desktop presentation without changing the wave or its timing. */
        @media (min-width: 1101px) {
          #process-wave-v3 .pw-card { max-width: 1920px; max-height: 1200px; }
          #process-wave-v3 .pw-eyebrow { font-size: clamp(11.2px, calc(8.2667px + 0.266667vw), 15.2px); }
          #process-wave-v3 h2 { font-size: min(clamp(38.5px, 3.5vw, 80px), 8vh); }
          #process-wave-v3 .pw-lede { max-width: clamp(608px, calc(408.5333px + 18.133333vw), 880px); font-size: min(clamp(15.2px, calc(10.2133px + 0.453333vw), 22px), 3vh); }
          #process-wave-v3 .pw-cta { font-size: clamp(13.6px, calc(10.3733px + 0.293333vw), 18px); padding: clamp(9.6px, calc(6.3733px + 0.293333vw), 14px) clamp(22.4px, calc(15.36px + 0.64vw), 32px); }
          #process-wave-v3 .pw-point { width: clamp(44px, calc(29.3333px + 1.333333vw), 64px); height: clamp(44px, calc(29.3333px + 1.333333vw), 64px); border-radius: clamp(11px, calc(7.3333px + 0.333333vw), 16px); }
          #process-wave-v3 .pw-point svg { width: clamp(19px, calc(12.4px + 0.6vw), 28px); height: clamp(19px, calc(12.4px + 0.6vw), 28px); }
          #process-wave-v3 .pw-caption { width: clamp(230px, calc(149.3333px + 7.333333vw), 340px); max-width: 22%; }
          #process-wave-v3 .pw-caption__num { top: calc(-1 * clamp(20px, calc(12.6667px + 0.666667vw), 30px)); font-size: clamp(96px, calc(60.8px + 3.2vw), 144px); }
          #process-wave-v3 .pw-caption h3 { font-size: clamp(18.4px, calc(11.36px + 0.64vw), 28px); }
          #process-wave-v3 .pw-caption p { font-size: min(clamp(14.08px, calc(9.152px + 0.448vw), 20.8px), 3vh); }
        }
      `}</style>

      <section id="process-wave-v3" aria-labelledby="process-desktop-heading" className="hidden lg:block" ref={sectionRef}>
        <div className="pw-stage">
          <div className="pw-card">
            <span className="pw-eyebrow">How It Works</span>
            <h2 id="process-desktop-heading">From idea to launch, in four steps.</h2>
            <p className="pw-lede">
              A clear, collaborative process to turn your vision into software that works for your business.
            </p>
            <Link href="/contact" className="pw-cta">
              Start a Project <ArrowUpRight className="ml-1 inline-block h-4 w-4" aria-hidden="true" />
            </Link>

            <div className="pw-wave">
              <svg
                className="pw-svg"
                viewBox="0 0 1200 450"
                preserveAspectRatio="none"
              >
                <path className="pw-idle" d={WAVE_PATH} />
                <path
                  className="pw-fill"
                  d={WAVE_PATH}
                  ref={pathFillRef}
                />
              </svg>

              {STEPS.map((step, idx) => {
                const active = idx < activeSteps
                return (
                  <div key={idx}>
                    <div
                      className={`pw-point ${active ? "step-active" : ""}`}
                      style={{ left: `${step.left}%`, top: `${step.top}%` }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className={`pw-caption ${active ? "step-active" : ""}`}
                      style={{
                        left: `${step.left}%`,
                        top: `${step.capTop}%`,
                        transform: `translateX(${step.capTranslateX})`,
                      }}
                    >
                      <span className="pw-caption__num">{step.num}</span>
                      <div className="pw-caption__content">
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ==========================================
// MOBILE COMPONENT (Vertical Stack UI)
// ==========================================
function MobileProcessStep({ step, index }) {
  const cardRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.95", "center 0.65"],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true })

  return (
    <article ref={cardRef} className="flex flex-col min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1115] p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2ad08]/10 text-[#1b2b40] dark:text-[#f2ad08] [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.8]">
          {STEPS[index].icon}
        </div>
        <span className="text-xs font-mono text-[#556377] dark:text-slate-400">{step.id} / 04</span>
      </div>
      <h3 className="text-2xl font-medium tracking-tight mb-3">{step.title}</h3>
      <p className="text-[#556377] dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-7">
        {step.description}
      </p>
      <div className="mt-auto">
        <div className="flex justify-between items-center text-[11px] font-mono mb-3">
          <span className="text-[#556377] dark:text-slate-400 uppercase tracking-wider">Project progress</span>
          <span>{step.progress}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="h-full origin-left rounded-full bg-[#f2ad08]"
            style={{ width: step.progress, scaleX: reduceMotion ? 1 : lineScale }}
          />
        </div>
      </div>
    </article>
  )
}

function MobileProcess() {
  return (
    <section aria-labelledby="process-mobile-heading" className="relative bg-[#F8F9FA] dark:bg-[#090A0C] text-[#1b2b40] dark:text-slate-100 antialiased lg:hidden pb-16 pt-12 sm:pt-16 px-6 sm:px-12">
      <div className="w-full mx-auto mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-[#f2ad08]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#556377] dark:text-slate-400">How It Works</span>
        </div>
        <h2 id="process-mobile-heading" className="text-4xl sm:text-5xl font-normal tracking-tight leading-tight mb-4">
          From idea to launch, in four steps.
        </h2>
        <p className="text-sm sm:text-base text-[#556377] dark:text-slate-400 max-w-lg leading-relaxed">
          A clear, collaborative process to turn your vision into software that works for your business.
        </p>
        <div className="mt-6 flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-3 text-[11px] font-mono tracking-widest text-[#556377] dark:text-slate-400 uppercase">
          <span>Our process</span>
          <span>4 steps</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {flowSteps.map((step, index) => (
          <MobileProcessStep key={step.id} step={step} index={index} />
        ))}
      </div>
      <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#141b26] px-6 py-3 text-sm font-medium text-white hover:bg-[#f2ad08] hover:text-[#141b26] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2ad08]">
        Start a Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  )
}

// ==========================================
// EXPORT
// ==========================================
export default function ProcessSection() {
  return (
    <>
      {/* Mobile process overview */}
      <MobileProcess />
      {/* Desktop scroll-driven process */}
      <DesktopWaveProcess />
    </>
  )
}
