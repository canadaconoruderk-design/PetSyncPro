export const services = [
  { id: 'vet_consulta', name: 'Consulta General', icon: '🏥', price: 2500, category: 'veterinaria' },
  { id: 'vet_vacuna', name: 'Vacunación', icon: '💉', price: 1800, category: 'veterinaria' },
  { id: 'groom_basic', name: 'Baño y Corte', icon: '✂️', price: 3000, category: 'peluqueria' },
  { id: 'groom_full', name: 'Tratamiento Completo', icon: '🫧', price: 4500, category: 'peluqueria' }
];

export const renderBooking = (step, data = {}, onNext, onBack) => {
  const steps = [
    { title: '¿Qué servicio necesita?', field: 'service' },
    { title: '¿Para quién es el turno?', field: 'pet' },
    { title: 'Selecciona fecha y hora', field: 'datetime' }
  ];

  const currentStep = steps[step];

  let content = '';

  if (step === 0) {
    content = `
      <div class="grid" style="grid-template-columns: 1fr 1fr; margin-top: 20px;">
        ${services.map(s => `
          <div class="card service-card ${data.service?.id === s.id ? 'active' : ''}" 
               style="cursor: pointer; border: 2px solid ${data.service?.id === s.id ? 'var(--primary)' : 'transparent'}"
               onclick="window.dispatchEvent(new CustomEvent('booking-select', {detail: {field: 'service', value: ${JSON.stringify(s).replace(/"/g, '&quot;')}}}) )">
            <div style="font-size: 2rem; margin-bottom: 10px;">${s.icon}</div>
            <h4 style="font-size: 0.9rem;">${s.name}</h4>
            <p style="font-size: 0.8rem; color: var(--text-soft);">$${s.price}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (step === 1) {
    content = `
      <div style="margin-top: 20px;">
        <input type="text" id="petName" placeholder="Nombre de la mascota" class="input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 15px;" value="${data.petName || ''}">
        <input type="text" id="ownerName" placeholder="Tu nombre" class="input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border);" value="${data.ownerName || ''}">
      </div>
    `;
  } else if (step === 2) {
    content = `
      <div style="margin-top: 20px;">
        <input type="datetime-local" id="datetime" class="input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border);" value="${data.datetime || ''}">
      </div>
    `;
  }

  return `
    <div class="container fade-in" style="max-width: 500px; padding-bottom: 100px;">
      <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
         <button class="btn" style="padding: 5px;" onclick="${step === 0 ? "window.dispatchEvent(new CustomEvent('nav', {detail: 'landing'}))" : "window.dispatchEvent(new CustomEvent('booking-back'))"}">⬅️</button>
         <h2 style="font-size: 1.4rem;">${currentStep.title}</h2>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: var(--shadow-md);">
        <div style="display: flex; gap: 5px; margin-bottom: 20px;">
          ${steps.map((_, i) => `<div style="flex: 1; height: 6px; border-radius: 3px; background: ${i <= step ? 'var(--primary)' : 'var(--border)'}"></div>`).join('')}
        </div>
        
        ${content}

        <button class="btn btn-primary" style="width: 100%; margin-top: 30px;" 
          onclick="window.dispatchEvent(new CustomEvent('booking-next', {detail: {step: ${step}}}))">
          ${step === 2 ? 'Confirmar Turno ✅' : 'Continuar'}
        </button>
      </div>
    </div>
  `;
};
