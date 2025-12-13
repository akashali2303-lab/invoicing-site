export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #eee', marginTop: 48, padding: 24, textAlign: 'center', color: '#666' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME || 'Invoicing for Freelancers'}. Affiliate disclosure: we may earn a commission from links on this site.
        </p>
      </div>
    </footer>
  );
}
