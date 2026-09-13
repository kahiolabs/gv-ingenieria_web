/**
 * GV INGENIERÍA — Calculadora de Mampostería
 * Cómputo de ladrillos y mezcla de asiento en tiempo real
 * Ing. Civil Gastón Vidal (MP4513)
 */

document.addEventListener('DOMContentLoaded', () => {
  const largoInput = document.getElementById('largoInput');
  const altoInput = document.getElementById('altoInput');
  const descuentoInput = document.getElementById('descuentoInput');
  const tipoLadrilloSelect = document.getElementById('tipoLadrilloSelect');
  const desperdicioInput = document.getElementById('desperdicioInput');

  const displaySuperficieNeta = document.getElementById('displaySuperficieNeta');
  const displayTotalLadrillos = document.getElementById('displayTotalLadrillos');
  const displayBolsasCemento = document.getElementById('displayBolsasCemento');
  const displayBolsasCal = document.getElementById('displayBolsasCal');
  const displayArenaM3 = displayArenaM3Dom = document.getElementById('displayArenaM3');
  const btnWhatsApp = document.getElementById('btnWhatsApp');

  function calcular() {
    const largo = Utils.parseInput(largoInput.value, 0);
    const alto = Utils.parseInput(altoInput.value, 0);
    const descuento = Utils.parseInput(descuentoInput.value, 0);
    const desperdicioPct = Utils.parseInput(desperdicioInput.value, CONFIG.mamposteria.desperdicioDefault);
    const tipoKey = tipoLadrilloSelect.value;

    const ladrilloConfig = CONFIG.mamposteria.tipos[tipoKey] || CONFIG.mamposteria.tipos.h12;

    const superficieBruta = largo * alto;
    const superficieNeta = Math.max(0, superficieBruta - descuento);

    const factorDesperdicio = 1 + (desperdicioPct / 100);

    // Cómputo de mampuestos
    const ladrillosNeto = superficieNeta * ladrilloConfig.unidadesPorM2;
    const ladrillosTotal = Math.ceil(ladrillosNeto * factorDesperdicio);

    // Cómputo de mortero de asiento
    const kgCementoTotal = superficieNeta * ladrilloConfig.cementoKgPorM2 * factorDesperdicio;
    const bolsasCemento50kg = Math.ceil(kgCementoTotal / 50);

    const kgCalTotal = superficieNeta * ladrilloConfig.calKgPorM2 * factorDesperdicio;
    const bolsasCal25kg = Math.ceil(kgCalTotal / 25);

    const arenaM3Total = superficieNeta * ladrilloConfig.arenaM3PorM2 * factorDesperdicio;

    // Actualización del LIVE DISPLAY
    displaySuperficieNeta.textContent = Utils.formatNumber(superficieNeta, 2);
    displayTotalLadrillos.textContent = Utils.formatNumber(ladrillosTotal, 0);
    displayBolsasCemento.textContent = Utils.formatNumber(bolsasCemento50kg, 0);
    displayBolsasCal.textContent = Utils.formatNumber(bolsasCal25kg, 0);
    displayArenaM3.textContent = Utils.formatNumber(arenaM3Total, 2);

    // Actualizar WhatsApp CTA
    const ladrilloNombre = tipoLadrilloSelect.options[tipoLadrilloSelect.selectedIndex].text;
    const mensajeWA = `Hola Ing. Gastón Vidal, usé la Calculadora de Mampostería en la web de GV Ingeniería. Estimé un cómputo para ${Utils.formatNumber(superficieNeta, 2)} m² de muro (${ladrilloNombre}), resultando en ${Utils.formatNumber(ladrillosTotal, 0)} unidades de ladrillos. Quisiera consultar para mi obra.`;
    btnWhatsApp.href = Utils.getWhatsAppUrl(mensajeWA);
  }

  const inputs = [largoInput, altoInput, descuentoInput, desperdicioInput];
  inputs.forEach(input => {
    input.addEventListener('input', calcular);
    input.addEventListener('change', calcular);
  });
  tipoLadrilloSelect.addEventListener('change', calcular);

  calcular();
});
