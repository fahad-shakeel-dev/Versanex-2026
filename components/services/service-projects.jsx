"use client"

import { useRef, useState, useEffect } from "react"
import Image from "@/components/optimized-image"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

export default function WorksSection({ projects }) {
  const scrollContainerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftPos, setScrollLeftPos] = useState(0)

  const defaultProjects = [
    {
      id: 1,
      title: "Exo Pay App",
      year: "2026",
      tags: ["Web Design", "MERN Stack"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Planet9 UI/UX",
      year: "2025",
      tags: ["UX/UI", "Next.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Frado SaaS Platform",
      year: "2025",
      tags: ["Mobile App", "React Native"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Apex Crypto Wallet",
      year: "2024",
      tags: ["Fintech", "Web3"],
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Nova Dashboard",
      year: "2024",
      tags: ["Design System", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    },
  ]

  const projectList = projects || defaultProjects

  // Update progress bar indicator on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    const totalScrollable = scrollWidth - clientWidth
    if (totalScrollable > 0) {
      const progress = (scrollLeft / totalScrollable) * 100
      setScrollProgress(progress)
    }
  }

  // Arrow Navigation Controls
  const scroll = (direction) => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  // Mouse Drag to Scroll Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeftPos(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollContainerRef.current.scrollLeft = scrollLeftPos - walk
  }

  useEffect(() => {
    handleScroll()
  }, [])

  return (
    <section className="bg-[#f4f4f5] py-16 sm:py-24 text-[#0f1420] overflow-hidden select-none">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        
        {/* Section Title */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-medium tracking-tight text-[#0f1420]">
            Works
          </h2>
        </div>

        {/* Horizontal Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 sm:gap-8 overflow-x-auto scrollbar-none pb-4 cursor-grab ${
            isDragging ? "cursor-grabbing select-none" : ""
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projectList.map((project) => (
            <div
              key={project.id}
              className="flex-none w-[320px] sm:w-[480px] lg:w-[580px] group flex flex-col gap-4"
            >
              {/* Image Preview Container */}
              <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[350px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#e4e4e7] border border-black/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, 580px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Title & Metadata Row */}
              <div className="flex items-center justify-between gap-2 px-1">
                {/* Title and Year */}
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#0f1420]">
                    {project.title}
                  </h3>
                  <span className="text-lg sm:text-xl font-medium text-[#a1a1aa]">
                    — {project.year}
                  </span>
                </div>

                {/* Tech Tags */}
                <div className="flex items-center gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs sm:text-[13px] text-[#52525b] bg-white/80 backdrop-blur-sm border border-black/5 px-3 py-1 rounded-full font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Horizontal Progress Track & Arrow Navigation Controls */}
        <div className="mt-8 flex items-center justify-between pt-2">
          
          {/* Progress Bar Track */}
          <div className="relative w-36 sm:w-48 h-[3px] bg-[#d4d4d8] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#0f1420] transition-all duration-150 ease-out"
              style={{
                width: `${Math.max(15, Math.min(100, scrollProgress))}%`,
              }}
            />
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="p-2 sm:p-2.5 rounded-full border border-black/10 text-[#0f1420] hover:bg-black/5 active:scale-95 transition-all"
            >
              <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="p-2 sm:p-2.5 rounded-full border border-black/10 text-[#0f1420] hover:bg-black/5 active:scale-95 transition-all"
            >
              <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}