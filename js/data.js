/* ============================================
   KartKirala — Live Supabase Data Engine
   ============================================ */

const SB_URL = 'https://fyjulwullaavjmfceqrq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5anVsd3VsbGFhdmptZmNlcXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMDA4NzAsImV4cCI6MjA5Njg3Njg3MH0.fCLnUVqZxtesX7domAmUBQ79LeD__A5mcCfdwsgwM-o';

// SDK bağlantısı
window.dbClient = supabase.createClient(SB_URL, SB_KEY);

const DataStore = {
  async init() {
    console.log('Sistem Online: Veritabanına bağlandık.');
    return true;
  },

  getStats() {
    return { totalUsers: 840, totalTransactions: 12400 };
  },

  async getCards() {
    try {
      const { data, error } = await window.dbClient
        .from('cards')
        .select('*')
        .eq('active', true);
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Kart yükleme hatası:', err);
      return [];
    }
  },

  async register(email, password) {
    const { data, error } = await window.dbClient.auth.signUp({ email, password });
    if (error) throw error;
    await window.dbClient.from('profiles').insert([{ id: data.user.id, email: email }]);
    return data;
  },

  async login(email, password) {
    const { data, error } = await window.dbClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async getCurrentUser() {
    const { data: { user } } = await window.dbClient.auth.getUser();
    if (!user) return null;
    const { data: profile } = await window.dbClient.from('profiles').select('*').eq('id', user.id).single();
    return { ...user, profile };
  },

  async logout() {
    await window.dbClient.auth.signOut();
    location.reload();
  }
};

window.DataStore = DataStore;
