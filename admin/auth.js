/* ============================================
   KartKirala — Admin Auth
   ============================================ */

function renderAdminLogin() {
  return `
    <div class="admin-login-page">
      <div class="admin-login-bg"></div>
      <div class="admin-login-card">
        <div class="admin-login-logo">
          <span class="logo-icon" style="color: var(--accent-blue);">${Icons.creditCard(36)}</span>
          <span class="logo-text">Kart<span class="logo-highlight">Kirala</span></span>
        </div>
        <h2 class="admin-login-title">Admin Paneli</h2>
        <p class="admin-login-subtitle">Yönetim paneline erişmek için giriş yapın</p>

        <div class="admin-login-error" id="login-error">
          Email veya şifre hatalı. Lütfen tekrar deneyin.
        </div>

        <form class="admin-login-form" onsubmit="handleLogin(event)">
          <div class="form-group">
            <label class="form-label" for="login-email">Email</label>
            <input type="email" id="login-email" class="form-input" placeholder="admin@kartkirala.com" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Şifre</label>
            <input type="password" id="login-password" class="form-input" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
            Giriş Yap
            ${Icons.login(16)}
          </button>
        </form>

        <div class="admin-login-footer">
          <a href="#/">← Ana Sayfaya Dön</a>
        </div>

        <div style="margin-top: var(--space-6); padding: var(--space-4); background: rgba(99,102,241,0.08); border-radius: var(--radius-md); border: 1px solid rgba(99,102,241,0.15);">
          <p style="font-size: var(--font-size-xs); color: var(--text-muted); text-align: center;">
            <strong style="color: var(--accent-blue);">Demo Bilgileri:</strong><br>
            Email: admin@kartkirala.com<br>
            Şifre: admin123
          </p>
        </div>
      </div>
    </div>
  `;
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');

  const session = DataStore.login(email, password);
  if (session) {
    showToast('Hoş geldiniz, ' + session.name + '!', 'success');
    window.location.hash = '#/admin/dashboard';
  } else {
    errorEl.classList.add('visible');
    setTimeout(() => errorEl.classList.remove('visible'), 3000);
  }
}

function handleLogout() {
  DataStore.logout();
  showToast('Çıkış yapıldı.', 'info');
  window.location.hash = '#/admin';
}

function renderAdminSidebar(activePage) {
  const session = DataStore.isLoggedIn();
  return `
    <div class="admin-sidebar-overlay" id="admin-sidebar-overlay" onclick="toggleAdminSidebar()"></div>
    <aside class="admin-sidebar" id="admin-sidebar">
      <div class="admin-sidebar-header">
        <div class="admin-sidebar-brand">
          <span class="logo-icon" style="color: var(--accent-blue);">${Icons.creditCard(22)}</span>
          <span class="logo-text">Kart<span class="logo-highlight">Kirala</span></span>
        </div>
        <div class="admin-sidebar-badge">Admin Panel</div>
      </div>

      <nav class="admin-sidebar-nav">
        <div class="admin-nav-section">
          <div class="admin-nav-section-title">Genel</div>
          <a href="#/admin/dashboard" class="admin-nav-link ${activePage === 'dashboard' ? 'active' : ''}">
            <span class="admin-nav-icon">${Icons.barChart(18)}</span>
            Dashboard
          </a>
          <a href="#/admin/kartlar" class="admin-nav-link ${activePage === 'cards' ? 'active' : ''}">
            <span class="admin-nav-icon">${Icons.creditCard(18)}</span>
            Kartlar
          </a>
          <a href="#/admin/siparisler" class="admin-nav-link ${activePage === 'orders' ? 'active' : ''}">
            <span class="admin-nav-icon">${Icons.package(18)}</span>
            Siparişler
            <span class="admin-nav-badge">${DataStore.getOrders().filter(o => o.status === 'pending').length}</span>
          </a>
        </div>

        <div class="admin-nav-section">
          <div class="admin-nav-section-title">Yönetim</div>
          <a href="#/admin/kullanicilar" class="admin-nav-link ${activePage === 'users' ? 'active' : ''}">
            <span class="admin-nav-icon">${Icons.users(18)}</span>
            Kullanıcılar
          </a>
          <a href="#/admin/ayarlar" class="admin-nav-link ${activePage === 'settings' ? 'active' : ''}">
            <span class="admin-nav-icon">${Icons.settings(18)}</span>
            Ayarlar
          </a>
        </div>

        <div class="admin-nav-section">
          <div class="admin-nav-section-title">Diğer</div>
          <a href="#/" class="admin-nav-link">
            <span class="admin-nav-icon">${Icons.globe(18)}</span>
            Siteyi Görüntüle
          </a>
        </div>
      </nav>

      <div class="admin-sidebar-footer">
        <div class="admin-user-info">
          <div class="admin-user-avatar">${session ? session.name[0] : 'A'}</div>
          <div>
            <div class="admin-user-name">${session ? session.name : 'Admin'}</div>
            <div class="admin-user-role">${session ? session.role : 'Admin'}</div>
          </div>
        </div>
        <button class="admin-logout-btn" onclick="handleLogout()">
          ${Icons.logout(14)} Çıkış Yap
        </button>
      </div>
    </aside>
  `;
}

function renderAdminTopbar(title, subtitle) {
  return `
    <div class="admin-topbar">
      <div class="admin-topbar-left">
        <button class="admin-sidebar-toggle" onclick="toggleAdminSidebar()">${Icons.menu(20)}</button>
        <div>
          <div class="admin-page-title">${title}</div>
          ${subtitle ? `<div class="admin-page-subtitle">${subtitle}</div>` : ''}
        </div>
      </div>
      <div class="admin-topbar-right">
        <button class="admin-topbar-btn">
          ${Icons.bell(18)}
          <span class="notification-dot"></span>
        </button>
        <button class="admin-topbar-btn" onclick="window.location.hash='#/'">${Icons.globe(18)}</button>
      </div>
    </div>
  `;
}

function toggleAdminSidebar() {
  document.getElementById('admin-sidebar').classList.toggle('open');
  document.getElementById('admin-sidebar-overlay').classList.toggle('active');
}
