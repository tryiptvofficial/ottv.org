import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero";
import { Brands } from "@/components/sections/Brands";
import { Pricing } from "@/components/sections/Pricing";
import { Devices } from "@/components/sections/Devices";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { IptvExplained } from "@/components/sections/IptvExplained";
import { Features } from "@/components/sections/Features";
import { FAQ } from "@/components/sections/FAQ";
import { WhyOttv } from "@/components/sections/WhyOttv";
import { Worldwide } from "@/components/sections/Worldwide";
import { CTA } from "@/components/sections/CTA";
import { ContentCarouselSkeleton } from "@/components/shared/ContentCarousel";
import { Schema } from "@/components/shared/Schema";
import { getHomePageData } from "@/lib/data/home-page";

const WeeklyBuzz = dynamic(() => import('@/components/sections/WeeklyBuzz').then(mod => mod.WeeklyBuzz), {
  loading: () => <ContentCarouselSkeleton />,
});

const SportEvents = dynamic(() => import('@/components/sections/SportEvents').then(mod => mod.SportEvents), {
  loading: () => <ContentCarouselSkeleton />,
});

export default async function Home() {
  const { weeklyBuzzItemsWithPlaceholders, sportEventsWithPlaceholders, productSchema } = await getHomePageData();

  return (
    <>
      <Schema id="product" schema={productSchema} />
      <Hero />
      <Brands />
      <Pricing />
      <Devices />
      <HowItWorks />
      <Comparison />
      <IptvExplained />
      <Features />
      <WeeklyBuzz items={weeklyBuzzItemsWithPlaceholders} />
      <SportEvents items={sportEventsWithPlaceholders} />
      <FAQ />
      <WhyOttv />
      <Worldwide />
      <CTA />
    </>
  );
}
