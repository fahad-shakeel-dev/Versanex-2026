"use client"

export default function DesignProcessSection({ steps }) {
  const processSteps = steps || [
    {
      number: "01",
      title: "Discovery & Scoping",
      duration: "1 week",
      description:
        "We start by deeply understanding your business, users, and goals. We map out requirements, define technical scope, and align on timelines and budget before a single line of code is written.",
    },
    {
      number: "02",
      title: "Architecture & Design",
      duration: "2 weeks",
      description:
        "We design the system architecture and UI/UX before development. This includes database schema, API contracts, component hierarchy, and interactive Figma prototypes for your approval.",
    },
    {
      number: "03",
      title: "Build & Iterate",
      duration: "3 weeks",
      description:
        "Development happens in two-week sprints with live previews. You see progress continuously, give feedback, and we iterate fast — no surprises at the end.",
    },
    {
      number: "04",
      title: "Launch & Support",
      duration: "4 weeks",
      description:
        "We handle deployment, CI/CD pipeline setup, monitoring, and post-launch bug fixes. After launch, we offer retainer support for ongoing features and maintenance.",
    },
  ]

  return (
    <section className="bg-[#f4f4f5] py-16 sm:py-24 text-[#0f1420] select-none font-sans">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-12">
        
        {/* Main Grid: Left Large Title + Right Steps (Moved Left) */}
        <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
          
          {/* LEFT STICKY HEADING */}
          <div className="w-full lg:w-[38%] lg:sticky lg:top-28 lg:self-start shrink-0 pt-1">
            <h2 className="text-5xl sm:text-6xl lg:text-[76px] font-normal tracking-[-0.03em] text-[#0f1420] leading-[0.98]">
              Design <br />
              Process
            </h2>
          </div>

          {/* RIGHT SCROLLING PROCESS LIST */}
          <div className="w-full lg:w-[62%] flex flex-col">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="group py-8 sm:py-10 border-t border-[#e2e8f0] first:border-t-0 lg:first:border-t flex flex-col gap-3 transition-colors duration-300"
              >
                {/* Header Row: Step Number, Title, and Duration Badge */}
                <div className="flex items-start justify-between gap-4">
                  
                  <div className="flex items-start gap-6 sm:gap-8">
                    {/* Big Light Number (Darkens on Hover) */}
                    <span className="text-5xl sm:text-6xl lg:text-[68px] font-extralight text-[#cbd5e1] group-hover:text-[#475569] tracking-tight leading-none shrink-0 transition-colors duration-300">
                      {step.number}
                    </span>

                    {/* Step Title (Darkens on Hover) */}
                    <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-normal tracking-[-0.02em] text-[#475569] group-hover:text-[#0f1420] pt-1 transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Duration Capsule Badge (Darkens on Hover) */}
                  <span className="px-3.5 py-1 text-xs sm:text-[13px] font-normal text-[#64748b] bg-[#e2e8f0]/70 group-hover:bg-[#cbd5e1] group-hover:text-[#0f1420] rounded-full shrink-0 mt-2 transition-all duration-300">
                    {step.duration}
                  </span>

                </div>

                {/* Step Description (Darkens on Hover) */}
                <div className="pl-0 sm:pl-[84px] lg:pl-[96px] max-w-xl">
                  <p className="text-base sm:text-[17px] text-[#8b96a5] group-hover:text-[#1e293b] font-normal leading-[1.6] transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
            
            {/* Bottom Closing Divider Line */}
            <div className="border-b border-[#e2e8f0]" />
          </div>

        </div>

      </div>
    </section>
  )
}
