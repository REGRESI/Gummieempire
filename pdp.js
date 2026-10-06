/* bärly – Produktseite (eine Datei für alle vier Sorten)
   Welche Sorte gezeigt wird, steht in <main data-product="…">. Braucht brand.js, packs.js und shop.js.
   Module: Galerie mit 360°-Dose, Kaufbox mit Abo-Rhythmus, Leiste beim Scrollen, Maskottchen,
   Nährstoffe mit NRV-Balken, Einnahme, Abo-Rechner, Nährwerttabelle und Pflichtangaben,
   Bewertungen (ehrlich leer bis zum Launch), FAQ und Crew-Empfehlungen. */

(() => {
'use strict';

const { eur, byId, BUNDLES, PACK_INFO, PDP, pdpUrl, ASSETS, plansFor, planFor, netGrams, bear, packs } = window.Baerly;
const { CREW, SHIPPING_COST, SHIPPING_FREE, PRICE_NOTE, $, $$, esc, reduced, NAME, theme, vars, perKg, count, memberSum, warnFor, slotHTML, addToCart, whenVisible, ready } = window.Shop;

const main = $('main[data-product]');
const p = byId[main.dataset.product];
if (!p || !p.launch) return;
const d = PDP[p.id];
const f = PACK_INFO[p.id];
const a = ASSETS(p.id);
const plans = plansFor(p);
const t = theme(p.id);
const big = f.can === 'gross';
const refill = planFor(p, 'refill');
const abo = planFor(p, 'abo');
const state = { plan: 'abo', every: 30, qty: 1 };

main.setAttribute('style', vars(p.id));
document.title = `${NAME(p)} ${p.title} · bärly`;

/* ------------------------------------------------------------------ */
/* Kleine Bausteine                                                    */
/* ------------------------------------------------------------------ */
const ICON = {
  cancel: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v6M14 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7H5V3M5.6 7A8 8 0 1 1 4 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  drag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M4 12l3-3M4 12l3 3M20 12l-3-3M20 12l-3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
const split = (amt) => { const i = amt.lastIndexOf(' '); return i > 0 ? [amt.slice(0, i), amt.slice(i + 1)] : [amt, '']; };
const nrvNum = (s) => { const n = parseFloat(String(s).replace('.', '').replace(',', '.')); return Number.isFinite(n) ? n : null; };
const gummies = (n, cls = '') => Array.from({ length: n }, (_, i) => `<span class="g-bear ${cls}" style="--i:${i}">${bear(p, { face: false, shadow: false, label: false })}</span>`).join('');

/* ------------------------------------------------------------------ */
/* Galerie: 360°-Dose, Maskottchen, Gummies, Nachfüller, Alltag        */
/* ------------------------------------------------------------------ */
const VIEWS = [
  { id: 'jar', label: '360° Dose', thumb: `<img src="${a.front}" alt="">` },
  { id: 'bear', label: `${NAME(p)} als Bär`, thumb: `<img src="${a.bust}" alt="">` },
  { id: 'gummy', label: 'Die Gummies', thumb: `<span class="vt-gummy">${bear(p, { face: false, shadow: false, label: false })}</span>` },
  { id: 'refill', label: 'Nachfüller', thumb: `<span class="vt-refill">${packs.refill(p)}</span>` },
  { id: 'life', label: 'Im Alltag', thumb: `<span class="vt-time">${d.ritual.time}</span>` }
];
function viewHTML(id) {
  switch (id) {
    case 'jar': return `<div class="j3" id="j3">
        <div class="j3-view" id="j3View" tabindex="0" role="slider" aria-label="Dose drehen: Pfeiltasten links und rechts" aria-valuemin="0" aria-valuemax="359" aria-valuenow="0" aria-valuetext="Vorderseite">
          <div class="j3-scene"><div class="j3-rot" id="j3Rot"></div></div>
          <img class="j3-fallback" src="${a.front}" alt="">
        </div>
        <p class="j3-hint" aria-hidden="true">${ICON.drag}<span>Ziehen zum Drehen</span></p>
        <div class="j3-jump" role="group" aria-label="Seite der Dose zeigen">
          <button type="button" data-face="0" aria-pressed="true">Vorne</button>
          <button type="button" data-face="95" aria-pressed="false">Bär</button>
          <button type="button" data-face="185" aria-pressed="false">Nährwerte</button>
          <button type="button" data-face="270" aria-pressed="false">Seite</button>
        </div>
      </div>`;
    case 'bear': return `<div class="g-bearview">
        <img src="${a.character}" alt="${NAME(p)}: ${esc(p.look)}" width="940" height="1040">
        <p class="g-caption"><b>${NAME(p)}</b> · ${d.traits[0][1]}</p>
      </div>`;
    case 'gummy': return `<div class="g-gummies">
        <div class="g-pile">${gummies(f.perDay)}</div>
        <p class="g-caption"><b>Die Tagesportion: ${f.perDay} Fruchtgummis</b> · ${p.flavor} · ca. ${String(f.unit).replace('.', ',')} g pro Stück · geplant mit Pektin statt Gelatine</p>
      </div>`;
    case 'refill': return `<div class="g-refill">
        <div class="g-refill-pack">${packs.refill(p)}</div>
        <img class="g-refill-jar" src="${a.front}" alt="">
        <p class="g-caption"><b>Nachfüller per Brief</b> · ${f.refill[0]} Fruchtgummis, passt in den Briefkasten</p>
      </div>`;
    case 'life': return `<div class="g-life">${slotHTML(a.lifestyle, `${NAME(p)}: ${p.scene.title}`, `<div class="g-life-fallback">
        <img class="g-life-bear" src="${a.character}" alt="">
        <img class="g-life-jar" src="${a.front}" alt="">
        <p class="g-life-time">${d.ritual.time}</p>
      </div>`)}
        <p class="g-caption"><b>${p.scene.title}</b> · ${p.scene.text}</p>
      </div>`;
  }
  return '';
}

/* ------------------------------------------------------------------ */
/* Kaufbox                                                             */
/* ------------------------------------------------------------------ */
const PLAN_EXTRA = {
  abo: ['Dose ohne Aufpreis', 'Versandkostenfrei', 'Kündigen per Klick'],
  once: ['Dose mit 60 Fruchtgummis', 'Kein Abo'],
  refill: ['Für deine vorhandene Dose'],
  stock: ['3 × 30 Tage', 'Einzeln versiegelt']
};
function planCard(pl) {
  const note = pl.id === 'abo' ? `Nachfüller einzeln ${eur(refill.price)}` : '';
  return `<label class="plan" data-plan-card="${pl.id}">
    <input type="radio" name="plan" value="${pl.id}" ${pl.id === state.plan ? 'checked' : ''}>
    <span class="plan-body">
      <span class="plan-head"><b>${pl.label}</b>${pl.save ? `<em class="plan-save">${pl.save}</em>` : ''}${pl.id === 'abo' ? '<em class="plan-tip">Unsere Empfehlung</em>' : ''}</span>
      <span class="plan-sub">${pl.sub}</span>
      ${PLAN_EXTRA[pl.id] ? `<span class="plan-ticks">${PLAN_EXTRA[pl.id].map(x => `<i>${x}</i>`).join('')}</span>` : ''}
    </span>
    <span class="plan-price"><strong>${eur(pl.price)}</strong><small>${perKg(p, pl.id)}</small>${note ? `<small>${note}</small>` : ''}</span>
  </label>`;
}
function buyHTML() {
  const facts = p.facts.slice(0, 4);
  return `<div class="buy" id="buy">
    <p class="buy-eyebrow"><span>${p.goal}</span><span>${p.flavor}</span><span>30 Tage</span>${p.adultOnly ? '<span class="buy-18">18+</span>' : ''}</p>
    <h1 class="buy-title"><span class="buy-name">${NAME(p)}</span> <span class="buy-kind">${p.title}</span></h1>
    <p class="buy-lead">${d.hero.title.replace(/<\/?em>/g, '')} ${d.hero.sub}</p>
    <ul class="buy-facts">${facts.map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join('')}</ul>
    <p class="buy-claim">${p.claim}</p>
    ${p.warn ? `<p class="buy-warn" role="note"><b>Wichtig:</b> ${p.warn}</p>` : ''}
    <fieldset class="plans">
      <legend>Kaufart wählen</legend>
      ${plans.map(planCard).join('')}
    </fieldset>
    <div class="rhythm" id="rhythm">
      <p class="rhythm-label" id="rhythmLabel">Lieferung alle</p>
      <div class="rhythm-opts" role="radiogroup" aria-labelledby="rhythmLabel">
        ${[30, 45, 60].map(n => `<label><input type="radio" name="every" value="${n}" ${n === state.every ? 'checked' : ''}><span>${n} Tage</span></label>`).join('')}
      </div>
      <p class="rhythm-note">Reicht dir eine Dose länger, liefern wir seltener. Ändern, pausieren oder kündigen jederzeit.</p>
    </div>
    <div class="buy-row">
      <div class="qty qty-lg" role="group" aria-label="Menge">
        <button type="button" data-step="-1" aria-label="Eine weniger">−</button>
        <output id="qty" aria-live="polite">1</output>
        <button type="button" data-step="1" aria-label="Eine mehr">+</button>
      </div>
      <button class="btn btn-ink btn-buy" type="button" id="buyBtn"><span id="buyLabel">In den Warenkorb</span><span class="btn-sep" aria-hidden="true"></span><span id="buyPrice"></span></button>
    </div>
    <p class="buy-meta" id="buyMeta"></p>
    <ul class="assure">
      <li>${ICON.cancel}<span><b>Kündigen per Klick.</b> Keine Mindestlaufzeit, pausieren und tauschen jederzeit.</span></li>
      <li>${ICON.mail}<span><b>Nachfüller per Brief.</b> Flach genug für den Briefkasten, die Dose bleibt bei dir.</span></li>
      <li>${ICON.back}<span><b>14 Tage Widerrufsrecht.</b> Für ungeöffnete Ware mit unversehrtem Siegel.</span></li>
    </ul>
    <div class="buy-more">
      <details>
        <summary>Versand und Lieferung</summary>
        <p>Versand innerhalb Deutschlands ${eur(SHIPPING_COST)}, ab ${eur(SHIPPING_FREE)} Bestellwert und im Abo kostenlos. Die Dose kommt per Paket, Nachfüller kommen per Brief. Versand nach Österreich und in die Schweiz: Konditionen folgen zum Launch.</p>
      </details>
      <details>
        <summary>So funktioniert das Abo</summary>
        <p>Die erste Lieferung kommt mit Dose, danach kommt alle 30, 45 oder 60 Tage ein Nachfüller. Jede Lieferung kostet ${eur(abo.price)} und liegt damit 20 % unter dem Nachfüller-Preis von ${eur(refill.price)}. Rhythmus ändern, Sorte tauschen, pausieren oder kündigen geht jederzeit im Kundenkonto, Kündigen mit einem Klick.</p>
      </details>
      <details>
        <summary>Zahlarten</summary>
        <p>Geplant mit dem Shopify-Checkout: PayPal, Klarna (auch Kauf auf Rechnung), Kreditkarte, Apple Pay und Google Pay. Im Prototyp ist die Kasse noch nicht angebunden.</p>
      </details>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Seite zusammensetzen                                                */
/* ------------------------------------------------------------------ */
function nutrientCard([name, amt, nrv, claim]) {
  const [num, unit] = split(amt);
  const n = nrvNum(nrv);
  return `<article class="nut" data-reveal>
    <p class="nut-amt">${num}<span>${unit}</span></p>
    <h3 class="nut-name">${name}</h3>
    ${n === null
      ? '<p class="nut-nrv nut-none">Kein Nährstoffbezugswert festgelegt</p>'
      : `<div class="nut-bar" role="img" aria-label="${nrv} des Nährstoffbezugswerts"><span style="--v:${Math.min(n, 100) / 100}"></span>${n > 100 ? `<i>×${String(Math.round(n / 10) / 10).replace('.', ',')}</i>` : ''}</div>
         <p class="nut-nrv">${nrv} NRV*</p>`}
    ${claim ? `<p class="nut-claim">${claim}</p>` : ''}
  </article>`;
}

function crossCard(q) {
  const pa = planFor(q, 'abo');
  return `<a class="cross-card" href="${pdpUrl(q.id)}" style="${vars(q.id)}" data-reveal>
    <span class="cross-visual"><img class="cross-bear" src="${ASSETS(q.id).bust}" alt="" loading="lazy"><img class="cross-jar" src="${ASSETS(q.id).front}" alt="" loading="lazy"></span>
    <span class="cross-name">${NAME(q)}</span>
    <span class="cross-title">${q.title}</span>
    <span class="cross-short">${q.short}</span>
    <span class="cross-price">${eur(q.price)} · im Abo ${eur(pa.price)}</span>
    ${q.warn ? '<span class="cross-adult">Nur für Erwachsene</span>' : ''}
  </a>`;
}

function render() {
  const others = CREW.filter(q => q.id !== p.id);
  const setId = ['glow', 'snoozy'].includes(p.id) ? 'beautysleep' : 'crew';
  const set = BUNDLES[setId];
  const setWarn = warnFor(setId);
  const ticker = [...p.facts.map(([v, l]) => `${v} ${l}`), p.flavor, `${count(p)} Fruchtgummis`, 'Nachfüllbar per Brief', 'Same Bears. Better Days.'];
  const tickerHTML = ticker.map(x => `<span>${x}</span><i>✦</i>`).join('');
  const many = p.nutrients.length > 6;
  const months = 6;

  main.innerHTML = `
  <nav class="crumbs wrap" aria-label="Brotkrümel">
    <ol><li><a href="index.html">Start</a></li><li><a href="index.html#produkte">Produkte</a></li><li aria-current="page">${NAME(p)} ${p.title}</li></ol>
  </nav>

  <section class="pdp-top wrap" aria-label="${NAME(p)} kaufen">
    <div class="gallery">
      <div class="g-stage" id="gStage" role="tabpanel" aria-labelledby="vt-jar">${viewHTML('jar')}</div>
      <div class="g-thumbs" role="tablist" aria-label="Ansichten">
        ${VIEWS.map((v, i) => `<button type="button" class="vt" role="tab" id="vt-${v.id}" data-view="${v.id}" aria-selected="${i === 0}" aria-controls="gStage" tabindex="${i === 0 ? 0 : -1}">${v.thumb}<span>${v.label}</span></button>`).join('')}
      </div>
    </div>
    ${buyHTML()}
  </section>

  <div class="ticker" aria-hidden="true"><div class="ticker-track"><div class="ticker-set">${tickerHTML}</div><div class="ticker-set">${tickerHTML}</div></div></div>

  <section class="section meet" aria-labelledby="meetTitle">
    <div class="wrap meet-grid">
      <div class="meet-visual" data-reveal>
        <div class="meet-halo" aria-hidden="true"></div>
        <button class="meet-buddy" type="button" id="meetBuddy" aria-label="${NAME(p)} etwas sagen lassen">
          <img src="${a.character}" alt="" width="940" height="1040" loading="lazy">
        </button>
        <p class="meet-bubble" id="meetBubble" aria-live="polite">${d.lines[0]}</p>
      </div>
      <div class="meet-copy" data-reveal>
        <p class="eyebrow">Meet the bear</p>
        <h2 class="h2" id="meetTitle">Das ist <em>${NAME(p)}.</em></h2>
        <p class="lead">${p.persona}</p>
        <dl class="traits">${d.traits.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
        <p class="meet-hint">Tipp ${NAME(p)} an, da kommt noch mehr.</p>
      </div>
    </div>
  </section>

  <section class="section inside" id="inhalt" aria-labelledby="insideTitle">
    <div class="wrap">
      <header class="section-head" data-reveal>
        <p class="eyebrow">Was drin ist</p>
        <h2 class="h2" id="insideTitle">Pro Tagesportion. <em>Nichts versteckt.</em></h2>
        <p class="lead">Alle Mengen gelten für ${f.perDay} Fruchtgummis. Der Balken zeigt den Anteil am Nährstoffbezugswert (NRV), daneben steht die zugelassene Angabe, wörtlich.</p>
      </header>
      <div class="nuts ${many ? 'nuts-many' : ''}">${p.nutrients.map(nutrientCard).join('')}</div>
      <p class="footnote">* NRV = Nährstoffbezugswert nach Verordnung (EU) 1169/2011. Angaben nach Verordnung (EU) 432/2012.</p>
    </div>
  </section>

  <section class="section ritual" aria-labelledby="ritualTitle">
    <div class="wrap">
      <header class="section-head" data-reveal>
        <p class="eyebrow">So nimmst du ${NAME(p)}</p>
        <h2 class="h2" id="ritualTitle">${d.ritual.time} Uhr. <em>${d.ritual.moment}.</em></h2>
      </header>
      <ol class="steps">
        ${d.ritual.steps.map(([h, txt], i) => `<li class="step" data-reveal>
          <span class="step-art" aria-hidden="true">${i === 0 ? gummies(f.perDay, 'step-gummy') : i === 1 ? `<span class="step-num">${f.perDay}</span>` : `<img src="${a.front}" alt="">`}</span>
          <span class="step-n">0${i + 1}</span>
          <h3>${h}</h3>
          <p>${txt}</p>
        </li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="section calc" id="rechner" aria-labelledby="calcTitle">
    <div class="wrap calc-grid">
      <div data-reveal>
        <p class="eyebrow">Abo-Rechner</p>
        <h2 class="h2" id="calcTitle">Rechne selbst <em>nach.</em></h2>
        <p class="lead">Einzeln kaufen mit Versand gegen das Abo, ohne Kleingedrucktes. Gerechnet mit einer Dose pro 30 Tage.</p>
        <div class="calc-input">
          <label for="calcMonths">Wie lange möchtest du ${NAME(p)} nehmen?</label>
          <div class="calc-slider"><input type="range" id="calcMonths" min="1" max="12" step="1" value="${months}"><output id="calcOut" for="calcMonths">${months} Monate</output></div>
        </div>
      </div>
      <div class="calc-card" data-reveal>
        <div class="calc-row"><span>Einzeln kaufen</span><strong id="calcOnce"></strong><small id="calcOnceNote"></small></div>
        <div class="calc-row calc-abo"><span>Im Abo</span><strong id="calcAbo"></strong><small id="calcAboNote"></small></div>
        <div class="calc-save"><span>Du sparst</span><strong id="calcSave"></strong></div>
        <button class="btn btn-ink btn-block" type="button" data-add="${p.id}" data-plan="abo">Abo starten · ${eur(abo.price)} je Lieferung</button>
        <p class="calc-fine">Inkl. MwSt. Einzelkauf: erste Dose ${eur(p.price)}, danach Nachfüller je ${eur(refill.price)}, je Bestellung ${eur(SHIPPING_COST)} Versand. Ohne Vorrats-Pakete gerechnet.</p>
      </div>
    </div>
  </section>

  <section class="section facts-full" id="naehrwerte" aria-labelledby="factsTitle">
    <div class="wrap facts-grid">
      <div data-reveal>
        <p class="eyebrow">Nährwerte und Pflichtangaben</p>
        <h2 class="h2" id="factsTitle">Alles, was auf <em>der Dose steht.</em></h2>
        <p class="lead">Auch das Kleingedruckte. Die Rückseite der Dose kannst du oben auch selbst drehen.</p>
        <button class="btn btn-ghost" type="button" id="showBack">Rückseite der Dose zeigen</button>
      </div>
      <div class="facts-body" data-reveal>
        <table class="nutri">
          <caption>Pro Tagesportion (${f.perDay} Fruchtgummis)</caption>
          <thead><tr><th scope="col">Nährstoff</th><th scope="col">Menge</th><th scope="col">% NRV*</th></tr></thead>
          <tbody>${p.nutrients.map(([n, am, r]) => `<tr><th scope="row">${n}</th><td>${am}</td><td>${r}</td></tr>`).join('')}</tbody>
        </table>
        <dl class="mandatory">
          <div><dt>Bezeichnung</dt><dd>${f.legal}</dd></div>
          <div><dt>Füllmenge</dt><dd>${count(p)} Fruchtgummis = ${netGrams(p, 'once')} g</dd></div>
          <div><dt>Verzehrempfehlung</dt><dd>${p.serving}. ${f.perDay} Fruchtgummis entsprechen einer Tagesportion.</dd></div>
          ${p.warn ? `<div><dt>Warnhinweis</dt><dd>${p.warn}</dd></div>` : ''}
          <div><dt>Hinweise</dt><dd>Die angegebene empfohlene tägliche Verzehrsmenge darf nicht überschritten werden. Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung und eine gesunde Lebensweise. Außerhalb der Reichweite von kleinen Kindern aufbewahren.</dd></div>
          <div><dt>Zutaten und Allergene</dt><dd>Folgen mit der finalen Rezeptur des Herstellers. Geplant mit Pektin statt Gelatine.</dd></div>
          <div><dt>Aufbewahrung</dt><dd>Trocken und nicht über 25 °C lagern. Dose nach dem Öffnen gut verschließen.</dd></div>
          <div><dt>Inverkehrbringer</dt><dd>bärly, Anschrift folgt</dd></div>
        </dl>
        <p class="footnote">* NRV = Nährstoffbezugswert nach Verordnung (EU) 1169/2011. Mengen und Gewichte sind Richtwerte, bis der Hersteller sie bestätigt.</p>
      </div>
    </div>
  </section>

  <section class="section reviews" aria-labelledby="reviewsTitle">
    <div class="wrap reviews-grid" data-reveal>
      <div>
        <p class="eyebrow">Bewertungen</p>
        <h2 class="h2" id="reviewsTitle">Noch keine Sterne. <em>Mit Absicht.</em></h2>
      </div>
      <div>
        <p class="lead">${NAME(p)} ist noch nicht im Handel. Sobald es die ersten Bewertungen gibt, stehen sie hier, und zwar nur von Kundinnen und Kunden, die ${NAME(p)} bei uns gekauft haben. Keine gekauften Bewertungen, keine Sterne aus dem Nichts.</p>
        <a class="btn btn-ink" href="index.html#founders">Früh dabei sein: Founders Club</a>
      </div>
    </div>
  </section>

  <section class="section pdp-faq" aria-labelledby="pdpFaqTitle">
    <div class="wrap faq-grid">
      <div data-reveal>
        <p class="eyebrow">Fragen zu ${NAME(p)}</p>
        <h2 class="h2" id="pdpFaqTitle">Gut, dass <em>du fragst.</em></h2>
      </div>
      <div class="faq-list">
        ${[...d.faq, ['Wie funktioniert das Abo?', `Die erste Lieferung kommt mit Dose, danach alle 30, 45 oder 60 Tage ein Nachfüller per Brief, je ${eur(abo.price)}. Pausieren, tauschen und kündigen geht jederzeit, ohne Mindestlaufzeit.`]]
          .map(([q, ans]) => `<details><summary>${q}</summary><p>${ans}</p></details>`).join('')}
      </div>
    </div>
  </section>

  <section class="section cross" aria-labelledby="crossTitle">
    <div class="wrap">
      <header class="section-head" data-reveal>
        <p class="eyebrow">Passt dazu</p>
        <h2 class="h2" id="crossTitle">Der Rest <em>der Crew.</em></h2>
      </header>
      <div class="cross-grid">
        ${others.map(crossCard).join('')}
        <div class="cross-set" style="${vars(set.members[1] || p.id)}" data-reveal>
          <div class="cross-set-visual">${set.members.map(id => `<img src="${ASSETS(id).front}" alt="" loading="lazy">`).join('')}</div>
          <p class="cross-name">Set</p>
          <h3 class="cross-title">${set.name}</h3>
          <p class="cross-short">${set.title}.</p>
          ${setWarn ? `<p class="cross-adult">SNOOZY: ${setWarn}</p>` : ''}
          <p class="cross-price"><s>${eur(memberSum(set))}</s> ${eur(set.price)}</p>
          <button class="btn btn-ink btn-sm" type="button" data-bundle="${set.id}">Set in den Warenkorb</button>
        </div>
      </div>
      <p class="price-note">${PRICE_NOTE}</p>
    </div>
  </section>`;

  /* Leiste, die beim Scrollen die Kaufbox ersetzt */
  document.body.insertAdjacentHTML('beforeend', `<div class="sticky-buy" id="stickyBuy" style="${vars(p.id)}" aria-hidden="true">
    <div class="wrap sticky-inner">
      <img src="${a.bust}" alt="" width="600" height="510">
      <p class="sticky-name"><b>${NAME(p)}</b><span id="stickyPlan"></span></p>
      <button class="btn btn-ink" type="button" id="stickyBtn" tabindex="-1">In den Warenkorb · <span id="stickyPrice"></span></button>
    </div>
  </div>`);

  /* Strukturierte Daten für Suchmaschinen: Produkt mit Preis, ohne Bewertungen */
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product',
    name: `bärly ${NAME(p)} ${p.title}`, brand: { '@type': 'Brand', name: 'bärly' },
    description: `${p.short} ${p.flavor}, ${count(p)} Fruchtgummis für 30 Tage.`,
    image: new URL(a.front, location.href).href,
    offers: { '@type': 'Offer', priceCurrency: 'EUR', price: p.price.toFixed(2), availability: 'https://schema.org/PreOrder' }
  });
  document.head.appendChild(ld);
}

/* ------------------------------------------------------------------ */
/* 360°-Dose: Zylinder aus Streifen, Textur = Etiketten-Abwicklung      */
/* ------------------------------------------------------------------ */
const FACES = [[0, 'Vorderseite'], [95, `Seite mit ${NAME(p)}`], [185, 'Rückseite mit Nährwerten'], [270, 'Seite mit Kurzinfos']];
const norm = (x) => ((x % 360) + 540) % 360 - 180;     // auf −180…180
let jar = null;

function initJar() {
  const view = $('#j3View');
  if (!view) return;
  const rot = $('#j3Rot');
  const N = 60;                                          // Streifen pro Ring: genug für eine glatte Rundung
  const strips = [];
  let alpha = 0, vel = 0, raf = 0, dragging = false, idle = !reduced, idleStart = 0, intro = !reduced;
  let lastX = 0, lastT = 0, built = false;

  function build() {
    const w = view.clientWidth, h = view.clientHeight;
    if (!w || !h) return;
    const ratio = (big ? 150 : 100) / 70;                    // Körperhöhe / Durchmesser
    const capF = 46 / 188, neckF = 6 / 188;
    const D = Math.min(w * .4, h * .64 / (ratio + capF + neckF));   // Perspektive vergrößert die Front um gut 10 %
    const R = D / 2, bodyH = D * ratio, capH = D * capF, neckH = D * neckF;
    const capR = R * 184 / 188, neckR = R * 172 / 188;
    const total = capH + neckH + bodyH;
    const seg = 2 * R * Math.sin(Math.PI / N);
    const segC = 2 * capR * Math.sin(Math.PI / N);
    const segN = 2 * neckR * Math.sin(Math.PI / N);
    rot.style.width = `${D}px`;
    rot.style.height = `${total}px`;
    view.style.setProperty('--jarc', p.pack.jar);
    const body = (k) => {
      const ang = packs.WRAP_SEAM + (k + .5) * 360 / N;
      return { ang, html: `<div class="j3-s j3-body" style="width:${seg + .8}px;height:${bodyH}px;left:${(D - seg - .8) / 2}px;top:${capH + neckH}px;background-size:${seg * N}px ${bodyH}px;background-position:${-k * seg}px 0;transform:rotateY(${ang}deg) translateZ(${R * Math.cos(Math.PI / N)}px)"></div>` };
    };
    const cap = (k) => {
      const ang = (k + .5) * 360 / N;
      return { ang, html: `<div class="j3-s j3-cap" style="width:${segC + .8}px;height:${capH}px;left:${(D - segC - .8) / 2}px;top:0;transform:rotateY(${ang}deg) translateZ(${capR * Math.cos(Math.PI / N)}px)"></div>` };
    };
    const neck = (k) => {
      const ang = (k + .5) * 360 / N;
      return { ang, html: `<div class="j3-s j3-neck" style="width:${segN + .8}px;height:${neckH + 1}px;left:${(D - segN - .8) / 2}px;top:${capH - .5}px;transform:rotateY(${ang}deg) translateZ(${neckR * Math.cos(Math.PI / N)}px)"></div>` };
    };
    const parts = [];
    for (let k = 0; k < N; k++) parts.push(body(k), cap(k), neck(k));
    rot.innerHTML = parts.map(x => x.html).join('') +
      `<div class="j3-top" style="width:${capR * 2}px;height:${capR * 2}px;left:${R - capR}px;top:${-capR}px"></div>`;
    strips.length = 0;
    $$('.j3-s', rot).forEach((el, i) => strips.push({ el, ang: parts[i].ang }));
    built = true;
    paint();
  }

  /* Licht von links vorne: dunkler, je weiter ein Streifen wegdreht, dazu ein weicher Glanz */
  function paint() {
    rot.style.transform = `rotateX(-11deg) rotateY(${alpha}deg)`;
    for (const s of strips) {
      const phi = norm(s.ang + alpha);
      if (Math.abs(phi) > 100) continue;
      const lam = Math.max(0, Math.cos((phi + 28) * Math.PI / 180));
      const spec = Math.exp(-(((phi + 24) / 15) ** 2));
      s.el.style.setProperty('--sh', (0.36 * (1 - lam)).toFixed(3));
      s.el.style.setProperty('--sp', (0.32 * spec).toFixed(3));
    }
    const front = ((Math.round(-alpha) % 360) + 360) % 360;
    const near = FACES.reduce((best, fc) => Math.abs(norm(fc[0] - front)) < Math.abs(norm(best[0] - front)) ? fc : best);
    view.setAttribute('aria-valuenow', String(front));
    view.setAttribute('aria-valuetext', near[1]);
    $$('.j3-jump button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.face === near[0])));
  }

  function loop(now) {
    raf = 0;
    if (dragging) return;                                   // beim Ziehen malt pointermove
    if (intro) {
      // Einmal schwungvoll drehen, damit klar ist: die Dose ist rund
      if (!idleStart) idleStart = now;
      const k = Math.min(1, (now - idleStart) / 1800);
      alpha = 220 - 220 * (1 - (1 - k) ** 3);
      if (k >= 1) { intro = false; idleStart = now; alpha = 0; }
    } else if (Math.abs(vel) > .02) {
      alpha += vel; vel *= .94;                             // Schwung nach dem Loslassen
    } else if (idle) {
      alpha = Math.sin((now - idleStart) / 1600) * 14;      // leichtes Pendeln, bis jemand anfasst
    } else {
      return;
    }
    paint();
    raf = requestAnimationFrame(loop);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

  let tween = 0;
  function turnTo(face) {
    // kürzester Weg zur gewünschten Seite
    idle = false; intro = false; vel = 0;
    cancelAnimationFrame(tween);
    const from = alpha, to = alpha + norm(-face - alpha);
    if (reduced) { alpha = to; paint(); return; }
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 700);
      alpha = from + (to - from) * (1 - (1 - k) ** 3);
      paint();
      if (k < 1) tween = requestAnimationFrame(step);
    };
    tween = requestAnimationFrame(step);
  }

  view.addEventListener('pointerdown', e => {
    dragging = true; idle = false; intro = false; vel = 0;
    cancelAnimationFrame(tween);
    lastX = e.clientX; lastT = performance.now();
    view.setPointerCapture(e.pointerId);
    view.classList.add('is-grabbing');
    kick();
  });
  view.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const now = performance.now();
    alpha += dx * .55;
    vel = dx * .55 * Math.min(1, 16 / Math.max(1, now - lastT));
    lastX = e.clientX; lastT = now;
    paint();
  });
  const end = () => { if (!dragging) return; dragging = false; view.classList.remove('is-grabbing'); kick(); };
  view.addEventListener('pointerup', end);
  view.addEventListener('pointercancel', end);
  view.addEventListener('keydown', e => {
    const front = -alpha;
    if (e.key === 'ArrowRight') { e.preventDefault(); turnTo(front + 30); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); turnTo(front - 30); }
    if (e.key === 'Home') { e.preventDefault(); turnTo(0); }
    if (e.key === 'End') { e.preventDefault(); turnTo(185); }
  });
  $('.j3-jump').addEventListener('click', e => {
    const b = e.target.closest('[data-face]');
    if (b) turnTo(+b.dataset.face);
  });

  /* Textur laden; klappt das nicht, bleibt das flache Produktbild stehen */
  const img = new Image();
  img.onload = () => {
    view.style.setProperty('--wrap', `url("${a.wrap}")`);
    view.classList.add('is-3d');
    build();
    whenVisible(view, () => { idleStart = 0; kick(); }, '0px');
  };
  img.src = a.wrap;
  let lastW = 0;
  const ro = new ResizeObserver(() => { if (built && view.clientWidth !== lastW) { lastW = view.clientWidth; build(); } });
  ro.observe(view);
  jar = { turnTo, stop: () => { cancelAnimationFrame(raf); cancelAnimationFrame(tween); raf = 0; ro.disconnect(); } };
}

/* ------------------------------------------------------------------ */
/* Galerie umschalten                                                  */
/* ------------------------------------------------------------------ */
function initGallery() {
  const stage = $('#gStage');
  const tabs = $$('.vt');
  const show = (id, focus) => {
    if (jar && id !== 'jar') { jar.stop(); jar = null; }
    stage.innerHTML = viewHTML(id);
    stage.setAttribute('aria-labelledby', `vt-${id}`);
    stage.dataset.view = id;
    tabs.forEach(tb => { const on = tb.dataset.view === id; tb.setAttribute('aria-selected', String(on)); tb.tabIndex = on ? 0 : -1; });
    if (focus) $(`#vt-${id}`).focus();
    window.Shop.hydrateSlots(stage);
    if (id === 'jar') initJar();
  };
  $('.g-thumbs').addEventListener('click', e => { const b = e.target.closest('.vt'); if (b) show(b.dataset.view); });
  $('.g-thumbs').addEventListener('keydown', e => {
    const i = tabs.findIndex(tb => tb.getAttribute('aria-selected') === 'true');
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    show(tabs[(i + step + tabs.length) % tabs.length].dataset.view, true);
  });
  stage.dataset.view = 'jar';
  initJar();
  return show;
}

/* ------------------------------------------------------------------ */
/* Kaufbox und Leiste                                                  */
/* ------------------------------------------------------------------ */
function initBuy() {
  const buy = $('#buy');
  const rhythm = $('#rhythm');
  const sticky = $('#stickyBuy');
  const update = () => {
    const pl = planFor(p, state.plan);
    const total = pl.price * state.qty;
    $('#qty').textContent = state.qty;
    $('#buyLabel').textContent = state.plan === 'abo' ? 'Abo starten' : 'In den Warenkorb';
    $('#buyPrice').textContent = eur(total);
    $('#stickyPrice').textContent = eur(total);
    $('#stickyPlan').textContent = `${pl.label}${state.plan === 'abo' ? `, alle ${state.every} Tage` : ''}${state.qty > 1 ? ` · ${state.qty} ×` : ''}`;
    const ship = state.plan === 'abo' || total >= SHIPPING_FREE ? 'versandkostenfrei' : `zzgl. ${eur(SHIPPING_COST)} Versand (ab ${eur(SHIPPING_FREE)} frei)`;
    $('#buyMeta').textContent = `${state.qty > 1 ? `${state.qty} × ${eur(pl.price)} · ` : ''}Grundpreis ${perKg(p, state.plan)} · ${state.plan === 'stock' ? '3 × ' : ''}${count(p)} Fruchtgummis = ${netGrams(p, state.plan)} g · inkl. MwSt., ${ship}`;
    rhythm.hidden = !pl.every;
    $$('[data-plan-card]', buy).forEach(c => c.classList.toggle('is-on', c.dataset.planCard === state.plan));
  };
  buy.addEventListener('change', e => {
    if (e.target.name === 'plan') state.plan = e.target.value;
    if (e.target.name === 'every') state.every = +e.target.value;
    update();
  });
  buy.addEventListener('click', e => {
    const s = e.target.closest('[data-step]');
    if (s) { state.qty = Math.min(9, Math.max(1, state.qty + +s.dataset.step)); update(); }
  });
  const add = () => addToCart(p.id, state.plan, { qty: state.qty, every: planFor(p, state.plan).every ? state.every : 0 });
  $('#buyBtn').addEventListener('click', add);
  $('#stickyBtn').addEventListener('click', add);
  update();

  /* Leiste zeigen, sobald der Kaufknopf aus dem Bild ist (und nicht ganz unten) */
  if ('IntersectionObserver' in window) {
    let pastBuy = false, atFooter = false;
    const sync = () => {
      const on = pastBuy && !atFooter;
      sticky.classList.toggle('show', on);
      sticky.setAttribute('aria-hidden', String(!on));
      $('#stickyBtn').tabIndex = on ? 0 : -1;
    };
    new IntersectionObserver(([en]) => { pastBuy = !en.isIntersecting && en.boundingClientRect.top < 0; sync(); }).observe($('.buy-row'));
    new IntersectionObserver(([en]) => { atFooter = en.isIntersecting; sync(); }).observe($('.footer'));
  }
}

/* ------------------------------------------------------------------ */
/* Maskottchen, Nährstoffe, Rechner, Rückseite                         */
/* ------------------------------------------------------------------ */
function initMeet() {
  const buddy = $('#meetBuddy');
  const bubble = $('#meetBubble');
  let k = 0;
  buddy.addEventListener('click', () => {
    k = (k + 1) % d.lines.length;
    bubble.textContent = d.lines[k];
    buddy.classList.remove('squish'); bubble.classList.remove('pop');
    void buddy.offsetWidth;
    buddy.classList.add('squish'); bubble.classList.add('pop');
  });
  /* Der Bär dreht sich leicht zur Maus */
  if (!reduced && matchMedia('(pointer: fine)').matches) {
    const box = $('.meet-visual');
    let raf = 0, x = 0, y = 0;
    $('.meet').addEventListener('pointermove', e => {
      const r = box.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width)));
      y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height)));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; box.style.setProperty('--tx', x.toFixed(3)); box.style.setProperty('--ty', y.toFixed(3)); });
    });
    $('.meet').addEventListener('pointerleave', () => { box.style.setProperty('--tx', 0); box.style.setProperty('--ty', 0); });
  }
}

