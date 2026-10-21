# Latest SEO and Best Practices audit

October 20, 2026. Local Next.js production build, Lighthouse 13.5.0. These results measure automated SEO and Best Practices checks; they are not a ranking guarantee or a performance score. No deployment was performed.

## Changes

- Consistent canonical URLs, Open Graph locale, Twitter image alternatives, and project-specific social previews using existing images.
- Project snippets strip database HTML and truncate at word boundaries. Visible descriptions stay unchanged.
- Service and project structured data with breadcrumb trails, escaped safely for inline JSON-LD.
- Sitemap includes all nine source-managed case studies and current published database projects, with image entries and existing modification dates. Source-managed pages remain listed if the database is unavailable.
- Missing local files are excluded from the new metadata and sitemap image entries.
- Metadata is sent in the initial HTML head for every client, including database-backed project pages. This prevents streamed descriptions from being missed by metadata readers.
- Public pages permit large image previews. Team and admin pages retain noindex for general and Google-specific directives; API and admin responses also include X-Robots-Tag.
- An empty alt fallback fixes the service gallery's absent alt attributes without changing image sources, dimensions, styling, or visible copy.

## Verification

- Production build passes. The existing configuration skips TypeScript and lint checks; existing jose Edge Runtime warnings remain.
- The reusable check in [scripts/audit-seo.mjs](../scripts/audit-seo.mjs) passes for all 25 public sitemap URLs. It checks response status, unique titles, descriptions in the initial head, canonicals, social tags, indexability, structured data, breadcrumb destinations, source-managed project coverage, sitemap image files, robots, exclusions, six permanent redirects, missing routes, and JSON-LD serialization.
- Database connectivity verified with network access. A restricted-network run also confirmed that the sitemap returns source-managed pages during a database connection failure.
- Browser checks at 390 px and 1440 px covered the six main public pages, four service details, and thirteen project details. No horizontal overflow or uncaught JavaScript errors were observed. Forms were not submitted.
- Before/after hashes cover 287 existing files. All original public assets, stylesheets, and page bodies are byte-for-byte unchanged. Existing component code is unchanged except the service gallery's alt fallback and final newline. Existing project-data content is unchanged except a new read-only inventory helper. See [preservation evidence](../artifacts/seo/preservation.json).

## Automated results

| Page | Mode | SEO | Best Practices | Evidence |
| --- | --- | ---: | ---: | --- |
| / | desktop | 100 | 100 | [report](../artifacts/seo/lighthouse-home-desktop.report.html) |
| / | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-home-mobile.report.html) |
| /about | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-about-mobile.report.html) |
| /contact | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-contact-mobile.report.html) |
| /faqs | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-faqs-mobile.report.html) |
| /privacy-policy | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-privacy-policy-mobile.report.html) |
| /projects | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-projects-mobile.report.html) |
| /projects/apex-ielts-writing | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-apex-ielts-writing-mobile.report.html) |
| /projects/callmind-ai-voice-calling-platform | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-callmind-ai-voice-calling-platform-mobile.report.html) |
| /projects/finance-flow-finance-management-system | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-finance-flow-finance-management-system-mobile.report.html) |
| /projects/fixit-your-ai-powered-home-services-companion | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-fixit-your-ai-powered-home-services-companion-mobile.report.html) |
| /projects/food-delivery-web-app | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-food-delivery-web-app-mobile.report.html) |
| /projects/hotel-management-system | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-hotel-management-system-mobile.report.html) |
| /projects/luxurystay | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-luxurystay-mobile.report.html) |
| /projects/mahal-foret-hayat | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-mahal-foret-hayat-mobile.report.html) |
| /projects/maxcoat | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-maxcoat-mobile.report.html) |
| /projects/real-time-chat | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-real-time-chat-mobile.report.html) |
| /projects/seo-master-dashboard | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-seo-master-dashboard-mobile.report.html) |
| /projects/time-center-modern-watch-retail-website | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-time-center-modern-watch-retail-website-mobile.report.html) |
| /projects/university-portal | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-university-portal-mobile.report.html) |
| /services | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-services-mobile.report.html) |
| /services/custom-software-development | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-custom-software-development-mobile.report.html) |
| /services/ecommerce-development | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-ecommerce-development-mobile.report.html) |
| /services/mobile-app-development | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-mobile-app-development-mobile.report.html) |
| /services/ui-ux-design | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-ui-ux-design-mobile.report.html) |
| /terms-of-use | mobile | 100 | 100 | [report](../artifacts/seo/lighthouse-terms-of-use-mobile.report.html) |

## Existing image limitations preserved

Five Finance Flow image files referenced by the existing project data are absent from the checkout: 04-register-laptop.webp, 05-features-monitor.webp, 06-features-phone.webp, 07-expenses-monitor.webp, and 08-device-showcase.webp. They are excluded from SEO image metadata. Visible references and gallery behavior were retained because restoring or replacing those files would change the displayed content.

The existing service gallery receives image URL strings while its renderer reads object properties (item.src). Its twelve repeated gallery image elements therefore have no source. This was retained to preserve the current visible tiles; only missing alt attributes were addressed. Automated 100 scores do not establish that every existing gallery image works.

Some restricted-browser checks also reported network-blocked Cloudinary images. The database-page Lighthouse rechecks use network access to separate environmental failures from application failures.

## Re-run

Run npm.cmd run build, then npm.cmd run start -- -p 3003. In another terminal run node scripts/audit-seo.mjs http://localhost:3003. Access to the configured database is needed to verify the complete live project inventory. Reports and screenshots are in the ignored artifacts/seo directory.

After deployment, recheck the live sitemap and submit it in Search Console using the existing [Google Search update instructions](google-search-update.md).

References: [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [metadata delivery configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots), [JSON-LD](https://nextjs.org/docs/app/guides/json-ld), [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
