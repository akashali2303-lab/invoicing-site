export type Tool = {
  id: string;
  slug: string;
  name: string;
  short_description?: string;
  long_description?: string;
  logo_url?: string;
  pricing_note?: string;
  features?: string[];
  official_url?: string;
};

export type Offer = {
  id: string;
  tool_id?: string;
  label?: string;
  affiliate_url: string;
  currency?: string;
  price?: number | null;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  meta_description?: string;
  content?: string;
  excerpt?: string;
  status?: 'draft' | 'published' | 'archived';
  author?: string;
  published_at?: string | null;
};
