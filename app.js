/* bärly – Shop-Prototyp
   Alles läuft im Browser: Hero-Karussell, Bären-Finder, Warenkorb (localStorage).
   Produktdaten und Bären-Zeichnung kommen aus brand.js. */

(() => {
'use strict';

const { BRAND, eur, aboPrice, PRODUCTS, byId, BUNDLES, bear, packs } = window.Baerly;
const SHIPPING_FREE = 35;

const HERO = ['mags', 'sunny', 'glow', 'flex', 'brainy', 'zap', 'kiko'].map(id => byId[id]);

const GOALS = [
  { id: 'sleep',  label: 'Besser abschalten',   c: '#2f6bff', ids: ['mags'] },
  { id: 'beauty', label: 'Haut, Haare, Nägel',  c: '#ff4fa3', ids: ['glow', 'dew'] },
  { id: 'focus',  label: 'Fokus',               c: '#10b39a', ids: ['brainy'] },
  { id: 'energy', label: 'Energie ohne Kaffee', c: '#ffc21a', ids: ['zap'] },
  { id: 'sport',  label: 'Training',            c: '#e8263b', ids: ['flex', 'buff'] },
  { id: 'immune', label: 'Immunsystem',         c: '#3fbf5a', ids: ['shield', 'sunny'] },
  { id: 'kids',   label: 'Für mein Kind',       c: '#8bd12e', ids: ['kiko', 'splash', 'juno'] }
];

/* Höchstmengen-Empfehlungen des BfR für Nahrungsergänzungsmittel (pro Tag) */
const LIMITS = {
  zinc: { label: 'Zink', unit: 'mg', max: 6.5 },
  vitD: { label: 'Vitamin D', unit: 'µg', max: 20 }
};

const FILTERS = [
  { id: 'all', label: 'Alle' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'balance', label: 'Balance' },
  { id: 'focus', label: 'Fokus & Energie' },
  { id: 'sport', label: 'Sport' },
  { id: 'kids', label: 'Kids' }
];

/* ------------------------------------------------------------------ */
/* Helfer                                                              */
/* ------------------------------------------------------------------ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

function store(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}

/* ------------------------------------------------------------------ */
/* Hero-Karussell                                                      */
/* ------------------------------------------------------------------ */
const hero = $('#hero');
const stage = $('#heroStage');
const bubble = $('#heroBubble');
const copy = $('#heroCopy');
const facts = $('#heroFacts');
const word = $('#heroWord');
const thumbs = $('#heroThumbs');
const HERO_MS = 6500;
let cur = 0;
let busy = false;

function setTheme(p) {
  root.style.setProperty('--hero-bg', p.tint);
  root.style.setProperty('--hero-color', p.color);
  root.style.setProperty('--hero-deep', p.dark);
}

function copyHTML(p, i) {
  const num = String(i + 1).padStart(2, '0');
  return `
    <p class="hero-tag"><i></i>${num} / ${String(HERO.length).padStart(2, '0')} · ${p.title}</p>
    <h1 class="hero-title">${p.headline}</h1>
    <p class="hero-story">${p.story}</p>
    <div class="hero-ctas">
      <button class="btn btn-ink" type="button" data-add="${p.id}">In den Warenkorb · ${eur(p.price)}</button>
      <button class="btn btn-ghost" type="button" data-detail="${p.id}">Mehr über ${p.name}</button>
    </div>`;
}
function factsHTML(p) {
  // Dosierung steht schon im Kopf des Etiketts
  return p.facts.filter(([, s]) => !/^(pro Tag|pro Portion|bei Bedarf)$/.test(s)).map(([b, s]) => `<li><span>${s}</span><b>${b}</b></li>`).join('');
}
function wordHTML(p) {
  return [...p.word].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join('');
}

function makeHeroBear(p) {
  const el = document.createElement('div');
  el.className = 'hero-bear';
  el.innerHTML = `<div class="bear-float"><div class="bear-tilt">${bear(p)}</div></div>`;
  stage.insertBefore(el, bubble);
  return el;
}

function showBubble(p) {
  bubble.textContent = p.hello;
  bubble.classList.add('show');
}

function swap(el, html) {
  if (reduced) { el.innerHTML = html; return; }
  el.classList.remove('swap-in');
  el.classList.add('swap-out');
  setTimeout(() => {
    el.innerHTML = html;
    el.classList.remove('swap-out');
    void el.offsetWidth;
    el.classList.add('swap-in');
  }, 280);
}

function swapWord(p) {
  word.innerHTML = wordHTML(p);
  if (reduced) return;
  $$('span', word).forEach((s, i) => s.animate(
    [{ transform: 'translateY(60%) rotate(8deg)', opacity: 0 }, { transform: 'none', opacity: 1 }],
    { duration: 700, delay: 260 + i * 45, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' }
  ));
}

function renderThumbs() {
  thumbs.innerHTML = HERO.map((p, i) =>
    `<button class="thumb" type="button" role="tab" aria-selected="${i === cur}" aria-label="${p.name}: ${p.title}" data-i="${i}" style="--dur:${HERO_MS}ms">
      ${bear(p, { face: false })}<span class="thumb-bar"></span></button>`).join('');
}
function updateThumbs() {
  $$('.thumb', thumbs).forEach((t, i) => t.setAttribute('aria-selected', String(i === cur)));
}

function goTo(i, dir) {
  i = (i + HERO.length) % HERO.length;
  if (busy || i === cur) return;
  busy = true;
  if (dir === undefined) dir = i > cur ? 1 : -1;
  const p = HERO[i];
  const out = $('.hero-bear:not(.leaving)', stage);
  out.classList.add('leaving');
  bubble.classList.remove('show');
  const inc = makeHeroBear(p);

  cur = i;
  updateThumbs();
  setTheme(p);
  swap(copy, copyHTML(p, i));
  swap(facts, factsHTML(p));
  $('#heroServing').textContent = p.serving;
  swapWord(p);

  const done = () => { busy = false; showBubble(p); };
  const safety = setTimeout(done, 1600);

  if (reduced) {
    out.remove();
    clearTimeout(safety); done();
    return;
  }

  // Alter Bär fliegt nach oben links raus, neuer kommt von unten rechts
  const exitTo = dir > 0
    ? 'translate(-75%, -55%) rotate(-38deg) scale(.45)'
    : 'translate(80%, 70%) rotate(38deg) scale(.45)';
  out.animate(
    [{ transform: 'none', opacity: 1 }, { transform: exitTo, opacity: 0 }],
    { duration: 620, easing: 'cubic-bezier(.55,0,.8,.3)', fill: 'forwards' }
  ).finished.then(() => out.remove()).catch(() => out.remove());

  const enterFrom = dir > 0
    ? 'translate(115%, 105%) rotate(55deg) scale(.4)'
    : 'translate(-110%, -95%) rotate(-55deg) scale(.4)';
  inc.animate([
    { transform: enterFrom, opacity: 0 },
    { opacity: 1, offset: .2 },
    { transform: 'translate(0,0) rotate(-7deg) scale(1.07)', offset: .66 },
    { transform: 'translate(0,0) rotate(3deg) scale(.97)', offset: .84 },
    { transform: 'none', opacity: 1 }
  ], { duration: 1150, delay: 160, easing: 'cubic-bezier(.22,.9,.3,1)', fill: 'backwards' })
    .finished.then(() => { clearTimeout(safety); done(); }).catch(() => {});
}

function initHero() {
  const p = HERO[0];
  setTheme(p);
  makeHeroBear(p);
  copy.innerHTML = copyHTML(p, 0);
  facts.innerHTML = factsHTML(p);
  $('#heroServing').textContent = p.serving;
  word.innerHTML = wordHTML(p);
  renderThumbs();
  setTimeout(() => showBubble(p), 600);

  if (reduced) hero.classList.add('paused');

  thumbs.addEventListener('click', e => {
    const t = e.target.closest('.thumb');
    if (t) goTo(+t.dataset.i);
  });
  thumbs.addEventListener('animationend', e => {
    if (e.animationName === 'progress' && !reduced) goTo(cur + 1, 1);
  });
  $('#heroPrev').addEventListener('click', () => goTo(cur - 1, -1));
  $('#heroNext').addEventListener('click', () => goTo(cur + 1, 1));

  // Pause, wenn jemand mit dem Bären spielt oder liest
  const pause = () => hero.classList.add('paused');
  const resume = () => { if (!reduced) hero.classList.remove('paused'); };
  [stage, copy].forEach(el => {
    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', resume);
  });
  hero.addEventListener('focusin', pause);
  hero.addEventListener('focusout', resume);
  new IntersectionObserver(([en]) => en.isIntersecting ? resume() : pause(), { threshold: .3 }).observe(hero);

  // Bär folgt der Maus ein bisschen
  hero.addEventListener('pointermove', e => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = stage.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    const t = $('.hero-bear:not(.leaving) .bear-tilt', stage);
    if (!t) return;
    t.style.setProperty('--px', (dx * 18).toFixed(1) + 'px');
    t.style.setProperty('--py', (dy * 12).toFixed(1) + 'px');
    t.style.setProperty('--ry', (dx * 22).toFixed(1) + 'deg');
    t.style.setProperty('--rx', (-dy * 14).toFixed(1) + 'deg');
  });

  // Wischen und Antippen
  let sx = 0, sy = 0, down = false;
  stage.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sy = e.clientY; });
  stage.addEventListener('pointerup', e => {
    if (!down) return;
    down = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      goTo(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    } else if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      const t = $('.hero-bear:not(.leaving) .bear-tilt', stage);
      if (t) { t.classList.remove('squish'); void t.offsetWidth; t.classList.add('squish'); }
      showBubble(HERO[cur]);
    }
  });
  hero.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') goTo(cur + 1, 1);
    if (e.key === 'ArrowLeft') goTo(cur - 1, -1);
  });
}

