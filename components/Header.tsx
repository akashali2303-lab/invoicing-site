import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid #e6e6e6' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '18px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 18 }}>
          {process.env.NEXT_PUBLIC_SITE_NAME || 'Invoicing for Freelancers'}
        </Link>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <Link href="/blog">Blog</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/blog/wave-vs-freshbooks-for-freelancers">Compare</Link>
        </nav>
      </div>
    </header>
  );
}
