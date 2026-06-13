/* ============================================
   KartKirala — Cards Catalog (Production)
   ============================================ */

async function renderCardsPage() {
  const cards = (await DataStore.getCards()).filter(c => c.active);
  const appContent = document.getElementById('app-content');

  appContent.innerHTML = `
    <div class="page-enter" style="padding-top: calc(var(--nav-height) + var(--space-12));">
      <div class="container">
        <div class="section-header">
           <h2 class="section-title">En İyi <span class="gradient-text">Kartlar</span></h2>
           <p class="section-subtitle">Tüm dünyada geçerli sanal kart seçeneklerimiz.</p>
        </div>
        <div class="cards-grid">
           ${cards.map(card => renderCardProduct(card)).join('')}
        </div>
      </div>
    </div>
  `;
}
