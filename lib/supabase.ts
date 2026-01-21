import { createClient } from '@supabase/supabase-js';

// Mengambil variabel dari .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validasi agar tidak error saat build jika lupa pasang .env
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase Environment Variables');
}

// Export client untuk dipakai di seluruh aplikasi
export const supabase = createClient(supabaseUrl, supabaseKey);