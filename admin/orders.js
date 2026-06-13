/* ============================================
   KartKirala — Admin Orders Management
   ============================================ */

function renderAdminOrders() {
  const orders = DataStore.getOrders();

  return `
    <div class="admin-layout">
      ${renderAdminSidebar('orders')}
      <div class="admin-main">
        ${renderAdminTopbar('Sipariş Yönetimi', 'Tüm siparişleri görüntüleyin ve yönetin')}
        <div class="admin-content page-enter">

          <!-- Order Stats -->
          <div class="admin-stats-grid">
            <div class="admin-stat-card">
              <div class="admin-stat-header">
                <div class="admin-stat-icon orange">${Icons.hourglass(22)}</div>
              </div>
              <div class="admin-stat-value">${orders.filter(o => o.status === 'pending').length}</div>
              <div class="admin-stat-label">Bekleyen</div>
            </div>
            <div class="admin-stat-card">
              <div class="admin-stat-header">
                <div class="admin-stat-icon green">${Icons.checkCircle(22)}</div>
              </div>
              <div class="admin-stat-value">${orders.filter(o => o.status === 'active').length}</div>
              <div class="admin-stat-label">Aktif</div>
            </div>
            <div class="admin-stat-card">
              <div class="admin-stat-header">
                <div class="admin-stat-icon blue">${Icons.package(22)}</div>
              </div>
              <div class="admin-stat-value">${orders.filter(o => o.status === 'delivered').length}</div>
              <div class="admin-stat-label">Teslim Edildi</div>
            </div>
            <div class="admin-stat-card">
              <div class="admin-stat-header">
                <div class="admin-stat-icon purple">${Icons.xCircle(22)}</div>
              </div>
              <div class="admin-stat-value">${orders.filter(o => o.status === 'cancelled').length}</div>
              <div class="admin-stat-label">İptal</div>
            </div>
          </div>

          <!-- Orders Table -->
          <div class="admin-table-container">
            <div class="admin-table-header">
              <div class="admin-table-title">Tüm Siparişler (${orders.length})</div>
              <div class="admin-table-actions">
                <div class="admin-search">
                  <span class="admin-search-icon">${Icons.search(14)}</span>
                  <input type="text" placeholder="Sipariş ara..." oninput="searchOrders(this.value)">
                </div>
              </div>
            </div>
            <div style="overflow-x: auto;">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Sipariş ID</th>
                    <th>Kullanıcı</th>
                    <th>Email</th>
                    <th>Kart</th>
                    <th>Tutar</th>
                    <th>Durum</th>
                    <th>Tarih</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody id="admin-orders-tbody">
                  ${renderOrderRows(orders)}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div id="order-modal"></div>
  `;
}

function renderOrderRows(orders) {
  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => `
    <tr>
      <td class="admin-table-cell-primary">#${order.id.slice(-4).toUpperCase()}</td>
      <td class="admin-table-cell-primary">${order.userName}</td>
      <td>${order.userEmail}</td>
      <td>${order.cardName}</td>
      <td class="admin-table-cell-primary">${order.currency}${order.amount}</td>
      <td>${getStatusBadge(order.status)}</td>
      <td>${formatDateTime(order.createdAt)}</td>
      <td>
        <div class="admin-action-btns">
          <button class="admin-action-btn view" onclick="openOrderDetailModal('${order.id}')" title="Detay">${Icons.eye(14)}</button>
          <button class="admin-action-btn edit" onclick="openOrderStatusModal('${order.id}')" title="Durum Güncelle">${Icons.edit(14)}</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function searchOrders(query) {
  const orders = DataStore.getOrders();
  const filtered = orders.filter(o =>
    o.userName.toLowerCase().includes(query.toLowerCase()) ||
    o.userEmail.toLowerCase().includes(query.toLowerCase()) ||
    o.cardName.toLowerCase().includes(query.toLowerCase()) ||
    o.id.includes(query)
  );
  document.getElementById('admin-orders-tbody').innerHTML = renderOrderRows(filtered);
}

function openOrderDetailModal(orderId) {
  const order = DataStore.getById(DataStore.KEYS.ORDERS, orderId);
  if (!order) return;

  document.getElementById('order-modal').innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this)closeOrderModal()">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Sipariş Detayı — #${order.id.slice(-4).toUpperCase()}</h3>
          <button class="modal-close" onclick="closeOrderModal()">×</button>
        </div>
        <div class="modal-body">
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            <div style="display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-muted); font-size: var(--font-size-sm);">Sipariş ID</span>
              <span style="font-weight: 600;">#${order.id.slice(-4).toUpperCase()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-muted); font-size: var(--font-size-sm);">Kullanıcı</span>
              <span style="font-weight: 600;">${order.userName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-muted); font-size: var(--font-size-sm);">Email</span>
              <span>${order.userEmail}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-muted); font-size: var(--font-size-sm);">Kart</span>
              <span style="font-weight: 600;">${order.cardName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-muted); font-size: var(--font-size-sm);">Tutar</span>
              <span style="font-weight: 700; color: var(--accent-green);">${order.currency}${order.amount}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-muted); font-size: var(--font-size-sm);">Durum</span>
              ${getStatusBadge(order.status)}
            </div>
            <div style="display: flex; justify-content: space-between; padding: var(--space-3) 0;">
              <span style="color: var(--text-muted); font-size: var(--font-size-sm);">Tarih</span>
              <span>${formatDateTime(order.createdAt)}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeOrderModal()">Kapat</button>
          <button class="btn btn-primary" onclick="closeOrderModal(); openOrderStatusModal('${orderId}')">Durum Güncelle</button>
        </div>
      </div>
    </div>
  `;
}

function openOrderStatusModal(orderId) {
  const order = DataStore.getById(DataStore.KEYS.ORDERS, orderId);
  if (!order) return;

  document.getElementById('order-modal').innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this)closeOrderModal()">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Sipariş Durumu Güncelle</h3>
          <button class="modal-close" onclick="closeOrderModal()">×</button>
        </div>
        <div class="modal-body">
          <form class="admin-form" id="order-status-form" onsubmit="handleOrderStatusUpdate(event, '${orderId}')">
            <div class="form-group">
              <label class="form-label">Mevcut Durum</label>
              <div style="margin-top: var(--space-2);">${getStatusBadge(order.status)}</div>
            </div>
            <div class="form-group">
              <label class="form-label">Yeni Durum</label>
              <select class="form-select" name="status" required>
                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Bekliyor</option>
                <option value="active" ${order.status === 'active' ? 'selected' : ''}>Aktif</option>
                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Teslim Edildi</option>
                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>İptal</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeOrderModal()">İptal</button>
          <button class="btn btn-primary" onclick="document.getElementById('order-status-form').requestSubmit()">Güncelle</button>
        </div>
      </div>
    </div>
  `;
}

function handleOrderStatusUpdate(e, orderId) {
  e.preventDefault();
  const formData = new FormData(e.target);
  DataStore.update(DataStore.KEYS.ORDERS, orderId, { status: formData.get('status') });
  showToast('Sipariş durumu güncellendi!', 'success');
  closeOrderModal();
  document.getElementById('app-content').innerHTML = renderAdminOrders();
}

function closeOrderModal() {
  document.getElementById('order-modal').innerHTML = '';
}
