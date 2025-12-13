export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME}. <br/>
          Independent reviews for freelancers.
        </p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
          Affiliate Disclosure: We may earn a commission if you buy through our links.
        </p>
      </div>
    </footer>
  );
}