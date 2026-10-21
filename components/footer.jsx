"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiFacebook } from "react-icons/fi";
import {
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiArrowRight,
} from "react-icons/fi";
import Image from "@/components/optimized-image";
import styles from "./footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { toast } = await import("./notifications");
      if (!email.trim()) return toast.error("Please enter your email");

      try {
        setLoading(true);
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        await fetch("https://formspree.io/f/mbgrbvvj", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, form: "Newsletter" }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Subscribed successfully 🎉");
          setEmail("");
        } else {
          toast.error(data.message || "Subscription failed");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return (
    <footer
      className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 overflow-hidden"
      role="contentinfo"
    >
      {/* Decorative overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,173,8,0.1),transparent_60%)]"
      />

      <div className={`${styles.frame} relative max-w-7xl mx-auto px-6 py-20 md:py-24`}>
        <div className={`${styles.columns} grid gap-12 md:grid-cols-4`}>
          {/* 1️⃣ Brand & Intro */}
          <div className={styles.brand}>
            <div className={`${styles.logoRow} flex items-center gap-2 mb-5`}>
              <Image
                src="/logo.png"
                height={50}
                width={50}
                sizes="(min-width: 1101px) 68px, 50px"
                alt="VersaNex logo"
                loading="lazy"
              />
              <span className="text-2xl font-bold text-white">VersaNex</span>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              We transform your digital presence with strategy, creativity, and
              engineering precision. Our mission — build experiences that
              deliver measurable growth and user love.
            </p>

            <address className="mt-6 not-italic space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <FiMail className="text-[#f2ad08]" aria-hidden="true" />
                <a
                  href="mailto:support@versanex.site"
                  className="hover:text-[#f2ad08]"
                >
                  support@versanex.site
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="text-[#f2ad08]" aria-hidden="true" />
                <a href="tel:+923457707337" className="hover:text-[#f2ad08]">
                  +92 345 7707337
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiMapPin className="text-[#f2ad08]" aria-hidden="true" />
                Faisalabad, Pakistan
              </p>
            </address>
          </div>

          {/* 2️⃣ Company */}
          <nav aria-label="Company">
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["/about", "About Us"],
                ["/services", "Our Services"],
                ["/projects", "Our Projects"],
                // HIDDEN — comment back in to restore Our Team link:
                // ["/about/ourteam", "Our Team"],
                ["/contact", "Contact"],
              ].map(([link, text]) => (
                <li key={text}>
                  <a href={link} className="hover:text-[#f2ad08] transition-colors">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3️⃣ Resources */}
          <nav aria-label="Resources">
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["/faqs", "FAQs"],
                ["/privacy-policy", "Privacy Policy"],
                ["/terms-of-use", "Terms of Use"],
              ].map(([link, text]) => (
                <li key={text}>
                  <a href={link} className="hover:text-[#f2ad08] transition-colors">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 4️⃣ Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for exclusive updates and insights.
            </p>

            <form
              onSubmit={handleSubmit}
              className={`${styles.newsletter} flex items-center mb-6`}
              aria-label="Newsletter Subscription Form"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-l-md bg-gray-800 text-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#f2ad08] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-r-md bg-[#f2ad08] text-white px-3 py-2 flex items-center gap-1 hover:bg-[#d88f07] transition-colors disabled:opacity-50"
                aria-label="Subscribe"
              >
                {loading ? (
                  <span className="animate-pulse text-sm">...</span>
                ) : (
                  <FiArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Social icons with animation */}
            <div className={`${styles.socials} flex gap-4`} aria-label="Social media links">
              {[
                { icon: FiFacebook, link: "https://www.facebook.com/versanexinc", label: "Facebook" },
                { icon: FiInstagram, link: "https://www.instagram.com/versanexinc", label: "Instagram" },
                { icon: FiLinkedin, link: "https://www.linkedin.com/company/versanex", label: "LinkedIn" },
              ].map(({ icon: Icon, link, label }) => (
                <motion.a
                  key={label}
                  href={link}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-[#f2ad08] hover:bg-[#f2ad08] hover:text-black transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className={`${styles.divider} my-10 border-gray-800 relative z-10`} />

        {/* Bottom section */}
        <div className={`${styles.bottom} flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500 relative z-10`}>
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300 font-semibold">VersaNex</span>. All
            rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            Back To Top <span className="border border-current rounded-full px-1.5 py-0.5 text-[10px]">↑</span>
          </button>
        </div>
      </div>

      {/* Giant Footer Text */}
      <div className="w-full flex justify-center items-end pointer-events-none select-none overflow-hidden relative z-0 mt-8">
        <h1 className="text-[17vw] font-black leading-[0.7] tracking-tight uppercase translate-y-[22%] bg-gradient-to-b from-gray-600/60 to-black bg-clip-text text-transparent">
          VersaNex
        </h1>
      </div>

      {/* Decorative background blur */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-60 h-60 bg-[#f2ad08]/10 rounded-full blur-3xl z-0"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-72 h-72 bg-[#f2ad08]/10 rounded-full blur-3xl z-0"
      />
    </footer>
  );
}
