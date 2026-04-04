import './style.css';

const SVG_LOGO = `
  <svg viewBox="0 0 240 60" class="h-10 md:h-12 w-auto logo-glow" aria-label="MRT International">
    <text x="0" y="45" font-family="Manrope, sans-serif" font-weight="800" font-size="40" fill="#003366" letter-spacing="-1.5">MR</text>
    <text x="68" y="45" font-family="Manrope, sans-serif" font-weight="800" font-size="40" fill="#ff8c00" letter-spacing="-1.5">T</text>
    <path d="M98 15L112 5L126 15" fill="none" stroke="#ff8c00" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M112 5V22" fill="none" stroke="#ff8c00" stroke-width="5" stroke-linecap="round"/>
    <text x="0" y="58" font-family="Manrope, sans-serif" font-weight="600" font-size="10" fill="#003366" opacity="0.6" letter-spacing="4">INTERNATIONAL</text>
  </svg>
`;

class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('mrt_cart')) || [];
    this.drawer = document.getElementById('cart-drawer');
    this.backdrop = document.getElementById('drawer-backdrop');
    this.itemsContainer = document.getElementById('cart-items');
    this.countBadge = document.getElementById('cart-count');
    this.totalEl = document.getElementById('cart-total');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateUI();
  }

  bindEvents() {
    const btn = document.getElementById('cart-button');
    const close = document.getElementById('close-cart');
    
    if (btn) btn.addEventListener('click', () => this.toggle(true));
    if (close) close.addEventListener('click', () => this.toggle(false));
    if (this.backdrop) this.backdrop.addEventListener('click', () => this.toggle(false));

    // Delegate add to cart events
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        const product = JSON.parse(addBtn.dataset.product);
        this.addItem(product);
        this.toggle(true);
      }

      const removeBtn = e.target.closest('[data-remove-item]');
      if (removeBtn) {
        const id = removeBtn.dataset.removeItem;
        this.removeItem(id);
      }
    });
  }

  toggle(isOpen) {
    if (!this.drawer || !this.backdrop) return;
    
    if (isOpen) {
      this.drawer.classList.remove('translate-x-full');
      this.backdrop.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      this.drawer.classList.add('translate-x-full');
      this.backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    }
  }

  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (!existing) {
      this.items.push(product);
      this.save();
      this.updateUI();
    }
  }

  removeItem(id) {
    this.items = this.items.filter(item => String(item.id) !== String(id));
    this.save();
    this.updateUI();
  }

  save() {
    localStorage.setItem('mrt_cart', JSON.stringify(this.items));
  }

  updateUI() {
    if (!this.itemsContainer || !this.countBadge || !this.totalEl) return;

    // Update Badge
    const count = this.items.length;
    this.countBadge.textContent = count;
    this.countBadge.classList.toggle('opacity-0', count === 0);
    this.countBadge.classList.toggle('scale-0', count === 0);

    // Update Items
    if (count === 0) {
      this.itemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center opacity-40 py-20">
          <span class="material-symbols-outlined text-6xl mb-4">shopping_basket</span>
          <p class="serif italic">Your interest list is empty.</p>
        </div>
      `;
      this.totalEl.textContent = '$0.00';
      return;
    }

    let total = 0;
    this.itemsContainer.innerHTML = this.items.map(item => {
      total += parseFloat(item.price || 0);
      return `
        <div class="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-sm group">
          <div class="w-16 h-16 bg-surface-container-low rounded-xl overflow-hidden p-2 flex-shrink-0">
            <img src="${item.image || '/assets/products/placeholder.png'}" alt="${item.name}" class="w-full h-full object-contain">
          </div>
          <div class="flex-grow">
            <h4 class="text-sm font-bold text-on-surface line-clamp-1">${item.name}</h4>
            <p class="text-xs text-primary font-bold">$${item.price}</p>
          </div>
          <button data-remove-item="${item.id}" class="p-2 hover:bg-surface-container-high rounded-full transition-colors opacity-0 group-hover:opacity-100">
            <span class="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      `;
    }).join('');

    this.totalEl.textContent = `$${total.toFixed(2)}`;
  }
}

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
    
    // Initialize Cart
    this.cart = new ShoppingCart();
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

    set('seo-title', theme.seoTitle || `Top 10 Best ${theme.title} Products`);
    set('seo-intro', theme.seoIntro || 'Discover the most useful, trending, and top-rated products carefully selected for quality and value.');

    document.title = `${theme.title} | MRT International`;
  }

  createProductCard(product) {
    const name = product.name || 'Product';
    const badge = product.badge || 'Top Pick';
    const shortDesc = product.shortBenefit || 'Premium quality product carefully selected for you.';
    const benefits = product.keyBenefits || ['Feature 1', 'Feature 2', 'Feature 3'];
    const ratingStr = product.rating || '4.8/5 Recommended';
    const image = product.image || '';
    const price = product.price || 0;
    
    // Dynamic badge logic
    let badgeColor = "bg-primary text-on-primary";
    if (badge === "Trending Now") badgeColor = "bg-orange-600 text-white";
    if (badge === "Editor's Choice") badgeColor = "bg-purple-700 text-white";

    return `
      <div class="product-card flex flex-col h-full bg-white rounded-[2rem] border border-outline-variant/10 overflow-hidden hover:shadow-2xl transition-all duration-700 group">
        <div class="relative h-64 bg-surface-container-low overflow-hidden flex-shrink-0 p-8">
          <div class="absolute top-4 left-4 z-10 ${badgeColor} px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
            ${badge}
          </div>
          ${image
            ? `<img src="${image}" alt="${name}" class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl mix-blend-multiply" loading="lazy">`
            : `<div class="w-full h-full flex items-center justify-center opacity-20"><span class="material-symbols-outlined text-6xl">image</span></div>`
          }
        </div>
        
        <div class="p-8 flex flex-col flex-grow bg-white relative z-10 rounded-t-[2rem] -mt-6 border-t border-outline-variant/10">
          <h3 class="text-xl font-headline italic tracking-tight text-on-background mb-3">${name}</h3>
          <p class="text-on-surface-variant font-body text-sm leading-relaxed mb-6 opacity-90">${shortDesc}</p>
          
          <div class="mb-8 flex-grow">
            <h4 class="text-[10px] uppercase tracking-widest font-bold text-on-surface mb-4 opacity-50">Key Benefits</h4>
            <ul class="space-y-3">
              ${benefits.map(b => `
                <li class="flex items-start text-sm text-on-surface-variant leading-tight">
                  <span class="material-symbols-outlined text-primary text-base mr-3 mt-0.5 opacity-80">check_circle</span>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          
          <div class="mb-8 pt-6 border-t border-outline-variant/10 flex flex-col items-center">
            <div class="flex items-center text-secondary mb-2">
              ${Array(5).fill('<span class="material-symbols-outlined text-lg drop-shadow-sm">star</span>').join('')}
            </div>
            <p class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">${ratingStr}</p>
          </div>
          
          <div class="flex flex-col space-y-3 mt-auto">
            <button data-add-to-cart='${JSON.stringify({id: product.id, name, price, image})}' class="w-full text-center bg-primary text-on-primary py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-transform shadow-xl">Add to Interest List</button>
            <a href="#" class="w-full text-center bg-surface-container text-on-surface border border-outline-variant/10 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-surface-container-highest transition-colors">Check Price on Partner</a>
          </div>
        </div>
      </div>
    `;
  }

  renderBoutiqueProducts(products, category, container) {
    const filtered = products.filter(p => p.category === category);
    if (filtered.length === 0) {
      container.innerHTML = `<p class="col-span-full text-center serif italic opacity-50 py-20">No products in this collection yet.</p>`;
      return;
    }

    const sections = [
      { id: 'top-picks', title: '⭐ Top Picks', badge: 'Top Pick' },
      { id: 'trending', title: '📈 Trending Now', badge: 'Trending Now' },
      { id: 'editors-choice', title: "💎 Editor's Choice", badge: "Editor's Choice" }
    ];

    let html = '';
    sections.forEach(sec => {
      const secProducts = filtered.filter(p => p.badge === sec.badge);
      if (secProducts.length > 0) {
        const gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10";
        html += `
          <div class="category-section">
            <h2 class="text-3xl md:text-5xl font-headline italic mb-12 pb-6 border-b border-outline-variant/10 text-on-surface sticky top-20 bg-surface/90 backdrop-blur-md z-30 pt-4">${sec.title}</h2>
            <div class="${gridClass}">
              ${secProducts.map(p => this.createProductCard(p)).join('')}
            </div>
          </div>
        `;
      }
    });
    container.innerHTML = html;
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
            <button data-add-to-cart='${JSON.stringify({id: product.id, name: product.name, price: product.price, image: product.image})}' class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-on-surface p-3 rounded-xl shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span class="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div class="mt-2">
            <div class="flex justify-between items-start mb-1 gap-2">
              <h3 class="text-lg font-headline italic tracking-tight">${product.name}</h3>
              <span class="font-bold text-sm text-primary whitespace-nowrap">$${product.price}</span>
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
        <div class="p-8 bg-surface-container rounded-3xl border border-outline-variant/10 hover:shadow-xl transition-all duration-500 group">
          <div class="flex mb-4">
            ${Array(5).fill('<span class="material-symbols-outlined text-sm text-primary">star</span>').join('')}
          </div>
          <p class="text-xl font-headline italic mb-6 leading-relaxed">"${t.text}"</p>
          <div class="flex justify-between items-center text-xs font-bold uppercase tracking-widest opacity-80">
            <span class="text-on-surface">${t.name}</span>
            <span class="text-on-surface-variant opacity-50">${t.location}</span>
          </div>
        </div>
      `).join('');
    };
    renderList('testimonials-us', 'us');
    renderList('testimonials-ae', 'ae');
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
