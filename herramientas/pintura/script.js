/**
 * GV INGENIERÍA — Calculadora de Pintura
 * Estimación de litros y latas necesarias en tiempo real
 * Ing. Civil Gastón Vidal (MP4513)
 */

document.addEventListener('DOMContentLoaded', () => {
  const modoSelect = document.getElementById('modoSelect');
  const modoSuperficieDirecta = document.getElementById('modoSuperficieDirecta');
  const modoHabitacion = document.getElementById('modoHabitacion');

  const superficieDirectaInput = document.getElementById('superficieDirectaInput');
  const largoHabInput = document.getElementById('largoHabInput');
  const anchoHabInput = document.getElementById('anchoHabInput');
  const altoHabInput = document.getElementById('altoHabInput');
  const aberturasInput = document.getElementById('aberturasInput');

  const tipoPinturaSelect = document.getElementById('tipoPinturaSelect');
  const manosInput = document.getElementById('manosInput');
  const desperdicioInput = document.getElementById('desperdicioInput');

  const displayLitrosTotales = document.getElementById('displayLitrosTotales');
  const displaySuperficieTotal = document.getElementById('displaySuperficieTotal');
  const displayLatas20 = document.getElementById('displayLatas20');
  const displayLatas4 = document.getElementById('displayLatas4');
  const btnWhatsApp = document.getElementById('btnWhatsApp');

  function calcular() {
    let superficieBase = 0;

    if (modoSelect.value === 'directo') {
      superficieBase = Utils.parseInput(superficieDirectaInput.value, 0);
    } else {
      const largo = Utils.parseInput(largoHabInput.value, 0);
      const ancho = Utils.parseInput(anchoHabInput.value, 0);
      const alto = Utils.parseInput(altoHabInput.value, 0);
      const aberturas = Utils.parseInput(aberturasInput.value, 0);

      const perimetro = 2 * (largo + ancho);
      const superficieParedes = perimetro * alto;
      superficieBase = Math.max(0, superficieParedes - aberturas);
    }

    const manos = Math.max(1, Math.round(Utils.parseInput(manosInput.value, 2)));
    const desperdicioPct = Utils.parseInput(desperdicioInput.value, CONFIG.pintura.desperdicioDefault);
    const tipoKey = tipoPinturaSelect.value;

    const productoConfig = CONFIG.pintura.tipos[tipoKey] || CONFIG.pintura.tipos.latexInterior;

    const superficieTotalManos = superficieBase * manos;
    const rindePorLitro = productoConfig.rendimientoM2PorLitroMano;

    const litrosTeoricos = superficieTotalManos / rindePorLitro;
    const factorDesperdicio = 1 + (desperdicioPct / 100);
    const litrosTotales = litrosTeoricos * factorDesperdicio;

    // Calcular recomendación de latas (latas de 20L y complemento de 4L)
    const latas20 = Math.floor(litrosTotales / 20);
    const restoLitros = litrosTotales - (latas20 * 20);
    const latas4 = Math.ceil(restoLitros / 4);

    // Actualización del LIVE DISPLAY
    displayLitrosTotales.textContent = Utils.formatNumber(litrosTotales, 1);
    displaySuperficieTotal.textContent = Utils.formatNumber(superficieBase, 1);
    displayLatas20.textContent = Utils.formatNumber(latas20, 0);
    displayLatas4.textContent = Utils.formatNumber(latas4, 0);

    // WhatsApp CTA
    const productoNombre = tipoPinturaSelect.options[tipoPinturaSelect.selectedIndex].text;
    const mensajeWA = `Hola Ing. Gastón Vidal, usé la Calculadora de Pintura en la web de GV Ingeniería. Estimé un consumo de ${Utils.formatNumber(litrosTotales, 1)} litros para ${Utils.formatNumber(superficieBase, 1)} m² de superficie (${manos} manos de ${productoNombre}). Quisiera consultar para mi obra.`;
    btnWhatsApp.href = Utils.getWhatsAppUrl(mensajeWA);
  }

  modoSelect.addEventListener('change', () => {
    if (modoSelect.value === 'directo') {
      modoSuperficieDirecta.style.display = 'block';
      modoHabitacion.style.display = 'none';
    } else {
      modoSuperficieDirecta.style.display = 'none';
      modoHabitacion.style.display = 'block';
    }
    calcular();
  });

  const inputs = [superficieDirectaInput, largoHabInput, anchoHabInput, altoHabInput, aberturasInput, manosInput, desperdicioInput];
  inputs.forEach(input => {
    input.addEventListener('input', calcular);
    input.addEventListener('change', calcular);
  });
  tipoPinturaSelect.addEventListener('change', calcular);

  calcular();
});
