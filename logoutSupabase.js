import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out from Supabase:', error);
  }
});

