"use client"

import Link from "next/link"
import { isPublicProject, withProjectMedia } from "@/data/project-media"
import { FiArrowUpRight, FiBriefcase, FiCpu, FiSmartphone } from "react-icons/fi"

const hiddenCategories = new Set(["graphic-designing", "video-editing", "content-writing", "digital-marketing", "software-quality-assurance"])
const projects = [
  { title: "LuxuryStay", slug: "luxurystay", category: "website-developing", subCategory: "Hotel & Hospitality Website", publishStatus: "published" },
  { title: "CallMind AI", slug: "callmind-ai-voice-calling-platform", category: "website-developing", subCategory: "AI Voice Calling Platform", publishStatus: "published" },
  { title: "Mahal Foret Hayat", slug: "mahal-foret-hayat", category: "website-developing", subCategory: "Construction & Corporate Website", publishStatus: "published" },
  { title: "MaxCoat", slug: "maxcoat", category: "website-developing", subCategory: "Car Care E-commerce", publishStatus: "published" },
  { title: "Apex IELTS Writing", slug: "apex-ielts-writing", category: "website-developing", subCategory: "AI Learning Platform", publishStatus: "published" },
  { title: "Time Center – Modern Watch Retail Website", slug: "time-center-modern-watch-retail-website", category: "website-developing", subCategory: "E-commerce Development", publishStatus: "published" },
  { title: "Indus & Olive", slug: "food-delivery-web-app", category: "website-developing", subCategory: "Restaurant Ordering & Management", publishStatus: "published" },
  { title: "Real-Time Chat", slug: "real-time-chat", category: "website-developing", subCategory: "Chat & Messaging App Development", publishStatus: "published" },
  { title: "SEO Master Dashboard", slug: "seo-master-dashboard", category: "website-developing", subCategory: "", publishStatus: "published" },
  { title: "University Portal", slug: "university-portal", category: "website-developing", subCategory: "University Management System", publishStatus: "published" },
  { title: "Finance Flow – Finance Management System", slug: "finance-flow-finance-management-system", category: "website-developing", subCategory: "Finance Management System", publishStatus: "published" },
  { title: "Hotel Management System", slug: "hotel-management-system", category: "website-developing", subCategory: "Web Application, Hotel Booking System, Management Dashboard", publishStatus: "published" },
  { title: "Fixit - Your AI-Powered Home Services Companion", slug: "fixit-your-ai-powered-home-services-companion", category: "mobile-app-development", subCategory: "AI Home Services App", publishStatus: "published" },
]

export function groupMenuProjects(projects) {
  const groups = { projects: [], apps: [] }
  projects.filter(isPublicProject).map(withProjectMedia).forEach(project => {
    const category = (project.category || "").toLowerCase().trim().replace(/\s+/g, "-")
    if (!project.title?.trim() || !project.slug?.trim() || hiddenCategories.has(category)) return
    if (project.publishStatus && project.publishStatus !== "published") return
    const isMobile = category.includes("mobile") || category.includes("android") || category.includes("ios")
    const isApp = isMobile || project.slug === "callmind-ai-voice-calling-platform" || /\b(apps?|applications?|systems?|dashboard|portal|chat|saas|software)\b/i.test(`${project.title} ${project.subCategory || ""} ${category.replace(/-/g, " ")}`)
    groups[isApp ? "apps" : "projects"].push({
      id: project._id || project.slug,
      name: project.title,
      href: `/projects/${encodeURIComponent(project.slug)}`,
      isMobile,
    })
  })
  return groups
}

export default function ProjectsMenu({ onNavigate, compact = false }) {
  const data = projects
  const groups = groupMenuProjects(data)

  return (
    <div className={compact ? "text-[#1b2b40]" : "p-2 text-[#1b2b40]"}>
      {data && (
        <div className={compact ? "flex flex-col gap-6" : "grid grid-cols-1 sm:grid-cols-2 gap-8 px-2 pb-5"}>
          {[
            { title: "Our Projects", items: groups.projects, Icon: FiBriefcase },
            { title: "Apps & Systems", items: groups.apps, Icon: FiCpu },
          ].map(({ title, items, Icon }) => (
            <div key={title}>
              <h4 className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-3 text-[11px] font-medium uppercase tracking-wider text-gray-500">
                <Icon className="w-4 h-4 text-gray-700" aria-hidden="true" />{title}
              </h4>
              {items.length ? (
                <div className="flex flex-col gap-1">
                  {items.map(item => (
                    <Link key={item.id} href={item.href} onClick={onNavigate}
                      className="group flex items-start justify-between gap-3 rounded-lg px-2 py-2.5 text-[13px] font-medium leading-relaxed text-gray-700 transition-colors hover:bg-gray-50 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                      <span>
                        {item.name}
                        {item.isMobile && <span className="mt-1 flex items-center gap-1 text-[10px] font-normal text-gray-500"><FiSmartphone className="w-3 h-3" aria-hidden="true" />Mobile app</span>}
                      </span>
                      <FiArrowUpRight className="mt-1 w-3.5 h-3.5 shrink-0 text-gray-400 transition-colors group-hover:text-black" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              ) : <p className="px-2 py-2 text-xs text-gray-500">No published projects in this category yet.</p>}
            </div>
          ))}
        </div>
      )}
      <div className="border-t border-gray-100 pt-4 px-2 flex justify-end">
        <Link href="/projects" onClick={onNavigate} className="flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-black">
          View all projects <FiArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
