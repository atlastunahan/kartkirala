/* ============================================
   KartKirala — Admin Settings
   ============================================ */

function renderAdminSettings() {
  const settings = DataStore.getSettings();

  return `
    <div class="admin-layout">
      ${renderAdminSidebar('settings')}
      <div class="admin-main">
        ${renderAdminTopbar('Ayarlar', 'Site ve sistem ayarlarını yönetin')}
        <div class="admin-content page-enter">

          <!-- General Settings -->
          <div class="admin-settings-section">
            <div class="admin-settings-header">
              <div class="admin-settings-title">Genel Ayarlar</div>
              <div class="admin-settings-desc">Site adı, iletişim bilgileri ve temel ayarlar.</div>
            </div>
            <div class="admin-settings-body">
              <form class="admin-form" id="general-settings-form" onsubmit="handleSettingsSave(event)">
                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label">Site Adı</label>
                    <input type="text" class="form-input" name="siteName" value="${settings.siteName || ''}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Site URL</label>
                    <input type="url" class="form-input" name="siteUrl" value="${settings.siteUrl || ''}">
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label">İletişim Email</label>
                    <input type="email" class="form-input" name="contactEmail" value="${settings.contactEmail || ''}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">İletişim Telefon</label>
                    <input type="text" class="form-input" name="contactPhone" value="${settings.contactPhone || ''}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Adres</label>
                  <input type="text" class="form-input" name="address" value="${settings.address || ''}">
                </div>
                <div style="padding-top: var(--space-4);">
                  <button type="submit" class="btn btn-primary">Kaydet</button>
                </div>
              </form>
            </div>
          </div>

          <!-- Payment Settings -->
          <div class="admin-settings-section">
            <div class="admin-settings-header">
              <div class="admin-settings-title">Ödeme Ayarları</div>
              <div class="admin-settings-desc">Para birimi, minimum sipariş ve vergi oranı.</div>
            </div>
            <div class="admin-settings-body">
              <form class="admin-form" id="payment-settings-form" onsubmit="handlePaymentSettingsSave(event)">
                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label">Para Birimi</label>
                    <select class="form-select" name="currency">
                      <option value="USD" ${settings.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
                      <option value="EUR" ${settings.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
                      <option value="TRY" ${settings.currency === 'TRY' ? 'selected' : ''}>TRY (₺)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Minimum Sipariş ($)</label>
                    <input type="number" class="form-input" name="minOrder" value="${settings.minOrder || 15}">
                  </div>
                </div>
                <div class="admin-form-row">
                  <div class="form-group">
                    <label class="form-label">Vergi Oranı (%)</label>
                    <input type="number" class="form-input" name="taxRate" value="${settings.taxRate || 18}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Otomatik Onay</label>
                    <select class="form-select" name="autoApprove">
                      <option value="true" ${settings.autoApprove ? 'selected' : ''}>Evet</option>
                      <option value="false" ${!settings.autoApprove ? 'selected' : ''}>Hayır</option>
                    </select>
                  </div>
                </div>
                <div style="padding-top: var(--space-4);">
                  <button type="submit" class="btn btn-primary">Kaydet</button>
                </div>
              </form>
            </div>
          </div>

          <!-- Notification Settings -->
          <div class="admin-settings-section">
            <div class="admin-settings-header">
              <div class="admin-settings-title">Bildirim Ayarları</div>
              <div class="admin-settings-desc">Email ve SMS bildirim tercihlerini yönetin.</div>
            </div>
            <div class="admin-settings-body">
              <div class="admin-settings-row">
                <div class="admin-settings-row-info">
                  <div class="admin-settings-row-label">Email Bildirimleri</div>
                  <div class="admin-settings-row-desc">Yeni siparişler ve durum güncellemeleri için email bildirimi.</div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${settings.emailNotifications ? 'checked' : ''} onchange="toggleSetting('emailNotifications', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="admin-settings-row">
                <div class="admin-settings-row-info">
                  <div class="admin-settings-row-label">SMS Bildirimleri</div>
                  <div class="admin-settings-row-desc">Önemli değişiklikler için SMS bildirimi gönder.</div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${settings.smsNotifications ? 'checked' : ''} onchange="toggleSetting('smsNotifications', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="admin-settings-row">
                <div class="admin-settings-row-info">
                  <div class="admin-settings-row-label">Bakım Modu</div>
                  <div class="admin-settings-row-desc">Siteyi geçici olarak bakım moduna al. Ziyaretçiler bilgilendirilir.</div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${settings.maintenanceMode ? 'checked' : ''} onchange="toggleSetting('maintenanceMode', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="admin-settings-section" style="border-color: rgba(239, 68, 68, 0.2);">
            <div class="admin-settings-header">
              <div class="admin-settings-title" style="color: var(--accent-red); display: flex; align-items: center; gap: var(--space-2);">${Icons.alertTriangle(18)} Tehlikeli Bölge</div>
              <div class="admin-settings-desc">Dikkatli olun, bu işlemler geri alınamaz.</div>
            </div>
            <div class="admin-settings-body">
              <div class="admin-settings-row">
                <div class="admin-settings-row-info">
                  <div class="admin-settings-row-label">Tüm Verileri Sıfırla</div>
                  <div class="admin-settings-row-desc">Tüm kart, sipariş ve kullanıcı verilerini siler ve demo verileri yükler.</div>
                </div>
                <button class="btn btn-danger btn-sm" onclick="resetAllData()">Sıfırla</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function handleSettingsSave(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const settings = DataStore.getSettings();

  settings.siteName = formData.get('siteName');
  settings.siteUrl = formData.get('siteUrl');
  settings.contactEmail = formData.get('contactEmail');
  settings.contactPhone = formData.get('contactPhone');
  settings.address = formData.get('address');

  DataStore.saveSettings(settings);
  showToast('Genel ayarlar kaydedildi!', 'success');
}

function handlePaymentSettingsSave(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const settings = DataStore.getSettings();

  settings.currency = formData.get('currency');
  settings.minOrder = parseInt(formData.get('minOrder'));
  settings.taxRate = parseInt(formData.get('taxRate'));
  settings.autoApprove = formData.get('autoApprove') === 'true';

  DataStore.saveSettings(settings);
  showToast('Ödeme ayarları kaydedildi!', 'success');
}

function toggleSetting(key, value) {
  const settings = DataStore.getSettings();
  settings[key] = value;
  DataStore.saveSettings(settings);
  showToast('Ayar güncellendi.', 'info');
}

function resetAllData() {
  if (confirm('Tüm veriler silinecek ve demo verileri yüklenecek. Emin misiniz?')) {
    localStorage.removeItem(DataStore.KEYS.CARDS);
    localStorage.removeItem(DataStore.KEYS.ORDERS);
    localStorage.removeItem(DataStore.KEYS.USERS);
    localStorage.removeItem(DataStore.KEYS.SETTINGS);
    DataStore.init();
    showToast('Tüm veriler sıfırlandı!', 'warning');
    window.location.hash = '#/admin/dashboard';
  }
}
