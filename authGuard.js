import { supabase } from './supabaseClient.js';

async function ensureAuthenticated() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error checking session:', error);
  }

  if (!data || !data.session) {
    window.location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ensureAuthenticated();
});

