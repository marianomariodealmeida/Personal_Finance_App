import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Substitui com os dados do teu projeto Supabase (Project Settings > API)
const SUPABASE_URL = 'https://kezeqibxjsjiuoocpryl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlemVxaWJ4anNqaXVvb2NwcnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MjE1OTIsImV4cCI6MjEwNjE5NzU5Mn0.w-u6qdN72npn5IsMl9sRPAj--xYVEp8akZOl2e42l3I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Gestão de Sessão do Utilizador
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

// Invocação da Edge Function para o Chat com o Gemini
export async function sendChatMessage(message) {
  const { data, error } = await supabase.functions.invoke('chat-pierre', {
    body: { message }
  });

  if (error) {
    console.error('Erro ao chamar a Edge Function:', error);
    throw new Error('Falha ao obter resposta do assistente.');
  }

  return data; // Retorna { text: "...", widget: { ... } }
}
