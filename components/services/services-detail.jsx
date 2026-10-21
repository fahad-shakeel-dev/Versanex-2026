"use client"

import { useState } from "react"
import {
  FiShare2,
  FiInstagram,
  FiLinkedin,
  FiCopy,
  FiCheck,
} from "react-icons/fi"
import { FaBehance, FaTiktok } from "react-icons/fa"

export default function ServiceDetailsSection({ serviceData }) {
  const [copied, setCopied] = useState(false)

  const data = serviceData || {
    title: "Web Development",
    subheading:
      "Your website is your most valuable digital asset. At VersaNex, we build websites that are not just beautiful — they are engineered for speed, SEO, and conversion from the ground up.",
    secondaryDescription:
      "Whether you need a simple landing page or a complex multi-language portal, we deliver pixel-perfect results using the latest web technologies.",
    deliverablesTitle: "What we deliver",
    deliverables: [
      {
        title: "Landing Pages & Marketing Sites",
        description:
          "High-converting landing pages optimized for performance, Core Web Vitals, and SEO — designed to turn visitors into customers.",
      },
      {
        title: "Corporate & Business Websites",
        description:
          "Professional websites with CMS integration so your team can manage content independently without touching code.",
      },
      {
        title: "Blogs & Content Portals",
        description:
          "Content-heavy sites built for scale — with tagging, search, pagination, and SSR/SSG strategies for fast load times.",
      },
      {
        title: "Progressive Web Apps",
        description:
          "App-like web experiences with offline support, push notifications, and installability — no app store required.",
      },
    ],
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section className="bg-[#f4f4f5] py-12 sm:py-20 text-[#0f1420] select-none">
      <div className="mx-auto max-w-[1320px] pl-6 sm:pl-10 lg:pl-12 pr-6 sm:pr-10 lg:pr-16">
        
        {/* Main Grid: Sticky Sidebar + Content */}
        <div className="relative flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
          
          {/* LEFT STICKY SIDEBAR */}
          <div className="hidden lg:block sticky top-28 self-start shrink-0">
            <div className="flex flex-col items-center w-12 gap-5 pr-6 border-r border-[#e2e8f0]">
              
              {/* Share Icon & Count */}
              <div className="flex flex-col items-center gap-0.5">
                <button
                  type="button"
                  aria-label="Share page"
                  className="p-1 text-[#0f1420] hover:text-black transition-colors"
                >
                  <FiShare2 className="w-[18px] h-[18px]" />
                </button>
                <span className="text-[11px] font-semibold text-[#0f1420] tracking-tight mt-1">
                  14
                </span>
                <span className="text-[10px] text-[#8b96a5] font-normal leading-none">
                  Shared
                </span>
              </div>

              <div className="w-6 h-[1px] bg-[#e2e8f0] my-0.5" />

              {/* Social Nav Icons */}
              <div className="flex flex-col items-center gap-[18px] text-[#0f1420]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="hover:opacity-70 transition-opacity"
                >
                  <FiInstagram className="w-[17px] h-[17px]" />
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Behance"
                  className="hover:opacity-70 transition-opacity"
                >
                  <FaBehance className="w-[17px] h-[17px]" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="hover:opacity-70 transition-opacity"
                >
                  <FaTiktok className="w-[15px] h-[15px]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="hover:opacity-70 transition-opacity"
                >
                  <FiLinkedin className="w-[17px] h-[17px]" />
                </a>

                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  type="button"
                  aria-label="Copy Link"
                  className="hover:opacity-70 transition-opacity pt-0.5"
                  title="Copy link"
                >
                  {copied ? (
                    <FiCheck className="w-[17px] h-[17px] text-green-600" />
                  ) : (
                    <FiCopy className="w-[17px] h-[17px]" />
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT SCROLLING CONTENT */}
          <div className="flex-1 flex flex-col gap-12 lg:gap-14 pt-1">
            
            {/* Top Text Block */}
            <div className="flex flex-col gap-5 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-[#0f1420] leading-[1.12]">
                {data.title}
              </h2>

              <p className="text-base sm:text-lg lg:text-[18px] text-[#8b96a5] font-normal leading-[1.6]">
                {data.subheading}
              </p>

              <p className="text-base sm:text-lg lg:text-[18px] text-[#8b96a5] font-normal leading-[1.6]">
                {data.secondaryDescription}
              </p>
            </div>

            {/* Deliverables Block */}
            <div className="flex flex-col gap-7 max-w-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-[#0f1420]">
                {data.deliverablesTitle}
              </h3>

              <div className="flex flex-col gap-8 pt-1">
                {data.deliverables.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1.5">
                    
                    {/* Header with inline bullet dot */}
                    <div className="flex items-center gap-3">
                      <span className="w-[9px] h-[9px] rounded-full bg-[#0f1420] shrink-0" />
                      <h4 className="text-lg sm:text-xl font-medium tracking-tight text-[#0f1420]">
                        {item.title}
                      </h4>
                    </div>

                    {/* Subtext aligned with bullet indent */}
                    <p className="text-base sm:text-[17px] text-[#8b96a5] font-normal leading-[1.6] pl-5 sm:pl-6 max-w-xl">
                      {item.description}
                    </p>

                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}