import Container from '../../../components/Container';
import AffiliateDisclosure from '../../../components/AffiliateDisclosure';
import CTAButton from '../../../components/CTAButton';
import ComparisonTable from '../../../components/ComparisonTable';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '../../../lib/supabaseServer';

export const revalidate = 3600;

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  // Fetch tool and offers
  const { data: tool } = await supabaseAdmin.from('tools').select('*').eq('slug', slug).single();
  if (!tool) notFound();

  const { data: offers } = await supabaseAdmin.from('offers').select('*').eq('tool_id', tool.id).order('created_at', { ascending: true });

  // JSON-LD schema (SoftwareApplication)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/tools/${tool.slug}`,
    description: tool.short_description,
    applicationCategory: 'BusinessApplication',
    offers: offers && offers.length > 0
      ? offers.map((o: any) => ({ '@type': 'Offer', url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/redirect/${o.id}`, price: o.price ? String(o.price) : undefined, priceCurrency: o.currency || 'USD' }))
      : undefined
  };

  return (
    <Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>{tool.name}</h1>
      <AffiliateDisclosure />
      <p style={{ color: '#555' }}>{tool.short_description}</p>

      <section style={{ marginTop: 18 }}>
        <h3>Quick details</h3>
        <p>{tool.long_description}</p>
        <ul>
          {(tool.features || []).map((f: string, idx: number) => <li key={idx}>{f}</li>)}
        </ul>
        <p style={{ color: '#666' }}>{tool.pricing_note}</p>
      </section>

      <section style={{ marginTop: 18 }}>
        <h3>Offers</h3>
        {offers && offers.length > 0 ? (
          <ul>
            {offers.map((o: any) => (
              <li key={o.id} style={{ marginBottom: 10 }}>
                <strong>{o.label || 'Visit site'}</strong>
                <div style={{ marginTop: 6 }}>
                  <CTAButton offerId={o.id} label={o.label || 'Visit site'} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#777' }}>No offers configured.</p>
        )}
      </section>

      <section style={{ marginTop: 18 }}>
        <h3>Comparison</h3>
        <ComparisonTable
          rows={[
            { name: tool.name, freePlan: tool.pricing_note?.includes('Free') ? 'Yes' : 'No', recurring: 'Yes', payments: 'Built-in', starting: 'Varies', offerId: offers?.[0]?.id }
          ]}
        />
      </section>
    </Container>
  );
}
