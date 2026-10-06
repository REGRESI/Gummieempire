(() => {
  'use strict';

  const DATA = [
    {id:'glow', name:'GLOW', type:'Beauty Gummies', meta:'Biotin · Zink · Vitamin C', flavor:'Himbeere', price:'26,90 €', tone:'#edc0cf', jar:'assets/jar-glow.webp', char:'assets/plush-glow.webp', role:'The Main Character', find:'Für Beauty, Self-Care und deine tägliche Glow-Routine.'},
    {id:'flex', name:'FLEX', type:'Kreatin Gummies', meta:'Kreatin · Vitamin B6 · B12', flavor:'Blaubeere', price:'29,90 €', tone:'#bfd0ec', jar:'assets/jar-flex.webp', char:'assets/plush-flex.webp', role:'The Gym Bro', find:'Für Performance, Training und eine einfache Kreatin-Routine.'},
    {id:'snoozy', name:'SNOOZY', type:'Sleep Gummies', meta:'Melatonin · Magnesium · Vitamin B6', flavor:'Waldbeere', price:'24,90 €', tone:'#c7b8e2', jar:'assets/jar-snoozy.webp', char:'assets/plush-snooze.webp', role:'The Chill Guy', find:'Für deine Abendroutine und einen klaren Cut zwischen Tag und Nacht.'},
    {id:'daily', name:'DAILY', type:'Multivitamin Gummies', meta:'12 Vitamine · 3 Mineralstoffe', flavor:'Zitrone-Mango', price:'24,90 €', tone:'#e5c46d', jar:'assets/jar-daily.webp', char:'assets/plush-daily.webp', role:'The Organizer', find:'Für Everyday Wellness und eine unkomplizierte tägliche Basis.'}
  ];

  const productGrid = document.querySelector('#productGrid');
  const crewGrid = document.querySelector('#crewGrid');
  const finderResult = document.querySelector('#finderResult');

  productGrid.innerHTML = DATA.map(p => `
    <article class="product-card" style="--tone:${p.tone}">
      <div class="product-media"><img class="jar" src="${p.jar}" alt="bärly ${p.name} ${p.type}"></div>
      <span class="type">${p.type}</span>
      <h3>${p.name}</h3>
      <p class="meta">${p.meta}<br>60 Gummies · ${p.flavor}</p>
      <div class="card-foot"><span class="price">${p.price}</span><a href="#founders">Early Access</a></div>
    </article>
  `).join('');

  crewGrid.innerHTML = DATA.map(p => `
    <article class="crew-card" style="--tone:${p.tone}">
      <div class="crew-art"><img src="${p.char}" alt="${p.name} Character"></div>
      <div class="crew-copy"><h3>${p.name}</h3><p>${p.role}</p></div>
    </article>
  `).join('');

  document.querySelectorAll('[data-find]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = DATA.find(x => x.id === btn.dataset.find);
      finderResult.innerHTML = `<strong>${p.name}</strong><p>${p.find}</p>`;
      finderResult.style.background = p.tone;
      finderResult.style.color = '#19171b';
      finderResult.querySelector('p').style.color = 'rgba(25,23,27,.66)';
    });
  });

  const form = document.querySelector('#foundersForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('#foundersMsg').textContent = 'Danke — Formular ist im Prototyp noch nicht mit dem Newsletter-System verbunden.';
  });
})();