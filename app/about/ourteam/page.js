"use client";

import React, { useState, memo } from "react";
import Image from "@/components/optimized-image";
import Head from "next/head";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoMdQuote } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const teamMembers = [
  {
    img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032414/Fahad_hsf0lt.png",
    name: "Fahad Joyia",
    position: "Founder",
    role: "WEB DEVELOPMENT",
    bio: "Leading our development team with a vision for innovation and quality-driven solutions.",
    linkedin: "https://www.linkedin.com/in/muhammad-fahad-shakeel-69569a371/",
    email: "fahad.joyia@example.com",
  },
  {
    img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032416/Jami_iigsv8.png",
    name: "Hisham Hussain",
    position: "Graphic Designer",
    role: "GRAPHICS DESIGN",
    bio: "Crafting visual identities that connect brands and audiences through creativity.",
    linkedin: "https://www.linkedin.com/in/jamispeaks",
    email: "jamispeaks.contact@gmail.com",
  },
  {
  img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032780/Moaz_yhoab2.png",
  name: "Moaz Ahmad",
  position: "Digital Marketer",
  role: "Digital Marketer",
  bio: "Focused on driving growth through data-driven strategies and creative campaigns.",
  linkedin: "https://www.linkedin.com/in/moaz-ahmed-2a996128b/",
  email: "moazahmed.personal@gmail.com",
},
  {
    img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032421/Hamid_hhvrjs.png",
    name: "Hamiz Asghar",
    position: "Full Stack Developer",
    role: "WEB DEVELOPMENT",
    bio: "Building robust and scalable web systems with a focus on performance and UX.",
    linkedin: "https://www.linkedin.com/in/hamiz-asghar-349915320",
    email: "hamizasghar@gmail.com",
  },
  {
    img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032417/Taha_m81z3r.png",
    name: "Taha Khurram",
    position: "Quality Assurance",
    role: "Quality Assurance",
    bio: "Driving growth through strategic campaigns and data-driven efforts.",
    linkedin: "https://www.linkedin.com/in/muhammad-taha-khurram-2b77ba366?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "m.tahaofficial007@gmail.com",
  },
 {
  img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032423/Muneed_ob0tx7.png",
  name: "Muneeb Naqvi",
  position: "Web Developer",
  role: "WEB DEVELOPMENT",
  bio: "Skilled in building responsive and user-friendly websites with clean, modern design.",
  linkedin: "https://linkedin.com/in/Muneebnaqvi%20dev",
  email: "muneebnaqvi7212@gmail.com",
},

{
  img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032416/Hafiz_zabbso.png",
  name: "Muhammad Ahmad",
  position: "Content Writer",
  role: "CONTENT WRITER",
  bio: "Creates engaging and SEO-friendly content that connects with audiences.",
  linkedin: "https://www.linkedin.com/in/ahmad-rajpootttt/",
  email: "Cwriter448@gmail.com",
},
{
  img: "https://res.cloudinary.com/dbbbve4y4/image/upload/v1762032413/Ahmed_tl9q1l.png",
  name: "Ahmad Abubakar",
  position: "Video Editor",
  role: "VIDEO EDITOR",
  bio: "Skilled video editor creating engaging content that tells compelling stories and boosts brand engagement.",
  linkedin: "#",
  email: "ahmadabubakar0000008@gmail.com",
}


];

const quotes = [
  {
    quote: "We build technology not just for today — but for the digital future.",
    name: "Fahad",
    position: "Web Developer",
  },
  {
    quote: "Code with creativity — turning ideas into seamless digital experiences.",
    name: "Moaz",
    position: "Web Developer",
  },
  {
    quote: "Design is the silent ambassador of your brand — I bring that vision to life.",
    name: "Hisham",
    position: "Graphic Designer",
  },
];


