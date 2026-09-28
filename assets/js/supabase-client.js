import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://kezeqibxjsjiuoocpryl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlemVxaWJ4anNqaXVvb2NwcnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MjE1OTIsImV4cCI6MjEwNjE5NzU5Mn0.w-u6qdN72npn5IsMl9sRPAj--xYVEp8akZOl2e42l3I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

// Login via Google
export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  });
  if (error) console.error('Erro no login com Google:', error.message);
}

// Login via Microsoft
export async function loginWithMicrosoft() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: { redirectTo: window.location.origin }
  });
  if (error) console.error('Erro no login com Microsoft:', error.message);
}

// Expõe globalmente para uso direto em botões HTML
window.loginWithGoogle = loginWithGoogle;
window.loginWithMicrosoft = loginWithMicrosoft;
