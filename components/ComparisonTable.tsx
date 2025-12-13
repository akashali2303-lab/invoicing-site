import React from 'react';

type Row = {
  name: string;
  freePlan: string;
  recurring: string;
  payments: string;
  starting: string;
  offerId?: string;
};

export default function ComparisonTable({ rows }: { rows: Row[] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Tool</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Free plan</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Recurring</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Payments</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Starting</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{r.name}</td>
            <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{r.freePlan}</td>
            <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{r.recurring}</td>
            <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{r.payments}</td>
            <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{r.starting}</td>
            <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>
              {r.offerId ? <a href={`/api/redirect/${r.offerId}`} rel="sponsored noopener noreferrer nofollow" target="_blank">Visit</a> : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
