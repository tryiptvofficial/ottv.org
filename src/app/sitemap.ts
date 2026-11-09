
import { MetadataRoute } from 'next'
import { howToArticles } from '@/lib/how-to';
import { allCountries } from '@/lib/countries';
import { marketProfiles } from '@/lib/site-data/market-profiles';
import { siteConfig, siteContentUpdatedAt } from '@/lib/site-config';

const baseUrl = siteConfig.url;

// Device guides use their own dateModified, which matches the date shown on each guide.

export default function sitemap(): MetadataRoute.Sitemap {
  
  const devicePages: MetadataRoute.Sitemap = howToArticles.map((article) => ({
    url: `${baseUrl}/devices/${article.id}`,
    lastModified: new Date(article.dateModified),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const countryPages: MetadataRoute.Sitemap = allCountries.map((country) => ({
    url: `${baseUrl}/country/${country.id}`,
    lastModified: new Date(marketProfiles[country.id]?.checkedOn ?? siteContentUpdatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dates of each page's last significant content change; update them when the page content changes.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(siteContentUpdatedAt),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(siteContentUpdatedAt),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(siteContentUpdatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(siteContentUpdatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(siteContentUpdatedAt),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
        url: `${baseUrl}/iptv-free-trial`,
        lastModified: new Date(siteContentUpdatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
    },
  ];

  return [
    ...staticPages,
    ...devicePages,
    ...countryPages,
  ]
}
