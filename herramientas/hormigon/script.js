/**
 * GV INGENIERÍA — Calculadora de Hormigón (PILOTO)
 * Lógica de cálculo reactivo en tiempo real sin botón "Calcular"
 * Ing. Civil Gastón Vidal (MP4513)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos DOM de entrada
  const elementoSelect = document.getElementById('elementoSelect');
  const largoInput = document.getElementById('largoInput');
  const anchoInput = document.getElementById('anchoInput');
  const altoInput = document.getElementById('altoInput');
  const cantidadInput = document.getElementById('cantidadInput');
  const tipoHormigonSelect = document.getElementById('tipoHormigonSelect');
  const desperdicioInput = document.getElementById('desperdicioInput');

  // Elementos DOM de Live Display
  const displayVolumenTotal = document.getElementById('displayVolumenTotal');
  const displayVolumenNeto = document.getElementById('displayVolumenNeto');
  const displayBolsasCemento = document.getElementById('displayBolsasCemento');
  const displayKgCemento = document.getElementById('displayKgCemento');
  const displayArenaM3 = document.getElementById('displayArenaM3');
  const displayPiedraM3 = document.getElementById('displayPiedraM3');
  const displayAguaLitros = document.getElementById('displayAguaLitros');
  const btnWhatsApp = document.getElementById('btnWhatsApp');

  /**
   * Función principal de cálculo reactivo en tiempo real
   */
  function calcular() {
    // 1. Obtener y sanitizar inputs
    const largo = Utils.parseInput(largoInput.value, 0);
    const ancho = Utils.parseInput(anchoInput.value, 0);
    const alto = Utils.parseInput(altoInput.value, 0);
    const cantidad = Math.max(1, Math.round(Utils.parseInput(cantidadInput.value, 1)));
    const desperdicioPct = Utils.parseInput(desperdicioInput.value, CONFIG.hormigon.desperdicioDefault);
    const tipoHormigonKey = tipoHormigonSelect.value;

    // 2. Obtener dosificación desde la configuración técnica
    const dosificacion = CONFIG.hormigon.tipos[tipoHormigonKey] || CONFIG.hormigon.tipos.H21;

    // 3. Cálculos geométricos e ingenieriles
    const volumenUnico = largo * ancho * alto; // m³ por unidad
    const volumenNetoTotal = volumenUnico * cantidad; // m³ neto
    const factorDesperdicio = 1 + (desperdicioPct / 100);
    const volumenTotalConDesperdicio = volumenNetoTotal * factorDesperdicio; // m³ total a preparar

    // Materiales requeridos
    const kgCementoTotal = volumenTotalConDesperdicio * dosificacion.cementoKgPorM3;
    const bolsasCemento50kg = Math.ceil(kgCementoTotal / 50); // Redondeo superior a bolsas enteras
    const arenaM3Total = volumenTotalConDesperdicio * dosificacion.arenaM3PorM3;
    const piedraM3Total = volumenTotalConDesperdicio * dosificacion.piedraM3PorM3;
    const aguaLitrosTotal = volumenTotalConDesperdicio * dosificacion.aguaLitrosPorM3;

    // 4. Actualización del LIVE DISPLAY en tiempo real
    displayVolumenTotal.textContent = Utils.formatNumber(volumenTotalConDesperdicio, 2);
    displayVolumenNeto.textContent = Utils.formatNumber(volumenNetoTotal, 2);
    displayBolsasCemento.textContent = Utils.formatNumber(bolsasCemento50kg, 0);
    displayKgCemento.textContent = `${Utils.formatNumber(kgCementoTotal, 0)} kg`;
    displayArenaM3.textContent = Utils.formatNumber(arenaM3Total, 2);
    displayPiedraM3.textContent = Utils.formatNumber(piedraM3Total, 2);
    displayAguaLitros.textContent = Utils.formatNumber(aguaLitrosTotal, 0);

    // 5. Actualizar URL dinámica de WhatsApp CTA
    const elementoNombre = elementoSelect.options[elementoSelect.selectedIndex].text;
    const mensajeWA = `Hola Ing. Gastón Vidal, usé la Calculadora de Hormigón en la web de GV Ingeniería. Estimé un volumen de ${Utils.formatNumber(volumenTotalConDesperdicio, 2)} m³ (${tipoHormigonKey}) para ${cantidad} unidad/es de ${elementoNombre} (${largo}m x ${ancho}m x ${alto}m). Quisiera consultar para mi obra.`;
    
    btnWhatsApp.href = Utils.getWhatsAppUrl(mensajeWA);
  }

  // Event Listeners para actualización instantánea en cada cambio (input, select, change)
  const inputs = [largoInput, anchoInput, altoInput, cantidadInput, desperdicioInput];
  inputs.forEach(input => {
    input.addEventListener('input', calcular);
    input.addEventListener('change', calcular);
  });

  elementoSelect.addEventListener('change', () => {
    // Presets orientativos según el elemento seleccionado
    const val = elementoSelect.value;
    if (val === 'columna') {
      altoInput.value = '2.80';
      anchoInput.value = '0.20';
      largoInput.value = '0.20';
    } else if (val === 'viga') {
      largoInput.value = '4.00';
      anchoInput.value = '0.20';
      altoInput.value = '0.30';
    } else if (val === 'losa') {
      largoInput.value = '5.00';
      anchoInput.value = '4.00';
      altoInput.value = '0.12';
    } else if (val === 'zapata') {
      largoInput.value = '1.00';
      anchoInput.value = '1.00';
      altoInput.value = '0.40';
    }
    calcular();
  });

  tipoHormigonSelect.addEventListener('change', calcular);

  // Ejecutar cálculo inicial al cargar la página
  calcular();
});
