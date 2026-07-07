# GV Ingeniería — Documentación del Proyecto Web

> Sitio web profesional de GV Ingeniería — Ing. Civil Gastón Vidal (MP4513)  
> Corrientes, NEA — Argentina  
> Desarrollado por **KAHIO Studio · Landing Pro · Fases F1–F12**

---

## Estructura del proyecto

```
gv-ingenieria/
├── index.html                  ← Página principal (single-page)
├── assets/
│   ├── css/
│   │   └── styles.css          ← Estilos completos
│   ├── js/
│   │   └── main.js             ← JavaScript funcional
│   └── img/
│       ├── logo.webp           ← Isotipo GV Ingeniería
│       ├── hero1.webp          ← Imagen hero (fondo)
│       ├── og-image.png        ← Imagen para compartir en redes (1200×630) ⚠ PENDIENTE
│       ├── favicon-16x16.png   ← Favicon pequeño ⚠ PENDIENTE
│       ├── favicon-32x32.png   ← Favicon estándar ⚠ PENDIENTE
│       ├── favicon-192x192.png ← Ícono PWA ⚠ PENDIENTE
│       ├── favicon-512x512.png ← Ícono PWA grande ⚠ PENDIENTE
│       └── apple-touch-icon.png← Ícono iOS ⚠ PENDIENTE
├── _headers                    ← Security headers (Netlify)
├── _redirects                  ← Redirects HTTPS (Netlify)
├── .htaccess                   ← Config Apache (alternativa)
├── sitemap.xml                 ← Mapa del sitio para Google
├── robots.txt                  ← Instrucciones para rastreadores
├── site.webmanifest            ← Manifiesto PWA
└── README.md                   ← Este archivo
```

---

## Placeholders a reemplazar

| Placeholder | Archivo | Descripción |
|---|---|---|
| `G-XXXXXXXXXX` | `index.html` (×2) | ID de Google Analytics 4. Obtenerlo en analytics.google.com → Administrar → Flujos de datos → Web |
| `REEMPLAZAR_CON_TU_CODIGO_GSC` | `index.html` (comentado) | Meta tag de Google Search Console. Descomentar y completar al verificar el sitio |
| `https://gv-ingenieria.netlify.app/` | `index.html`, `sitemap.xml`, `robots.txt`, `site.webmanifest` | URL del sitio. Reemplazar por el dominio definitivo cuando esté registrado (ej: `https://gv-ingenieria.com.ar/`) |
| `og-image.png` | `assets/img/` | Imagen 1200×630px para compartir en redes. Crear usando Canva, Figma o similar con el logo y colores del proyecto |
| `favicon-*.png` | `assets/img/` | Favicons en múltiples tamaños. Generarlos en **realfavicongenerator.net** subiendo `logo.webp` |
| `apple-touch-icon.png` | `assets/img/` | Ícono para iOS (180×180px). Se genera junto con los favicons en realfavicongenerator.net |

---

## Paleta de colores

| Variable | Hex | Uso |
|---|---|---|
| `--negro` | `#0d0d0d` | Fondo base del sitio |
| `--carbon` | `#111111` | Fondo secciones alternadas |
| `--gris-oscuro` | `#1a1a1a` | Fondo hover cards, fondo inputs |
| `--gris-medio` | `#252525` | Elementos intermedios |
| `--gris-borde` | `#2e2e2e` | Bordes y separadores |
| `--oro` | `#c9a84c` | Color de acento primario |
| `--oro-claro` | `#e2c07a` | Oro en estados claros |
| `--oro-hover` | `#d4b05e` | Oro en hover |
| `--texto` | `#e0dbd0` | Texto principal |
| `--texto-muted` | `#7a7468` | Texto secundario/apagado |
| `--blanco` | `#f2ede0` | Blanco cálido (títulos) |
| `--error` | `#c0392b` | Estados de error en formulario |
| `--ok` | `#27ae60` | Estado de éxito en formulario |

---

## Tipografías

| Familia | Pesos | Uso |
|---|---|---|
| `Bebas Neue` | 400 | Títulos, H1, H2, H3, stats, footer |
| `IBM Plex Sans` | 300, 400, 500, 600 | Cuerpo, labels, navegación, botones |

Fuente: Google Fonts (cargada con `display=swap` para performance)

---

## Datos de contacto configurados

- **WhatsApp:** +5493794658356
- **Email:** vidalgas@gmail.com
- **Formspree endpoint:** https://formspree.io/f/xeebeydp ✅ Configurado
- **Facebook:** https://facebook.com/Gastonvidalingenierocivil ✅
- **Instagram:** https://instagram.com/ing.gastonvidal ✅

---

## Probar localmente

```bash
# Opción 1 — Python (viene con macOS y Linux)
cd gv-ingenieria
python3 -m http.server 8000
# Abrir: http://localhost:8000

# Opción 2 — Node.js
npx serve .
# Abrir: http://localhost:3000

# Opción 3 — VS Code
# Instalar extensión "Live Server" y hacer clic en "Go Live"
```

