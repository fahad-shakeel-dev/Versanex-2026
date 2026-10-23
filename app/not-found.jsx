import Image from "next/image"
import Link from "next/link"
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-[#f5f5f5] text-[#141b26]">
        <section className="mx-auto grid min-h-[72vh] max-w-7xl items-center gap-8 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-20">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#556377]">
              <span className="h-2 w-2 rounded-full bg-[#f2ad08]" aria-hidden="true" />
              Error 404
            </p>
            <h1 className="text-balance text-5xl font-normal leading-[1.02] tracking-[-0.045em] text-black sm:text-6xl lg:text-7xl">
              This page isn&apos;t here.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#556377] sm:text-lg">
              The link may be outdated, or the page may have moved. Let&apos;s get you back on track.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 rounded-xl bg-black px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-[#f2ad08] hover:text-[#141b26] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2ad08]"
              >
                <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300/80 bg-[#f8f8f8] px-6 py-3.5 text-sm text-[#111] transition-colors duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2ad08]"
              >
                View Our Work
                <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-7">
            <Image
              src="/illustrations/404-not-found.svg"
              alt="Browser window displaying a 404 page not found message"
              width={720}
              height={500}
              priority
              className="h-auto w-full max-w-[620px]"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}