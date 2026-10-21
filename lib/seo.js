export const SITE_URL = "https://www.versanex.site"
export const SITE_TITLE = "VersaNex | Software Development & Digital Product Design"
export const SITE_DESCRIPTION = "VersaNex specializes in custom software development, mobile app development, UI/UX design, and e-commerce solutions for growing businesses."

export function absoluteUrl(path) {
  return new URL(path, SITE_URL).href
}

// Keep database HTML out of snippets without changing the displayed project copy.
export function metaDescription(value, fallback = SITE_DESCRIPTION) {
  const text = String(value || "").replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ").replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'").replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim()
  if (!text) return fallback
  return text.length <= 160 ? text : text.slice(0, 157).replace(/\s+\S*$/, "") + "..."
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

export function createBreadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem", position: index + 1, name, item: absoluteUrl(path),
    })),
  }
}

export function createPageMetadata(title, description, path, image) {
  const images = image?.url ? [{ ...image, url: absoluteUrl(image.url) }] : [
    { url: absoluteUrl("/og-image.jpeg"), width: 1200, height: 630, alt: "VersaNex - Software Development & Digital Product Design" },
  ]
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title, description, url: absoluteUrl(path), siteName: "VersaNex", type: "website", locale: "en_US",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map(({ url, alt }) => ({ url, alt })) },
  }
}
