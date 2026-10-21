import InformationPage from "@/components/information/InformationPage"
import { termsData } from "@/data/information-pages"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata("Terms of use | VersaNex", "The terms that apply when you use our website and services. Please read them carefully before working with VersaNex.", "/terms-of-use")

export default function LegalPage() {
  return (
    <InformationPage
      path="/terms-of-use"
      eyebrow="The details matter"
      title="Terms of use."
      intro="The terms that apply when you use our website and services. Please read them carefully before working with VersaNex."
      lastUpdated="October 7, 2026"
      sections={termsData.map((section, index) => ({ ...section, id: "terms-of-use-section-" + (index + 1) }))}
      contactTitle="Let us clarify the details."
      contactCopy="Have a question about these terms or your project agreement? Our team is here to help."
    />
  )
}
