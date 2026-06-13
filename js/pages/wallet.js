/* ============================================
   KartKirala — User Wallet (Live Dynamic Data)
   ============================================ */

function renderWalletPage() {
  const user = DataStore.getCurrentUser();
  const settings = DataStore.getSettings() || { cryptoAddresses: {} };
  const cryptoAddrs = settings.cryptoAddresses || {};
  const orders = DataStore.getOrders().filter(o => o.userId === user.id);

  const activeCardsCount = orders.filter(o => o.status === 'active' || o.status === 'delivered').length;
  const totalSpentAmt = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.amount, 0);

  return `
    <div class="page-enter" style="padding-top: calc(var(--nav-height) + var(--space-12));">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">${Icons.wallet(16)} Cüzdanım</div>
          <h1 class="section-title">Bakiye <span class="gradient-text">Yükle</span></h1>
          <p class="section-subtitle">Hesabınızdaki gerçek verileri yönetin ve kripto ile bakiye yükleyin.</p>
        </div>

        <div class="admin-grid-3" style="align-items: start;">
          <!-- Professional Balance Card -->
          <div class="glass-card balance-card-premium">
            <div class="balance-card-header">
              <div class="balance-card-label">${Icons.activity(14)} Mevcut Bakiye</div>
              <div class="balance-card-logo">K<span>K</span></div>
            </div>
            <div class="balance-card-amount">
              <span class="balance-currency">$</span>
              <span class="balance-value">${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="balance-card-footer">
              <div class="balance-mini-stat">
                <span class="label">Toplam Harcama</span>
                <span class="value">$${totalSpentAmt.toFixed(2)}</span>
              </div>
              <div class="balance-mini-stat">
                <span class="label">Aktif Kartlar</span>
                <span class="value">${activeCardsCount} Adet</span>
              </div>
            </div>
          </div>

          <!-- Deposit Section -->
          <div class="glass-card" style="grid-column: span 2; padding: var(--space-8);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
              <h3 style="font-size: var(--font-size-xl);">Kripto Ödeme Yöntemleri</h3>
              <div class="badge badge-success">${Icons.shieldCheck(12)} %100 Güvenli</div>
            </div>
            
            <div class="crypto-selector" style="display: flex; gap: var(--space-3); margin-bottom: var(--space-8); flex-wrap: wrap;">
              <button class="crypto-btn active" onclick="selectCrypto('USDT', '${cryptoAddrs.USDT || ''}')">USDT.TRC20</button>
              <button class="crypto-btn" onclick="selectCrypto('BTC', '${cryptoAddrs.BTC || ''}')">Bitcoin</button>
              <button class="crypto-btn" onclick="selectCrypto('ETH', '${cryptoAddrs.ETH || ''}')">Ethereum</button>
              <button class="crypto-btn" onclick="selectCrypto('SOL', '${cryptoAddrs.SOL || ''}')">Solana</button>
              <button class="crypto-btn" onclick="selectCrypto('BNB', '${cryptoAddrs.BNB || ''}')">BNB Smart Chain</button>
            </div>

            <div id="crypto-payment-info" class="payment-box">
              <div class="payment-box-header">
                <span id="selected-crypto-name">USDT (TRC20)</span> Ödeme Adresi
              </div>
              <div class="payment-address-container" style="background: rgba(0,0,0,0.2);">
                <code id="deposit-address">${cryptoAddrs.USDT || 'AYARLANMAMIŞ'}</code>
                <button class="btn btn-primary btn-sm" onclick="copyAddress()">Kopyala</button>
              </div>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: var(--space-4); text-align: center;">
                ${Icons.alertTriangle(12)} Gönderim yaparken ağın <strong id="warning-network">TRC20</strong> olduğundan emin olun.
              </p>
            </div>
          </div>
        </div>

        <!-- History Table -->
        <div style="margin-top: var(--space-12);" class="admin-table-container">
          <div class="admin-table-header">
            <div class="admin-table-title">İşlem Geçmişi</div>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>İşlem ID</th>
                <th>Tür</th>
                <th>Birim</th>
                <th>Tutar</th>
                <th>Durum</th>
                <th>Tarih</th>
              </tr>
            </thead>
            <tbody>
              ${orders.length === 0 ? `
                <tr><td colspan="6" style="text-align: center; padding: var(--space-10); color: var(--text-muted);">Henüz bir işleminiz bulunmuyor.</td></tr>
              ` : orders.map(ord => `
                <tr>
                  <td>#${ord.id.slice(-6).toUpperCase()}</td>
                  <td>Kart Kiralama</td>
                  <td>${ord.cardName}</td>
                  <td class="admin-table-cell-primary">-$${ord.amount}</td>
                  <td>${getStatusBadge(ord.status)}</td>
                  <td>${formatDate(ord.createdAt)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div style="height: var(--space-16);"></div>
    </div>
  `;
}

function selectCrypto(name, address) {
  document.querySelectorAll('.crypto-btn').forEach(btn => btn.classList.toggle('active', btn.innerText.includes(name)));
  const networks = { USDT: 'USDT (TRC20)', BTC: 'Bitcoin', ETH: 'Ethereum (ERC20)', SOL: 'Solana', BNB: 'BNB (BEP20)' };
  const warning = { USDT: 'TRC20', BTC: 'BTC', ETH: 'ERC20', SOL: 'SOL', BNB: 'BEP20' };
  document.getElementById('selected-crypto-name').innerText = networks[name];
  document.getElementById('deposit-address').innerText = address || 'AYARLANMAMIŞ';
  document.getElementById('warning-network').innerText = warning[name];
}

function copyAddress() {
  const addr = document.getElementById('deposit-address').innerText;
  if(addr === 'AYARLANMAMIŞ') return showToast('Önce admin panelden adres ayarlayın!', 'error');
  navigator.clipboard.writeText(addr).then(() => showToast('Adres kopyalandı!', 'success'));
}
