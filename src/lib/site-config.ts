import { productFacts } from "@/lib/site-data/product-facts";

// Date of the last real content change on the core and standard country pages. Update by hand only when
// that content changes, never from the build, so the visible date, schema and sitemap stay truthful.
export const siteContentUpdatedAt = "2026-11-09";

export const siteConfig = {
  name: "OTTV",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ottv.org",
  ogImage: "/api/og",
  description: `Enjoy live sports, news, movies and shows from around the world. OTTV offers ${productFacts.liveChannels} live channels, ${productFacts.vodTitles} movies & shows and no long-term contracts.`,
  links: {
    // International format without "+", as wa.me expects
    whatsapp: "212694833293",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** WhatsApp chat link for the site's number, with an optional pre-filled message. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.links.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

const brandSuffix = ` | ${siteConfig.name}`;

// Helper for generating page-specific metadata
export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  canonical,
}: {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}) {
  const ogImageUrl = image || `${siteConfig.url}${siteConfig.ogImage}?title=${encodeURIComponent(title)}`;
  // The root layout's title template appends the brand, so a suffix passed in here would appear twice.
  const documentTitle = title.endsWith(brandSuffix) ? title.slice(0, -brandSuffix.length) : title;

  return {
    title: documentTitle,
    description,
    alternates: {
      canonical: canonical ? `${siteConfig.url}${canonical}` : undefined,
    },
    openGraph: {
      // A page-level openGraph replaces the layout's, so these have to be set here as well.
      type: 'website',
      siteName: siteConfig.name,
      url: canonical ? `${siteConfig.url}${canonical}` : undefined,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
