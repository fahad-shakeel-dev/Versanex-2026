"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import Image from "@/components/optimized-image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import SectionHeading from "./section-heading"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const testimonials = [
    {
      name: "Farhan M.",
      role: "Owner, TimeCenter",
      quote: "VersaNex built an incredible website for TimeCenter. The process was smooth, and the final product exceeded all my expectations. I’m thrilled with the results!",
      avatar: "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110278/avatar8_v50w6m.png",
      rating: 5,
    },
    {
      name: "Ahmed R.",
      role: "Entrepreneur, FoodieApp",
      avatar: "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110276/avatar1_qqhasy.png",
      quote: "We needed a robust food delivery app, and VersaNex delivered perfectly. The team was professional, responsive, and very creative. Highly recommended!",
      rating: 5,
    },
    {
      name: "Sara T.",
      role: "Finance Manager, PakFin",
      quote: "Our finance management system was complex, but VersaNex handled it brilliantly. Everything works flawlessly, and their support was excellent throughout.",
      avatar: "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar4_cq9q95.png",
      rating: 5,
    },
    {
      name: "Hina S.",
      role: "Founder, SEOPro",
      quote: "VersaNex created an SEO optimization tool that truly boosted our online presence. The team was attentive to our needs and delivered a polished product on time.",
      avatar: "https://res.cloudinary.com/dit3dubrf/image/upload/v1756110277/avatar5_bcmpah.png",
      rating: 5,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.2 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <SectionHeading
          eyebrow={<span style={{ color: "#f2ad08" }}>Client Reviews</span>}
          title="What Our Clients Say"
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-12 mx-5 relative"
        >
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              bulletClass: "testimonial-bullet",
              bulletActiveClass: "testimonial-bullet-active",
            }}
            navigation={{
              nextEl: ".testimonial-button-next",
              prevEl: ".testimonial-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover border-2 border-[#f2ad08]"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#f2ad08] rounded-full flex items-center justify-center">
                        <Quote className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    <p className="text-gray-700 italic leading-relaxed mb-4">“{t.quote}”</p>

                    <div className="flex justify-center gap-1 mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${idx < t.rating ? "text-[#f2ad08] fill-[#f2ad08]" : "text-gray-300"}`}
                        />
                      ))}
                    </div>

                    <h3 className="font-semibold text-gray-900 text-lg">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className={`testimonial-button-prev absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 
              bg-[#f2ad08]/90 text-white w-12 h-12 rounded-full flex items-center justify-center 
              shadow-lg backdrop-blur-sm border border-white/20 hover:bg-[#f2ad08] hover:scale-110 
              transition-all duration-300 z-20`}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className={`testimonial-button-next absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 
              bg-[#f2ad08]/90 text-white w-12 h-12 rounded-full flex items-center justify-center 
              shadow-lg backdrop-blur-sm border border-white/20 hover:bg-[#f2ad08] hover:scale-110 
              transition-all duration-300 z-20`}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Pagination */}
          <div className="testimonial-pagination flex justify-center items-center gap-2 mt-10"></div>
        </motion.div>
      </div>

      <style jsx>{`
        .testimonial-bullet {
          width: 10px;
          height: 10px;
          background: #ddd;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .testimonial-bullet-active {
          width: 28px;
          background: #f2ad08;
          border-radius: 8px;
        }
      `}</style>
    </section>
  )
}
