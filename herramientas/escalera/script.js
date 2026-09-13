/**
 * GV INGENIERÍA — Calculadora de Escaleras (Ley de Blondel)
 * Cálculo geométrico y ergonómico en tiempo real
 * Ing. Civil Gastón Vidal (MP4513)
 */

document.addEventListener('DOMContentLoaded', () => {
  const alturaTotalInput = document.getElementById('alturaTotalInput');
  const contrahuellaDeseadaInput = document.getElementById('contrahuellaDeseadaInput');
  const anchoEscaleraInput = document.getElementById('anchoEscaleraInput');

  const displayNumeroEscalones = document.getElementById('displayNumeroEscalones');
  const displayContrahuellaReal = document.getElementById('displayContrahuellaReal');
  const displayHuellaRecomendada = document.getElementById('displayHuellaRecomendada');
  const displayDesarrolloHorizontal = document.getElementById('displayDesarrolloHorizontal');
  const displayAngulo = document.getElementById('displayAngulo');
  const displayDiagnostico = document.getElementById('displayDiagnostico');
  const btnWhatsApp = document.getElementById('btnWhatsApp');

  function calcular() {
    // Altura total ingresada en metros, convertida a cm
    const alturaM = Utils.parseInput(alturaTotalInput.value, 2.80);
    const alturaCm = alturaM * 100;

    const cpDeseada = Utils.parseInput(contrahuellaDeseadaInput.value, CONFIG.escalera.contrahuellaRecomendada);
    const anchoM = Utils.parseInput(anchoEscaleraInput.value, 0.90);

    // Número de alzadas (contrahuellas) redondeado al entero más cercano
    const nContrahuellas = Math.max(1, Math.round(alturaCm / cpDeseada));
    const nHuellas = nContrahuellas - 1; // Número de peldaños en planta

    // Contrahuella real exacta
    const cpReal = alturaCm / nContrahuellas;

    // Huella según Ley de Blondel: 2*CP + P = 63 cm => P = 63 - 2*CP
    let pRecomendada = CONFIG.escalera.blondelOptimo - (2 * cpReal);
    // Limitar huella a un rango físicamente seguro (25 cm a 32 cm)
    if (pRecomendada < 25) pRecomendada = 25;
    if (pRecomendada > 32) pRecomendada = 32;

    const valorBlondel = (2 * cpReal) + pRecomendada;

    // Desarrollo horizontal en planta (en metros)
    const desarrolloHorizontalM = (nHuellas * pRecomendada) / 100;

    // Ángulo de inclinación en grados: atan(CP / P)
    const anguloRad = Math.atan(cpReal / pRecomendada);
    const anguloGrados = anguloRad * (180 / Math.PI);

    // Diagnóstico ergonómico
    let diagnosticoTexto = '✅ Excelente ergonometría (Ley de Blondel)';
    let diagnosticoColor = 'var(--ok)';

    if (anguloGrados > 38) {
      diagnosticoTexto = '⚠️ Inclinada (Algo empinada para vivienda)';
      diagnosticoColor = 'var(--oro)';
    } else if (anguloGrados < 26) {
      diagnosticoTexto = 'ℹ️ Tendida (Poca inclinación, desarrollo largo)';
      diagnosticoColor = 'var(--texto-muted)';
    }

    // Actualización del LIVE DISPLAY
    displayNumeroEscalones.textContent = Utils.formatNumber(nContrahuellas, 0);
    displayContrahuellaReal.textContent = Utils.formatNumber(cpReal, 2);
    displayHuellaRecomendada.textContent = Utils.formatNumber(pRecomendada, 1);
    displayDesarrolloHorizontal.textContent = Utils.formatNumber(desarrolloHorizontalM, 2);
    displayAngulo.textContent = `${Utils.formatNumber(anguloGrados, 1)}°`;

    displayDiagnostico.textContent = `${diagnosticoTexto} (2×CP + P = ${Utils.formatNumber(valorBlondel, 1)} cm)`;
    displayDiagnostico.style.color = diagnosticoColor;

    // WhatsApp CTA
    const mensajeWA = `Hola Ing. Gastón Vidal, usé la Calculadora de Escaleras en la web de GV Ingeniería. Estimé una escalera para salvar ${Utils.formatNumber(alturaM, 2)}m de altura con ${nContrahuellas} escalones (Contrahuella: ${Utils.formatNumber(cpReal, 2)}cm, Huella: ${Utils.formatNumber(pRecomendada, 1)}cm, Desarrollo: ${Utils.formatNumber(desarrolloHorizontalM, 2)}m). Quisiera consultar para mi obra.`;
    btnWhatsApp.href = Utils.getWhatsAppUrl(mensajeWA);
  }

  const inputs = [alturaTotalInput, contrahuellaDeseadaInput, anchoEscaleraInput];
  inputs.forEach(input => {
    input.addEventListener('input', calcular);
    input.addEventListener('change', calcular);
  });

  calcular();
});
