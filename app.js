/* bärly – Shop-Prototyp
   Alles läuft im Browser: Hero mit den vier Dosen, Quiz, Shop, Crew, Haus, Episoden,
   Warenkorb (localStorage). Produktdaten, Welt und Bilder kommen aus brand.js. */

(() => {
'use strict';

const { BRAND, eur, aboPrice, PRODUCTS, byId, BUNDLES, PACK_INFO, IMG, WORLD, plansFor, planFor, netGrams, unitPrice, bear, packs } = window.Baerly;
const perKg = (p, plan) => `${eur(unitPrice(p, plan))}/kg`;
const SHIPPING_FREE = 35;

const CREW = PRODUCTS.filter(p => p.launch);
const LATER = PRODUCTS.filter(p => p.later);
const KIDS = PRODUCTS.filter(p => p.line === 'kids');
const HERO = CREW;
const productName = (p) => p.product || p.name;
/* Nur die Launch-Crew und ihre Bundles sind bestellbar */
const sellable = (id) => (byId[id] && byId[id].launch) || (BUNDLES[id] && !BUNDLES[id].soon);

/* ------------------------------------------------------------------ */
/* Helfer                                                              */
/* ------------------------------------------------------------------ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function store(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}
const plush = (id, cls = '', alt = '') => `<img class="${cls}" src="${IMG(id).plush}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const memberSum = (b) => b.members.reduce((s, id) => s + byId[id].price, 0);

/* ------------------------------------------------------------------ */
/* Hero: ein Bär auf seiner Dose, der nächste fliegt von unten rechts rein */
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
    <p class="hero-tag"><i></i>${num} / ${String(HERO.length).padStart(2, '0')} · ${p.title} · <em>${p.role}</em></p>
    <h1 class="hero-title">${p.headline}</h1>
    <p class="hero-story">${p.story}</p>
    <div class="hero-ctas">
      <button class="btn btn-ink" type="button" data-add="${p.id}">In den Warenkorb · ${eur(p.price)}</button>
      <button class="btn btn-ghost" type="button" data-detail="${p.id}">${productName(p)} ansehen</button>
    </div>`;
}
function factsHTML(p) {
  // Dosierung steht schon im Kopf des Etiketts
  return p.facts.filter(([, s]) => !/^(pro Tag|vor dem Schlafen)$/.test(s)).map(([b, s]) => `<li><span>${s}</span><b>${b}</b></li>`).join('');
}
function wordHTML(p) {
  return [...p.word].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join('');
}

function makeHeroBear(p) {
  const el = document.createElement('div');
  el.className = 'hero-bear';
  el.innerHTML = `<div class="bear-float"><div class="bear-tilt"><img class="hero-jar" src="${IMG(p.id).jar}" alt="${productName(p)}-Dose, ${p.title}, mit ${p.name} obendrauf" draggable="false"></div></div>`;
  stage.insertBefore(el, bubble);
  return el;
}

function showBubble(text) {
  bubble.textContent = text;
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
  word.style.setProperty('--len', p.word.length);
  word.innerHTML = wordHTML(p);
  if (reduced) return;
  $$('span', word).forEach((s, i) => s.animate(
    [{ transform: 'translateY(60%) rotate(8deg)', opacity: 0 }, { transform: 'none', opacity: 1 }],
    { duration: 700, delay: 260 + i * 45, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' }
  ));
}

function renderThumbs() {
  thumbs.innerHTML = HERO.map((p, i) =>
    `<button class="thumb" type="button" role="tab" aria-selected="${i === cur}" aria-label="${p.name}: ${p.title}" data-i="${i}" style="--dur:${HERO_MS}ms;background-color:${p.tint}">
      <img src="${IMG(p.id).plush}" alt="" draggable="false"><span class="thumb-bar"></span></button>`).join('');
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

  const done = () => { busy = false; showBubble(p.gag); };
  const safety = setTimeout(done, 1600);

  if (reduced) {
    out.remove();
    clearTimeout(safety); done();
    return;
  }

  // Alte Dose fliegt nach oben links raus, die neue kommt von unten rechts
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
    { transform: 'translate(0,0) rotate(-7deg) scale(1.06)', offset: .66 },
    { transform: 'translate(0,0) rotate(3deg) scale(.98)', offset: .84 },
    { transform: 'none', opacity: 1 }
  ], { duration: 1150, delay: 160, easing: 'cubic-bezier(.22,.9,.3,1)', fill: 'backwards' })
    .finished.then(() => { clearTimeout(safety); done(); }).catch(() => {});
}

function initHero() {
  // Dosen vorladen, damit beim Reinfliegen nichts nachlädt
  HERO.forEach(p => { const im = new Image(); im.src = IMG(p.id).jar; });
  const p = HERO[0];
  setTheme(p);
  makeHeroBear(p);
  copy.innerHTML = copyHTML(p, 0);
  facts.innerHTML = factsHTML(p);
  $('#heroServing').textContent = p.serving;
  word.style.setProperty('--len', p.word.length);
  word.innerHTML = wordHTML(p);
  renderThumbs();
  setTimeout(() => showBubble(p.gag), 600);

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

  // Dose folgt der Maus ein bisschen
  hero.addEventListener('pointermove', e => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = stage.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    const t = $('.hero-bear:not(.leaving) .bear-tilt', stage);
    if (!t) return;
    t.style.setProperty('--px', (dx * 16).toFixed(1) + 'px');
    t.style.setProperty('--py', (dy * 10).toFixed(1) + 'px');
    t.style.setProperty('--ry', (dx * 18).toFixed(1) + 'deg');
    t.style.setProperty('--rx', (-dy * 10).toFixed(1) + 'deg');
  });

  // Wischen und Antippen: Antippen quetscht den Bären, er stellt sich vor
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
      const p = HERO[cur];
      showBubble(bubble.textContent === p.gag ? p.hello : p.gag);
    }
  });
  hero.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') goTo(cur + 1, 1);
    if (e.key === 'ArrowLeft') goTo(cur - 1, -1);
  });
}

/* ------------------------------------------------------------------ */
/* Quiz: Welcher bärly-Bär bist du?                                    */
/* ------------------------------------------------------------------ */
const QUIZ = [
  { q: 'Dein perfekter Samstagmorgen?', a: [
    ['glow', 'Lange Skincare-Routine, Outfit-Check, dann Brunch.'],
    ['flex', 'Um sieben im Gym. Danach ein großes Frühstück.'],
    ['snoozy', 'Welcher Morgen? Ich stehe um zwölf auf.'],
    ['daily', 'Wochenplan, Wochenmarkt, Meal-Prep.']
  ] },
  { q: 'Die Crew plant einen Trip. Was machst du?', a: [
    ['daily', 'Ich buche alles. Mit Tabelle und Plan B.'],
    ['glow', 'Ich packe drei Koffer. Einer ist nur für Outfits.'],
    ['flex', 'Ich checke zuerst, ob das Hotel ein Gym hat.'],
    ['snoozy', 'Ich komme mit, solange es eine Hängematte gibt.']
  ] },
  { q: 'Welcher Satz könnte von dir sein?', a: [
    ['flex', '„Nur noch ein Satz.“'],
    ['glow', '„Bin in 5 Minuten fertig.“'],
    ['snoozy', '„Morgen?“'],
    ['daily', '„Ich hab da einen Plan.“']
  ] }
];
const WHY = {
  glow: 'Du nimmst dir Zeit für dich und hältst das nicht für Luxus. Dein Bär ist Glow: Beauty Gummies mit Biotin, Zink und Vitamin C.',
  flex: 'Du ziehst durch, auch wenn alle anderen noch schlafen. Dein Bär ist Flex: Kreatin Gummies mit Vitamin B6 und B12.',
  snoozy: 'Du weißt, dass ein guter Tag am Abend vorher anfängt. Dein Bär ist Snooze, und seine Dose heißt Snoozy: Sleep Gummies mit Melatonin.',
  daily: 'Du hältst den Laden zusammen, mit Plan und guter Laune. Dein Bär ist Daily: 12 Vitamine und 3 Mineralstoffe.'
};
const PAIR_TIP = {
  glow: { b: 'beautysleep', text: 'Glow und Snooze sind überraschend beste Freunde.' },
  snoozy: { b: 'beautysleep', text: 'Snooze und Glow sind überraschend beste Freunde.' },
  flex: { b: 'crew', text: 'Flex will sowieso die ganze Crew mit ins Gym nehmen.' },
  daily: { b: 'crew', text: 'Daily hat schon einen Plan für alle vier.' }
};
const quizCard = $('#quizCard');
const quizCrew = $('#quizCrew');
let quiz = { step: 0, picks: [], order: [] };

function shuffled(n) {
  const a = [...Array(n).keys()];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function quizResult(picks) {
  const score = {};
  picks.forEach(id => { score[id] = (score[id] || 0) + 1; });
  const best = Math.max(...Object.values(score));
  // Gleichstand: Die letzte Antwort (der Satz) entscheidet
  for (let i = picks.length - 1; i >= 0; i--) if (score[picks[i]] === best) return picks[i];
  return picks[0];
}
function dots(step) {
  return `<div class="quiz-dots" aria-hidden="true">${QUIZ.map((_, i) => `<span class="${i < step ? 'done' : ''}"></span>`).join('')}</div>`;
}
function renderQuiz() {
  quizCrew.classList.remove('has-pick');
  $$('img', quizCrew).forEach(im => im.classList.remove('is-pick'));
  if (quiz.step >= QUIZ.length) return renderQuizResult(quizResult(quiz.picks));
  const Q = QUIZ[quiz.step];
  if (!quiz.order[quiz.step]) quiz.order[quiz.step] = shuffled(Q.a.length);
  quizCard.innerHTML = `
    <div class="quiz-top"><span class="quiz-step">Frage ${quiz.step + 1} von ${QUIZ.length}</span>${dots(quiz.step)}</div>
    <p class="quiz-q">${Q.q}</p>
    <div class="quiz-answers">${quiz.order[quiz.step].map((k, n) =>
      `<button class="quiz-a" type="button" data-quiz-pick="${Q.a[k][0]}"><b>${'ABCD'[n]}</b>${Q.a[k][1]}</button>`).join('')}</div>
    ${quiz.step ? '<button class="quiz-back" type="button" data-quiz-back>← Zurück</button>' : ''}`;
}
function renderQuizResult(id) {
  const p = byId[id];
  const tip = PAIR_TIP[id];
  const b = BUNDLES[tip.b];
  quizCrew.classList.add('has-pick');
  $$('img', quizCrew).forEach(im => im.classList.toggle('is-pick', im.dataset.id === id));
  quizCard.innerHTML = `
    <div class="quiz-top"><span class="quiz-step">Dein Ergebnis</span>${dots(QUIZ.length)}</div>
    <div class="quiz-result" style="--tint:${p.tint};--c:${p.dark}">
      <div class="quiz-result-art">${plush(id, '', `${p.name}, ${p.role}`)}</div>
      <div>
        <h3>Du bist ${p.name}!</h3>
        <p class="role">${p.role}</p>
        <p class="quote">„${p.quote}“</p>
        <p class="quiz-why">${WHY[id]}${p.adultOnly ? ' Nur für Erwachsene.' : ''}</p>
      </div>
      <p class="quiz-pair">${tip.text} Als ${b.name}: <s>${eur(memberSum(b))}</s> <b>${eur(b.price)}</b>. <button type="button" data-bundle="${b.id}">${b.name} in den Warenkorb</button></p>
      <div class="quiz-ctas">
        <button class="btn btn-ink" type="button" data-detail="${id}">${productName(p)} ansehen</button>
        <button class="btn btn-ghost" type="button" data-quiz-share="${id}">Ergebnis teilen</button>
        <button class="quiz-back" type="button" data-quiz-restart>Nochmal spielen</button>
      </div>
    </div>`;
}
function initQuiz() {
  quizCrew.innerHTML = CREW.map(p => `<img src="${IMG(p.id).plush}" alt="" data-id="${p.id}" loading="lazy">`).join('');
  const saved = store('baerly-quiz');
  if (saved && byId[saved]?.launch) { quiz.step = QUIZ.length; renderQuizResult(saved); }
  else renderQuiz();

  quizCard.addEventListener('click', e => {
    const pick = e.target.closest('[data-quiz-pick]');
    if (pick) {
      pick.classList.add('is-picked');
      quiz.picks[quiz.step] = pick.dataset.quizPick;
      quiz.picks.length = quiz.step + 1;
      setTimeout(() => {
        quiz.step++;
        if (quiz.step >= QUIZ.length) store('baerly-quiz', quizResult(quiz.picks));
        renderQuiz();
      }, reduced ? 0 : 260);
      return;
    }
    if (e.target.closest('[data-quiz-back]')) { quiz.step = Math.max(0, quiz.step - 1); renderQuiz(); return; }
    if (e.target.closest('[data-quiz-restart]')) {
      quiz = { step: 0, picks: [], order: [] };
      store('baerly-quiz', null);
      renderQuiz();
      $('.quiz-a', quizCard)?.focus();
      return;
    }
    const share = e.target.closest('[data-quiz-share]');
    if (share) {
      const p = byId[share.dataset.quizShare];
      const text = `Ich bin ${p.name}, ${p.role}. „${p.quote}“ Welcher bärly-Bär bist du?`;
      if (navigator.share) navigator.share({ title: 'Welcher bärly-Bär bist du?', text, url: location.href.split('#')[0] + '#quiz' }).catch(() => {});
      else navigator.clipboard?.writeText(`${text} ${location.href.split('#')[0]}#quiz`).then(() => toast('Ergebnis kopiert. Ab in die Story damit.'), () => toast(text));
    }
  });
}

