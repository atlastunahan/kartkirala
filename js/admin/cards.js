/* ============================================
   KartKirala — Admin Card Management
   ============================================ */

function renderAdminCards() {
  const cards = DataStore.getCards();

  return `
    <div class="admin-layout">
      ${renderAdminSidebar('cards')}
      <div class="admin-main">
        ${renderAdminTopbar('Kart Yönetimi', 'Tüm kartları yönetin')}
        <div class="admin-content page-enter">

          <div class="admin-table-container">
            <div class="admin-table-header">
              <div class="admin-table-title">Kartlar (${cards.length})</div>
              <div class="admin-table-actions">
                <div class="admin-search">
                  <span class="admin-search-icon">${Icons.search(14)}</span>
                  <input type="text" placeholder="Kart ara..." oninput="searchAdminCards(this.value)">
                </div>
                <button class="btn btn-primary btn-sm" onclick="openCardModal()">${Icons.plus(14)} Yeni Kart</button>
              </div>
            </div>
            <div style="overflow-x: auto;">
              <table class="admin-table" id="admin-cards-table">
                <thead>
                  <tr>
                    <th>Kart</th>
                    <th>Tür</th>
                    <th>Marka</th>
                    <th>Fiyat</th>
                    <th>Limit</th>
                    <th>Süre</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody id="admin-cards-tbody">
                  ${renderAdminCardsRows(cards)}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Card Modal -->
    <div id="card-modal"></div>
  `;
}

