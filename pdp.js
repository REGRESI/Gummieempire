/* bärly – Produktseite (eine Datei für alle vier Sorten)
   Welche Sorte gezeigt wird, steht in <main data-product="…">. Braucht brand.js und shop.js.
   Bilder kommen ausschließlich aus den freigegebenen Dateien (Packshot + Charakter).
   Aufbau: Galerie + Kaufbox, Nutzenleiste, Warum, Inhaltsstoffe, Angaben und Pflichtangaben,
   Einnahme, Meet the bear, Abo, Bewertungen (ehrlich leer bis zum Launch), FAQ, Crew. */

(() => {
'use strict';

const { eur, byId, BUNDLES, PACK_INFO, PDP, ASSETS, pdpUrl, plansFor, planFor, netGrams } = window.Baerly;
const { CREW, SHIPPING_COST, SHIPPING_FREE, PRICE_NOTE, $, $$, reduced, NAME, vars, perKg, count, memberSum, warnFor,
  addToCart, whenVisible, shot, bearImg, avatar, go: link, ready } = window.Shop;

const main = $('main[data-product]');
const p = byId[main?.dataset.product];
if (!p || !p.launch) return;
const d = PDP[p.id];
const f = PACK_INFO[p.id];
const plans = plansFor(p);
const refill = planFor(p, 'refill');
const abo = planFor(p, 'abo');
const state = { plan: 'abo', every: 30, qty: 1 };

main.setAttribute('style', vars(p.id));
document.title = `${NAME(p)} ${p.title} · bärly`;

/* ------------------------------------------------------------------ */
/* Kleine Bausteine                                                    */
/* ------------------------------------------------------------------ */
const ICON = {
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v6M14 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7H5V3M5.6 7A8 8 0 1 1 4 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  card: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.5"/></svg>',
  check: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
const split = (amt) => { const i = amt.lastIndexOf(' '); return i > 0 ? [amt.slice(0, i), amt.slice(i + 1)] : [amt, '']; };
const nrvNum = (s) => { const n = parseFloat(String(s).replace('.', '').replace(',', '.')); return Number.isFinite(n) ? n : null; };
const points = p.facts.filter(([, l]) => !/pro Tag|vor dem Schlafen/.test(l)).slice(0, 3);

/* ------------------------------------------------------------------ */
/* Galerie: nur Packshot und Charakter, als Kompositionen               */
/* ------------------------------------------------------------------ */
const VIEWS = [
  { id: 'shot', label: 'Dose', thumb: shot(p.id, '', false) },
  { id: 'duo', label: `Mit ${NAME(p)}`, thumb: `<span class="vt-duo">${shot(p.id, '', false)}${bearImg(p.id, '', false)}</span>` },
  { id: 'bear', label: NAME(p), thumb: avatar(p.id, false) }
];
function viewHTML(id) {
  if (id === 'shot') return `<div class="g-view g-shot">${shot(p.id, `Dose ${NAME(p)} ${p.title}, ${count(p)} Fruchtgummis, ${p.flavor}`, false).replace('<img ', '<img fetchpriority="high" ')}</div>`;
  if (id === 'duo') return `<div class="g-view g-duo atmo">${shot(p.id, `Dose ${NAME(p)} ${p.title}`, false)}${bearImg(p.id, '', false)}</div>`;
  return `<div class="g-view g-bear atmo">${bearImg(p.id, `${NAME(p)}: ${p.look}`, false)}<p class="g-caption"><b>${NAME(p)}</b> · ${d.traits[0][1]}</p></div>`;
}

/* ------------------------------------------------------------------ */
/* Kaufbox                                                             */
/* ------------------------------------------------------------------ */
function buyHTML() {
  const once = planFor(p, 'once');
  const more = plans.filter(pl => pl.id === 'refill' || pl.id === 'stock');
  return `<div class="buy" id="buy">
    <p class="buy-eyebrow">${p.goal} · Nahrungsergänzungsmittel${p.adultOnly ? ' · <b>18+</b>' : ''}</p>
    <h1 class="buy-title"><span class="buy-name">${NAME(p)}</span><span class="buy-kind">${p.title}</span></h1>
    <p class="buy-lead">${d.hero.sub}</p>
    <ul class="buy-points">${points.map(([v, l]) => `<li>${ICON.check}<span><b>${v}</b> ${l}</span></li>`).join('')}</ul>
    <p class="buy-meta-line">${p.flavor} · ${count(p)} Fruchtgummis · 30 Tage</p>
    <p class="buy-claim">${p.claim}</p>
    ${p.warn ? `<p class="buy-warn" role="note"><b>Wichtig:</b> ${p.warn}</p>` : ''}

    <fieldset class="plans">
      <legend class="sr-only">Kaufart wählen</legend>
      <label class="plan plan-abo is-on" data-plan-card="abo">
        <span class="plan-top">
          <input type="radio" name="plan" value="abo" checked>
          <span class="plan-label"><b>Abo</b><em class="plan-save">20 % sparen</em></span>
          <span class="plan-price"><strong>${eur(abo.price)}</strong><small>je Lieferung · ${perKg(p, 'abo')}</small></span>
        </span>
        <span class="plan-detail">
          <span class="plan-sub">Erste Lieferung mit Dose, danach Nachfüller per Brief. Jede Lieferung 20 % unter dem Nachfüller-Einzelpreis von ${eur(refill.price)}.</span>
          <span class="plan-ticks"><i>${ICON.check}Versandkostenfrei</i><i>${ICON.check}Jederzeit pausieren</i><i>${ICON.check}Jederzeit kündbar</i><i>${ICON.check}Dose ohne Aufpreis</i></span>
        </span>
      </label>
      <div class="rhythm" id="rhythm">
        <span class="rhythm-label" id="rhythmLabel">Lieferintervall</span>
        <span class="rhythm-opts" role="radiogroup" aria-labelledby="rhythmLabel">
          ${[30, 45, 60].map(n => `<span class="rhythm-opt"><input type="radio" name="every" value="${n}" id="every${n}" ${n === state.every ? 'checked' : ''}><label for="every${n}">${n} Tage</label></span>`).join('')}
        </span>
      </div>
      <label class="plan plan-once" data-plan-card="once">
        <span class="plan-top">
          <input type="radio" name="plan" value="once">
          <span class="plan-label"><b>Einmal kaufen</b></span>
          <span class="plan-price"><strong>${eur(once.price)}</strong><small>${perKg(p, 'once')}</small></span>
        </span>
        <span class="plan-detail"><span class="plan-sub">Dose mit ${count(p)} Fruchtgummis für 30 Tage. Kein Abo.</span></span>
      </label>
      ${more.length ? `<details class="plan-more">
        <summary>Weitere Optionen: ${more.map(pl => pl.label).join(', ')}</summary>
        ${more.map(pl => `<label class="plan plan-small" data-plan-card="${pl.id}">
          <span class="plan-top">
            <input type="radio" name="plan" value="${pl.id}">
            <span class="plan-label"><b>${pl.label}</b>${pl.id === 'stock' && pl.save ? `<em class="plan-save">${pl.save}</em>` : ''}</span>
            <span class="plan-price"><strong>${eur(pl.price)}</strong><small>${perKg(p, pl.id)}</small></span>
          </span>
          <span class="plan-detail"><span class="plan-sub">${pl.sub}</span></span>
        </label>`).join('')}
      </details>` : ''}
    </fieldset>

    <div class="buy-row">
      <div class="qty qty-lg" role="group" aria-label="Menge">
        <button type="button" data-step="-1" aria-label="Eine weniger">−</button>
        <output id="qty" aria-live="polite">1</output>
        <button type="button" data-step="1" aria-label="Eine mehr">+</button>
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
function nutrientCard([name, amt, nrv]) {
  const [num, unit] = split(amt);
  const n = nrvNum(nrv);
  return `<article class="nut" data-reveal>
    <p class="nut-amt">${num}<span>${unit}</span></p>
    <h3 class="nut-name">${name}</h3>
    ${n === null
      ? '<p class="nut-nrv nut-none">Kein Nährstoffbezugswert festgelegt</p>'
      : `<div class="nut-bar" role="img" aria-label="${nrv} des Nährstoffbezugswerts"><span style="--v:${Math.min(n, 100) / 100}"></span></div>
         <p class="nut-nrv">${nrv} NRV*</p>`}
  </article>`;
}

function crossCard(q) {
  const pa = planFor(q, 'abo');
  return `<a class="cross-card" ${link(pdpUrl(q.id))} style="${vars(q.id)}" data-reveal>
    <span class="cross-visual">${shot(q.id)}${bearImg(q.id, '', true, 'cross-bear')}</span>
    <span class="cross-intro">${avatar(q.id)}<span>„${PDP[q.id].lines[0]}“</span></span>
    <span class="cross-name">${NAME(q)}</span>
    <span class="cross-title">${q.title}</span>
    <span class="cross-short">${q.short}</span>
    <span class="cross-price">${eur(q.price)} (${perKg(q, 'once')}) · im Abo ${eur(pa.price)} (${perKg(q, 'abo')})</span>
    ${q.adultOnly ? '<span class="cross-adult">Nur für Erwachsene</span>' : ''}
  </a>`;
}

function render() {
  const others = CREW.filter(q => q.id !== p.id);
  const setId = ['glow', 'snoozy'].includes(p.id) ? 'beautysleep' : 'crew';
  const set = BUNDLES[setId];
  const setWarn = warnFor(setId);
  const claims = [...new Set(p.nutrients.map(n => n[3]).filter(Boolean))];
  const strip = [...points.map(([v, l]) => `${v} ${l}`), `${f.perDay} Gummies ${p.id === 'snoozy' ? 'am Abend' : 'am Tag'}`];
  const months = 6;

  main.innerHTML = `
  <nav class="crumbs wrap" aria-label="Brotkrümel">
    <ol><li><a ${link('index.html')}>Start</a></li><li><a ${link('index.html#produkte')}>Produkte</a></li><li aria-current="page">${NAME(p)} ${p.title}</li></ol>
  </nav>

  <section class="pdp-top wrap" aria-label="${NAME(p)} kaufen">
    <div class="gallery">
      <div class="g-stage" id="gStage" role="tabpanel" aria-labelledby="vt-shot" data-view="shot">${viewHTML('shot')}</div>
      <div class="g-thumbs" role="tablist" aria-label="Ansichten">
        ${VIEWS.map((v, i) => `<button type="button" class="vt" role="tab" id="vt-${v.id}" data-view="${v.id}" aria-selected="${i === 0}" aria-controls="gStage" tabindex="${i === 0 ? 0 : -1}"><span class="vt-img" aria-hidden="true">${v.thumb}</span><span class="vt-label">${v.label}</span></button>`).join('')}
      </div>
    </div>
    ${buyHTML()}
  </section>

  <ul class="strip wrap" aria-label="Auf einen Blick">${strip.map(x => `<li>${x}</li>`).join('')}</ul>

  <section class="section why-pdp" aria-labelledby="whyTitle">
    <div class="wrap why-pdp-grid">
      <div data-reveal>
        <p class="eyebrow">Warum ${NAME(p)}?</p>
        <h2 class="h2" id="whyTitle">${d.hero.title}</h2>
        <p class="lead">${p.story}</p>
        ${p.warn ? `<p class="why-warn">${p.warn}</p>` : ''}
      </div>
      <div class="why-visual" data-reveal>${shot(p.id)}</div>
    </div>
  </section>

  <section class="section inside" id="inhalt" aria-labelledby="insideTitle">
    <div class="wrap">
      <header class="section-head" data-reveal>
        <p class="eyebrow">Inhaltsstoffe</p>
        <h2 class="h2" id="insideTitle">Pro Tagesportion. <em>Nichts versteckt.</em></h2>
        <p class="lead">Alle Mengen gelten für ${f.perDay} Fruchtgummis. Der Balken zeigt den Anteil am Nährstoffbezugswert (NRV).</p>
      </header>
      <div class="nuts ${p.nutrients.length > 6 ? 'nuts-many' : ''}">${p.nutrients.map(nutrientCard).join('')}</div>
    </div>
  </section>

  <section class="section facts-full" id="naehrwerte" aria-labelledby="factsTitle">
    <div class="wrap facts-grid">
      <div data-reveal>
        <p class="eyebrow">Was belegt ist</p>
        <h2 class="h2" id="factsTitle">Zugelassene Angaben, <em>im Wortlaut.</em></h2>
        <ul class="claims">${claims.map(c => `<li>${c}</li>`).join('')}</ul>
        <p class="footnote">Gesundheitsbezogene Angaben nach Verordnung (EU) 432/2012. Mehr versprechen wir nicht.</p>
      </div>
      <div class="facts-body" data-reveal>
        <table class="nutri">
          <caption>Nährwerte pro Tagesportion (${f.perDay} Fruchtgummis)</caption>
          <thead><tr><th scope="col">Nährstoff</th><th scope="col">Menge</th><th scope="col">% NRV*</th></tr></thead>
          <tbody>${p.nutrients.map(([n, am, r]) => `<tr><th scope="row">${n}</th><td>${am}</td><td>${r}</td></tr>`).join('')}</tbody>
        </table>
        <details class="mandatory-wrap">
          <summary>Alle Pflichtangaben</summary>
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
        </details>
        <p class="footnote">* NRV = Nährstoffbezugswert nach Verordnung (EU) 1169/2011. Mengen und Gewichte sind Richtwerte, bis der Hersteller sie bestätigt.</p>
      </div>
    </div>
  </section>

  <section class="section ritual" aria-labelledby="ritualTitle">
    <div class="wrap ritual-grid">
      <div class="ritual-visual atmo" data-reveal>${bearImg(p.id)}<p class="ritual-time">${d.ritual.time}</p></div>
      <div>
        <header data-reveal>
          <p class="eyebrow">So nimmst du ${NAME(p)}</p>
          <h2 class="h2" id="ritualTitle">${d.ritual.moment}.</h2>
        </header>
        <ol class="steps">
          ${d.ritual.steps.map(([h, txt], i) => `<li class="step" data-reveal><span class="step-n">0${i + 1}</span><div><h3>${h}</h3><p>${txt}</p></div></li>`).join('')}
        </ol>
      </div>
    </div>
  </section>

  <section class="section meet atmo" aria-labelledby="meetTitle">
    <div class="wrap meet-grid">
      <div class="meet-visual" data-reveal>
        <button class="meet-buddy" type="button" id="meetBuddy" aria-label="${NAME(p)} etwas sagen lassen">${bearImg(p.id)}</button>
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

  <section class="section calc" id="abo-info" aria-labelledby="calcTitle">
    <div class="wrap calc-grid">
      <div data-reveal>
        <p class="eyebrow">Das Abo</p>
        <h2 class="h2" id="calcTitle">Einmal einrichten. <em>Dann läuft es.</em></h2>
        <ol class="abo-steps">
          <li><b>Die Dose kommt einmal</b><span>Mit der ersten Lieferung, ohne Aufpreis.</span></li>
          <li><b>Nachschub per Brief</b><span>Alle 30, 45 oder 60 Tage, je ${eur(abo.price)}, versandkostenfrei.</span></li>
          <li><b>Du behältst die Kontrolle</b><span>Pausieren, tauschen, kündigen per Klick.</span></li>
        </ol>
      </div>
      <div class="calc-card" data-reveal>
        <div class="calc-input">
          <label for="calcMonths">Wie lange möchtest du ${NAME(p)} nehmen?</label>
          <div class="calc-slider"><input type="range" id="calcMonths" min="1" max="12" step="1" value="${months}"><output id="calcOut" for="calcMonths">${months} Monate</output></div>
        </div>
        <div class="calc-row"><span>Einzeln kaufen</span><strong id="calcOnce">–</strong><small id="calcOnceNote"></small></div>
        <div class="calc-row calc-abo"><span>Im Abo</span><strong id="calcAbo">–</strong><small id="calcAboNote"></small></div>
        <div class="calc-save"><span>Du sparst</span><strong id="calcSave">–</strong></div>
        <p class="calc-fine">Inkl. MwSt. Abo: ${eur(abo.price)} je Lieferung (${perKg(p, 'abo')}). Einzelkauf: erste Dose ${eur(p.price)} (${perKg(p, 'once')}), danach Nachfüller je ${eur(refill.price)} (${perKg(p, 'refill')}), je Bestellung ${eur(SHIPPING_COST)} Versand. Ohne Vorrats-Pakete gerechnet.</p>
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
        <p class="lead">${NAME(p)} ist noch nicht im Handel. Nach dem Launch stehen hier Bewertungen aus der Community, und zwar nur von Kundinnen und Kunden, die ${NAME(p)} bei uns gekauft haben.</p>
        <a class="btn btn-ghost" ${link('index.html#founders')}>Früh dabei sein: Founders Club</a>
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
        <p class="eyebrow">Die Original Four</p>
        <h2 class="h2" id="crossTitle">Der Rest <em>der Crew.</em></h2>
      </header>
      <div class="cross-grid">
        ${others.map(crossCard).join('')}
        <div class="cross-set" data-reveal>
          <a class="cross-set-visual" ${link(pdpUrl(set.id))} tabindex="-1" aria-hidden="true">${set.members.map(id => shot(id)).join('')}</a>
          <p class="cross-name">Set</p>
          <h3 class="cross-title"><a ${link(pdpUrl(set.id))}>${set.name}</a></h3>
          <p class="cross-short">${set.title}.</p>
          ${setWarn ? `<p class="cross-adult">SNOOZY: ${setWarn}</p>` : ''}
          <p class="cross-price">${eur(set.price)} <span class="cross-was">statt einzeln ${eur(memberSum(set))}</span></p>
          <button class="btn btn-ink btn-sm" type="button" data-bundle="${set.id}">Set in den Warenkorb</button>
        </div>
      </div>
      <p class="price-note">${PRICE_NOTE}</p>
    </div>
  </section>`;

  /* Leiste, die beim Scrollen die Kaufbox ersetzt */
  document.body.insertAdjacentHTML('beforeend', `<div class="sticky-buy" id="stickyBuy" style="${vars(p.id)}" aria-hidden="true">
    <div class="wrap sticky-inner">
      ${avatar(p.id)}
      <p class="sticky-name"><b>${NAME(p)}</b><span id="stickyPlan"></span></p>
      <button class="btn btn-ink" type="button" id="stickyBtn" tabindex="-1"><span id="stickyLabel">Abo starten</span> · <span id="stickyPrice"></span></button>
    </div>
  </div>`);

  /* Strukturierte Daten für Suchmaschinen: Produkt mit Preis, ohne Bewertungen */
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product',
    name: `bärly ${NAME(p)} ${p.title}`, brand: { '@type': 'Brand', name: 'bärly' },
    description: `${p.short} ${p.flavor}, ${count(p)} Fruchtgummis für 30 Tage.`,
    image: new URL(ASSETS(p.id).front, document.baseURI).href,
    offers: { '@type': 'Offer', priceCurrency: 'EUR', price: p.price.toFixed(2), availability: 'https://schema.org/PreOrder' }
  });
  document.head.appendChild(ld);
}

/* ------------------------------------------------------------------ */
/* Galerie umschalten                                                  */
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
  $('.g-thumbs').addEventListener('click', e => { const b = e.target.closest('.vt'); if (b) show(b.dataset.view); });
  $('.g-thumbs').addEventListener('keydown', e => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    show(tabs[(current() + step + tabs.length) % tabs.length].dataset.view, true);
  });
  /* Wischen auf der Galerie (Handy) */
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

/* ------------------------------------------------------------------ */
/* Kaufbox und Leiste                                                  */
/* ------------------------------------------------------------------ */
function initBuy() {
  const buy = $('#buy');
  const sticky = $('#stickyBuy');
  const update = () => {
    const pl = planFor(p, state.plan);
    const total = pl.price * state.qty;
    const label = state.plan === 'abo' ? 'Abo starten' : 'In den Warenkorb';
    $('#qty').textContent = state.qty;
    $('#buyLabel').textContent = label;
    $('#stickyLabel').textContent = label;
    $('#buyPrice').textContent = eur(total);
    $('#stickyPrice').textContent = eur(total);
    $('#stickyPlan').textContent = `${state.plan === 'abo' ? `Abo, alle ${state.every} Tage` : pl.label}${state.qty > 1 ? ` · ${state.qty} ×` : ''} · ${perKg(p, state.plan)}`;
    const ship = state.plan === 'abo' || total >= SHIPPING_FREE ? 'versandkostenfrei' : `zzgl. ${eur(SHIPPING_COST)} Versand (ab ${eur(SHIPPING_FREE)} frei)`;
    $('#buyMeta').textContent = `${state.qty > 1 ? `${state.qty} × ${eur(pl.price)} · ` : ''}Grundpreis ${perKg(p, state.plan)} · ${state.plan === 'stock' ? '3 × ' : ''}${count(p)} Fruchtgummis = ${netGrams(p, state.plan)} g · inkl. MwSt., ${ship}`;
    $$('[data-plan-card]', buy).forEach(c => c.classList.toggle('is-on', c.dataset.planCard === state.plan));
    $('#rhythm').hidden = state.plan !== 'abo';
    const more = $('.plan-more', buy);
    if (more && (state.plan === 'refill' || state.plan === 'stock')) more.open = true;
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
  const add = (e) => addToCart(p.id, state.plan, { qty: state.qty, every: planFor(p, state.plan).every ? state.every : 0, from: e.currentTarget });
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
    // Unterhalb des Bildschirms zählt als „sichtbar“, so ändert auch ein Sprung über die Kaufbox hinweg den Zustand
    new IntersectionObserver(([en]) => { pastBuy = !en.isIntersecting; sync(); }, { rootMargin: '0px 0px 100000px 0px' }).observe($('.buy-row'));
    new IntersectionObserver(([en]) => { atFooter = en.isIntersecting; sync(); }).observe($('.footer'));
  }
}

/* ------------------------------------------------------------------ */
/* Maskottchen, Nährstoffe, Rechner                                    */
/* ------------------------------------------------------------------ */
function initMeet() {
  const buddy = $('#meetBuddy');
  const bubble = $('#meetBubble');
  let k = 0;
  buddy.addEventListener('click', () => {
    k = (k + 1) % d.lines.length;
    bubble.textContent = d.lines[k];
    buddy.classList.remove('nod'); bubble.classList.remove('pop');
    void buddy.offsetWidth;
    buddy.classList.add('nod'); bubble.classList.add('pop');
  });
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
    const word = `${m} ${m === 1 ? 'Monat' : 'Monate'}`;
    $('#calcOut').textContent = word;
    range.setAttribute('aria-valuetext', word);
    $('#calcOnceNote').textContent = `1 Dose${m > 1 ? ` + ${m - 1} Nachfüller` : ''} + ${m} × Versand`;
    $('#calcAboNote').textContent = `${m} ${m === 1 ? 'Lieferung' : 'Lieferungen'}, Dose und Versand inklusive`;
    animateTo({ once, abo: sub, save: once - sub });
  };
  range.addEventListener('input', calc);
  whenVisible(range, calc, '0px');
}

/* Start */
render();
initGallery();
initBuy();
initMeet();
initNutrients();
initCalc();
ready();
})();