**Importante:** No abrir `index.html` directamente desde el explorador de archivos (`file://`). Usar siempre un servidor local para que los módulos JS y las rutas de assets funcionen correctamente.

---

## Generar favicons (F6 — PENDIENTE)

1. Ir a **https://realfavicongenerator.net**
2. Subir `assets/img/logo.webp`
3. En la sección de color de fondo, usar `#0d0d0d`
4. Descargar el paquete y copiar los archivos a `assets/img/`
5. Los nombres de archivo necesarios ya están referenciados en `index.html` y `site.webmanifest`

---

## Crear og-image (F6 — PENDIENTE)

La imagen de Open Graph es lo que aparece al compartir el sitio en WhatsApp, Facebook, LinkedIn, etc.

Dimensiones: **1200 × 630 px**

Sugerencia de contenido:
- Fondo negro (`#0d0d0d`) con textura sutil
- Logo GV Ingeniería centrado o a la izquierda
- Texto: "GV INGENIERÍA" (Bebas Neue, blanco)
- Subtítulo: "Ingeniero Civil MP4513 · Corrientes" (IBM Plex Sans, dorado)
- Guardar como `assets/img/og-image.png`

Herramientas gratuitas: Canva (plantillas de "Open Graph"), Figma.

---

## Deploy en Netlify (paso a paso)

### Primera vez:
1. Crear cuenta en **https://netlify.com** (gratis)
2. Ir a **Add new site → Deploy manually**
3. Arrastrar la carpeta `gv-ingenieria/` completa a la zona de drop
4. Netlify asigna una URL como `https://[random].netlify.app`
5. Ir a **Site settings → Domain management** y cambiar el nombre del sitio

### Con dominio propio:
1. Registrar dominio `.com.ar` en **https://nic.ar** (gratuito con CUIL/CUIT)
2. En Netlify → **Domain settings → Add custom domain**
3. Ingresar `gv-ingenieria.com.ar` (o el dominio elegido)
4. Netlify proporciona 4 nameservers DNS → configurarlos en el panel de NIC.ar
5. Propagación DNS: 24 a 72 horas
6. HTTPS se activa automáticamente vía Let's Encrypt (gratis)

### Deploy continuo (recomendado):
1. Subir el proyecto a **GitHub** (repositorio privado o público)
2. En Netlify → **Add new site → Import from Git**
3. Conectar repositorio
4. Cada `git push` actualiza el sitio automáticamente

---

## Google Search Console (F11)

1. Ir a **https://search.google.com/search-console**
2. Agregar propiedad con la URL del sitio
3. Verificar con el meta tag (descomentar la línea en `index.html` y reemplazar el código)
4. Enviar sitemap: `https://gv-ingenieria.netlify.app/sitemap.xml`
5. Monitorear indexación y errores en los primeros 7 días

---

## Checklist de lanzamiento

### ✅ Pre-deploy (completar antes de publicar)

- [ ] Reemplazar `G-XXXXXXXXXX` por el ID real de GA4 en `index.html`
- [ ] Generar favicons en realfavicongenerator.net y copiar a `assets/img/`
- [ ] Crear `og-image.png` (1200×630) y copiar a `assets/img/`
- [ ] Verificar que el formulario de Formspree funciona enviando un mensaje de prueba
- [ ] Verificar links de WhatsApp (+5493794658356) abriendo desde mobile
- [ ] Verificar links de redes sociales (Facebook e Instagram)
- [ ] Probar formulario de email (panel "✉️ Email") con una cuenta real
- [ ] Revisar el sitio en mobile (Chrome DevTools → toggle device toolbar)
- [ ] Revisar el sitio en Firefox, Chrome y Safari

### ✅ Post-deploy (completar después de publicar)

- [ ] Verificar sitio en Google Search Console
- [ ] Enviar sitemap.xml en Search Console
- [ ] Probar Open Graph en https://developers.facebook.com/tools/debug/ con la URL del sitio
- [ ] Probar Twitter Card en https://cards-dev.twitter.com/validator
- [ ] Correr Lighthouse (Chrome DevTools → Lighthouse) y registrar score inicial
- [ ] Activar notificaciones de Formspree para el email de GV Ingeniería

---

## Hosting recomendado para Argentina

| Opción | Precio | Ventajas |
|---|---|---|
| **Netlify** (recomendado) | Gratis | Deploy drag-and-drop, HTTPS automático, CDN global |
| **DonWeb** | ~$5 USD/mes | Hosting en Argentina, soporte en español |
| **Hostinger** | ~$3 USD/mes | Económico, panel sencillo |

---

## Créditos

- **Cliente:** GV Ingeniería — Ing. Civil Gastón Vidal (MP4513)
- **Desarrollo:** KAHIO Studio · Landing Pro
- **Metodología:** Auditoría Web Fases F1–F12
- **Versión:** 1.0 — Junio 2026

---

*Para consultas sobre el sitio, contactar a KAHIO Studio.*