/* ------------------------------------------------------------------ */
/* Shop                                                                */
/* ------------------------------------------------------------------ */
function cardHTML(p) {
  const f = PACK_INFO[p.id];
  const abo = plansFor(p).find(x => x.id === 'abo');
  const count = f.refill[0] * (30 / f.refill[1]);
  const badges = [p.vegan ? '<span class="badge">Vegan</span>' : '', p.adultOnly ? '<span class="badge badge-dark">18+</span>' : ''].join('');
  return `<article class="card" style="--tint:${p.tint};--c:${p.dark}">
    <button class="card-visual" type="button" data-detail="${p.id}" aria-label="Details zu ${productName(p)}">
      <img class="card-jar" src="${IMG(p.id).jar}" alt="" loading="lazy" decoding="async">
      <span class="badges">${badges}</span>
      <span class="card-role" aria-hidden="true">${p.role.replace('The ', '')}</span>
    </button>
    <div class="card-body">
      <div class="card-top"><h3 class="card-name">${productName(p)}</h3><span class="card-price">${eur(p.price)}</span></div>
      <p class="card-sub">${p.title}</p>
      <p class="card-flavor">${p.flavor} · ${p.ingredients}</p>
      <p class="card-abo">im Abo ${eur(abo.price)}, Dose gratis<small>${count} Fruchtgummis · 30 Tage · ${perKg(p, 'once')}</small></p>
    </div>
    <div class="card-actions">
      <button class="btn btn-ghost card-more" type="button" data-detail="${p.id}">Details</button>
      <button class="btn btn-ink add-btn" type="button" data-add="${p.id}">In den Warenkorb</button>
    </div>
  </article>`;
}

