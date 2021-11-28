import { useRouter } from "next/router"
import Hero from "@/components/sections/hero"
import LargeVideo from "@/components/sections/large-video"
import FeatureColumnsGroup from "@/components/sections/feature-columns-group"
import FeatureRowsGroup from "@/components/sections/feature-rows-group"
import BottomActions from "@/components/sections/bottom-actions"
import TestimonialsGroup from "@/components/sections/testimonials-group"
import FeatureImage from "@/components/sections/feature-image-group"
import FeatureContactGroup from "@/components/sections/feature-contact-group"
import FeaturedPriceGroup from "@/components/sections/featured-price-group"
import CareerContentGroup from "@/components/sections/career-content-group"
import TeamFeatureGroup from "@/components/sections/team-feature-group"
import FeaturedSalesGroup from "@/components/sections/featured-sales-group"
import FeaturedLocationGroup from "@/components/sections/featured-location-group"
import FeaturedSocialMediaGroup from "@/components/sections/featured-social-media-group"
import FeaturedEmailContactGroup from "@/components/sections/featured-email-contact-group"
import FeaturedLoginPage from "@/components/sections/featured-login-page"
import FeaturedSignUpPage from "@/components/sections/featured-sign-up-page"
import EmailContactForm from "@/components/sections/email-contact-form"
import RichText from "./sections/rich-text"
import Pricing from "./sections/pricing"
import LeadForm from "./sections/lead-form"

// Map Strapi sections to section components
const sectionComponents = {
  "sections.hero": Hero,
  "sections.large-video": LargeVideo,
  "sections.feature-columns-group": FeatureColumnsGroup,
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.bottom-actions": BottomActions,
  "sections.testimonials-group": TestimonialsGroup,
  "sections.rich-text": RichText,
  "sections.pricing": Pricing,
  "sections.lead-form": LeadForm,
  "sections.featured-images-row":  FeatureImage, 
  "sections.featured-contact-section": FeatureContactGroup,
  'sections.product-card-group': FeaturedPriceGroup, 
  "sections.career-content-group": CareerContentGroup, 
  "sections.featured-team-group": TeamFeatureGroup, 
  "sections.featured-sales-group": FeaturedSalesGroup, 
  "sections.featured-location-group": FeaturedLocationGroup,
  "sections.social-media-feature-group": FeaturedSocialMediaGroup,
  "sections.featured-email-contact-group": FeaturedEmailContactGroup,
  "sections.email-contact-form": EmailContactForm,
  "sections.login-form": FeaturedLoginPage,
  "sections.signupform": FeaturedSignUpPage,
  
}

// Display a section individually
const Section = ({ sectionData }) => {
  // console.log("sectionData", sectionData)
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__component]

  if (!SectionComponent) {
    return null
  }

  // Display the section
  return <SectionComponent data={sectionData} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  )
}

// Display the list of sections
const Sections = ({ sections, preview }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          sectionData={section}
          key={`${section.__component}${section.id}`}
        />
      ))}
    </div>
  )
}

export default Sections
