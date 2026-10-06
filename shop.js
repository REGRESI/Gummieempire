/* bärly – gemeinsame Shop-Logik für Startseite und Produktseiten
   Warenkorb (localStorage, seitenübergreifend), Navigation, Toast, Bild-Slots, Einblenden.
   Seiten-Skripte (home.js, pdp.js) rufen am Ende Shop.ready() auf. Keine Abhängigkeiten. */

(() => {
'use strict';

const { eur, PRODUCTS, byId, BUNDLES, PACK_INFO, ASSETS, planFor, unitPrice, pdpUrl } = window.Baerly;

const CREW = PRODUCTS.filter(p => p.launch);
const SHIPPING_FREE = 35;
const SHIPPING_COST = 3.90;   // Prototyp-Wert für Einmalkäufe unter 35 €
/* Farbwelt je Sorte: tint = Fläche, deep = Schrift, dot = Punkt, sky = Hero-Verlauf, ink = Hero-Schrift */
const THEME = {
  glow:   { tint: '#f6e1e6', deep: '#9c2f55', dot: '#e58aa3', sky: ['#fbe6ec', '#f3c9d6'], ink: '#3a1324', dark: false },
  flex:   { tint: '#e1e8f6', deep: '#1f3a8a', dot: '#7f9ee6', sky: ['#e6eefb', '#c6d6f3'], ink: '#101d45', dark: false },
  snoozy: { tint: '#e9e2f4', deep: '#43207f', dot: '#a68bd9', sky: ['#3a2d63', '#1d1736'], ink: '#f4efff', dark: true },
  daily:  { tint: '#f6edcc', deep: '#5f4100', dot: '#d9ad3c', sky: ['#fbf1d2', '#f2dc98'], ink: '#33240a', dark: false }
};
const PRICE_NOTE = `Alle Preise inkl. MwSt. Versand ${eur(SHIPPING_COST)}, ab ${eur(SHIPPING_FREE)} und im Abo versandkostenfrei.`;

/* ------------------------------------------------------------------ */
/* Helfer                                                              */
/* ------------------------------------------------------------------ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NAME = (p) => p.name.toUpperCase();
const theme = (id) => THEME[id] || THEME.glow;
const vars = (id) => `--tint:${theme(id).tint};--deep:${theme(id).deep};--dot:${theme(id).dot}`;
const perKg = (p, plan) => `${eur(unitPrice(p, plan))}/kg`;
const count = (p) => { const f = PACK_INFO[p.id]; return f.refill[0] * (30 / f.refill[1]); };
const memberSum = (b) => b.members.reduce((s, id) => s + byId[id].price, 0);
const sellable = (id) => (byId[id] && byId[id].launch) || (BUNDLES[id] && !BUNDLES[id].soon);
const members = (id) => BUNDLES[id] ? BUNDLES[id].members : [id];
/* Warnhinweise der enthaltenen Sorten (SNOOZY: Melatonin, nur für Erwachsene) */
const warnFor = (id) => members(id).map(m => byId[m].warn).filter(Boolean)[0] || '';
const adultFor = (id) => members(id).some(m => byId[m].adultOnly);
/* Pfade dürfen nur an Schrägstrichen umbrechen */
const pathHTML = (src) => esc(src).replace(/\//g, '/<wbr>');

document.documentElement.classList.add('js');

function store(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}

/* ------------------------------------------------------------------ */
/* Bild-Slots: echtes Bild, sobald die Datei existiert, sonst Platzhalter */
/* ------------------------------------------------------------------ */
function slotHTML(src, alt, fallback, cls = '') {
  return `<div class="slot ${cls}" data-src="${src}" data-alt="${esc(alt)}">
    <div class="slot-fallback">${fallback}</div>
    <span class="slot-tag" title="Platzhalter: Bild unter ${src} ablegen">${pathHTML(src)}</span>
  </div>`;
}
function hydrateSlots(root = document) {
  $$('.slot[data-src]:not([data-ready])', root).forEach(el => {
    el.dataset.ready = '1';
    const img = new Image();
    img.className = 'slot-img';
    img.alt = el.dataset.alt || '';
    img.decoding = 'async';
    img.onload = () => { el.prepend(img); el.classList.add('is-loaded'); };
    img.src = el.dataset.src;
  });
}

/* ------------------------------------------------------------------ */
/* Warenkorb                                                           */
/* ------------------------------------------------------------------ */
// Einträge aus älteren Prototyp-Ständen (Sorten, die es noch nicht gibt) fliegen raus
let cart = (store('baerly-cart') || []).filter(l => l && sellable(l.id) && l.qty > 0);
const drawer = $('#drawer');
const overlay = $('#overlay');
const itemInfo = (id) => byId[id] || BUNDLES[id];
const lineName = (it) => it.members ? it.name : `${NAME(it)} ${it.title}`;
const linePrice = (l) => planFor(itemInfo(l.id), l.plan).price * l.qty;
const saveCart = () => store('baerly-cart', cart);
const cartTotal = () => cart.reduce((s, l) => s + linePrice(l), 0);

function addToCart(id, plan = 'once', extra = {}) {
  if (!sellable(id)) return;
  const qty = Math.max(1, extra.qty || 1);
  const found = cart.find(l => l.id === id && l.plan === plan);
  if (found) { found.qty += qty; if (extra.every) found.every = extra.every; }
  else cart.push({ id, plan, qty, ...(extra.every ? { every: extra.every } : {}) });
  saveCart();
  renderCart();
  const btn = $('#cartOpen');
  btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
  toast(`${lineName(itemInfo(id))} liegt im Warenkorb${plan === 'abo' ? ' (Abo)' : ''}`);
}

function lineImage(id) {
  return members(id).map(x => `<img src="${ASSETS(x).front}" alt="">`).join('');
}

function renderCart() {
  const n = cart.reduce((s, l) => s + l.qty, 0);
  $('#cartCount').textContent = n;
  $('#cartCount').hidden = n === 0;
  $('#cartOpen').setAttribute('aria-label', `Warenkorb öffnen, ${n} Artikel`);
  const total = cartTotal();
  $('#cartTotal').textContent = eur(total);
  const hasAbo = cart.some(l => l.plan === 'abo');
  const missing = Math.max(0, SHIPPING_FREE - total);
  const free = hasAbo || missing === 0;
  $('#ship').innerHTML = (!cart.length
    ? `Versand ${eur(SHIPPING_COST)}, ab ${eur(SHIPPING_FREE)} und im Abo versandkostenfrei.`
    : free ? 'Versand: kostenlos.'
    : `Versand: ${eur(SHIPPING_COST)}. Noch ${eur(missing)} bis zum kostenlosen Versand, im Abo immer kostenlos.`) +
    `<div class="ship-bar"><span style="width:${free && cart.length ? 100 : Math.min(100, total / SHIPPING_FREE * 100)}%"></span></div>`;

  const items = $('#drawerItems');
  if (!cart.length) {
    items.innerHTML = '<div class="drawer-empty"><b>Noch leer.</b>Such dir eine Sorte aus oder starte mit dem Bären-Finder.</div>';
    return;
  }
  items.innerHTML = cart.map((l, i) => {
    const it = itemInfo(l.id);
    const pl = planFor(it, l.plan);
    const first = it.members ? it.members[0] : it.id;
    const canToggle = (l.plan === 'abo' || l.plan === 'once');
    const aboSave = Math.floor((1 - planFor(it, 'abo').price / planFor(it, 'once').price) * 100);
    const warn = warnFor(l.id);
    const name = it.members ? esc(lineName(it)) : `<a href="${pdpUrl(it.id)}">${esc(lineName(it))}</a>`;
    return `<div class="line" style="${vars(first)}">
      <div class="line-img">${lineImage(l.id)}</div>
      <div>
        <p class="line-name">${name}</p>
        <p class="line-meta">${pl.label}${pl.sub ? ' · ' + pl.sub : ''}${l.plan === 'abo' && !it.members ? ` · alle ${l.every || 30} Tage` : ''}</p>
        ${warn ? `<p class="line-warn">${it.members ? 'SNOOZY: ' : ''}${warn}</p>` : ''}
        ${canToggle ? `<div class="line-plan" role="group" aria-label="Kaufart für ${esc(lineName(it))}">
          <button type="button" data-plan="${i}" data-val="abo" aria-pressed="${l.plan === 'abo'}">Abo −${aboSave} %</button>
          <button type="button" data-plan="${i}" data-val="once" aria-pressed="${l.plan === 'once'}">Einmal</button>
        </div>` : ''}
      </div>
      <div class="line-right">
        <span class="line-price">${eur(linePrice(l))}</span>
        <div class="qty">
          <button type="button" data-qty="${i}" data-d="-1" aria-label="${esc(lineName(it))}: eins weniger">−</button>
          <span><span class="sr-only">Menge </span>${l.qty}</span>
          <button type="button" data-qty="${i}" data-d="1" aria-label="${esc(lineName(it))}: eins mehr">+</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

$('#drawerItems').addEventListener('click', e => {
  let refocus = null;
  const q = e.target.closest('[data-qty]');
  if (q) {
    const l = cart[+q.dataset.qty];
    l.qty += +q.dataset.d;
    if (l.qty <= 0) cart.splice(+q.dataset.qty, 1);
    else refocus = `[data-qty="${q.dataset.qty}"][data-d="${q.dataset.d}"]`;
  }
  const pl = e.target.closest('[data-plan]');
  if (pl) {
    const l = cart[+pl.dataset.plan];
    const other = cart.find(x => x !== l && x.id === l.id && x.plan === pl.dataset.val);
    if (other) { other.qty += l.qty; cart.splice(cart.indexOf(l), 1); }
    else { l.plan = pl.dataset.val; refocus = `[data-plan="${pl.dataset.plan}"][data-val="${pl.dataset.val}"]`; }
  }
  if (q || pl) {
    saveCart();
    renderCart();
    $('#cartStatus').textContent = `Warenkorb aktualisiert. Zwischensumme ${eur(cartTotal())}.`;
    // Die Knöpfe wurden neu gezeichnet: Fokus zurück auf denselben Knopf, sonst auf „Schließen“
    ((refocus && $(refocus, $('#drawerItems'))) || $('#cartClose')).focus();
  }
});

/* Solange der Warenkorb offen ist, ist der Rest der Seite inert */
let lastFocus = null;
const behind = () => ['.skip', '.announce', '.nav', 'main', '.footer', '.sticky-buy'].map(s => $(s)).filter(Boolean);
function openCart() {
  lastFocus = document.activeElement;
  $('#toast').classList.remove('show');
  overlay.hidden = false;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  behind().forEach(el => { el.inert = true; });
  document.dispatchEvent(new CustomEvent('baerly:overlay', { detail: true }));
  // Erst fokussieren, wenn der Drawer sichtbar ist
  requestAnimationFrame(() => $('#cartClose').focus());
}
function closeCart() {
  overlay.hidden = true;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  behind().forEach(el => { el.inert = false; });
  document.dispatchEvent(new CustomEvent('baerly:overlay', { detail: false }));
  lastFocus?.focus?.();
}
$('#cartOpen').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });
$('#checkout').addEventListener('click', () => {
  $('#checkoutNote').textContent = cart.length
    ? 'Prototyp: Hier geht es später zum Shopify-Checkout. Dein Warenkorb bleibt gespeichert.'
    : 'Dein Warenkorb ist noch leer.';
});
/* Warenkorb in einem anderen Tab geändert */
addEventListener('storage', e => {
  if (e.key !== 'baerly-cart') return;
  cart = (store('baerly-cart') || []).filter(l => l && sellable(l.id) && l.qty > 0);
  renderCart();
});

/* ------------------------------------------------------------------ */
/* Toast, Klicks, Formular, Navigation                                 */
/* ------------------------------------------------------------------ */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* Kurzes „Hinzugefügt“ auf dem Knopf, der geklickt wurde */
function confirmButton(btn) {
  if (btn.classList.contains('is-added')) return;
  const label = btn.innerHTML;
  btn.classList.add('is-added');
  btn.textContent = 'Hinzugefügt';
  setTimeout(() => { btn.classList.remove('is-added'); btn.innerHTML = label; }, 1500);
}

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add, add.dataset.plan || 'once');
    confirmButton(add);
    return;
  }
  const bundle = e.target.closest('[data-bundle]');
  if (bundle) { addToCart(bundle.dataset.bundle, bundle.dataset.plan || 'once'); confirmButton(bundle); }
});

const signup = $('#signup');
if (signup) {
  signup.addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#signupEmail').value.trim();
    const msg = $('#signupMsg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.'; $('#signupEmail').focus(); return; }
    if (!$('#signupConsent').checked) { msg.textContent = 'Bitte bestätige, dass wir dir E-Mails schicken dürfen.'; $('#signupConsent').focus(); return; }
    msg.textContent = 'Du bist dabei. Wir melden uns vor dem Launch. (Prototyp: wird noch nicht gespeichert.)';
    e.target.reset();
  });
}

const nav = $('#nav');
addEventListener('scroll', () => nav.classList.toggle('is-scrolled', scrollY > 8), { passive: true });
const menuBtn = $('#menuBtn');
const navLinks = $('#navLinks');
const setMenu = (open, focusFirst = false) => {
  navLinks.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  if (open && focusFirst) $('a', navLinks).focus();
};
menuBtn.addEventListener('click', e => setMenu(!navLinks.classList.contains('open'), e.detail === 0));
navLinks.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
nav.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
});
nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) setMenu(false); });

/* Einblenden beim Scrollen */
function initReveal(root = document) {
  const els = $$('[data-reveal]:not(.in)', root);
  if (reduced || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
}

/* Zahlen und Balken erst animieren, wenn sie ins Bild kommen */
function whenVisible(el, fn, margin = '0px 0px -12% 0px') {
  if (!('IntersectionObserver' in window)) { fn(); return; }
  const io = new IntersectionObserver(entries => {
    if (entries.some(en => en.isIntersecting)) { io.disconnect(); fn(); }
  }, { rootMargin: margin });
  io.observe(el);
}

function ready() {
  renderCart();
  saveCart();
  hydrateSlots();
  initReveal();
}

window.Shop = {
  CREW, THEME, PRICE_NOTE, SHIPPING_FREE, SHIPPING_COST,
  $, $$, esc, reduced, NAME, theme, vars, perKg, count, memberSum, sellable, members, warnFor, adultFor, pathHTML,
  store, slotHTML, hydrateSlots, addToCart, openCart, toast, initReveal, whenVisible, ready
};
})();
