/**
 * GV INGENIERÍA — Configuración Técnica y Parámetros Centralizados
 * Todas las calculadoras consumen las constantes desde este archivo.
 * Ing. Civil Gastón Vidal (MP4513) - Corrientes, Argentina
 */

const CONFIG = {
  // Datos de contacto oficial
  contacto: {
    whatsapp: '5493794658356',
    profesional: 'Ing. Civil Gastón Vidal',
    matricula: 'MP4513',
    ciudad: 'Corrientes, Argentina'
  },

  // 1. Calculadora de Hormigón
  hormigon: {
    desperdicioDefault: 10,
    tipos: {
      H17: {
        nombre: 'H17 — Fundaciones, veredas, encadenados',
        cementoKgPorM3: 300,
        arenaM3PorM3: 0.65,
        piedraM3PorM3: 0.65,
        aguaLitrosPorM3: 180
      },
      H21: {
        nombre: 'H21 — Losas, vigas, columnas de vivienda',
        cementoKgPorM3: 350,
        arenaM3PorM3: 0.65,
        piedraM3PorM3: 0.65,
        aguaLitrosPorM3: 190
      },
      H25: {
        nombre: 'H25 — Estructuras exigidas, bases de hormigón',
        cementoKgPorM3: 400,
        arenaM3PorM3: 0.60,
        piedraM3PorM3: 0.65,
        aguaLitrosPorM3: 200
      }
    }
  },

  // 2. Calculadora de Costo de Construcción (Estimaciones por m²)
  costoConstruccion: {
    moneda: 'USD',
    fechaReferencia: 'Junio 2026',
    tiposObra: {
      vivienda: {
        nombre: 'Vivienda Unifamiliar',
        calidades: {
          estandar: { nombre: 'Estándar / Funcional', costoM2: 650 },
          media: { nombre: 'Media / Buena Calidad', costoM2: 850 },
          premium: { nombre: 'Premium / Alta Gama', costoM2: 1200 }
        }
      },
      ampliacion: {
        nombre: 'Ampliación / Quincho / Cochera',
        calidades: {
          estandar: { nombre: 'Estándar', costoM2: 500 },
          media: { nombre: 'Buena Calidad', costoM2: 700 },
          premium: { nombre: 'Premium', costoM2: 950 }
        }
      },
      comercial: {
        nombre: 'Local Comercial / Oficina',
        calidades: {
          estandar: { nombre: 'Básico', costoM2: 550 },
          media: { nombre: 'Comercial Estándar', costoM2: 750 },
          premium: { nombre: 'Alta Gama', costoM2: 1100 }
        }
      }
    },
    desglosePorcentual: {
      materiales: 48,
      manoDeObra: 42,
      honorariosEquipos: 10
    }
  },

  // 3. Calculadora de Mampostería
  mamposteria: {
    desperdicioDefault: 8,
    tipos: {
      h12: {
        nombre: 'Ladrillo Cerámico Hueco 12x18x33 cm (Muro 15cm)',
        unidadesPorM2: 16,
        morteroLitrosPorM2: 14,
        cementoKgPorM2: 2.8,
        calKgPorM2: 2.8,
        arenaM3PorM2: 0.014
      },
      h18: {
        nombre: 'Ladrillo Cerámico Hueco 18x18x33 cm (Muro 20cm)',
        unidadesPorM2: 16,
        morteroLitrosPorM2: 20,
        cementoKgPorM2: 4.0,
        calKgPorM2: 4.0,
        arenaM3PorM2: 0.020
      },
      h8: {
        nombre: 'Ladrillo Cerámico Hueco 8x18x33 cm (Tabique 10cm)',
        unidadesPorM2: 16,
        morteroLitrosPorM2: 10,
        cementoKgPorM2: 2.0,
        calKgPorM2: 2.0,
        arenaM3PorM2: 0.010
      },
      comun15: {
        nombre: 'Ladrillo Común de Campo (Muro 15cm de soga)',
        unidadesPorM2: 60,
        morteroLitrosPorM2: 32,
        cementoKgPorM2: 6.4,
        calKgPorM2: 6.4,
        arenaM3PorM2: 0.032
      },
      comun30: {
        nombre: 'Ladrillo Común de Campo (Muro 30cm de tizón)',
        unidadesPorM2: 115,
        morteroLitrosPorM2: 70,
        cementoKgPorM2: 14.0,
        calKgPorM2: 14.0,
        arenaM3PorM2: 0.070
      },
      bloqueHormigon: {
        nombre: 'Bloque de Hormigón 19x19x39 cm (Muro 20cm)',
        unidadesPorM2: 12.5,
        morteroLitrosPorM2: 12,
        cementoKgPorM2: 3.2,
        calKgPorM2: 2.0,
        arenaM3PorM2: 0.012
      }
    }
  },

  // 4. Calculadora de Pintura
  pintura: {
    desperdicioDefault: 5,
    tipos: {
      latexInterior: {
        nombre: 'Látex Interior para Paredes / Cielorrasos',
        rendimientoM2PorLitroMano: 11
      },
      latexExterior: {
        nombre: 'Látex Exterior Impermeabilizante',
        rendimientoM2PorLitroMano: 9
      },
      esmalteSintetico: {
        nombre: 'Esmalte Sintético (Carpintería / Metal / Madera)',
        rendimientoM2PorLitroMano: 12
      },
      fijadorSellador: {
        nombre: 'Fijador / Sellador Acondicionador (1 mano previa)',
        rendimientoM2PorLitroMano: 15
      }
    }
  },

  // 5. Calculadora de Techos y Cubiertas
  techo: {
    desperdicioDefault: 10,
    tiposCubierta: {
      plana: { nombre: 'Plana / Azotea Accesible', factorInclinacion: 1.0 },
      agua1: { nombre: 'A 1 Agua Inclinado', factorInclinacionDefault: 1.05 },
      agua2: { nombre: 'A 2 Aguas Inclinado', factorInclinacionDefault: 1.08 }
    },
    materiales: {
      chapaTrapezoidal: {
        nombre: 'Chapa Sinusoidal / Trapezoidal (C-25)',
        anchoUtilM: 1.00
      },
      tejaCeramica: {
        nombre: 'Teja Cerámica (Francés / Colonial)',
        unidadesPorM2: 14
      }
    }
  },

  // 6. Calculadora de Escaleras (Ley de Blondel)
  escalera: {
    blondelMin: 61,
    blondelOptimo: 63,
    blondelMax: 65,
    contrahuellaRecomendada: 17.5,
    huellaRecomendada: 28.0
  }
};
