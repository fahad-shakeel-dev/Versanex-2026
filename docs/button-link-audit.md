# Public button and link audit

The services dropdown's entire Tailored Solutions card, including “Talk to an expert”, now links to `/contact` and closes the dropdown. The existing “Begin Your Project” CTA also links to `/contact`. Desktop dropdowns support ArrowDown to open/focus their links and Escape to close/restore focus. Mobile menus close and reset after navigation or Escape.

The service-page share button now opens native sharing when supported and copies the current page URL otherwise. Clipboard failures do not display false success. Instagram and LinkedIn point to the configured VersaNex company profiles. Behance is removed, and TikTok stays out pending the profile URL, as requested. Noninteractive process rows no longer use a pointer cursor.

The floating WhatsApp link uses the same configured number in digits-only URL form, following the [official WhatsApp linking guidance](https://faq.whatsapp.com/425247423114725/).

The existing newsletter and home contact forms call Formspree after their local API requests. The content security policy now permits that configured endpoint. Newsletter success and error messages render inline, replacing toast calls that had no mounted notification container. The default footer layout remains unchanged before submission.

## Validation

- Production build and whitespace checks pass.
- The published database inventory confirms all 13 case-study slugs used by the project menus. Together with site pages and four active services, the public navigation contains 25 distinct page destinations.
- Chrome rendered 21 of those pages and verified their headings, canonical URLs, links, and same-page anchors. Four database-backed case-study paths were confirmed from the published inventory; subsequent metadata checks could not connect to MongoDB from this network. Project-list interactions use that read-only inventory and source-managed media as fixtures.
- The rendered audit found 80 distinct link targets with no empty links, bare `#` destinations, empty email links, or unknown internal page paths.
- At desktop and mobile widths, interaction checks pass for the expert contact CTA, dropdowns, keyboard opening/closing, mobile service/project navigation, share/copy, FAQ, works scroller, grid/list views, pagination, category filters, project-detail scrolling, newsletter success/error feedback, contact success/reset, home contact submission, and back-to-top.
- All form transports, native sharing, and clipboard writes were mocked. No real enquiries, subscriptions, external messages, or clipboard changes were made during verification.
- External project links retain their configured client URLs. Indus & Olive, University Portal, and Hotel Management System returned HTTP 200. The other seven client sites timed out from this environment; their availability remains unverified.

Reports and the source audit are under the ignored `artifacts/button-audit/` directory. Dormant team/demo components were not published or reactivated. Swiper navigation buttons use the existing navigation bindings rather than direct click handlers.
