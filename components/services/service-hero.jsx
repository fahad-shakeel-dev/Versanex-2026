// "use client"

// import { useEffect, useRef } from "react"
// import Image from "next/image"
// import gsap from "gsap"
// import { FaPlus } from "react-icons/fa"

// export default function ServiceHero({ service }) {
//   const rootRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from("[data-hero-title]", { y: 60, opacity: 0, duration: 1, ease: "power3.out" })
//       gsap.from("[data-hero-right]", {
//         y: 40,
//         opacity: 0,
//         duration: 0.9,
//         stagger: 0.12,
//         delay: 0.2,
//         ease: "power3.out",
//       })
//       gsap.from("[data-hero-image]", { y: 60, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" })
//     }, rootRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <section ref={rootRef} className="bg-[#f5f5f5] pt-28 pb-12 sm:pt-32 lg:pt-36">
//       <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
//         {/* Top: title left, details right */}
//         <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
//           {/* Left: service name */}
//           <h1
//             data-hero-title
//             className="max-w-[10ch] text-5xl font-semibold leading-[1.05] tracking-tight text-[#0f1420] sm:text-7xl lg:text-[110px]"
//           >
//             {service.title}
//           </h1>

//           {/* Right: description + points */}
//           <div className="lg:pt-6">
//             <p
//               data-hero-right
//               className="max-w-xl text-lg leading-relaxed text-slate-500 sm:text-xl"
//             >
//               {service.description}
//             </p>

//             <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
//               {service.heroPoints.map((point) => (
//                 <li
//                   key={point}
//                   data-hero-right
//                   className="flex items-center gap-4 text-lg text-[#0f1420]"
//                 >
//                   <FaPlus className="h-4 w-4 shrink-0" style={{ color: "#0f1420" }} />
//                   <span>{point}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Image */}
//         <div
//           data-hero-image
//           className="relative mt-14 h-[260px] w-full overflow-hidden rounded-3xl bg-black sm:h-[380px] lg:mt-20 lg:h-[520px]"
//         >
//           <Image
//             src={service.image || "/placeholder.svg"}
//             alt={service.title}
//             fill
//             priority
//             sizes="(max-width: 1600px) 100vw, 1600px"
//             className="object-cover object-center"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }






"use client"

import { useEffect, useRef } from "react"
import Image from "@/components/optimized-image"
import gsap from "gsap"
import { FaPlus } from "react-icons/fa"

export default function ServiceHero({ service }) {
  const rootRef = useRef(null)

  const heroData = service || {
    title: "Custom Software Development",
    description:
      "We engineer bespoke software solutions — from MVPs to enterprise-grade platforms — built to scale with your business.",
    heroPoints: [
      "MVP Development",
      "Enterprise Systems",
      "API Development",
      "Automation Tools",
      "Cloud-Native Apps",
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Left Title: Smooth vertical fade-in
      gsap.from("[data-hero-title]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // 2. Right Paragraph: Slide in from right + fade in
      gsap.from("[data-hero-desc]", {
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
      })

      // 3. Right List Points: Staggered slide in from right + fade in
      gsap.from("[data-hero-point]", {
        x: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      })

      // 4. Hero Banner Image: Smooth bottom reveal
      gsap.from("[data-hero-image]", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        delay: 0.4,
        ease: "power3.out",
      })
    }, rootRef)

    return () => ctx.revert()
  }, [service])

  return (
    <section
      ref={rootRef}
      className="bg-[#F4F4F4] pt-20 sm:pt-24 pb-16 lg:pb-20 text-[#0f1420] overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        
        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-baseline">
          
          {/* Left Column: Prominent Large Title */}
          <div className="lg:col-span-7">
            <h1
              data-hero-title
              className="text-4xl sm:text-6xl lg:text-[80px] xl:text-[88px] font-medium tracking-tight text-[#0f1420] leading-[1.03] max-w-[14ch]"
            >
              {heroData.title}
            </h1>
          </div>

          {/* Right Column: Lighter Muted Paragraph & Micro-List */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-2">
            
            {/* Lighter Slate Paragraph */}
            <p
              data-hero-desc
              className="text-base sm:text-lg lg:text-[18px] leading-relaxed text-[#717e92] font-normal tracking-wide max-w-lg mb-8 sm:mb-10"
            >
              {heroData.description}
            </p>

            {/* Micro Plus List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {heroData.heroPoints?.map((point) => (
                <li
                  key={point}
                  data-hero-point
                  className="flex items-center gap-3.5 group cursor-default"
                >
                  <FaPlus className="h-3.5 w-3.5 text-[#0f1420] shrink-0 transition-transform duration-300 group-hover:rotate-90" />
                  <span className="text-base sm:text-[16px] font-normal tracking-tight text-[#0f1420]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* Hero Banner Image Container */}
        <div
          data-hero-image
          className="relative mt-12 sm:mt-16 lg:mt-20 h-[300px] sm:h-[420px] lg:h-[540px] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-900 border border-neutral-300/40 shadow-xs"
        >
          <Image
            src={heroData.image}
            alt={heroData.title}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover object-center transform transition-transform duration-700 ease-out hover:scale-102"
          />
        </div>

      </div>
    </section>
  )
}