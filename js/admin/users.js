/* ============================================
   KartKirala — Admin Users Management (Balance Support)
   ============================================ */

function renderAdminUsers() {
  const users = DataStore.getUsers();

  return `
    <div class="admin-layout">
      ${renderAdminSidebar('users')}
      <div class="admin-main">
        ${renderAdminTopbar('Kullanıcı Yönetimi', 'Tüm kullanıcıları bakiye ve yetkileriyle yönetin')}
        <div class="admin-content page-enter">

          <div class="admin-table-container">
            <div class="admin-table-header">
              <div class="admin-table-title">Kullanıcılar (${users.length})</div>
              <div class="admin-table-actions">
                <div class="admin-search">
                  <span class="admin-search-icon">${Icons.search(14)}</span>
                  <input type="text" placeholder="Kullanıcı ara..." oninput="searchUsers(this.value)">
                </div>
                <button class="btn btn-primary btn-sm" onclick="openUserModal()">${Icons.plus(14)} Yeni Kullanıcı</button>
              </div>
            </div>
            <div style="overflow-x: auto;">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Kullanıcı</th>
                    <th>Email</th>
                    <th>Bakiye</th>
                    <th>Sipariş / Harcama</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody id="admin-users-tbody">
                  ${renderUserRows(users)}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div id="user-modal"></div>
  `;
}

function renderUserRows(users) {
  return users.map(user => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <div class="admin-user-avatar" style="width: 32px; height: 32px; font-size: 12px;">${user.name.charAt(0)}</div>
          <span class="admin-table-cell-primary">${user.name}</span>
        </div>
      </td>
      <td>${user.email}</td>
      <td class="admin-table-cell-primary" style="color: var(--accent-blue); font-weight: 700;">$${user.balance.toFixed(2)}</td>
      <td>${user.totalOrders} Kart / $${user.totalSpent}</td>
      <td>${getStatusBadge(user.status)}</td>
      <td>
        <div class="admin-action-btns">
          <button class="admin-action-btn view" onclick="openBalanceModal('${user.id}')" title="Bakiye Ekle/Çıkar">💰</button>
          <button class="admin-action-btn edit" onclick="openUserModal('${user.id}')" title="Düzenle">${Icons.edit(14)}</button>
          <button class="admin-action-btn ${user.status === 'blocked' ? 'view' : 'delete'}"
            onclick="toggleUserBlock('${user.id}')"
            title="${user.status === 'blocked' ? 'Engeli Kaldır' : 'Engelle'}">
            ${user.status === 'blocked' ? Icons.unlock(14) : Icons.lock(14)}
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openBalanceModal(userId) {
  const user = DataStore.getById(DataStore.KEYS.USERS, userId);
  if (!user) return;

  document.getElementById('user-modal').innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this)closeUserModal()">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Bakiye Yönetimi — ${user.name}</h3>
          <button class="modal-close" onclick="closeUserModal()">×</button>
        </div>
        <div class="modal-body">
          <div style="padding: var(--space-4); background: rgba(99,102,241,0.05); border-radius: var(--radius-md); margin-bottom: var(--space-6); text-align: center;">
            <div style="font-size: var(--font-size-sm); color: var(--text-muted);">Mevcut Bakiye</div>
            <div style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--accent-blue);">$${user.balance.toFixed(2)}</div>
          </div>
          <form class="admin-form" id="balance-form" onsubmit="handleBalanceAdjust(event, '${userId}')">
            <div class="form-group">
              <label class="form-label">İşlem Türü</label>
              <select class="form-select" name="type">
                <option value="add">Bakiye Ekle (+)</option>
                <option value="subtract">Bakiye Çıkar (-)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Tutar ($)</label>
              <input type="number" step="0.01" class="form-input" name="amount" placeholder="0.00" required>
            </div>
            <div class="form-group">
              <label class="form-label">Açıklama (Opsiyonel)</label>
              <input type="text" class="form-input" name="note" placeholder="Manuel düzeltme, kampanya vb.">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeUserModal()">İptal</button>
          <button class="btn btn-primary" onclick="document.getElementById('balance-form').requestSubmit()">Uygula</button>
        </div>
      </div>
    </div>
  `;
}

function handleBalanceAdjust(e, userId) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const user = DataStore.getById(DataStore.KEYS.USERS, userId);
  const amount = parseFloat(formData.get('amount'));
  const type = formData.get('type');

  let newBalance = user.balance;
  if (type === 'add') newBalance += amount;
  else newBalance -= amount;

  DataStore.update(DataStore.KEYS.USERS, userId, { balance: Math.max(0, newBalance) });
  showToast('Kullanıcı bakiyesi güncellendi!', 'success');
  closeUserModal();
  document.getElementById('admin-users-tbody').innerHTML = renderUserRows(DataStore.getUsers());
}

function closeUserModal() { document.getElementById('user-modal').innerHTML = ''; }

function searchUsers(query) {
  const users = DataStore.getUsers();
  const filtered = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()));
  document.getElementById('admin-users-tbody').innerHTML = renderUserRows(filtered);
}

function openUserModal(userId = null) {
  const user = userId ? DataStore.getById(DataStore.KEYS.USERS, userId) : null;
  const isEdit = !!user;

  document.getElementById('user-modal').innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this)closeUserModal()">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}</h3>
          <button class="modal-close" onclick="closeUserModal()">×</button>
        </div>
        <div class="modal-body">
          <form class="admin-form" id="user-form" onsubmit="handleUserSubmit(event, '${userId || ''}')">
            <div class="admin-form-row">
              <div class="form-group"><label class="form-label">Ad Soyad</label><input type="text" class="form-input" name="name" value="${user ? user.name : ''}" required></div>
              <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" name="email" value="${user ? user.email : ''}" required></div>
            </div>
            <div class="admin-form-row">
              <div class="form-group"><label class="form-label">Telefon</label><input type="text" class="form-input" name="phone" value="${user ? user.phone : ''}" placeholder="+90 5XX XXX XX XX"></div>
              <div class="form-group"><label class="form-label">Durum</label><select class="form-select" name="status"><option value="active" ${user && user.status === 'active' ? 'selected' : ''}>Aktif</option><option value="blocked" ${user && user.status === 'blocked' ? 'selected' : ''}>Engelli</option></select></div>
            </div>
          </form>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" onclick="closeUserModal()">İptal</button><button class="btn btn-primary" onclick="document.getElementById('user-form').requestSubmit()">${isEdit ? 'Güncelle' : 'Ekle'}</button></div>
      </div>
    </div>
  `;
}

