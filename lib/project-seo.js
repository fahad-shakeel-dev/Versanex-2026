import { cache } from "react"
import { existsSync } from "node:fs"
import { resolve, sep } from "node:path"
import { getStaticProject } from "@/data/project-media"

export const publishedProjectFilter = {
  $or: [{ publishStatus: "published" }, { publishStatus: { $exists: false } }],
}

// Metadata must not advertise missing local assets; visible project media stays intact.
export function getProjectSeoImages(project) {
  const publicDirectory = resolve(process.cwd(), "public") + sep
  const seen = new Set()
  return [project.homeImage, ...(project.images || [])].filter(image => {
    if (!image?.url || seen.has(image.url)) return false
    if (image.url.startsWith("/")) {
      const file = resolve(publicDirectory, "." + decodeURIComponent(new URL(image.url, "https://www.versanex.site").pathname))
      if (!file.startsWith(publicDirectory) || !existsSync(file)) return false
    } else if (!/^https?:\/\//i.test(image.url)) return false
    seen.add(image.url)
    return true
  })
}

export const getProjectForSeo = cache(async (slug) => {
  const staticProject = getStaticProject(slug)
  if (staticProject) return staticProject
  const [{ default: connectDB }, { default: Project }] = await Promise.all([
    import("@/lib/dbConnect"), import("@/lib/model/Projects"),
  ])
  await connectDB()
  return Project.findOne({ slug, ...publishedProjectFilter }).select("title slug description images updatedAt").lean()
})
