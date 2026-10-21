// "use client"

// import { useEffect, useRef } from "react"
// import { useParams } from "next/navigation"
// import Link from "next/link"
// import Image from "next/image"
// import gsap from "gsap"
// import { FaTrophy, FaUsers, FaLightbulb } from "react-icons/fa";
// import { FaCheck, FaArrowRight, FaStar, FaQuoteLeft} from "react-icons/fa"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

// const iconMap = {
//   FaTrophy,
//   FaUsers,
//   FaLightbulb,
// };

// export default function ServiceDetailPage() {
//   const params = useParams()
//   const slug = params.slug
//   const service = services.find((s) => s.slug === slug)

//   const containerRef = useRef(null)
//   const headerRef = useRef(null)
//   const contentRef = useRef(null)

//   useEffect(() => {
//     gsap.from(headerRef.current, {
//       y: 50,
//       duration: 1,
//       ease: "power3.out",
//     })

//     gsap.from(contentRef.current?.children, {
//       y: 40,
//       duration: 0.8,
//       stagger: 0.15,
//       ease: "power3.out",
//       delay: 0.3,
//     })
//   }, [])

//   if (!service) {
//     return (
//       <main className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
//           <Link href="/services" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
//             Back to Services
//           </Link>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <><Navbar/>
//     <main ref={containerRef} className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div
//         ref={headerRef}
//         className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
//       >
//         <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full mb-4 border border-amber-500/30">
//             <FaStar className="w-4 h-4" />
//             <span className="text-sm font-medium">Premium Service</span>
//           </div>
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-tight">
//             {service.title}
//           </h1>
//           <p className="text-lg text-gray-300 max-w-2xl text-balance leading-relaxed">
//             {service.details.fullDescription}
//           </p>
//         </div>
//       </div>

//       {/* Image Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
//           <Image
//             src={service.image || "/placeholder.svg"}
//             alt={service.title}
//             width={1280}
//             height={720}
//             className="w-full h-auto object-contain object-center"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
//         </div>
//       </section>

//       <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
//         {/* Key Benefits Section */}
//         <section>
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Key Benefits</h2>
//             <p className="text-base text-gray-600">Why choose our {service.title.toLowerCase()} service</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {service.details.benefits.map((benefit, index) => {
//               const BenefitIcon = iconMap[benefit.icon]
//               return (
//                 <div
//                   key={index}
//                   className="p-6 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-amber-500/10 mb-4">
//                     <BenefitIcon className="w-6 h-6 text-amber-600" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
//                   <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
//                 </div>
//               )
//             })}
//           </div>
//         </section>

//         {/* ROI & Metrics Section */}
//         <section>
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">ROI & Metrics</h2>
//             <p className="text-base text-gray-600">Measurable results from our {service.title.toLowerCase()} solutions</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {service.details.roi.map((item, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
//               >
//                 <p className="text-sm font-medium text-amber-600 mb-2">{item.metric}</p>
//                 <p className="text-2xl font-bold text-gray-900 mb-1">{item.value}</p>
//                 <p className="text-gray-600 text-sm">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Features Section */}
//         <section>
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Key Features</h2>
//             <p className="text-base text-gray-600">Everything you need to succeed with {service.title.toLowerCase()}</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {service.details.features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="flex-shrink-0">
//                     <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-500/10">
//                       <FaCheck className="w-5 h-5 text-amber-600" />
//                     </div>
//                   </div>
//                   <p className="font-medium text-gray-900 text-base">{feature}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Technology Stack Section */}
//         <section>
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Technology Stack</h2>
//             <p className="text-base text-gray-600">Comprehensive breakdown of our technical expertise</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {service.details.techStackDetails.map((stack, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
//               >
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">{stack.category}</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {stack.items.map((item, itemIndex) => (
//                     <span
//                       key={itemIndex}
//                       className="px-3 py-1 bg-amber-50 text-amber-700 rounded-md text-sm font-medium border border-amber-200 hover:bg-amber-100 transition-colors"
//                     >
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Core Technologies Section */}
//         <section>
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Core Technologies</h2>
//             <p className="text-base text-gray-600">We use industry-leading technologies to deliver excellence</p>
//           </div>
//           <Swiper
//             spaceBetween={20}
//             slidesPerView={2}
//             breakpoints={{
//               640: { slidesPerView: 3 },
//               1024: { slidesPerView: 5 },
//             }}
//             autoplay={{ delay: 2000, disableOnInteraction: false }}
//             loop={true}
//             modules={[Autoplay]}
//             className="my-4"
//           >
//             {service.details.technologies.map((item, index) => (
//               <SwiperSlide key={index}>
//                 <div className="bg-white p-6 rounded-xl shadow-md text-center font-bold text-gray-900 text-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
//                   {item}
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </section>

