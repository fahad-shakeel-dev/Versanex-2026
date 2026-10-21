import Image from "@/components/optimized-image"
import Link from "next/link"
import { services as serviceCatalog } from "@/data/services"
import styles from "./services.module.css"

const services = serviceCatalog.map((service, index) => ({
  id: "S/" + String(index + 1).padStart(3, "0"),
  title: service.title,
  description: service.description,
  image: service.image,
  href: "/services/" + service.slug,
}))

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={`${styles.section} w-full min-w-0 max-w-full overflow-x-clip py-16 sm:py-24 lg:py-28 bg-[#F8F9FA] dark:bg-[#090A0C] text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased`}
    >
      <div className={`${styles.frame} mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-12`}>

        {/* Section Header */}
        <div className={`${styles.header} mb-8 sm:mb-14 border-b border-slate-200 dark:border-neutral-800 pb-6 sm:pb-8 flex justify-between items-end gap-4`}>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />
              <span className={`${styles.label} text-[11px] font-mono font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400`}>
                OUR SERVICES
              </span>
            </div>
            <h2
              id="services-heading"
              className={`${styles.heading} text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 dark:text-white`}
            >
              Services
            </h2>
          </div>
          <span className={`${styles.counter} shrink-0 text-xs font-mono text-slate-500 dark:text-slate-500 mb-1`}>
            02&apos;
          </span>
        </div>

        {/* Scroll Folding Container */}
        <div className={`${styles.stack} relative flex w-full min-w-0 flex-col gap-5 sm:gap-8`}>
          {services.map((service) => (
            <article
              key={service.id}
              className="relative w-full min-w-0 lg:sticky lg:top-24 lg:z-10"
            >
              <div className={`${styles.card} group relative w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#0f1115] p-5 sm:p-7 lg:p-10 shadow-sm transition-all duration-500 hover:shadow-lg`}>
                <div className={`${styles.grid} grid min-w-0 grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center`}>

                  {/* Left: ID, Title, Description & CTA */}
                  <div className={`${styles.content} min-w-0 lg:col-span-7 flex flex-col justify-between h-full lg:min-h-[200px]`}>
                    <div className="min-w-0">
                      <span className={`${styles.serviceId} text-xs font-mono italic text-slate-500 dark:text-slate-500 block mb-3`}>
                        {service.id}
                      </span>
                      <h3 className={`${styles.title} text-[clamp(1.5rem,5vw,2.25rem)] lg:text-5xl [overflow-wrap:anywhere] font-normal text-slate-900 dark:text-white tracking-tight leading-tight`}>
                        {service.title}
                      </h3>
                      <p className={`${styles.description} mt-3 sm:mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl break-words font-normal`}>
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-5 sm:mt-8">
                      <Link
                        href={service.href}
                        aria-label={`Learn more about ${service.title}`}
                        className={`${styles.action} inline-flex min-h-11 max-w-full items-center justify-center px-5 py-2.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-transparent hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 text-slate-900 dark:text-white text-sm lg:text-xs font-medium transition-all duration-300`}
                      >
                        Learn more<span className="sr-only"> about {service.title}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right: Preview Image */}
                  <div className="min-w-0 lg:col-span-5 w-full">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-neutral-800 shadow-inner">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1920px) 680px, (min-width: 1101px) 40vw, (max-width: 639px) calc(100vw - 74px), (max-width: 1023px) calc(100vw - 106px), 480px"
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/5 dark:bg-black/20" />
                    </div>
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