// ✅ Optimized memoized team card
const TeamCard = memo(({ member, index }) => (
  <div
    className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-[1.015] hover:shadow-xl will-change-transform"
  >
    <div className="relative w-full h-80 overflow-hidden">
  <Image
    src={member.img}
    alt={member.name}
    width={50}
    height={50}
    quality={70}
    priority={index === 0}
    loading={index === 0 ? "eager" : "lazy"}
    fetchPriority={index === 0 ? "high" : "low"}
    className="object-contain w-full h-full opacity-0 animate-fadeIn transition-transform duration-300 hover:scale-105"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
</div>


    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
      <p className="text-amber-500 font-semibold mb-1">{member.position}</p>
      <p className="text-gray-600 text-sm mb-2">{member.role}</p>
      <p className="text-gray-500 text-sm mb-3">{member.bio}</p>
      <div className="flex justify-center gap-4">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name}'s LinkedIn`}
          className="text-amber-500 hover:text-amber-600 transition-colors"
        >
          <BiLogoLinkedinSquare size={22} />
        </a>
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          className="text-amber-500 hover:text-amber-600 transition-colors"
        >
          <MdEmail size={22} />
        </a>
      </div>
    </div>
  </div>
));
TeamCard.displayName = "TeamCard";

export default function TeamPage() {
  const [showJoinForm, setShowJoinForm] = useState(false);

  return (
    // <>
    //   <Head>
    //     <title>Our Team | Versanex</title>
    //     <meta
    //       name="description"
    //       content="Meet the talented team behind Versanex — innovators in web development, design, and digital strategy."
    //     />
    //     <link rel="canonical" href="https://www.versanex.com/team" />
    //   </Head>
    //   <Navbar />
    //   {/* Hero Section */}
    //   <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-6 text-center">
    //     <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
    //       Meet Our <span className="text-amber-400">Team</span>
    //     </h1>
    //     <p className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed">
    //       Passionate creators, developers, and thinkers — shaping the digital
    //       future, one idea at a time.
    //     </p>
    //     <div className="h-[3px] bg-amber-400 w-24 mx-auto mt-6 rounded-full animate-pulse" />
    //   </section>
    //   {/* Culture & Values */}
    //   <section className="bg-white py-16 px-6 text-center max-w-6xl mx-auto">
    //     <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
    //       Our Culture & Values
    //     </h2>
    //     <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-6" />
    //     <p className="text-gray-600 max-w-3xl mx-auto text-lg">
    //       We believe in collaboration, transparency, and growth. Every member of
    //       Versanex brings their expertise and creativity, making innovation our
    //       shared language.
    //     </p>
    //   </section>
    //   {/* Team Grid — Optimized */}
    //   <section className="py-14 px-6 max-w-7xl mx-auto">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    //       {teamMembers.map((member, index) => (
    //         <TeamCard key={index} member={member} index={index} />
    //       ))}
    //     </div>
    //   </section>
    //   {/* Quotes Section */}
    //   <section className="bg-amber-50 py-20 px-6">
    //     <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
    //       Words That Inspire Us
    //     </h2>
    //     <Swiper
    //       slidesPerView={1}
    //       breakpoints={{
    //         768: { slidesPerView: 2 },
    //         1024: { slidesPerView: 2 },
    //       }}
    //       spaceBetween={24}
    //       autoplay={{ delay: 4000, disableOnInteraction: false }}
    //       lazyPreloadPrevNext={1}
    //       modules={[Autoplay]}
    //       loop
    //       className="max-w-6xl mx-auto"
    //     >
    //       {quotes.map((quote, index) => (
    //         <SwiperSlide key={index}>
    //           <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-xl mx-auto transition-transform duration-200 hover:scale-[1.02]">
    //             <IoMdQuote className="text-amber-500 text-4xl mx-auto mb-4 rotate-180" />
    //             <p className="text-gray-700 text-lg leading-relaxed mb-4">
    //               {quote.quote}
    //             </p>
    //             <IoMdQuote className="text-amber-500 text-4xl mx-auto mb-4" />
    //             <p className="text-amber-500 font-semibold">
    //               {quote.name} ({quote.position})
    //             </p>
    //           </div>
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>
    //   </section>
    //   <section className="py-20 px-6 max-w-5xl mx-auto text-center">
    //     <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
    //       <span className="text-amber-500">Contact</span> Us
    //     </h2>
    //     <div className="h-1 w-20 bg-amber-500 mx-auto mb-6 rounded-full" />
    //     <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
    //       Have a project in mind or want to collaborate? We’d love to hear from you!
    //       Reach out to discuss your ideas and let's build something amazing together.
    //     </p>
    //     <button
    //       onClick={() => (window.location.href = "/contact")}
    //       className="px-8 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-all duration-300"
    //     >
    //       Contact Us
    //     </button>
    //   </section>
    //   <Footer />
    // </>
    null
  );
}

