/* ============================================
   KartKirala — Supabase Data Management
   ============================================ */

const DataStore = {
  // Veritabanından Kartları Getir
  async getCards() {
    try {
      const { data, error } = await window.supabase
        .from('cards')
        .select('*')
        .eq('active', true);
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Kartlar yüklenemedi:', err);
      return [];
    }
  },

  // Üye Ol
  async register(email, password) {
    const { data, error } = await window.supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    
    // Profil oluştur
    await window.supabase.from('profiles').insert([
      { id: data.user.id, email: email, balance: 0, role: 'user' }
    ]);
    
    return data;
  },

  // Giriş Yap
  async login(email, password) {
    const { data, error } = await window.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Mevcut Kullanıcı Bilgisi
  async getCurrentUser() {
    const { data: { user } } = await window.supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await window.supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return { ...user, profile };
  },

  // Çıkış Yap
  async logout() {
    await window.supabase.auth.signOut();
    location.reload();
  }
};

window.DataStore = DataStore;
