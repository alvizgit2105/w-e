import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// TODO: Replace these with your actual Supabase project values
const SUPABASE_URL = 'https://mmfpraghhxizlxrazwfi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wrihZdJPMl7L9stcZejXyQ_6ES8kSa0';

if (SUPABASE_URL === 'https://mmfpraghhxizlxrazwfi.supabase.co') {
  console.warn(
    'Supabase is not configured yet. Update SUPABASE_URL and SUPABASE_ANON_KEY in supabaseClient.js.',
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

