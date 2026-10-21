import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";
import { LazyPortfolio, LazyProcess, LazyBrands, LazyContact, LazyPopup } from "@/components/HomeDeferredSections";
// import { LazyInstagram } from "@/components/HomeDeferredSections";

import { createPageMetadata, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata = createPageMetadata(SITE_TITLE, SITE_DESCRIPTION, "/");

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex flex-col">
        <Hero />

        <LazyPortfolio />

        <Services />

        <LazyProcess />

        <LazyBrands />

        {/* <LazyInstagram /> */}

        <LazyContact />
      </main>

      <LazyPopup />

      <Footer />
    </>
  );
}
