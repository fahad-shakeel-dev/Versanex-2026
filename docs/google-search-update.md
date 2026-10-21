# Update VersaNex in Google Search

The links below the main Google result are automated sitelinks. Google decides their labels, order, and whether to show them. These changes help it understand the current website; they do not force a particular result.

## Prepared in this project

- A current home title and description covering software development and digital product design.
- Separate titles, descriptions, canonical URLs, and social metadata for About Us, Our Services, Our Projects, Contact Us, FAQs, individual services, and published project pages.
- Correct canonical domain: https://www.versanex.site.
- Sitemap at /sitemap.xml listing current public pages, four services, and published projects. Project modification dates come from the database; the sitemap reads the current published projects when requested.
- Robots file at /robots.txt pointing to the sitemap and allowing public project data needed to render the site.
- Organization and WebSite structured data identifying VersaNex.
- Our Team marked noindex and excluded from the sitemap. FAQs remain searchable.
- Administrative pages marked noindex.
- Current service links and permanent redirects for outdated and retired service URLs.
- Home Services and footer links included in the initial HTML for discovery.

## After deploying

1. Deploy this updated project to the live versanex.site website. Google cannot index localhost or code that has not been deployed.
2. Check https://www.versanex.site/sitemap.xml and https://www.versanex.site/robots.txt on the live domain.
3. Open Google Search Console and select the property for versanex.site. Under Sitemaps, submit sitemap.xml.
4. In URL Inspection, inspect the home page, /about, /services, /projects, /contact, and the service pages. Test the live URL, then request indexing for the updated public pages.
5. Check the Page indexing report for issues. Let Google recrawl and process the updates. This can take days to weeks; exact sitelinks and timing are not guaranteed.
6. Our Team should disappear after Google recrawls its noindex page. Keep that page crawlable so Google can see noindex; deleting only its navigation link does not remove an indexed result.

Suggested current sitelink destinations are About Us, Our Services, Our Projects, and Contact Us; FAQs and specific services can also be selected by Google. Home-only sections such as How It Works are not separate pages. Google may choose section links, but those cannot be configured directly.

If an old removed service still appears, check its exact URL in Search Console. An equivalent replacement should use a permanent redirect; a page with no replacement should return 404 or 410. Do not redirect every deleted page to the homepage.

## Official guidance

- Sitelinks: https://developers.google.com/search/docs/appearance/sitelinks
- Submit a sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Request recrawling: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
