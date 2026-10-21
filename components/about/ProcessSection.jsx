// "use client"

// import { useEffect, useRef, useState } from "react"
// import Image from "next/image"

// // ==========================================
// // STEP DATA (desktop "road" view)
// // ==========================================
// const STEPS = [
//     {
//         id: "01",
//         title: "DISCOVER",
//         desc: "We learn your business, your buyer, and what the brand and site need to do.",
//         image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
//         fraction: 0.12,
//         y: 130,
//         icon: (
//             <svg viewBox="0 0 24 24">
//                 <circle cx="11" cy="11" r="6" />
//                 <line x1="20" y1="20" x2="15.5" y2="15.5" />
//             </svg>
//         ),
//     },
//     {
//         id: "02",
//         title: "DESIGN",
//         desc: "We shape the brand and the site, testing directions until it is right.",
//         image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop",
//         fraction: 0.37,
//         y: 50,
//         icon: (
//             <svg viewBox="0 0 24 24">
//                 <path d="M4 20l3-1 11-11-2-2L5 17l-1 3z" />
//                 <path d="M14.5 6.5l3 3" />
//             </svg>
//         ),
//     },
//     {
//         id: "03",
//         title: "BUILD",
//         desc: "We build it in Framer, fast and clean, ready for your team to run.",
//         image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
//         fraction: 0.65,
//         y: 130,
//         icon: (
//             <svg viewBox="0 0 24 24">
//                 <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-3-3 2.5-2.5z" />
//             </svg>
//         ),
//     },
//     {
//         id: "04",
//         title: "LAUNCH",
//         desc: "We launch, hand over, and stay on to help it grow.",
//         image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop",
//         fraction: 0.88,
//         y: 50,
//         icon: (
//             <svg viewBox="0 0 24 24">
//                 <path d="M5 19l3-1 9-9a3 3 0 0 0-3-3l-9 9-1 3z" />
//                 <path d="M15 6l3 3" />
//             </svg>
//         ),
//     },
// ]

// // The road is drawn wider than its viewport on purpose — that's what lets
// // the camera pan across it instead of the whole thing being visible at once.
// const ROAD_WIDTH = 1600
// const ROAD_HEIGHT = 180
// const ROAD_PATH =
//     "M-20,90 C60,90 100,130 192,130 C320,130 360,50 592,50 C760,50 800,130 1040,130 C1200,130 1240,50 1408,50 C1480,50 1520,70 1620,70"

// // ==========================================
// // MOBILE (vertical stack — unchanged mechanic, no room for a panning road)
// // ==========================================
// function MobileProcess() {
//     return (
//         <section className="relative bg-[#F5F5F7] text-[#111111] antialiased lg:hidden pb-16 pt-12 sm:pt-16 px-6 sm:px-12">
//             <div className="w-full mx-auto mb-12">
//                 <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
//                     <h2 className="text-6xl sm:text-7xl font-semibold tracking-tighter leading-none text-black">
//                         FLOW
//                     </h2>
//                     <p className="text-sm sm:text-base text-neutral-600 max-w-xs font-normal leading-relaxed sm:pt-1">
//                         How we turn a brief into a brand and a site that performs.
//                     </p>
//                 </div>
//                 <div className="flex justify-between items-center border-t border-neutral-300 pt-2.5 text-[11px] font-mono tracking-widest text-neutral-600 uppercase">
//                     <span>PROCESS: <strong className="font-semibold text-black">4 STEPS</strong></span>
//                     <span>DURATION: <strong className="font-semibold text-black">~1 MONTH</strong></span>
//                 </div>
//             </div>

//             <div className="flex flex-col gap-12">
//                 {STEPS.map((step, index) => (
//                     <div key={step.id} className="flex flex-col">
//                         <div className="w-full h-40 relative rounded-2xl overflow-hidden mb-5 border border-neutral-200">
//                             <Image src={step.image} alt={step.title} fill className="object-cover" />
//                         </div>
//                         <h3 className="text-3xl font-bold tracking-tight text-black mb-3 uppercase">
//                             {step.title}
//                         </h3>
//                         <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mb-6 max-w-sm">
//                             {step.desc}
//                         </p>
//                         <div className="mt-auto">
//                             <span className="text-xs font-mono font-bold text-black block mb-2">
//                                 {Math.round(((index + 1) / STEPS.length) * 100)}%
//                             </span>
//                             <div
//                                 className="h-[3px] bg-black rounded-full"
//                                 style={{ width: `${20 + index * 12}%` }}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )
// }

// // ==========================================
// // DESKTOP (the road / "car" animation)
// // ==========================================
// function DesktopRoadProcess() {
//     const sectionRef = useRef(null)
//     const fillRef = useRef(null)
//     const roadRef = useRef(null)
//     const viewportRef = useRef(null)
//     const pathLenRef = useRef(0)
//     const tickingRef = useRef(false)
//     const visibleRef = useRef(false)
//     const lastIndexRef = useRef(-1)
//     const [activeIndex, setActiveIndex] = useState(-1)

//     useEffect(() => {
//         const section = sectionRef.current
//         const fill = fillRef.current
//         if (!section || !fill) return

//         const pointXs = STEPS.map((s) => s.fraction * ROAD_WIDTH)
//         let viewportWidth = 0

//         const setup = () => {
//             pathLenRef.current = fill.getTotalLength()
//             fill.style.strokeDasharray = pathLenRef.current
//             fill.style.strokeDashoffset = pathLenRef.current
//             viewportWidth = viewportRef.current ? viewportRef.current.clientWidth : 0
//         }
//         setup()

//         const update = () => {
//             tickingRef.current = false
//             const rect = section.getBoundingClientRect()
//             const vh = window.innerHeight
//             const total = section.offsetHeight - vh
//             if (total <= 0) return

