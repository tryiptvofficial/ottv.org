
import { MetadataRoute } from 'next'
import { howToArticles } from '@/lib/how-to';
import { allCountries } from '@/lib/countries';
import { siteConfig } from '@/lib/site-config';

const baseUrl = siteConfig.url;

// Last significant change to the shared country page template; update it when that content changes.
const countryPagesUpdatedAt = '2026-11-02';

export default function sitemap(): MetadataRoute.Sitemap {
  
  const devicePages: MetadataRoute.Sitemap = howToArticles.map((article) => ({
    url: `${baseUrl}/devices/${article.id}`,
    lastModified: new Date(article.dateModified),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const countryPages: MetadataRoute.Sitemap = allCountries.map((country) => ({
    url: `${baseUrl}/country/${country.id}`,
    lastModified: new Date(countryPagesUpdatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dates of each page's last significant content change; update them when the page content changes.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-11-02'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date('2026-11-02'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date('2026-11-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date('2026-11-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-11-02'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
        url: `${baseUrl}/iptv-free-trial`,
        lastModified: new Date('2026-11-02'),
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
