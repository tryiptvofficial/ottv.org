
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/shared/Container';
import { Section } from "@/components/shared/Section";
import { Grid } from "@/components/shared/Grid";
import { PageHeader } from "@/components/shared/PageHeader";
import { allCountries } from '@/lib/countries';
import { CountryFlag } from '@/components/shared/CountryFlag';
import { getLocationsPageData } from '@/lib/data/locations-page';
import { Schema } from '@/components/shared/Schema';
import { generateMetadata as generatePageMetadata } from '@/lib/site-config';

export function generateMetadata(): Metadata {
    const title = "IPTV Service Locations by Country";
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
            <Section>
                <Container>
                    <PageHeader
                        breadcrumb={[{ label: "Home", href: "/" }, { label: "Service Locations" }]}
                        title="OTTV Service Locations"
                        lead="Choose your country or territory to see how OTTV works there, what the plans cost in US dollars, and which setup guides to start with."
                    />
                    <Grid as="ul" cols="list" gap="tight">
                        {allCountries.map(country => (
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
                </Container>
            </Section>
        </>
    );
}
