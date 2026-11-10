
import { NextRequest, NextResponse } from 'next/server'
import { howToArticles } from '@/lib/how-to';
import { rejectUnlessAuthorized } from '@/lib/server/api-secret';
import { siteConfig } from '@/lib/site-config';

const INDEXNOW_API_URL = 'https://api.indexnow.org/indexnow';
const SITE_URL = siteConfig.url;
const API_KEY = '34703b31e96542ffb49bffed790d5e29';

async function submitUrls(urlList: string[]) {
  const payload = {
    host: new URL(SITE_URL).hostname,
    key: API_KEY,
    keyLocation: `${SITE_URL}/${API_KEY}.txt`,
    urlList: urlList,
  };

  try {
    const response = await fetch(INDEXNOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`IndexNow API error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    console.log('IndexNow submission successful:', payload);
    return { success: true, status: response.status, payload };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during IndexNow submission';
    console.error('IndexNow Submission Error:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function GET(req: NextRequest) {
    const rejection = rejectUnlessAuthorized(req);
    if (rejection) return rejection;

    const staticPages = [
        '/',
        '/pricing',
        '/faq',
        '/contact',
        '/iptv-free-trial',
    ];

    const devicePages = howToArticles.map(article => `/devices/${article.id}`);

    const allUrls = [
        ...staticPages.map(path => `${SITE_URL}${path}`),
        ...devicePages.map(path => `${SITE_URL}${path}`),
    ];
    
    const result = await submitUrls(allUrls);

    if (result.success) {
        return NextResponse.json({ message: 'URLs submitted to IndexNow successfully.', details: result });
    } else {
        return NextResponse.json({ error: 'Failed to submit URLs to IndexNow.' }, { status: 500 });
    }
}
