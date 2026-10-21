import manifest from "@/data/cloudinary-media.json"

// This manifest contains public delivery URLs only; no Cloudinary credentials.
export function mediaUrl(source) {
  if (typeof source !== "string") return source
  if (manifest[source]) return manifest[source]
  if (!source.startsWith("/")) return source
  const pathname = source.split(/[?#]/, 1)[0]
  let decoded = pathname
  try { decoded = decodeURIComponent(pathname) } catch { /* Keep malformed paths unchanged. */ }
  const url = manifest[pathname] || manifest[decoded]
  if (!url) return source
  // Content-versioned CDN URLs replace local cache-busting query parameters.
  const fragment = source.indexOf("#")
  return fragment < 0 ? url : url + source.slice(fragment)
}
