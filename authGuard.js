import { supabase } from './supabaseClient.js';

async function ensureAuthenticated() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('AuthGuard: session check error', error);
  }

  if (data?.session) {
    return; // User is logged in
  }

  // One retry after a short delay (in case we just landed from login and storage isn't ready yet)
  await new Promise((r) => setTimeout(r, 400));
  const { data: retryData } = await supabase.auth.getSession();
  if (retryData?.session) {
    return;
  }

  window.location.replace('index.html');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ensureAuthenticated());
} else {
  ensureAuthenticated();
}