//             let progress = -rect.top / total
//             progress = Math.min(1, Math.max(0, progress))

//             // The line draws over the ENTIRE scroll range — this is what
//             // gives the "nothing, then the line arrives" feel at the start.
//             fill.style.strokeDashoffset = pathLenRef.current * (1 - progress)

//             // A point only counts as reached once the drawn line has
//             // actually gotten to it.
//             let idx = -1
//             for (let i = 0; i < STEPS.length; i++) {
//                 if (progress >= STEPS[i].fraction) idx = i
//             }
//             if (idx !== lastIndexRef.current) {
//                 lastIndexRef.current = idx
//                 setActiveIndex(idx)
//             }

//             // Camera: stays put until the first point is reached, then pans
//             // to keep whichever point was just reached centered, smoothly
//             // handing off to the next point's centered position as the line
//             // keeps drawing toward it — the "car driving" part.
//             let camera = 0
//             if (progress >= STEPS[0].fraction) {
//                 let segIdx = STEPS.length - 1
//                 for (let i = 0; i < STEPS.length - 1; i++) {
//                     if (progress >= STEPS[i].fraction && progress < STEPS[i + 1].fraction) {
//                         segIdx = i
//                         break
//                     }
//                 }
//                 const curCenter = Math.max(0, pointXs[segIdx] - viewportWidth / 2)
//                 if (segIdx === STEPS.length - 1) {
//                     camera = curCenter
//                 } else {
//                     const nextCenter = Math.max(0, pointXs[segIdx + 1] - viewportWidth / 2)
//                     const segStart = STEPS[segIdx].fraction
//                     const segEnd = STEPS[segIdx + 1].fraction
//                     const t = Math.min(1, Math.max(0, (progress - segStart) / (segEnd - segStart)))
//                     camera = curCenter + (nextCenter - curCenter) * t
//                 }
//             }
//             const maxCamera = Math.max(0, ROAD_WIDTH - viewportWidth)
//             camera = Math.min(camera, maxCamera)

//             if (roadRef.current) {
//                 roadRef.current.style.transform = `translateX(-${camera}px)`
//             }
//         }

//         const onScroll = () => {
//             if (!visibleRef.current) return
//             if (!tickingRef.current) {
//                 tickingRef.current = true
//                 window.requestAnimationFrame(update)
//             }
//         }

//         const io = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     visibleRef.current = entry.isIntersecting
//                     if (visibleRef.current) update()
//                 })
//             },
//             { rootMargin: "200px 0px 200px 0px", threshold: 0 }
//         )
//         io.observe(section)

//         const onResize = () => {
//             setup()
//             if (visibleRef.current) update()
//         }

//         window.addEventListener("scroll", onScroll, { passive: true })
//         window.addEventListener("resize", onResize)
//         update()

//         return () => {
//             io.disconnect()
//             window.removeEventListener("scroll", onScroll)
//             window.removeEventListener("resize", onResize)
//         }
//     }, [])

//     const active = activeIndex >= 0 ? STEPS[activeIndex] : null

//     return (
//         <>
//             <style>{`
//         #process-road { position: relative; height: 400vh; font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #1c1a17; background-color: #F5F5F7; }
//         #process-road .pr-stage { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 2vh 0; }
//         #process-road .pr-card { width: 98vw; max-width: 1800px; height: 96vh; max-height: 900px; background: #fff; border-radius: 28px; padding: clamp(1rem, 2vh, 2rem) 1.5vw; box-shadow: 0 30px 80px -40px rgba(28,26,23,.35); display: flex; flex-direction: column; justify-content: center; overflow: hidden; }

//         #process-road .pr-eyebrow { display: block; width: fit-content; margin: 0 auto 0.8vh; padding: 0.3rem 0.8rem; border: 1px solid #c1592e; border-radius: 999px; color: #c1592e; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0; }
//         #process-road h1 { text-align: center; font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 600; letter-spacing: -.02em; margin: 0 0 0.4rem; flex-shrink: 0; }
//         #process-road .pr-lede { text-align: center; color: #8a857d; font-size: 0.95rem; line-height: 1.5; max-width: 38rem; margin: 0 auto 1.2vh; flex-shrink: 0; }
//         #process-road .pr-cta { display: block; width: fit-content; margin: 0 auto 2vh; padding: 0.6rem 1.4rem; background: #c1592e; color: #fff; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 20px -6px rgba(193,89,46,0.6); flex-shrink: 0; }
//         #process-road .pr-cta:hover { background: #a84b25; transform: translateY(-1px); box-shadow: 0 10px 22px -6px rgba(193,89,46,0.7); }

//         /* 40 / 60 split: road + copy on the left, image on the right */
//         #process-road .pr-body { flex-grow: 1; display: flex; align-items: center; gap: 4vw; min-height: 0; }
//         #process-road .pr-left { width: 40%; display: flex; flex-direction: column; justify-content: center; gap: 2rem; min-width: 0; }
//         #process-road .pr-right { width: 58%; position: relative; height: 100%; border-radius: 20px; overflow: hidden; background: #ece7de; }

//         #process-road .pr-road-viewport { position: relative; width: 100%; height: 150px; overflow: hidden; }
//         #process-road .pr-road-track { position: relative; height: 150px; will-change: transform; }
//         #process-road .pr-road-svg { position: absolute; top: 0; left: 0; overflow: visible; }
//         #process-road .pr-idle { fill: none; stroke: #ece7de; stroke-width: 3; stroke-linecap: round; }
//         #process-road .pr-fill { fill: none; stroke: #c1592e; stroke-width: 3; stroke-linecap: round; will-change: stroke-dashoffset; }

