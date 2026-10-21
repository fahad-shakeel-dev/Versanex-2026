"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "@/components/optimized-image"
import ProjectsMenu from "@/components/projects/projects-menu"
import desktopStyles from "@/components/desktop-header.module.css"
const activeServiceSlugs = new Set(["custom-software-development", "mobile-app-development", "ui-ux-design", "ecommerce-development"])
import {
  FiMenu,
  FiX,
  FiCode,
  FiGlobe,
  FiCloud,
  FiSmartphone,
  FiLayout,
  FiShoppingCart,
  FiChevronDown,
  FiArrowUpRight,
  FiArrowRight,
  FiCpu,
  FiBriefcase,
} from "react-icons/fi"

const services = [
  {
    icon: FiCode,
    title: "Custom Software Development",
    desc: "Bespoke software engineered from the ground up â€” MVPs, enterprise systems, APIs, and automation tools.",
    href: "/services/custom-software-development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: FiGlobe,
    title: "Web Development",
    desc: "Fast, responsive, SEO-optimized websites and web apps built with Next.js and modern frameworks.",
    href: "/services/web-development",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: FiCloud,
    title: "SaaS Development",
    desc: "Multi-tenant SaaS platforms with subscription billing, RBAC, dashboards, and scalable architecture.",
    href: "/services/saas-development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: FiSmartphone,
    title: "Mobile App Development",
    desc: "Polished iOS & Android apps using React Native and Flutter with native-grade performance.",
    href: "/services/mobile-app-development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: FiLayout,
    title: "UI/UX Design",
    desc: "Human-centered design â€” from wireframes and prototypes to full design systems that convert.",
    href: "/services/ui-ux-design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: FiShoppingCart,
    title: "E-commerce Development",
    desc: "High-converting Shopify, headless, and custom e-commerce platforms built to maximize revenue.",
    href: "/services/ecommerce-development",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop",
  },
].filter((service) => activeServiceSlugs.has(service.href.replace("/services/", "")))

