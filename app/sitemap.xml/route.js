// app/sitemap.xml/route.js — Dynamic sitemap generated at build time
// Add new pages or blog posts here and they appear automatically in Google

const BASE_URL = 'https://www.bizanalyzer.nl';
const BUILD_DATE = new Date().toISOString().split('T')[0];

// Static pages — edit priority/changefreq as needed
const STATIC_PAGES = [
  { url: '/',            lastmod: BUILD_DATE, changefreq: 'weekly',  priority: '1.0' },
  { url: '/blog',        lastmod: BUILD_DATE, changefreq: 'weekly',  priority: '0.9' },
  { url: '/top-sectors', lastmod: BUILD_DATE, changefreq: 'monthly', priority: '0.9' },
  { url: '/freelance',   lastmod: BUILD_DATE, changefreq: 'monthly', priority: '0.9' },
  { url: '/jobs',        lastmod: BUILD_DATE, changefreq: 'daily',   priority: '0.8' },
  { url: '/news',        lastmod: BUILD_DATE, changefreq: 'daily',   priority: '0.8' },
  { url: '/about',       lastmod: '2026-06-19', changefreq: 'yearly', priority: '0.5' },
  { url: '/contact',     lastmod: '2026-06-19', changefreq: 'yearly', priority: '0.5' },
  { url: '/privacy',     lastmod: '2026-06-19', changefreq: 'yearly', priority: '0.3' },
];

// Blog posts — add new slugs here when you publish new articles
const BLOG_POSTS = [
  { slug: 'kvk-registratie-migranten',  date: '2025-01-15', priority: '0.8' },
  { slug: 'zzp-tarieven-nederland',      date: '2025-01-22', priority: '0.8' },
  { slug: 'btw-belasting-zzp',          date: '2025-02-01', priority: '0.8' },
  { slug: 'beste-sectoren-migranten',   date: '2025-02-10', priority: '0.8' },
  { slug: 'statushouder-ondernemen',    date: '2025-02-20', priority: '0.8' },
  { slug: 'amsterdam-vs-rotterdam',     date: '2025-03-01', priority: '0.7' },
  { slug: 'subsidies-zzp-nederland',    date: '2025-03-10', priority: '0.8' },
  { slug: 'online-winkel-starten',      date: '2025-03-20', priority: '0.7' },
  { slug: 'verzekeringen-zzp',          date: '2025-04-01', priority: '0.7' },
  { slug: 'pensioen-zzp',              date: '2025-04-15', priority: '0.7' },
];

function buildSitemap() {
  const staticUrls = STATIC_PAGES.map(({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  const blogUrls = BLOG_POSTS.map(({ slug, date, priority }) => `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`;
}

export async function GET() {
  return new Response(buildSitemap(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
