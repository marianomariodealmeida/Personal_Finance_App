import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    // 1. Inicializar cliente Supabase com token de autorização
    const authHeader = req.headers.get('Authorization')!;
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // 2. Obter utilizador autenticado
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 401, headers: corsHeaders });
    }

    // 3. Procurar transações recentes para contextualizar a IA
    const { data: transactions } = await supabase
      .from('transactions')
      .select('title, amount, category, type, transaction_date')
      .eq('user_id', user.id)
      .limit(30);

    const contextData = JSON.stringify(transactions || []);

    // 4. Chamada à API REST do Gemini 2.0 Flash
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const systemPrompt = `
      És o Pierre, um assistente financeiro pessoal inteligente e direto.
      Analisa os dados das transações do utilizador: ${contextData}.
      Responde em Português com clareza. Se o utilizador pedir dados sobre categorias ou resumos, devolve o texto acompanhado por uma sugestão de gráfico.
    `;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nPergunta do utilizador: ${message}` }] }
          ]
        })
      }
    );

    const geminiData = await geminiResponse.json();
    const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Não consegui processar a resposta neste momento.";

    return new Response(
      JSON.stringify({ text: replyText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
