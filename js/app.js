/* ============================================
   KartKirala — Ana Uygulama Motoru (Production)
   ============================================ */

const App = {
  async init() {
    console.log("App başlatılıyor...");
    
    // 1. Veritabanını Başlat
    await DataStore.init();

    // 2. Navbar ve Footer gibi sabit parçaları render et
    this.renderSharedComponents();

    // 3. Mevcut sayfayı yükle
    this.handleRouting();

    // 4. Link tıklarını dinle
    window.addEventListener('hashchange', () => this.handleRouting());
  },

  renderSharedComponents() {
    const nav = document.getElementById('public-nav');
    const footer = document.getElementById('public-footer');

    // Navbar Render (icons.js'den Icons objesini kullanır)
    if (nav) {
      nav.innerHTML = `
        <div class="container nav-container">
          <a href="#/" class="logo">
            <img src="assets/logo-vibrant.png" alt="KartKirala" class="logo-img">
          </a>
          <div class="nav-links">
            <a href="#/kartlar">Kartlar</a>
            <a href="#/fiyatlar">Fiyatlar</a>
            <a href="#/sss">S.S.S</a>
            <a href="#/iletisim">İletişim</a>
            <a href="#/cuzdan" class="btn btn-primary btn-sm">Cüzdanım</a>
          </div>
          <button class="menu-toggle" id="menu-toggle">${Icons.menu(24)}</button>
        </div>
      `;
    }

    if (footer) {
      footer.innerHTML = `
        <div class="container footer-grid">
          <div class="footer-brand">
            <img src="assets/logo-vibrant.png" alt="KartKirala" class="footer-logo">
            <p>Dünya genelinde anonim ve güvenli harcama yapın.</p>
          </div>
          <div class="footer-links">
            <h4>Hızlı Menü</h4>
            <a href="#/">Ana Sayfa</a>
            <a href="#/kartlar">Kart Kataloğu</a>
            <a href="#/fiyatlar">Fiyatlandırma</a>
          </div>
        </div>
      `;
    }
  },

  async handleRouting() {
    const path = window.location.hash.replace('#/', '') || 'home';
    console.log("Sayfa yükleniyor:", path);

    window.scrollTo(0, 0);

    try {
      if (path === 'home') {
        await renderHomePage();
      } else if (path === 'kartlar') {
        await renderCardsPage();
      } else if (path === 'fiyatlar') {
        renderPricingPage();
      } else if (path === 'cuzdan') {
        renderWalletPage();
      } else if (path === 'sss') {
        renderFaqPage();
      } else if (path === 'iletisim') {
        renderContactPage();
      }
    } catch (err) {
      console.error("Sayfa yükleme hatası:", err);
    }
  }
};

// Sayfa yüklendiğinde başlat
window.addEventListener('DOMContentLoaded', () => App.init());
