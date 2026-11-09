/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://www.ottv.org',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            // Example of disallowing a path:
            // { userAgent: '*', disallow: '/admin' },
        ],
        additionalSitemaps: [
            `${process.env.SITE_URL || 'https://www.ottv.org'}/sitemap.xml`,
        ],
        // To add a crawl-delay, uncomment the following line:
        // crawlDelay: 5, 
    }
};

export default config;