//         #process-road .pr-point { position: absolute; transform: translate(-50%, -50%) scale(.6); width: 44px; height: 44px; border-radius: 11px; background: #fff; border: 1.5px solid #ece7de; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 22px -12px rgba(28,26,23,.3); opacity: 0; transition: opacity .5s ease, transform .5s cubic-bezier(.34,1.56,.64,1), background .35s ease, border-color .35s ease; }
//         #process-road .pr-point svg { width: 19px; height: 19px; stroke: #8a857d; fill: none; stroke-width: 1.8; transition: stroke .35s ease; }
//         #process-road .pr-point.is-reached { opacity: 1; transform: translate(-50%, -50%) scale(1); }
//         #process-road .pr-point.is-active { border-color: #c1592e; background: #c1592e; transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 10px 25px -10px rgba(193,89,46,.6); }
//         #process-road .pr-point.is-active svg { stroke: #fff; }

//         #process-road .pr-caption-wrap { min-height: 9rem; position: relative; }
//         #process-road .pr-caption { animation: pr-rise .6s cubic-bezier(.22,1,.36,1) both; }
//         #process-road .pr-num { display: block; font-size: 3.25rem; font-weight: 800; color: #e5e7eb; line-height: 1; margin-bottom: .25rem; }
//         #process-road .pr-caption h3 { font-size: 1.4rem; font-weight: 700; letter-spacing: .01em; margin: 0 0 .6rem; color: #111; }
//         #process-road .pr-caption p { font-size: 1rem; line-height: 1.6; color: #666; font-weight: 500; margin: 0; max-width: 28rem; }
//         @keyframes pr-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

//         #process-road .pr-image { position: absolute; inset: 0; opacity: 0; transition: opacity .9s ease; }
//         #process-road .pr-image.is-active { opacity: 1; }
//         #process-road .pr-image img { transition: transform 4s ease-out; }
//         #process-road .pr-image.is-active img { transform: scale(1.06); }
//         #process-road .pr-image::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.4), transparent 45%); pointer-events: none; }
//         #process-road .pr-image-tag { position: absolute; bottom: 20px; left: 20px; z-index: 2; color: #fff; font-size: .75rem; font-family: monospace; display: flex; align-items: center; gap: .5rem; }
//       `}</style>

//             <section id="process-road" className="hidden lg:block" ref={sectionRef}>
//                 <div className="pr-stage">
//                     <div className="pr-card">
//                         <span className="pr-eyebrow">How It Works</span>
//                         <h1>Our simple 4 step process</h1>
//                         <p className="pr-lede">
//                             No complicated process, no surprises. Here is exactly what happens when you work with us.
//                         </p>
//                         <button className="pr-cta">Book Free Visit</button>

//                         <div className="pr-body">
//                             <div className="pr-left">
//                                 <div className="pr-road-viewport" ref={viewportRef}>
//                                     <div className="pr-road-track" ref={roadRef} style={{ width: ROAD_WIDTH }}>
//                                         <svg
//                                             className="pr-road-svg"
//                                             width={ROAD_WIDTH}
//                                             height={ROAD_HEIGHT}
//                                             viewBox={`0 0 ${ROAD_WIDTH} ${ROAD_HEIGHT}`}
//                                         >
//                                             <path className="pr-idle" d={ROAD_PATH} />
//                                             <path className="pr-fill" d={ROAD_PATH} ref={fillRef} />
//                                         </svg>

//                                         {STEPS.map((step, index) => (
//                                             <div
//                                                 key={step.id}
//                                                 className={`pr-point ${index <= activeIndex ? "is-reached" : ""} ${
//                                                     index === activeIndex ? "is-active" : ""
//                                                 }`}
//                                                 style={{ left: step.fraction * ROAD_WIDTH, top: step.y }}
//                                             >
//                                                 {step.icon}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 <div className="pr-caption-wrap">
//                                     {active && (
//                                         <div key={active.id} className="pr-caption">
//                                             <span className="pr-num">{active.id}</span>
//                                             <h3>{active.title}</h3>
//                                             <p>{active.desc}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="pr-right">
//                                 {STEPS.map((step, index) => (
//                                     <div key={step.id} className={`pr-image ${index === activeIndex ? "is-active" : ""}`}>
//                                         <Image
//                                             src={step.image}
//                                             alt={step.title}
//                                             fill
//                                             priority={index === 0}
//                                             className="object-cover object-center"
//                                             sizes="(max-width: 1024px) 100vw, 58vw"
//                                         />
//                                         <span className="pr-image-tag">
//                                             <span>{step.id}</span>
//                                             <span style={{ width: 16, height: 1, background: "rgba(255,255,255,.5)" }} />
//                                             <span>{step.title}</span>
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// // ==========================================
// // EXPORT
// // ==========================================
// export default function ProcessSection() {
//     return (
//         <>
//             <MobileProcess />
//             <DesktopRoadProcess />
//         </>
//     )
// }























// "use client"

// import { useEffect, useRef, useState } from "react"
// import Image from "next/image"

