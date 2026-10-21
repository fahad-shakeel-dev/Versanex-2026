import { notFound } from "next/navigation"
import { getProjectForSeo, getProjectSeoImages } from "@/lib/project-seo"
import { absoluteUrl, createBreadcrumbs, createPageMetadata, metaDescription, SITE_URL } from "@/lib/seo"
import StructuredData from "@/components/seo/StructuredData"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProjectForSeo(slug)
  if (!project) notFound()
  const description = metaDescription(project.description, "Explore this VersaNex project and the work behind it.")
  const image = getProjectSeoImages(project)[0]
  return createPageMetadata(project.title + " | VersaNex Projects", description, "/projects/" + encodeURIComponent(project.slug), image?.url ? { ...image, alt: image.alt || project.title } : undefined)
}

export default async function ProjectLayout({ children, params }) {
  const { slug } = await params
  const project = await getProjectForSeo(slug)
  if (!project) notFound()
  const path = "/projects/" + encodeURIComponent(project.slug)
  return <>
    <StructuredData data={createBreadcrumbs([
      { name: "Home", path: "/" }, { name: "Our Projects", path: "/projects" }, { name: project.title, path },
    ])} />
    <StructuredData data={{
      "@context": "https://schema.org", "@type": "CreativeWork",
      "@id": absoluteUrl(path) + "#project", url: absoluteUrl(path), name: project.title,
      description: metaDescription(project.description),
      creator: { "@id": `${SITE_URL}/#organization` },
      image: getProjectSeoImages(project).map(image => absoluteUrl(image.url)),
    }} />
    {children}
  </>
}