function bundleHTML(b) {
  const sum = memberSum(b);
  const save = Math.round((1 - b.price / sum) * 100);
  const art = b.id === 'crew'
    ? `<div class="bundle-art"><img src="assets/crew-couch.webp" alt="Glow, Flex, Snooze und Daily zusammen auf dem Sofa" loading="lazy"></div>`
    : `<div class="bundle-art duo-art">${b.members.map(id => plush(id, '', '')).join('')}</div>`;
  return `<article class="bundle" style="--tint:${b.tint}">
    <span class="bundle-save">−${save} %</span>
    ${art}
    <div class="bundle-body">
      <div>
        <p class="bundle-name">${b.name}</p>
        <p class="bundle-desc">${b.title}${b.id === 'crew' ? '. Zusammen abgestimmt auf die Höchstmengen-Empfehlungen des BfR.' : '.'} Im Abo ${eur(aboPrice(b.price))}.</p>
      </div>
      <div class="bundle-price"><s>${eur(sum)}</s> <strong>${eur(b.price)}</strong></div>
      <button class="btn btn-ink" type="button" data-bundle="${b.id}">In den Warenkorb</button>
    </div>
  </article>`;
}

function renderShop() {
  $('#productGrid').innerHTML = CREW.map(cardHTML).join('');
  $('#bundles').innerHTML = ['crew', 'beautysleep'].map(id => bundleHTML(BUNDLES[id])).join('');
  $('#later').innerHTML = `
    <div>
      <h3>Bald im Haus</h3>
      <p>Vor der Tür warten schon die nächsten Bären. Wer zuerst einzieht, entscheidet der Founders Club.</p>
      <a class="text-link" href="#founders">Mitbestimmen</a>
    </div>
    <div class="later-row">${LATER.map(p => `<div class="ghost"><span class="ghost-bear">${bear(p, { face: false, shadow: false, label: false })}</span><span>${PACK_INFO[p.id].nutrient}</span></div>`).join('')}</div>`;
}

