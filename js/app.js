/* ============================================
   KartKirala — Ana Uygulama Motoru (Full Build)
   ============================================ */

const App = {
  async init() {
    await DataStore.init();
    this.renderSharedComponents();
    this.handleRouting();
    window.addEventListener('hashchange', () => this.handleRouting());
  },

  renderSharedComponents() {
    const nav = document.getElementById('public-nav');
    const footer = document.getElementById('public-footer');

    if (nav) {
      nav.innerHTML = `
        <div class="container nav-container">
          <a href="#/" class="logo">
            <span class="gradient-text" style="font-weight: 800; font-size: 24px;">KARTKIRALA</span>
          </a>
          <div class="nav-links">
            <a href="#/kartlar">Kartlar</a>
            <a href="#/fiyatlar">Fiyatlar</a>
            <a href="#/cuzdan">Cüzdan</a>
          </div>
          <button class="menu-toggle">${Icons.menu(24)}</button>
        </div>
      `;
    }

    if (footer) {
      footer.innerHTML = `
        <div class="container footer-grid" style="padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.1);">
          <div class="footer-brand">
            <h3 class="gradient-text">KARTKIRALA</h3>
            <p>Anonim ve güvenli kripto kart kiralama.</p>
          </div>
          <p style="opacity: 0.5; font-size: 12px; margin-top: 20px;">&copy; 2026 KartKirala. Tüm hakları saklıdır.</p>
        </div>
      `;
    }
  },

  async handleRouting() {
    const path = window.location.hash.replace('#/', '') || 'home';
    window.scrollTo(0, 0);
    if (path === 'home') await renderHomePage();
    else if (path === 'kartlar') await renderCardsPage();
    else if (path === 'fiyatlar') renderPricingPage();
    else if (path === 'cuzdan') renderWalletPage();
  }
};

window.addEventListener('DOMContentLoaded', () => App.init());
