/* ============================================
   KartKirala — Pricing Page (Comparison Table)
   ============================================ */

function renderPricingPage() {
  return `
    <div class="page-enter" style="padding-top: calc(var(--nav-height) + var(--space-12));">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">${Icons.dollarSign(16)} Fiyatlandırma</div>
          <h1 class="section-title">Şeffaf <span class="gradient-text">Fiyatlandırma</span></h1>
          <p class="section-subtitle">Kart tiplerine ve desteklenen platformlara göre karşılaştırmalı planlar.</p>
        </div>

        <div class="admin-table-container glass-card" style="padding: 0; overflow-x: auto;">
          <table class="admin-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: rgba(255,255,255,0.03);">
                <th style="text-align: left; padding: var(--space-4);">Özellik</th>
                <th style="text-align: center;">Online Ödemeli</th>
                <th style="text-align: center;">Store & Play</th>
                <th style="text-align: center; color: var(--accent-cyan);">Hepsi Bir Arada (Ads)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Online Alışveriş (Amazon, eBay vb.)</td>
                <td style="text-align: center;">${Icons.checkCircle(18)}</td>
                <td style="text-align: center;">${Icons.checkCircle(18)}</td>
                <td style="text-align: center; color: var(--accent-cyan);">${Icons.checkCircle(18)}</td>
              </tr>
              <tr>
                <td>Uygulama Mağazaları (Apple/Google)</td>
                <td style="text-align: center; color: var(--text-muted); opacity: 0.3;">${Icons.close(18)}</td>
                <td style="text-align: center;">${Icons.checkCircle(18)}</td>
                <td style="text-align: center; color: var(--accent-cyan);">${Icons.checkCircle(18)}</td>
              </tr>
              <tr>
                <td>Reklam Platformları (Meta/Google Ads)</td>
                <td style="text-align: center; color: var(--text-muted); opacity: 0.3;">${Icons.close(18)}</td>
                <td style="text-align: center; color: var(--text-muted); opacity: 0.3;">${Icons.close(18)}</td>
                <td style="text-align: center; color: var(--accent-cyan);">${Icons.checkCircle(18)}</td>
              </tr>
              <tr>
                <td>Özel İsim Tanımlama</td>
                <td style="text-align: center;">${Icons.checkCircle(18)}</td>
                <td style="text-align: center;">${Icons.checkCircle(18)}</td>
                <td style="text-align: center; color: var(--accent-cyan);">${Icons.checkCircle(18)}</td>
              </tr>
              <tr>
                <td>KYC / Kimlik Onayı</td>
                <td style="text-align: center;">Gerekmez</td>
                <td style="text-align: center;">Gerekmez</td>
                <td style="text-align: center; color: var(--accent-cyan);">Gerekmez</td>
              </tr>
              <tr style="background: rgba(255,255,255,0.02);">
                <td><strong>Hizmet Bedeli</strong></td>
                <td style="text-align: center;"><strong>$10 - $15</strong></td>
                <td style="text-align: center;"><strong>$15 - $25</strong></td>
                <td style="text-align: center; color: var(--accent-cyan);"><strong>$25+</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: var(--space-10);">
          <a href="#/kartlar" class="btn btn-primary btn-lg">Kartları Gör ve Kirala</a>
        </div>
      </div>
      <div style="height: var(--space-16);"></div>
    </div>
  `;
}
