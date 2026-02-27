// Use an ESM-compatible CDN build of supabase-js for browser modules
// (official ESM bundle from jsDelivr)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/esm/supabase-js.mjs';

// Your Supabase project values (from Supabase Dashboard > Project Settings > API)
const SUPABASE_URL = 'https://riscruifcecupzsxisbo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_QZiiyAbZXqvW79JK09NFqA_CRB3_BnS';

// Basic sanity checks so misconfiguration shows clearly in the console
if (!SUPABASE_URL || !SUPABASE_URL.startsWith('https://')) {
  console.error('Supabase URL looks invalid. Check SUPABASE_URL in supabaseClient.js.');
}
if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.length < 20) {
  console.error('Supabase anon key looks invalid. Check SUPABASE_ANON_KEY in supabaseClient.js.');
}

// Create client with explicit session persistence so login survives redirect to dashboard
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'wisevent-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

