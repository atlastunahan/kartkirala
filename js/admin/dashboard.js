/* ============================================
   KartKirala — Admin Dashboard
   ============================================ */

function renderAdminDashboard() {
  const cards = DataStore.getCards();
  const orders = DataStore.getOrders();
  const users = DataStore.getUsers();

  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeOrders = orders.filter(o => o.status === 'active').length;
  const activeUsers = users.filter(u => u.status === 'active').length;

  // Monthly revenue data (simulated)
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'];
  const revenues = [420, 680, 590, 870, 1250, totalRevenue];
  const maxRevenue = Math.max(...revenues);

  return `
    <div class="admin-layout">
      ${renderAdminSidebar('dashboard')}
      <div class="admin-main">
        ${renderAdminTopbar('Dashboard', 'Genel bakış ve istatistikler')}
        <div class="admin-content page-enter">

          <!-- Stats Grid -->
          <div class="admin-stats-grid">
            <div class="admin-stat-card">
              <div class="admin-stat-header">
                <div class="admin-stat-icon blue">${Icons.creditCard(22)}</div>
                <div class="admin-stat-change up">${Icons.trendingUp(14)} 12%</div>
              </div>
              <div class="admin-stat-value">${cards.length}</div>
              <div class="admin-stat-label">Toplam Kart</div>
            </div>
            <div class="admin-stat-card">
              <div class="admin-stat-header">
                <div class="admin-stat-icon green">${Icons.package(22)}</div>
                <div class="admin-stat-change up">${Icons.trendingUp(14)} 8%</div>
              </div>
              <div class="admin-stat-value">${orders.length}</div>
              <div class="admin-stat-label">Toplam Sipariş</div>
            </div>
            <div class="admin-stat-card">
              <div class="admin-stat-header">
                <div class="admin-stat-icon purple">${Icons.wallet(22)}</div>
                <div class="admin-stat-change up">${Icons.trendingUp(14)} 24%</div>
              </div>
              <div class="admin-stat-value">$${totalRevenue}</div>
              <div class="admin-stat-label">Toplam Gelir</div>
            </div>
            <div class="admin-stat-card">
              <div class="admin-stat-header">
                <div class="admin-stat-icon orange">${Icons.users(22)}</div>
                <div class="admin-stat-change up">${Icons.trendingUp(14)} 15%</div>
              </div>
              <div class="admin-stat-value">${users.length}</div>
              <div class="admin-stat-label">Toplam Kullanıcı</div>
            </div>
          </div>

          <!-- Charts & Recent Orders -->
          <div class="admin-grid-3">
            <!-- Revenue Chart -->
            <div class="admin-chart-card">
              <div class="admin-chart-header">
                <div class="admin-chart-title">Aylık Gelir</div>
                <span class="badge badge-success">+24%</span>
              </div>
              <div class="admin-bar-chart">
                ${months.map((month, i) => `
                  <div class="admin-bar">
                    <div class="admin-bar-fill" style="height: ${(revenues[i] / maxRevenue) * 100}%;"></div>
                    <div class="admin-bar-label">${month}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="admin-chart-card">
              <div class="admin-chart-header">
                <div class="admin-chart-title">Hızlı Bilgiler</div>
              </div>
              <div style="display: flex; flex-direction: column; gap: var(--space-4);">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-3); background: rgba(245,158,11,0.08); border-radius: var(--radius-md);">
                  <span style="font-size: var(--font-size-sm); display: flex; align-items: center; gap: var(--space-2);">${Icons.hourglass(16)} Bekleyen Siparişler</span>
                  <span style="font-weight: 700; color: var(--accent-orange);">${pendingOrders}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-3); background: rgba(16,185,129,0.08); border-radius: var(--radius-md);">
                  <span style="font-size: var(--font-size-sm); display: flex; align-items: center; gap: var(--space-2);">${Icons.checkCircle(16)} Aktif Siparişler</span>
                  <span style="font-weight: 700; color: var(--accent-green);">${activeOrders}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-3); background: rgba(99,102,241,0.08); border-radius: var(--radius-md);">
                  <span style="font-size: var(--font-size-sm); display: flex; align-items: center; gap: var(--space-2);">${Icons.user(16)} Aktif Kullanıcılar</span>
                  <span style="font-weight: 700; color: var(--accent-blue);">${activeUsers}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-3); background: rgba(139,92,246,0.08); border-radius: var(--radius-md);">
                  <span style="font-size: var(--font-size-sm); display: flex; align-items: center; gap: var(--space-2);">${Icons.diamond(16)} Aktif Kartlar</span>
                  <span style="font-weight: 700; color: var(--accent-purple);">${cards.filter(c => c.active).length}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Orders Table -->
          <div style="margin-top: var(--space-6);" class="admin-table-container">
            <div class="admin-table-header">
              <div class="admin-table-title">Son Siparişler</div>
              <a href="#/admin/siparisler" class="btn btn-ghost btn-sm">Tümünü Gör →</a>
            </div>
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Sipariş ID</th>
                  <th>Kullanıcı</th>
                  <th>Kart</th>
                  <th>Tutar</th>
                  <th>Durum</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                ${orders.slice(-5).reverse().map(order => `
                  <tr>
                    <td class="admin-table-cell-primary">#${order.id.slice(-4).toUpperCase()}</td>
                    <td>${order.userName}</td>
                    <td>${order.cardName}</td>
                    <td class="admin-table-cell-primary">${order.currency}${order.amount}</td>
                    <td>${getStatusBadge(order.status)}</td>
                    <td>${formatDate(order.createdAt)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  `;
}
