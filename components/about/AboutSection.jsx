"use client"

import { useEffect, useRef, useState } from "react"

// ==========================================
// SECTION DATA
// ==========================================
const SECTIONS = [
    {
        id: "team",
        title: "About - Team",
        subtitle: "Multidisciplinary built for results.",
        text: "VersaNex is powered by a team of 12 specialists spanning design, strategy, and analytics, collaborating closely to create measurable, performance-driven digital experiences.",
    },
    {
        id: "clients",
        title: "About - Clients",
        subtitle: "Trusted by ambitious brands.",
        text: "We work with startups, scale-ups, and established companies across technology, e-commerce and digital products, building long-term partnerships focused on measurable results.",
    },
]

// ==========================================
// SINGLE WORD COMPONENT WITH SCROLL HIGHLIGHT
// ==========================================
function ScrollWord({ word, index, totalWords, progress }) {
    const wordStep = 1 / totalWords
    const start = index * wordStep
    const end = (index + 1) * wordStep

    let opacityWeight = 0
    if (progress >= end) {
        opacityWeight = 1
    } else if (progress > start) {
        opacityWeight = (progress - start) / wordStep
    }

    return (
        <span
            className="inline-block transition-colors duration-100 ease-linear mr-[0.25em] last:mr-0 select-none"
            style={{
                color: opacityWeight === 1 
                    ? "#111111" 
                    : `rgba(195, 195, 195, ${0.4 + opacityWeight * 0.6})`,
            }}
        >
            {word}
        </span>
    )
}

// ==========================================
// SINGLE ABOUT ITEM COMPONENT
// ==========================================
function AboutBlock({ item }) {
    const containerRef = useRef(null)
    const [scrollProgress, setScrollProgress] = useState(0)
    const words = item.text.split(" ")

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight

            // Starts animating when text is at 92% of viewport height
            const startPoint = windowHeight * 0.92
            // Completes dark highlight at 45% (mid-screen)
            const endPoint = windowHeight * 0.45

            const totalDist = startPoint - endPoint
            const currentDist = startPoint - rect.top

            let progress = currentDist / totalDist
            progress = Math.min(1, Math.max(0, progress))

            setScrollProgress(progress)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative py-8 md:py-12 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12"
        >
            {/* Left Column Header */}
            <div className="lg:col-span-4 flex flex-col justify-start pt-1">
                <div>
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#111111]">
                        {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-normal mt-0.5 tracking-wide">
                        {item.subtitle}
                    </p>
                </div>
            </div>

            {/* Right Column Text (Adjusted to font-medium for ideal weight) */}
            <div className="lg:col-span-8">
                <p className="text-lg sm:text-xl lg:text-[1.85rem] font-medium leading-[1.3] tracking-tight">
                    {words.map((word, idx) => (
                        <ScrollWord
                            key={idx}
                            word={word}
                            index={idx}
                            totalWords={words.length}
                            progress={scrollProgress}
                        />
                    ))}
                </p>
            </div>
        </div>
    )
}

// ==========================================
// MAIN ABOUT SECTION COMPONENT
// ==========================================
export default function AboutSection() {
    return (
        <section className="relative w-full bg-[#F5F5F7] text-[#111111] antialiased overflow-hidden font-sans py-12 md:py-16">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-4 md:grid-cols-12 gap-4 h-full">
                <div className="border-r border-neutral-200/50 h-full" />
                <div className="border-r border-neutral-200/50 h-full hidden md:block" />
                <div className="border-r border-neutral-200/50 h-full hidden md:block" />
                <div className="border-r border-neutral-200/50 h-full" />
                <div className="border-r border-neutral-200/50 h-full hidden md:block" />
                <div className="border-r border-neutral-200/50 h-full hidden md:block" />
                <div className="border-r border-neutral-200/50 h-full" />
                <div className="border-r border-neutral-200/50 h-full hidden md:block" />
                <div className="border-r border-neutral-200/50 h-full hidden md:block" />
                <div className="border-r border-neutral-200/50 h-full hidden md:block" />
                <div className="border-r border-neutral-200/50 h-full hidden md:block" />
                <div className="h-full" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col gap-4">
                {SECTIONS.map((item) => (
                    <AboutBlock key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}