function renderAdminCardsRows(cards) {
  return cards.map(card => `
    <tr data-id="${card.id}">
      <td>
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <div style="width: 40px; height: 26px; border-radius: 4px; background: ${card.gradient}; flex-shrink: 0;"></div>
          <span class="admin-table-cell-primary">${card.name}</span>
        </div>
      </td>
      <td>${card.type === 'virtual' ? Icons.monitor(14) + ' Sanal' : Icons.truck(14) + ' Fiziksel'}</td>
      <td>${card.brand}</td>
      <td class="admin-table-cell-primary">${card.currency}${card.price}/ay</td>
      <td>${formatPrice(card.limit, card.currency)}</td>
      <td>${card.duration}</td>
      <td>
        <span class="badge ${card.active ? 'badge-success' : 'badge-danger'}">
          ${card.active ? 'Aktif' : 'Pasif'}
        </span>
      </td>
      <td>
        <div class="admin-action-btns">
          <button class="admin-action-btn edit" onclick="openCardModal('${card.id}')" title="Düzenle">${Icons.edit(14)}</button>
          <button class="admin-action-btn delete" onclick="deleteCard('${card.id}')" title="Sil">${Icons.trash(14)}</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function searchAdminCards(query) {
  const cards = DataStore.getCards();
  const filtered = cards.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.brand.toLowerCase().includes(query.toLowerCase()) ||
    c.type.toLowerCase().includes(query.toLowerCase())
  );
  document.getElementById('admin-cards-tbody').innerHTML = renderAdminCardsRows(filtered);
}

function openCardModal(cardId = null) {
  const card = cardId ? DataStore.getById(DataStore.KEYS.CARDS, cardId) : null;
  const isEdit = !!card;

  document.getElementById('card-modal').innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this)closeCardModal()">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}</h3>
          <button class="modal-close" onclick="closeCardModal()">×</button>
        </div>
        <div class="modal-body">
          <form class="admin-form" id="card-form" onsubmit="handleCardSubmit(event, '${cardId || ''}')">
            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label">Kart Adı</label>
                <input type="text" class="form-input" name="name" value="${card ? card.name : ''}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Marka</label>
                <select class="form-select" name="brand" required>
                  <option value="Visa" ${card && card.brand === 'Visa' ? 'selected' : ''}>Visa</option>
                  <option value="Mastercard" ${card && card.brand === 'Mastercard' ? 'selected' : ''}>Mastercard</option>
                  <option value="Amex" ${card && card.brand === 'Amex' ? 'selected' : ''}>Amex</option>
                </select>
              </div>
            </div>
            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label">Tür</label>
                <select class="form-select" name="type" required>
                  <option value="virtual" ${card && card.type === 'virtual' ? 'selected' : ''}>Sanal</option>
                  <option value="physical" ${card && card.type === 'physical' ? 'selected' : ''}>Fiziksel</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Durum</label>
                <select class="form-select" name="active" required>
                  <option value="true" ${card && card.active ? 'selected' : ''}>Aktif</option>
                  <option value="false" ${card && !card.active ? 'selected' : ''}>Pasif</option>
                </select>
              </div>
            </div>
            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label">Aylık Fiyat ($)</label>
                <input type="number" class="form-input" name="price" value="${card ? card.price : ''}" min="1" required>
              </div>
              <div class="form-group">
                <label class="form-label">Harcama Limiti ($)</label>
                <input type="number" class="form-input" name="limit" value="${card ? card.limit : ''}" min="100" required>
              </div>
            </div>
            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label">Süre</label>
                <select class="form-select" name="duration" required>
                  <option value="1" ${card && card.durationMonths === 1 ? 'selected' : ''}>1 Ay</option>
                  <option value="3" ${card && card.durationMonths === 3 ? 'selected' : ''}>3 Ay</option>
                  <option value="6" ${card && card.durationMonths === 6 ? 'selected' : ''}>6 Ay</option>
                  <option value="12" ${card && card.durationMonths === 12 ? 'selected' : ''}>12 Ay</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Renk</label>
                <input type="color" class="form-input" name="color" value="${card ? card.color : '#6366f1'}" style="height: 42px; padding: 4px;">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Açıklama</label>
              <textarea class="form-textarea" name="description" rows="3" required>${card ? card.description : ''}</textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Özellikler (her satıra bir özellik)</label>
              <textarea class="form-textarea" name="features" rows="4" required>${card ? card.features.join('\n') : ''}</textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeCardModal()">İptal</button>
          <button class="btn btn-primary" onclick="document.getElementById('card-form').requestSubmit()">
            ${isEdit ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function closeCardModal() {
  document.getElementById('card-modal').innerHTML = '';
}

function handleCardSubmit(e, cardId) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const durationMonths = parseInt(formData.get('duration'));
  const durationLabels = { 1: '1 Ay', 3: '3 Ay', 6: '6 Ay', 12: '12 Ay' };
  const color = formData.get('color');

  const cardData = {
    name: formData.get('name'),
    brand: formData.get('brand'),
    type: formData.get('type'),
    active: formData.get('active') === 'true',
    price: parseInt(formData.get('price')),
    currency: '$',
    limit: parseInt(formData.get('limit')),
    duration: durationLabels[durationMonths],
    durationMonths: durationMonths,
    description: formData.get('description'),
    features: formData.get('features').split('\n').filter(f => f.trim()),
    color: color,
    gradient: `linear-gradient(135deg, ${color}, ${adjustColor(color, -30)})`,
    popular: false
  };

  if (cardId) {
    DataStore.update(DataStore.KEYS.CARDS, cardId, cardData);
    showToast('Kart başarıyla güncellendi!', 'success');
  } else {
    DataStore.add(DataStore.KEYS.CARDS, cardData);
    showToast('Yeni kart başarıyla eklendi!', 'success');
  }

  closeCardModal();
  const tbody = document.getElementById('admin-cards-tbody');
  if (tbody) {
    tbody.innerHTML = renderAdminCardsRows(DataStore.getCards());
  }
}

function deleteCard(cardId) {
  if (confirm('Bu kartı silmek istediğinize emin misiniz?')) {
    DataStore.delete(DataStore.KEYS.CARDS, cardId);
    showToast('Kart silindi.', 'warning');
    const tbody = document.getElementById('admin-cards-tbody');
    if (tbody) {
      tbody.innerHTML = renderAdminCardsRows(DataStore.getCards());
    }
  }
}

function adjustColor(hex, amount) {
  hex = hex.replace('#', '');
  const num = parseInt(hex, 16);
  let r = Math.min(255, Math.max(0, (num >> 16) + amount));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return '#' + (b | (g << 8) | (r << 16)).toString(16).padStart(6, '0');
}
