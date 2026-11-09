import { Card } from "@/components/ui/card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { MarketProfile } from "@/lib/site-data/market-profiles";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" });
}

/** Facts the owner has confirmed for one country. Rendered only for countries with a profile. */
export function MarketProfileSection({ where, market }: { where: string; market: MarketProfile }) {
  const lists = [
    { label: "Channels confirmed", items: market.channels },
    { label: "Sports confirmed", items: market.sports },
    { label: "Payment methods", items: market.paymentMethods },
  ].filter((list) => list.items.length > 0);

  return (
    <Section spacing="compact">
      <Container>
        <SectionHeader title={`What OTTV Has Confirmed for ${where}`} />
        <Card className="mx-auto max-w-medium p-6">
          <p className="text-body text-foreground">{market.availability}</p>
          {lists.length > 0 && (
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {lists.map((list) => (
                <div key={list.label}>
                  <dt className="text-meta text-subtle">{list.label}</dt>
                  <dd className="mt-1 text-label text-foreground">{list.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          )}
          {market.testNote && <p className="mt-6 text-body text-muted-foreground">{market.testNote}</p>}
          {market.setupNote && <p className="mt-4 text-body text-muted-foreground">{market.setupNote}</p>}
          <p className="mt-6 text-caption text-subtle">
            Last confirmed by OTTV on <time dateTime={market.checkedOn}>{formatDate(market.checkedOn)}</time>.
          </p>
        </Card>
      </Container>
    </Section>
  );
}
