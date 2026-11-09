import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Grid } from "@/components/shared/Grid";
import { PageHeader } from "@/components/shared/PageHeader";
import { Callout } from "@/components/shared/Callout";
import { FaqList } from "@/components/shared/FaqList";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Schema } from "@/components/shared/Schema";
import { CountryFlag } from "@/components/shared/CountryFlag";
import { MarketProfileSection } from "@/components/sections/MarketProfileSection";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { allCountries, getCountryById } from "@/lib/countries";
import { guideLabels } from "@/lib/country-content";
import { countryH1, countryMetadata } from "@/lib/country-seo";
import { getCountryPageData } from "@/lib/data/country-page";
import { plans } from "@/lib/site-data/pricing";

type Props = {
  params: Promise<{ country: string }>;
};

const linkTile =
  "flex min-h-11 items-center justify-between gap-3 rounded-control border px-4 py-2 text-label text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) notFound();
  return countryMetadata(country);
}

export default async function CountryPage({ params }: Props) {
  const { country: countryId } = await params;
  const { country, breadcrumbSchema, history, content, serviceSchema, pageFaqs, faqSchema } = getCountryPageData(countryId);
  const breadcrumb = [{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: country.name }];

  if (history || !content || !serviceSchema || !faqSchema) {
    return (
      <>
        <Schema id="breadcrumb" schema={breadcrumbSchema} />
        <Section data-fab-avoid>
          <Container>
            <PageHeader breadcrumb={breadcrumb} title={countryH1(country)} lead={history?.description} className="mb-0 md:mb-0">
              {history && (
                <p className="max-w-narrow text-body text-muted-foreground">
                  This page stays online for people searching the historical name. OTTV publishes nothing specific to {country.name}; current plans and setup guides are on the page for {history.successorName}.
                </p>
              )}
              {history && (
                <Button asChild size="lg" className="h-auto whitespace-normal py-3">
                  <Link href={`/country/${history.successorId}`}>See the Best IPTV in {history.successorName}</Link>
                </Button>
              )}
            </PageHeader>
          </Container>
        </Section>
      </>
    );
  }

  const { where } = content;

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      <Schema id="service" schema={serviceSchema} />
      <Schema id="faq" schema={faqSchema} />

      <Section data-fab-avoid>
        <Container>
          <PageHeader
            breadcrumb={breadcrumb}
            title={
              <span className="inline-flex flex-wrap items-center justify-center gap-3">
                <CountryFlag code={country.code} className="h-8 w-8" eager />
                <span>{countryH1(country)}</span>
              </span>
            }
            lead={content.lead}
            className="mb-0 md:mb-0"
          >
            <p className="mx-auto max-w-narrow text-body text-muted-foreground">{content.availabilityNote}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/iptv-free-trial">Start the free trial</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/pricing">View plans and prices</Link>
              </Button>
            </div>
          </PageHeader>
        </Container>
      </Section>

      <Section tone="light" spacing="compact">
        <Container>
          <SectionHeader title={`What to Know Before Ordering From ${where}`} />
          <Card className="mx-auto max-w-medium p-6">
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.quickFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-meta text-subtle">{fact.label}</dt>
                  <dd className="mt-1 text-label text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-caption text-subtle">
              Regional data based on <a href="https://cldr.unicode.org/" target="_blank" rel="noopener noreferrer" className="text-link">Unicode CLDR 49</a>, with some language and time entries corrected. Language lists are simplified.
            </p>
          </Card>
          <Grid cols={3} className="mt-6">
            <div>
              <Heading level={3} size="subheading">Paying from {where}</Heading>
              <p className="mt-2 text-body text-muted-foreground">{content.paying}</p>
            </div>
            <div>
              <Heading level={3} size="subheading">{content.languageTitle}</Heading>
              <p className="mt-2 text-body text-muted-foreground">{content.language}</p>
            </div>
            <div>
              <Heading level={3} size="subheading">Live TV and local time</Heading>
              <p className="mt-2 text-body text-muted-foreground">{content.time}</p>
            </div>
          </Grid>
        </Container>
      </Section>

      {content.market && <MarketProfileSection where={where} market={content.market} />}

      <Section spacing="compact">
        <Container>
          <SectionHeader
            title={`How Much Does OTTV Cost in ${where}?`}
            subtitle={content.priceAnswer}
          />
          <div className="mx-auto max-w-medium">
            <Table>
              <TableCaption>Prices in US dollars. Each plan is a one-time payment.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Total price</TableHead>
                  <TableHead>Per month</TableHead>
                  <TableHead><span className="sr-only">Order</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="text-foreground">{plan.name}</TableCell>
                    <TableCell>${plan.price.toFixed(2)}</TableCell>
                    <TableCell>${plan.price_monthly.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant={plan.isPopular ? "primary" : "secondary"}>
                        <a href={plan.orderUrl} target="_blank" rel="noopener noreferrer">
                          Order<span className="sr-only"> the {plan.name} plan on WhatsApp (opens in a new tab)</span>
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-6 text-center text-body text-muted-foreground">
              Want to try OTTV first? Read <Link href="/iptv-free-trial" className="text-link">how the free trial works</Link>.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="light" spacing="compact">
        <Container>
          <div className="mx-auto max-w-narrow">
            <Heading level={2} size="heading-sm">Devices and Setup in {where}</Heading>
            <p className="mt-4 text-body text-muted-foreground">{content.devices}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {content.guideOrder.map((id) => (
                <li key={id}>
                  <Link href={`/devices/${id}`} className={linkTile}>
                    {guideLabels[id]} <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-body text-muted-foreground">
              Streams buffering? The <Link href="/devices/troubleshooting" className="text-link">buffering troubleshooting guide</Link> covers the common fixes.
            </p>
            <p className="mt-4 text-caption text-subtle">
              Device sources:{" "}
              <a href="https://developer.amazon.com/docs/device-specs/device-specifications-fire-tv-streaming-media-player.html" target="_blank" rel="noopener noreferrer" className="text-link">Amazon Fire TV specifications</a>
              ,{" "}
              <a href="https://www.aftvnews.com/these-are-the-fire-tvs-that-dont-support-sideloading-or-downloader-due-to-vega-os/" target="_blank" rel="noopener noreferrer" className="text-link">AFTVnews</a>
              {" "}and{" "}
              <a href="https://developer.roku.com/dev/docs/channel-localization" target="_blank" rel="noopener noreferrer" className="text-link">Roku developer documentation</a>.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="faq" spacing="compact">
        <Container>
          <SectionHeader title={`IPTV Questions About ${where}`} />
          <FaqList items={pageFaqs} />
          <p className="mt-6 text-center text-body text-muted-foreground">
            Free trial, renewal and refund answers are on the <Link href="/faq" className="text-link">full FAQ page</Link>.
          </p>
        </Container>
      </Section>

      <Section tone="light" spacing="compact">
        <Container>
          {content.nearby.length > 0 && (
            <div className="mx-auto mb-12 max-w-narrow">
              <Heading level={2} size="heading-sm">Other Pages in {content.nearbyRegion}</Heading>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {content.nearby.map((peer) => (
                  <li key={peer.id}>
                    <Link href={`/country/${peer.id}`} className={linkTile}>
                      <span className="flex items-center gap-3">
                        <CountryFlag code={peer.code} className="h-5 w-5" />
                        Best IPTV in {peer.name}
                      </span>
                      <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
              {content.formerStates.map((state) => (
                <p key={state.id} className="mt-4 text-caption text-muted-foreground">
                  Looking for the historical state? See <Link href={`/country/${state.id}`} className="text-link">{state.name}</Link>.
                </p>
              ))}
            </div>
          )}
          <Callout
            title="Ready to start?"
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
