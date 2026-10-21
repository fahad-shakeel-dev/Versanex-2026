import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/data/services"
import { absoluteUrl, createBreadcrumbs, createPageMetadata, SITE_URL } from "@/lib/seo"
import StructuredData from "@/components/seo/StructuredData"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()
  return createPageMetadata(service.title + " | VersaNex", service.description, "/services/" + service.slug)
}

export default async function ServiceLayout({ children, params }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()
  const path = "/services/" + service.slug
  return <>
    <StructuredData data={createBreadcrumbs([
      { name: "Home", path: "/" }, { name: "Our Services", path: "/services" }, { name: service.title, path },
    ])} />
    <StructuredData data={{
      "@context": "https://schema.org", "@type": "Service",
      "@id": absoluteUrl(path) + "#service", url: absoluteUrl(path), name: service.title,
      description: service.description, serviceType: service.title,
      provider: { "@id": `${SITE_URL}/#organization` },
    }} />
    {children}
  </>
}
