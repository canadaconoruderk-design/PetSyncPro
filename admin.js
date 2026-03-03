export const renderAdminDashboard = (stats) => {
    return `
    <div class="admin-layout" style="display: flex; min-height: 100vh;">
      <!-- Sidebar -->
      <aside class="glass" style="width: 260px; padding: 30px; border-right: 1px solid var(--border);">
        <div class="logo" style="margin-bottom: 50px;">📋 PetSync Admin</div>
        <nav style="flex-direction: column; height: auto; background: transparent; box-shadow: none; padding: 0;">
          <a href="#" class="btn" style="width: 100%; justify-content: flex-start; margin-bottom: 10px; background: var(--primary-light); color: var(--primary-dark);">📊 Dashboard</a>
          <a href="#" class="btn" style="width: 100%; justify-content: flex-start; margin-bottom: 10px;" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'admin-agenda'}))">📅 Agenda</a>
          <a href="#" class="btn" style="width: 100%; justify-content: flex-start; margin-bottom: 10px;">👥 Clientes</a>
          <a href="#" class="btn" style="width: 100%; justify-content: flex-start; margin-bottom: 10px;">📦 Inventario</a>
          <div style="margin-top: auto; padding-top: 50px;">
            <button class="btn btn-secondary" style="width: 100%;" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'landing'}))">Cerrar Sesión</button>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main style="flex: 1; padding: 40px; background: var(--bg-soft);">
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
          <h2>Panel de Control</h2>
          <div style="color: var(--text-soft);">${new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </header>

        <!-- Stats Grid -->
        <div class="grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 40px;">
          <div class="card" style="border-left: 5px solid var(--primary);">
            <p style="color: var(--text-soft); font-size: 0.9rem;">Turnos Hoy</p>
            <h3 style="font-size: 2rem; margin-top: 10px;">${stats.appointmentsToday}</h3>
          </div>
          <div class="card" style="border-left: 5px solid var(--secondary);">
            <p style="color: var(--text-soft); font-size: 0.9rem;">Ventas del Mes</p>
            <h3 style="font-size: 1.8rem; margin-top: 10px;">$${stats.monthlySales.toLocaleString()}</h3>
          </div>
          <div class="card" style="border-left: 5px solid var(--accent);">
            <p style="color: var(--text-soft); font-size: 0.9rem;">Stock Crítico</p>
            <h3 style="font-size: 2rem; margin-top: 10px; color: #E53E3E;">${stats.lowStockItems}</h3>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
          <!-- Recent Orders -->
          <div class="card">
            <h3 style="margin-bottom: 20px; font-size: 1.1rem;">Próximos Turnos</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
              <thead style="text-align: left; color: var(--text-soft); border-bottom: 1px solid var(--border);">
                <tr>
                  <th style="padding: 10px 0;">Hora</th>
                  <th>Paciente</th>
                  <th>Servicio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${stats.upcoming.map(app => `
                  <tr style="border-bottom: 1px solid var(--bg-soft);">
                    <td style="padding: 15px 0; font-weight: 600;">${app.time}</td>
                    <td>${app.pet}</td>
                    <td><span style="padding: 4px 10px; border-radius: 20px; background: var(--primary-light); color: var(--primary-dark); font-size: 0.75rem;">${app.service}</span></td>
                    <td style="color: var(--text-soft);">${app.status}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Inventory Alerts -->
          <div class="card">
            <h3 style="margin-bottom: 20px; font-size: 1.1rem;">Alertas de Stock</h3>
            ${stats.alerts.map(alert => `
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding: 10px; background: #FFF5F5; border-radius: 8px;">
                <span style="font-size: 1.2rem;">⚠️</span>
                <div>
                  <p style="font-size: 0.85rem; font-weight: 600;">${alert.item}</p>
                  <p style="font-size: 0.75rem; color: #C53030;">Quedan ${alert.stock} unidades</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
};
