const uploadUrl = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?!s--)/

export function isCloudinaryImage(src) {
  return typeof src === "string" && uploadUrl.test(src)
}

export default function cloudinaryImageLoader({ src, width, quality }) {
  // Cloudinary handles resizing and format selection without a Next.js fetch.
  return src.replace(uploadUrl, `$1f_auto,q_${quality || 75},c_limit,w_${width}/`)
}
