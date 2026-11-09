/**
 * What OTTV has actually confirmed for a country, keyed by country page slug.
 *
 * Add an entry only from facts the owner has checked. Never fill one in from assumptions, competitor
 * pages or generic knowledge of a country: an entry replaces the page's "availability not published"
 * notice and adds claims about the service. A country with no entry keeps its standard page.
 * `docs/market-facts-worksheet.csv` collects these values.
 */
export interface MarketProfile {
  /** Date the owner last confirmed this entry, YYYY-MM-DD. Also becomes the page's sitemap lastmod. */
  checkedOn: string;
  /** Plain statement of availability, e.g. who can order and any limits. */
  availability: string;
  /** A real playback test, e.g. where, on what connection and what happened. */
  testNote?: string;
  /** Channels confirmed to be in the lineup for this market. */
  channels: string[];
  /** Competitions or sports confirmed to be carried for this market. */
  sports: string[];
  /** Payment methods accepted from this country. */
  paymentMethods: string[];
  /** Setup advice specific to this country, such as an ISP or device issue seen here. */
  setupNote?: string;
  /** Extra questions customers in this country really ask. */
  faqs?: { question: string; answer: string }[];
}

export const marketProfiles: Record<string, MarketProfile> = {};
