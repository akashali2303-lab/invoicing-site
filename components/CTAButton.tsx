import React from 'react';

export default function CTAButton({ offerId, label = 'Check latest pricing' }: { offerId: string; label?: string }) {
  const href = `/api/redirect/${offerId}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer nofollow"
      style={{
        display: 'inline-block',
        padding: '10px 16px',
        background: '#0b5fff',
        color: '#fff',
        borderRadius: 6,
        textDecoration: 'none'
      }}
      aria-label={`${label} (affiliate link)`}
    >
      {label}
    </a>
  );
}
