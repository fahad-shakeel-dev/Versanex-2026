"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const instagramPosts = [
  {
    id: 1,
    title: "VersaNex Studio — Behind the Scenes",
    url: "https://www.instagram.com/p/DQJIgd6CX4o/?igsh=MWtxdGU0MTlkczZlZw==",
  },
  {
    id: 2,
    title: "Modern UI Motion Design",
    url: "https://www.instagram.com/p/DQJGfPcCAvZ/?igsh=eDFuZTgydjFqcHNy",
  },
  {
    id: 3,
    title: "Creative Branding Launch",
    url: "https://www.instagram.com/p/DQJIEQGjiHy/?igsh=MTEwbjQ1ZXgzZ2xrcg==",
  },
  {
    id: 4,
    title: "Web App Visual Experience",
    url: "https://www.instagram.com/p/DQJJnjlDJnN/?igsh=MWFpbDlyYWlyNnRmcw==",
  },
];

export default function InstagramSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    // Load Instagram embed script only when scrolled into view
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("fetchpriority", "low");
    document.body.appendChild(script);

    // Label new frames as Instagram creates them, without repeated polling.
    const labelFrames = () => {
      sectionRef.current?.querySelectorAll("iframe.instagram-media").forEach((iframe, index) => {
        if (!iframe.getAttribute("title")) iframe.title = instagramPosts[index]?.title || "VersaNex Instagram post";
      });
    };
    const observer = new MutationObserver(labelFrames);
    if (sectionRef.current) observer.observe(sectionRef.current, { childList: true, subtree: true });
    script.addEventListener("load", labelFrames);
    return () => {
      observer.disconnect();
      script.removeEventListener("load", labelFrames);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isInView]);

  return (
    <section
      id="instagram"
      ref={sectionRef}
      aria-label="Instagram Reels Showcase"
      className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-5 flex flex-col md:flex-row items-start justify-between gap-6 md:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wider text-[#946500] uppercase">
              Instagram Reels
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Engaging Stories, Crafted to Capture Attention
            </h2>
            <p className="mt-3 text-gray-600 text-base md:text-lg leading-relaxed">
              Experience dynamic reels built to inspire, entertain, and connect.
              Every piece blends storytelling, creativity, and precision — designed for today’s digital pulse.
            </p>
          </div>

          <a
            href="https://www.instagram.com/versanexinc/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[#f2ad08] px-6 py-2 text-sm font-medium text-[#946500] transition-all hover:bg-[#f2ad08] hover:text-[#141b26]"
          >
            Follow us on Instagram
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Reels Grid */}
        <div className="mx-5 mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {instagramPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[400px]"
            >
              {/* Glow Hover Border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-[#f2ad08]/30 to-transparent blur-xl"></div>

              {/* Embed */}
              <div className="relative z-10">
                <blockquote
                  className="instagram-media w-full"
                  data-instgrm-permalink={post.url}
                  data-instgrm-version="14"
                  style={{
                    background: "#fff",
                    border: 0,
                    margin: 0,
                    padding: 0,
                    width: "100%",
                  }}
                ></blockquote>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 z-20 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white font-medium text-sm leading-snug">
                  {post.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