function handleUserSubmit(e, userId) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userData = { name: formData.get('name'), email: formData.get('email'), phone: formData.get('phone') || '', status: formData.get('status') };
  if (userId) DataStore.update(DataStore.KEYS.USERS, userId, userData);
  else { userData.totalOrders = 0; userData.totalSpent = 0; userData.balance = 0; DataStore.add(DataStore.KEYS.USERS, userData); }
  closeUserModal();
  document.getElementById('admin-users-tbody').innerHTML = renderUserRows(DataStore.getUsers());
  showToast('Kullanıcı güncellendi!', 'success');
}

function toggleUserBlock(userId) {
  const user = DataStore.getById(DataStore.KEYS.USERS, userId);
  if (!user) return;
  const newStatus = user.status === 'blocked' ? 'active' : 'blocked';
  if (confirm(`${user.name} ${newStatus === 'blocked' ? 'engellensin' : 'engeli kaldırılsın'} mı?`)) {
    DataStore.update(DataStore.KEYS.USERS, userId, { status: newStatus });
    showToast(newStatus === 'blocked' ? 'Kullanıcı engellendi.' : 'Kullanıcı engeli kaldırıldı.', newStatus === 'blocked' ? 'warning' : 'success');
    document.getElementById('admin-users-tbody').innerHTML = renderUserRows(DataStore.getUsers());
  }
}