// // ==========================================
// // STEP DATA
// // ==========================================
// const STEPS = [
//     {
//         id: "01",
//         title: "DISCOVER",
//         desc: "We learn your business, your buyer, and what the brand and site need to do.",
//         image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
//         fraction: 0.15,
//         x: 180,
//         y: 80,
//         icon: (
//             <svg viewBox="0 0 24 24">
//                 <circle cx="11" cy="11" r="6" />
//                 <line x1="20" y1="20" x2="15.5" y2="15.5" />
//             </svg>
//         ),
//     },
//     {
//         id: "02",
//         title: "DESIGN",
//         desc: "We shape the brand and the site, testing directions until it is right.",
//         image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop",
//         fraction: 0.40,
//         x: 580,
//         y: 80,
//         icon: (
//             <svg viewBox="0 0 24 24">
//                 <path d="M4 20l3-1 11-11-2-2L5 17l-1 3z" />
//                 <path d="M14.5 6.5l3 3" />
//             </svg>
//         ),
//     },
//     {
//         id: "03",
//         title: "BUILD",
//         desc: "We build it in Framer, fast and clean, ready for your team to run.",
//         image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
//         fraction: 0.65,
//         x: 980,
//         y: 80,
//         icon: (
//             <svg viewBox="0 0 24 24">
//                 <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-3-3 2.5-2.5z" />
//             </svg>
//         ),
//     },
//     {
//         id: "04",
//         title: "LAUNCH",
//         desc: "We launch, hand over, and stay on to help it grow.",
//         image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop",
//         fraction: 0.88,
//         x: 1380,
//         y: 80,
//         icon: (
//             <svg viewBox="0 0 24 24">
//                 <path d="M5 19l3-1 9-9a3 3 0 0 0-3-3l-9 9-1 3z" />
//                 <path d="M15 6l3 3" />
//             </svg>
//         ),
//     },
// ]

// const ROAD_WIDTH = 1600
// const ROAD_HEIGHT = 160
// const ROAD_PATH = "M 0 80 Q 180 80 380 80 T 780 80 T 1180 80 T 1600 80"

// // ==========================================
// // MOBILE VIEW
// // ==========================================
// function MobileProcess() {
//     return (
//         <section className="relative bg-[#F5F5F7] text-[#111111] antialiased lg:hidden pb-16 pt-12 sm:pt-16 px-6 sm:px-12">
//             <div className="w-full mx-auto mb-12">
//                 <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
//                     <h2 className="text-6xl sm:text-7xl font-semibold tracking-tighter leading-none text-black">
//                         FLOW
//                     </h2>
//                     <p className="text-sm sm:text-base text-neutral-600 max-w-xs font-normal leading-relaxed sm:pt-1">
//                         How we turn a brief into a brand and a site that performs.
//                     </p>
//                 </div>
//                 <div className="flex justify-between items-center border-t border-neutral-300 pt-2.5 text-[11px] font-mono tracking-widest text-neutral-600 uppercase">
//                     <span>PROCESS: <strong className="font-semibold text-black">4 STEPS</strong></span>
//                     <span>DURATION: <strong className="font-semibold text-black">~1 MONTH</strong></span>
//                 </div>
//             </div>

//             <div className="flex flex-col gap-12">
//                 {STEPS.map((step, index) => (
//                     <div key={step.id} className="flex flex-col">
//                         <div className="w-full h-40 relative rounded-2xl overflow-hidden mb-5 border border-neutral-200">
//                             <Image src={step.image} alt={step.title} fill className="object-cover" />
//                         </div>
//                         <h3 className="text-3xl font-bold tracking-tight text-black mb-3 uppercase">
//                             {step.title}
//                         </h3>
//                         <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mb-6 max-w-sm">
//                             {step.desc}
//                         </p>
//                         <div className="mt-auto">
//                             <span className="text-xs font-mono font-bold text-black block mb-2">
//                                 {Math.round(((index + 1) / STEPS.length) * 100)}%
//                             </span>
//                             <div
//                                 className="h-[3px] bg-black rounded-full"
//                                 style={{ width: `${20 + index * 26}%` }}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )
// }

// // ==========================================
// // DESKTOP VIEW
// // ==========================================
// function DesktopRoadProcess() {
//     const sectionRef = useRef(null)
//     const fillRef = useRef(null)
//     const roadRef = useRef(null)
//     const viewportRef = useRef(null)
//     const pathLenRef = useRef(0)
//     const tickingRef = useRef(false)
//     const visibleRef = useRef(false)
//     const lastIndexRef = useRef(-1)
//     const [activeIndex, setActiveIndex] = useState(0)

//     useEffect(() => {
//         const section = sectionRef.current
//         const fill = fillRef.current
//         if (!section || !fill) return

//         let viewportWidth = 0

//         const setup = () => {
//             pathLenRef.current = fill.getTotalLength()
//             fill.style.strokeDasharray = pathLenRef.current
//             fill.style.strokeDashoffset = pathLenRef.current
//             viewportWidth = viewportRef.current ? viewportRef.current.clientWidth : 0
//         }
//         setup()

//         const update = () => {
//             tickingRef.current = false
//             const rect = section.getBoundingClientRect()
//             const vh = window.innerHeight
//             const total = section.offsetHeight - vh
//             if (total <= 0) return

//             let progress = -rect.top / total
//             progress = Math.min(1, Math.max(0, progress))

//             fill.style.strokeDashoffset = pathLenRef.current * (1 - progress)

//             // Determine active step safely with scroll buffers so point stays active longer
//             let idx = 0
//             if (progress >= STEPS[3].fraction - 0.05) idx = 3
//             else if (progress >= STEPS[2].fraction - 0.05) idx = 2
//             else if (progress >= STEPS[1].fraction - 0.05) idx = 1
//             else idx = 0

//             if (idx !== lastIndexRef.current) {
//                 lastIndexRef.current = idx
//                 setActiveIndex(idx)
//             }

//             // Keep current point cleanly centered in left viewport
//             const targetX = STEPS[idx].x
//             let camera = targetX - viewportWidth / 2
//             const maxCamera = Math.max(0, ROAD_WIDTH - viewportWidth)
//             camera = Math.min(Math.max(0, camera), maxCamera)

//             if (roadRef.current) {
//                 roadRef.current.style.transform = `translateX(-${camera}px)`
//             }
//         }

