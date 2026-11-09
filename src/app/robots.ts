
import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
        {
            userAgent: '*',
            // /api/og serves every page's Open Graph image, so social crawlers must be able to fetch it.
            allow: ['/', '/api/og'],
            disallow: ['/api/', '/admin/', '/staging/'],
        },
        {
            userAgent: 'GPTBot',
            disallow: ['/'],
        },
        {
            userAgent: 'ChatGPT-User',
            allow: '/',
        },
        {
            userAgent: 'Google-Extended',
            allow: '/',
        },
        {
            userAgent: 'anthropic-ai',
            allow: '/',
        },
        {
            userAgent: 'PerplexityBot',
            allow: '/',
        }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
