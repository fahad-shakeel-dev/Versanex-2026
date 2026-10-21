"use client"

import { useEffect, useRef } from "react"
import Image from "@/components/optimized-image"
import Link from "next/link"
import gsap from "gsap"
import { ArrowUpRight, Code2, Smartphone, Globe2, Cloud } from "lucide-react"
import { services } from "@/data/services"
import ProcessFlow from "@/components/services/process-flow"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import styles from "./services.module.css"

const serviceIcons = {
  "custom-software-development": Code2,
  "mobile-app-development": Smartphone,
  "web-development": Globe2,
  "saas-development": Cloud,
}

export default function ServicesPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const media = gsap.matchMedia()
    let observer

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-hero-reveal]", {
          y: 28, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        })

        const cards = gsap.utils.toArray("[data-service-reveal]")
        gsap.set(cards, { y: 36, opacity: 0 })
        observer = new IntersectionObserver(entries => {
          entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return
            context.add(() => {
              gsap.to(entry.target, {
                y: 0, opacity: 1, duration: 0.85, delay: index * 0.08,
                ease: "power3.out", clearProps: "transform,opacity",
              })
            })
            observer.unobserve(entry.target)
          })
        }, { threshold: 0.12 })
        cards.forEach(card => observer.observe(card))
      }, pageRef)

      return () => {
        observer?.disconnect()
        context.revert()
      }
    })

    return () => media.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main ref={pageRef} className={styles.page}>
        <section className={styles.hero}>
          <div data-hero-reveal className={styles.eyebrow}>Our expertise</div>
          <h1 data-hero-reveal className={styles.heading}>Transformative<br />digital services.</h1>
          <p data-hero-reveal className={styles.intro}>
            Thoughtful design. Powerful technology. From your first idea to your next big milestone,
            we build digital experiences that move your business forward.
          </p>
        </section>

        <section className={styles.services} aria-labelledby="services-heading">
          <div className={styles.sectionHeader}>
            <h2 id="services-heading" className={styles.sectionTitle}>What we do</h2>
            <span className={styles.sectionCount}>{String(services.length).padStart(2, "0")} services / one creative partner</span>
          </div>
          <div className={styles.grid}>
            {services.map((service, index) => {
              const Icon = serviceIcons[service.slug] || Code2
              return (
                <article key={service.id} data-service-reveal className={styles.card}>
                  <Link href={`/services/${service.slug}`} className={styles.cardLink} aria-labelledby={`service-title-${service.id}`}>
                    <div className={styles.imageWrap}>
                      <Image src={service.image} alt="" fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1500px) 50vw, 680px"
                        className={styles.image} />
                      <div className={styles.imageOverlay} />
                      <span className={styles.serviceNumber}>S / {String(index + 1).padStart(3, "0")}</span>
                      <span className={styles.iconBadge}><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span>
                    </div>
                    <div className={styles.content}>
                      <p className={styles.subtitle}>{service.subtitle}</p>
                      <h3 id={`service-title-${service.id}`} className={styles.cardTitle}>{service.title}</h3>
                      <p className={styles.description}>{service.description}</p>
                      <div className={styles.tags}>
                        {service.heroPoints.slice(0, 3).map(point => <span key={point}>{point}</span>)}
                      </div>
                      <div className={styles.cardFooter}>
                        <span>Explore service</span>
                        <span className={styles.arrow}><ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>

        <div className="bg-white"><ProcessFlow /></div>

        <section className={styles.cta}>
          <div className={styles.eyebrow}>Your next chapter</div>
          <h2>Great ideas deserve<br />a great digital partner.</h2>
          <p>Tell us what you have in mind. Let&apos;s build something that makes a difference.</p>
          <Link href="/contact" className={styles.ctaLink}>Let&apos;s talk <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
