/* ============================================
   KartKirala — Contact Page
   ============================================ */

function renderContactPage() {
  return `
    <div class="page-enter" style="padding-top: calc(var(--nav-height) + var(--space-12));">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">${Icons.mail(16)} İletişim</div>
          <h1 class="section-title">Bize <span class="gradient-text">Ulaşın</span></h1>
          <p class="section-subtitle">Sorularınız, önerileriniz veya iş birliği talepleriniz için bize yazın.</p>
        </div>

        <div class="contact-grid">
          <div>
            <div class="contact-info-list">
              <div class="contact-info-item">
                <div class="contact-info-icon">${Icons.mail(22)}</div>
                <div>
                  <div class="contact-info-title">Email</div>
                  <div class="contact-info-text">destek@kartkirala.com</div>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">${Icons.send(22)}</div>
                <div>
                  <div class="contact-info-title">Telegram</div>
                  <div class="contact-info-text">@KartKiralaDestek</div>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">${Icons.mapPin(22)}</div>
                <div>
                  <div class="contact-info-title">Adres</div>
                  <div class="contact-info-text">İstanbul, Türkiye</div>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">${Icons.clock(22)}</div>
                <div>
                  <div class="contact-info-title">Çalışma Saatleri</div>
                  <div class="contact-info-text">7/24 Online Destek</div>
                </div>
              </div>
            </div>

            <!-- Trust Badges -->
            <div style="margin-top: var(--space-10);">
              <div style="display: flex; gap: var(--space-4); flex-wrap: wrap;">
                <div class="glass-card" style="padding: var(--space-4) var(--space-5); flex: 1; min-width: 120px; text-align: center;">
                  <div style="margin-bottom: var(--space-2); color: var(--accent-blue);">${Icons.shieldCheck(28)}</div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">SSL Güvenli</div>
                </div>
                <div class="glass-card" style="padding: var(--space-4) var(--space-5); flex: 1; min-width: 120px; text-align: center;">
                  <div style="margin-bottom: var(--space-2); color: var(--accent-purple);">${Icons.zap(28)}</div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Hızlı Yanıt</div>
                </div>
                <div class="glass-card" style="padding: var(--space-4) var(--space-5); flex: 1; min-width: 120px; text-align: center;">
                  <div style="margin-bottom: var(--space-2); color: var(--accent-cyan);">${Icons.globe(28)}</div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Global Erişim</div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card">
            <h3 style="font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--space-6);">Mesaj Gönderin</h3>
            <form class="contact-form" id="contact-form" onsubmit="handleContactSubmit(event)">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="contact-name">Ad Soyad</label>
                  <input type="text" id="contact-name" class="form-input" placeholder="Adınızı girin" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-email">Email</label>
                  <input type="email" id="contact-email" class="form-input" placeholder="Email adresiniz" required>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-subject">Konu</label>
                <input type="text" id="contact-subject" class="form-input" placeholder="Mesajınızın konusu" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-message">Mesaj</label>
                <textarea id="contact-message" class="form-textarea" placeholder="Mesajınızı yazın..." rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                Gönder
                ${Icons.send(16)}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div style="height: var(--space-16);"></div>
    </div>
  `;
}

function handleContactSubmit(e) {
  e.preventDefault();
  showToast('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.', 'success');
  e.target.reset();
}
