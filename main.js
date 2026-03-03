import './style.css';
import { renderBooking } from './booking.js';
import { renderShop, renderCart } from './shop.js';
import { renderAdminDashboard } from './admin.js';

const renderLanding = () => {
  return `
    <nav>
      <div class="logo">🐾 PetSync Pro</div>
      <div class="desktop-only">
        <a href="#servicios" style="margin-right: 20px; text-decoration: none; color: var(--text-main);">Servicios</a>
        <a href="#" style="margin-right: 20px; text-decoration: none; color: var(--text-main);" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'shop'}))">Tienda</a>
        <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'admin-dash'}))">Panel Admin</button>
      </div>
    </nav>

    <div class="container">
      <section class="hero fade-in">
        <div class="hero-content">
          <h1>Tu mascota merece lo mejor, <br><span style="color: var(--primary-dark);">con la tecnología que tú necesitas.</span></h1>
          <p style="font-size: 1.2rem; color: var(--text-soft); margin: 20px 0 40px;">
            Gestiona la salud, estética y bienestar de tu mejor amigo de forma simple y profesional. 
          </p>
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'booking'}))">🐾 Agendar Cita</button>
            <button class="btn btn-secondary" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'shop'}))">🛍️ Ver Tienda</button>
          </div>
        </div>
        <div class="hero-image desktop-only">
          <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800" alt="Mascota">
        </div>
      </section>
      
      <section id="servicios">
        <h2 style="text-align: center; margin-bottom: 50px;">Nuestros Servicios</h2>
        <div class="grid">
          <div class="card">
            <div style="font-size: 2.5rem; margin-bottom: 15px;">🏥</div>
            <h3>Clínica Veterinaria</h3>
            <p style="color: var(--text-soft);">Consultas, vacunación y cirugías con profesionales.</p>
          </div>
          <div class="card">
            <div style="font-size: 2.5rem; margin-bottom: 15px;">✂️</div>
            <h3>Peluquería Canina</h3>
            <p style="color: var(--text-soft);">Baño y corte de raza para que luzca radiante.</p>
          </div>
          <div class="card">
            <div style="font-size: 2.5rem; margin-bottom: 15px;">🦴</div>
            <h3>Pet Shop</h3>
            <p style="color: var(--text-soft);">Alimentos premium y accesorios de alta calidad.</p>
          </div>
        </div>
      </section>
    </div>

    <div class="bottom-nav mobile-only">
      <a href="#" class="nav-item active" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'landing'}))"><span>🏠</span><span>Inicio</span></a>
      <a href="#" class="nav-item" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'shop'}))"><span>🛍️</span><span>Tienda</span></a>
      <a href="#" class="nav-item" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'booking'}))"><span>📅</span><span>Turnos</span></a>
      <a href="#" class="nav-item" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'profile'}))"><span>🐶</span><span>Perfil</span></a>
    </div>
  `;
};

const renderClientArea = (pets = []) => {
  return `
    <div class="container fade-in" style="padding-top: 20px; padding-bottom: 100px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h2>🐶 Mis Mascotas</h2>
        <button class="btn btn-secondary" style="padding: 8px 15px; font-size: 0.9rem;" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'landing'}))">Cerrar Sesión</button>
      </div>
      <div style="margin-top: 30px;">
        ${pets.map(pet => `
          <div class="card" style="margin-bottom: 20px;">
            <div style="display: flex; gap: 20px; align-items: center;">
              <img src="${pet.image}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
              <div>
                <h3>${pet.name}</h3>
                <p style="color: var(--text-soft);">${pet.breed} • ${pet.age}</p>
              </div>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border);">
              <h4 style="font-size: 0.9rem; margin-bottom: 15px;">💉 Carnet de Vacunación</h4>
              ${pet.vaccines.map(v => `
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px;">
                  <span>${v.name}</span>
                  <span style="color: ${v.status === 'Al día' ? 'var(--primary-dark)' : 'var(--secondary)'}">${v.date} (${v.status})</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    `;
};

const App = () => {
  const app = document.querySelector('#app');
  let currentPage = 'landing';
  let bookingState = { step: 0, data: {} };
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  let isCartOpen = false;

  const adminStats = {
    appointmentsToday: 8,
    monthlySales: 158400,
    lowStockItems: 2,
    upcoming: [
      { time: '10:30', pet: 'Bobby', service: 'Vacunación', status: 'Confirmado' },
      { time: '11:15', pet: 'Luna', service: 'Peluquería', status: 'Pendiente' },
      { time: '12:00', pet: 'Rex', service: 'Consulta', status: 'Confirmado' }
    ],
    alerts: [
      { item: 'Royal Canin Adult 15kg', stock: 2 },
      { item: 'Shampoo Neutro 5L', stock: 1 }
    ]
  };

  const myPets = [{ name: 'Bobby', breed: 'Golden Retriever', age: '3 años', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200', vaccines: [{ name: 'Antirrábica', date: '15/05/2025', status: 'Al día' }, { name: 'Quíntuple', date: '20/10/2025', status: 'Próximamente' }] }];

  const updateUI = () => {
    app.innerHTML = '';
    if (currentPage === 'landing') app.innerHTML = renderLanding();
    else if (currentPage === 'booking') app.innerHTML = renderBooking(bookingState.step, bookingState.data);
    else if (currentPage === 'shop') app.innerHTML = renderShop(cart);
    else if (currentPage === 'profile') app.innerHTML = renderClientArea(myPets);
    else if (currentPage === 'admin-dash') app.innerHTML = renderAdminDashboard(adminStats);

    if (isCartOpen) {
      const cartOverlay = document.createElement('div');
      cartOverlay.innerHTML = renderCart(cart);
      app.appendChild(cartOverlay);
    }
  };

  window.addEventListener('nav', (e) => {
    currentPage = e.detail;
    isCartOpen = false;
    window.scrollTo(0, 0);
    updateUI();
  });

  window.addEventListener('shop-add', (e) => {
    cart.push(e.detail);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
  });

  window.addEventListener('shop-remove', (e) => {
    cart.splice(e.detail, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
  });

  window.addEventListener('shop-toggle-cart', () => {
    isCartOpen = !isCartOpen;
    updateUI();
  });

  window.addEventListener('booking-select', (e) => {
    bookingState.data[e.detail.field] = e.detail.value;
    updateUI();
  });

  window.addEventListener('booking-next', () => {
    if (bookingState.step === 1) {
      bookingState.data.petName = document.querySelector('#petName').value;
      bookingState.data.ownerName = document.querySelector('#ownerName').value;
    } else if (bookingState.step === 2) {
      bookingState.data.datetime = document.querySelector('#datetime').value;
      alert(`¡Turno confirmado para ${bookingState.data.petName}!`);
      bookingState = { step: 0, data: {} };
      currentPage = 'landing';
      updateUI();
      return;
    }
    bookingState.step++;
    updateUI();
  });

  window.addEventListener('booking-back', () => {
    if (bookingState.step > 0) bookingState.step--;
    else currentPage = 'landing';
    updateUI();
  });

  updateUI();
};

document.addEventListener('DOMContentLoaded', App);
