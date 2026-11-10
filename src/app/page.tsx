import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Devices } from "@/components/sections/Devices";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { IptvExplained } from "@/components/sections/IptvExplained";
import { Features } from "@/components/sections/Features";
import { FAQ } from "@/components/sections/FAQ";
import { WhyOttv } from "@/components/sections/WhyOttv";
import { CTA } from "@/components/sections/CTA";
import { Schema } from "@/components/shared/Schema";
import { generateSubscriptionProductSchema, generateWebPageSchema } from "@/lib/schema";
import { LastUpdated } from "@/components/shared/LastUpdated";

export default function Home() {
  const productSchema = generateSubscriptionProductSchema();

  return (
    <>
      <Schema id="webpage" schema={generateWebPageSchema({ type: "WebPage", path: "", name: "OTTV IPTV service", aboutProduct: true })} />
      <Schema id="product" schema={productSchema} />
      <Hero />
      <Pricing />
      <Devices />
      <HowItWorks />
      <Comparison />
      <IptvExplained />
      <Features />
      <FAQ />
      <WhyOttv />
      <CTA />
      <LastUpdated />
    </>
  );
}