export function ServicesMegaMenu({ services, setHoveredMenu }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className="flex flex-col lg:flex-row w-full gap-5 text-[#1b2b40] p-1">
      {/* Left Column: Services Overview */}
      <div className="w-full lg:w-1/3 flex flex-col justify-between bg-[#f8f9fa] rounded-2xl p-5 border border-gray-100/80">
        <div>
          <span className="text-[10px] font-bold text-[#f2ad08] uppercase tracking-widest block mb-1">
            What We Do
          </span>
          <h3 className="text-lg font-bold mb-1.5 tracking-tight text-[#1b2b40]">
            Services
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            Tailored digital services engineered to transform your business, elevate user experience, and accelerate market growth.
          </p>
          <Link
            href="/services"
            onClick={() => setHoveredMenu?.(null)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-[#1b2b40] hover:border-gray-300 hover:shadow-sm transition-all duration-150"
          >
            <span>Explore All Services</span>
            <FiArrowRight className="w-3.5 h-3.5 text-gray-500" />
          </Link>
        </div>

        {/* Strategy Spotlight Card */}
        <Link href="/contact" onClick={() => setHoveredMenu?.(null)} className="mt-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1 group hover:border-[#f2ad08]/30 hover:shadow-md transition-all duration-150 cursor-pointer">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ad08] animate-pulse" />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Tailored Solutions
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-900 leading-snug">
            Need a custom service strategy or full digital transformation plan?
          </p>
          <span className="text-xs font-bold text-[#f2ad08] group-hover:translate-x-0.5 transition-transform duration-150 inline-flex items-center gap-1">
            Talk to an expert &rarr;
          </span>
        </Link>
      </div>

      {/* Right Column: Instant Super-Smooth Hover Capability List */}
      <div className="w-full lg:w-2/3 py-1 pr-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Our Core Capabilities
            </h4>
            <div className="h-px bg-gray-100 flex-1" />
          </div>

          <div className="flex flex-col gap-1.5">
            {services.map((s, idx) => {
              const isActive = hoveredIndex === idx

              return (
                <Link
                  key={s.title}
                  href={s.href}
                  onClick={() => setHoveredMenu?.(null)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative flex items-center justify-between p-2.5 rounded-xl border transition-all duration-150 ease-out ${isActive
                      ? "bg-[#141b26] text-white border-[#141b26] shadow-lg"
                      : "bg-transparent text-[#1b2b40] border-transparent hover:bg-gray-50/80"
                    }`}
                >
                  {/* Left Side Details */}
                  <div className="flex items-center gap-3 z-10 flex-1 pr-2">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-colors duration-150 ${isActive
                          ? "bg-[#f2ad08] text-white"
                          : "bg-[#141b26]/5 text-[#1b2b40] group-hover:bg-[#141b26]/10"
                        }`}
                    >
                      <s.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p
                          className={`font-semibold text-xs sm:text-sm transition-colors duration-150 ${isActive ? "text-white" : "text-gray-900"
                            }`}
                        >
                          {s.title}
                        </p>
                        <FiArrowRight
                          className={`w-3.5 h-3.5 transition-all duration-150 ${isActive
                              ? "opacity-100 translate-x-1 text-[#f2ad08]"
                              : "opacity-0 -translate-x-1"
                            }`}
                        />
                      </div>
                      <p
                        className={`text-[11px] leading-tight mt-0.5 transition-colors duration-150 ${isActive ? "text-gray-300" : "text-gray-500"
                          }`}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Side Image Preview */}
                  {s.image && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-out flex-shrink-0 ${isActive
                          ? "w-20 h-12 opacity-100 ml-2 scale-100"
                          : "w-0 h-12 opacity-0 ml-0 scale-95"
                        }`}
                    >
                      <div className="w-20 h-12 rounded-lg overflow-hidden border border-white/20 shadow-sm">
                        <Image
                          width={80}
                          height={48}
                          sizes="80px"
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Custom Proposal Banner */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 mt-1">
          <span>Looking for something specific?</span>
          <Link
            href="/contact"
            onClick={() => setHoveredMenu?.(null)}
            className="font-semibold text-[#f2ad08] hover:text-[#d88f07] transition-colors"
          >
            Request a Custom Proposal &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}

export function ProjectsMegaMenu({ setHoveredMenu }) {
  return <ProjectsMenu onNavigate={() => setHoveredMenu?.(null)} />
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState(null)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isHoveringMenu, setIsHoveringMenu] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)
  const hoverTimeout = useRef(null)

  // NOTE: document.body.style.overflow = "hidden" was intentionally removed
  // so the window's main scrollbar remains completely active and visible when megamenu opens.

  useEffect(() => {
    setScrolled(window.scrollY > 8)
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const menuVariants = {
    hidden: { opacity: 0, y: 4, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: "easeOut" } },
    exit: { opacity: 0, y: 4, scale: 0.995, transition: { duration: 0.1 } },
  }

  const hoverDelay = 50

  const handleButtonEnter = useCallback((menu) => {
    clearTimeout(hoverTimeout.current)
    setIsHoveringButton(true)
    hoverTimeout.current = setTimeout(() => {
      setHoveredMenu(menu)
    }, hoverDelay)
  }, [])

  const handleButtonLeave = useCallback(() => {
    setIsHoveringButton(false)
    hoverTimeout.current = setTimeout(() => {
      if (!isHoveringMenu) setHoveredMenu(null)
    }, 120)
  }, [isHoveringMenu])

  const handleMenuEnter = useCallback(() => {
    clearTimeout(hoverTimeout.current)
    setIsHoveringMenu(true)
  }, [])

  const handleMenuLeave = useCallback(() => {
    setIsHoveringMenu(false)
    hoverTimeout.current = setTimeout(() => {
      if (!isHoveringButton) setHoveredMenu(null)
    }, 120)
  }, [isHoveringButton])

  const toggleDropdown = useCallback((name) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }, [])

  const handleMobileClose = useCallback(() => {
    setOpen(false)
    setOpenDropdown(null)
  }, [])

  const handleMenuKeyDown = useCallback((event, menu) => {
    if (event.key !== "ArrowDown") return
    event.preventDefault()
    clearTimeout(hoverTimeout.current)
    setHoveredMenu(menu)
    requestAnimationFrame(() => {
      navRef.current?.querySelector(`[data-menu="${menu}"] a`)?.focus()
    })
  }, [])

  return (
    <header
      ref={navRef}
      onKeyDown={event => {
        if (event.key !== "Escape") return
        event.preventDefault()
        clearTimeout(hoverTimeout.current)
        const trigger = open ? '[aria-label="Open menu"]' : `[data-menu-trigger="${hoveredMenu}"]`
        setHoveredMenu(null)
        setOpen(false)
        setOpenDropdown(null)
        navRef.current?.querySelector(trigger)?.focus()
      }}
      className={`relative z-50 w-full transition-all duration-300 ease-in-out border-b border-gray-200/60 ${scrolled
          ? "bg-[#f8f9fa]/95 backdrop-blur-xl shadow-sm"
          : "bg-[#f8f9fa]"
        }`}
    >
      <nav className={`${desktopStyles.frame} ${desktopStyles.navigation} mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-8 py-4 font-sans`}>

        {/* Logo */}
        <Link href="/" className={`${desktopStyles.navigationLogo} group flex items-center`}>
          <Image
            src="/logo.png"
            height={38}
            width={38}
            alt="Logo"
            className="transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={`${desktopStyles.navigationLinks} hidden md:flex items-center gap-8 lg:gap-10`}>
          <Link
            href="/"
            className="text-[#1b2b40] hover:text-black font-normal text-[16px] tracking-tight transition-colors duration-150"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-[#1b2b40] hover:text-black font-normal text-[16px] tracking-tight transition-colors duration-150"
          >
            About
          </Link>

          {/* Services Nav Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleButtonEnter("services")}
            onMouseLeave={handleButtonLeave}
          >
            <Link
              href="/services"
              data-menu-trigger="services"
              onKeyDown={event => handleMenuKeyDown(event, "services")}
              className="text-[#1b2b40] hover:text-black font-normal text-[16px] tracking-tight transition-colors duration-150 flex items-center gap-1.5 py-1"
              aria-expanded={hoveredMenu === "services"}
              aria-haspopup="menu"
            >
              Services
              <FiChevronDown className={`h-4 w-4 text-[#1b2b40]/70 transition-transform duration-200 ${hoveredMenu === "services" ? "rotate-180" : ""}`} />
            </Link>
          </div>

          {/* Projects Nav Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleButtonEnter("projects")}
            onMouseLeave={handleButtonLeave}
          >
            <Link
              href="/projects"
              data-menu-trigger="projects"
              onKeyDown={event => handleMenuKeyDown(event, "projects")}
              className="text-[#1b2b40] hover:text-black font-normal text-[16px] tracking-tight transition-colors duration-150 flex items-center gap-1.5 py-1"
              aria-expanded={hoveredMenu === "projects"}
              aria-haspopup="menu"
            >
              Our Projects
              <FiChevronDown className={`h-4 w-4 text-[#1b2b40]/70 transition-transform duration-200 ${hoveredMenu === "projects" ? "rotate-180" : ""}`} />
            </Link>
          </div>

          <Link
            href="/contact"
            className="text-[#1b2b40] hover:text-black font-normal text-[16px] tracking-tight transition-colors duration-150"
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className={`${desktopStyles.navigationAction} hidden md:flex items-center`}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#141b26] hover:bg-[#1e2736] text-white text-[13px] font-medium tracking-wider rounded-full shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 uppercase"
          >
            GET STARTED <FiArrowUpRight className="h-4 w-4 stroke-[2]" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-gray-200/50 transition-all duration-150"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <FiMenu className="h-6 w-6 text-[#1b2b40]" />
        </button>
      </nav>

      {/* Services Mega Dropdown Container */}
      <AnimatePresence>
        {hoveredMenu === "services" && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl p-3.5 w-[92vw] max-w-5xl z-50 border border-gray-100/80 max-h-[85vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
            role="menu"
            aria-label="Services menu"
            data-menu="services"
            onFocusCapture={() => clearTimeout(hoverTimeout.current)}
          >
            <ServicesMegaMenu services={services} setHoveredMenu={setHoveredMenu} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Dropdown Container */}
      <AnimatePresence>
        {hoveredMenu === "projects" && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl p-4 w-[92vw] max-w-2xl z-50 border border-gray-100 max-h-[85vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
            role="menu"
            aria-label="Our projects menu"
            data-menu="projects"
            onFocusCapture={() => clearTimeout(hoverTimeout.current)}
          >
            <ProjectsMegaMenu setHoveredMenu={setHoveredMenu} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleMobileClose}
              aria-hidden="true"
            />

            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white p-6 shadow-2xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              role="dialog"
              aria-modal="true"
              id="mobile-menu"
            >
              <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                <span className="text-lg font-bold text-[#1b2b40]">Menu</span>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-all duration-150"
                  onClick={handleMobileClose}
                  aria-label="Close menu"
                >
                  <FiX className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              <nav className="mt-6 space-y-2">
                <Link
                  href="/"
                  onClick={handleMobileClose}
                  className="block p-3 rounded-lg hover:bg-gray-50 font-medium text-[#1b2b40]"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  onClick={handleMobileClose}
                  className="block p-3 rounded-lg hover:bg-gray-50 font-medium text-[#1b2b40]"
                >
                  About
                </Link>

                {/* Services Mobile Submenu */}
                <div>
                  <button
                    onClick={() => toggleDropdown("services")}
                    className="flex w-full items-center justify-between p-3 rounded-lg hover:bg-gray-50 font-medium text-[#1b2b40]"
                  >
                    <span>Services</span>
                    <FiChevronDown className={`transform transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "services" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 overflow-hidden"
                      >
                        {services.map((s) => (
                          <Link
                            key={s.title}
                            href={s.href}
                            onClick={handleMobileClose}
                            className="block p-2 text-sm text-gray-600 hover:text-black"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Projects Mobile Submenu */}
                <div>
                  <button
                    onClick={() => toggleDropdown("projects")}
                    className="flex w-full items-center justify-between p-3 rounded-lg hover:bg-gray-50 font-medium text-[#1b2b40]"
                  >
                    <span>Our Projects</span>
                    <FiChevronDown className={`transform transition-transform ${openDropdown === "projects" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "projects" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 space-y-3 pt-2 pb-2 overflow-hidden text-xs"
                      >
                        <ProjectsMenu compact onNavigate={handleMobileClose} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>



                <Link
                  href="/contact"
                  onClick={handleMobileClose}
                  className="block p-3 rounded-lg hover:bg-gray-50 font-medium text-[#1b2b40]"
                >
                  Contact
                </Link>

                <div className="pt-4">
                  <Link
                    href="/contact"
                    onClick={handleMobileClose}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-[#141b26] text-white font-medium text-xs tracking-wider uppercase shadow-md"
                  >
                    GET STARTED <FiArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