/* ------------------------------------------------------------------ */
/* Shop                                                                */
/* ------------------------------------------------------------------ */
const grid = $('#productGrid');
const filtersEl = $('#filters');
let activeFilter = store('baerly-filter') || 'all';

function cardHTML(p) {
  const badges = [
    p.line === 'kids' ? '<span class="badge badge-dark">Kids</span>' : '',
    p.sour ? '<span class="badge">Sauer</span>' : '',
    p.adultOnly ? '<span class="badge">18+</span>' : '',
    !p.vegan ? '<span class="badge">nicht vegan</span>' : ''
  ].join('');
  return `<article class="card" data-cat="${p.cat}" style="--tint:${p.tint};--c:${p.color}">
    <button class="card-visual" type="button" data-detail="${p.id}" aria-label="Details zu ${p.name}">
      <span class="shot">
        <span class="shot-pack">${packs.can(p)}</span>
        <span class="shot-bear">${bear(p, { label: false })}</span>
      </span>
      <span class="badges">${badges}</span>
    </button>
    <div class="card-body">
      <div class="card-top"><h3 class="card-name">${p.name}</h3><span class="card-price">${eur(p.price)}</span></div>
      <p class="card-sub">${p.title}</p>
      <p class="card-flavor">${p.flavor} · ${p.count} Stück</p>
    </div>
    <div class="card-actions">
      <button class="btn btn-ink add-btn" type="button" data-add="${p.id}">In den Warenkorb</button>
    </div>
  </article>`;
}

