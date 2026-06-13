/* ============================================
   KartKirala — Home Page (Full Detailed Build)
   ============================================ */

async function renderHomePage() {
  const cards = (await DataStore.getCards()).filter(c => c.active);
  const appContent = document.getElementById('app-content');

  appContent.innerHTML = `
    <div class="page-enter">
      <!-- Hero Section -->
      <section class="hero" style="min-height: 80vh; display: flex; align-items: center;">
        <div class="container hero-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
          <div class="hero-content">
            <h1 class="hero-title" style="font-size: clamp(2rem, 5vw, 4rem); font-weight: 800; line-height: 1.1;">
              Kripto ile Anında <br><span class="gradient-text">Özgürleşin</span>
            </h1>
            <p class="hero-subtitle" style="margin: 20px 0; opacity: 0.8; font-size: 1.1rem;">USDT, BTC ve ETH ile anında sanal veya fiziksel kart kiralayın, tüm dünyada anonim harcama yapın.</p>
            <div class="hero-actions" style="display: flex; gap: 15px;">
              <a href="#/kartlar" class="btn btn-primary btn-lg">Kart Seçin</a>
              <a href="#/cuzdan" class="btn btn-secondary btn-lg">Cüzdanım</a>
            </div>
          </div>
          <div class="hero-visual" style="position: relative;">
            <div class="hero-credit-card" style="width: 320px; height: 180px; background: linear-gradient(135deg, #6366f1, #a855f7); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); padding: 25px; display: flex; flex-direction: column; justify-content: space-between;">
              <div class="card-chip" style="width: 40px; height: 30px; background: #fbbf24; border-radius: 5px;"></div>
              <div class="card-number" style="font-family: monospace; font-size: 1.2rem; letter-spacing: 2px;">**** **** **** 4812</div>
              <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; opacity: 0.8;">PREMIUM USER</span>
                <span style="font-weight: bold; font-style: italic;">VISA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Cards -->
      <section class="section" style="padding: 80px 0; background: rgba(255,255,255,0.02);">
        <div class="container">
          <h2 class="section-title" style="text-align: center; margin-bottom: 50px;">Canlı <span class="gradient-text">Kart Stokları</span></h2>
          <div class="cards-grid">
            ${cards.length === 0 
              ? `<p style="text-align:center; grid-column: 1/-1;">Kartlar yükleniyor...</p>` 
              : cards.slice(0, 3).map(card => `
                <div class="card-product glass-card">
                  <div class="card-mini" style="background: ${card.gradient}; height: 120px; border-radius: 12px; margin-bottom: 15px;"></div>
                  <h3>${card.name}</h3>
                  <p style="font-size: 0.9rem; opacity: 0.7;">${card.brand.toUpperCase()} Altyapısı</p>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                    <span style="font-weight: 800; font-size: 1.2rem;">${card.currency}${card.price}</span>
                    <a href="#/cuzdan" class="btn btn-primary btn-sm">Hemen Al</a>
                  </div>
                </div>
              `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}
