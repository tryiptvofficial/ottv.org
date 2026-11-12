import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Devices } from "@/components/sections/Devices";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyOttv } from "@/components/sections/WhyOttv";
import { IptvExplained } from "@/components/sections/IptvExplained";
import { SetupGuides } from "@/components/sections/SetupGuides";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Comparison } from "@/components/sections/Comparison";
import { Schema } from "@/components/shared/Schema";
import { generateSubscriptionProductSchema, generateWebPageSchema } from "@/lib/schema";
import { LastUpdated } from "@/components/shared/LastUpdated";

// The order follows the visitor's decision: the offer and the plans, then how ordering works, why OTTV and what
// IPTV is, the devices with a row of setup guides, answers to questions, the comparison with cable (in place of
// testimonials, which OTTV cannot verify), and the free trial to close. Black and off-white bands alternate; two
// groups share a band on purpose: the plans with how ordering works (off-white), and the devices with their setup
// guides (black).
export default function Home() {
  const productSchema = generateSubscriptionProductSchema();

  return (
    <>
      <Schema id="webpage" schema={generateWebPageSchema({ type: "WebPage", path: "", name: "OTTV IPTV service", aboutProduct: true })} />
      <Schema id="product" schema={productSchema} />
      <Hero />
      <Pricing />
      <HowItWorks flushTop />
      <WhyOttv />
      <IptvExplained />
      <Devices />
      <SetupGuides flushTop />
      <FAQ />
      <Comparison />
      <CTA />
      <LastUpdated />
    </>
  );
}
