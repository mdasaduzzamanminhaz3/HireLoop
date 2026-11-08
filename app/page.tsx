import { CtaSection } from "@/components/Home/CtaSection";
import { FeaturesSection } from "@/components/Home/FeaturesSection";
import { HeroSection } from "@/components/Home/HeroSection";
import { JobDiscoverySection } from "@/components/Home/JobDiscoverySection";
import { PricingSection } from "@/components/Home/PricingSection";

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
