// ===== HELPERS =====
const $ = id => document.getElementById(id);
const PAGE_LOC = document.body.dataset.loc || ''; // '' en la home; 'georgia'|'florida'|'dubai' en páginas

// ===== LOCATION RAIL → navega a la página de la ubicación =====
const locRail = $('locRail');
if (locRail) {
  locRail.querySelectorAll('li').forEach(li =>
    li.addEventListener('click', () => { window.location.href = li.dataset.city + '.html'; }));
}

// ===== MENU OVERLAY =====
const overlay = $('overlay');
function openOverlay(){ overlay && overlay.classList.add('open'); }
function closeOverlay(){ overlay && overlay.classList.remove('open'); }
$('menuBtn')   && $('menuBtn').addEventListener('click', openOverlay);
$('menuBtnTop')&& $('menuBtnTop').addEventListener('click', openOverlay);
$('overlayClose') && $('overlayClose').addEventListener('click', closeOverlay);
if (overlay) {
  overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
  overlay.querySelectorAll('.overlay-nav a').forEach(a => a.addEventListener('click', closeOverlay));
}

// ===== VOLUME =====
const video = $('bgVideo'), volBtn = $('volBtn'), volIcon = $('volIcon');
if (video && volBtn) {
  volBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (volIcon) volIcon.textContent = video.muted ? '🔇' : '🔊';
    if (!video.muted) video.play().catch(() => {});
  });
}

// ===== STICKY HEADER ON SCROLL =====
const siteHeader = $('siteHeader');
if (siteHeader) window.addEventListener('scroll', () =>
  siteHeader.classList.toggle('show', window.scrollY > window.innerHeight * 0.85));

// ===== TEAM (solo en la home) =====
const teamGrid = $('teamGrid');
if (teamGrid) {
  const team = [
    { name:'Michel Calmet',  role:'CEO / Fundador',              img:'1560250097-0b93528c311a' },
    { name:'Valentina Cruz', role:'Realtor Associate · Georgia',  img:'1573496359142-b8d87734a5a2' },
    { name:'Marcos Herrera', role:'Realtor Associate · Florida',  img:'1500648767791-00dcc994a43e' },
    { name:'Sofía Vega',     role:'Especialista en Inversiones',  img:'1494790108377-be9c29b29330' },
    { name:'Daniel Reyes',   role:'Asesor de Bienes Raíces',      img:'1507003211169-0a1dd7228f2d' },
    { name:'Camila Ortiz',   role:'Coordinadora de Clientes',     img:'1438761681033-6461ffad8d80' },
    { name:'Tomás Lara',     role:'Educación Financiera',         img:'1472099645785-5658abf4ff4e' },
    { name:'Isabella Mora',  role:'Realtor Associate · Dubai',    img:'1544005313-94ddf0286df2' },
  ];
  teamGrid.innerHTML = team.map(m => `
    <div class="member reveal">
      <div class="member-img"><img src="https://images.unsplash.com/photo-${m.img}?auto=format&fit=crop&w=500&q=80" alt="${m.name}" loading="lazy"></div>
      <p class="member-name">${m.name}</p>
      <p class="member-role">${m.role}</p>
    </div>`).join('');
}

// ===== GALLERY (solo donde exista) =====
const galleryGrid = $('galleryGrid');
if (galleryGrid) {
  const galleryPhotos = ['1613490493576-7fde63acd811','1564013799919-ab600027ffc6','1600585154340-be6161a56a0c',
    '1600596542815-ffad4c1539a9','1512917774080-9991f1c4c750','1605276374104-dee2a0ed3cd6',
    '1600607687939-ce8a6c25118c','1600210492486-724fe5c67fb0','1512941937669-90a1b58e7e9c'];
  galleryGrid.innerHTML = galleryPhotos.map(id =>
    `<img src="https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80" alt="Propiedad de lujo" loading="lazy">`).join('');
}

