
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/shared/Container';
import { Section } from "@/components/shared/Section";
import { Grid } from "@/components/shared/Grid";
import { PageHeader } from "@/components/shared/PageHeader";
import { allCountries, historicalEntries, type Country } from '@/lib/countries';
import { countryFacts } from '@/lib/country-content';
import { CountryFlag } from '@/components/shared/CountryFlag';
import { getLocationsPageData } from '@/lib/data/locations-page';
import { Schema } from '@/components/shared/Schema';
import { Heading } from '@/components/ui/typography';
import { generateMetadata as generatePageMetadata } from '@/lib/site-config';
import { generateWebPageSchema } from '@/lib/schema';

const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const groups = continents.map((name) => ({
    name,
    countries: allCountries.filter((country) => !historicalEntries[country.id] && countryFacts(country)?.continent === name),
}));
const formerStates = allCountries.filter((country) => historicalEntries[country.id]);

function CountryGrid({ countries }: { countries: Country[] }) {
    return (
        <Grid as="ul" cols="list" gap="tight">
            {countries.map(country => (
                <li key={country.id}>
                    <Link
                        href={`/country/${country.id}`}
                        className="flex min-h-11 items-center gap-3 rounded-control px-3 py-2 text-label text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {country.code ? <CountryFlag code={country.code} className="h-5 w-5" /> : <span aria-hidden className="h-5 w-5 flex-shrink-0" />}
                        <span>{country.name}</span>
                    </Link>
                </li>
            ))}
        </Grid>
    );
}

export function generateMetadata(): Metadata {
    const title = "IPTV Guides by Country and Territory";
    const description = "Find the OTTV page for your country or territory: plan prices in US dollars, how ordering on WhatsApp works, and setup guides for your devices.";
    
    return generatePageMetadata({
        title,
        description,
        canonical: "/locations",
    });
}

export default async function LocationsPage() {
    const { breadcrumbSchema } = await getLocationsPageData();

    return (
        <>
            <Schema id="breadcrumb" schema={breadcrumbSchema} />
            <Schema id="webpage" schema={generateWebPageSchema({ type: "CollectionPage", path: "/locations", name: "OTTV by Country and Territory" })} />
            <Section>
                <Container>
                    <PageHeader
                        breadcrumb={[{ label: "Home", href: "/" }, { label: "Locations" }]}
                        title="OTTV by Country and Territory"
                        lead="Each page covers currency, languages, time zones, plan prices in US dollars and which setup guides to start with."
                    />
                    <div className="mx-auto mb-10 max-w-narrow text-center">
                        <Heading level={2} size="heading-sm">Can I Watch OTTV in My Country?</Heading>
                        <p className="mt-3 text-body text-muted-foreground">
                            OTTV has not published a country-by-country availability list, so these pages do not confirm coverage.{" "}
                            <Link href="/iptv-free-trial" className="text-link">Use the free 24-hour trial</Link> to test your own connection, or{" "}
                            <Link href="/contact" className="text-link">ask us on WhatsApp</Link> before ordering.
                        </p>
                    </div>
                    <nav aria-label="Jump to a continent" className="mb-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-label">
                        {groups.map(({ name }) => (
                            <a key={name} href={`#${name.toLowerCase()}`} className="text-link">{name}</a>
                        ))}
                    </nav>
                    <div className="space-y-12">
                        {groups.map(({ name, countries }) => (
                            <section key={name} id={name.toLowerCase()} aria-labelledby={`${name.toLowerCase()}-heading`} className="scroll-mt-24">
                                <Heading id={`${name.toLowerCase()}-heading`} level={2} size="heading" className="mb-6">{name}</Heading>
                                <CountryGrid countries={countries} />
                            </section>
                        ))}
                        <section aria-labelledby="former-states-heading">
                            <Heading id="former-states-heading" level={2} size="heading" className="mb-2">Former States</Heading>
                            <p className="mb-6 text-body text-muted-foreground">These states no longer exist. Each page points to the present-day country.</p>
                            <CountryGrid countries={formerStates} />
                        </section>
                    </div>
                </Container>
            </Section>
        </>
    );
}