function renderShop() {
  grid.innerHTML = PRODUCTS.map(cardHTML).join('');
  filtersEl.innerHTML = FILTERS.map(f =>
    `<button class="filter" type="button" role="tab" data-filter="${f.id}" aria-selected="${f.id === activeFilter}">${f.label}</button>`).join('');
  applyFilter();
  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('.filter');
    if (!b) return;
    activeFilter = b.dataset.filter;
    store('baerly-filter', activeFilter);
    $$('.filter', filtersEl).forEach(x => x.setAttribute('aria-selected', String(x === b)));
    applyFilter(true);
  });
}
function applyFilter(animate) {
  $$('.card', grid).forEach((c, i) => {
    const show = activeFilter === 'all' || c.dataset.cat === activeFilter;
    c.classList.toggle('is-hidden', !show);
    if (show && animate && !reduced) {
      c.animate([{ opacity: 0, transform: 'translateY(24px) scale(.96)' }, { opacity: 1, transform: 'none' }],
        { duration: 450, delay: i * 25, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
    }
  });
}

/* ------------------------------------------------------------------ */
/* Bären-Finder                                                        */
/* ------------------------------------------------------------------ */
const chips = $('#goalChips');
const result = $('#finderResult');
let goals = new Set(store('baerly-goals') || ['beauty', 'sleep']);

function renderChips() {
  chips.innerHTML = GOALS.map(g =>
    `<button class="chip" type="button" data-goal="${g.id}" aria-pressed="${goals.has(g.id)}" style="--c:${g.c}">
      <span class="chip-dot"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.5l2.6 2.5L11 4" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${g.label}</button>`).join('');
}

function renderResult() {
  const ids = [...new Set(GOALS.filter(g => goals.has(g.id)).flatMap(g => g.ids))];
  if (!ids.length) {
    result.innerHTML = `<p class="finder-empty">Wähl oben mindestens ein Ziel. Dann stellt sich hier deine Bande auf.</p>`;
    return;
  }
  const items = ids.map(id => byId[id]);
  const total = items.reduce((s, p) => s + p.price, 0);
  const adult = items.filter(p => p.line === 'adult');

  // Nährstoffe im Stack zusammenrechnen und mit BfR-Höchstmengen vergleichen
  const warnings = Object.entries(LIMITS).map(([k, l]) => {
    const sum = adult.reduce((s, p) => s + (p.doses[k] || 0), 0);
    if (sum <= l.max) return '';
    const who = adult.filter(p => p.doses[k]).map(p => p.name).join(' und ');
    return `<p class="warn"><b>${l.label}: ${sum.toLocaleString('de-DE')} ${l.unit} im Stack</b>Das BfR empfiehlt aus Nahrungsergänzung höchstens ${l.max.toLocaleString('de-DE')} ${l.unit} pro Tag. Nimm ${who} abwechselnd statt am selben Tag.</p>`;
  }).join('');
  const mixed = adult.length && items.some(p => p.line === 'kids')
    ? `<p class="warn"><b>Kids-Bären gehören in die Brotdose</b>Kiko, Splash und Juno sind für dein Kind dosiert und zählen nicht zu deinem eigenen Stack.</p>` : '';

  result.innerHTML = `
    <div class="finder-lineup">${items.map(p =>
      `<div class="finder-bear"><button type="button" data-detail="${p.id}" aria-label="Details zu ${p.name}">${bear(p)}</button><span>${p.name}</span></div>`).join('')}</div>
    <div class="finder-summary">
      <h3>${items.length === 1 ? 'Dein Bär' : `Deine Bande: ${items.length} Bären`}</h3>
      <div class="finder-price"><strong>${eur(aboPrice(total))}</strong><span>pro Monat im Abo, statt ${eur(total)}</span></div>
      ${warnings}${mixed}
      <button class="btn btn-ink" type="button" data-add-many="${ids.join(',')}">Im Abo in den Warenkorb</button>
    </div>`;
}

function initFinder() {
  renderChips();
  renderResult();
  chips.addEventListener('click', e => {
    const c = e.target.closest('.chip');
    if (!c) return;
    const g = c.dataset.goal;
    goals.has(g) ? goals.delete(g) : goals.add(g);
    c.setAttribute('aria-pressed', String(goals.has(g)));
    store('baerly-goals', [...goals]);
    renderResult();
  });
}

/* ------------------------------------------------------------------ */
/* Beauty + Kids                                                       */
/* ------------------------------------------------------------------ */
function initBeauty() {
  $('#beautyDuo').innerHTML =
    `<div class="duo duo-1"><button type="button" data-detail="glow" aria-label="Details zu Glow">${bear(byId.glow)}</button></div>
     <div class="duo duo-2"><button type="button" data-detail="dew" aria-label="Details zu Dew">${bear(byId.dew)}</button></div>`;

  const fill = $('#timelineFill');
  const sec = $('#beauty');
  const onScroll = () => {
    const r = sec.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight * .2)));
    fill.style.setProperty('--t', (0.08 + t * 0.92).toFixed(3));
  };
  if (!reduced) {
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

function initKids() {
  const kids = PRODUCTS.filter(p => p.line === 'kids');
  $('#kidsStage').innerHTML = kids.map(p =>
    `<button class="kid" type="button" data-detail="${p.id}" aria-label="${p.name}: ${p.title}">
      <span class="kid-bubble">${p.hello}</span>
      <span class="bear-wrap">${bear(p)}</span>
      <span class="kid-name">${p.name}</span>
      <span class="kid-power">${p.power}</span>
    </button>`).join('');
}

/* ------------------------------------------------------------------ */
/* Produkt-Modal                                                       */
/* ------------------------------------------------------------------ */
const modal = $('#modal');
const modalInner = $('#modalInner');

function openDetail(id) {
  const p = byId[id];
  if (!p) return;
  modalInner.style.setProperty('--tint', p.tint);
  modalInner.innerHTML = `
    <div class="modal-visual">
      <button class="round-btn" type="button" data-close aria-label="Schließen">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
      </button>
      <span class="bear-wrap">${bear(p)}</span>
    </div>
    <div class="modal-body">
      <div>
        <p class="eyebrow">${p.line === 'kids' ? 'bärly kids · 4–12 Jahre' : p.title}</p>
        <h2>${p.name}</h2>
      </div>
      <p class="modal-sub">${p.flavor} · ${p.count} Gummies · ${p.serving}${p.vegan ? ' · vegan' : ' · nicht vegan'}</p>
      <p class="modal-story">${p.story}</p>
      <table class="nutri">
        <caption>Pro Tagesportion</caption>
        <thead><tr><th scope="col">Nährstoff</th><th scope="col">Menge</th><th scope="col">% NRV*</th></tr></thead>
        <tbody>${p.nutrients.map(([n, a, r]) => `<tr><th scope="row">${n}</th><td>${a}</td><td>${r}</td></tr>`).join('')}</tbody>
      </table>
      <p class="claim"><b>Was wir sagen dürfen</b>${p.claim}</p>
      ${p.warn ? `<p class="modal-warn">${p.warn}</p>` : ''}
      <div class="plan-pick" role="radiogroup" aria-label="Kaufart">
        <label class="plan-opt"><span><input type="radio" name="plan" id="planAbo" value="abo" checked>Abo<small>alle 30 Tage</small><em class="save">−20 %</em></span><strong>${eur(aboPrice(p.price))}</strong></label>
        <label class="plan-opt"><span><input type="radio" name="plan" id="planOnce" value="once">Einmalkauf</span><strong>${eur(p.price)}</strong></label>
      </div>
      <button class="btn btn-ink btn-block" type="button" data-modal-add="${p.id}">In den Warenkorb</button>
      <p class="footnote">* NRV = Nährstoffbezugswert für Erwachsene laut EU-Verordnung 1169/2011.</p>
    </div>`;
  if (!modal.open) modal.showModal();
}
modal.addEventListener('click', e => {
  if (e.target === modal || e.target.closest('[data-close]')) modal.close();
  const add = e.target.closest('[data-modal-add]');
  if (add) {
    const plan = $('input[name="plan"]:checked', modal)?.value || 'once';
    addToCart(add.dataset.modalAdd, plan, add);
    modal.close();
  }
});

/* ------------------------------------------------------------------ */
/* Warenkorb                                                           */
/* ------------------------------------------------------------------ */
let cart = store('baerly-cart') || [];
const drawer = $('#drawer');
const overlay = $('#overlay');

function itemInfo(id) {
  if (byId[id]) return byId[id];
  return BUNDLES[id];
}
function linePrice(l) {
  const it = itemInfo(l.id);
  return (l.plan === 'abo' ? aboPrice(it.price) : it.price) * l.qty;
}
function saveCart() { store('baerly-cart', cart); }

function addToCart(id, plan = 'once', fromEl) {
  const it = itemInfo(id);
  if (!it) return;
  const found = cart.find(l => l.id === id && l.plan === plan);
  found ? found.qty++ : cart.push({ id, plan, qty: 1 });
  saveCart();
  renderCart();
  flyToCart(id, fromEl);
  toast(`${it.name} liegt im Warenkorb`);
}

function miniBear(id) {
  const b = BUNDLES[id];
  if (b) return byId[b.members[0]];
  return byId[id];
}

function flyToCart(id, fromEl) {
  const target = $('#cartOpen');
  target.classList.remove('bump'); void target.offsetWidth; target.classList.add('bump');
  if (reduced || !fromEl) return;
  const a = fromEl.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const fly = document.createElement('div');
  fly.className = 'flyer';
  fly.innerHTML = bear(miniBear(id), { face: true });
  fly.style.left = (a.left + a.width / 2 - 28) + 'px';
  fly.style.top = (a.top + a.height / 2 - 32) + 'px';
  document.body.append(fly);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  fly.animate([
    { transform: 'translate(0,0) scale(1) rotate(0)' },
    { transform: `translate(${dx * .5}px, ${dy * .5 - 120}px) scale(1.2) rotate(-200deg)`, offset: .5 },
    { transform: `translate(${dx}px, ${dy}px) scale(.3) rotate(-360deg)`, opacity: .6 }
  ], { duration: 800, easing: 'cubic-bezier(.45,0,.25,1)' }).finished.then(() => fly.remove());
}

function renderCart() {
  const count = cart.reduce((s, l) => s + l.qty, 0);
  $('#cartCount').textContent = count;
  const total = cart.reduce((s, l) => s + linePrice(l), 0);
  $('#cartTotal').textContent = eur(total);

  const missing = Math.max(0, SHIPPING_FREE - total);
  $('#ship').innerHTML = (missing > 0
    ? `Noch <b>${eur(missing)}</b> bis zum Gratisversand.`
    : `<b>Gratisversand ist drin.</b> Die Bären reisen kostenlos.`) +
    `<div class="ship-bar"><span style="width:${Math.min(100, total / SHIPPING_FREE * 100)}%"></span></div>`;

  const items = $('#drawerItems');
  if (!cart.length) {
    items.innerHTML = `<div class="drawer-empty"><span class="bear-wrap">${bear(byId.mags)}</span>Noch leer hier. Mags schläft schon.</div>`;
    return;
  }
  items.innerHTML = cart.map((l, i) => {
    const it = itemInfo(l.id);
    const mb = miniBear(l.id);
    return `<div class="line" style="--tint:${it.tint}">
      <div class="line-img">${bear(mb)}</div>
      <div>
        <p class="line-name">${it.name}</p>
        <p class="line-meta">${it.title}</p>
        ${BUNDLES[l.id] ? '' : `<div class="line-plan" role="group" aria-label="Kaufart">
          <button type="button" data-plan="${i}" data-val="abo" aria-pressed="${l.plan === 'abo'}">Abo −20 %</button>
          <button type="button" data-plan="${i}" data-val="once" aria-pressed="${l.plan === 'once'}">Einmal</button>
        </div>`}
      </div>
      <div class="line-right">
        <span class="line-price">${eur(linePrice(l))}</span>
        <div class="qty">
          <button type="button" data-qty="${i}" data-d="-1" aria-label="Eins weniger">−</button>
          <span>${l.qty}</span>
          <button type="button" data-qty="${i}" data-d="1" aria-label="Eins mehr">+</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

$('#drawerItems').addEventListener('click', e => {
  const q = e.target.closest('[data-qty]');
  if (q) {
    const l = cart[+q.dataset.qty];
    l.qty += +q.dataset.d;
    if (l.qty <= 0) cart.splice(+q.dataset.qty, 1);
  }
  const pl = e.target.closest('[data-plan]');
  if (pl) {
    const l = cart[+pl.dataset.plan];
    const other = cart.find(x => x !== l && x.id === l.id && x.plan === pl.dataset.val);
    if (other) { other.qty += l.qty; cart.splice(cart.indexOf(l), 1); }
    else l.plan = pl.dataset.val;
  }
  if (q || pl) { saveCart(); renderCart(); }
});

let lastFocus = null;
function openCart() {
  lastFocus = document.activeElement;
  overlay.hidden = false;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  $('#cartClose').focus();
}
function closeCart() {
  overlay.hidden = true;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  lastFocus?.focus?.();
}
$('#cartOpen').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });
$('#checkout').addEventListener('click', () => {
  const n = $('#checkoutNote');
  n.textContent = cart.length
    ? 'Prototyp: Hier geht es später zum Shopify-Checkout. Dein Warenkorb bleibt gespeichert.'
    : 'Dein Warenkorb ist noch leer. Such dir erst einen Bären aus.';
});

/* ------------------------------------------------------------------ */
/* Toast, Delegation, Kleinkram                                        */
/* ------------------------------------------------------------------ */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add, 'once', add);
    add.classList.add('added');
    const label = add.textContent;
    add.textContent = 'Drin!';
    setTimeout(() => { add.classList.remove('added'); add.textContent = label; }, 1400);
    return;
  }
  const many = e.target.closest('[data-add-many]');
  if (many) {
    many.dataset.addMany.split(',').forEach((id, i) => setTimeout(() => addToCart(id, 'abo', many), i * 140));
    return;
  }
  const bundle = e.target.closest('[data-bundle]');
  if (bundle) { addToCart(bundle.dataset.bundle, 'once', bundle); return; }
  const det = e.target.closest('[data-detail]');
  if (det) openDetail(det.dataset.detail);
});

$('#signup').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#signupEmail').value.trim();
  const msg = $('#signupMsg');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.';
    return;
  }
  msg.textContent = 'Du stehst auf der Liste. (Prototyp: Die Anmeldung wird noch nicht gespeichert.)';
  e.target.reset();
});

const nav = $('.nav');
addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', scrollY > hero.offsetTop + hero.offsetHeight - 90);
}, { passive: true });

/* Ankündigungsleiste: auf dem Handy eine Nachricht nach der anderen */
const annItems = $$('#announce li');
let ann = 0;
setInterval(() => {
  if (document.hidden) return;
  annItems[ann].classList.remove('is-active');
  ann = (ann + 1) % annItems.length;
  annItems[ann].classList.add('is-active');
}, 3800);

/* Nährstoff-Ticker: Gruppe so oft füllen, dass sie breiter als der Bildschirm ist,
   dann einmal klonen. So entsteht nie eine Lücke, egal wie breit das Fenster ist. */
function initTicker() {
  const track = $('#tickerTrack');
  const group = $('.ticker-group', track);
  const items = group.innerHTML;
  const build = () => {
    $$('.ticker-group', track).slice(1).forEach(g => g.remove());
    group.innerHTML = items;
    while (group.scrollWidth < innerWidth + 200) group.insertAdjacentHTML('beforeend', items);
    const clone = group.cloneNode(true);
    track.append(clone);
    // konstantes Tempo: ca. 90 px pro Sekunde
    track.style.setProperty('--ticker-dur', (group.scrollWidth / 90).toFixed(1) + 's');
  };
  build();
  let w = innerWidth;
  addEventListener('resize', () => { if (Math.abs(innerWidth - w) > 80) { w = innerWidth; build(); } });
  document.fonts?.ready.then(build);
}

/* Start */
initTicker();
initHero();
renderShop();
initFinder();
initBeauty();
initKids();
renderCart();
document.title = `${BRAND} Gummies`;
})();
