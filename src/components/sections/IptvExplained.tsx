import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { illustration } from "@/lib/site-data/visual-assets";

// The product itself: a TV guide with channels, what is on now, catch-up on an earlier programme and the channel
// playing in a corner.
const tvGuide = illustration("explainer-tv-guide");

const blocks = [
  {
    title: "What is IPTV?",
    body: "IPTV stands for Internet Protocol Television: live TV channels and on-demand video delivered over your internet connection instead of a cable or satellite line. You watch through an app on your TV, streaming stick, phone or computer.",
  },
  {
    title: "What do you need?",
    body: "A stable internet connection, a compatible device and a player app. If streams buffer, a wired Ethernet connection and a restart of your devices often help.",
  },
];

export function IptvExplained() {
  return (
    <Section tone="light">
      <Container>
        <SectionHeader
          title="IPTV Service Explained"
          subtitle="What IPTV is and what you need to start watching. How ordering works is in the steps above."
        />
        {/* From 1024px the drawing and the two answers sit side by side; below that the drawing comes first. */}
        <div className="grid gap-4 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="overflow-clip rounded-card-lg lg:col-span-7">
            <Image
              src={tvGuide.src}
              alt={tvGuide.alt}
              width={tvGuide.width}
              height={tvGuide.height}
              unoptimized
              className="h-auto w-full"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {blocks.map((block) => (
              <Card key={block.title} className="reveal p-6 md:p-8">
                <Heading level={3} size="heading">{block.title}</Heading>
                <p className="mt-4 max-w-xl text-muted-foreground">{block.body}</p>
              </Card>
            ))}
          </div>
        </div>
        {/* With the button under the FAQ, one of the page's two actions between the plans and the closing free-trial
            band: on a phone that stretch ran about fifteen screens with nothing to tap. Right after the explainer, a
            newcomer is ready to try it. */}
        <div data-fab-avoid className="mt-10 flex flex-wrap gap-3">
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
        <p className="mt-8 max-w-narrow text-body text-muted-foreground">
          Ready to set up? Start with the{" "}
          <Link href="/devices/fire-tv" className="text-link">Fire TV</Link>,{" "}
          <Link href="/devices/samsung-tv" className="text-link">Samsung TV</Link> or{" "}
          <Link href="/devices/android" className="text-link">Android</Link> guide, or read the{" "}
          <Link href="/devices/troubleshooting" className="text-link">buffering guide</Link>.
        </p>
      </Container>
    </Section>
  );
}
