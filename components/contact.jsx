"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { services } from "@/data/services"
import styles from "./home-contact.module.css"

const fieldClass = "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8F9FA] dark:bg-[#090A0C] px-4 py-3 text-sm text-[#1b2b40] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#f2ad08] focus:border-transparent transition-colors"
const labelClass = "block text-sm font-medium text-[#1b2b40] dark:text-slate-200 mb-2"

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    description: "",
  })
  const [consentChecked, setConsentChecked] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function onSubmit(e) {
    e.preventDefault()

    if (!consentChecked) {
      alert("Please agree to the processing of your personal data before sending your vision.")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      await fetch("https://formspree.io/f/mbgrbvvj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, form: "Contact" }),
      })
      const data = await response.json()
      if (data.success) {
        alert(`Thanks, ${formData.name || "[Client]"}! We’ll get back to you soon.`)
        setFormData({ name: "", email: "", service: "", description: "" })
        setConsentChecked(false)
      } else {
        alert("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="home-contact-heading"
      className={`${styles.section} scroll-mt-24 py-20 sm:py-28 bg-[#F8F9FA] dark:bg-[#090A0C] text-[#1b2b40] dark:text-slate-100 antialiased transition-colors duration-300`}
    >
      <div className={`${styles.frame} mx-auto max-w-7xl px-6 lg:px-12`}>
        <div className={`${styles.header} mb-12 sm:mb-14 border-b border-slate-200 dark:border-neutral-800 pb-8`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#f2ad08]" />
            <span className={`${styles.label} text-[11px] font-mono font-medium uppercase tracking-widest text-[#556377] dark:text-slate-400`}>
              Ready to Collaborate?
            </span>
          </div>
          <h2 id="home-contact-heading" className={`${styles.heading} text-4xl sm:text-6xl font-normal tracking-tight leading-[1.1] max-w-4xl`}>
            Let&rsquo;s Create Your Vision Together!
          </h2>
        </div>

        <div className={`${styles.grid} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className={`${styles.intro} lg:pt-6`}
          >
            <h3 className="text-2xl sm:text-3xl font-normal tracking-tight mb-5 max-w-sm">
              Take the First Step with VersaNex
            </h3>
            <p className="text-sm sm:text-base text-[#556377] dark:text-slate-400 leading-relaxed max-w-md mb-8">
              Share your project details, goals, and challenges. We&rsquo;ll help you turn your ideas into custom software, a mobile app, or an online store built for your business.
            </p>
            <a
              href="#home-contact-form"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-medium hover:bg-[#141b26] hover:text-white dark:hover:bg-white dark:hover:text-[#141b26] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2ad08]"
            >
              Get Started Now <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${styles.formCard} min-w-0 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0f1115] p-6 sm:p-8 lg:p-10 shadow-sm`}
          >
            <form id="home-contact-form" onSubmit={onSubmit} className={`${styles.form} scroll-mt-28 space-y-6`}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>Your Name</label>
                  <input id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className={fieldClass} placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Your Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required className={fieldClass} placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label htmlFor="service" className={labelClass}>Select a Service</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} required className={fieldClass}>
                  <option value="">-- Choose a Service --</option>
                  {services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="description" className={labelClass}>Your Project Idea</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} required className={fieldClass + " resize-y min-h-32"} placeholder="Describe your project or goals..." />
              </div>

              <div className="flex items-start gap-3">
                <input id="consent" type="checkbox" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#f2ad08] rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2ad08]" />
                <label htmlFor="consent" className="text-xs sm:text-sm text-[#556377] dark:text-slate-400 leading-relaxed">
                  I agree to the processing of my personal data as per our <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-[#1b2b40] dark:hover:text-white">privacy policy</Link>.
                </label>
              </div>

              <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#141b26] text-white text-sm font-medium hover:bg-[#f2ad08] hover:text-[#141b26] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2ad08] disabled:opacity-70 disabled:cursor-wait">
                {submitting ? "Sending..." : "Send Your Vision"}
                {!submitting && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
