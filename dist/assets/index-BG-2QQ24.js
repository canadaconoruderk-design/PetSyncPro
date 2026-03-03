(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();const c=[{id:"vet_consulta",name:"Consulta General",icon:"🏥",price:2500,category:"veterinaria"},{id:"vet_vacuna",name:"Vacunación",icon:"💉",price:1800,category:"veterinaria"},{id:"groom_basic",name:"Baño y Corte",icon:"✂️",price:3e3,category:"peluqueria"},{id:"groom_full",name:"Tratamiento Completo",icon:"🫧",price:4500,category:"peluqueria"}],p=(t,e={},i,r)=>{const a=[{title:"¿Qué servicio necesita?",field:"service"},{title:"¿Para quién es el turno?",field:"pet"},{title:"Selecciona fecha y hora",field:"datetime"}],s=a[t];let d="";return t===0?d=`
      <div class="grid" style="grid-template-columns: 1fr 1fr; margin-top: 20px;">
        ${c.map(o=>{var n,l;return`
          <div class="card service-card ${((n=e.service)==null?void 0:n.id)===o.id?"active":""}" 
               style="cursor: pointer; border: 2px solid ${((l=e.service)==null?void 0:l.id)===o.id?"var(--primary)":"transparent"}"
               onclick="window.dispatchEvent(new CustomEvent('booking-select', {detail: {field: 'service', value: ${JSON.stringify(o).replace(/"/g,"&quot;")}}}) )">
            <div style="font-size: 2rem; margin-bottom: 10px;">${o.icon}</div>
            <h4 style="font-size: 0.9rem;">${o.name}</h4>
            <p style="font-size: 0.8rem; color: var(--text-soft);">$${o.price}</p>
          </div>
        `}).join("")}
      </div>
    `:t===1?d=`
      <div style="margin-top: 20px;">
        <input type="text" id="petName" placeholder="Nombre de la mascota" class="input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 15px;" value="${e.petName||""}">
        <input type="text" id="ownerName" placeholder="Tu nombre" class="input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border);" value="${e.ownerName||""}">
      </div>
    `:t===2&&(d=`
      <div style="margin-top: 20px;">
        <input type="datetime-local" id="datetime" class="input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border);" value="${e.datetime||""}">
      </div>
    `),`
    <div class="container fade-in" style="max-width: 500px; padding-bottom: 100px;">
      <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
         <button class="btn" style="padding: 5px;" onclick="${t===0?"window.dispatchEvent(new CustomEvent('nav', {detail: 'landing'}))":"window.dispatchEvent(new CustomEvent('booking-back'))"}">⬅️</button>
         <h2 style="font-size: 1.4rem;">${s.title}</h2>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: var(--shadow-md);">
        <div style="display: flex; gap: 5px; margin-bottom: 20px;">
          ${a.map((o,n)=>`<div style="flex: 1; height: 6px; border-radius: 3px; background: ${n<=t?"var(--primary)":"var(--border)"}"></div>`).join("")}
        </div>
        
        ${d}

        <button class="btn btn-primary" style="width: 100%; margin-top: 30px;" 
          onclick="window.dispatchEvent(new CustomEvent('booking-next', {detail: {step: ${t}}}))">
          ${t===2?"Confirmar Turno ✅":"Continuar"}
        </button>
      </div>
    </div>
  `},m=[{id:"prod_1",name:"Royal Canin Adult 15kg",price:12500,category:"alimento",image:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400"},{id:"prod_2",name:"Juguete Hueso Mordedor",price:1200,category:"juguete",image:"https://images.unsplash.com/photo-1576201836106-cf1758af1c82?auto=format&fit=crop&q=80&w=400"},{id:"prod_3",name:"Shampoo Neutro Canino",price:2500,category:"estetica",image:"https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400"},{id:"prod_4",name:"Cucha Acolchada Large",price:8900,category:"accesorios",image:"https://images.unsplash.com/photo-1541599540903-21b123d96753?auto=format&fit=crop&q=80&w=400"}],v=(t=[],e,i,r)=>`
    <div class="container fade-in" style="padding-bottom: 100px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-top: 20px;">
        <h2>🛒 Nuestra Tienda</h2>
        <div style="position: relative; cursor: pointer;" onclick="window.dispatchEvent(new CustomEvent('shop-toggle-cart'))">
          <span style="font-size: 1.5rem;">🛍️</span>
          ${t.length>0?`<span style="position: absolute; top: -5px; right: -10px; background: var(--secondary); color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; display: flex; align-items: center; justify-content: center;">${t.length}</span>`:""}
        </div>
      </div>

      <div class="grid">
        ${m.map(a=>`
          <div class="card" style="padding: 15px;">
            <img src="${a.image}" style="width: 100%; border-radius: 12px; height: 200px; object-fit: crop; margin-bottom: 15px;">
            <h4 style="margin-bottom: 5px;">${a.name}</h4>
            <p style="color: var(--primary-dark); font-weight: 700; font-size: 1.2rem; margin-bottom: 15px;">$${a.price}</p>
            <button class="btn btn-primary" style="width: 100%;" onclick="window.dispatchEvent(new CustomEvent('shop-add', {detail: ${JSON.stringify(a).replace(/"/g,"&quot;")}}))">
              Añadir al carrito
            </button>
          </div>
        `).join("")}
      </div>
    </div>
  `,g=(t=[])=>{const e=t.reduce((i,r)=>i+r.price,0);return`
    <div class="glass" style="position: fixed; top: 0; right: 0; bottom: 0; width: 350px; z-index: 2000; box-shadow: var(--shadow-lg); padding: 30px; display: flex; flex-direction: column;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <h3>Mi Carrito</h3>
        <button class="btn" onclick="window.dispatchEvent(new CustomEvent('shop-toggle-cart'))">✖️</button>
      </div>
      
      <div style="flex: 1; overflow-y: auto;">
        ${t.length===0?'<p style="text-align: center; color: var(--text-soft); margin-top: 50px;">Tu carrito está vacío 🐶</p>':t.map((i,r)=>`
            <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 10px;">
              <img src="${i.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
              <div style="flex: 1;">
                <p style="font-weight: 600; font-size: 0.9rem;">${i.name}</p>
                <p style="color: var(--primary-dark); font-size: 0.8rem;">$${i.price}</p>
              </div>
              <button class="btn" style="padding: 5px;" onclick="window.dispatchEvent(new CustomEvent('shop-remove', {detail: ${r}}))">🗑️</button>
            </div>
          `).join("")}
      </div>

      <div style="border-top: 2px solid var(--border); padding-top: 20px;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.2rem; margin-bottom: 20px;">
          <span>Total</span>
          <span>$${e}</span>
        </div>
        <button class="btn btn-secondary" style="width: 100%;" ${t.length===0?"disabled":""} onclick="alert('Funcionalidad de pago próximamente con MercadoPago 🚀')">
          PAGAR AHORA
        </button>
      </div>
    </div>
  `},u=t=>`
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
          <div style="color: var(--text-soft);">${new Date().toLocaleDateString("es-AR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
        </header>

        <!-- Stats Grid -->
        <div class="grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 40px;">
          <div class="card" style="border-left: 5px solid var(--primary);">
            <p style="color: var(--text-soft); font-size: 0.9rem;">Turnos Hoy</p>
            <h3 style="font-size: 2rem; margin-top: 10px;">${t.appointmentsToday}</h3>
          </div>
          <div class="card" style="border-left: 5px solid var(--secondary);">
            <p style="color: var(--text-soft); font-size: 0.9rem;">Ventas del Mes</p>
            <h3 style="font-size: 1.8rem; margin-top: 10px;">$${t.monthlySales.toLocaleString()}</h3>
          </div>
          <div class="card" style="border-left: 5px solid var(--accent);">
            <p style="color: var(--text-soft); font-size: 0.9rem;">Stock Crítico</p>
            <h3 style="font-size: 2rem; margin-top: 10px; color: #E53E3E;">${t.lowStockItems}</h3>
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
                ${t.upcoming.map(e=>`
                  <tr style="border-bottom: 1px solid var(--bg-soft);">
                    <td style="padding: 15px 0; font-weight: 600;">${e.time}</td>
                    <td>${e.pet}</td>
                    <td><span style="padding: 4px 10px; border-radius: 20px; background: var(--primary-light); color: var(--primary-dark); font-size: 0.75rem;">${e.service}</span></td>
                    <td style="color: var(--text-soft);">${e.status}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <!-- Inventory Alerts -->
          <div class="card">
            <h3 style="margin-bottom: 20px; font-size: 1.1rem;">Alertas de Stock</h3>
            ${t.alerts.map(e=>`
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding: 10px; background: #FFF5F5; border-radius: 8px;">
                <span style="font-size: 1.2rem;">⚠️</span>
                <div>
                  <p style="font-size: 0.85rem; font-weight: 600;">${e.item}</p>
                  <p style="font-size: 0.75rem; color: #C53030;">Quedan ${e.stock} unidades</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </main>
    </div>
  `,y=()=>`
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
  `,h=(t=[])=>`
    <div class="container fade-in" style="padding-top: 20px; padding-bottom: 100px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h2>🐶 Mis Mascotas</h2>
        <button class="btn btn-secondary" style="padding: 8px 15px; font-size: 0.9rem;" onclick="window.dispatchEvent(new CustomEvent('nav', {detail: 'landing'}))">Cerrar Sesión</button>
      </div>
      <div style="margin-top: 30px;">
        ${t.map(e=>`
          <div class="card" style="margin-bottom: 20px;">
            <div style="display: flex; gap: 20px; align-items: center;">
              <img src="${e.image}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
              <div>
                <h3>${e.name}</h3>
                <p style="color: var(--text-soft);">${e.breed} • ${e.age}</p>
              </div>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border);">
              <h4 style="font-size: 0.9rem; margin-bottom: 15px;">💉 Carnet de Vacunación</h4>
              ${e.vaccines.map(i=>`
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px;">
                  <span>${i.name}</span>
                  <span style="color: ${i.status==="Al día"?"var(--primary-dark)":"var(--secondary)"}">${i.date} (${i.status})</span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
    `,f=()=>{const t=document.querySelector("#app");let e="landing",i={step:0,data:{}},r=JSON.parse(localStorage.getItem("cart")||"[]"),a=!1;const s={appointmentsToday:8,monthlySales:158400,lowStockItems:2,upcoming:[{time:"10:30",pet:"Bobby",service:"Vacunación",status:"Confirmado"},{time:"11:15",pet:"Luna",service:"Peluquería",status:"Pendiente"},{time:"12:00",pet:"Rex",service:"Consulta",status:"Confirmado"}],alerts:[{item:"Royal Canin Adult 15kg",stock:2},{item:"Shampoo Neutro 5L",stock:1}]},d=[{name:"Bobby",breed:"Golden Retriever",age:"3 años",image:"https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200",vaccines:[{name:"Antirrábica",date:"15/05/2025",status:"Al día"},{name:"Quíntuple",date:"20/10/2025",status:"Próximamente"}]}],o=()=>{if(t.innerHTML="",e==="landing"?t.innerHTML=y():e==="booking"?t.innerHTML=p(i.step,i.data):e==="shop"?t.innerHTML=v(r):e==="profile"?t.innerHTML=h(d):e==="admin-dash"&&(t.innerHTML=u(s)),a){const n=document.createElement("div");n.innerHTML=g(r),t.appendChild(n)}};window.addEventListener("nav",n=>{e=n.detail,a=!1,window.scrollTo(0,0),o()}),window.addEventListener("shop-add",n=>{r.push(n.detail),localStorage.setItem("cart",JSON.stringify(r)),o()}),window.addEventListener("shop-remove",n=>{r.splice(n.detail,1),localStorage.setItem("cart",JSON.stringify(r)),o()}),window.addEventListener("shop-toggle-cart",()=>{a=!a,o()}),window.addEventListener("booking-select",n=>{i.data[n.detail.field]=n.detail.value,o()}),window.addEventListener("booking-next",()=>{if(i.step===1)i.data.petName=document.querySelector("#petName").value,i.data.ownerName=document.querySelector("#ownerName").value;else if(i.step===2){i.data.datetime=document.querySelector("#datetime").value,alert(`¡Turno confirmado para ${i.data.petName}!`),i={step:0,data:{}},e="landing",o();return}i.step++,o()}),window.addEventListener("booking-back",()=>{i.step>0?i.step--:e="landing",o()}),o()};document.addEventListener("DOMContentLoaded",f);
