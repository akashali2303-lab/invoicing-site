import React, { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <div style={{ maxWidth: 980, margin: '0 auto', padding: '24px' }}>{children}</div>;
}
