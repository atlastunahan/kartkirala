/* ============================================
   KartKirala — Home Page (Production Async)
   ============================================ */

async function renderHomePage() {
  const allCards = await DataStore.getCards();
  const cards = allCards.filter(c => c.active);
  const stats = DataStore.getStats();

  const liveUsers = 1200 + stats.totalUsers;
  const appContent = document.getElementById('app-content');

  appContent.innerHTML = `
    <div class="page-enter">
      <!-- Hero Section -->
      <section class="hero" id="hero-section">
        <div class="hero-bg">
          <div class="hero-gradient-orb"></div>
          <div class="hero-gradient-orb"></div>
          <div class="hero-gradient-orb"></div>
          <div class="hero-grid-lines"></div>
        </div>
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="hero-badge-dot"></span>
              Visa & Mastercard Altyapısı
            </div>
            <h1 class="hero-title">
              İhtiyacınıza Özel<br>
              <span class="gradient-text">Kart Modelleri</span>
            </h1>
            <p class="hero-subtitle">
              Sadece online alışveriş için mi, yoksa reklam ödemeleri için mi? 
              İhtiyacınız olan desteği seçin, kartınızı anında oluşturun.
            </p>
            <div class="hero-actions">
              <a href="#/kartlar" class="btn btn-primary btn-lg">Kart Seçin</a>
              <a href="#/cuzdan" class="btn btn-secondary btn-lg">Bakiye Yükle</a>
            </div>
          </div>
          <div class="hero-visual">
             <div class="hero-card-stack">
          <div class="hero-credit-card">
            <div class="card-chip"></div>
            <div class="card-number">**** **** **** 4812</div>
            <div class="card-bottom">
              <div class="card-info">
                <div class="card-holder">KART SAHİBİ</div>
                <div class="card-holder-name">Ahmet Yılmaz</div>
              </div>
              <img src="assets/visa.svg" alt="Visa" style="height: 35px; width: auto; opacity: 0.9;">
            </div>
          </div>
          <div class="hero-credit-card">
            <div class="card-chip"></div>
            <div class="card-number">**** **** **** 9015</div>
            <div class="card-bottom">
              <div class="card-info">
                <div class="card-holder">KART SAHİBİ</div>
                <div class="card-holder-name">Ahmet Yılmaz</div>
              </div>
              <img src="assets/mastercard.svg" alt="Mastercard" style="height: 35px; width: auto; opacity: 0.9;">
            </div>
          </div>
          <div class="hero-credit-card">
            <div class="card-chip"></div>
            <div class="card-number">**** **** **** 2744</div>
            <div class="card-bottom">
              <div class="card-info">
                <div class="card-holder">KART SAHİBİ</div>
                <div class="card-holder-name">Ahmet Yılmaz</div>
              </div>
              <img src="assets/visa.svg" alt="Visa" style="height: 35px; width: auto; opacity: 0.9;">
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>

      <!-- Featured Cards -->
      <section class="section" id="featured-cards" style="background: var(--bg-secondary);">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">${Icons.diamond(16)} Kartlar</div>
            <h2 class="section-title">Canlı <span class="gradient-text">Stoklar</span></h2>
          </div>
          <div class="cards-grid">
            ${cards.length === 0 
              ? `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">Kart bulunmuyor.</div>` 
              : cards.slice(0, 3).map(card => renderCardProduct(card)).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderCardProduct(card) {
  return `
    <div class="card-product">
      <div class="card-product-visual">
        <div class="card-mini" style="background: ${card.gradient}; position: relative;">
          <div class="card-mini-chip"></div>
          <div class="card-mini-number">•••• •••• •••• ••••</div>
          <div class="card-mini-bottom" style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div class="card-mini-name" style="font-size: 10px; opacity: 0.8;">Ahmet Yılmaz</div>
            <img src="assets/${card.brand.toLowerCase()}.svg" alt="${card.brand}" style="height: 20px; width: auto; filter: brightness(0) invert(1); opacity: 0.9;">
          </div>
        </div>
      </div>
      <div class="card-product-info">
        <div class="card-product-type">${card.brand.toUpperCase()} - ${card.supports.length === 3 ? 'HEPSİ BİR ARADA' : 'ÖZEL KAPSAM'}</div>
        <h3 class="card-product-name">${card.name}</h3>
      </div>
      <div class="card-product-footer">
        <div class="card-price"><span class="card-price-amount">${card.currency}${card.price}</span></div>
        <a href="#/cuzdan" class="btn btn-primary btn-sm">Hemen Al</a>
      </div>
    </div>
  `;
}
