export const products = [
  { id: 'prod_1', name: 'Royal Canin Adult 15kg', price: 12500, category: 'alimento', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400' },
  { id: 'prod_2', name: 'Juguete Hueso Mordedor', price: 1200, category: 'juguete', image: 'https://images.unsplash.com/photo-1576201836106-cf1758af1c82?auto=format&fit=crop&q=80&w=400' },
  { id: 'prod_3', name: 'Shampoo Neutro Canino', price: 2500, category: 'estetica', image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400' },
  { id: 'prod_4', name: 'Cucha Acolchada Large', price: 8900, category: 'accesorios', image: 'https://images.unsplash.com/photo-1541599540903-21b123d96753?auto=format&fit=crop&q=80&w=400' }
];

export const renderShop = (cart = [], onAddToCart, onRemoveFromCart, onToggleCheckout) => {
  return `
    <div class="container fade-in" style="padding-bottom: 100px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-top: 20px;">
        <h2>🛒 Nuestra Tienda</h2>
        <div style="position: relative; cursor: pointer;" onclick="window.dispatchEvent(new CustomEvent('shop-toggle-cart'))">
          <span style="font-size: 1.5rem;">🛍️</span>
          ${cart.length > 0 ? `<span style="position: absolute; top: -5px; right: -10px; background: var(--secondary); color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; display: flex; align-items: center; justify-content: center;">${cart.length}</span>` : ''}
        </div>
      </div>

      <div class="grid">
        ${products.map(p => `
          <div class="card" style="padding: 15px;">
            <img src="${p.image}" style="width: 100%; border-radius: 12px; height: 200px; object-fit: crop; margin-bottom: 15px;">
            <h4 style="margin-bottom: 5px;">${p.name}</h4>
            <p style="color: var(--primary-dark); font-weight: 700; font-size: 1.2rem; margin-bottom: 15px;">$${p.price}</p>
            <button class="btn btn-primary" style="width: 100%;" onclick="window.dispatchEvent(new CustomEvent('shop-add', {detail: ${JSON.stringify(p).replace(/"/g, '&quot;')}}))">
              Añadir al carrito
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

export const renderCart = (cart = []) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return `
    <div class="glass" style="position: fixed; top: 0; right: 0; bottom: 0; width: 350px; z-index: 2000; box-shadow: var(--shadow-lg); padding: 30px; display: flex; flex-direction: column;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <h3>Mi Carrito</h3>
        <button class="btn" onclick="window.dispatchEvent(new CustomEvent('shop-toggle-cart'))">✖️</button>
      </div>
      
      <div style="flex: 1; overflow-y: auto;">
        ${cart.length === 0 ? '<p style="text-align: center; color: var(--text-soft); margin-top: 50px;">Tu carrito está vacío 🐶</p>' :
      cart.map((item, index) => `
            <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 10px;">
              <img src="${item.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
              <div style="flex: 1;">
                <p style="font-weight: 600; font-size: 0.9rem;">${item.name}</p>
                <p style="color: var(--primary-dark); font-size: 0.8rem;">$${item.price}</p>
              </div>
              <button class="btn" style="padding: 5px;" onclick="window.dispatchEvent(new CustomEvent('shop-remove', {detail: ${index}}))">🗑️</button>
            </div>
          `).join('')
    }
      </div>

      <div style="border-top: 2px solid var(--border); padding-top: 20px;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.2rem; margin-bottom: 20px;">
          <span>Total</span>
          <span>$${total}</span>
        </div>
        <button class="btn btn-secondary" style="width: 100%;" ${cart.length === 0 ? 'disabled' : ''} onclick="alert('Funcionalidad de pago próximamente con MercadoPago 🚀')">
          PAGAR AHORA
        </button>
      </div>
    </div>
  `;
};
