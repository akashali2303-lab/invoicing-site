import Container from '../../components/Container';
import Link from 'next/link';
import { supabaseAdmin } from '../../lib/supabaseServer';

export const revalidate = 3600;

export default async function ToolsList() {
  const { data: tools } = await supabaseAdmin.from('tools').select('id,slug,name,short_description,logo_url').order('name');

  return (
    <Container>
      <h1>Tools</h1>
      <ul>
        {tools?.map((t: any) => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <Link href={`/tools/${t.slug}`}><strong>{t.name}</strong></Link> — <span style={{ color: '#666' }}>{t.short_description}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
