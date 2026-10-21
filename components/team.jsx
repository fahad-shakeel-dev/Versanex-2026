"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import SectionHeading from "./section-heading"
import { BiLogoLinkedinSquare } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import { FiArrowRight } from "react-icons/fi"
import Image from "@/components/optimized-image"

const team = [
  {
    name: "Fahad Joyia",
    role: "Web Developer",
    img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032414/Fahad_hsf0lt.png",
    linkedin: "https://www.linkedin.com/in/muhammad-fahad-shakeel-69569a371/",
    email: "fahad.shakeel.dev@gmail.com",
  },
  {
    name: "Hisham Hussain",
    role: "Graphic Designer",
    img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032416/Jami_iigsv8.png",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Moaz Ahmad",
    role: "Digital Marketing",
    img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032780/Moaz_yhoab2.png",
    linkedin: "https://www.linkedin.com/in/taha-khurram/",
    email: "",
  },
  // {
  //   name: "Muhammad Ahmad",
  //   role: "Content Writer",
  //   img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032416/Hafiz_zabbso.png",
  //   linkedin: "https://www.linkedin.com/in/ahmad-rajpootttt/",
  //   email: "Cwriter448@gmail.com",
  // },
]

export default function Team() {
  return (
    <section id="team" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionHeading
          eyebrow={
            <span className="font-semibold text-[#f2ad08] inline-flex items-center gap-2">
              <span className="w-1 h-1 bg-[#f2ad08] rounded-full"></span>
              Meet Our Experts
            </span>
          }
          title="Our Creative Team"
        />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.slice(0, 4).map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="group relative rounded-2xl bg-white/95 backdrop-blur-sm p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* <div className="mx-auto w-36 h-36 overflow-hidden rounded-full border-4 border-[#f2ad08]/20 shadow-lg">
                <img
                  src={member.img || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div> */}

              <div className="mx-auto w-36 h-36 overflow-hidden rounded-full border-4 border-[#f2ad08]/20 shadow-lg group">
                <Image
                  src={member.img || "/placeholder.svg"}
                  alt={member.name}
                  width={144} // 36 * 4 for the appropriate size (4x multiplier)
                  height={144} // Same as width to maintain aspect ratio
                  className="object-cover transition-transform duration-500 transform group-hover:scale-110"
                />
              </div>


              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{member.name}</h3>
                <p className="mt-1 text-sm text-gray-600 font-medium">{member.role}</p>
              </div>

              <div className="mt-4 flex justify-center gap-4">
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-gray-600 hover:text-[#f2ad08] transition-colors duration-300"
                  aria-label={`LinkedIn profile of ${member.name}`}
                >
                  <BiLogoLinkedinSquare className="transition-transform duration-300 group-hover:scale-110" size={24} />
                </Link>
                <Link
                  href={`mailto:${member.email}`}
                  className="group text-gray-600 hover:text-[#f2ad08] transition-colors duration-300"
                  aria-label={`Email ${member.name}`}
                >
                  <MdEmail className="transition-transform duration-300 group-hover:scale-110" size={22} />
                </Link>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#f2ad08]/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 bg-[#f2ad08]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))
          }
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/about/ourteam"
            className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#f2ad08]/10 to-[#d88f07]/10 text-[#f2ad08] font-semibold rounded-full shadow-md hover:shadow-lg hover:from-[#f2ad08]/20 hover:to-[#d88f07]/20 transition-all duration-300"
          >
            Meet Our Full Team
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiArrowRight className="h-5 w-5" />
            </motion.span>
          </Link>
        </div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#f2ad08]/5 rounded-full blur-2xl opacity-50 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#d88f07]/5 rounded-full blur-2xl opacity-50 animate-pulse delay-1000" />
      </div>
    </section>
  )
}