/* app/api/subscribe/route.ts */
import { NextResponse } from 'next/server';
// Note: We use THREE sets of '../' to go up from 'subscribe' -> 'api' -> 'app' -> root
import { supabaseAdmin } from '../../../lib/supabaseServer';

export async function POST(request: Request) {
  console.log("1. API Route was hit!"); // Debug Log

  try {
    const body = await request.json();
    console.log("2. Received email:", body.email); // Debug Log

    if (!body.email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .insert({ email: body.email })
      .select();

    if (error) {
      console.error("3. Supabase Error:", error); // Debug Log
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("4. Success!"); // Debug Log
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("5. Server Crash:", err); // Debug Log
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}