/* bärly – Shop
   Rendert Produkte, Bären-Finder, Momente und Crew aus brand.js, verwaltet Bild-Slots,
   Warenkorb (localStorage) und das Produktdetail. Keine Abhängigkeiten. */

(() => {
'use strict';

const { BRAND, eur, aboPrice, PRODUCTS, byId, BUNDLES, PACK_INFO, ASSETS, HERO_ASSET, plansFor, planFor, netGrams, unitPrice } = window.Baerly;

const CREW = PRODUCTS.filter(p => p.launch);
const SHIPPING_FREE = 35;
const SHIPPING_COST = 3.90;   // Prototyp-Wert für Einmalkäufe unter 35 €
const THEME = {
  glow:   { tint: '#f6e1e6', deep: '#9c2f55', dot: '#e58aa3' },
  flex:   { tint: '#e1e8f6', deep: '#1f3a8a', dot: '#7f9ee6' },
  snoozy: { tint: '#e9e2f4', deep: '#43207f', dot: '#a68bd9' },
  daily:  { tint: '#f6edcc', deep: '#5f4100', dot: '#d9ad3c' }
};
const SET_TEXT = {
  crew: 'GLOW, FLEX, SNOOZY und DAILY, je 30 Tage.',
  beautysleep: 'GLOW zum Frühstück, SNOOZY vor dem Schlafen.'
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
const vars = (id) => `--tint:${theme(id).tint};--deep:${theme(id).deep}`;
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
function slotHTML(src, alt, fallback) {
  return `<div class="slot" data-src="${src}" data-alt="${esc(alt)}">
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

/* Platzhalter für Character-Bilder: feine Linienzeichnung mit dem Erkennungsmerkmal */
function charIcon(id) {
  const s = theme(id).deep;
  const fill = '#fffdfb';
  const ears = `<circle cx="62" cy="70" r="20" fill="${fill}" stroke="${s}" stroke-width="3"/><circle cx="138" cy="70" r="20" fill="${fill}" stroke="${s}" stroke-width="3"/>
    <circle cx="62" cy="70" r="9" fill="none" stroke="${s}" stroke-width="2" opacity=".4"/><circle cx="138" cy="70" r="9" fill="none" stroke="${s}" stroke-width="2" opacity=".4"/>`;
  const head = `<ellipse cx="100" cy="114" rx="58" ry="52" fill="${fill}" stroke="${s}" stroke-width="3"/>
    <ellipse cx="100" cy="134" rx="21" ry="15" fill="#fff" stroke="${s}" stroke-width="2.5"/>
    <ellipse cx="100" cy="127" rx="6" ry="4.5" fill="${s}"/>
    <path d="M100 131.5v5M93 139q7 5 14 0" fill="none" stroke="${s}" stroke-width="2.5" stroke-linecap="round"/>`;
  const dots = `<circle cx="80" cy="108" r="4" fill="${s}"/><circle cx="120" cy="108" r="4" fill="${s}"/>`;
  const heart = (cx, cy) => `<path d="M${cx} ${cy + 9} C ${cx - 14} ${cy} ${cx - 12} ${cy - 11} ${cx - 5} ${cy - 10} C ${cx - 2} ${cy - 10} ${cx} ${cy - 7} ${cx} ${cy - 5} C ${cx} ${cy - 7} ${cx + 2} ${cy - 10} ${cx + 5} ${cy - 10} C ${cx + 12} ${cy - 11} ${cx + 14} ${cy} ${cx} ${cy + 9} Z" fill="#e86b8e" fill-opacity=".85" stroke="${s}" stroke-width="2.5" stroke-linejoin="round"/>`;
  let back = '', front = '';
  if (id === 'glow') {
    front = `<path d="M74 66 L78 40 L90 54 L100 34 L110 54 L122 40 L126 66 Z" fill="#ead3a4" stroke="${s}" stroke-width="2.5" stroke-linejoin="round"/>
      ${heart(80, 108)}${heart(120, 108)}<path d="M89 104 Q100 99 111 104 M66 104 L48 99 M134 104 L152 99" fill="none" stroke="${s}" stroke-width="2.5" stroke-linecap="round"/>`;
  } else if (id === 'flex') {
    front = `<path d="M54 102 Q100 92 146 102 L142 114 Q122 124 106 113 L94 113 Q78 124 58 114 Z" fill="#1f1b2d" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M66 105 l12 -2 M110 105 l12 -2" stroke="#fff" stroke-opacity=".55" stroke-width="2.5" stroke-linecap="round"/>`;
  } else if (id === 'snoozy') {
    front = `<path d="M72 109 q8 6 16 0 M112 109 q8 6 16 0" fill="none" stroke="${s}" stroke-width="3" stroke-linecap="round"/>
      <path d="M44 92 C 48 50 84 30 118 34 C 150 38 168 64 176 100 L 164 103 C 158 84 148 74 140 70 C 116 64 80 68 58 96 Z" fill="#c7b6ea" stroke="${s}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M46 92 C 76 66 124 60 146 72" fill="none" stroke="${s}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="171" cy="110" r="10" fill="#f1ecfb" stroke="${s}" stroke-width="2.5"/>
      <path d="M96 46 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z M128 52 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5z" fill="#f2e3a6"/>`;
  } else if (id === 'daily') {
    back = `<path d="M36 200 Q44 160 100 158 Q156 160 164 200 Z" fill="#f0d27a" stroke="${s}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 140 C 26 72 60 40 100 40 C 140 40 174 72 170 140 C 160 162 40 162 30 140 Z" fill="#f0d27a" stroke="${s}" stroke-width="3"/>`;
    front = dots + `<path d="M90 166 L88 186 M110 166 L112 186" stroke="${s}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M52 198 L150 158" stroke="${s}" stroke-width="7" stroke-linecap="round"/><rect x="132" y="156" width="26" height="20" rx="5" fill="#1f1b2d" transform="rotate(-22 145 166)"/>`;
  }
  return `<svg viewBox="0 0 200 200" aria-hidden="true">${back}${ears}${head}${front}</svg>`;
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function initHero() {
  const fig = $('#heroVisual');
  fig.innerHTML = `<div class="slot-fallback stage">
      <div class="stage-row">${CREW.map(p => `<img src="${ASSETS(p.id).front}" alt="" decoding="async">`).join('')}</div>
    </div>
    <span class="slot-tag" title="Platzhalter: Gruppenbild unter ${HERO_ASSET} ablegen">${pathHTML(HERO_ASSET)}</span>`;
  fig.setAttribute('role', 'img');
  fig.setAttribute('aria-label', fig.dataset.alt);
}

/* ------------------------------------------------------------------ */
/* Die Original Four + Sets                                            */
/* ------------------------------------------------------------------ */
function productCard(p) {
  const abo = planFor(p, 'abo');
  return `<article class="product" style="${vars(p.id)}" data-reveal>
    <button class="product-visual" type="button" data-detail="${p.id}" aria-label="${NAME(p)} ${p.title} ansehen${p.adultOnly ? ', nur für Erwachsene' : ''}">
      ${p.adultOnly ? '<span class="product-badge" aria-hidden="true">18+</span>' : ''}
      <img src="${ASSETS(p.id).front}" alt="" loading="lazy" decoding="async">
    </button>
    <div class="product-body">
      <p class="product-name">${NAME(p)}</p>
      <h3 class="product-title">${p.title}</h3>
      <p class="product-short">${p.short}</p>
      <p class="product-claim">${p.cardClaim}${p.warn ? ` <b>${p.warn}</b>` : ''}</p>
      <p class="product-price"><strong>${eur(p.price)}</strong><span>oder ${eur(abo.price)} im Abo</span></p>
      <p class="product-unit">${count(p)} Fruchtgummis · 30 Tage · ${perKg(p, 'once')}, im Abo ${perKg(p, 'abo')}</p>
    </div>
    <div class="product-actions">
      <button class="btn btn-ink" type="button" data-add="${p.id}">In den Warenkorb</button>
      <button class="btn btn-ghost" type="button" data-detail="${p.id}" aria-label="Details zu ${NAME(p)}">Details</button>
    </div>
  </article>`;
}
function setCard(b) {
  const warn = warnFor(b.id);
  return `<article class="set" data-reveal>
    <div class="set-visual">${adultFor(b.id) ? '<span class="product-badge" aria-hidden="true">18+</span>' : ''}${b.members.map(id => `<img src="${ASSETS(id).front}" alt="" loading="lazy" decoding="async">`).join('')}</div>
    <div>
      <h3>${b.name}</h3>
      <p>${SET_TEXT[b.id] || b.title}</p>
      ${warn ? `<p class="set-warn">SNOOZY: ${warn}</p>` : ''}
      <p class="set-price"><s>${eur(memberSum(b))}</s><strong>${eur(b.price)}</strong><span>im Abo ${eur(aboPrice(b.price))}</span></p>
      <button class="btn btn-ink btn-sm" type="button" data-bundle="${b.id}">Set in den Warenkorb</button>
    </div>
  </article>`;
}
function renderProducts() {
  $('#productGrid').innerHTML = CREW.map(productCard).join('');
  $('#sets').innerHTML = ['crew', 'beautysleep'].map(id => setCard(BUNDLES[id])).join('');
  $('#sets').insertAdjacentHTML('afterend', `<p class="price-note">${PRICE_NOTE}</p>`);
}

/* ------------------------------------------------------------------ */
/* Bären-Finder                                                        */
/* ------------------------------------------------------------------ */
const SET_HINT = {
  glow: ['beautysleep', 'Passt zu SNOOZY: Als Set Morgen & Abend'],
  snoozy: ['beautysleep', 'Passt zu GLOW: Als Set Morgen & Abend'],
  flex: ['crew', 'Mehr als ein Ziel? Alle vier als Set'],
  daily: ['crew', 'Mehr als ein Ziel? Alle vier als Set']
};
function renderFinder(id) {
  const p = byId[id];
  const abo = planFor(p, 'abo');
  const [setId, setText] = SET_HINT[id];
  const b = BUNDLES[setId];
  const facts = p.facts.filter(([, label]) => !/pro Tag|vor dem Schlafen/.test(label)).slice(0, 3);
  $('#finderResult').innerHTML = `<div class="finder-card" style="${vars(id)}">
    <div class="finder-visual"><img src="${ASSETS(id).front}" alt="${NAME(p)} ${p.title}, Dose" decoding="async"></div>
    <div class="finder-copy">
      <p class="product-name">DEIN BÄR: ${NAME(p)}</p>
      <h3>${p.title}</h3>
      <p class="finder-desc">${p.short} ${p.flavor}, ${p.serving}.</p>
      <ul class="facts">${facts.map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join('')}</ul>
      <p class="claim-note">${p.claim}${p.warn ? ` ${p.warn}` : ''}</p>
      <div class="finder-buy">
        <div class="price"><strong>${eur(abo.price)}</strong><span>im Abo, statt ${eur(p.price)} einmalig · ${perKg(p, 'abo')} · inkl. MwSt.</span></div>
        <button class="btn btn-ink" type="button" data-add="${id}" data-plan="abo">Im Abo in den Warenkorb</button>
        <button class="btn btn-ghost" type="button" data-detail="${id}">Details</button>
      </div>
      <p class="finder-set">${setText} für ${eur(b.price)} statt ${eur(memberSum(b))}.${warnFor(setId) && !p.warn ? ` Enthält SNOOZY: ${warnFor(setId)}` : ''} <button class="text-btn" type="button" data-bundle="${setId}">Set hinzufügen</button></p>
    </div>
  </div>`;
}
function initFinder() {
  const saved = store('baerly-goal');
  const start = byId[saved]?.launch ? saved : 'glow';
  $('#finderGoals').insertAdjacentHTML('beforeend', CREW.map(p =>
    `<label class="goal" style="--dot:${theme(p.id).dot}"><input type="radio" name="goal" value="${p.id}" ${p.id === start ? 'checked' : ''}><span><i aria-hidden="true"></i>${p.goal}</span></label>`).join(''));
  renderFinder(start);
  $('#finderGoals').addEventListener('change', e => {
    if (e.target.name !== 'goal') return;
    store('baerly-goal', e.target.value);
    renderFinder(e.target.value);
  });
}

/* ------------------------------------------------------------------ */
/* Momente, Crew, Abo                                                  */
/* ------------------------------------------------------------------ */
function renderMoments() {
  $('#momentGrid').innerHTML = CREW.map(p => `<article class="moment" style="${vars(p.id)}" data-reveal>
    <figure>
      ${slotHTML(ASSETS(p.id).lifestyle, `${NAME(p)}: ${p.scene.title}`, `<div class="scene scene-${p.id}" style="position:absolute;inset:0"><img src="${ASSETS(p.id).front}" alt="" loading="lazy" decoding="async"></div>`)}
      <figcaption>
        <p class="moment-name">${NAME(p)}</p>
        <h3 class="moment-title">${p.scene.title}</h3>
        <p class="moment-text">${p.scene.text}${p.warn ? ` <span class="adult-note">Nur für Erwachsene.</span>` : ''}</p>
      </figcaption>
    </figure>
  </article>`).join('');
}
function renderCrew() {
  $('#crewGrid').innerHTML = CREW.map(p => `<article class="member" style="${vars(p.id)}" data-reveal>
    ${slotHTML(ASSETS(p.id).character, `${NAME(p)}, ${p.look}`, `<div class="member-fallback" style="position:absolute;inset:0">${charIcon(p.id)}</div>`)}
    <h3>${NAME(p)}</h3>
    <p>${p.persona}</p>
    <button class="member-product" type="button" data-detail="${p.id}">${p.title}</button>${p.warn ? '<span class="adult-note">Nur für Erwachsene</span>' : ''}
  </article>`).join('');
}
function initAbo() {
  const p = byId.glow;
  $('#aboOnce').textContent = eur(planFor(p, 'refill').price);
  $('#aboSub').textContent = eur(planFor(p, 'abo').price);
  $('.abo-compare').insertAdjacentHTML('afterend', `<p class="abo-unit">Grundpreis ${perKg(p, 'refill')} einzeln, ${perKg(p, 'abo')} im Abo. Die erste Lieferung kommt mit Dose; ohne Abo kostet die Dose mit Füllung ${eur(p.price)}. Alle Preise inkl. MwSt.</p>`);
}

/* ------------------------------------------------------------------ */
/* Produktdetail                                                       */
/* ------------------------------------------------------------------ */
const modal = $('#modal');
const modalInner = $('#modalInner');
const VIEW_FOR_PLAN = { can: 'jar', refill: 'jar' };

function viewsFor(p) {
  const a = ASSETS(p.id);
  return [
    { id: 'jar', label: 'Dose', html: () => `<img class="g-product" src="${a.front}" alt="${NAME(p)} ${p.title}, Dose von vorne">` },
    { id: 'char', label: 'Charakter', html: () => slotHTML(a.character, `${NAME(p)}, ${p.look}`, `<div class="member-fallback" style="position:absolute;inset:0;background:${theme(p.id).tint}">${charIcon(p.id)}</div>`) },
    { id: 'life', label: 'Im Alltag', html: () => slotHTML(a.lifestyle, `${NAME(p)}: ${p.scene.title}`, `<div class="scene scene-${p.id}" style="position:absolute;inset:0"><img src="${a.front}" alt=""></div>`) }
  ];
}

function openDetail(id, planId) {
  const p = byId[id];
  if (!p || !p.launch) return;
  const f = PACK_INFO[p.id];
  const plans = plansFor(p);
  const views = viewsFor(p);
  const start = plans.find(x => x.id === (planId || 'abo')) ? (planId || 'abo') : plans[0].id;
  modalInner.setAttribute('style', vars(p.id));
  modalInner.innerHTML = `
    <div class="modal-visual">
      <button class="icon-btn modal-close" type="button" data-close aria-label="Schließen">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>
      <div class="gallery" id="gallery"></div>
      <div class="gallery-thumbs" role="group" aria-label="Ansicht wählen">
        ${views.map((v, i) => `<button class="gthumb" type="button" data-view="${v.id}" aria-pressed="${i === 0}">${v.label}</button>`).join('')}
      </div>
    </div>
    <div class="modal-body">
      <div>
        <p class="product-name">${NAME(p)}</p>
        <h2 id="modalTitle">${p.title}</h2>
      </div>
      <p class="modal-sub">${p.flavor} · ${p.serving} · ${count(p)} Fruchtgummis für 30 Tage</p>
      <p class="modal-story">${p.story}</p>
      <table class="nutri">
        <caption>Pro Tagesportion (${f.perDay} Fruchtgummis)</caption>
        <thead><tr><th scope="col">Nährstoff</th><th scope="col">Menge</th><th scope="col">% NRV*</th></tr></thead>
        <tbody>${p.nutrients.map(([n, a, r]) => `<tr><th scope="row">${n}</th><td>${a}</td><td>${r}</td></tr>`).join('')}</tbody>
      </table>
      <p class="claim"><b>Gesundheitsbezogene Angabe</b>${p.claim}</p>
      ${p.warn ? `<p class="modal-warn">${p.warn}</p>` : ''}
      <fieldset class="plan-pick">
        <legend class="sr-only">Kaufart</legend>
        ${plans.map(pl => `<label class="plan-opt"><span class="plan-main"><input type="radio" name="plan" value="${pl.id}" data-view="${VIEW_FOR_PLAN[pl.view] || ''}" ${pl.id === start ? 'checked' : ''}><span><b>${pl.label}</b>${pl.save ? `<em class="save">${pl.save}</em>` : ''}<small>${pl.sub}</small></span></span><span class="plan-price"><strong>${eur(pl.price)}</strong><small>${perKg(p, pl.id)}</small></span></label>`).join('')}
      </fieldset>
      <label class="every" for="every">Liefern alle
        <select id="every"><option value="30">30 Tage</option><option value="45">45 Tage</option><option value="60">60 Tage</option></select>
        <span>Pausieren, tauschen oder kündigen jederzeit</span></label>
      <button class="btn btn-ink btn-block" type="button" data-modal-add="${p.id}">In den Warenkorb</button>
      <p class="price-note">${PRICE_NOTE}</p>
      <details class="mandatory">
        <summary>Pflichtangaben</summary>
        <dl>
          <div><dt>Bezeichnung</dt><dd>${f.legal}</dd></div>
          <div><dt>Verzehrempfehlung</dt><dd>${p.serving}. ${f.perDay} Fruchtgummis entsprechen einer Tagesportion.</dd></div>
          <div><dt>Füllmenge</dt><dd id="netLine"></dd></div>
          <div><dt>Hinweise</dt><dd>${p.warn ? p.warn + ' ' : ''}Die angegebene empfohlene tägliche Verzehrsmenge darf nicht überschritten werden. Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung und eine gesunde Lebensweise. Außerhalb der Reichweite von kleinen Kindern aufbewahren.</dd></div>
          <div><dt>Zutaten</dt><dd>Folgen mit der finalen Rezeptur des Herstellers. Geplant mit Pektin statt Gelatine.</dd></div>
        </dl>
      </details>
      <p class="footnote">* NRV = Nährstoffbezugswert nach Verordnung (EU) 1169/2011. Mengen und Gewichte sind Richtwerte, bis der Hersteller sie bestätigt.</p>
    </div>`;

  const gallery = $('#gallery', modalInner);
  const show = (vid) => {
    const v = views.find(x => x.id === vid) || views[0];
    gallery.innerHTML = v.html();
    hydrateSlots(gallery);
    $$('.gthumb', modalInner).forEach(t => t.setAttribute('aria-pressed', String(t.dataset.view === v.id)));
  };
  const net = (plan) => {
    $('#netLine', modalInner).textContent = `${plan === 'stock' ? '3 × ' : ''}${count(p)} Fruchtgummis = ${netGrams(p, plan)} g · Grundpreis ${perKg(p, plan)}`;
  };
  const every = $('.every', modalInner);
  show('jar');
  net(start);
  every.hidden = !plans.find(x => x.id === start)?.every;
  $('.gallery-thumbs', modalInner).addEventListener('click', e => {
    const t = e.target.closest('.gthumb');
    if (t) show(t.dataset.view);
  });
  $('.plan-pick', modalInner).addEventListener('change', e => {
    net(e.target.value);
    every.hidden = !plans.find(x => x.id === e.target.value)?.every;
  });
  if (!modal.open) modal.showModal();
}
modal.addEventListener('click', e => {
  if (e.target === modal || e.target.closest('[data-close]')) { modal.close(); return; }
  const add = e.target.closest('[data-modal-add]');
  if (add) {
    const id = add.dataset.modalAdd;
    const plan = $('input[name="plan"]:checked', modal)?.value || 'once';
    const every = planFor(byId[id], plan).every ? +($('#every', modal)?.value || 30) : 0;
    addToCart(id, plan, every ? { every } : {});
    modal.close();
  }
});

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

function addToCart(id, plan = 'once', extra = {}) {
  if (!sellable(id)) return;
  const found = cart.find(l => l.id === id && l.plan === plan);
  if (found) { found.qty++; if (extra.every) found.every = extra.every; }
  else cart.push({ id, plan, qty: 1, ...extra });
  saveCart();
  renderCart();
  const btn = $('#cartOpen');
  btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
  toast(`${lineName(itemInfo(id))} liegt im Warenkorb${plan === 'abo' ? ' (Abo)' : ''}`);
}

function lineImage(id) {
  const ids = BUNDLES[id] ? BUNDLES[id].members : [id];
  return ids.map(x => `<img src="${ASSETS(x).front}" alt="">`).join('');
}

function renderCart() {
  const n = cart.reduce((s, l) => s + l.qty, 0);
  $('#cartCount').textContent = n;
  $('#cartCount').hidden = n === 0;
  $('#cartOpen').setAttribute('aria-label', `Warenkorb öffnen, ${n} Artikel`);
  const total = cart.reduce((s, l) => s + linePrice(l), 0);
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
    return `<div class="line" style="${vars(first)}">
      <div class="line-img">${lineImage(l.id)}</div>
      <div>
        <p class="line-name">${lineName(it)}</p>
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
    const total = cart.reduce((s, l) => s + linePrice(l), 0);
    $('#cartStatus').textContent = `Warenkorb aktualisiert. Zwischensumme ${eur(total)}.`;
    // Die Knöpfe wurden neu gezeichnet: Fokus zurück auf denselben Knopf, sonst auf „Schließen“
    ((refocus && $(refocus, $('#drawerItems'))) || $('#cartClose')).focus();
  }
});

/* Solange der Warenkorb offen ist, ist der Rest der Seite inert */
let lastFocus = null;
const behindDrawer = ['.skip', '.announce', '.nav', 'main', '.footer'].map(s => $(s)).filter(Boolean);
function openCart() {
  lastFocus = document.activeElement;
  $('#toast').classList.remove('show');
  overlay.hidden = false;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  behindDrawer.forEach(el => { el.inert = true; });
  // Erst fokussieren, wenn der Drawer sichtbar ist
  requestAnimationFrame(() => $('#cartClose').focus());
}
function closeCart() {
  overlay.hidden = true;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  behindDrawer.forEach(el => { el.inert = false; });
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

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add, add.dataset.plan || 'once');
    if (add.classList.contains('is-added')) return;
    add.dataset.label = add.textContent;
    add.classList.add('is-added');
    add.textContent = 'Hinzugefügt';
    setTimeout(() => { add.classList.remove('is-added'); add.textContent = add.dataset.label; }, 1500);
    return;
  }
  const bundle = e.target.closest('[data-bundle]');
  if (bundle) { addToCart(bundle.dataset.bundle, 'once'); return; }
  const det = e.target.closest('[data-detail]');
  if (det) openDetail(det.dataset.detail);
});

$('#signup').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#signupEmail').value.trim();
  const msg = $('#signupMsg');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.'; $('#signupEmail').focus(); return; }
  if (!$('#signupConsent').checked) { msg.textContent = 'Bitte bestätige, dass wir dir E-Mails schicken dürfen.'; $('#signupConsent').focus(); return; }
  msg.textContent = 'Du bist dabei. Wir melden uns vor dem Launch. (Prototyp: wird noch nicht gespeichert.)';
  e.target.reset();
});

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
function initReveal() {
  const els = $$('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
}

/* Start */
initHero();
renderProducts();
initFinder();
renderMoments();
renderCrew();
initAbo();
renderCart();
saveCart();
hydrateSlots();
initReveal();
document.title = `${BRAND} · Supplement-Gummies · Same Bears. Better Days.`;
})();
