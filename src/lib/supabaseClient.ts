// lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase Error] Variáveis de ambiente não definidas:\n' +
    `NEXT_PUBLIC_SUPABASE_URL = ${supabaseUrl}\n` +
    `NEXT_PUBLIC_SUPABASE_ANON_KEY = ${supabaseAnonKey}\n` +
    'Certifique-se de que estas variáveis estão definidas no .env.local ou no Vercel.'
  );

  // Cliente falso que lança erro se usado
  supabase = {} as SupabaseClient; // cast para satisfazer o TS
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
