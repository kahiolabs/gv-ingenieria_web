/**
 * GV INGENIERÍA — Utilidades compartidas para calculadoras
 */

const Utils = {
  /**
   * Formatea un número al sistema decimal argentino (1.234,56)
   */
  formatNumber(val, decimals = 2) {
    if (isNaN(val) || val === null || val === undefined) return '0';
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    }).format(val);
  },

  /**
   * Parsea un valor de input convirtiendo comas a puntos y asegurando número no negativo
   */
  parseInput(val, fallback = 0) {
    if (typeof val === 'number') return isNaN(val) || val < 0 ? fallback : val;
    if (!val) return fallback;
    const cleanStr = val.toString().replace(',', '.').trim();
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) || parsed < 0 ? fallback : parsed;
  },

  /**
   * Genera enlace contextual de WhatsApp para consultar con el Ing. Gastón Vidal
   */
  getWhatsAppUrl(mensaje) {
    const phone = CONFIG.contacto.whatsapp;
    const textEncoded = encodeURIComponent(mensaje);
    return `https://wa.me/${phone}?text=${textEncoded}`;
  }
};