//         const onScroll = () => {
//             if (!visibleRef.current) return
//             if (!tickingRef.current) {
//                 tickingRef.current = true
//                 window.requestAnimationFrame(update)
//             }
//         }

//         const io = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     visibleRef.current = entry.isIntersecting
//                     if (visibleRef.current) update()
//                 })
//             },
//             { rootMargin: "200px 0px 200px 0px", threshold: 0 }
//         )
//         io.observe(section)

//         const onResize = () => {
//             setup()
//             if (visibleRef.current) update()
//         }

//         window.addEventListener("scroll", onScroll, { passive: true })
//         window.addEventListener("resize", onResize)
//         update()

//         return () => {
//             io.disconnect()
//             window.removeEventListener("scroll", onScroll)
//             window.removeEventListener("resize", onResize)
//         }
//     }, [])

//     const active = STEPS[activeIndex]

//     return (
//         <>
//             <style>{`
//         #process-road { position: relative; height: 350vh; font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #1c1a17; background-color: #F5F5F7; }
//         #process-road .pr-stage { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 2vh 0; }
//         #process-road .pr-card { width: 96vw; max-width: 1600px; height: 90vh; max-height: 850px; background: #fff; border-radius: 28px; padding: clamp(1.5rem, 3vh, 3rem) 3vw; box-shadow: 0 30px 80px -40px rgba(28,26,23,.15); display: flex; flex-direction: column; overflow: hidden; }

//         /* Top Header */
//         #process-road .pr-header { margin-bottom: 2rem; flex-shrink: 0; }
//         #process-road .pr-title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
//         #process-road .pr-title-row h2 { font-size: clamp(3rem, 5vw, 4.5rem); font-weight: 700; tracking: -0.04em; line-height: 1; color: #000; margin: 0; }
//         #process-road .pr-title-row p { font-size: 0.95rem; color: #666; max-width: 220px; font-weight: 400; line-height: 1.4; margin: 0; }
//         #process-road .pr-meta-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e5e5e5; padding-top: 0.75rem; font-family: monospace; font-size: 0.75rem; color: #666; text-transform: uppercase; letter-spacing: 0.05em; }

//         /* Main Body Split */
//         #process-road .pr-body { flex-grow: 1; display: flex; align-items: center; gap: 4vw; min-height: 0; }
//         #process-road .pr-left { width: 45%; display: flex; flex-direction: column; justify-content: center; gap: 1.5rem; min-width: 0; }
//         #process-road .pr-right { width: 55%; position: relative; height: 100%; border-radius: 20px; overflow: hidden; background: #ece7de; }

//         /* Road & SVG */
//         #process-road .pr-road-viewport { position: relative; width: 100%; height: 120px; overflow: hidden; }
//         #process-road .pr-road-track { position: relative; height: 120px; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); will-change: transform; }
//         #process-road .pr-road-svg { position: absolute; top: 0; left: 0; overflow: visible; }
//         #process-road .pr-idle { fill: none; stroke: #e5e7eb; stroke-width: 4; stroke-linecap: round; }
//         #process-road .pr-fill { fill: none; stroke: #111111; stroke-width: 4; stroke-linecap: round; will-change: stroke-dashoffset; }

//         /* Step Nodes */
//         #process-road .pr-point { position: absolute; transform: translate(-50%, -50%) scale(.8); width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid #e5e7eb; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,.08); transition: all .4s cubic-bezier(.34,1.56,.64,1); }
//         #process-road .pr-point svg { width: 18px; height: 18px; stroke: #8a857d; fill: none; stroke-width: 2; transition: stroke .35s ease; }
//         #process-road .pr-point.is-reached { border-color: #111; }
//         #process-road .pr-point.is-active { border-color: #111; background: #111; transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 8px 20px rgba(0,0,0,.2); }
//         #process-road .pr-point.is-active svg { stroke: #fff; }

//         /* Text Captions */
//         #process-road .pr-caption-wrap { min-height: 8rem; position: relative; }
//         #process-road .pr-caption { animation: pr-rise .5s cubic-bezier(.22,1,.36,1) both; }
//         #process-road .pr-num { display: block; font-size: 2.5rem; font-weight: 800; color: #d1d5db; line-height: 1; margin-bottom: .25rem; font-family: monospace; }
//         #process-road .pr-caption h3 { font-size: 1.5rem; font-weight: 700; letter-spacing: .01em; margin: 0 0 .5rem; color: #111; text-transform: uppercase; }
//         #process-road .pr-caption p { font-size: 0.95rem; line-height: 1.5; color: #666; font-weight: 400; margin: 0; max-width: 28rem; }
//         @keyframes pr-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

//         /* Image Display */
//         #process-road .pr-image { position: absolute; inset: 0; opacity: 0; transition: opacity .7s ease; }
//         #process-road .pr-image.is-active { opacity: 1; }
//         #process-road .pr-image img { transition: transform 3s ease-out; }
//         #process-road .pr-image.is-active img { transform: scale(1.04); }
//         #process-road .pr-image::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.4), transparent 40%); pointer-events: none; }
//         #process-road .pr-image-tag { position: absolute; bottom: 20px; left: 20px; z-index: 2; color: #fff; font-size: .75rem; font-family: monospace; display: flex; align-items: center; gap: .5rem; }
//       `}</style>

//             <section id="process-road" className="hidden lg:block" ref={sectionRef}>
//                 <div className="pr-stage">
//                     <div className="pr-card">

//                         {/* Header matching mobile/overall theme */}
//                         <div className="pr-header">
//                             <div className="pr-title-row">
//                                 <h2>FLOW</h2>
//                                 <p>How we turn a brief into a brand and a site that performs.</p>
//                             </div>
//                             <div className="pr-meta-row">
//                                 <span>PROCESS: <strong className="font-semibold text-black">4 STEPS</strong></span>
//                                 <span>DURATION: <strong className="font-semibold text-black">~1 MONTH</strong></span>
//                             </div>
//                         </div>

