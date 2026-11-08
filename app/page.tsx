import { CtaSection } from "@/components/CtaSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { JobDiscoverySection } from "@/components/JobDiscoverySection";
import { PricingSection } from "@/components/PricingSection";

export default function Page() {
  return (
    <div>
      <HeroSection/>
      <JobDiscoverySection/>
      <FeaturesSection/>
      <PricingSection/>
      <CtaSection/>
    </div>
  )
}
