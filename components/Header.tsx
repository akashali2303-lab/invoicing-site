import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="container nav-flex">
        <Link href="/" className="brand">InvoiceFlow</Link>
        <nav style={{ display: 'flex', gap: '32px', fontWeight: '600' }}>
          <Link href="/blog" style={{ color: 'var(--text-dark)' }}>Guides</Link>
          <Link href="/tools" style={{ color: 'var(--text-dark)' }}>Software</Link>
          <Link href="/tools" className="btn-primary" style={{ padding: '8px 16px' }}>Compare</Link>
        </nav>
      </div>
    </header>
  );
}