/* ------------------------------------------------------------------ */
/* Crew                                                                */
/* ------------------------------------------------------------------ */
function renderCrew() {
  $('#crewList').innerHTML = CREW.map((p, i) => `
    <article class="crew-card" style="--tint:${p.tint};--c:${p.dark}">
      <div class="crew-art"><span class="crew-num">0${i + 1}</span>${plush(p.id, '', `${p.name} als Plüschfigur`)}</div>
      <div class="crew-body">
        <p class="crew-role">${p.role}</p>
        <h3 class="crew-name">${p.name}</h3>
        <p class="crew-quote">„${p.quote}“</p>
        <ul class="chipline">${p.traits.map(t => `<li>${t}</li>`).join('')}</ul>
        <p class="crew-gag">Running Gag: <b>„${p.gag}“</b></p>
        <div class="crew-actions">
          <button class="btn btn-light" type="button" data-room="${p.room.id}">${p.room.name}</button>
          <button class="btn btn-ink" type="button" data-detail="${p.id}">Zur Dose</button>
        </div>
      </div>
    </article>`).join('');

  $('#pairList').innerHTML = WORLD.pairs.map(x => `
    <div class="pair">
      <div class="pair-faces">${[x.a, x.b].map(id => `<img src="${IMG(id).plush}" alt="" style="--t:${byId[id].tint}" loading="lazy">`).join('')}</div>
      <b>${x.title}</b>
      <p>${x.text}</p>
    </div>`).join('');
}