//                         {/* Interactive Road Body */}
//                         <div className="pr-body">
//                             <div className="pr-left">
//                                 <div className="pr-road-viewport" ref={viewportRef}>
//                                     <div className="pr-road-track" ref={roadRef} style={{ width: ROAD_WIDTH }}>
//                                         <svg
//                                             className="pr-road-svg"
//                                             width={ROAD_WIDTH}
//                                             height={ROAD_HEIGHT}
//                                             viewBox={`0 0 ${ROAD_WIDTH} ${ROAD_HEIGHT}`}
//                                         >
//                                             <path className="pr-idle" d={ROAD_PATH} />
//                                             <path className="pr-fill" d={ROAD_PATH} ref={fillRef} />
//                                         </svg>

//                                         {STEPS.map((step, index) => (
//                                             <div
//                                                 key={step.id}
//                                                 className={`pr-point ${index <= activeIndex ? "is-reached" : ""} ${
//                                                     index === activeIndex ? "is-active" : ""
//                                                 }`}
//                                                 style={{ left: step.x, top: step.y }}
//                                             >
//                                                 {step.icon}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 <div className="pr-caption-wrap">
//                                     {active && (
//                                         <div key={active.id} className="pr-caption">
//                                             <span className="pr-num">{active.id}</span>
//                                             <h3>{active.title}</h3>
//                                             <p>{active.desc}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="pr-right">
//                                 {STEPS.map((step, index) => (
//                                     <div key={step.id} className={`pr-image ${index === activeIndex ? "is-active" : ""}`}>
//                                         <Image
//                                             src={step.image}
//                                             alt={step.title}
//                                             fill
//                                             priority={index === 0}
//                                             className="object-cover object-center"
//                                             sizes="55vw"
//                                         />
//                                         <span className="pr-image-tag">
//                                             <span>{step.id}</span>
//                                             <span style={{ width: 16, height: 1, background: "rgba(255,255,255,.5)" }} />
//                                             <span>{step.title}</span>
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default function ProcessSection() {
//     return (
//         <>
//             <MobileProcess />
//             <DesktopRoadProcess />
//         </>
//     )
// }


"use client"

import { useEffect, useRef, useState } from "react"
import Image from "@/components/optimized-image"

// ==========================================
// STEP DATA
// ==========================================
const STEPS = [
    {
        id: "01",
        title: "Discover",
        desc: "We learn your business, your buyer, and what the brand and site need to do.",
        image: "/about-flow/discover.webp",
        imageAlt: "Brand strategy notebook, research cards and analytics tablet on a studio desk",
        fraction: 0.12,
        x: 200,
        y: 130,
        icon: (
            <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6" />
                <line x1="20" y1="20" x2="15.5" y2="15.5" />
            </svg>
        ),
    },
    {
        id: "02",
        title: "Design",
        desc: "We shape the brand and the site, testing directions until it is right.",
        image: "/about-flow/design.webp",
        imageAlt: "Website wireframes and polished designs alongside brand identity explorations",
        fraction: 0.38,
        x: 600,
        y: 50,
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M4 20l3-1 11-11-2-2L5 17l-1 3z" />
                <path d="M14.5 6.5l3 3" />
            </svg>
        ),
    },
    {
        id: "03",
        title: "Build",
        desc: "We build it in Framer, fast and clean, ready for your team to run.",
        image: "/about-flow/build.webp",
        imageAlt: "Laptop displaying development code and a website preview with a matching mobile site",
        fraction: 0.64,
        x: 1000,
        y: 130,
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-3-3 2.5-2.5z" />
            </svg>
        ),
    },
    {
        id: "04",
        title: "Launch",
        desc: "We launch, hand over, and stay on to help it grow.",
        image: "/about-flow/launch.webp",
        imageAlt: "Completed website across desktop and mobile with a growth analytics dashboard",
        fraction: 0.88,
        x: 1400,
        y: 50,
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M5 19l3-1 9-9a3 3 0 0 0-3-3l-9 9-1 3z" />
                <path d="M15 6l3 3" />
            </svg>
        ),
    },
]

const ROAD_WIDTH = 1600
const ROAD_HEIGHT = 180
const ROAD_PATH =
    "M-20,90 C60,90 100,130 200,130 C340,130 420,50 600,50 C780,50 860,130 1000,130 C1180,130 1260,50 1400,50 C1480,50 1540,70 1620,70"

const NODE_RADIUS = 22 // Half of 44px circle width

