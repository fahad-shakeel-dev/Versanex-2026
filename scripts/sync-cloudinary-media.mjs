import fs from "node:fs/promises"
import path from "node:path"
import { createHash } from "node:crypto"
import { v2 as cloudinary } from "cloudinary"

const root = process.cwd()
const manifestPath = path.join(root, "data/cloudinary-media.json")
const mediaExtension = /\.(avif|gif|ico|jpe?g|png|svg|webp|mp4|webm|mov|m4v|ogg)$/i
const videoExtension = /\.(mp4|webm|mov|m4v|ogg)$/i
const hash = value => createHash("sha256").update(value).digest("hex")

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))
  return nested.flat()
}

const files = (await walk(path.join(root, "public"))).filter(file => mediaExtension.test(file)).sort()
const inventory = await Promise.all(files.map(async file => {
  const bytes = await fs.readFile(file)
  return { key: "/" + path.relative(path.join(root, "public"), file).replaceAll("\\", "/"),
    source: file, hash: hash(bytes), bytes: bytes.length, type: videoExtension.test(file) ? "video" : "image" }
}))

// Existing Cloudinary media already uses the CDN; import other source-managed photos.
const remoteUrls = new Set()
for (const directory of ["app", "components", "data", "lib"]) {
  for (const file of (await walk(path.join(root, directory))).filter(file => /\.(jsx?|mjs|tsx?)$/.test(file))) {
    const source = await fs.readFile(file, "utf8")
    for (const match of source.matchAll(/https:\/\/images\.unsplash\.com\/[^\s"'`<>)}\]]+/g)) remoteUrls.add(match[0])
  }
}
for (const url of [...remoteUrls].sort()) inventory.push({ key: url, source: url, hash: hash(url), bytes: 0, type: "image" })
const unique = [...new Map(inventory.map(item => [item.hash, item])).values()]
console.log(JSON.stringify({ localFiles: files.length, externalPhotos: remoteUrls.size, uniqueUploads: unique.length,
  localBytes: inventory.reduce((sum, item) => sum + item.bytes, 0), uniqueLocalBytes: unique.reduce((sum, item) => sum + item.bytes, 0),
  videos: inventory.filter(item => item.type === "video").length }))
if (process.argv.includes("--plan")) process.exit(0)

try { process.loadEnvFile(path.join(root, ".env")) } catch (error) { if (error.code !== "ENOENT") throw error }
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) throw new Error("Cloudinary environment variables are required")
cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET, secure: true })
let manifest = {}
try { manifest = JSON.parse(await fs.readFile(manifestPath, "utf8")) } catch (error) { if (error.code !== "ENOENT") throw error }
const report = [], failures = []
let completed = 0, cursor = 0
// A single queued writer keeps concurrent upload checkpoints consistent.
let writing = Promise.resolve()
function checkpoint() {
  const snapshot = JSON.stringify(Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))), null, 2) + "\n"
  writing = writing.then(() => fs.writeFile(manifestPath, snapshot))
  return writing
}
async function worker() {
  while (cursor < unique.length) {
    const item = unique[cursor++]
    const fingerprint = item.hash.slice(0, 24)
    const aliases = inventory.filter(candidate => candidate.hash === item.hash)
    const cached = aliases.map(alias => manifest[alias.key]).find(url => url?.includes("/" + fingerprint + "."))
    try {
      const result = cached ? { secure_url: cached, reused: true } : await cloudinary.uploader.upload(item.source, {
        public_id: "versanex-2026/media/" + fingerprint,
        resource_type: item.type === "video" ? "video" : "auto",
        overwrite: false, invalidate: false, timeout: 600000,
        tags: ["versanex-2026", "website-media"],
      })
      if (!result.secure_url?.startsWith("https://res.cloudinary.com/")) throw new Error("Missing secure delivery URL")
      for (const alias of aliases) manifest[alias.key] = result.secure_url
      await checkpoint()
      report.push({ paths: aliases.map(alias => alias.key), url: result.secure_url, bytes: result.bytes, reused: !!result.reused })
      console.log(JSON.stringify({ completed: ++completed, total: unique.length, path: item.key, aliases: aliases.length, reused: !!result.reused }))
    } catch (error) {
      // Do not serialize SDK request objects, headers, signatures, or credentials.
      failures.push({ path: item.key, httpStatus: error.http_code || null })
      console.log(JSON.stringify({ failed: item.key, httpStatus: error.http_code || null }))
    }
  }
}
await Promise.all(Array.from({ length: 3 }, worker))
await writing
if (!failures.length) {
  for (const filename of ["site.webmanifest", "favicon/site.webmanifest"]) {
    const file = path.join(root, "public", filename)
    const browserManifest = JSON.parse(await fs.readFile(file, "utf8"))
    browserManifest.icons = browserManifest.icons.map(icon => ({
      ...icon, src: manifest[`/android-chrome-${icon.sizes}.png`] || manifest[icon.src] || icon.src,
    }))
    await fs.writeFile(file, JSON.stringify(browserManifest) + "\n")
  }
}
await fs.mkdir(path.join(root, "artifacts/cloudinary-migration"), { recursive: true })
await fs.writeFile(path.join(root, "artifacts/cloudinary-migration/upload-report.json"), JSON.stringify({ report, failures }, null, 2))
console.log(JSON.stringify({ uploadedOrReused: completed, mappedPaths: Object.keys(manifest).length, failures: failures.length }))
if (failures.length) process.exitCode = 1
