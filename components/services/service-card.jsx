"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { FaArrowRight } from "react-icons/fa"
import Link from "next/link"

export default function ProcessFlow() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const stepsRef = useRef([])
  const connectorsRef = useRef([])
  const circlesRef = useRef([])

  const steps = [
    {
      number: 1,
      title: "Discovery & Strategy",
      description: "We understand your business goals, challenges, and vision for the future.",
      icon: "🎯",
    },
    {
      number: 2,
      title: "Planning & Design",
      description: "Create detailed roadmaps and design mockups tailored to your needs.",
      icon: "📋",
    },
    {
      number: 3,
      title: "Development",
      description: "Build your solution with cutting-edge technologies and best practices.",
      icon: "⚙️",
    },
    {
      number: 4,
      title: "Testing & QA",
      description: "Rigorous testing ensures quality, performance, and security standards.",
      icon: "✅",
    },
    {
      number: 5,
      title: "Launch & Deploy",
      description: "Seamless deployment with zero downtime and comprehensive monitoring.",
      icon: "🚀",
    },
    {
      number: 6,
      title: "Support & Growth",
      description: "Ongoing support, optimization, and scaling as your business grows.",
      icon: "📈",
    },
  ]

  useEffect(() => {
    // Animate title
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    })

    // Animate circles with stagger
    gsap.from(circlesRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out",
      delay: 0.3,
    })

    // Animate step cards
    gsap.from(stepsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.5,
    })

    // Animate connectors with drawing effect
    connectorsRef.current.forEach((connector, index) => {
      if (!connector) return
      const length = connector.getTotalLength()
      connector.style.strokeDasharray = length
      connector.style.strokeDashoffset = length

      gsap.to(connector, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.8 + index * 0.2,
      })
    })

    // Add hover animations to steps
    stepsRef.current.forEach((step) => {
      if (!step) return

      step.addEventListener("mouseenter", () => {
        gsap.to(step, {
          y: -8,
          boxShadow: "0 20px 40px rgba(244, 165, 0, 0.2)",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      step.addEventListener("mouseleave", () => {
        gsap.to(step, {
          y: 0,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })
  }, [])

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Our Step-by-Step Process</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A proven methodology that ensures successful project delivery from start to finish
          </p>
        </div>

        {/* Desktop View - Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* SVG Connectors */}
            <svg className="absolute top-0 left-0 w-full h-32 pointer-events-none" style={{ height: "200px" }}>
              {[...Array(5)].map((_, index) => (
                <line
                  key={index}
                  ref={(el) => {
                    if (el) connectorsRef.current[index] = el
                  }}
                  x1={`${16.67 + index * 16.67}%`}
                  y1="60"
                  x2={`${16.67 + (index + 1) * 16.67}%`}
                  y2="60"
                  stroke="#F4A500"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
            </svg>

            {/* Steps Grid */}
            <div className="grid grid-cols-6 gap-4 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    ref={(el) => {
                      if (el) circlesRef.current[index] = el
                    }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-3xl shadow-lg mb-8 border-4 border-white relative z-20"
                  >
                    {step.icon}
                  </div>

                  {/* Card */}
                  <div
                    ref={(el) => {
                      if (el) stepsRef.current[index] = el
                    }}
                    className="w-full bg-white rounded-xl p-6 border border-slate-200 hover:border-amber-400 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <h3 className="font-bold text-slate-900 mb-3 text-sm sm:text-base">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View - Vertical Flow */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              {/* Circle and Connector */}
              <div className="flex flex-col items-center">
                <div
                  ref={(el) => {
                    if (el) circlesRef.current[index] = el
                  }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-2xl shadow-lg border-4 border-white flex-shrink-0"
                >
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 h-12 bg-gradient-to-b from-amber-400 to-amber-200 mt-2" />
                )}
              </div>

              {/* Card */}
              <div
                ref={(el) => {
                  if (el) stepsRef.current[index] = el
                }}
                className="flex-1 bg-white rounded-xl p-6 border border-slate-200 hover:border-amber-400 shadow-md hover:shadow-lg transition-all duration-300 mt-2"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-600 mb-8">Ready to start your journey with us?</p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Begin Your Project
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
