import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseServer';
import { createHash } from 'crypto';

export async function GET(request: Request, { params }: { params: { id: string }}) {
  const id = params.id;
  if (!id) return new Response('Missing id', { status: 400 });

  const { data: offer, error } = await supabaseAdmin.from('offers').select('id,affiliate_url,tool_id').eq('id', id).single();

  if (error || !offer) {
    return new Response('Offer not found', { status: 404 });
  }

  // Collect limited headers (no raw IP storage)
  const headers = request.headers;
  const userAgent = headers.get('user-agent') ?? '';
  const referer = headers.get('referer') ?? headers.get('referrer') ?? '';
  // Get client IP from x-forwarded-for if present
  const xff = headers.get('x-forwarded-for') ?? '';
  const ipRaw = xff.split(',')[0].trim() || '';

  // Anonymize IP by hashing
  let ipHash = null;
  try {
    if (ipRaw) {
      ipHash = createHash('sha256').update(ipRaw).digest('hex');
    }
  } catch (err) {
    ipHash = null;
  }

  // Insert click record (store hashed IP only)
  try {
    await supabaseAdmin.from('clicks').insert({
      offer_id: offer.id,
      tool_id: offer.tool_id,
      ip_hash: ipHash,
      user_agent: userAgent,
      referrer: referer
    });
  } catch (e) {
    // swallow logging errors; do not block redirect
    console.error('Click logging error', e);
  }

  // Redirect to affiliate URL (first-party)
  return NextResponse.redirect(offer.affiliate_url, 307);
}
