/**
 * The single source of truth for IPTVMax product figures. Every page, metadata string and
 * structured-data block reads them from here; `npm run seo:facts` fails if another figure appears.
 * Confirmed by the owner on 2026-11-02, matching the plan features set in commit dc8ec2b.
 */
export const productFacts = {
  liveChannels: "25,000+",
  vodTitles: "120,000+",
  liveChannelsLabel: "25,000+ Live Channels Worldwide",
  vodLabel: "120,000+ On-Demand (VOD) Movies & TV Shows",
  /** For use mid-sentence. */
  summary: "25,000+ live channels worldwide and 120,000+ on-demand movies and TV shows",
} as const;
