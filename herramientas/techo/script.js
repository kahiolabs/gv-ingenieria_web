/**
 * GV INGENIERÍA — Calculadora de Techos y Cubiertas
 * Cálculo trigonométrico de pendiente, superficie real y materiales en tiempo real
 * Ing. Civil Gastón Vidal (MP4513)
 */

document.addEventListener('DOMContentLoaded', () => {
  const tipoCubiertaSelect = document.getElementById('tipoCubiertaSelect');
  const materialCubiertaSelect = document.getElementById('materialCubiertaSelect');
  const largoPlantaInput = document.getElementById('largoPlantaInput');
  const anchoPlantaInput = document.getElementById('anchoPlantaInput');
  const pendientePctInput = document.getElementById('pendientePctInput');
  const aleroInput = document.getElementById('aleroInput');
  const desperdicioInput = document.getElementById('desperdicioInput');

  const displaySuperficieInclinada = document.getElementById('displaySuperficieInclinada');
  const displaySuperficiePlanta = document.getElementById('displaySuperficiePlanta');
  const displayMaterialCubierta = document.getElementById('displayMaterialCubierta');
  const displayUnidadMaterial = document.getElementById('displayUnidadMaterial');
  const displayAislacionM2 = document.getElementById('displayAislacionM2');
  const btnWhatsApp = document.getElementById('btnWhatsApp');

  function calcular() {
    const tipo = tipoCubiertaSelect.value;
    const materialKey = materialCubiertaSelect.value;
    const largo = Utils.parseInput(largoPlantaInput.value, 0);
    const ancho = Utils.parseInput(anchoPlantaInput.value, 0);
    const pendientePct = Utils.parseInput(pendientePctInput.value, 15);
    const alero = Utils.parseInput(aleroInput.value, 0.5);
    const desperdicioPct = Utils.parseInput(desperdicioInput.value, CONFIG.techo.desperdicioDefault);

    // Dimensiones con aleros incluidos
    const largoTotal = largo + (2 * alero);
    const anchoTotal = ancho + (2 * alero);
    const superficiePlanta = largoTotal * anchoTotal;

    // Factor trigonométrico de inclinación: sec(atan(pend/100)) = sqrt(1 + (pend/100)^2)
    let factorInclinacion = 1.0;
    if (tipo === 'agua1' || tipo === 'agua2') {
      const pendDecimal = pendientePct / 100;
      factorInclinacion = Math.sqrt(1 + (pendDecimal * pendDecimal));
    }

    const superficieInclinadaNeto = superficiePlanta * factorInclinacion;
    const factorDesperdicio = 1 + (desperdicioPct / 100);
    const superficieInclinadaTotal = superficieInclinadaNeto * factorDesperdicio;

    // Cómputo según tipo de cubierta
    let materialCantidad = 0;
    let materialUnidadTexto = 'm';

    if (materialKey === 'chapaTrapezoidal') {
      // Metros lineales de chapa
      materialCantidad = superficieInclinadaTotal / CONFIG.techo.materiales.chapaTrapezoidal.anchoUtilM;
      materialUnidadTexto = 'ml de chapa';
    } else if (materialKey === 'tejaCeramica') {
      materialCantidad = Math.ceil(superficieInclinadaTotal * CONFIG.techo.materiales.tejaCeramica.unidadesPorM2);
      materialUnidadTexto = 'tejas';
    }

    // Aislación térmica e hidrófuga
    const aislacionM2Total = superficieInclinadaTotal;

    // Actualización del LIVE DISPLAY
    displaySuperficieInclinada.textContent = Utils.formatNumber(superficieInclinadaTotal, 2);
    displaySuperficiePlanta.textContent = Utils.formatNumber(superficiePlanta, 2);
    displayMaterialCubierta.textContent = Utils.formatNumber(materialCantidad, 1);
    displayUnidadMaterial.textContent = materialUnidadTexto;
    displayAislacionM2.textContent = Utils.formatNumber(aislacionM2Total, 2);

    // WhatsApp CTA
    const cubiertaNombre = tipoCubiertaSelect.options[tipoCubiertaSelect.selectedIndex].text;
    const mensajeWA = `Hola Ing. Gastón Vidal, usé la Calculadora de Techos en la web de GV Ingeniería. Estimé un techo ${cubiertaNombre} con una superficie real de ${Utils.formatNumber(superficieInclinadaTotal, 2)} m² (${pendientePct}% de pendiente). Quisiera asesorarme para la estructura y cubierta de mi obra.`;
    btnWhatsApp.href = Utils.getWhatsAppUrl(mensajeWA);
  }

  const inputs = [largoPlantaInput, anchoPlantaInput, pendientePctInput, aleroInput, desperdicioInput];
  inputs.forEach(input => {
    input.addEventListener('input', calcular);
    input.addEventListener('change', calcular);
  });
  tipoCubiertaSelect.addEventListener('change', calcular);
  materialCubiertaSelect.addEventListener('change', calcular);

  calcular();
});
