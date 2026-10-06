(() => {
  'use strict';

  const RAW='https://raw.githubusercontent.com/REGRESI/Gummieempire/16d28e10ffb4495b6033d4d56c62bbb2ceb2ce50/assets/';
  const HOME_PREVIEW='https://htmlpreview.github.io/?https://github.com/REGRESI/Gummieempire/blob/baerly/premium-launch-redesign/index.html';

  const PRODUCTS={
    glow:{
      name:'GLOW', subtitle:'Beauty Gummies', flavor:'Himbeere', price:'26,90 €', subPrice:'21,52 €',
      tone:'#efc0cf', accent:'#b50043', character:'plush-glow.webp', jar:'products/glow-front.webp',
      role:'The Main Character',
      desc:'Deine Beauty-Routine in Gummy-Form — clean, unkompliziert und gemacht für jeden Tag.',
      tags:['Beauty Routine','60 Gummies','Himbeere'],
      ingredients:[['Biotin','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.'],['Zink','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.'],['Vitamin C','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.']],
      characterCopy:'GLOW liebt Spiegel, Self-Care und ein bisschen Drama. Sie macht aus Routine einen Moment — und ist dabei immer unverkennbar bärly.'
    },
    flex:{
      name:'FLEX', subtitle:'Kreatin Gummies', flavor:'Blaubeere', price:'29,90 €', subPrice:'23,92 €',
      tone:'#c6d5ef', accent:'#173d86', character:'plush-flex.webp', jar:'products/flex-front.webp',
      role:'The Gym Bro',
      desc:'Kreatin als unkomplizierte Gummy-Routine für Trainingstage, Rest Days und alles dazwischen.',
      tags:['Performance Routine','60 Gummies','Blaubeere'],
      ingredients:[['Kreatin','Teil der geplanten Rezeptur. Finale Tagesmenge wird vor Launch bestätigt.'],['Vitamin B6','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.'],['Vitamin B12','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.']],
      characterCopy:'FLEX ist der Typ, der „nur noch einen Satz“ sagt und 40 Minuten später immer noch trainiert. Motiviert, loyal und nie ohne seine Sportbrille.'
    },
    snoozy:{
      name:'SNOOZY', subtitle:'Sleep Gummies', flavor:'Waldbeere', price:'24,90 €', subPrice:'19,92 €',
      tone:'#cdbde5', accent:'#53228d', character:'plush-snooze.webp', jar:'products/snoozy-front.webp',
      role:'The Chill Guy',
      desc:'Eine entspannte Evening-Routine in Gummy-Form — für den Moment, an dem der Tag langsam leiser wird.',
      tags:['Night Routine','60 Gummies','Waldbeere'],
      ingredients:[['Melatonin','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.'],['Magnesium','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.'],['Vitamin B6','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.']],
      characterCopy:'SNOOZY ist maximal unbeeindruckt von Chaos. Schlafmütze, Kissen, trockener Humor — und vermutlich schon eingeschlafen, bevor du diesen Satz zu Ende liest.'
    },
    daily:{
      name:'DAILY', subtitle:'Multivitamin Gummies', flavor:'Zitrone-Mango', price:'24,90 €', subPrice:'19,92 €',
      tone:'#ead084', accent:'#a45d00', character:'plush-daily.webp', jar:'products/daily-front.webp',
      role:'The Organizer',
      desc:'Die unkomplizierte Daily-Routine für alle, die ihre Basics gerne einfach, klar und griffbereit haben.',
      tags:['Daily Routine','60 Gummies','Zitrone-Mango'],
      ingredients:[['Vitamin D','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.'],['Vitamin B12','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.'],['Zink','Teil der geplanten Rezeptur. Finale Menge wird vor Launch bestätigt.']],
      characterCopy:'DAILY hält die Crew zusammen. Kalender offen, Tasche gepackt, alles im Blick — zumindest bis GLOW, FLEX und SNOOZY den Plan wieder zerlegen.'
    }
  };

  const id=document.body.dataset.product;
  const p=PRODUCTS[id] || PRODUCTS.glow;
  document.documentElement.style.setProperty('--tone',p.tone);
  document.documentElement.style.setProperty('--accent',p.accent);
  document.title=`bärly ${p.name} — ${p.subtitle}`;

  const homeHref=location.hostname==='htmlpreview.github.io' ? HOME_PREVIEW : '../index.html';
  document.querySelectorAll('[data-home]').forEach(a=>a.href=homeHref);

  document.querySelector('#pdpRoot').innerHTML=`
    <section class="pdp-top">
      <div class="gallery">
        <div class="gallery-card hero-img"><img class="product" src="${RAW+p.jar}" alt="bärly ${p.name} ${p.subtitle}"></div>
        <div class="gallery-card character"><img src="${RAW+p.character}" alt="${p.name} Character"></div>
        <div class="gallery-card copy-card"><span>bärly Crew</span><strong>${p.role}</strong></div>
      </div>

      <div class="buybox">
        <div class="crumb">bärly / The Original Four / ${p.name}</div>
        <p class="pdp-kicker">${p.subtitle}</p>
        <h1>${p.name}</h1>
        <p class="subtitle">${p.flavor} · 60 Gummies</p>
        <p class="desc">${p.desc}</p>
        <div class="tags">${p.tags.map(x=>`<span class="tag">${x}</span>`).join('')}</div>

        <span class="field-label">Geschmack</span>
        <div class="choice-row"><button class="choice active" type="button">${p.flavor}</button></div>

        <span class="field-label">Größe</span>
        <div class="choice-row"><button class="choice active" type="button">60 Gummies</button></div>

        <div class="purchase-options">
          <div class="purchase-option active" data-purchase="once">
            <span class="radio"></span>
            <div><strong>Einmalkauf</strong><small>Einmal geliefert</small></div>
            <div class="price">${p.price}</div>
          </div>
          <div class="purchase-option" data-purchase="sub">
            <span class="radio"></span>
            <div><strong>Subscribe & Save</strong><small>20 % Abo-Vorteil · flexibel geplant</small></div>
            <div class="price"><span class="old">${p.price}</span>${p.subPrice}</div>
          </div>
        </div>

        <button class="cta" id="earlyAccess" type="button">Early Access sichern</button>
        <div class="microcopy">Launch-Prototyp · finale Rezeptur, Pflichtangaben und Konditionen folgen vor Verkaufsstart.</div>
      </div>
    </section>

    <div class="pdp-sections">
      <section class="pdp-section">
        <div class="eyebrow">Tell me more</div>
        <div><h2>Eine Routine, die du gerne siehst.</h2><p>${p.desc} bärly verbindet ein erwachsenes Premium-Packaging mit einer eigenen Character-Welt — damit das Produkt nicht im Schrank verschwindet, sondern Teil deiner Routine wird.</p></div>
      </section>

      <section class="pdp-section">
        <div class="eyebrow">Key Ingredients</div>
        <div>
          <h2>Was drin sein soll.</h2>
          <div class="ingredient-grid">${p.ingredients.map(([a,b])=>`<div class="ingredient"><strong>${a}</strong><span>${b}</span></div>`).join('')}</div>
          <p style="margin-top:18px">Die Rezeptur befindet sich noch in Finalisierung. Verbindlich sind ausschließlich die Angaben auf dem finalen Produktetikett.</p>
        </div>
      </section>

      <section class="pdp-section">
        <div class="eyebrow">How to use</div>
        <div><h2>Keep it simple.</h2><p>Die finale Verzehrempfehlung wird nach Abschluss der Rezeptur auf dem Produktetikett angegeben. Unser Ziel: eine simple Tagesroutine ohne komplizierte Dosierlogik.</p></div>
      </section>

      <section class="pdp-section">
        <div class="eyebrow">Meet ${p.name}</div>
        <div class="character-panel">
          <img src="${RAW+p.character}" alt="${p.name} Character">
          <div><h3>${p.role}</h3><p>${p.characterCopy}</p></div>
        </div>
      </section>

      <section class="pdp-section pdp-faq">
        <div class="eyebrow">FAQ</div>
        <div>
          <h2>Noch Fragen?</h2>
          <details><summary>Ist die Rezeptur final?</summary><p>Noch nicht vollständig. Zutaten, Mengen und Pflichtangaben werden vor Verkaufsstart final geprüft.</p></details>
          <details><summary>Wie funktioniert das Abo?</summary><p>Geplant ist ein flexibles Modell mit 20 % Vorteil. Finale Intervalle und Bedingungen werden vor Launch bestätigt.</p></details>
          <details><summary>Wann kann ich bestellen?</summary><p>Trag dich in den Founders Club ein. Dort kommunizieren wir den ersten Drop zuerst.</p></details>
        </div>
      </section>
    </div>
  `;

  document.querySelectorAll('.purchase-option').forEach(el=>{
    el.addEventListener('click',()=>{
      document.querySelectorAll('.purchase-option').forEach(x=>x.classList.remove('active'));
      el.classList.add('active');
    });
  });

  document.querySelector('#earlyAccess').addEventListener('click',()=> {
    location.href = homeHref + (homeHref.includes('?') ? '#founders' : '#founders');
  });
})();