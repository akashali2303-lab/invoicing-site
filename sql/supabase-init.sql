-- sql/supabase-init.sql
-- Run in Supabase SQL editor. Creates tables for tools, offers, clicks, articles.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- tools
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_description text,
  long_description text,
  logo_url text,
  pricing_note text,
  features jsonb DEFAULT '[]'::jsonb,
  official_url text,
  created_at timestamptz DEFAULT now()
);

-- offers
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  label text,
  affiliate_url text NOT NULL,
  currency text,
  price numeric,
  tracking_params jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- clicks (tracking)
CREATE TABLE IF NOT EXISTS clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid REFERENCES offers(id) ON DELETE CASCADE,
  tool_id uuid REFERENCES tools(id),
  ip_hash text,
  user_agent text,
  referrer text,
  campaign text,
  created_at timestamptz DEFAULT now()
);

-- articles
CREATE TYPE IF NOT EXISTS article_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  meta_description text,
  content text,
  excerpt text,
  status article_status DEFAULT 'draft',
  author text,
  published_at timestamptz,
  canonical_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_offers_tool_id ON offers(tool_id);
CREATE INDEX IF NOT EXISTS idx_clicks_offer_id ON clicks(offer_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Seed: tools
INSERT INTO tools (id, slug, name, short_description, long_description, logo_url, pricing_note, features, official_url)
VALUES
('11111111-1111-1111-1111-111111111111', 'wave', 'Wave', 'Free invoicing & accounting for freelancers', 'Wave offers free invoicing, receipts scanning, and basic accounting. Good for freelancers needing a zero-cost solution.', '/logos/wave.png', 'Free plan available', '["Invoicing","Accounting","Bank connections"]', 'https://www.waveapps.com'),
('22222222-2222-2222-2222-222222222222', 'freshbooks', 'FreshBooks', 'User-friendly invoicing & time tracking', 'FreshBooks is a popular, easy-to-use invoicing and time-tracking tool designed for freelancers and small businesses.', '/logos/freshbooks.png', '14-day trial often available', '["Invoicing","Time tracking","Estimates"]', 'https://www.freshbooks.com'),
('33333333-3333-3333-3333-333333333333', 'zoho-invoice', 'Zoho Invoice', 'Feature-rich invoicing with free tier', 'Zoho Invoice offers a free tier for small users and integrates with the Zoho suite.', '/logos/zoho-invoice.png', 'Free tier for small usage', '["Invoicing","Recurring invoices","Payments"]', 'https://www.zoho.com/invoice'),
('44444444-4444-4444-4444-444444444444', 'invoice-ninja', 'Invoice Ninja', 'Open-source invoicing with hosted option', 'Invoice Ninja is flexible and comes as self-hosted or hosted plans; good for tech-savvy freelancers.', '/logos/invoice-ninja.png', 'Self-hosted available', '["Invoicing","Client portal","Time tracking"]', 'https://www.invoiceninja.com'),
('55555555-5555-5555-5555-555555555555', 'paypal-invoicing', 'PayPal Invoicing', 'Quick invoicing tied to PayPal payments', 'PayPal Invoicing is simple and integrates directly with PayPal payments; good if clients prefer PayPal.', '/logos/paypal-invoicing.png', 'Pay as you go fees', '["Simple invoices","PayPal payments"]', 'https://www.paypal.com/invoicing');

-- Seed: offers (affiliate URLs placeholders: replace with real affiliate URLs)
INSERT INTO offers (id, tool_id, label, affiliate_url, currency)
VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Wave - Visit site', 'https://example.com/affiliate/wave', 'USD'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'FreshBooks - Start trial', 'https://example.com/affiliate/freshbooks', 'USD'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Zoho Invoice - Visit', 'https://example.com/affiliate/zoho-invoice', 'USD'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 'Invoice Ninja - Get started', 'https://example.com/affiliate/invoice-ninja', 'USD'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', 'PayPal Invoicing - Learn more', 'https://example.com/affiliate/paypal-invoicing', 'USD');

-- Seed: articles (DRAFT only)
INSERT INTO articles (slug, title, meta_description, content, excerpt, status, author)
VALUES
('best-invoicing-software-for-freelancers', 'Best invoicing software for freelancers', 'Compare the top invoicing software for freelancers with pros, cons, and real use cases. Draft.', '# DRAFT: Best invoicing software for freelancers\n\nThis is a draft.','Short excerpt - draft','draft','AI Draft'),
('best-free-invoicing-software-for-freelancers', 'Best free invoicing software for freelancers', 'Free invoicing tools compared for freelancers. Draft.','# DRAFT: Best free invoicing software','Short excerpt - draft','draft','AI Draft'),
('invoicing-software-for-freelancers-in-bangladesh', 'Invoicing software for freelancers in Bangladesh', 'Tools and payment tips for freelancers in Bangladesh. Draft.','# DRAFT: Invoicing in Bangladesh','Short excerpt - draft','draft','AI Draft'),
('wave-vs-freshbooks-for-freelancers', 'Wave vs FreshBooks for freelancers', 'Side-by-side comparison of Wave and FreshBooks. Draft.','# DRAFT: Wave vs FreshBooks','Short excerpt - draft','draft','AI Draft'),
('best-invoicing-software-for-solo-freelancers', 'Best invoicing software for solo freelancers', 'Top invoicing options for solo freelancers. Draft.','# DRAFT: Best for solo freelancers','Short excerpt - draft','draft','AI Draft');
