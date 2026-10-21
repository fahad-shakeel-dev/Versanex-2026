import InformationPage from "@/components/information/InformationPage"
import { privacyData } from "@/data/information-pages"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata("Privacy policy | VersaNex", "How we collect, use, and protect your information when you visit our website or work with VersaNex.", "/privacy-policy")

export default function LegalPage() {
  return (
    <InformationPage
      path="/privacy-policy"
      eyebrow="The details matter"
      title="Privacy policy."
      intro="How we collect, use, and protect your information when you visit our website or work with VersaNex."
      lastUpdated="October 7, 2026"
      sections={privacyData.map((section, index) => ({ ...section, id: "privacy-policy-section-" + (index + 1) }))}
      contactTitle="Questions about your privacy?"
      contactCopy="Get in touch with our team for clarification about this policy or how your information is handled."
    />
  )
}
