import { supabaseAdmin } from '../lib/supabaseServer';
import Link from 'next/link';

export const revalidate = 3600;

export default async function Home() {
  const { data: tools } = await supabaseAdmin
    .from('tools')
    .select('id,slug,name,short_description')
    .limit(6);

  return (
    <div className="container">
      <section className="hero">
        <div className="badge">Updated for 2025</div>
        <h1>Get Paid Faster. <br/> <span style={{color: 'var(--primary)'}}>Effortless Invoicing.</span></h1>
        <p>Expert reviews on the best billing and accounting tools for freelancers and solo-entrepreneurs.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link href="/tools" className="btn-primary">View Top 5 Software</Link>
          <Link href="/blog" className="btn-primary" style={{ background: 'white', color: 'black', border: '1px solid #ddd' }}>Read Guides</Link>
        </div>
      </section>

      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Featured Reviews</h2>
      <div className="grid">
        {tools?.map((t: any) => (
          <div key={t.id} className="card">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)' }}>TOP RATED</span>
            <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{t.name}</h3>
            <p style={{ minHeight: '60px' }}>{t.short_description}</p>
            <Link href={`/tools/${t.slug}`} style={{ fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Full Review &rarr;
            </Link>
          </div>
        ))}
      </div>

      <section style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', borderRadius: '24px', padding: '60px', marginTop: '80px', color: 'white', textAlign: 'center' }}>
        <h2 style={{ color: 'white', marginTop: 0 }}>Join our Newsletter</h2>
        <p style={{ color: 'rgba(255,255,255,0.9)' }}>Get monthly tips on managing your freelance business and avoiding payment delays.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <input type="email" placeholder="Enter your email" style={{ padding: '12px', borderRadius: '12px', border: 'none', flex: 1 }} />
          <button style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold' }}>Subscribe</button>
        </div>
      </section>
    </div>
  );
}