// ===== LISTINGS (home = todas; página de ubicación = filtradas) =====
const cards = $('cards');
if (cards) {
  const LISTINGS = [
    { loc:'georgia', price:'$1,250,000', addr:'Brookhaven Estate',   city:'Atlanta, Georgia',  img:'1613490493576-7fde63acd811', bed:5, bath:5, sqft:'5,200', badge:'Nuevo' },
    { loc:'georgia', price:'$890,000',   addr:'Buckhead Modern',      city:'Atlanta, Georgia',  img:'1564013799919-ab600027ffc6', bed:4, bath:4, sqft:'3,900', badge:'Open House' },
    { loc:'georgia', price:'$675,000',   addr:'Norcross Family Home', city:'Norcross, Georgia', img:'1600585154340-be6161a56a0c', bed:4, bath:3, sqft:'2,800', badge:'' },
    { loc:'florida', price:'$2,400,000', addr:'Bayfront Villa',       city:'Miami, Florida',    img:'1600596542815-ffad4c1539a9', bed:6, bath:7, sqft:'6,100', badge:'' },
    { loc:'florida', price:'$1,050,000', addr:'Coral Gables Retreat', city:'Miami, Florida',    img:'1512917774080-9991f1c4c750', bed:4, bath:4, sqft:'3,400', badge:'Open House' },
    { loc:'florida', price:'$540,000',   addr:'Orlando Investment',   city:'Orlando, Florida',  img:'1605276374104-dee2a0ed3cd6', bed:3, bath:3, sqft:'2,100', badge:'Inversión' },
    { loc:'dubai',   price:'$8,900,000', addr:'Palm Jumeirah Villa',  city:'Palm Jumeirah, Dubai', img:'1512917774080-9991f1c4c750', bed:6, bath:8, sqft:'9,400', badge:'' },
    { loc:'dubai',   price:'$4,200,000', addr:'Downtown Penthouse',   city:'Downtown, Dubai',   img:'1600585154340-be6161a56a0c', bed:4, bath:5, sqft:'4,800', badge:'Nuevo' },
    { loc:'dubai',   price:'$15,000,000',addr:'Emirates Hills Mansion',city:'Emirates Hills, Dubai', img:'1613490493576-7fde63acd811', bed:8, bath:10, sqft:'16,000', badge:'' },
  ];
  const shown = PAGE_LOC ? LISTINGS.filter(l => l.loc === PAGE_LOC) : LISTINGS;
  cards.innerHTML = shown.map(l => `
    <article class="card reveal">
      <div class="card-img">
        <img src="https://images.unsplash.com/photo-${l.img}?auto=format&fit=crop&w=800&q=80" alt="${l.addr}" loading="lazy">
        <span class="card-price">${l.price}</span>
        ${l.badge ? `<span class="card-badge">${l.badge}</span>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-addr">${l.addr}</h3>
        <p class="card-city">${l.city}</p>
        <div class="card-meta"><span><b>${l.bed}</b> Hab</span><span><b>${l.bath}</b> Baños</span><span><b>${l.sqft}</b> ft²</span></div>
      </div>
    </article>`).join('');
}

// ===== LIGHTBOX (galería + prensa) =====
const lightbox = $('lightbox'), lightboxImg = $('lightboxImg');
function openLightbox(src){ if (lightbox){ lightboxImg.src = src; lightbox.classList.add('open'); } }
if (galleryGrid) galleryGrid.addEventListener('click', e => { if (e.target.tagName === 'IMG') openLightbox(e.target.src); });
$('pressImg') && $('pressImg').addEventListener('click', () => openLightbox('assets/article.jpg'));
$('lightboxClose') && $('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

// ===== CONTACT FORM =====
const gitForm = $('gitForm');
if (gitForm) gitForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = $('gitMsg'); if (msg) msg.textContent = '¡Gracias! Te contactaremos muy pronto.';
  e.target.reset();
});

// ===== ESC + REVEAL =====
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeOverlay(); lightbox && lightbox.classList.remove('open'); } });
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold:0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.querySelectorAll('.site-title, .card, .member, .service, .about-img, .ceo-photo, .press-figure').forEach(el => { el.classList.add('reveal'); io.observe(el); });
