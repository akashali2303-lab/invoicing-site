# Freelancer Invoicing Affiliate (scaffold)

Scaffolded Next.js (App Router) TypeScript project for "Best invoicing software for freelancers".

Files created:
- Next.js app (app/)
- Components (components/)
- Supabase SQL (sql/supabase-init.sql)
- Draft articles (content/drafts/)
- Redirect API (app/api/redirect/[id]/route.ts)
- Publish script (scripts/publish-article.ts)

Next steps:
1. Install dependencies: npm install
2. Create a Supabase project and run sql/supabase-init.sql (or use psql via --db-url).
3. Set env vars in Vercel: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SITE_NAME
4. Push to GitHub / Connect to Vercel.

This repository is intentionally seeded with draft content only. Do not publish drafts without review.