//         {/* Process Section */}
//         <section>
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Process</h2>
//             <p className="text-base text-gray-600">A structured approach to delivering exceptional results</p>
//           </div>
//           <div className="space-y-4">
//             {service.details.process.map((step, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
//               >
//                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-semibold text-lg">
//                   {index + 1}
//                 </div>
//                 <p className="text-base font-medium text-gray-900">{step}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Case Studies Section */}
//         <section>
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Case Studies & Results</h2>
//             <p className="text-base text-gray-600">Real results from real projects</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {service.details.caseStudies.map((study, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
//               >
//                 <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-2 py-1 rounded-md mb-4 text-sm font-medium">
//                   {study.metric}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{study.title}</h3>
//                 <p className="text-xl font-bold text-amber-600 mb-2">{study.result}</p>
//                 <p className="text-sm text-gray-600">Achieved through strategic implementation and optimization</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section>
//           <div className="mb-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Client Testimonials</h2>
//             <p className="text-base text-gray-600">What our clients say about working with us</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {service.details.testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
//               >
//                 <div className="flex gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <FaStar key={i} className="w-4 h-4 text-amber-400" />
//                   ))}
//                 </div>
//                 <div className="mb-4">
//                   <FaQuoteLeft className="w-5 h-5 text-amber-500/30 mb-2" />
//                   <p className="text-gray-700 text-sm leading-relaxed italic">{testimonial.content}</p>
//                 </div>
//                 <div className="border-t border-gray-200 pt-4">
//                   <p className="font-medium text-gray-900">{testimonial.name}</p>
//                   <p className="text-sm text-gray-600">{testimonial.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 text-white text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//           <p className="text-base text-gray-300 mb-6 max-w-xl mx-auto text-balance">
//             Let's discuss how we can help you achieve your goals with {service.title.toLowerCase()}. Our team is ready to transform your vision into reality.
//           </p>
//           <button className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
//             Schedule a Consultation
//             <FaArrowRight className="w-4 h-4" />
//           </button>
//         </section>
//       </div>
//     </main>
//     <Footer/>
//     </>
//   )
// }












"use client"

import { useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import gsap from "gsap"
import { FaTrophy, FaUsers, FaLightbulb, FaCheck, FaArrowRight, FaStar, FaQuoteLeft } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ServiceHero from "@/components/services/service-hero"
import { getServiceBySlug } from "@/data/services"
import ServiceAboutSection from "@/components/services/service-about"
import ServiceDetailsSection from "@/components/services/services-detail"
import WorksSection from "@/components/services/service-projects"
import DesignProcessSection from "@/components/services/services-design-process"
import FAQSection from "@/components/services/service-faq"
const iconMap = { FaTrophy, FaUsers, FaLightbulb }

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  const contentRef = useRef(null)

  useEffect(() => {
    if (!contentRef.current) return
    gsap.from(contentRef.current.children, {
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
    })
  }, [service])

  if (!service) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
            Back to Services
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4f4f5]">
        {/* NEW hero */}
        <ServiceHero service={service} />
        <ServiceAboutSection {...service.aboutData} />
        <ServiceDetailsSection serviceData={service.detailsData} />
        <WorksSection projects={service.projectsData} />
        <DesignProcessSection steps={service.processData} />
        <FAQSection />
        {/* Everything below is your old code, unchanged for now */}
        <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Key Benefits, ROI, Features, Tech Stack, Core Technologies,
              Process, Case Studies, Testimonials, CTA
              -> paste your existing sections here as they are */}
        </div>
      </main>
      <Footer />
    </>
  )
}
