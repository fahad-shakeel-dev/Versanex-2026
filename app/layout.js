import "./globals.css";
import { Suspense } from "react";
import GoogleAnalytics from '@/components/GoogleAnalytics'
import MetaAnalytics from "@/components/MetaAnalytics";
import WhatsappButton from '@/components/WhatsappButton'
import CookieBaner from '@/components/CookieBanner'
import LenisProvider from '@/components/LenisProvider'

import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { mediaUrl } from "@/lib/media-url";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "VersaNex",
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: mediaUrl("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { url: mediaUrl("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: mediaUrl("/favicon.ico") },
    ],
    apple: [
      { url: mediaUrl("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "android-chrome",
        url: mediaUrl("/android-chrome-192x192.png"),
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: mediaUrl("/android-chrome-512x512.png"),
        sizes: "512x512",
      },
    ],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.versanex.site/",
    siteName: "VersaNex",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: mediaUrl("/og-image.jpeg"),
        width: 1200,
        height: 630,
        alt: "VersaNex — Software House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@VersaNex",
    images: [mediaUrl("/og-image.jpeg")],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preload" href="/fonts/geist-sans-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/geist-mono-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "VersaNex", url: SITE_URL, logo: mediaUrl("/logo.png"), description: SITE_DESCRIPTION },
              { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "VersaNex", url: SITE_URL, inLanguage: "en", publisher: { "@id": `${SITE_URL}/#organization` } },
            ],
          }).replace(/</g, "\\u003c") }}
        />
        <MetaAnalytics/>
        <GoogleAnalytics/>
        {/* <Suspense fallback={null}>{children}</Suspense> */}
        <Suspense fallback={null}> <LenisProvider>{children}</LenisProvider></Suspense>
        <CookieBaner/>
        <WhatsappButton/>
      </body>
    </html>
  );
}
