# Production performance checks

Measure the production build, rather than the development server:

```powershell
npm.cmd run build
npm.cmd run start -- -p 3001
```

In a second terminal, run mobile and desktop separately so the browser runs do not compete for CPU:

```powershell
npm.cmd exec --yes --package=lighthouse -- lighthouse http://localhost:3001 --output=html --output=json --output-path=./artifacts/lighthouse-mobile-final
npm.cmd exec --yes --package=lighthouse -- lighthouse http://localhost:3001 --preset=desktop --output=html --output=json --output-path=./artifacts/lighthouse-desktop-final
```

The server needs outbound access to fetch the existing Cloudinary and Unsplash images. Keep generated reports under `artifacts/`, which is ignored by Git.

For manual Chrome audits, use a Guest window or a fresh profile with extensions disabled. Audit the `next start` production address. A report containing `scheduler.development.js`, `main-app.js?v=...`, hot-reload WebSockets, and development CSS paths is measuring `next dev`. Scripts with `chrome-extension://` URLs, including VPN and ad-blocker scripts, come from the browser profile rather than this website. These add work to the audit and prevent a fair comparison with the clean production reports.

## Changes

- Enabled responsive Next image optimization across service and project cards.
- Reduced the decorative video poster from 526,380 bytes to 45,522 bytes.
- Discover intro and hero video sources in the initial HTML, preload them, and play the hero beneath the intro. Keep later video panels lazy and pause loops offscreen or in a background tab.
- Load below-the-fold section JavaScript as visitors approach those sections. Preserve direct contact and other section hash links.
- Avoid mounting the desktop scroll scene on mobile. Reserve its desktop height before initialization to prevent a layout shift.
- Update the process animation's React state only when a step activates; keep the line animation and activation thresholds.
- Serve the identical Geist font files locally with explicit preload links and their original license.
- Make service link descriptions available to crawlers and assistive technology while keeping their visible labels.
- Improve the contrast of muted labels, avoid repeated Instagram iframe polling, and avoid requesting missing placeholder logos.
- Keep production source maps and security headers; remove development-only `unsafe-eval` from the production CSP.
- Avoid loading Google Analytics repeatedly during client navigation. Preserve consent checks and page-view tracking.
- Prevent the popup's initial closed state from resetting the visitor's scroll position.

The intro timing, scroll animations, Instagram embeds, forms, routes, and primary interactions are retained. Lighthouse results cover a fresh visitor's initial home-page navigation; third-party embeds and consented analytics can introduce additional work and cookies when loaded later.

## Local home-page results

Lighthouse 13.5.0, local production build, October 8, 2026. Mobile and desktop used their respective default Lighthouse emulation and throttling settings.

| Category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 73 | 99 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Home-page initial JavaScript decreased from 250 KB to 182 KB in the Next build summary. The final mobile report shows LCP 4.4 s, TBT 480 ms, and CLS 0.008. Desktop CLS is 0.012.

Reports: [mobile](../artifacts/lighthouse-mobile-final.report.html), [desktop](../artifacts/lighthouse-desktop-final.report.html). Deploy the changes before comparing a fresh production audit against the originally supplied report.

## Verification and limits

The production build passes. Browser checks cover 320, 390, 768, and 1440-pixel widths, desktop/mobile scene selection, horizontal overflow, font loading, visible broken images, JavaScript errors, and contact hash navigation. The contact form still offers the same four approved services. No form submissions were sent during verification.

The unchanged intro deliberately delays the main video reveal. Its render delay and JavaScript hydration remain mobile performance bottlenecks, although the hero video now loads and starts during the intro. A perfect performance score would require further decisions about the intro, media, and startup interactions. Local results do not guarantee deployed scores or accessibility beyond the automated checks.

## Hero video startup

The versioned streaming copies retain the complete 43.5-second sequence. Desktop retains the original 1920-by-872 resolution and mobile uses 960-by-436. Both remove unused audio, use one-second keyframe intervals, and place MP4 metadata before video data for progressive playback. The original video files and fallback poster remain available unchanged.

- Desktop: 46,784,794 bytes to 14,306,620 bytes, about 69% smaller.
- Mobile: 46,784,794 bytes to 4,310,303 bytes, about 91% smaller.
- Explicit responsive sources let the browser discover the matching video before hydration; the main hero no longer waits for the intro to finish before loading.
- Versioned streaming assets support byte-range requests and immutable caching. The later projects-panel player stays lazy.

Local production checks passed at 390, 1440, and 2600 pixels, including source selection, playback before the intro finishes, the handoff to an already-playing hero, no horizontal overflow, and no JavaScript errors. An isolated cold-cache Chrome test at 1.6 Mbps with 100 ms latency measured first playback at 1,409 ms for the original file, 484 ms for the desktop copy, and 367 ms for the mobile copy. These video-only measurements exclude page JavaScript and production CDN conditions; they do not guarantee startup times on every connection or autoplay policy.

Verification artifacts: `artifacts/hero-video-startup/verification.json` and screenshots in the same ignored directory. The production build passes.

See [Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) and [Next image optimization](https://nextjs.org/docs/app/api-reference/components/image).

## Recheck of the supplied development report

The supplied report lists development React and Next chunks, a hot-reload WebSocket, and Chrome extension scripts. It is not directly comparable to a clean production audit. A subsequent clean production recheck of the same build measured mobile Performance 70 and desktop Performance 92; Accessibility, Best Practices, and SEO were 100 for both. This also illustrates the variation between individual performance runs.

Desktop LCP: 1.3 s; TBT: 110 ms. Mobile LCP: 4.5 s; TBT: 570 ms.

Recheck reports: [mobile](../artifacts/lighthouse-mobile-recheck.report.html), [desktop](../artifacts/lighthouse-desktop-recheck.report.html).
