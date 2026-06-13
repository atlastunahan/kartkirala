/* ============================================
   KartKirala — Supabase Data Management
   ============================================ */

const DataStore = {
  // Uygulama başladığında çağrılan boş init fonksiyonu (app.js hatasını önler)
  async init() {
    console.log('DataStore Supabase bağlantısı aktif.');
    return true;
  },

  // Veritabanından Kartları Getir
  async getCards() {
    try {
      const { data, error } = await window.sbClient
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
    const { data, error } = await window.sbClient.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    
    // Profil oluştur
    await window.sbClient.from('profiles').insert([
      { id: data.user.id, email: email, balance: 0, role: 'user' }
    ]);
    
    return data;
  },

  // Giriş Yap
  async login(email, password) {
    const { data, error } = await window.sbClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Mevcut Kullanıcı Bilgisi
  async getCurrentUser() {
    const { data: { user } } = await window.sbClient.auth.getUser();
    if (!user) return null;

    const { data: profile } = await window.sbClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return { ...user, profile };
  },

  // Çıkış Yap
  async logout() {
    await window.sbClient.auth.signOut();
    location.reload();
  }
};

window.DataStore = DataStore;
