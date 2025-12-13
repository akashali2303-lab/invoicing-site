/*
scripts/publish-article.ts
Manual publish script. Requires SUPABASE env vars to be set in the environment.
Usage: node ./scripts/publish-article.ts <slug> --confirm
*/
import { createClient } from '@supabase/supabase-js';

const argv = process.argv.slice(2);
const slug = argv[0];
const confirm = argv.includes('--confirm');

if (!slug) {
  console.error('Usage: node ./scripts/publish-article.ts <slug> --confirm');
  process.exit(1);
}

if (!confirm) {
  console.error('This script requires --confirm to run. This prevents accidental automated publishing.');
  process.exit(1);
}

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE env vars.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function publish() {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('articles')
    .update({ status: 'published', published_at: now, updated_at: now })
    .eq('slug', slug);

  if (error) {
    console.error('Publish error', error);
    process.exit(1);
  }
  console.log('Published', data);
  process.exit(0);
}

publish();
