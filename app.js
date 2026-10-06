(() => {
  'use strict';

  const PREVIEW_BASE = 'https://htmlpreview.github.io/?https://github.com/REGRESI/Gummieempire/blob/baerly/premium-launch-redesign/';
  const RAW = 'https://raw.githubusercontent.com/REGRESI/Gummieempire/16d28e10ffb4495b6033d4d56c62bbb2ceb2ce50/assets/';

  const DATA = [
    {id:'glow', name:'GLOW', type:'Beauty Gummies', meta:'Biotin · Zink · Vitamin C', flavor:'Himbeere', price:'26,90 €', tone:'#edc0cf', jar:RAW+'products/glow-front.webp', char:RAW+'plush-glow.webp', role:'The Main Character', find:'Für Beauty, Self-Care und deine tägliche Glow-Routine.', page:'products/glow.html'},
    {id:'flex', name:'FLEX', type:'Kreatin Gummies', meta:'Kreatin · Vitamin B6 · B12', flavor:'Blaubeere', price:'29,90 €', tone:'#bfd0ec', jar:RAW+'products/flex-front.webp', char:RAW+'plush-flex.webp', role:'The Gym Bro', find:'Für Performance, Training und eine einfache Kreatin-Routine.', page:'products/flex.html'},
    {id:'snoozy', name:'SNOOZY', type:'Sleep Gummies', meta:'Melatonin · Magnesium · Vitamin B6', flavor:'Waldbeere', price:'24,90 €', tone:'#c7b8e2', jar:RAW+'products/snoozy-front.webp', char:RAW+'plush-snooze.webp', role:'The Chill Guy', find:'Für deine Abendroutine und einen klaren Cut zwischen Tag und Nacht.', page:'products/snoozy.html'},
    {id:'daily', name:'DAILY', type:'Multivitamin Gummies', meta:'Vitamin D · B12 · Zink', flavor:'Zitrone-Mango', price:'24,90 €', tone:'#e5c46d', jar:RAW+'products/daily-front.webp', char:RAW+'plush-daily.webp', role:'The Organizer', find:'Für Everyday Wellness und eine unkomplizierte tägliche Basis.', page:'products/daily.html'}
  ];

  const toPage = path => location.hostname === 'htmlpreview.github.io' ? PREVIEW_BASE + path : path;

  document.querySelectorAll('[data-product-page]').forEach(link => {
    link.href = toPage(link.dataset.productPage);
  });

  const productGrid = document.querySelector('#productGrid');
  const crewGrid = document.querySelector('#crewGrid');
  const finderResult = document.querySelector('#finderResult');

  productGrid.innerHTML = DATA.map((p, i) => `
    <article class="product-card" style="--tone:${p.tone}">
      <a class="product-card-link" href="${toPage(p.page)}" aria-label="${p.name} ansehen"></a>
      <span class="card-index">${String(i + 1).padStart(2,'0')} / 04</span>
      <div class="product-media"><img class="jar" src="${p.jar}" alt="bärly ${p.name} ${p.type}"></div>
      <span class="type">${p.type}</span>
      <h3>${p.name}</h3>
      <p class="meta">${p.meta}<br>60 Gummies · ${p.flavor}</p>
      <div class="card-foot"><span class="price">${p.price}</span><a class="product-cta" href="${toPage(p.page)}">Produkt ansehen →</a></div>
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
      finderResult.innerHTML = `<strong>${p.name}</strong><p>${p.find}</p><a href="${toPage(p.page)}">Produkt ansehen →</a>`;
      finderResult.style.background = p.tone;
      finderResult.style.color = '#19171b';
      finderResult.querySelector('p').style.color = 'rgba(25,23,27,.66)';
    });
  });

  const menuBtn = document.querySelector('#menuBtn');
  const mobileMenu = document.querySelector('#mobileMenu');
  if (menuBtn && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    };
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 650) closeMenu(); });
  }

  const form = document.querySelector('#foundersForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('#foundersMsg').textContent = 'Danke — das Formular wird vor Launch mit dem Newsletter-System verbunden.';
  });
})();