// ==========================================
// MOBILE VIEW
// ==========================================
function MobileProcess() {
    return (
        <section className="relative bg-[#F5F5F7] text-[#1b2b40] antialiased lg:hidden pb-16 pt-12 sm:pt-16 px-6 sm:px-12">
            <div className="w-full mx-auto mb-12">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                    <h2 className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-[#1b2b40]">
                        Flow
                    </h2>
                    <p className="text-sm sm:text-base text-[#556377] max-w-xs font-normal leading-relaxed sm:pt-1">
                        How we turn a brief into a brand and a site that performs.
                    </p>
                </div>
                <div className="flex justify-between items-center border-t border-neutral-300 pt-2.5 text-xs font-mono font-normal tracking-wider text-[#556377] uppercase">
                    <span>PROCESS: <strong className="font-medium text-[#1b2b40]">4 STEPS</strong></span>
                    <span>DURATION: <strong className="font-medium text-[#1b2b40]">~1 MONTH</strong></span>
                </div>
            </div>

            <div className="flex flex-col gap-12">
                {STEPS.map((step, index) => (
                    <div key={step.id} className="flex flex-col">
                        <div className="w-full h-40 relative rounded-2xl overflow-hidden mb-5 border border-neutral-200">
                            <Image src={step.image} alt={step.imageAlt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 90vw" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-normal tracking-tight leading-[1.15] text-[#1b2b40] mb-3">
                            {step.title}
                        </h3>
                        <p className="text-[#556377] text-sm sm:text-base leading-relaxed font-normal mb-6 max-w-sm">
                            {step.desc}
                        </p>
                        <div className="mt-auto">
                            <span className="text-xs font-mono font-medium text-[#1b2b40] block mb-2">
                                {Math.round(((index + 1) / STEPS.length) * 100)}%
                            </span>
                            <div
                                className="h-[3px] bg-black rounded-full"
                                style={{ width: `${20 + index * 26}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ==========================================
// DESKTOP VIEW
// ==========================================
function DesktopRoadProcess() {
    const sectionRef = useRef(null)
    const fillRef = useRef(null)
    const roadRef = useRef(null)
    const viewportRef = useRef(null)
    const pathLenRef = useRef(0)
    const stepTouchLengthsRef = useRef([])
    const tickingRef = useRef(false)
    const visibleRef = useRef(false)
    const lastIndexRef = useRef(-1)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const section = sectionRef.current
        const fill = fillRef.current
        if (!section || !fill) return

        let viewportWidth = 0

        const setup = () => {
            const totalLen = fill.getTotalLength()
            pathLenRef.current = totalLen
            fill.style.strokeDasharray = totalLen
            fill.style.strokeDashoffset = totalLen
            viewportWidth = viewportRef.current ? viewportRef.current.clientWidth : 0

            // Pre-calculate exact distance on line where edge touches each node circle
            stepTouchLengthsRef.current = STEPS.map((step) => {
                let bestLength = 0
                let minDistance = Infinity

                // Binary/linear search along SVG path for closest point to (x, y)
                const samples = 400
                for (let i = 0; i <= samples; i++) {
                    const len = (i / samples) * totalLen
                    const pt = fill.getPointAtLength(len)
                    const dist = Math.hypot(pt.x - step.x, pt.y - step.y)
                    if (dist < minDistance) {
                        minDistance = dist
                        bestLength = len
                    }
                }
                // Subtract node radius so activation happens exactly at circle edge
                return Math.max(0, bestLength - NODE_RADIUS)
            })
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

            // Current length of the drawn line
            const currentDrawnLength = pathLenRef.current * progress
            fill.style.strokeDashoffset = pathLenRef.current - currentDrawnLength

            // Determine active step precisely when drawn length touches circle boundary
            let idx = 0
            const touchLengths = stepTouchLengthsRef.current
            if (touchLengths.length === STEPS.length) {
                for (let i = STEPS.length - 1; i >= 0; i--) {
                    if (currentDrawnLength >= touchLengths[i]) {
                        idx = i
                        break
                    }
                }
            }

            if (idx !== lastIndexRef.current) {
                lastIndexRef.current = idx
                setActiveIndex(idx)
            }

            // Continuous smooth camera panning centered on line progression
            let targetX = STEPS[0].x
            if (progress < STEPS[0].fraction) {
                targetX = STEPS[0].x
            } else if (progress >= STEPS[3].fraction) {
                targetX = STEPS[3].x
            } else {
                for (let i = 0; i < STEPS.length - 1; i++) {
                    if (progress >= STEPS[i].fraction && progress < STEPS[i + 1].fraction) {
                        const t = (progress - STEPS[i].fraction) / (STEPS[i + 1].fraction - STEPS[i].fraction)
                        targetX = STEPS[i].x + (STEPS[i + 1].x - STEPS[i].x) * t
                        break
                    }
                }
            }

            let camera = targetX - viewportWidth / 2
            const maxCamera = Math.max(0, ROAD_WIDTH - viewportWidth)
            camera = Math.min(Math.max(0, camera), maxCamera)

            if (roadRef.current) {
                roadRef.current.style.transform = `translateX(-${camera}px)`
            }
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

    const active = STEPS[activeIndex]

    return (
        <>
            <style>{`
        #process-road { position: relative; height: 380vh; font-family: inherit; color: #1b2b40; background-color: #F5F5F7; }
        #process-road .pr-stage { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 2vh 0; }
        #process-road .pr-card { width: 96vw; max-width: 1600px; height: 90vh; max-height: 850px; background: #fff; border-radius: 28px; padding: clamp(1.5rem, 3vh, 3rem) 3vw; box-shadow: 0 30px 80px -40px rgba(28,26,23,.15); display: flex; flex-direction: column; overflow: hidden; }

        /* Section Header */
        #process-road .pr-header { margin-bottom: 2rem; flex-shrink: 0; width: 100%; }
        #process-road .pr-title-row { display: flex; justify-content: space-between; align-items: center; gap: 2rem; margin-bottom: 1rem; width: 100%; }
        #process-road .pr-title-row h2 { font-size: clamp(2.5rem, 4vw, 3.75rem); font-weight: 400; letter-spacing: -0.03em; line-height: 1.08; color: #1b2b40; margin: 0; flex-shrink: 0; }
        #process-road .pr-title-row p { font-size: 1rem; color: #556377; max-width: 240px; font-weight: 400; line-height: 1.65; margin: 0; text-align: left; }
        #process-road .pr-meta-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e5e5e5; padding-top: 0.75rem; font-family: var(--font-geist-mono); font-size: 0.75rem; font-weight: 400; color: #556377; text-transform: uppercase; letter-spacing: 0.05em; width: 100%; }

        /* Main Body Split */
        #process-road .pr-body { flex-grow: 1; display: flex; align-items: center; gap: 4vw; min-height: 0; }
        #process-road .pr-left { width: 45%; display: flex; flex-direction: column; justify-content: center; gap: 1.5rem; min-width: 0; }
        #process-road .pr-right { width: 55%; position: relative; height: 100%; border-radius: 20px; overflow: hidden; background: #ece7de; }

        /* Road & SVG Viewport */
        #process-road .pr-road-viewport { position: relative; width: 100%; height: 200px; overflow: hidden; padding: 10px 0; }
        #process-road .pr-road-track { position: relative; height: 180px; will-change: transform; }
        #process-road .pr-road-svg { position: absolute; top: 0; left: 0; overflow: visible; }
        #process-road .pr-idle { fill: none; stroke: #e5e7eb; stroke-width: 4; stroke-linecap: round; }
        #process-road .pr-fill { fill: none; stroke: #111111; stroke-width: 4; stroke-linecap: round; will-change: stroke-dashoffset; }

        /* Step Nodes */
        #process-road .pr-point { position: absolute; transform: translate(-50%, -50%) scale(.8); width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid #e5e7eb; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,.08); transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        #process-road .pr-point svg { width: 18px; height: 18px; stroke: #8a857d; fill: none; stroke-width: 2; transition: stroke .25s ease; }
        #process-road .pr-point.is-reached { border-color: #111; }
        #process-road .pr-point.is-active { border-color: #111; background: #111; transform: translate(-50%, -50%) scale(1.18); box-shadow: 0 10px 25px -3px rgba(0,0,0,.3); z-index: 10; }
        #process-road .pr-point.is-active svg { stroke: #fff; }

        /* Text Captions */
        #process-road .pr-caption-wrap { min-height: 8rem; position: relative; }
        #process-road .pr-caption { animation: pr-rise .4s cubic-bezier(.22,1,.36,1) both; }
        #process-road .pr-num { display: block; font-size: 2rem; font-weight: 400; color: #556377; line-height: 1; margin-bottom: .25rem; font-family: var(--font-geist-mono); }
        #process-road .pr-caption h3 { font-size: clamp(1.5rem, 2vw, 2rem); font-weight: 400; letter-spacing: -.02em; line-height: 1.15; margin: 0 0 .75rem; color: #1b2b40; }
        #process-road .pr-caption p { font-size: 1rem; line-height: 1.65; color: #556377; font-weight: 400; margin: 0; max-width: 28rem; }
        @keyframes pr-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        /* Image Display */
        #process-road .pr-image { position: absolute; inset: 0; opacity: 0; transition: opacity .6s ease; }
        #process-road .pr-image.is-active { opacity: 1; }
        #process-road .pr-image img { transition: transform 3s ease-out; }
        #process-road .pr-image.is-active img { transform: scale(1.04); }
        #process-road .pr-image::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.4), transparent 40%); pointer-events: none; }
        #process-road .pr-image-tag { position: absolute; bottom: 20px; left: 20px; z-index: 2; color: #fff; font-size: .75rem; font-family: var(--font-geist-mono); display: flex; align-items: center; gap: .5rem; }
      `}</style>

            <section id="process-road" className="hidden lg:block" ref={sectionRef}>
                <div className="pr-stage">
                    <div className="pr-card">

                        {/* Section Header */}
                        <div className="pr-header">
                            <div className="pr-title-row">
                                <h2>Flow</h2>
                                <p>How we turn a brief into a brand and a site that performs.</p>
                            </div>
                            <div className="pr-meta-row">
                                <span>PROCESS: <strong className="font-medium text-[#1b2b40]">4 STEPS</strong></span>
                                <span>DURATION: <strong className="font-medium text-[#1b2b40]">~1 MONTH</strong></span>
                            </div>
                        </div>

                        {/* Interactive Road Body */}
                        <div className="pr-body">
                            <div className="pr-left">
                                <div className="pr-road-viewport" ref={viewportRef}>
                                    <div className="pr-road-track" ref={roadRef} style={{ width: ROAD_WIDTH }}>
                                        <svg
                                            className="pr-road-svg"
                                            width={ROAD_WIDTH}
                                            height={ROAD_HEIGHT}
                                            viewBox={`0 0 ${ROAD_WIDTH} ${ROAD_HEIGHT}`}
                                        >
                                            <path className="pr-idle" d={ROAD_PATH} />
                                            <path className="pr-fill" d={ROAD_PATH} ref={fillRef} />
                                        </svg>

                                        {STEPS.map((step, index) => (
                                            <div
                                                key={step.id}
                                                className={`pr-point ${index <= activeIndex ? "is-reached" : ""} ${index === activeIndex ? "is-active" : ""
                                                    }`}
                                                style={{ left: step.x, top: step.y }}
                                            >
                                                {step.icon}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pr-caption-wrap">
                                    {active && (
                                        <div key={active.id} className="pr-caption">
                                            <span className="pr-num">{active.id}</span>
                                            <h3>{active.title}</h3>
                                            <p>{active.desc}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pr-right">
                                {STEPS.map((step, index) => (
                                    <div key={step.id} className={`pr-image ${index === activeIndex ? "is-active" : ""}`}>
                                        <Image
                                            src={step.image}
                                            alt={step.imageAlt}
                                            fill
                                            priority={index === 0}
                                            className="object-cover object-center"
                                            sizes="55vw"
                                        />
                                        <span className="pr-image-tag">
                                            <span>{step.id}</span>
                                            <span style={{ width: 16, height: 1, background: "rgba(255,255,255,.5)" }} />
                                            <span>{step.title}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default function ProcessSection() {
    return (
        <>
            <MobileProcess />
            <DesktopRoadProcess />
        </>
    )
}
