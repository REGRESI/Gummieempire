/* bärly – Startseite
   Hero mit einer Bühne pro Sorte (Packshot + Charakter aus den freigegebenen Dateien),
   Produktkarten, Bären-Finder, „Ein Tag mit der Crew“, Crew und Abo. Braucht brand.js und shop.js. */

(() => {
'use strict';

const { eur, byId, BUNDLES, ASSETS, LIFESTYLE_READY, PDP, pdpUrl, planFor } = window.Baerly;
const { CREW, PRICE_NOTE, $, $$, esc, reduced, NAME, theme, vars, perKg, count, memberSum, warnFor, adultFor, store, shot, bearImg, avatar, duo, go: link, ready } = window.Shop;

const SET_TEXT = {
  crew: 'GLOW, FLEX, SNOOZY und DAILY, je 30 Tage.',
  beautysleep: 'GLOW zum Frühstück, SNOOZY vor dem Schlafen.'
};
const two = (n) => String(n).padStart(2, '0');

/* ------------------------------------------------------------------ */
/* Hero: eine Bühne pro Sorte                                          */
/* ------------------------------------------------------------------ */
function heroCopy(p, i) {
  const abo = planFor(p, 'abo');
  const h = PDP[p.id].hero;
  return `<p class="hero-kicker hl"><span class="hero-num">${two(i + 1)}</span><span class="hero-of">/ ${two(CREW.length)}</span><span>${NAME(p)} · ${p.title}</span></p>
    <h2 class="hero-title hl"><span class="sr-only">${NAME(p)}: </span>${h.title}</h2>
    <p class="hero-sub hl">${h.sub}</p>
    <div class="hero-ctas hl">
      <a class="btn btn-hero" ${link(pdpUrl(p.id))}>${NAME(p)} entdecken</a>
      <button class="btn btn-hero-ghost" type="button" data-add="${p.id}" data-plan="abo">Im Abo · ${eur(abo.price)}</button>
    </div>
    <p class="hero-price hl">Im Abo ${eur(abo.price)} je 30 Tage (${perKg(p, 'abo')}), einmalig ${eur(p.price)} (${perKg(p, 'once')}). Inkl. MwSt.</p>
    <p class="hero-claim hl">${p.cardClaim}${p.warn ? ` <b>${p.warn}</b>` : ''}</p>`;
}

function heroSlide(p, first) {
  return `<div class="hero-slide" data-id="${p.id}">
    <div class="hero-shot">${shot(p.id, `Dose ${NAME(p)} ${p.title}`, false).replace('<img ', first ? '<img fetchpriority="high" ' : '<img ')}</div>
    <button class="hero-buddy" type="button" aria-label="${NAME(p)} etwas sagen lassen">${bearImg(p.id, '', false, 'hero-bear')}</button>
    <p class="hero-bubble" aria-live="polite">${PDP[p.id].lines[0]}</p>
  </div>`;
}

function initHero() {
  const hero = $('#hero');
  const stage = $('#heroStage');
  const copy = $('#heroCopy');
  const tabs = $('#heroTabs');
  const toggle = $('#heroToggle');
  const panel = $('#heroPanel');
  let index = 0;
  let userPaused = reduced;            // bei reduzierter Bewegung kein automatischer Wechsel
  const holds = new Set();             // Gründe für eine Pause: hover, focus, offscreen, hidden, overlay
  const lineIdx = {};

  tabs.innerHTML = CREW.map((p, i) => `<button class="hero-tab" type="button" role="tab" id="heroTab-${p.id}" aria-controls="heroPanel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" style="${vars(p.id)}">
      ${avatar(p.id, false)}
      <span class="hero-tab-text"><b>${NAME(p)}</b><small>${p.goal}</small></span>
      <span class="hero-tab-bar" aria-hidden="true"><i></i></span>
    </button>`).join('');

  const setTheme = (p) => {
    const t = theme(p.id);
    hero.style.setProperty('--sky1', t.sky[0]);
    hero.style.setProperty('--sky2', t.sky[1]);
    hero.style.setProperty('--hero-ink', t.ink);
    hero.style.setProperty('--deep', t.dark ? '#cdb8ff' : t.deep);
    hero.style.setProperty('--tint', t.tint);
    hero.classList.toggle('is-dark', t.dark);
  };

  const syncPause = () => {
    const paused = userPaused || holds.size > 0;
    hero.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.setAttribute('aria-label', userPaused ? 'Automatischen Wechsel starten' : 'Automatischen Wechsel anhalten');
  };
  const hold = (key, on) => { on ? holds.add(key) : holds.delete(key); syncPause(); };

  const restartBar = () => {
    $$('.hero-tab-bar i', tabs).forEach(b => b.classList.remove('run'));
    const bar = $(`#heroTab-${CREW[index].id} .hero-tab-bar i`);
    void bar.offsetWidth;
    bar.classList.add('run');
  };

  function render(p, i) {
    setTheme(p);
    copy.innerHTML = heroCopy(p, i);
    $$('.hero-tab', tabs).forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `heroTab-${p.id}`);
    hero.classList.remove('swap'); void hero.offsetWidth; hero.classList.add('swap');
  }

  /* Läuft noch ein Wechsel, wird er sofort beendet: jeder Klick und jede Taste zählt */
  let running = [];
  function settle() {
    running.forEach(a => a.cancel());
    running = [];
    $$('.hero-slide', stage).slice(0, -1).forEach(s => s.remove());
  }

  function go(to, dir = 1, manual = false) {
    to = (to + CREW.length) % CREW.length;
    if (to === index) return;
    settle();
    const p = CREW[to];
    index = to;
    copy.setAttribute('aria-live', manual ? 'polite' : 'off');
    const out = $('.hero-slide', stage);
    stage.insertAdjacentHTML('beforeend', heroSlide(p, false));
    const inc = stage.lastElementChild;
    render(p, to);
    restartBar();
    if (reduced) { out?.remove(); return; }
    // Ruhiger Wechsel: die neue Sorte gleitet von rechts unten herein, der Bär kommt einen Moment später
    const s = dir > 0 ? 1 : -1;
    const ease = 'cubic-bezier(.2,.7,.2,1)';
    const leave = out?.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translate(${-4 * s}%, ${-3 * s}%)` }],
      { duration: 450, easing: 'ease-in', fill: 'forwards' });
    leave?.finished.then(() => out.remove(), () => {});
    const anims = [
      inc.animate([{ opacity: 0, transform: `translate(${7 * s}%, ${6 * s}%)` }, { opacity: 1, transform: 'none' }],
        { duration: 900, delay: 120, easing: ease, fill: 'backwards' }),
      $('.hero-buddy', inc).animate([
        { transform: `translateY(6%) rotate(${4 * s}deg)`, opacity: 0 },
        { transform: `translateY(-1.5%) rotate(${-1 * s}deg)`, opacity: 1, offset: .7 },
        { transform: 'none', opacity: 1 }
      ], { duration: 1000, delay: 320, easing: ease, fill: 'backwards' })
    ];
    anims.forEach(a => a.finished.catch(() => {}));
    running = [leave, ...anims].filter(Boolean);
  }

  stage.innerHTML = heroSlide(CREW[0], true);
  render(CREW[0], 0);
  toggle.hidden = reduced;           // ohne Bewegung gibt es nichts zu starten
  syncPause();
  restartBar();

  /* Fortschrittsbalken treibt den Wechsel: läuft er durch, kommt die nächste Sorte */
  tabs.addEventListener('animationend', e => { if (e.target.matches('.hero-tab-bar i.run')) go(index + 1, 1); });
  tabs.addEventListener('click', e => {
    const t = e.target.closest('.hero-tab');
    if (!t) return;
    const to = $$('.hero-tab', tabs).indexOf(t);
    go(to, to > index ? 1 : -1, true);
  });
  tabs.addEventListener('keydown', e => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: CREW.length - 1 - index };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const to = (index + keys[e.key] + CREW.length) % CREW.length;
    go(to, keys[e.key] >= 0 ? 1 : -1, true);
    $$('.hero-tab', tabs)[to].focus();
  });
  toggle.addEventListener('click', () => { userPaused = !userPaused; syncPause(); });

  /* Wischen auf der Bühne */
  let sx = null, sy = 0;
  stage.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; });
  stage.addEventListener('pointercancel', () => { sx = null; });
  stage.addEventListener('pointerup', e => {
    if (sx === null) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    sx = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1, true);
  });

  /* Antippen: der Bär nickt und sagt etwas Neues */
  stage.addEventListener('click', e => {
    const b = e.target.closest('.hero-buddy');
    if (!b) return;
    const id = b.closest('.hero-slide').dataset.id;
    const lines = PDP[id].lines;
    lineIdx[id] = ((lineIdx[id] || 0) + 1) % lines.length;
    const bubble = $('.hero-bubble', b.parentElement);
    bubble.textContent = lines[lineIdx[id]];
    b.classList.remove('nod'); bubble.classList.remove('pop');
    void b.offsetWidth;
    b.classList.add('nod'); bubble.classList.add('pop');
  });

  /* Pausen: Maus über dem Hero, Fokus darin, außer Sicht, Tab im Hintergrund, Warenkorb offen */
  if (matchMedia('(hover: hover)').matches) {
    hero.addEventListener('pointerenter', () => hold('hover', true));
    hero.addEventListener('pointerleave', () => hold('hover', false));
  }
  hero.addEventListener('focusin', () => hold('focus', true));
  hero.addEventListener('focusout', e => { if (!hero.contains(e.relatedTarget)) hold('focus', false); });
  document.addEventListener('visibilitychange', () => hold('hidden', document.hidden));
  document.addEventListener('baerly:overlay', e => hold('overlay', e.detail));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => hold('offscreen', !en.isIntersecting), { threshold: .25 }).observe(hero);
  }

  /* Leichte Parallaxe mit der Maus: Bär und Packshot bewegen sich minimal gegeneinander */
  if (!reduced && matchMedia('(pointer: fine)').matches) {
    let raf = 0, mx = 0, my = 0;
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width * 2 - 1;
      my = (e.clientY - r.top) / r.height * 2 - 1;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        hero.style.setProperty('--mx', mx.toFixed(3));
        hero.style.setProperty('--my', my.toFixed(3));
      });
    });
  }
}

/* ------------------------------------------------------------------ */
/* Die Original Four + Sets                                            */
/* ------------------------------------------------------------------ */
function productCard(p) {
  const abo = planFor(p, 'abo');
  return `<article class="product" style="${vars(p.id)}" data-reveal>
    <a class="product-visual" ${link(pdpUrl(p.id))} aria-label="${NAME(p)} ${p.title} ansehen${p.adultOnly ? ', nur für Erwachsene' : ''}">
      ${p.adultOnly ? '<span class="product-badge" aria-hidden="true">18+</span>' : ''}
      ${shot(p.id)}
      ${bearImg(p.id, '', true, 'product-peek')}
    </a>
    <div class="product-body">
      <div class="product-head">${avatar(p.id)}<div><p class="product-name">${NAME(p)}</p><h3 class="product-title"><a ${link(pdpUrl(p.id))}>${p.title}</a></h3></div></div>
      <p class="product-short">${p.goal} · ${p.short}</p>
      <p class="product-flavor">${p.flavor} · ${count(p)} Fruchtgummis · 30 Tage</p>
      <p class="product-price"><strong>${eur(p.price)}</strong><span>im Abo ${eur(abo.price)}</span></p>
      <p class="product-unit">${perKg(p, 'once')}, im Abo ${perKg(p, 'abo')} · inkl. MwSt.</p>
      <p class="product-claim">${p.cardClaim}${p.warn ? ` <b>${p.warn}</b>` : ''}</p>
    </div>
    <div class="product-actions">
      <button class="btn btn-ink" type="button" data-add="${p.id}" data-plan="abo">Im Abo · ${eur(abo.price)}</button>
      <a class="btn btn-ghost" ${link(pdpUrl(p.id))} aria-label="Details zu ${NAME(p)}">Details</a>
    </div>
  </article>`;
}
function setCard(b) {
  const warn = warnFor(b.id);
  return `<article class="set" data-reveal>
    <a class="set-visual" ${link(pdpUrl(b.id))} tabindex="-1" aria-hidden="true">${adultFor(b.id) ? '<span class="product-badge">18+</span>' : ''}${b.members.map(id => shot(id)).join('')}</a>
    <div>
      <h3><a ${link(pdpUrl(b.id))}>${b.name}</a></h3>
      <p>${SET_TEXT[b.id] || b.title}</p>
      ${warn ? `<p class="set-warn">SNOOZY: ${warn}</p>` : ''}
      <p class="set-price"><strong>${eur(b.price)}</strong><em>statt einzeln ${eur(memberSum(b))}</em><span>im Abo ${eur(planFor(b, 'abo').price)}</span></p>
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
    <div class="finder-visual">${duo(id, `${NAME(p)} ${p.title}, Dose`, false)}</div>
    <div class="finder-copy">
      <p class="product-name">DEIN BÄR: ${NAME(p)}</p>
      <h3>${p.title}</h3>
      <p class="finder-desc">${p.short} ${p.flavor}, ${p.serving}.</p>
      <ul class="facts">${facts.map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join('')}</ul>
      <p class="claim-note">${p.claim}${p.warn ? ` ${p.warn}` : ''}</p>
      <div class="finder-buy">
        <div class="price"><strong>${eur(abo.price)}</strong><span>im Abo (${perKg(p, 'abo')}), einmalig ${eur(p.price)} (${perKg(p, 'once')}) · inkl. MwSt.</span></div>
        <a class="btn btn-ink" ${link(pdpUrl(id))}>Zu ${NAME(p)}</a>
        <button class="btn btn-ghost" type="button" data-add="${id}" data-plan="abo">Im Abo in den Warenkorb</button>
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
/* Ein Tag mit der Crew: Regler durch den Tag                          */
/* ------------------------------------------------------------------ */
/* Himmel je Moment: Verlauf oben/unten, Sonnenstand (0–180°, über 180 = Mond) */
const SKY = {
  daily:  { sky: ['#ffe2bf', '#fff4e4'], sun: 26 },
  glow:   { sky: ['#ffd9e4', '#fff3f6'], sun: 44 },
  flex:   { sky: ['#ffd7a8', '#ffeeda'], sun: 150 },
  snoozy: { sky: ['#272046', '#3f3270'], sun: 220 }
};
function initDay() {
  const order = ['daily', 'glow', 'flex', 'snoozy'].map(id => byId[id]);
  const box = $('#day');
  const range = $('#dayRange');
  const scene = $('#dayScene');
  const text = $('#dayCopy');
  $('#dayTicks').innerHTML = order.map((p, i) => `<button type="button" class="day-tick" data-i="${i}" style="${vars(p.id)}" aria-pressed="${i === 0}">
      <b>${PDP[p.id].ritual.time}</b><span>${NAME(p)}</span>
    </button>`).join('');
  range.max = String(order.length - 1);

  const show = (i) => {
    const p = order[i];
    const s = SKY[p.id];
    const r = PDP[p.id].ritual;
    box.style.setProperty('--sky1', s.sky[0]);
    box.style.setProperty('--sky2', s.sky[1]);
    box.style.setProperty('--sun', `${Math.min(s.sun, 180)}deg`);
    box.style.setProperty('--deep', theme(p.id).deep);
    box.classList.toggle('is-night', s.sun > 180);
    range.value = String(i);
    range.setAttribute('aria-valuetext', `${r.time} Uhr, ${NAME(p)}: ${p.scene.title}`);
    $$('.day-tick', box).forEach((t, k) => t.setAttribute('aria-pressed', String(k === i)));
    scene.innerHTML = `<div class="day-shot" style="${vars(p.id)}">
      ${LIFESTYLE_READY.includes(p.id)
        ? `<img class="day-photo" src="${ASSETS(p.id).lifestyle}" alt="${esc(`${NAME(p)}: ${p.scene.title}`)}" decoding="async">`
        : duo(p.id, '', false, 'duo-day')}
    </div>`;
    text.innerHTML = `<p class="day-time">${r.time}<span>Uhr</span></p>
      <p class="day-name">${NAME(p)} · ${r.moment}</p>
      <h3 class="day-title">${p.scene.title}</h3>
      <p class="day-text">${p.scene.text}${p.warn ? ` <span class="adult-note">Nur für Erwachsene.</span>` : ''}</p>
      <a class="day-link" ${link(pdpUrl(p.id))}>${NAME(p)} ansehen</a>`;
  };
  range.addEventListener('input', () => show(+range.value));
  $('#dayTicks').addEventListener('click', e => {
    const t = e.target.closest('.day-tick');
    if (t) show(+t.dataset.i);
  });
  show(0);
}

/* ------------------------------------------------------------------ */
/* Crew, Abo                                                           */
/* ------------------------------------------------------------------ */
function renderCrew() {
  $('#crewGrid').innerHTML = CREW.map(p => `<article class="member" style="${vars(p.id)}" data-reveal>
    <a class="member-visual" ${link(pdpUrl(p.id))} aria-label="${NAME(p)}: ${esc(p.look)}. Zur Produktseite">
      ${bearImg(p.id)}
    </a>
    <p class="member-role">${PDP[p.id].traits[0][1]}</p>
    <h3>${NAME(p)}</h3>
    <p class="member-persona">${p.persona}</p>
    <a class="member-product" ${link(pdpUrl(p.id))}>${p.title}</a>${p.warn ? '<span class="adult-note">Nur für Erwachsene</span>' : ''}
  </article>`).join('');
}
function initAbo() {
  const p = byId.glow;
  $('#aboOnce').textContent = eur(planFor(p, 'refill').price);
  $('#aboSub').textContent = eur(planFor(p, 'abo').price);
  $('.abo-compare').insertAdjacentHTML('afterend', `<p class="abo-unit">Grundpreis ${perKg(p, 'refill')} einzeln, ${perKg(p, 'abo')} im Abo. Die erste Lieferung kommt mit Dose; ohne Abo kostet die Dose mit Füllung ${eur(p.price)}. Alle Preise inkl. MwSt.</p>`);
}

/* Start */
initHero();
renderProducts();
initFinder();
initDay();
renderCrew();
initAbo();
ready();
})();
