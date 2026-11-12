import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { Callout } from "@/components/shared/Callout";
import { Container } from "@/components/shared/Container";
import { GuideCard } from "@/components/shared/GuideCard";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { PageHeader } from "@/components/shared/PageHeader";
import { Schema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { guideGroupIcons } from "@/components/shared/guide-group-icons";
import { getSafeArticleData } from "@/lib/how-to";
import { generateBreadcrumbSchema, generateItemListSchema, generateWebPageSchema } from "@/lib/schema";
import { generateMetadata as generatePageMetadata, siteConfig } from "@/lib/site-config";
import { guideGroups } from "@/lib/site-data/devices";
import { productFacts } from "@/lib/site-data/product-facts";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "IPTV Setup Guides for Every Device | OTTV",
    description: "Step-by-step IPTV setup guides for Fire TV, Samsung and LG TVs, Apple TV, Roku, MAG, Android, iPhone, Windows and Mac, plus fixes for buffering.",
    canonical: "/devices",
  });
}

// Each guide once, in group order (iPhone and iPad share the iOS guide).
const groups = guideGroups.map((group) => {
  const ids = [...new Set(group.guides.map((guide) => guide.id))];
  const guides = ids.flatMap((id) => {
    const article = getSafeArticleData(id);
    return article ? [{ id, title: article.title, description: article.description }] : [];
  });
  return { ...group, guides };
});

const allGuides = groups.flatMap((group) => group.guides);

/** The setup-guides hub: every guide, grouped by kind of device. */
export default function SetupGuidesPage() {
  const base = siteConfig.url;

  return (
    <>
      <Schema id="webpage" schema={generateWebPageSchema({ type: "CollectionPage", path: "/devices", name: "IPTV Setup Guides" })} />
      <Schema
        id="breadcrumb"
        schema={generateBreadcrumbSchema([
          { name: "Home", item: `${base}/` },
          { name: "Setup Guides", item: `${base}/devices` },
        ])}
      />
      <Schema
        id="guides"
        schema={generateItemListSchema({
          name: "IPTV Setup Guides",
          items: allGuides.map((guide) => ({ name: guide.title, url: `${base}/devices/${guide.id}` })),
        })}
      />

      <Section>
        <Container>
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Setup Guides" }]}
            title="IPTV Setup Guides"
            lead="Step-by-step setup for each device we support, plus fixes for buffering. Each guide is checked against the vendor's documentation."
            className="mb-0 md:mb-0"
          />
        </Container>
      </Section>

      <Section flushTop>
        <Container className="space-y-16 md:space-y-20">
          {groups.map((group) => {
            const Icon = guideGroupIcons[group.icon];
            return (
              <section key={group.label} aria-labelledby={`group-${group.icon}`}>
                <Heading level={2} size="heading-md" id={`group-${group.icon}`} className="flex items-center gap-3">
                  <Icon aria-hidden className="h-5 w-5 shrink-0" />
                  {group.label}
                </Heading>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {group.guides.map((guide) => (
                    <GuideCard key={guide.id} href={`/devices/${guide.id}`} title={guide.title} description={guide.description} />
                  ))}
                </div>
              </section>
            );
          })}
        </Container>
      </Section>

      <Section flushTop>
        <Container>
          <Callout
            title="Need an OTTV Subscription?"
            action={
              <Button asChild size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            }
          >
            Get an OTTV subscription for {productFacts.summary}.
          </Callout>
        </Container>
      </Section>
      <LastUpdated />
    </>
  );
}