/* ------------------------------------------------------------------ */
/* Das Haus: Zimmer auf der Villa antippen                             */
/* ------------------------------------------------------------------ */
const villa = $('#villa');
const roomPanel = $('#roomPanel');
let roomId = store('baerly-room') || 'wohnzimmer';

function renderRoom(id) {
  const r = WORLD.rooms.find(x => x.id === id) || WORLD.rooms[0];
  roomId = r.id;
  const p = r.who && byId[r.who];
  const who = p
    ? `<div class="room-who">${`<img src="${IMG(p.id).plush}" alt="" style="--t:${p.tint}">`}<p><b>Hier wohnt ${p.name}</b>${p.role}</p><button class="btn btn-ink btn-sm" type="button" data-detail="${p.id}">${productName(p)}</button></div>`
    : `<div class="room-who"><div class="room-crew">${CREW.map(c => `<img src="${IMG(c.id).plush}" alt="" style="--t:${c.tint}">`).join('')}</div><p><b>Gemeinschaftsraum</b>Hier trifft sich die ganze Crew.</p></div>`;
  roomPanel.innerHTML = `
    <img class="room-img" src="${r.img}" alt="${r.name} im bärly-Haus">
    <p class="room-floor">${r.floor}</p>
    <h3>${r.name}</h3>
    <p>${r.text}</p>
    ${who}
    <div class="room-nav" role="group" aria-label="Zimmer wählen">${WORLD.rooms.map(x => `<button type="button" data-room-pick="${x.id}" aria-pressed="${x.id === r.id}">${x.name.replace(/'s (Room|Workspace)/, '')}</button>`).join('')}</div>`;
  $$('.hotspot', villa).forEach(h => h.setAttribute('aria-pressed', String(h.dataset.roomPick === r.id)));
  store('baerly-room', r.id);
}

function initHaus() {
  villa.insertAdjacentHTML('beforeend', WORLD.rooms.map(r => {
    const c = r.who ? byId[r.who].color : 'var(--sun)';
    return `<button class="hotspot" type="button" data-room-pick="${r.id}" aria-pressed="false" aria-label="${r.name}, ${r.floor}" style="left:${r.x}%;top:${r.y}%;--c:${c}"><span class="hotspot-tip">${r.name}</span></button>`;
  }).join(''));
  renderRoom(roomId);
  document.addEventListener('click', e => {
    const pick = e.target.closest('[data-room-pick]');
    if (pick) { renderRoom(pick.dataset.roomPick); return; }
    const go = e.target.closest('[data-room]');
    if (go) {
      renderRoom(go.dataset.room);
      $('#haus').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  });
}

/* ------------------------------------------------------------------ */
/* Episoden                                                            */
/* ------------------------------------------------------------------ */
function renderEpisodes() {
  const ep = WORLD.episodes[0];
  $('#epTitle').innerHTML = `Episode ${ep.n}<span class="ep-status">${ep.status}</span>`;
  $('#epLead').textContent = ep.title + '. Sechs Panels, ein Running Gag, eine Botschaft: zusammen ist alles leichter.';
  $('#epStrip').innerHTML = ep.panels.map(x => `
    <li class="panel">
      <img src="${x.img}" alt="${esc(x.cap)}: ${esc(x.text)}" loading="lazy">
      <b>${x.cap}</b>
      <p>${x.text}</p>
    </li>`).join('');
  $('#gagList').innerHTML = WORLD.gags.map(g => {
    if (!g.who) {
      return `<div class="gag gag-crew"><div class="crew-faces">${CREW.map(c => `<img src="${IMG(c.id).plush}" alt="" style="--t:${c.tint}">`).join('')}</div><span>${g.text}</span></div>`;
    }
    const p = byId[g.who];
    return `<div class="gag" style="--t:${p.tint}"><img src="${IMG(p.id).plush}" alt="${p.name}"><span>${g.text}</span></div>`;
  }).join('');
}

/* ------------------------------------------------------------------ */
/* Beauty, Abo, Kids                                                   */
/* ------------------------------------------------------------------ */
function initBeauty() {
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

function initAbo() {
  $('#artCan').innerHTML = packs.jar ? packs.jar(byId.glow) : `<img src="${IMG('glow').jar}" alt="">`;
  $('#artLetter').innerHTML = packs.letter(packs.nest(packs.refill(byId.glow), 0, 0, 92), { label: 'Dein Nachschub ist da.' });
}

function initKids() {
  $('#kidsStage').innerHTML = KIDS.map(p =>
    `<div class="kid">
      <span class="kid-soon">bald</span>
      <span class="bear-wrap">${bear(p)}</span>
      <span class="kid-name">${p.name}</span>
      <span class="kid-power">${p.power}</span>
    </div>`).join('');

  // Tütchen-Box und Tütchen mit Namensfeld, das sich live mitschreibt
  const input = $('#kidName');
  const art = $('#kidsStrip');
  const draw = () => {
    const name = input.value.trim() || 'Emma';
    art.innerHTML = `<div class="kids-box">${packs.box(['kiko', 'juno'])}</div>
      <div class="kids-tuetchen">${packs.tuetchen('kiko', { name })}${packs.tuetchen('juno', { name })}</div>`;
  };
  input.value = store('baerly-kidname') || '';
  draw();
  input.addEventListener('input', () => { store('baerly-kidname', input.value.trim()); draw(); });

  $('#kidsWaitlist').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#kidsEmail').value.trim();
    const msg = $('#kidsMsg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.';
      return;
    }
    msg.textContent = 'Du stehst auf der Warteliste. Wir melden uns, sobald bärly kids startet. (Prototyp: wird noch nicht gespeichert.)';
    e.target.reset();
  });
}

/* ------------------------------------------------------------------ */
/* Produkt-Modal                                                       */
/* ------------------------------------------------------------------ */
const modal = $('#modal');
const modalInner = $('#modalInner');

/* Galerie: Fotos aus den Packaging-Frames plus Nachfüller und Dosis als Zeichnung */
function viewsFor(p) {
  const im = IMG(p.id);
  const photo = (src, alt) => () => `<img class="g-photo" src="${src}" alt="${esc(alt)}">`;
  return [
    { id: 'jar', label: 'Dose', html: () => `<img src="${im.jar}" alt="${esc(productName(p))}-Dose mit ${esc(p.name)}">` },
    { id: 'views', label: 'Rundum', html: photo(im.views, `${productName(p)}-Dose von vorne, seitlich und hinten`) },
    { id: 'life', label: 'Im Alltag', html: photo(im.life, `${productName(p)}-Dose im Alltag`) },
    { id: 'mood', label: 'Stimmung', html: () => `<div class="g-mood">${im.mood.map((src, i) => `<img src="${src}" alt="${esc(productName(p))}-Stimmungsbild ${i + 1}">`).join('')}</div>` },
    { id: 'gummies', label: 'Gummies', html: photo(im.gummies, `${productName(p)} Fruchtgummis, ${p.flavor}`) },
    { id: 'refill', label: 'Nachfüller', html: () => packs.refill(p) },
    { id: 'letter', label: 'Per Brief', html: () => packs.letter(packs.nest(packs.refill(p), 0, 0, 92)), wide: true },
    { id: 'dose', label: 'Dosis', html: () => doseCard(p) }
  ];
}
const VIEW_FOR_PLAN = { can: 'jar', refill: 'refill' };

/* Dosis-Bild: Tatzen-Dosis und Reichweite, wie auf der Packung */
function doseCard(p) {
  const f = PACK_INFO[p.id] || {};
  const unit = `${f.perDay} Fruchtgummi${f.perDay > 1 ? 's' : ''} ${p.id === 'snoozy' ? 'am Abend' : 'am Tag'}`;
  return `<svg class="dose-card" viewBox="0 0 240 240" role="img" aria-label="${unit}">
    <rect x="10" y="10" width="220" height="220" rx="28" fill="#fff"/>
    ${packs.paw(120, 100, 120, f.perDay || 1, p.color)}
    <text x="120" y="184" text-anchor="middle" font-family="Fredoka, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="700" font-size="20" fill="#1c1838">${unit}</text>
    <text x="120" y="206" text-anchor="middle" font-family="Figtree, Arial, sans-serif" font-weight="600" font-size="12" fill="#1c1838" fill-opacity=".7">30 Tage · ${f.dose} pro Tag</text>
  </svg>`;
}

function openDetail(id, planId) {
  const p = byId[id];
  if (!p || !p.launch) return;
  const f = PACK_INFO[p.id];
  const plans = plansFor(p);
  const views = viewsFor(p);
  const start = plans.find(x => x.id === (planId || 'abo')) ? (planId || 'abo') : plans[0].id;
  const count = f.refill[0] * (30 / f.refill[1]);
  modalInner.style.setProperty('--tint', p.tint);
  modalInner.style.setProperty('--c', p.dark);
  modalInner.innerHTML = `
    <div class="modal-visual">
      <button class="round-btn" type="button" data-close aria-label="Schließen">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
      </button>
      <div class="gallery-stage" id="galleryStage"></div>
      <div class="gallery-thumbs" role="tablist" aria-label="Ansicht wählen">
        ${views.map((v, i) => `<button class="gthumb" type="button" role="tab" data-view="${v.id}" aria-selected="${i === 0}">${v.label}</button>`).join('')}
      </div>
    </div>
    <div class="modal-body">
      <div>
        <p class="eyebrow">${p.title} · ${p.ingredients}</p>
        <h2>${productName(p)}</h2>
        <p class="modal-role">${p.name} · ${p.role}</p>
      </div>
      <p class="modal-sub">${p.flavor} · ${p.serving}${p.vegan ? ' · vegan' : ' · nicht vegan'}</p>
      <p class="modal-story">${p.story}</p>
      <table class="nutri">
        <caption>Pro Tagesportion (${f.perDay} Fruchtgummis)</caption>
        <thead><tr><th scope="col">Nährstoff</th><th scope="col">Menge</th><th scope="col">% NRV*</th></tr></thead>
        <tbody>${p.nutrients.map(([n, a, r]) => `<tr><th scope="row">${n}</th><td>${a}</td><td>${r}</td></tr>`).join('')}</tbody>
      </table>
      <p class="claim"><b>Was wir sagen dürfen</b>${p.claim}</p>
      ${p.warn ? `<p class="modal-warn">${p.warn}</p>` : ''}
      <div class="plan-pick" role="radiogroup" aria-label="Format und Kaufart">
        ${plans.map(pl => `<label class="plan-opt"><span class="plan-main"><input type="radio" name="plan" id="plan-${pl.id}" value="${pl.id}" data-view="${VIEW_FOR_PLAN[pl.view] || ''}" ${pl.id === start ? 'checked' : ''}><span><b>${pl.label}</b>${pl.save ? `<em class="save">${pl.save}</em>` : ''}<small>${pl.sub}</small></span></span><span class="plan-price"><strong>${eur(pl.price)}</strong><small>${perKg(p, pl.id)}</small></span></label>`).join('')}
      </div>
      <label class="every" for="every">Liefern alle
        <select id="every"><option value="30">30 Tage</option><option value="45">45 Tage</option><option value="60">60 Tage</option></select>
        <span>Pausieren, tauschen, überspringen jederzeit</span></label>
      <button class="btn btn-ink btn-block" type="button" data-modal-add="${p.id}">In den Warenkorb</button>
      <p class="letterbox-note">Nachfüller kommen als Brief durch den Briefkasten. Du musst nicht zu Hause sein.</p>
      <details class="mandatory">
        <summary>Pflichtangaben</summary>
        <dl>
          <div><dt>Bezeichnung</dt><dd>${f.legal}</dd></div>
          <div><dt>Verzehrempfehlung</dt><dd>${p.serving}. ${f.perDay} Fruchtgummis entsprechen einer Tagesportion.</dd></div>
          <div><dt>Füllmenge</dt><dd id="netLine"></dd></div>
          <div><dt>Hinweise</dt><dd>${p.warn ? p.warn + ' ' : ''}Die angegebene empfohlene tägliche Verzehrsmenge darf nicht überschritten werden. Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung. Eine abwechslungsreiche, ausgewogene Ernährung und eine gesunde Lebensweise sind wichtig. Außerhalb der Reichweite von kleinen Kindern aufbewahren.</dd></div>
          <div><dt>Zutaten</dt><dd>Folgen mit der finalen Rezeptur des Herstellers. Gefärbt mit Frucht- und Pflanzenkonzentraten.</dd></div>
        </dl>
      </details>
      <p class="footnote">* NRV = Nährstoffbezugswert laut EU-Verordnung 1169/2011. Mengen und Gewichte sind Richtwerte, bis der Hersteller sie bestätigt. Fotos aus den Design-Frames, Dose noch nicht final.</p>
    </div>`;

  const stageEl = $('#galleryStage', modalInner);
  const show = (vid) => {
    const v = views.find(x => x.id === vid) || views[0];
    stageEl.classList.toggle('is-wide', !!v.wide);
    stageEl.innerHTML = v.html();
    $$('.gthumb', modalInner).forEach(t => t.setAttribute('aria-selected', String(t.dataset.view === v.id)));
  };
  const net = (plan) => {
    $('#netLine', modalInner).textContent = `${plan === 'stock' ? '3 × ' : ''}${count} Fruchtgummis = ${netGrams(p, plan)} g · Grundpreis ${perKg(p, plan)}`;
  };
  const sel = plans.find(x => x.id === start);
  const ev = $('.every', modalInner);
  show(VIEW_FOR_PLAN[sel.view] || views[0].id);
  net(start);
  ev.hidden = !sel.every;
  $('.gallery-thumbs', modalInner).addEventListener('click', e => {
    const t = e.target.closest('.gthumb');
    if (t) show(t.dataset.view);
  });
  $('.plan-pick', modalInner).addEventListener('change', e => {
    if (e.target.dataset.view) show(e.target.dataset.view);
    net(e.target.value);
    ev.hidden = !plans.find(x => x.id === e.target.value)?.every;
  });
  if (!modal.open) modal.showModal();
}
modal.addEventListener('click', e => {
  if (e.target === modal || e.target.closest('[data-close]')) modal.close();
  const add = e.target.closest('[data-modal-add]');
  if (add) {
    const plan = $('input[name="plan"]:checked', modal)?.value || 'once';
    const every = planFor(byId[add.dataset.modalAdd], plan).every ? +($('#every', modal)?.value || 30) : 0;
    addToCart(add.dataset.modalAdd, plan, add, every ? { every } : {});
    modal.close();
  }
});

/* ------------------------------------------------------------------ */
/* Warenkorb                                                           */
/* ------------------------------------------------------------------ */
// Alte Einträge aus früheren Prototyp-Ständen (Sorten, die es noch nicht gibt) fliegen raus
let cart = (store('baerly-cart') || []).filter(l => l && sellable(l.id) && l.qty > 0);
const drawer = $('#drawer');
const overlay = $('#overlay');

function itemInfo(id) {
  return byId[id] || BUNDLES[id];
}
function linePrice(l) {
  return planFor(itemInfo(l.id), l.plan).price * l.qty;
}
function saveCart() { store('baerly-cart', cart); }

function addToCart(id, plan = 'once', fromEl, extra = {}) {
  if (!sellable(id)) return;
  const it = itemInfo(id);
  const found = cart.find(l => l.id === id && l.plan === plan);
  found ? found.qty++ : cart.push({ id, plan, qty: 1, ...extra });
  if (found && extra.every) found.every = extra.every;
  saveCart();
  renderCart();
  flyToCart(id, fromEl);
  toast(`${it.members ? it.name : productName(it)} liegt im Warenkorb`);
}

const faceIds = (id) => BUNDLES[id] ? BUNDLES[id].members : [id];

function flyToCart(id, fromEl) {
  const target = $('#cartOpen');
  target.classList.remove('bump'); void target.offsetWidth; target.classList.add('bump');
  if (reduced || !fromEl) return;
  const a = fromEl.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const fly = document.createElement('div');
  fly.className = 'flyer';
  fly.innerHTML = `<img src="${IMG(faceIds(id)[0]).plush}" alt="">`;
  fly.style.left = (a.left + a.width / 2 - 32) + 'px';
  fly.style.top = (a.top + a.height / 2 - 36) + 'px';
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
  const hasAbo = cart.some(l => l.plan === 'abo');
  $('#ship').innerHTML = (hasAbo || missing === 0
    ? `<b>Gratisversand ist drin.</b> Die Bären reisen kostenlos.`
    : `Noch <b>${eur(missing)}</b> bis zum Gratisversand. Im Abo immer gratis.`) +
    `<div class="ship-bar"><span style="width:${hasAbo ? 100 : Math.min(100, total / SHIPPING_FREE * 100)}%"></span></div>`;

  const items = $('#drawerItems');
  if (!cart.length) {
    items.innerHTML = `<div class="drawer-empty"><img src="${IMG('snoozy').plush}" alt=""><b>Morgen?</b>Noch leer hier. Snooze schläft schon.</div>`;
    return;
  }
  items.innerHTML = cart.map((l, i) => {
    const it = itemInfo(l.id);
    const pl = planFor(it, l.plan);
    const faces = faceIds(l.id).map(id => `<img src="${IMG(id).plush}" alt="">`).join('');
    const canToggle = (l.plan === 'abo' || l.plan === 'once') && (it.members || plansFor(it).some(x => x.id === 'abo'));
    return `<div class="line" style="--tint:${it.tint}">
      <div class="line-img"><span class="faces">${faces}</span></div>
      <div>
        <p class="line-name">${it.members ? it.name : productName(it)}</p>
        <p class="line-meta">${pl.label}${pl.sub ? ' · ' + pl.sub : ''}${l.plan === 'abo' ? ` · alle ${l.every || 30} Tage` : ''}</p>
        ${canToggle ? `<div class="line-plan" role="group" aria-label="Kaufart">
          <button type="button" data-plan="${i}" data-val="abo" aria-pressed="${l.plan === 'abo'}">Abo −20 %</button>
          <button type="button" data-plan="${i}" data-val="once" aria-pressed="${l.plan === 'once'}">Einmal</button>
        </div>` : ''}
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
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
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
  const bundle = e.target.closest('[data-bundle]');
  if (bundle) {
    addToCart(bundle.dataset.bundle, 'once', bundle);
    return;
  }
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

/* Ticker: Gruppe so oft füllen, dass sie breiter als der Bildschirm ist,
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
initQuiz();
renderShop();
renderCrew();
initHaus();
renderEpisodes();
initBeauty();
initAbo();
initKids();
renderCart();
saveCart();
document.title = `${BRAND} Gummies · Same Bears. Better Days.`;
})();
