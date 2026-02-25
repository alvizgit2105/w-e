// Use an ESM-compatible CDN build of supabase-js for browser modules
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Your Supabase project values
const SUPABASE_URL = 'https://mmfpraghhxizlxrazwfi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wrihZdJPMl7L9stcZejXyQ_6ES8kSa0';

// Basic sanity checks so misconfiguration shows clearly in the console
if (!SUPABASE_URL || !SUPABASE_URL.startsWith('https://')) {
  console.error('Supabase URL looks invalid. Check SUPABASE_URL in supabaseClient.js.');
}

if (!SUPABASE_ANON_KEY || !SUPABASE_ANON_KEY.startsWith('sb_')) {
  console.error('Supabase anon key looks invalid. Check SUPABASE_ANON_KEY in supabaseClient.js.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

