/* ============================================================
   GV INGENIERÍA — main.js
   F1: Extraído del inline del index.html original
   F4: Mejoras de UX — menú mobile, scroll reveal, GA4 eventos
   F7: Eventos personalizados de Google Analytics 4
   KAHIO Studio · Landing Pro · Fases F1–F12
   ============================================================ */

'use strict';

/* ---- F4 — MENÚ HAMBURGUESA MOBILE ----------------------- */
const hamburguesa = document.getElementById('nav-hamburguesa');
const navLinks    = document.getElementById('nav-links');

if (hamburguesa && navLinks) {
  hamburguesa.addEventListener('click', () => {
    const abierto = navLinks.classList.toggle('abierto');
    hamburguesa.classList.toggle('abierto', abierto);
    hamburguesa.setAttribute('aria-expanded', abierto);
  });

  // Cerrar al hacer click en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('abierto');
      hamburguesa.classList.remove('abierto');
      hamburguesa.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- F4 — HEADER CON SOMBRA AL SCROLL ------------------- */
const navEl = document.querySelector('nav');
if (navEl) {
  const onScroll = () => navEl.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---- F4 — AÑO DINÁMICO EN FOOTER ----------------------- */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- F4 — SCROLL SUAVE PARA ANCLAS INTERNAS ------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href')); // ← explota si href="#"
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---- F4 — INTERSECTION OBSERVER: ANIMACIONES .reveal ---- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}

/* ---- F4 — OCULTAR WA FLOTANTE EN SECCIÓN CONTACTO ------- */
const waFloat      = document.querySelector('.wa-float');
const contactoSec  = document.getElementById('contacto');

if (waFloat && contactoSec) {
  const waObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      waFloat.classList.toggle('oculto', entry.isIntersecting);
    });
  }, { threshold: 0.2 });
  waObserver.observe(contactoSec);
}

/* ---- TABS DE FORMULARIO (original, sin cambios) --------- */
function cambiarTab(tab, btn) {
  document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('activo'));
  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('activo'));
  document.getElementById('panel-' + tab).classList.add('activo');
  btn.classList.add('activo');
}

/* ---- VALIDACIONES (original, sin cambios) --------------- */
function validarEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }
function validarTelefono(t) {
  const soloDigitos = t.replace(/[\s\-\+\(\)]/g, '');
  return soloDigitos.length >= 8 && /^\d+$/.test(soloDigitos);
}

function marcarError(inputId, errId, hayError) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (!input || !err) return;
  input.classList.toggle('campo-error', hayError);
  input.classList.toggle('campo-ok', !hayError);
  err.classList.toggle('visible', hayError);
}

/* ---- BLUR EN TIEMPO REAL (original, sin cambios) --------- */
const waInputs = [
  { input: 'wa-nombre',   err: 'wa-err-nombre',   fn: v => v.length < 2 },
  { input: 'wa-telefono', err: 'wa-err-telefono', fn: v => !validarTelefono(v) },
  { input: 'wa-email',    err: 'wa-err-email',    fn: v => !validarEmail(v) },
];
const emInputs = [
  { input: 'em-nombre',   err: 'em-err-nombre',   fn: v => v.length < 2 },
  { input: 'em-telefono', err: 'em-err-telefono', fn: v => !validarTelefono(v) },
  { input: 'em-email',    err: 'em-err-email',    fn: v => !validarEmail(v) },
];

[...waInputs, ...emInputs].forEach(({ input, err, fn }) => {
  const el = document.getElementById(input);
  if (el) el.addEventListener('blur', function() { marcarError(input, err, fn(this.value.trim())); });
});

/* ---- F7 — HELPER GA4 ------------------------------------ */
function gaEvent(name, params = {}) {
  if (typeof gtag === 'function') gtag('event', name, params);
}

