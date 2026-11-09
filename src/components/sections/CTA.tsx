
import { Button } from "@/components/ui/button";
import { Callout } from "../shared/Callout";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { Reveal } from "../shared/Reveal";
import Link from "next/link";
import { productFacts } from "@/lib/site-data/product-facts";

export function CTA() {
  return (
    <Section spacing="compact" className="isolate overflow-x-clip">
      <Container>
        <Reveal>
          <Callout
            size="large"
            title="Start Your IPTV Free Trial Today"
            action={
              <Button asChild size="lg">
                <Link href="/iptv-free-trial">IPTV Free Trial</Link>
              </Button>
            }
          >
            Try OTTV free for 24 hours with full access to {productFacts.liveChannels} live channels and {productFacts.vodTitles} movies and TV shows. No card needed.
          </Callout>
        </Reveal>
      </Container>
    </Section>
  );
}
