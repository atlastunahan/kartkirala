/* ============================================
   KartKirala — Supabase Client Configuration
   ============================================ */

const SUPABASE_URL = 'https://fyjulwullaavjmfceqrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5anVsd3VsbGFhdmptZmNlcXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMDA4NzAsImV4cCI6MjA5Njg3Njg3MH0.fCLnUVqZxtesX7domAmUBQ79LeD__A5mcCfdwsgwM-o';

// Supabase kütüphanesini initialized ediyoruz
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabase = supabase; // Global erişim için
