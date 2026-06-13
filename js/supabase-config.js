/* ============================================
   KartKirala — Supabase Client Configuration
   ============================================ */

const SUPABASE_URL = 'https://fyjulwullaavjmfceqrq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_P-hW9J18Wha53ayDWHINOg_3Xt358DL';

// Supabase kütüphanesini initialized ediyoruz
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabase = supabase; // Global erişim için
