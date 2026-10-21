// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { FiCheck, FiArrowUpRight } from "react-icons/fi"

// const bullets = [
//   "Human-centered design meets rock-solid engineering.",
//   "Transparent process, clear communication, predictable delivery.",
//   "Performance, accessibility, SEO — baked in from day one.",
// ]

// export default function About() {
//   return (
//     <section aria-labelledby="about-heading" className="bg-white">


//       {/* ===== MOBILE / TABLET (under lg) — Standard Vertical Stack ===== */}
//       <div className="lg:hidden mx-auto max-w-2xl px-4 sm:px-6 py-14 space-y-12">
//         <div>
//           <span className="text-[#f2ad08] font-semibold text-xs uppercase tracking-widest block mb-2">
//             Who We Are
//           </span>
//           <h2 className="text-3xl font-normal text-neutral-900 tracking-tight leading-tight">
//             Building Digital Experiences That Drive Real Impact
//           </h2>
//         </div>

//         <div className="bg-[#fafaf8] p-6 rounded-2xl border border-gray-200/60">
//           <span className="font-serif italic text-base text-amber-700/80">Chapter I</span>
//           <p className="mt-3 text-xl leading-snug text-gray-900 font-medium">
//             At <strong>VersaNex</strong>, we craft fast, scalable, and beautiful
//             digital products that drive real business results.
//           </p>
//           <p className="mt-4 text-sm text-gray-600 leading-relaxed">
//             From strategy and UX design to full-stack development, our
//             multidisciplinary teams collaborate closely to transform ideas
//             into impactful digital experiences.
//           </p>
//         </div>

//         <div className="rounded-2xl bg-[#121210] p-6 text-white">
//           <span className="font-serif italic text-base text-[#f2ad08]">Chapter II</span>
//           <h3 className="mt-3 text-xl text-white font-medium">How We Work</h3>
//           <ul className="mt-6 space-y-4">
//             {bullets.map((b) => (
//               <li key={b} className="flex items-start gap-3 border-t border-white/15 pt-4">
//                 <FiCheck className="mt-1 flex-shrink-0 text-[#f2ad08]" />
//                 <span className="text-white/90 text-sm leading-relaxed">{b}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex flex-col items-center">
//           <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
//             <Image
//               src="https://res.cloudinary.com/dbbbve4y4/image/upload/w_600,h_450,c_fill,f_auto,q_auto/v1760972371/about-our-studio-culture-and-process_fjhgzg.jpg"
//               alt="Inside the VersaNex studio — our culture and process"
//               width={600}
//               height={450}
//               loading="lazy"
//               className="h-full w-full object-cover"
//             />
//           </div>
//           <Link
//             href="/projects"
//             className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-medium"
//           >
//             See Our Work <FiArrowUpRight className="h-3.5 w-3.5" />
//           </Link>
//         </div>
//       </div>

//     </section>
//   )
// }









"use client"

import { useRef } from "react"
import Image from "@/components/optimized-image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { FiCheck, FiArrowUpRight } from "react-icons/fi"

const bullets = [
  "Human-centered design meets rock-solid engineering.",
  "Transparent process, clear communication, predictable delivery.",
  "Performance, accessibility, SEO — baked in from day one.",
]

const paragraphText =
  "VersaNex is a software development and digital product design company. We exist to bridge the gap between what if and what's live — building custom web apps, mobile apps, and management systems that help businesses across healthcare, e-commerce, startups, and enterprise move faster and grow smarter."

const imgSrc =
  "https://res.cloudinary.com/dbbbve4y4/image/upload/w_800,h_1000,c_fill,f_auto,q_auto/v1760972371/about-our-studio-culture-and-process_fjhgzg.jpg"

// Single word — color interpolates from gray to black as `progress` advances
function AnimatedWord({ word, progress, range }) {
  const color = useTransform(progress, range, ["#c7c7c7", "#0a0a0a"])
  return (
    <motion.span style={{ color }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  )
}

function ScrollRevealText({ text, progress }) {
  const words = text.split(" ")
  return (
    <p className="text-2xl md:text-[1.85rem] leading-snug font-normal max-w-xl text-balance">
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <AnimatedWord key={i} word={word} progress={progress} range={[start, end]} />
      })}
    </p>
  )
}

export default function About() {
  const sectionRef = useRef(null)

  // Progress advances only while this section passes through the
  // middle-ish of the viewport — no pinning, just normal scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.2"],
  })

  return (
    <section ref={sectionRef} aria-labelledby="about-heading" className="bg-white">

      {/* ===== DESKTOP / LAPTOP (lg and up) ===== */}
      <div className="hidden lg:grid mx-auto max-w-7xl px-8 xl:px-12 py-28 grid-cols-2 gap-16 items-center">

        {/* Left — heading + scroll-linked darkening text */}
        <div>
          <span className="inline-flex items-center gap-2 text-[#f2ad08] font-semibold text-xs uppercase tracking-widest mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f2ad08]" />
            Who We Are
          </span>
          <h2 className="text-5xl xl:text-6xl font-normal text-neutral-900 tracking-tight leading-[0.95] mb-8">
            Who We Are
          </h2>
          <ScrollRevealText text={paragraphText} progress={scrollYProgress} />

          <ul className="mt-10 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-neutral-800 text-sm xl:text-base">
                <FiCheck className="mt-1 flex-shrink-0 text-[#f2ad08]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/projects"
            className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            See Our Work <FiArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right — layered image stack with idle "breathing" reveal */}
        <div className="relative w-full max-w-md mx-auto aspect-[4/5]">

          {/* Back image — peeks from top-left, floats gently forever */}
          <motion.div
            className="absolute -top-10 -left-10 w-[82%] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl z-10"
            animate={{ y: [0, -16, 0], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src={imgSrc} alt="" fill className="object-cover" />
          </motion.div>

          {/* Front image — fades in once on scroll, then breathes to reveal the one behind it */}
          <motion.div
            className="absolute bottom-0 right-0 w-[85%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [1, 0.72, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <Image
                src={imgSrc}
                alt="Inside the VersaNex studio — our culture and process"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== MOBILE / TABLET (under lg) — Standard Vertical Stack ===== */}
      <div className="lg:hidden mx-auto max-w-2xl px-4 sm:px-6 py-14 space-y-12">
        <div>
          <span className="text-[#f2ad08] font-semibold text-xs uppercase tracking-widest block mb-2">
            Who We Are
          </span>
          <h2 className="text-3xl font-normal text-neutral-900 tracking-tight leading-tight mb-4">
            Who We Are
          </h2>
          <p className="text-neutral-700 text-base leading-relaxed">{paragraphText}</p>
        </div>

        <div className="rounded-2xl bg-[#121210] p-6 text-white">
          <h3 className="text-xl text-white font-medium mb-6">How We Work</h3>
          <ul className="space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 border-t border-white/15 pt-4">
                <FiCheck className="mt-1 flex-shrink-0 text-[#f2ad08]" />
                <span className="text-white/90 text-sm leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <Image
              src="https://res.cloudinary.com/dbbbve4y4/image/upload/w_600,h_450,c_fill,f_auto,q_auto/v1760972371/about-our-studio-culture-and-process_fjhgzg.jpg"
              alt="Inside the VersaNex studio — our culture and process"
              width={600}
              height={450}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <Link
            href="/projects"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-medium"
          >
            See Our Work <FiArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

    </section>
  )
}