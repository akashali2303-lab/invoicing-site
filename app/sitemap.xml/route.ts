import { supabaseAdmin } from '../../lib/supabaseServer';

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const { data: tools } = await supabaseAdmin.from('tools').select('slug,created_at');
  const { data: articles } = await supabaseAdmin.from('articles').select('slug,updated_at').eq('status', 'published');

  const urls = [
    { loc: `${siteUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/blog`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/tools`, lastmod: new Date().toISOString() }
  ];

  tools?.forEach((t: any) => urls.push({ loc: `${siteUrl}/tools/${t.slug}`, lastmod: t.created_at || new Date().toISOString() }));
  articles?.forEach((a: any) => urls.push({ loc: `${siteUrl}/blog/${a.slug}`, lastmod: a.updated_at || new Date().toISOString() }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((u) => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
      .join('')}
  </urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
