/* components/Newsletter.tsx */
'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function subscribe(e: React.FormEvent) {
    e.preventDefault(); // Prevents the page from refreshing
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage('Failed to join. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Something went wrong. Is the API file in the right folder?');
    }
  }

  return (
    <section style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', borderRadius: '24px', padding: '60px', marginTop: '80px', color: 'white', textAlign: 'center' }}>
      <h2 style={{ color: 'white', marginTop: 0 }}>Join our Newsletter</h2>
      <p style={{ color: 'rgba(255,255,255,0.9)' }}>Get monthly tips on managing your freelance business.</p>
      
      {status === 'success' ? (
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '12px', fontWeight: 'bold' }}>
          ✅ You are subscribed!
        </div>
      ) : (
        <form onSubmit={subscribe} style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            style={{ padding: '12px', borderRadius: '12px', border: 'none', flex: 1, color: '#333' }} 
          />
          <button 
            type="submit"
            disabled={status === 'loading'}
            style={{ 
              background: '#000', 
              color: '#fff', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '12px', 
              fontWeight: 'bold', 
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1
            }}>
            {status === 'loading' ? 'Saving...' : 'Subscribe'}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p style={{color: '#ffe4e6', background: 'rgba(255,0,0,0.2)', display: 'inline-block', padding: '4px 12px', borderRadius: '4px', fontSize: '0.9rem', marginTop: '12px'}}>
          {errorMessage || 'Error: Could not subscribe.'}
        </p>
      )}
    </section>
  );
}