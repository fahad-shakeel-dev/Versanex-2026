import { services } from "@/data/services"
import { absoluteUrl, SITE_URL } from "@/lib/seo"
import { publishedProjectFilter, getProjectSeoImages } from "@/lib/project-seo"
import { getStaticProjects, withPublicProjects } from "@/data/project-media"

// Generate from the live database without requiring database access at build time.
export const dynamic = "force-dynamic"

export default async function sitemap() {
  const pages = ["", "/about", "/services", "/projects", "/contact", "/faqs", "/privacy-policy", "/terms-of-use"]
  const entries = pages.map((path) => ({ url: SITE_URL + path }))
  entries.push(...services.map((service) => ({ url: SITE_URL + "/services/" + service.slug })))
  let projects = []
  try {
    const [{ default: connectDB }, { default: Project }] = await Promise.all([
      import("@/lib/dbConnect"), import("@/lib/model/Projects"),
    ])
    await connectDB()
    projects = await Project.find(publishedProjectFilter).select("slug images updatedAt").lean()
  } catch {
    // Source-managed case studies remain discoverable during a database outage.
    console.warn("Sitemap: database unavailable; listing source-managed projects only.")
  }
  const publicProjects = [...new Map([
    ...withPublicProjects(projects), ...getStaticProjects(),
  ].filter(project => project.slug).map(project => [project.slug, project])).values()]
  entries.push(...publicProjects.map((project) => ({
    url: SITE_URL + "/projects/" + encodeURIComponent(project.slug),
    ...(project.updatedAt ? { lastModified: project.updatedAt } : {}),
    images: getProjectSeoImages(project).map(image => absoluteUrl(image.url)),
  })))
  return entries
}
