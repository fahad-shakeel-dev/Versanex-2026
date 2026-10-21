// "use client"

// import { useEffect, useRef } from "react"
// import Image from "next/image"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger)
// }

// export default function ServiceAboutSection({
//   tagline = "ABOUT SERVICE",
//   aboutText = "A great website is not just a page on the internet — it is your brand's first impression, your best salesperson, and your most scalable asset working around the clock.",
//   images,
// }) {
//   const containerRef = useRef(null)
//   const wordsRef = useRef([])

//   const galleryImages = images || [
//     "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
//   ]

//   const words = aboutText.split(" ")

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       if (wordsRef.current.length > 0) {
//         gsap.to(wordsRef.current, {
//           color: "#0f1420",
//           stagger: 0.1,
//           ease: "power1.inOut",
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: "top 75%",
//             end: "bottom 45%",
//             scrub: 0.5,
//           },
//         })
//       }
//     }, containerRef)

//     return () => ctx.revert()
//   }, [aboutText])

//   return (
//     <section
//       ref={containerRef}
//       className="bg-[#F4F4F4] py-20 sm:py-28 text-[#0f1420] overflow-hidden select-none"
//     >
//       <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-24">

//           {/* Left Column: Subtle Section Tag */}
//           <div className="lg:col-span-3 flex items-center gap-2 pt-2">
//             <span className="w-2 h-2 rounded-full bg-[#0f1420]" />
//             <span className="text-xs sm:text-[13px] font-bold tracking-wider uppercase text-[#0f1420]">
//               {tagline}
//             </span>
//           </div>

//           {/* Right Column: Scroll-Triggered Word Color Reveal */}
//           <div className="lg:col-span-9">
//             <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium leading-[1.3] tracking-tight">
//               {words.map((word, index) => (
//                 <span
//                   key={index}
//                   ref={(el) => {
//                     if (el) wordsRef.current[index] = el
//                   }}
//                   className="text-[#d1d5db] transition-colors inline-block mr-[0.28em]"
//                 >
//                   {word}
//                 </span>
//               ))}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Infinite Horizontal Image Carousel (Pauses on Hover) */}
//       <div className="relative w-full overflow-hidden group">
//         <div className="flex w-max gap-5 sm:gap-6 animate-marquee group-hover:[animation-play-state:paused]">
//           {[...galleryImages, ...galleryImages].map((imgUrl, i) => (
//             <div
//               key={i}
//               className="relative w-[280px] h-[200px] sm:w-[380px] sm:h-[260px] lg:w-[440px] lg:h-[290px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-200 border border-neutral-300/50 shadow-xs"
//             >
//               <Image
//                 src={imgUrl}
//                 alt={`Service gallery preview ${i}`}
//                 fill
//                 sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 440px"
//                 className="object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Keyframe Marquee Definition */}
//       <style jsx global>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-marquee {
//           animation: marquee 35s linear infinite;
//         }
//       `}</style>
//     </section>
//   )
// }











"use client"

import { useEffect, useRef, useState } from "react"
import Image from "@/components/optimized-image"

export default function AboutServiceSection({ text, images }) {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const defaultText =
    "A great website is not just a page on the internet — it is your brand's first impression, your best salesperson, and your most scalable asset working around the clock."

  const paragraphText = text || defaultText
  const words = paragraphText.split(" ")

  const defaultImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
      alt: "Desert landscape",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
      alt: "Sunlit tree forest",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=800&auto=format&fit=crop",
      alt: "Mountain valley",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      alt: "Ocean beach aerial",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop",
      alt: "Sand dunes",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      alt: "Lake mountain reflection",
    },
  ]

  const galleryImages = images || defaultImages
  // Duplicated array for seamless infinite auto-scroll loop
  const marqueeImages = [...galleryImages, ...galleryImages]

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Start text transition when top of section reaches 85% down the viewport
      // Complete 100% black text right when section gets near top (10% from top)
      const startPoint = windowHeight * 0.85
      const endPoint = windowHeight * 0.10

      const currentPos = startPoint - rect.top
      const totalDistance = startPoint - endPoint

      const rawProgress = currentPos / totalDistance
      const clampedProgress = Math.max(0, Math.min(1, rawProgress))

      setScrollProgress(clampedProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="bg-[#f4f4f5] py-20 sm:py-28 text-[#0f1420] select-none font-sans overflow-hidden"
    >
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-12">

        {/* Top Split Layout: Left Badge + Right Word Reveal Paragraph */}
        <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-16 sm:mb-20">

          {/* LEFT BADGE */}
          <div className="w-full lg:w-[25%] shrink-0 pt-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0f1420]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#0f1420] uppercase">
                ABOUT SERVICE
              </span>
            </div>
          </div>

          {/* RIGHT SCROLL REVEAL PARAGRAPH */}
          <div className="w-full lg:w-[75%] max-w-3xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-normal tracking-tight leading-[1.3] flex flex-wrap gap-x-[0.28em] gap-y-1">
              {words.map((word, index) => {
                const wordThreshold = (index + 1) / words.length
                const isBlack = scrollProgress >= wordThreshold

                return (
                  <span
                    key={index}
                    className={`transition-colors duration-200 ease-out ${isBlack
                        ? "text-[#000000]"
                        : "text-[#d1d5db]"
                      }`}
                  >
                    {word}
                  </span>
                )
              })}
            </h2>
          </div>

        </div>

      </div>

      {/* Infinite Auto Scroll Image Carousel */}
      <div className="w-full relative group">

        {/* Subtle Fade Edge Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#f4f4f5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#f4f4f5] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused] gap-4 sm:gap-5">
          {marqueeImages.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-[180px] sm:w-[220px] lg:w-[250px] h-[180px] sm:h-[220px] lg:h-[250px] rounded-2xl overflow-hidden bg-[#e4e4e7] shrink-0 border border-black/5"
            >
              <Image
                src={item.src}
                alt={item.alt || ""}
                fill
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 250px"
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

      </div>

      {/* CSS Keyframes for Infinite Smooth Marquee */}
      <style jsx global>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infiniteScroll 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
