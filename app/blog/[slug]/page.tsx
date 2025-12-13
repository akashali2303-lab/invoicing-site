import { notFound } from 'next/navigation';
import Container from '../../../components/Container';
import AffiliateDisclosure from '../../../components/AffiliateDisclosure';
import ReactMarkdown from 'react-markdown';
import { supabaseAdmin } from '../../../lib/supabaseServer';

export const revalidate = 3600;

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { data: article } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!article) notFound();

  return (
    <Container>
      <h1>{article.title}</h1>
      <AffiliateDisclosure />
      <div style={{ color: '#555', marginBottom: 18 }}>{article.meta_description}</div>
      <article>
        <ReactMarkdown>{article.content || ''}</ReactMarkdown>
      </article>
    </Container>
  );
}
