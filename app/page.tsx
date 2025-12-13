import Container from '../components/Container';
import { supabaseAdmin } from '../lib/supabaseServer';
import Link from 'next/link';

export const revalidate = 3600;

export default async function Home() {
  const { data: tools } = await supabaseAdmin
    .from('tools')
    .select('id,slug,name,short_description,logo_url')
    .limit(6)
    .order('created_at', { ascending: false });

  return (
    <Container>
      <h1>Best invoicing software for freelancers</h1>
      <p style={{ color: '#444' }}>
        Honest comparisons and buyer-focused reviews of invoicing software freelancers actually use. Affiliate links are clearly labeled.
      </p>

      <section>
        <h2 style={{ marginTop: 28 }}>Top tools (quick links)</h2>
        <ul>
          {tools?.map((t: any) => (
            <li key={t.id} style={{ marginBottom: 8 }}>
              <Link href={`/tools/${t.slug}`}>{t.name}</Link> — <span style={{ color: '#666' }}>{t.short_description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 style={{ marginTop: 28 }}>Recommended reading</h3>
        <ul>
          <li><Link href="/blog/best-invoicing-software-for-freelancers">Best invoicing software for freelancers (draft)</Link></li>
          <li><Link href="/blog/best-free-invoicing-software-for-freelancers">Best free invoicing software for freelancers (draft)</Link></li>
          <li><Link href="/blog/invoicing-software-for-freelancers-in-bangladesh">Invoicing software for freelancers in Bangladesh (draft)</Link></li>
        </ul>
      </section>
    </Container>
  );
}
