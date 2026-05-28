// ===== LOCATION DATA =====
const CITIES = {
  georgia: { name:'Georgia', video:'assets/georgia.mp4', img:'1600596542815-ffad4c1539a9' },
  florida: { name:'Florida', video:'assets/florida.mp4', img:'1512917774080-9991f1c4c750' },
};

// ===== ELEMENTS =====
const video    = document.getElementById('bgVideo');
const locRail  = document.getElementById('locRail');
const aboutImg = document.getElementById('aboutImg');

// ===== LOCATION SWITCHER (changes hero video + story image) =====
function switchCity(key) {
  const c = CITIES[key];
  if (!c) return;
  const source = video.querySelector('source');
  if (source.getAttribute('src') !== c.video) {
    video.style.opacity = '0';
    setTimeout(() => {
      source.setAttribute('src', c.video);
      video.load(); video.play().catch(() => {});
      video.style.opacity = '1';
    }, 300);
  }
  aboutImg.src = `https://images.unsplash.com/photo-${c.img}?auto=format&fit=crop&w=900&q=80`;
  locRail.querySelectorAll('li').forEach(li => li.classList.toggle('active', li.dataset.city === key));
}
locRail.querySelectorAll('li').forEach(li => li.addEventListener('click', () => switchCity(li.dataset.city)));
document.querySelectorAll('.overlay-offices a').forEach(a =>
  a.addEventListener('click', e => { e.preventDefault(); switchCity(a.dataset.city); closeOverlay(); }));

// ===== VOLUME =====
const volBtn = document.getElementById('volBtn'), volIcon = document.getElementById('volIcon');
volBtn.addEventListener('click', () => {
  video.muted = !video.muted;
  volIcon.textContent = video.muted ? '🔇' : '🔊';
  if (!video.muted) video.play().catch(() => {});
});

// ===== MENU OVERLAY =====
const overlay = document.getElementById('overlay');
function openOverlay(){ overlay.classList.add('open'); }
function closeOverlay(){ overlay.classList.remove('open'); }
document.getElementById('menuBtn').addEventListener('click', openOverlay);
document.getElementById('menuBtnTop').addEventListener('click', openOverlay);
document.getElementById('overlayClose').addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
overlay.querySelectorAll('.overlay-nav a').forEach(a => a.addEventListener('click', closeOverlay));

// ===== STICKY HEADER ON SCROLL =====
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('show', window.scrollY > window.innerHeight * 0.85);
});

// ===== GALLERY =====
const galleryPhotos = ['1613490493576-7fde63acd811','1564013799919-ab600027ffc6','1600585154340-be6161a56a0c',
  '1600596542815-ffad4c1539a9','1512917774080-9991f1c4c750','1605276374104-dee2a0ed3cd6',
  '1600607687939-ce8a6c25118c','1600210492486-724fe5c67fb0','1512941937669-90a1b58e7e9c'];
document.getElementById('galleryGrid').innerHTML = galleryPhotos.map(id =>
  `<img src="https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80" alt="Propiedad de lujo" loading="lazy">`).join('');

// ===== LISTINGS =====
const listings = [
  { price:'$1,250,000', addr:'Brookhaven Estate',  city:'Atlanta, Georgia', img:'1613490493576-7fde63acd811', bed:5, bath:5, sqft:'5,200', badge:'Nuevo' },
  { price:'$890,000',   addr:'Buckhead Modern',     city:'Atlanta, Georgia', img:'1564013799919-ab600027ffc6', bed:4, bath:4, sqft:'3,900', badge:'Open House' },
  { price:'$675,000',   addr:'Norcross Family Home',city:'Norcross, Georgia', img:'1600585154340-be6161a56a0c', bed:4, bath:3, sqft:'2,800', badge:'' },
  { price:'$2,400,000', addr:'Bayfront Villa',      city:'Miami, Florida',   img:'1600596542815-ffad4c1539a9', bed:6, bath:7, sqft:'6,100', badge:'' },
  { price:'$1,050,000', addr:'Coral Gables Retreat',city:'Miami, Florida',   img:'1512917774080-9991f1c4c750', bed:4, bath:4, sqft:'3,400', badge:'Open House' },
  { price:'$540,000',   addr:'Orlando Investment',  city:'Orlando, Florida', img:'1605276374104-dee2a0ed3cd6', bed:3, bath:3, sqft:'2,100', badge:'Inversión' },
];
document.getElementById('cards').innerHTML = listings.map(l => `
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

// ===== LIGHTBOX (gallery + press image) =====
const lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg');
function openLightbox(src){ lightboxImg.src = src; lightbox.classList.add('open'); }
document.getElementById('galleryGrid').addEventListener('click', e => { if (e.target.tagName === 'IMG') openLightbox(e.target.src); });
document.querySelector('.press-img').addEventListener('click', e => { e.preventDefault(); openLightbox('assets/article.jpg'); });
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

// ===== CONTACT FORM =====
document.getElementById('gitForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('gitMsg').textContent = '¡Gracias! Te contactaremos muy pronto.';
  e.target.reset();
});

// ===== ESC + REVEAL =====
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeOverlay(); lightbox.classList.remove('open'); } });
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold:0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.querySelectorAll('.site-title, .card, .service, .about-img, .ceo-photo, .press-card').forEach(el => { el.classList.add('reveal'); io.observe(el); });
