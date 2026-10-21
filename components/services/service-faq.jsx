"use client"

import { useState } from "react"
import { FiPlus, FiMinus, FiArrowUpRight } from "react-icons/fi"

export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0)

  const defaultFaqs = [
    {
      number: "01",
      question: "What does VersaNex develop?",
      answer:
        "VersaNex specializes in custom software development, mobile app development, UI/UX design, and e-commerce solutions.",
    },
    {
      number: "02",
      question: "How does the development process work?",
      answer:
        "We start with discovery, define the design and technical approach, develop the agreed features, test the product, and prepare it for launch.",
    },
    {
      number: "03",
      question: "How long does software development take?",
      answer:
        "The timeline depends on project complexity, features, and integrations. We agree the scope, milestones, and delivery schedule with you before development begins.",
    },
    {
      number: "04",
      question: "How much does custom software cost?",
      answer:
        "We provide transparent fixed-price or sprint-based quotes based on scoped requirements, features, team setup, and target release deadlines.",
    },
    {
      number: "05",
      question: "Does VersaNex work with international clients?",
      answer:
        "Yes, we work with startups, businesses, and agency partners globally across North America, Europe, Australia, and the Middle East.",
    },
    {
      number: "06",
      question: "Can VersaNex design and develop the entire product?",
      answer:
        "Absolutely. We offer end-to-end services including UI/UX design and development for custom software, mobile apps, and e-commerce products.",
    },
  ]

  const faqList = faqs || defaultFaqs

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-[#f4f4f5] py-20 sm:py-28 text-[#0f1420] select-none font-sans">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-12">
        
        {/* Main Grid: Sticky Left Title & Callout + Right Scrolling Accordion */}
        <div className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* LEFT STICKY SECTION */}
          <div className="w-full lg:w-[42%] lg:sticky lg:top-28 lg:self-start shrink-0 flex flex-col justify-between min-h-[460px]">
            
            {/* Header Content */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-widest text-[#8b96a5] uppercase">
                FAQ
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#0f1420] leading-[1.05] uppercase">
                Have Some Questions?
              </h2>
            </div>

            {/* Bottom CTA Block */}
            <div className="flex flex-col gap-3 pt-12 lg:pt-0">
              <h3 className="text-base sm:text-lg font-semibold tracking-wide uppercase text-[#0f1420]">
                Not Finding Answers?
              </h3>
              <p className="text-sm sm:text-base text-[#64748b] font-normal -mt-1">
                Reach out anytime, we are happy to help.
              </p>
              
              <div className="pt-2">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0f1420] text-white text-xs sm:text-sm font-medium tracking-wider uppercase rounded-full hover:bg-black transition-colors duration-200"
                >
                  Contact Us
                  <FiArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT ACCORDION SECTION */}
          <div className="w-full lg:w-[58%] flex flex-col pt-1">
            {faqList.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={index}
                  className="border-t border-[#e2e8f0] first:border-t-0 lg:first:border-t flex flex-col transition-colors duration-200"
                >
                  {/* Clickable Row */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    type="button"
                    className="w-full py-6 sm:py-7 flex items-center justify-between text-left gap-4 group"
                  >
                    <div className="flex items-center gap-6 sm:gap-8">
                      {/* Number Tag */}
                      <span className="text-sm sm:text-base font-medium text-[#a1a1aa] tracking-tight shrink-0">
                        {faq.number}
                      </span>

                      {/* Question Title */}
                      <h3 className="text-lg sm:text-xl lg:text-[22px] font-normal tracking-tight text-[#0f1420] group-hover:text-black transition-colors">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Expand/Collapse Toggle Icon */}
                    <div className="text-[#0f1420] shrink-0 pl-2">
                      {isOpen ? (
                        <FiMinus className="w-5 h-5 transition-transform duration-200" />
                      ) : (
                        <FiPlus className="w-5 h-5 transition-transform duration-200" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer Panel */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pb-7 sm:pb-8"
                        : "grid-rows-[0fr] opacity-0 pb-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm sm:text-base text-[#64748b] font-normal leading-[1.6] pl-[42px] sm:pl-[56px] max-w-xl">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Closing Line */}
            <div className="border-b border-[#e2e8f0]" />
          </div>

        </div>

      </div>
    </section>
  )
}
