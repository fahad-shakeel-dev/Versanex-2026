import assert from 'node:assert/strict'
import fs from 'node:fs/promises'

const origin = process.argv[2] || 'http://localhost:3003'
const source = (await fs.readFile(new URL('../lib/seo.js', import.meta.url), 'utf8')).replace(/^import \{ mediaUrl \} from "@\/lib\/media-url";?\r?\n/m, 'const mediaUrl = value => value\n')
const seo = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
const { SITE_URL, serializeJsonLd, metaDescription } = seo
assert.equal(metaDescription('<p>Software &amp; design</p>'), 'Software & design')
assert.equal(metaDescription(' <br> ', 'Fallback'), 'Fallback')
assert.ok(metaDescription('Long description '.repeat(30)).length <= 160)
assert.ok(!serializeJsonLd({ name: '</script><script>alert(1)</script>' }).includes('<'))
assert.equal(JSON.parse(serializeJsonLd({ name: '</script>' })).name, '</script>')
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]))
async function request(path, options = {}) {
  return fetch(new URL(path, origin), { signal: AbortSignal.timeout(90000), ...options })
}
const sitemapResponse = await request('/sitemap.xml')
assert.equal(sitemapResponse.status, 200, 'sitemap status')
const sitemap = await sitemapResponse.text()
const projectSource = await fs.readFile(new URL('../data/project-media.js', import.meta.url), 'utf8')
const { getStaticProjects } = await import(`data:text/javascript;base64,${Buffer.from(projectSource).toString('base64')}`)
for (const project of getStaticProjects()) {
  assert.ok(sitemap.includes(`${SITE_URL}/projects/${encodeURIComponent(project.slug)}`), `${project.slug}: source-managed project included`)
}
for (const [, image] of sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
  const url = new URL(decode(image))
  if (url.origin === SITE_URL) await fs.access(new URL('../public' + url.pathname, import.meta.url))
}
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => decode(url))
assert.ok(urls.length >= 21, '8 pages, 4 services, and at least 9 case studies')
assert.equal(new Set(urls).size, urls.length, 'no duplicate sitemap URLs')
assert.ok(!urls.some(url => /\/admin|\/ourteam|\/api\//.test(url)))
for (const [, date] of sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) assert.ok(Number.isFinite(Date.parse(date)), 'valid lastmod')
assert.ok(sitemap.includes('<image:loc>'), 'project image discovery')
const robots = await (await request('/robots.txt')).text()
assert.ok(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
assert.ok(robots.includes('Allow: /api/projects'))
const reports = []
for (const url of urls) {
  assert.equal(new URL(url).origin, SITE_URL, 'canonical sitemap host')
  const path = new URL(url).pathname
  const response = await request(path, { headers: { 'User-Agent': 'Googlebot' } })
  assert.equal(response.status, 200, path)
  const html = await response.text()
  assert.ok(/name="description"/.test(html.split('</head>')[0]), `${path}: description in initial head`)
  const metadata = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attrs(tag))
  const meta = name => metadata.find(item => item.name === name || item.property === name)?.content
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attrs(tag)).filter(item => item.rel === 'canonical')
  assert.equal(canonical.length, 1, `${path}: one canonical`)
  assert.equal(new URL(canonical[0].href).href, new URL(url).href, `${path}: canonical matches sitemap`)
  assert.ok(/<title>[^<]+<\/title>/.test(html), `${path}: title`)
  assert.ok(meta('description')?.trim(), `${path}: description`)
  assert.equal(new URL(meta('og:url')).href, new URL(url).href, `${path}: og:url`)
  assert.ok(meta('og:image')?.startsWith('https://'), `${path}: absolute og:image`)
  assert.equal(meta('og:locale'), 'en_US', `${path}: locale`)
  assert.equal(meta('twitter:card'), 'summary_large_image', `${path}: twitter`)
  assert.ok(!metadata.some(item => ['robots', 'googlebot'].includes(item.name) && /noindex/.test(item.content)), `${path}: indexable`)
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json))
  assert.ok(schemas.length, `${path}: structured data`)
  if (/^\/projects\//.test(path) || /^\/services\//.test(path)) {
    const breadcrumbs = schemas.find(item => item['@type'] === 'BreadcrumbList')
    assert.equal(breadcrumbs?.itemListElement.at(-1).item, url, `${path}: breadcrumbs`)
    assert.ok(schemas.some(item => ['CreativeWork', 'Service'].includes(item['@type'])), `${path}: entity schema`)
  }
  reports.push({ path, status: response.status, title: decode(html.match(/<title>(.*?)<\/title>/)?.[1] || ''), schemas: schemas.length })
  console.log(`PASS ${path}`)
}
assert.equal(new Set(reports.map(item => item.title)).size, reports.length, 'unique page titles')
for (const path of ['/about/ourteam', '/admin/login']) {
  const response = await request(path)
  const html = await response.text()
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attrs(tag))
  for (const name of ['robots', 'googlebot']) assert.ok(tags.some(item => item.name === name && /noindex/.test(item.content)), `${path}: ${name} noindex`)
}
for (const [old, current] of Object.entries({ 'custom-software': 'custom-software-development', 'saas-products': 'saas-development', 'mobile-apps': 'mobile-app-development', 'e-commerce': 'ecommerce-development' })) {
  const response = await request(`/services/${old}`, { redirect: 'manual' })
  assert.equal(response.status, 308)
  assert.equal(new URL(response.headers.get('location'), origin).pathname, `/services/${current}`)
}
for (const path of ['/not-a-real-page-seo-audit', '/services/not-a-real-service', '/projects/not-a-real-project']) {
  const response = await request(path)
  const html = await response.text()
  // Next can stream a not-found result after sending HTTP 200; it must emit noindex.
  assert.ok(response.status === 404 || /name="robots" content="noindex"/.test(html), `${path}: excluded missing route`)
}
const api = await request('/api/projects')
assert.equal(api.headers.get('x-robots-tag'), 'noindex')
const admin = await request('/admin', { redirect: 'manual' })
assert.equal(admin.headers.get('x-robots-tag'), 'noindex, nofollow')
await fs.mkdir('artifacts/seo', { recursive: true })
await fs.writeFile('artifacts/seo/routes.json', JSON.stringify(reports, null, 2))
console.log(`Verified ${reports.length} public pages, sitemap, image entries, robots, noindex, redirects, missing routes, and safe JSON-LD.`)