function initNutrients() {
  $$('.nut-bar').forEach(bar => whenVisible(bar, () => bar.classList.add('fill')));
}

function initCalc() {
  const range = $('#calcMonths');
  const shown = { once: 0, abo: 0, save: 0 };
  let raf = 0;
  const animateTo = (target) => {
    cancelAnimationFrame(raf);
    const from = { ...shown };
    const t0 = performance.now();
    const step = (now) => {
      const k = reduced ? 1 : Math.min(1, (now - t0) / 450);
      const e = 1 - (1 - k) ** 3;
      for (const key of Object.keys(shown)) shown[key] = from[key] + (target[key] - from[key]) * e;
      $('#calcOnce').textContent = eur(shown.once);
      $('#calcAbo').textContent = eur(shown.abo);
      $('#calcSave').textContent = eur(shown.save);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  const calc = () => {
    const m = +range.value;
    const shipEach = (price) => price >= SHIPPING_FREE ? 0 : SHIPPING_COST;
    const once = p.price + shipEach(p.price) + (m - 1) * (refill.price + shipEach(refill.price));
    const sub = m * abo.price;
    $('#calcOut').textContent = `${m} ${m === 1 ? 'Monat' : 'Monate'}`;
    range.setAttribute('aria-valuetext', `${m} ${m === 1 ? 'Monat' : 'Monate'}`);
    $('#calcOnceNote').textContent = `1 Dose${m > 1 ? ` + ${m - 1} Nachfüller` : ''} + ${m} × Versand`;
    $('#calcAboNote').textContent = `${m} ${m === 1 ? 'Lieferung' : 'Lieferungen'}, Dose und Versand inklusive`;
    animateTo({ once, abo: sub, save: once - sub });
  };
  range.addEventListener('input', calc);
  whenVisible(range, calc, '0px');
  // Vorbelegen, falls der Beobachter nicht feuert (z. B. Druckansicht)
  $('#calcOnce').textContent = $('#calcAbo').textContent = $('#calcSave').textContent = '–';
}

function initBack(showView) {
  $('#showBack').addEventListener('click', () => {
    if ($('#gStage').dataset.view !== 'jar') showView('jar');
    $('.gallery').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => { jar?.turnTo(185); $('#j3View')?.focus({ preventScroll: true }); }, reduced ? 0 : 450);
  });
}

/* Start */
render();
const showView = initGallery();
initBuy();
initMeet();
initNutrients();
initCalc();
initBack(showView);
ready();
})();
