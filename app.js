/* ============================================
   KartKirala — Main Application / Router (FORCE UPDATE)
   ============================================ */

(function () {
  'use strict';

  // Initialize data store
  DataStore.init();

  // Force scroll to top on refresh and disable browser's auto-scroll memory
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // ---- Router Setup ----
  const routes = {
    '/': { 
      render: renderHomePage, 
      title: 'KartKirala — Sanal & Fiziksel Kredi Kartı Kiralama', 
      desc: 'Visa, Mastercard ve Amex kartlarını kiralayın.',
      isPublic: true 
    },
    '/kartlar': { 
      render: renderCardsPage, 
      title: 'Kart Kataloğu — KartKirala', 
      desc: 'Kart seçeneklerimizi keşfedin.',
      isPublic: true 
    },
    '/fiyatlandirma': { 
      render: renderPricingPage, 
      title: 'Fiyatlandırma — KartKirala', 
      desc: 'Fiyatlandırma politikamız.',
      isPublic: true 
    },
    '/cuzdan': { 
      render: renderWalletPage, 
      title: 'Cüzdanım — KartKirala', 
      desc: 'Kripto ile bakiye yükleyin.',
      isPublic: true 
    },
    '/sss': { 
      render: renderFaqPage, 
      title: 'Sıkça Sorulan Sorular', 
      isPublic: true 
    },
    '/iletisim': { 
      render: renderContactPage, 
      title: 'İletişim — KartKirala', 
      isPublic: true 
    },
    '/admin': { render: renderAdminLogin, title: 'Admin Giriş', isAdmin: true, noAuth: true },
    '/admin/dashboard': { render: renderAdminDashboard, title: 'Dashboard', isAdmin: true },
    '/admin/kartlar': { render: renderAdminCards, title: 'Kart Yönetimi', isAdmin: true },
    '/admin/siparisler': { render: renderAdminOrders, title: 'Siparişler', isAdmin: true },
    '/admin/kullanicilar': { render: renderAdminUsers, title: 'Kullanıcılar', isAdmin: true },
    '/admin/ayarlar': { render: renderAdminSettings, title: 'Ayarlar', isAdmin: true },
  };

  function navigate() {
    const hash = window.location.hash.replace('#', '') || '/';
    const route = routes[hash];

    if (!route) {
      window.location.hash = '#/';
      return;
    }

    // Auth guard
    if (route.isAdmin && !route.noAuth && !DataStore.isLoggedIn()) {
      window.location.hash = '#/admin';
      return;
    }

    // Update Title & Meta
    document.title = route.title;

    // Render Content
    const appContent = document.getElementById('app-content');
    const publicNav = document.getElementById('public-nav');
    const publicFooter = document.getElementById('public-footer');

    try {
      if (route.isAdmin) {
        if (publicNav) publicNav.style.display = 'none';
        if (publicFooter) publicFooter.style.display = 'none';
        document.body.style.paddingTop = '0';
      } else {
        if (publicNav) publicNav.style.display = '';
        if (publicFooter) publicFooter.style.display = '';
        document.body.style.paddingTop = '';
      }

      // EXECUTE RENDER
      appContent.innerHTML = route.render();
      
      // Cleanup UI and force scroll to top
      if (typeof closeMobileMenu === 'function') closeMobileMenu();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      updateActiveNavLink(hash);

    } catch (err) {
      console.error('Render Error:', err);
      appContent.innerHTML = `<div class="container" style="padding: 100px 0; text-align: center;"><h2>Bir hata oluştu</h2><p>${err.message}</p><a href="#/">Ana Sayfaya Dön</a></div>`;
    }
  }

  function updateActiveNavLink(path) {
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
      const page = link.dataset.page;
      const mapping = { home: '/', cards: '/kartlar', pricing: '/fiyatlandirma', faq: '/sss', contact: '/iletisim', wallet: '/cuzdan' };
      link.classList.toggle('active', mapping[page] === path);
    });
  }

  window.addEventListener('hashchange', navigate);
  window.addEventListener('load', () => {
    navigate();
    setTimeout(() => {
      document.getElementById('app-content').classList.add('loaded');
    }, 50);
  });
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('public-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  // Global mobile menu helpers
  window.openMobileMenu = function() {
    document.getElementById('mobile-menu').classList.add('active');
    document.getElementById('mobile-menu-overlay').classList.add('active');
  };
  window.closeMobileMenu = function() {
    const m = document.getElementById('mobile-menu');
    const o = document.getElementById('mobile-menu-overlay');
    if(m) m.classList.remove('active');
    if(o) o.classList.remove('active');
  };

  document.addEventListener('click', e => {
    if (e.target.id === 'nav-toggle') openMobileMenu();
    if (e.target.id === 'mobile-menu-close' || e.target.id === 'mobile-menu-overlay') closeMobileMenu();
  });

})();
