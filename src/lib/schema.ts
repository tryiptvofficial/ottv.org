
import type {
  Product,
  WebSite,
  Organization,
  FAQPage,
  BreadcrumbList,
  Article,
  HowToLeaf,
  Service,
  Offer,
  AggregateOffer,
  ItemList,
  WithContext
} from 'schema-dts';
import { siteConfig, siteContentUpdatedAt, whatsappUrl } from '@/lib/site-config';
import { plans } from '@/lib/site-data/pricing';
import { productFacts } from '@/lib/site-data/product-facts';

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

// Reusable parts of schemas
const defaultPublisher = {
  '@type': 'Organization' as const,
  '@id': organizationId,
  'name': siteConfig.name,
  'logo': {
    '@type': 'ImageObject' as const,
    'url': `${siteConfig.url}/apple-touch-icon.png`,
  },
};

export function generateWebSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    'url': siteConfig.url,
    'name': siteConfig.name,
    // Google falls back to alternateName when a short brand name is too generic to show as the site name.
    'alternateName': 'ottv.org',
    'publisher': { '@id': organizationId },
  };
}

// Only verified details: no address, email or social profiles are published until the owner confirms them.
export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    'name': siteConfig.name,
    // The brand's previous name, so search engines connect the old and new entity.
    'alternateName': 'IPTVMax',
    'url': siteConfig.url,
    'description': `IPTV subscription with ${productFacts.summary}, in 1, 3, 6 and 12 month plans priced in US dollars, with a free 24-hour trial. Orders and support run through WhatsApp.`,
    'logo': `${siteConfig.url}/apple-touch-icon.png`,
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer support',
      'url': whatsappUrl(),
    },
  };
}

interface WebPageSchemaProps {
  type: 'WebPage' | 'ContactPage' | 'CollectionPage';
  /** Path from the site root, empty for the homepage. */
  path: string;
  name: string;
  aboutProduct?: boolean;
}

/** Names what a page is and ties it to the site, without adding any claim. */
export function generateWebPageSchema({ type, path, name, aboutProduct = false }: WebPageSchemaProps) {
  return {
    '@context': 'https://schema.org' as const,
    '@type': type,
    '@id': `${siteConfig.url}${path}#webpage`,
    url: `${siteConfig.url}${path}`,
    name,
    dateModified: siteContentUpdatedAt,
    isPartOf: { '@id': websiteId },
    about: { '@id': aboutProduct ? `${siteConfig.url}/#product` : organizationId },
  };
}

/** The subscription as a product, built only from `pricing.ts` and the product facts. No ratings: there are no reviews on the site. */
export function generateSubscriptionProductSchema(): WithContext<Product> {
  const prices = plans.map((plan) => plan.price);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteConfig.url}/#product`,
    name: `${siteConfig.name} IPTV subscription`,
    description: `IPTV subscription with ${productFacts.summary}, in 1, 3, 6 and 12 month plans priced in US dollars.`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    brand: { '@type': 'Brand', name: siteConfig.name },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.min(...prices).toFixed(2),
      highPrice: Math.max(...prices).toFixed(2),
      offerCount: plans.length,
      offers: plans.map((plan) => ({
        '@type': 'Offer',
        name: plan.name,
        price: plan.price.toFixed(2),
        priceCurrency: 'USD',
        url: `${siteConfig.url}/pricing`,
        seller: { '@id': organizationId },
      })),
    },
  };
}


export function generateFAQPageSchema(mainEntity: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(itemListElement: { name: string; item: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemListElement.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

/** An ordered list of pages, for a hub page that shows the same list visibly (the setup guides). */
export function generateItemListSchema({ name, items }: { name: string; items: { name: string; url: string }[] }): WithContext<ItemList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

interface ArticleSchemaProps {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified: string;
    authorName?: string;
    publisherName?: string;
    url: string;
}

export function generateArticleSchema(props: ArticleSchemaProps): WithContext<Article> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.headline,
        description: props.description,
        image: props.image,
        datePublished: props.datePublished,
        dateModified: props.dateModified,
        author: {
            '@type': 'Organization',
            '@id': organizationId,
            name: props.authorName || siteConfig.name,
        },
        publisher: defaultPublisher,
        isPartOf: { '@id': websiteId },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': props.url,
        },
    };
}

interface HowToSchemaProps {
    name: string;
    description: string;
    image?: { url: string; width?: number; height?: number; };
    steps: { name: string; text: string; url: string; }[];
    totalTime?: string;
}

// schema-dts types ImageObject width/height as Distance strings; Google reads plain pixel numbers,
// so the image is typed here to keep emitting numbers.
type HowToJsonLd = WithContext<Omit<HowToLeaf, 'image'>> & {
    image?: { '@type': 'ImageObject'; url: string; width?: number; height?: number };
};

export function generateHowToSchema(props: HowToSchemaProps): HowToJsonLd {
    const { name, description, image, steps, totalTime } = props;
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        image: image ? {
            '@type': 'ImageObject',
            url: image.url,
            width: image.width,
            height: image.height,
        } : undefined,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            name: step.name,
            // Guide steps are stored as HTML for the page; schema text must be plain.
            text: step.text.replace(/<[^>]*>/g, ' ').replace(/\s+([.,;:!?])/g, '$1').replace(/\s+/g, ' ').trim(),
            url: step.url,
            position: index + 1,
        })),
        totalTime: totalTime,
    };
}


interface ServiceSchemaProps {
    serviceType: string;
    areaServed?: { type: 'Country' | 'Place', name: string, identifier?: string };
    name: string;
    description: string;
    offers?: Offer | AggregateOffer | Offer[];
}

export function generateServiceSchema(props: ServiceSchemaProps): WithContext<Service> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: props.serviceType,
        provider: { '@id': organizationId },
        ...(props.areaServed && {
            areaServed: {
                '@type': props.areaServed.type,
                name: props.areaServed.name,
                ...(props.areaServed.identifier && { identifier: props.areaServed.identifier }),
            },
        }),
        name: props.name,
        description: props.description,
        offers: props.offers
    }
}
