/**
 * GV INGENIERÍA — Calculadora de Costo de Construcción
 * Estimación paramétrica interactiva en tiempo real
 * Ing. Civil Gastón Vidal (MP4513)
 */

document.addEventListener('DOMContentLoaded', () => {
  const tipoObraSelect = document.getElementById('tipoObraSelect');
  const calidadSelect = document.getElementById('calidadSelect');
  const superficieInput = document.getElementById('superficieInput');

  const displayInversionTotal = document.getElementById('displayInversionTotal');
  const displayCostoM2 = document.getElementById('displayCostoM2');
  const displayMateriales = document.getElementById('displayMateriales');
  const displayManoObra = document.getElementById('displayManoObra');
  const displayHonorarios = document.getElementById('displayHonorarios');
  const btnWhatsApp = document.getElementById('btnWhatsApp');

  function cargarCalidades() {
    const tipoKey = tipoObraSelect.value;
    const obraConfig = CONFIG.costoConstruccion.tiposObra[tipoKey];
    
    calidadSelect.innerHTML = '';
    Object.keys(obraConfig.calidades).forEach(key => {
      const cal = obraConfig.calidades[key];
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = `${cal.nombre} (${cal.costoM2} ${CONFIG.costoConstruccion.moneda}/m²)`;
      calidadSelect.appendChild(opt);
    });
  }

  function calcular() {
    const tipoKey = tipoObraSelect.value;
    const calidadKey = calidadSelect.value || 'estandar';
    const superficie = Utils.parseInput(superficieInput.value, 0);

    const obraConfig = CONFIG.costoConstruccion.tiposObra[tipoKey];
    const calidadConfig = obraConfig.calidades[calidadKey] || Object.values(obraConfig.calidades)[0];

    const costoPorM2 = calidadConfig.costoM2;
    const inversionTotal = superficie * costoPorM2;

    const materialesPct = CONFIG.costoConstruccion.desglosePorcentual.materiales / 100;
    const manoObraPct = CONFIG.costoConstruccion.desglosePorcentual.manoDeObra / 100;
    const honorariosPct = CONFIG.costoConstruccion.desglosePorcentual.honorariosEquipos / 100;

    const montoMateriales = inversionTotal * materialesPct;
    const montoManoObra = inversionTotal * manoObraPct;
    const montoHonorarios = inversionTotal * honorariosPct;

    // Actualización del LIVE DISPLAY
    displayInversionTotal.textContent = Utils.formatNumber(inversionTotal, 0);
    displayCostoM2.textContent = `${Utils.formatNumber(costoPorM2, 0)} ${CONFIG.costoConstruccion.moneda}`;
    displayMateriales.textContent = `${Utils.formatNumber(montoMateriales, 0)} ${CONFIG.costoConstruccion.moneda}`;
    displayManoObra.textContent = `${Utils.formatNumber(montoManoObra, 0)} ${CONFIG.costoConstruccion.moneda}`;
    displayHonorarios.textContent = `${Utils.formatNumber(montoHonorarios, 0)} ${CONFIG.costoConstruccion.moneda}`;

    // Actualizar WhatsApp CTA
    const mensajeWA = `Hola Ing. Gastón Vidal, usé la Calculadora de Costo de Construcción en la web. Hice una estimación para una ${obraConfig.nombre} (${calidadConfig.nombre}) de ${superficie} m², resultando en una inversión orientativa de ${Utils.formatNumber(inversionTotal, 0)} ${CONFIG.costoConstruccion.moneda}. Quisiera solicitar una cotización formal para mi proyecto.`;
    btnWhatsApp.href = Utils.getWhatsAppUrl(mensajeWA);
  }

  tipoObraSelect.addEventListener('change', () => {
    cargarCalidades();
    calcular();
  });
  calidadSelect.addEventListener('change', calcular);
  superficieInput.addEventListener('input', calcular);
  superficieInput.addEventListener('change', calcular);

  cargarCalidades();
  calcular();
});
