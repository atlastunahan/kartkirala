/* ============================================
   KartKirala — FAQ Page (Privacy Focused)
   ============================================ */

function renderFaqPage() {
  const faqs = [
    {
      q: 'Kart kiralarken kimlik doğrulaması (KYC) gerekiyor mu?',
      a: 'Hayır. KartKirala tamamen gizlilik odaklı bir platformdur. Pasaport, kimlik veya adres belgesi gibi kişisel bilgilerinizi asla talep etmiyoruz.'
    },
    {
      q: 'Kartın üzerine istediğim ismi yazdırabilir miyim?',
      a: 'Evet. Kartınızı oluştururken "Kart Sahibi" kısmına dilediğiniz isim ve soyismi yazabilirsiniz. Bu isim, online harcamalarınızdaki "Billing Name" (Fatura İsmi) ile uyumlu olacak şekilde sistemimize tanımlanır.'
    },
    {
      q: 'Ödemelerimi nasıl yapabilirim?',
      a: 'Sistemimiz sadece kripto para birimleri (USDT, BTC, ETH, SOL, BNB) ile çalışır. Bu sayede banka dökümlerinizde herhangi bir kiralama işlemi görünmez, tam gizlilik sağlanır.'
    },
    {
      q: 'Kartlar hangi platformlarda geçerlidir?',
      a: 'Kartlarımız Google Ads, Facebook (Meta) Ads, Amazon, Netflix, Spotify ve tüm global e-ticaret sitelerinde sorunsuz çalışmaktadır. %100 uyumluluk garantisi veriyoruz.'
    },
    {
      q: 'Kartım ne kadar sürede aktif olur?',
      a: 'Kripto ödemeniz sistemimiz tarafından onaylandıktan (genellikle 1-5 dakika) sonra kartınız anında panelinize düşer ve kullanıma hazır hale gelir.'
    }
  ];

  return `
    <div class="page-enter" style="padding-top: calc(var(--nav-height) + var(--space-12));">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">${Icons.helpCircle(16)} Destek Merkezi</div>
          <h1 class="section-title">Sıkça Sorulan <span class="gradient-text">Sorular</span></h1>
          <p class="section-subtitle">Gizlilik, güvenlik ve kullanım hakkında merak ettiğiniz her şey.</p>
        </div>

        <div class="faq-container" style="max-width: 800px; margin: 0 auto;">
          ${faqs.map((faq, index) => `
            <div class="glass-card faq-item" style="margin-bottom: var(--space-4); border: 1px solid rgba(255,255,255,0.05);">
              <div class="faq-question" style="padding: var(--space-5); cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="this.nextElementSibling.classList.toggle('active'); this.querySelector('.faq-toggle').innerText = this.nextElementSibling.classList.contains('active') ? '-' : '+';">
                <span style="font-weight: 600; font-size: var(--font-size-lg); color: var(--text-primary);">${faq.q}</span>
                <span class="faq-toggle" style="font-size: 24px; color: var(--accent-blue);">+</span>
              </div>
              <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: all 0.3s ease-out; padding: 0 var(--space-5);">
                <p style="padding-bottom: var(--space-5); color: var(--text-secondary); line-height: 1.6;">${faq.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="height: var(--space-16);"></div>
    </div>
    <style>
      .faq-answer.active {
        max-height: 300px !important;
        padding-top: var(--space-2) !important;
      }
    </style>
  `;
}
