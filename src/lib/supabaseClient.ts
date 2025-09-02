// lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Função para criar um cliente mock para desenvolvimento
const createMockSupabaseClient = () => {
  return {
    from: () => ({
      insert: async () => ({ 
        error: { message: 'Supabase não configurado - modo desenvolvimento' },
        data: null 
      }),
      select: async () => ({ 
        error: { message: 'Supabase não configurado - modo desenvolvimento' },
        data: [] 
      }),
      update: async () => ({ 
        error: { message: 'Supabase não configurado - modo desenvolvimento' },
        data: null 
      }),
      delete: async () => ({ 
        error: { message: 'Supabase não configurado - modo desenvolvimento' },
        data: null 
      }),
    }),
    // Adicione outros métodos conforme necessário
  } as unknown as SupabaseClient;
};

let supabase: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase Warning] Variáveis de ambiente não definidas:\n' +
    `NEXT_PUBLIC_SUPABASE_URL = ${supabaseUrl || 'undefined'}\n` +
    `NEXT_PUBLIC_SUPABASE_ANON_KEY = ${supabaseAnonKey || 'undefined'}\n` +
    'Usando cliente mock para desenvolvimento. Para produção, configure as variáveis no .env.local'
  );

  // Cliente mock que não quebra a aplicação
  supabase = createMockSupabaseClient();
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };