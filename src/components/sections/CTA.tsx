
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading, Lead } from "@/components/ui/typography";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { productFacts } from "@/lib/site-data/product-facts";
import { illustration } from "@/lib/site-data/visual-assets";

const lineup = illustration("devices-lineup");

// The free trial promotion: an off-white band with the devices illustration beside the call to action.
export function CTA() {
  return (
    <Section tone="light" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading level={2} size="heading-lg">
              Start Your IPTV Free Trial Today
            </Heading>
            <Lead className="mt-4">
              Try OTTV free for 24 hours with full access to {productFacts.liveChannels} live channels and {productFacts.vodTitles} movies and TV shows. No card needed.
            </Lead>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/iptv-free-trial">
                  Get IPTV Free Trial
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
          <div className="reveal lg:col-span-7">
            <Image
              src={lineup.src}
              alt={lineup.alt}
              width={lineup.width}
              height={lineup.height}
              unoptimized
              loading="lazy"
              className="mx-auto h-auto w-full max-w-2xl"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
