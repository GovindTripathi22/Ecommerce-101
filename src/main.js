import './style.css';

// SVG Logo markup — reusable, no PNG dependency
const SVG_LOGO = `
  <svg viewBox="0 0 240 60" class="h-10 md:h-12 w-auto logo-glow" aria-label="MRT International">
    <text x="0" y="45" font-family="Manrope, sans-serif" font-weight="800" font-size="40" fill="#003366" letter-spacing="-1.5">MR</text>
    <text x="68" y="45" font-family="Manrope, sans-serif" font-weight="800" font-size="40" fill="#ff8c00" letter-spacing="-1.5">T</text>
    <path d="M98 15L112 5L126 15" fill="none" stroke="#ff8c00" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M112 5V22" fill="none" stroke="#ff8c00" stroke-width="5" stroke-linecap="round"/>
    <text x="0" y="58" font-family="Manrope, sans-serif" font-weight="600" font-size="10" fill="#003366" opacity="0.6" letter-spacing="4">INTERNATIONAL</text>
  </svg>
`;

class MRTApp {
  constructor() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    this.isBoutique = window.location.pathname.includes('category.html');
    this.currentCategory = new URLSearchParams(window.location.search).get('c');

    this.injectLogos();
    this.init();
  }

  async init() {
    this.initLenis();
    this.initScrollReveal();

    if (this.isBoutique && this.currentCategory) {
      await this.initBoutique();
    } else {
      await this.fetchData();
    }

    this.animateReveals();
    this.bindEvents();
  }

  /* ──────────────────────────────
     Logo Injection
  ────────────────────────────── */
  injectLogos() {
    document.querySelectorAll('[data-logo]').forEach(el => {
      el.innerHTML = SVG_LOGO;
    });
  }

  /* ──────────────────────────────
     Boutique Mode (category.html)
  ────────────────────────────── */
  async initBoutique() {
    const container = document.getElementById('category-products-container');
    if (!container) return;

    try {
      const [productsRes, themesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/themes')
      ]);

      if (!productsRes.ok || !themesRes.ok) throw new Error('API error');

      const products = await productsRes.json();
      const themes = await themesRes.json();

      const theme = themes[this.currentCategory];

      if (theme) {
        this.applyTheme(theme);
        this.renderBoutiqueProducts(products, this.currentCategory, container);
      } else {
        container.innerHTML = `<p class="col-span-full text-center serif italic opacity-50 py-20">No products found for this category.</p>`;
      }
    } catch (err) {
      console.error('Boutique sync failed:', err);
      if (container) {
        container.innerHTML = `<p class="col-span-full text-center serif italic opacity-50 py-20">Could not load products. Please ensure the server is running.</p>`;
      }
    }
  }

  applyTheme(theme) {
    const root = document.documentElement;
    root.style.setProperty('--category-primary', theme.primary || '#914d00');
    root.style.setProperty('--category-secondary', theme.secondary || '#f28c28');

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setImg = (id, src) => { const el = document.getElementById(id); if (el && src) el.src = src; };
    const setAttr = (id, attr, val) => { const el = document.getElementById(id); if (el) el.setAttribute(attr, val); };

    set('category-title', theme.title || 'Boutique Collection');
    set('category-subtitle', theme.subtitle || 'Curated products delivered worldwide.');
    set('category-label', `MRT ${theme.title} Pillar`);
    setImg('category-image', theme.image);
    setImg('category-image-showcase', theme.image);

    document.title = `${theme.title} | MRT International`;
  }

  createProductCard(product) {
    const price = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;
    const category = (product.category || '').replace(/-/g, ' ');
    const icon = product.icon || 'shopping_bag';
    const image = product.image || '';
    const name = product.name || 'Product';

    return `
      <div class="product-card reveal-up">
        <div class="product-image-container group">
          ${image
            ? `<img src="${image}" alt="${name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy">`
            : `<div class="w-full h-full flex items-center justify-center opacity-20"><span class="material-symbols-outlined text-6xl">image</span></div>`
          }
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
          <button class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-on-surface p-3 rounded-xl shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" aria-label="Add to cart">
            <span class="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
        <div class="mt-2">
          <div class="flex justify-between items-start mb-1 gap-2">
            <h3 class="text-lg font-headline italic tracking-tight leading-snug">${name}</h3>
            <span class="font-bold text-sm whitespace-nowrap" style="color:var(--category-primary, #914d00)">$${price}</span>
          </div>
          <div class="flex items-center gap-1 text-xs text-on-surface-variant font-bold uppercase tracking-widest opacity-50">
            <span class="material-symbols-outlined text-sm">${icon}</span>
            ${category}
          </div>
        </div>
      </div>
    `;
  }

  renderBoutiqueProducts(products, category, container) {
    const filtered = products.filter(p => p.category === category);

    if (filtered.length === 0) {
      container.innerHTML = `<p class="col-span-full text-center serif italic opacity-50 py-20">No products in this collection yet — check back soon.</p>`;
      return;
    }

    container.innerHTML = filtered.map(p => this.createProductCard(p)).join('');
  }

  /* ──────────────────────────────
     Homepage Mode
  ────────────────────────────── */
  initLenis() {
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  async fetchData() {
    try {
      const [productsRes, testimonialsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/testimonials')
      ]);

      const products = await productsRes.json();
      const testimonials = await testimonialsRes.json();

      this.renderProducts(products);
      this.renderTestimonials(testimonials);
    } catch (err) {
      console.error('Data sync failed:', err);
    }
  }

  renderProducts(products) {
    const categories = [
      { id: 'home-kitchen-carousel', slug: 'home-kitchen' },
      { id: 'health-care-carousel', slug: 'health-personal-care' },
      { id: 'beauty-skincare-carousel', slug: 'beauty-skincare' },
      { id: 'pet-carousel', slug: 'pet-supplies' },
      { id: 'baby-carousel', slug: 'baby-products' },
      { id: 'electronics-carousel', slug: 'electronics-accessories' },
      { id: 'sports-carousel', slug: 'sports-fitness' }
    ];

    categories.forEach(cat => {
      const container = document.getElementById(cat.id);
      if (!container) return;

      const filtered = products.filter(p => p.category === cat.slug);

      container.innerHTML = filtered.map(product => `
        <div class="product-card">
          <div class="product-image-container group">
            ${product.image
              ? `<img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy">`
              : `<div class="w-full h-full flex items-center justify-center opacity-20"><span class="material-symbols-outlined text-6xl">image</span></div>`
            }
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            <button class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-on-surface p-3 rounded-xl shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span class="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div class="mt-2">
            <div class="flex justify-between items-start mb-1 gap-2">
              <h3 class="text-lg font-headline italic tracking-tight">${product.name}</h3>
              <span class="font-bold text-sm text-primary whitespace-nowrap">$${product.price}</span>
            </div>
            <div class="flex items-center gap-1 text-xs text-on-surface-variant font-bold uppercase tracking-widest opacity-50">
              <span class="material-symbols-outlined text-sm">${product.icon || 'shopping_bag'}</span>
              ${cat.slug.replace(/-/g, ' ')}
            </div>
          </div>
        </div>
      `).join('');
    });
  }

  renderTestimonials(testimonials) {
    const renderList = (targetId, region) => {
      const container = document.getElementById(targetId);
      if (!container) return;

      const filtered = testimonials.filter(t => t.region === region);
      container.innerHTML = filtered.map(t => `
        <div class="reveal-up p-8 bg-surface-container rounded-3xl border border-outline-variant/10 hover:shadow-xl transition-all duration-500 group">
          <div class="flex mb-4">
            ${Array(5).fill('<span class="material-symbols-outlined text-sm text-primary">star</span>').join('')}
          </div>
          <p class="text-xl font-headline italic mb-6 leading-relaxed group-hover:text-primary transition-colors">"${t.text}"</p>
          <div class="flex justify-between items-center">
            <span class="font-bold text-sm uppercase tracking-widest opacity-80">${t.name}</span>
            <span class="text-xs text-on-surface-variant uppercase tracking-widest font-bold opacity-40">${t.location}</span>
          </div>
        </div>
      `).join('');
    };

    renderList('testimonials-us', 'us');
    renderList('testimonials-ae', 'ae');
  }

  /* ──────────────────────────────
     Animations & Events
  ────────────────────────────── */
  initScrollReveal() {
    // handled by animateReveals after data loads
  }

  animateReveals() {
    if (typeof gsap === 'undefined') return;
    gsap.utils.toArray('.reveal-up').forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    });
  }

  bindEvents() {
    document.querySelectorAll('.nav-prev, .nav-next').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const container = document.getElementById(targetId);
        if (!container) return;
        const scrollAmount = btn.classList.contains('nav-prev') ? -400 : 400;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MRTApp();
});
