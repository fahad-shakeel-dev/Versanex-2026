# Active service lineup

The public service lineup is defined in `data/service-slugs.js`, in this order:

1. Custom Software Development
2. Web Development
3. SaaS Development
4. Mobile App Development

Both the service catalog and navigation use this shared selection. Homepage cards, the services listing, contact-page radio choices, the home contact selector, and service sitemap entries derive from the active catalog. Service icons, FAQs, SEO descriptions, and service enumerations in the information pages match the lineup.

Web and SaaS use their existing detailed content at `/services/web-development` and `/services/saas-development`. Their former redirects to Custom Software Development are removed, and `/services/saas-products` now redirects to the SaaS page. Existing UI/UX and e-commerce detail URLs remain available for bookmarks, while those services are no longer promoted in the active lineup. Project categories and historical project descriptions remain unchanged.

Validation: the production build passes. Source checks cover the shared order, FAQ categories, and existing Cloudinary image mappings. Chrome checks at 390 and 2600 pixels cover all four detail pages, desktop/mobile menus, homepage and services cards, both contact forms' service choices, FAQ headings, and horizontal overflow. All four active service URLs return HTTP 200 without a redirect and have their own production canonical URL and matching Service structured data. Legacy detail URLs still return HTTP 200, and the SaaS alias redirects to the correct page.

Reports and screenshots are under the ignored `artifacts/service-lineup/` directory. Browser API responses were stubbed and external media requests blocked for these navigation checks; no forms were submitted.
