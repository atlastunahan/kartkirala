/* ============================================
   KartKirala — Home Page (Enhanced Card Guide)
   ============================================ */

function renderHomePage() {
  const cards = DataStore.getCards().filter(c => c.active);
  const stats = DataStore.getStats();

  const liveUsers = 1200 + stats.totalUsers;
  const liveOrders = 4500 + stats.totalOrders;

  return `
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

      <!-- NEW: Card Version Information Section -->
      <section class="section" id="card-versions" style="background: rgba(99,102,241,0.03);">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">${Icons.info(16)} Kart Rehberi</div>
            <h2 class="section-title">Kart <span class="gradient-text">Versiyonlarımız</span></h2>
            <p class="section-subtitle">Size en uygun kartı seçmek için özelliklerini inceleyin.</p>
          </div>
          
          <div class="info-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-6); margin-top: var(--space-10);">
            
            <div class="glass-card info-card" style="padding: var(--space-8); border-top: 4px solid var(--accent-blue);">
              <div style="display: flex; gap: var(--space-4); align-items: flex-start; margin-bottom: var(--space-4);">
                <div class="info-icon-box">${Icons.shoppingCart(24)}</div>
                <div>
                  <h4 style="font-size: var(--font-size-xl); margin-bottom: 4px;">Online Ödemeli</h4>
                  <p style="font-size: var(--font-size-sm); color: var(--text-muted);">Sadece Alışveriş Odaklı</p>
                </div>
              </div>
              <p style="font-size: var(--font-size-sm); line-height: 1.6; color: var(--text-secondary);">Amazon, eBay, AliExpress ve tüm global e-ticaret siteleri için optimize edilmiştir. Reklam platformları kapalıdır, bu yüzden daha düşük komisyon oranına sahiptir.</p>
            </div>

            <div class="glass-card info-card" style="padding: var(--space-8); border-top: 4px solid var(--accent-purple);">
              <div style="display: flex; gap: var(--space-4); align-items: flex-start; margin-bottom: var(--space-4);">
                <div class="info-icon-box">${Icons.smartphone(24)}</div>
                <div>
                  <h4 style="font-size: var(--font-size-xl); margin-bottom: 4px;">Store & Play</h4>
                  <p style="font-size: var(--font-size-sm); color: var(--text-muted);">Uygulama Mağazaları</p>
                </div>
              </div>
              <p style="font-size: var(--font-size-sm); line-height: 1.6; color: var(--text-secondary);">Apple App Store ve Google Play Store üzerinden uygulama içi satın alımlar (In-App Purchase) ve abonelikler için özel olarak tanımlanmış kartlardır.</p>
            </div>

            <div class="glass-card info-card" style="padding: var(--space-8); border-top: 4px solid var(--accent-cyan);">
              <div style="display: flex; gap: var(--space-4); align-items: flex-start; margin-bottom: var(--space-4);">
                <div class="info-icon-box">${Icons.zap(24)}</div>
                <div>
                  <h4 style="font-size: var(--font-size-xl); margin-bottom: 4px;">Hepsi Bir Arada</h4>
                  <p style="font-size: var(--font-size-sm); color: var(--accent-cyan); font-weight: 600;">Full Erişim (Ads Ready)</p>
                </div>
              </div>
              <p style="font-size: var(--font-size-sm); line-height: 1.6; color: var(--text-secondary);">Hem Meta hem Google reklamları, hem store harcamaları hem de online alışveriş için en güçlü kartımızdır. Hiçbir kısıtlama içermez.</p>
            </div>

          </div>
          
          <div class="glass-card" style="margin-top: var(--space-8); padding: var(--space-6); display: flex; align-items: center; gap: var(--space-4); background: rgba(255,255,255,0.02);">
            <div style="font-size: 24px;">💳</div>
            <p style="font-size: var(--font-size-sm); margin: 0;"><strong>Visa veya Mastercard?</strong> Her iki marka da global ödeme sistemlerinde %100 geçerlidir. Reklam hesabınızın veya bölgenizin tercihine göre dilediğinizi seçebilirsiniz.</p>
          </div>
        </div>
      </section>

      <!-- Platforms Grid Section -->
      <section class="section" id="platforms">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">${Icons.globe(16)} Global Erişim</div>
            <h2 class="section-title">Desteklenen <span class="gradient-text">Mecralar</span></h2>
          </div>
          <div class="platforms-grid">
             <div class="platform-item glass-card"><h4>Meta Ads</h4><p>FB & IG reklamları için.</p></div>
             <div class="platform-item glass-card"><h4>Google Play</h4><p>Uygulama içi ödemeler.</p></div>
             <div class="platform-item glass-card"><h4>App Store</h4><p>Abonelik ve satın alım.</p></div>
             <div class="platform-item glass-card"><h4>Amazon</h4><p>Global alışveriş.</p></div>
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
    <style>
      .info-icon-box {
        width: 48px;
        height: 48px;
        background: rgba(255,255,255,0.05);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--accent-blue);
      }
      .info-card { transition: all 0.3s ease; }
      .info-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.05); }
      .platforms-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 30px; }
      .platform-item { padding: 20px; text-align: center; }
    </style>
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
        <div class="platform-badges" style="display: flex; gap: var(--space-2); margin: var(--space-3) 0;">
          ${(card.supports || []).includes('online') ? `<span class="platform-badge" title="Online Alışveriş">${Icons.shoppingCart(12)}</span>` : ''}
          ${(card.supports || []).includes('apple') ? `<span class="platform-badge" title="App Store">${Icons.zap(12)}</span>` : ''}
          ${(card.supports || []).includes('google') ? `<span class="platform-badge" title="Google Play">${Icons.smartphone(12)}</span>` : ''}
        </div>
        <div class="card-product-features">
          ${(card.features || []).slice(0, 3).map(f => `<div class="card-feature-item"><div class="card-feature-icon">${Icons.check(11)}</div><span>${f}</span></div>`).join('')}
        </div>
      </div>
      <div class="card-product-footer">
        <div class="card-price"><span class="card-price-amount">${card.currency}${card.price}</span></div>
        <a href="#/cuzdan" class="btn btn-primary btn-sm">Hemen Al</a>
      </div>
    </div>
  `;
}
