/* bärly – Produktseite für die Sets (crew.html, morgen-abend.html)
   Welches Set gezeigt wird, steht in <main data-bundle="…">. Braucht brand.js und shop.js.
   Name, Inhalt und Preise kommen aus BUNDLES und planFor (brand.js), damit Aktionspreise
   (z. B. Black Week im Abo) hier automatisch mitlaufen. Hier stehen nur die Texte der Seite.
   Aufbau: Galerie + Kaufbox, Leiste, Was drin ist, Dein Tag, Rechnung, Hinweise, FAQ, anderes Set. */

(() => {
'use strict';

const { eur, byId, BUNDLES, PDP, ASSETS, pdpUrl, planFor } = window.Baerly;
const { CREW, SHIPPING_COST, SHIPPING_FREE, PRICE_NOTE, $, $$, esc, NAME, vars, count, memberSum, warnFor, adultFor,
  addToCart, shot, bearImg, avatar, go: link, ready } = window.Shop;

const main = $('main[data-bundle]');
const b = BUNDLES[main?.dataset.bundle];
if (!b || b.soon) return;
const items = b.members.map(id => byId[id]);

/* Texte je Set. hero: Schlagzeile (HTML, <em> = kursiv) und Unterzeile */
const COPY = {
  crew: {
    hero: { title: 'Vier Bären. <em>Ein Tag.</em>', sub: 'DAILY und GLOW am Morgen, FLEX zum Training, SNOOZY am Abend. Alle vier Sorten für je 30 Tage.' },
    why: 'Jede Sorte hat genau eine Aufgabe, und zusammen decken sie deinen Tag ab. Die Mengen sind so gewählt, dass du alle vier nebeneinander nehmen kannst, ohne bei Zink, Vitamin D oder Vitamin B6 über den Höchstmengen-Empfehlungen des BfR zu landen.'
  },
  beautysleep: {
    hero: { title: 'Morgens GLOW. <em>Abends Licht aus.</em>', sub: 'GLOW zum Frühstück, SNOOZY eine halbe Stunde vor dem Schlafen. Zwei Sorten für je 30 Tage.' },
    why: 'Zwei Momente, zwei Sorten: GLOW gehört in die Morgenroutine, SNOOZY auf den Nachttisch. So steht jede Dose da, wo du sie brauchst.'
  }
};
const copy = COPY[b.id] || { hero: { title: b.name, sub: b.title }, why: '' };
const state = { plan: 'abo', qty: 1 };
const sum = memberSum(b);
const once = planFor(b, 'once');
const abo = planFor(b, 'abo');
const names = items.map(NAME);
const nameList = names.length > 1 ? `${names.slice(0, -1).join(', ')} und ${names[names.length - 1]}` : names[0];
const warn = warnFor(b.id);
const warnName = (items.find(p => p.warn) || {}).name?.toUpperCase();
const adults = items.filter(p => p.adultOnly).map(NAME);
const zincPair = b.members.includes('glow') && b.members.includes('daily');

main.setAttribute('style', `--tint:${b.tint};--deep:#1d1236;--dot:${items[0].color};--atmo:${atmo()}`);
document.title = `${b.name}: ${nameList} · bärly`;

/* Hintergrund aus den Sortenfarben, von links nach rechts */
function atmo() {
  const stops = items.map((p, i) => `${p.tint} ${Math.round(i / Math.max(1, items.length - 1) * 100)}%`).join(', ');
  return `linear-gradient(120deg, ${stops})`;
}

const ICON = {
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v6M14 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7H5V3M5.6 7A8 8 0 1 1 4 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  card: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.5"/></svg>'
};

/* ------------------------------------------------------------------ */
/* Galerie: alle Dosen, alle Bären, dann jede Sorte mit ihrem Bären     */
/* ------------------------------------------------------------------ */
const VIEWS = [
  { id: 'set', label: 'Alle Dosen', thumb: `<span class="vt-set">${items.map(p => shot(p.id, '', false)).join('')}</span>` },
  { id: 'crew', label: 'Die Bären', thumb: `<span class="vt-set vt-bears">${items.map(p => bearImg(p.id, '', false)).join('')}</span>` },
  ...items.map(p => ({ id: p.id, label: NAME(p), thumb: `<span class="vt-duo" style="${vars(p.id)}">${shot(p.id, '', false)}${bearImg(p.id, '', false)}</span>` }))
];
function viewHTML(id) {
  if (id === 'set') return `<div class="g-view g-set g-n${items.length}">${items.map((p, i) => shot(p.id, i ? '' : `Set ${b.name}: Dosen ${nameList}`, false)).join('')}</div>`;
  if (id === 'crew') return `<div class="g-view g-crew g-n${items.length}">${items.map((p, i) => bearImg(p.id, i ? '' : `Die Bären ${nameList}`, false)).join('')}</div>`;
  const p = byId[id];
  return `<div class="g-view g-duo" style="${vars(p.id)}">${shot(p.id, `Dose ${NAME(p)} ${p.title}`, false)}${bearImg(p.id, '', false)}</div>`;
}

/* ------------------------------------------------------------------ */
/* Kaufbox                                                             */
/* ------------------------------------------------------------------ */
function aboLine() {
  return abo.was
    ? `Erste Lieferung ${eur(abo.price)} statt ${eur(abo.was)}, danach ${eur(abo.was)} alle 30 Tage.`
    : `Alle 30 Tage das ganze Set, je ${eur(abo.price)} statt ${eur(once.price)}.`;
}
function buyHTML() {
  return `<div class="buy" id="buy">
    <p class="buy-eyebrow">Set · ${items.length} Sorten · Nahrungsergänzungsmittel${adultFor(b.id) ? ' · <b>18+</b>' : ''}</p>
    <h1 class="buy-title"><span class="buy-name buy-name-set">${b.name}</span><span class="buy-kind">${nameList}</span></h1>
    <p class="buy-lead">${copy.hero.sub}</p>
    <ul class="set-members">${items.map(p => `<li style="${vars(p.id)}">${avatar(p.id, false)}<span><b>${NAME(p)}</b> ${p.title}<small>${p.flavor} · ${count(p)} Fruchtgummis · 30 Tage</small></span></li>`).join('')}</ul>
    <p class="buy-claim">Einzeln ${eur(sum)}, im Set ${eur(once.price)}: du sparst ${eur(sum - once.price)}.</p>
    ${adults.length || warn ? `<p class="buy-warn" role="note"><b>Wichtig:</b>${adults.length ? ` ${adults.join(' und ')} ${adults.length > 1 ? 'sind' : 'ist'} nur für Erwachsene.` : ''}${warn ? ` ${warnName}: ${warn}` : ''}</p>` : ''}

    <fieldset class="plans">
      <legend class="sr-only">Kaufart wählen</legend>
      <label class="plan plan-abo is-on" data-plan-card="abo">
        <span class="plan-top">
          <input type="radio" name="plan" value="abo" checked>
          <span class="plan-label"><b>Abo</b><em class="plan-save">${abo.was ? 'Black Week' : '20 % sparen'}</em></span>
          <span class="plan-price"><strong>${eur(abo.price)}</strong><small>${abo.was ? `statt ${eur(abo.was)}` : 'je Lieferung'}</small></span>
        </span>
        <span class="plan-detail">
          <span class="plan-sub">${aboLine()}</span>
          <span class="plan-ticks"><i>Versandkostenfrei</i><i>Jederzeit pausieren</i><i>Jederzeit kündbar</i><i>Ohne Mindestlaufzeit</i></span>
        </span>
      </label>
      <label class="plan plan-once" data-plan-card="once">
        <span class="plan-top">
          <input type="radio" name="plan" value="once">
          <span class="plan-label"><b>Einmal kaufen</b></span>
          <span class="plan-price"><strong>${eur(once.price)}</strong><small>statt einzeln ${eur(sum)}</small></span>
        </span>
        <span class="plan-detail"><span class="plan-sub">${items.length} Dosen mit je ${count(items[0])} Fruchtgummis, jede reicht 30 Tage. Kein Abo.</span></span>
      </label>
    </fieldset>

    <div class="buy-row">
      <div class="qty qty-lg" role="group" aria-label="Menge">
        <button type="button" data-step="-1" aria-label="Ein Set weniger">−</button>
        <output id="qty" aria-live="polite">1</output>
        <button type="button" data-step="1" aria-label="Ein Set mehr">+</button>
      </div>
      <button class="btn btn-ink btn-buy" type="button" id="buyBtn"><span id="buyLabel">Abo starten</span><span class="btn-sep" aria-hidden="true"></span><span id="buyPrice"></span></button>
    </div>
    <p class="buy-meta" id="buyMeta"></p>
    <ul class="assure">
      <li>${ICON.truck}<span>Versand ${eur(SHIPPING_COST)}, ab ${eur(SHIPPING_FREE)} und im Abo kostenlos</span></li>
      <li>${ICON.pause}<span>Abo pausieren und kündigen per Klick, ohne Mindestlaufzeit</span></li>
      <li>${ICON.back}<span>14 Tage Widerrufsrecht für ungeöffnete Ware</span></li>
      <li>${ICON.card}<span>Zahlarten geplant: PayPal, Klarna, Kreditkarte, Apple Pay</span></li>
    </ul>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Seite zusammensetzen                                                */
/* ------------------------------------------------------------------ */
function memberCard(p) {
  const key = p.facts.filter(([, l]) => !/pro Tag|vor dem Schlafen/.test(l)).slice(0, 3);
  return `<article class="member-card" style="${vars(p.id)}" data-reveal>
    <a class="member-card-visual" ${link(pdpUrl(p.id))} tabindex="-1" aria-hidden="true">${shot(p.id)}${bearImg(p.id, '', true, 'member-card-bear')}</a>
    <div class="member-card-body">
      <p class="member-card-name">${NAME(p)} <span>· ${PDP[p.id].traits[0][1]}</span></p>
      <h3 class="member-card-title"><a ${link(pdpUrl(p.id))}>${p.title}</a></h3>
      <p class="member-card-short">${p.short} ${p.flavor}.</p>
      <ul class="member-card-facts">${key.map(([v, l]) => `<li><b>${v}</b> ${l}</li>`).join('')}</ul>
      <p class="member-card-claim">${p.cardClaim}</p>
      ${p.warn ? `<p class="member-card-warn">${p.warn}</p>` : p.adultOnly ? '<p class="member-card-warn">Nur für Erwachsene.</p>' : ''}
      <p class="member-card-price">Einzeln ${eur(p.price)} · <a ${link(pdpUrl(p.id))}>Inhaltsstoffe und Pflichtangaben</a></p>
    </div>
  </article>`;
}

function dayPlan() {
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  return items.map(p => ({ p, r: PDP[p.id].ritual })).sort((x, y) => toMin(x.r.time) - toMin(y.r.time))
    .map(({ p, r }) => `<li class="set-day-step" style="${vars(p.id)}" data-reveal>
      <span class="set-day-time">${r.time}</span>
      ${avatar(p.id)}
      <div><h3>${NAME(p)} · ${r.moment}</h3><p>${r.steps[0][1]}</p></div>
    </li>`).join('');
}

function otherSet() {
  const o = Object.values(BUNDLES).find(x => x.id !== b.id && !x.soon);
  if (!o) return '';
  const ow = warnFor(o.id);
  return `<div class="cross-set" data-reveal>
    <a class="cross-set-visual" ${link(pdpUrl(o.id))} tabindex="-1" aria-hidden="true">${o.members.map(id => shot(id)).join('')}</a>
    <p class="cross-name">Set</p>
    <h3 class="cross-title"><a ${link(pdpUrl(o.id))}>${o.name}</a></h3>
    <p class="cross-short">${o.title}.</p>
    ${ow ? `<p class="cross-adult">SNOOZY: ${ow}</p>` : ''}
    <p class="cross-price">${eur(o.price)} <span class="cross-was">statt einzeln ${eur(memberSum(o))}</span></p>
    <button class="btn btn-ink btn-sm" type="button" data-bundle="${o.id}">Set in den Warenkorb</button>
  </div>`;
}

function crossCard(q) {
  return `<a class="cross-card" ${link(pdpUrl(q.id))} style="${vars(q.id)}" data-reveal>
    <span class="cross-visual">${shot(q.id)}${bearImg(q.id, '', true, 'cross-bear')}</span>
    <span class="cross-intro">${avatar(q.id)}<span>„${PDP[q.id].lines[0]}“</span></span>
    <span class="cross-name">${NAME(q)}</span>
    <span class="cross-title">${q.title}</span>
    <span class="cross-short">${q.short}</span>
    <span class="cross-price">${eur(q.price)} · im Abo ${eur(planFor(q, 'abo').price)}</span>
  </a>`;
}

function render() {
  const rest = CREW.filter(q => !b.members.includes(q.id));
  const months = 6;
  const med = [b.members.includes('snoozy') && 'Melatonin (SNOOZY)', b.members.includes('daily') && 'Jod (DAILY)'].filter(Boolean).join(' und ');
  const faq = [
    ['Was ist im Set?', `${nameList}, jede Sorte in einer eigenen Dose mit ${count(items[0])} Fruchtgummis für 30 Tage. Alle Inhaltsstoffe und Pflichtangaben stehen auf der Produktseite der jeweiligen Sorte.`],
    ['Kann ich alle Sorten gleichzeitig nehmen?', `Ja, dafür ist das Set gedacht. Jede Sorte hat ihre eigene Uhrzeit, siehe „Dein Tag“ oben.${zincPair ? ' GLOW und DAILY zusammen ergeben 6,5 mg Zink pro Tag, genau die Höchstmenge, die das BfR für Zink in Nahrungsergänzungsmitteln empfiehlt. Nimm dann kein weiteres Zink-Präparat dazu.' : ''}`],
    ...(adults.length || warn ? [['Ist das Set für alle?', `Nicht ganz.${adults.length ? ` ${adults.join(' und ')} ${adults.length > 1 ? 'sind' : 'ist'} nur für Erwachsene.` : ''}${warn ? ` ${warnName}: ${warn}` : ''}`]] : []),
    ['Wie funktioniert das Abo?', `${aboLine()} Pausieren und kündigen geht jederzeit per Klick, ohne Mindestlaufzeit.`],
    ['Ich nehme Medikamente. Darf ich das Set nehmen?', `Sprich bitte vorher mit deiner Ärztin oder deinem Arzt${med ? `, besonders wegen ${med}` : ''}.`]
  ];

  main.innerHTML = `
  <nav class="crumbs wrap" aria-label="Brotkrümel">
    <ol><li><a ${link('index.html')}>Start</a></li><li><a ${link('index.html#produkte')}>Produkte</a></li><li aria-current="page">${b.name}</li></ol>
  </nav>

  <section class="pdp-top wrap" aria-label="${esc(b.name)} kaufen">
    <div class="gallery">
      <div class="g-stage atmo" id="gStage" role="tabpanel" aria-labelledby="vt-set" data-view="set">${viewHTML('set')}</div>
      <div class="g-thumbs" role="tablist" aria-label="Ansichten">
        ${VIEWS.map((v, i) => `<button type="button" class="vt" role="tab" id="vt-${v.id}" data-view="${v.id}" aria-selected="${i === 0}" aria-controls="gStage" tabindex="${i === 0 ? 0 : -1}"><span class="vt-img" aria-hidden="true">${v.thumb}</span><span class="vt-label">${v.label}</span></button>`).join('')}
      </div>
    </div>
    ${buyHTML()}
  </section>

  <ul class="strip wrap" aria-label="Auf einen Blick">
    <li>${items.length} Sorten</li><li>je 30 Tage</li><li>${eur(sum - once.price)} gespart</li><li>Abo ${eur(abo.price)}</li>
  </ul>

  <section class="section why-pdp" aria-labelledby="whyTitle">
    <div class="wrap">
      <header class="section-head" data-reveal>
        <p class="eyebrow">Was drin ist</p>
        <h2 class="h2" id="whyTitle">${copy.hero.title}</h2>
        <p class="lead">${copy.why}</p>
      </header>
      <div class="member-cards member-cards-${items.length}">${items.map(memberCard).join('')}</div>
    </div>
  </section>

  <section class="section set-day atmo" aria-labelledby="dayTitle">
    <div class="wrap set-day-grid">
      <header data-reveal>
        <p class="eyebrow">Dein Tag mit dem Set</p>
        <h2 class="h2" id="dayTitle">Jeder Bär hat <em>seine Uhrzeit.</em></h2>
        <p class="lead">So verteilst du die Sorten über den Tag. Pro Sorte gilt: zwei Fruchtgummis, nicht mehr.</p>
      </header>
      <ol class="set-day-steps">${dayPlan()}</ol>
    </div>
  </section>

  <section class="section calc" id="abo-info" aria-labelledby="calcTitle">
    <div class="wrap calc-grid">
      <div data-reveal>
        <p class="eyebrow">Die Rechnung</p>
        <h2 class="h2" id="calcTitle">Im Set günstiger. <em>Im Abo noch mehr.</em></h2>
        <p class="lead">Alle Preise für 30 Tage, inklusive MwSt.</p>
      </div>
      <div class="calc-card" data-reveal>
        <div class="calc-row"><span>Einzeln gekauft</span><strong>${eur(sum)}</strong><small>${items.map(p => `${NAME(p)} ${eur(p.price)}`).join(' + ')}</small></div>
        <div class="calc-row"><span>Als Set</span><strong>${eur(once.price)}</strong><small>${eur(sum - once.price)} gespart</small></div>
        <div class="calc-row calc-abo"><span>Set im Abo</span><strong>${eur(abo.price)}</strong><small>${abo.was ? `erste Lieferung, danach ${eur(abo.was)}` : 'je Lieferung, versandkostenfrei'}</small></div>
        <div class="calc-input">
          <label for="calcMonths">Wie lange möchtest du das Set nehmen?</label>
          <div class="calc-slider"><input type="range" id="calcMonths" min="1" max="12" step="1" value="${months}"><output id="calcOut" for="calcMonths">${months} Monate</output></div>
        </div>
        <div class="calc-save"><span>Im Abo gespart gegenüber einzeln</span><strong id="calcSave">–</strong></div>
        <p class="calc-fine">Einzeln: jede Sorte als Dose zum Einzelpreis, ohne Versand gerechnet. Abo: alle 30 Tage, versandkostenfrei.</p>
      </div>
    </div>
  </section>

  <section class="section pdp-faq" aria-labelledby="pdpFaqTitle">
    <div class="wrap faq-grid">
      <div data-reveal>
        <p class="eyebrow">Fragen zum Set</p>
        <h2 class="h2" id="pdpFaqTitle">Gut, dass <em>du fragst.</em></h2>
      </div>
      <div class="faq-list">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
    </div>
  </section>

  <section class="section cross" aria-labelledby="crossTitle">
    <div class="wrap">
      <header class="section-head" data-reveal>
        <p class="eyebrow">Noch mehr bärly</p>
        <h2 class="h2" id="crossTitle">${rest.length ? 'Der Rest <em>der Crew.</em>' : 'Lieber <em>zu zweit?</em>'}</h2>
      </header>
      <div class="cross-grid">${rest.map(crossCard).join('')}${otherSet()}</div>
      <p class="price-note">${PRICE_NOTE}</p>
    </div>
  </section>`;

  document.body.insertAdjacentHTML('beforeend', `<div class="sticky-buy" id="stickyBuy" aria-hidden="true">
    <div class="wrap sticky-inner">
      <span class="sticky-avatars">${items.map(p => avatar(p.id)).join('')}</span>
      <p class="sticky-name"><b>${esc(b.name)}</b><span id="stickyPlan"></span></p>
      <button class="btn btn-ink" type="button" id="stickyBtn" tabindex="-1"><span id="stickyLabel">Abo starten</span> · <span id="stickyPrice"></span></button>
    </div>
  </div>`);

  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product',
    name: `bärly ${b.name}`, brand: { '@type': 'Brand', name: 'bärly' },
    description: `${nameList}, je 30 Tage.`,
    image: items.map(p => new URL(ASSETS(p.id).front, document.baseURI).href),
    offers: { '@type': 'Offer', priceCurrency: 'EUR', price: once.price.toFixed(2), availability: 'https://schema.org/PreOrder' }
  });
  document.head.appendChild(ld);
}

/* ------------------------------------------------------------------ */
/* Galerie, Kaufbox, Rechner                                           */
/* ------------------------------------------------------------------ */
function initGallery() {
  const stage = $('#gStage');
  const tabs = $$('.vt');
  const current = () => tabs.findIndex(tb => tb.getAttribute('aria-selected') === 'true');
  const show = (id, focus) => {
    if (stage.dataset.view !== id) {
      stage.innerHTML = viewHTML(id);
      stage.setAttribute('aria-labelledby', `vt-${id}`);
      stage.dataset.view = id;
      tabs.forEach(tb => { const on = tb.dataset.view === id; tb.setAttribute('aria-selected', String(on)); tb.tabIndex = on ? 0 : -1; });
    }
    if (focus) $(`#vt-${id}`).focus();
  };
  $('.g-thumbs').addEventListener('click', e => { const t = e.target.closest('.vt'); if (t) show(t.dataset.view); });
  $('.g-thumbs').addEventListener('keydown', e => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    show(tabs[(current() + step + tabs.length) % tabs.length].dataset.view, true);
  });
  let sx = null;
  stage.addEventListener('pointerdown', e => { sx = e.clientX; });
  stage.addEventListener('pointercancel', () => { sx = null; });
  stage.addEventListener('pointerup', e => {
    if (sx === null) return;
    const dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) < 50) return;
    show(tabs[(current() + (dx < 0 ? 1 : -1) + tabs.length) % tabs.length].dataset.view);
  });
}

