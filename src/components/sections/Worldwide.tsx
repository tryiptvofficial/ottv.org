import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "../shared/Container";
import { CountryFlag } from "../shared/CountryFlag";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { allCountries, getCountryById } from "@/lib/countries";

const featured = ["united-states", "united-kingdom", "canada", "australia", "germany", "france", "spain", "morocco"]
  .map((id) => getCountryById(id))
  .filter((country) => country !== undefined);

export function Worldwide() {
  return (
    <Section divided spacing="compact">
      <Container>
        <SectionHeader
          eyebrow="Around the world"
          title="OTTV Around the World"
          subtitle={`Find the OTTV page for your country or territory. There are pages for ${allCountries.length} of them, each with plans in US dollars and setup guides for your devices.`}
        />
        <ul className="mx-auto grid max-w-medium grid-cols-2 gap-2 sm:grid-cols-4">
          {featured.map((country) => (
            <li key={country.id}>
              <Link
                href={`/country/${country.id}`}
                className="flex min-h-11 items-center gap-3 rounded-control border px-3 py-2 text-label text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <CountryFlag code={country.code} className="h-5 w-5" />
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="secondary">
            <Link href="/locations">See all locations</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
