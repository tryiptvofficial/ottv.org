import { Container } from "@/components/shared/Container";
import { siteContentUpdatedAt } from "@/lib/site-config";

const label = new Date(`${siteContentUpdatedAt}T00:00:00Z`).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" });

/** The visible last-updated line on core pages, as a mono stamp. Shares its date with the sitemap and WebPage schema. */
export function LastUpdated() {
  return (
    <Container>
      <p className="stamp py-10 text-center text-subtle">
        Last updated <time dateTime={siteContentUpdatedAt}>{label}</time>
      </p>
    </Container>
  );
}
