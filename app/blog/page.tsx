import Container from '../../components/Container';
import Link from 'next/link';
import { supabaseAdmin } from '../../lib/supabaseServer';

export const revalidate = 3600;

export default async function BlogList() {
  const { data: articles } = await supabaseAdmin
    .from('articles')
    .select('id,slug,title,meta_description,excerpt,published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <Container>
      <h1>Blog</h1>
      <p style={{ color: '#444' }}>Published guides and comparisons.</p>

      {articles && articles.length > 0 ? (
        <ul>
          {articles.map((a: any) => (
            <li key={a.id} style={{ marginBottom: 12 }}>
              <Link href={`/blog/${a.slug}`}><strong>{a.title}</strong></Link>
              <div style={{ color: '#666' }}>{a.meta_description || a.excerpt}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#777' }}>No published articles yet. Drafts are available in the repo for review.</p>
      )}
    </Container>
  );
}