function initBuy() {
  const buy = $('#buy');
  const sticky = $('#stickyBuy');
  const update = () => {
    const pl = planFor(b, state.plan);
    const total = pl.price * state.qty;
    const label = state.plan === 'abo' ? 'Abo starten' : 'In den Warenkorb';
    $('#qty').textContent = state.qty;
    $('#buyLabel').textContent = label;
    $('#stickyLabel').textContent = label;
    $('#buyPrice').textContent = eur(total);
    $('#stickyPrice').textContent = eur(total);
    $('#stickyPlan').textContent = `${state.plan === 'abo' ? 'Abo, alle 30 Tage' : 'Einmalkauf'}${state.qty > 1 ? ` · ${state.qty} ×` : ''}`;
    const ship = state.plan === 'abo' || total >= SHIPPING_FREE ? 'versandkostenfrei' : `zzgl. ${eur(SHIPPING_COST)} Versand`;
    $('#buyMeta').textContent = `${state.qty > 1 ? `${state.qty} × ${eur(pl.price)} · ` : ''}${items.length} Dosen à ${count(items[0])} Fruchtgummis · inkl. MwSt., ${ship}`;
    $$('[data-plan-card]', buy).forEach(c => c.classList.toggle('is-on', c.dataset.planCard === state.plan));
  };
  buy.addEventListener('change', e => { if (e.target.name === 'plan') { state.plan = e.target.value; update(); } });
  buy.addEventListener('click', e => {
    const s = e.target.closest('[data-step]');
    if (s) { state.qty = Math.min(9, Math.max(1, state.qty + +s.dataset.step)); update(); }
  });
  const add = (e) => addToCart(b.id, state.plan, { qty: state.qty, from: e.currentTarget });
  $('#buyBtn').addEventListener('click', add);
  $('#stickyBtn').addEventListener('click', add);
  update();

  if ('IntersectionObserver' in window) {
    let pastBuy = false, atFooter = false;
    const sync = () => {
      const on = pastBuy && !atFooter;
      sticky.classList.toggle('show', on);
      sticky.setAttribute('aria-hidden', String(!on));
      $('#stickyBtn').tabIndex = on ? 0 : -1;
    };
    new IntersectionObserver(([en]) => { pastBuy = !en.isIntersecting; sync(); }, { rootMargin: '0px 0px 100000px 0px' }).observe($('.buy-row'));
    new IntersectionObserver(([en]) => { atFooter = en.isIntersecting; sync(); }).observe($('.footer'));
  }
}

function initCalc() {
  const range = $('#calcMonths');
  const calc = () => {
    const m = +range.value;
    const word = `${m} ${m === 1 ? 'Monat' : 'Monate'}`;
    $('#calcOut').textContent = word;
    range.setAttribute('aria-valuetext', word);
    const aboTotal = abo.was ? abo.price + (m - 1) * abo.was : m * abo.price;
    $('#calcSave').textContent = eur(m * sum - aboTotal);
  };
  range.addEventListener('input', calc);
  calc();
}

render();
initGallery();
initBuy();
initCalc();
ready();
})();