/* ---- ENVIAR WHATSAPP (original + F7 evento) ------------- */
function enviarWhatsApp() {
  const nombre      = document.getElementById('wa-nombre').value.trim();
  const telefono    = document.getElementById('wa-telefono').value.trim();
  const email       = document.getElementById('wa-email').value.trim();
  const consulta    = document.getElementById('wa-consulta').value;
  const descripcion = document.getElementById('wa-descripcion').value.trim();
  const aviso       = document.getElementById('wa-aviso');

  let hayErrores = false;
  if (nombre.length < 2)         { marcarError('wa-nombre',   'wa-err-nombre',   true); hayErrores = true; }
  if (!validarTelefono(telefono)) { marcarError('wa-telefono', 'wa-err-telefono', true); hayErrores = true; }
  if (!validarEmail(email))       { marcarError('wa-email',    'wa-err-email',    true); hayErrores = true; }

  if (hayErrores) {
    aviso.style.display = 'block';
    document.getElementById('wa-telefono').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  aviso.style.display = 'none';

  let mensaje = 'Hola, me comunico con GV Ingeniería desde su página web.';
  if (nombre)      mensaje += `\n\n*Nombre:* ${nombre}`;
  if (telefono)    mensaje += `\n*Teléfono:* ${telefono}`;
  if (email)       mensaje += `\n*Email:* ${email}`;
  if (consulta)    mensaje += `\n*Tipo de consulta:* ${consulta}`;
  if (descripcion) mensaje += `\n\n*Descripción:*\n${descripcion}`;

  // F7 — Evento GA4
  gaEvent('whatsapp_click', { method: 'form', consulta: consulta || 'sin_seleccionar' });

  window.open('https://wa.me/+5493794658356?text=' + encodeURIComponent(mensaje), '_blank');
}

/* ---- ENVIAR EMAIL / Formspree (original + F7 evento) ---- */
async function enviarEmail() {
  const nombre   = document.getElementById('em-nombre').value.trim();
  const telefono = document.getElementById('em-telefono').value.trim();
  const email    = document.getElementById('em-email').value.trim();
  const aviso    = document.getElementById('em-aviso');
  const exito    = document.getElementById('em-exito');

  let hayErrores = false;
  if (nombre.length < 2)         { marcarError('em-nombre',   'em-err-nombre',   true); hayErrores = true; }
  if (!validarTelefono(telefono)) { marcarError('em-telefono', 'em-err-telefono', true); hayErrores = true; }
  if (!validarEmail(email))       { marcarError('em-email',    'em-err-email',    true); hayErrores = true; }

  if (hayErrores) { aviso.style.display = 'block'; exito.style.display = 'none'; return; }
  aviso.style.display = 'none';

  const form = document.getElementById('form-email-el');
  const data = new FormData(form);

  try {
    const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      exito.style.display = 'block';
      form.reset();
      document.querySelectorAll('#panel-email .campo-ok').forEach(el => el.classList.remove('campo-ok'));
      // F7 — Evento GA4
      gaEvent('form_submit', { form_name: 'email_formspree' });
    } else {
      aviso.textContent = '⚠ Error al enviar. Intentá por WhatsApp o escribinos directamente.';
      aviso.style.display = 'block';
    }
  } catch {
    aviso.textContent = '⚠ Sin conexión. Intentá por WhatsApp.';
    aviso.style.display = 'block';
  }
}

/* ---- F7 — GA4: CTA buttons y links de contacto ---------- */
document.addEventListener('DOMContentLoaded', () => {

  // CTAs primarios
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      gaEvent('cta_click', { label: btn.textContent.trim().slice(0, 50) });
    });
  });

  // Links WhatsApp directos (href que contenga wa.me)
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      gaEvent('whatsapp_click', { method: 'direct_link' });
    });
  });

  // Links telefónicos
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      gaEvent('phone_call', { number: link.getAttribute('href') });
    });
  });

  // Exposición a sección de servicios
  const serviciosSec = document.getElementById('servicios');
  if (serviciosSec) {
    const svcObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gaEvent('section_view', { section: 'servicios' });
          svcObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    svcObserver.observe(serviciosSec);
  }
});

/* ---- Exportar funciones al scope global (usadas desde HTML) */
window.cambiarTab   = cambiarTab;
window.enviarWhatsApp = enviarWhatsApp;
window.enviarEmail  = enviarEmail;
