/* ============================================
   KartKirala — Cards Catalog (Enhanced Filters)
   ============================================ */

async function renderCardsPage() {
  const cards = (await DataStore.getCards()).filter(c => c.active);

  return `
    <div class="page-enter" style="padding-top: calc(var(--nav-height) + var(--space-12));">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">${Icons.creditCard(16)} Kart Kataloğu</div>
          <h1 class="section-title">İhtiyacınıza Uygun <span class="gradient-text">Kartı Seçin</span></h1>
          <p class="section-subtitle">Visa veya Mastercard; Online, Apple veya Google destekli kartlarımızı filtreleyin.</p>
        </div>

        <div class="admin-grid-3" style="grid-template-columns: 280px 1fr; gap: var(--space-8);">
          <!-- Filters Sidebar -->
          <div class="glass-card" style="padding: var(--space-6); position: sticky; top: 100px; height: fit-content;">
            <h3 style="font-size: var(--font-size-lg); margin-bottom: var(--space-6); display: flex; align-items: center; gap: 8px;">
              ${Icons.search(18)} Filtrele
            </h3>
            
            <div class="filter-group" style="margin-bottom: var(--space-6);">
              <label class="form-label" style="font-size: var(--font-size-sm); color: var(--text-muted);">Kart Markası</label>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
                <label class="checkbox-container">
                  <input type="checkbox" checked onchange="filterCards()"> Visa
                </label>
                <label class="checkbox-container">
                  <input type="checkbox" checked onchange="filterCards()"> Mastercard
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label class="form-label" style="font-size: var(--font-size-sm); color: var(--text-muted);">Desteklenen Alanlar</label>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
                <label class="checkbox-container"><input type="checkbox" checked onchange="filterCards()"> Online Alışveriş</label>
                <label class="checkbox-container"><input type="checkbox" checked onchange="filterCards()"> Apple App Store</label>
                <label class="checkbox-container"><input type="checkbox" checked onchange="filterCards()"> Google Play Store</label>
              </div>
            </div>
            
            <button class="btn btn-secondary btn-sm" style="width: 100%; margin-top: var(--space-8);" onclick="resetFilters()">Filtreleri Sıfırla</button>
          </div>

          <!-- Cards Grid -->
          <div class="cards-grid" id="cards-page-grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
            ${cards.map(card => renderCardProductItem(card)).join('')}
          </div>
        </div>
      </div>
      <div style="height: var(--space-16);"></div>
    </div>
    
    <style>
      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-size: var(--font-size-sm);
      }
      .platform-badge {
         width: 28px;
         height: 28px;
         background: rgba(255,255,255,0.05);
         border-radius: 6px;
         display: flex;
         align-items: center;
         justify-content: center;
         color: var(--accent-blue);
         border: 1px solid rgba(255,255,255,0.1);
      }
    </style>
  `;
}

function renderCardProductItem(card) {
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
        <div class="card-product-type">${card.brand.toUpperCase()} - ${card.supports.length === 3 ? 'ALL-IN-ONE' : 'ÖZEL DESTEK'}</div>
        <h3 class="card-product-name">${card.name}</h3>
        
        <div class="platform-badges" style="display: flex; gap: var(--space-2); margin: var(--space-3) 0;">
          ${card.supports.includes('online') ? `<span class="platform-badge" title="Online Alışveriş">${Icons.shoppingCart(14)}</span>` : ''}
          ${card.supports.includes('apple') ? `<span class="platform-badge" title="App Store">${Icons.zap(14)}</span>` : ''}
          ${card.supports.includes('google') ? `<span class="platform-badge" title="Google Play">${Icons.smartphone(14)}</span>` : ''}
        </div>

        <div class="card-product-features">
          ${card.features.map(f => `
            <div class="card-feature-item">
              <div class="card-feature-icon">${Icons.check(11)}</div>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card-product-footer">
        <div class="card-price">
            <span class="card-price-amount">${card.currency}${card.price}</span>
        </div>
        <a href="#/cuzdan" class="btn btn-primary btn-sm">Hemen Al</a>
      </div>
    </div>
  `;
}

function filterCards() {
  // Demo filter logic
  showToast('Filtreleme uygulandı.', 'info');
}

function resetFilters() {
  location.reload();
}
