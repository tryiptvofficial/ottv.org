import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Grid } from "@/components/shared/Grid";
import { PageHeader } from "@/components/shared/PageHeader";
import { Callout } from "@/components/shared/Callout";
import { FaqList } from "@/components/shared/FaqList";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Pricing } from "@/components/sections/Pricing";
import { Schema } from "@/components/shared/Schema";
import { CountryFlag } from "@/components/shared/CountryFlag";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { allCountries, getCountryById, nameInSentence, type Country } from "@/lib/countries";
import { countryH1, countryMetadata } from "@/lib/country-seo";
import { getCountryPageData } from "@/lib/data/country-page";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";

type Props = {
  params: Promise<{ country: string }>;
};

const guideLabels: Record<string, string> = {
  "fire-tv": "Amazon Fire TV Stick",
  "samsung-tv": "Samsung smart TV",
  "lg-tv": "LG smart TV",
  "apple-tv": "Apple TV",
  roku: "Roku (screen mirroring)",
  ios: "iPhone and iPad",
  android: "Android phones and tablets",
  windows: "Windows PC",
  macos: "Mac",
  mag: "MAG box",
};
const guideOrder = Object.keys(guideLabels);

const shortestPlan = plans[0];
const longestPlan = plans[plans.length - 1];

const countryIntro = (country: Country) =>
  `Looking for the best IPTV service in ${nameInSentence(country)}? OTTV is an IPTV subscription with ${productFacts.summary}. You choose a plan, order it on WhatsApp, and watch through a player app on your TV, streaming stick, phone or computer. Plans are priced in US dollars, from $${shortestPlan.price.toFixed(2)} for one month to $${longestPlan.price.toFixed(2)} for twelve months ($${longestPlan.price_monthly.toFixed(2)} a month).`;

const howItWorks = [
  { title: "Choose a plan", body: "Pick 1, 3, 6 or 12 months. Every plan includes the same service; only the length and the monthly price change." },
  { title: "Order on WhatsApp", body: "Each plan's order button opens WhatsApp with a pre-filled message, and the order is completed in that chat." },
  { title: "Install a player app", body: "Follow the setup guide for your device to install a player app and sign in with the details you receive." },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) notFound();
  return countryMetadata(country);
}

export default async function CountryPage({ params }: Props) {
  const { country: countryId } = await params;
  const { country, breadcrumbSchema, serviceSchema, pageFaqs, faqSchema } = getCountryPageData(countryId);

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      <Schema id="service" schema={serviceSchema} />
      <Schema id="faq" schema={faqSchema} />

      <Section data-fab-avoid>
        <Container>
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: country.name }]}
            title={
              <span className="inline-flex flex-wrap items-center justify-center gap-3">
                <CountryFlag code={country.code} className="h-8 w-8" />
                <span>{countryH1(country)}</span>
              </span>
            }
            lead={countryIntro(country)}
            className="mb-0 md:mb-0"
          >
            <Button asChild size="lg">
              <Link href="/pricing">View plans and prices</Link>
            </Button>
          </PageHeader>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container>
          <Heading level={2} size="heading-sm" className="text-center">How OTTV works</Heading>
          <Grid as="ol" cols={3} className="mt-8">
            {howItWorks.map((step, i) => (
              <li key={step.title}>
                <Card className="h-full p-6">
                  <p className="font-mono text-meta text-subtle">{String(i + 1).padStart(2, "0")} / Step</p>
                  <Heading level={3} size="subheading" className="mt-4">{step.title}</Heading>
                  <p className="mt-2 text-body text-muted-foreground">{step.body}</p>
                </Card>
              </li>
            ))}
          </Grid>
        </Container>
      </Section>

      <Pricing />
      <Section spacing="compact" className="pt-0 md:pt-0">
        <Container>
          <p className="mx-auto max-w-narrow text-center text-body text-muted-foreground">
            Want to try OTTV first? Read{" "}
            <Link href="/iptv-free-trial" className="text-link">how the free trial works</Link>.
          </p>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container>
          <div className="mx-auto max-w-narrow">
            <Heading level={2} size="heading-sm">Setup guides by device</Heading>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {guideOrder.map((id) => (
                <li key={id}>
                  <Link
                    href={`/devices/${id}`}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-control border px-4 py-2 text-label text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {guideLabels[id]} <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-body text-muted-foreground">
              Streams buffering? The <Link href="/devices/troubleshooting" className="text-link">buffering troubleshooting guide</Link> covers the common fixes.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="faq" divided spacing="compact">
        <Container>
          <SectionHeader
            eyebrow="Questions & answers"
            title="Frequently Asked Questions"
            subtitle={`What people ask before choosing an IPTV service in ${nameInSentence(country)}.`}
          />
          <FaqList items={pageFaqs} />
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container>
          <Callout
            title="Choose your plan"
            action={
              <>
                <Button asChild size="lg">
                  <Link href="/pricing">View pricing</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <WhatsAppLink>Ask a question on WhatsApp</WhatsAppLink>
                </Button>
              </>
            }
          >
            Compare the four plans, or message us on WhatsApp with a setup question first.
          </Callout>
        </Container>
      </Section>
    </>
  );
}

export function generateStaticParams() {
  return allCountries.map((country) => ({ country: country.id }));
}
