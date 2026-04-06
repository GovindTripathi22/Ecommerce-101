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
    this.init();
  }
  init() { this.bindEvents(); }
  bindEvents() {
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        const product = JSON.parse(addBtn.dataset.product);
        this.addItem(product);
      }
    });
  }
  addItem(product) { this.items.push(product); localStorage.setItem('mrt_cart', JSON.stringify(this.items)); }
}

const ID_MAP = {
  '1': 'home-kitchen',
  '2': 'beauty-skincare',
  '3': 'health-personal-care',
  '4': 'pet-supplies',
  '5': 'baby-products',
  '6': 'electronics-accessories',
  '7': 'sports-fitness'
};

const API_BASE = ''; // Use relative paths for Vite proxy

class MRTApp {
  constructor() {
    // 1. CRITICAL: Force visibility before anything else
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';

    // 2. Library Guards
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || urlParams.get('c');
    const id = urlParams.get('id');
    this.currentCategory = category || ID_MAP[id] || 'home-kitchen';
    
    this.isBoutique = window.location.pathname.includes('category.html');

    this.injectLogos();
    this.init();
    
    this.cart = new ShoppingCart();
  }

  async init() {
    try {
      this.initHeaderScroll();
      if (this.lenis) this.initLenis();

      if (this.isBoutique) {
        await this.initBoutique();
      } else {
        await this.renderFeaturedSegments();
        await this.renderHomepageTestimonials();
      }

      this.initScrollReveal();
      this.animateReveals();
      this.bindEvents();
      this.initSmoothScroll();
    } catch (err) {
      console.error('MRTApp Initialization Error:', err);
    }
  }

  injectLogos() {
    document.querySelectorAll('[data-logo]').forEach(el => {
      el.innerHTML = SVG_LOGO;
    });
  }

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
        container.innerHTML = `<p class="col-span-full text-center serif italic opacity-50 py-20 animate-pulse text-on-surface">Synchronizing Collection for "${this.currentCategory}"...</p>`;
      }
    } catch (err) {
      console.error('Boutique sync failed:', err);
      container.innerHTML = `<p class="col-span-full text-center serif italic opacity-50 py-20 text-on-surface">Data sync failed. Ensure server is active at 127.0.0.1:3001.</p>`;
    } finally {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
  }

  applyTheme(theme) {
    const root = document.documentElement;
    const primary = theme.primary || '#914d00';
    const secondary = theme.secondary || '#f28c28';
    
    root.style.setProperty('--category-primary', primary);
    root.style.setProperty('--category-secondary', secondary);
    
    // Create a theme-aware semi-transparent glow for the premium cards
    const glowColor = primary.startsWith('#') 
      ? `rgba(${parseInt(primary.slice(1,3), 16)}, ${parseInt(primary.slice(3,5), 16)}, ${parseInt(primary.slice(5,7), 16)}, 0.15)`
      : primary;
    root.style.setProperty('--category-primary-glow', glowColor);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('seo-title', theme.seoTitle || `Top 10 Best ${theme.title} Products`);
    set('seo-intro', theme.seoIntro || 'Curated selection of premium quality assets for the modern lifestyle.');
    document.title = `${theme.title} | MRT International`;
  }

  createProductCard(product, options = {}) {
    const variant = options.variant || 'boutique';
    const name = product.name || 'Product';
    const badge = product.badge || 'Top Pick';
    const shortDesc = product.shortBenefit || 'Premium quality product selected for elite needs.';
    const benefits = product.keyBenefits || ['Feature 1', 'Feature 2'];
    const ratingStr = product.rating || '4.8/5 Recommended';
    const image = product.image || '';
    const price = product.price || 0;
    const cardClasses = variant === 'homepage'
      ? 'product-card-premium product-card-compact group flex-shrink-0 w-[300px] md:w-[380px] snap-start'
      : 'product-card-premium group snap-start';
    const ratingLabel = ratingStr.replace('/5', '');
    const specsTitle = variant === 'homepage' ? 'Highlights' : 'Elite Specifications';
    const titleClasses = variant === 'homepage'
      ? 'text-xl md:text-2xl font-headline italic tracking-tight leading-tight text-on-surface'
      : 'text-2xl md:text-3xl font-headline italic tracking-tight leading-tight text-on-surface';
    const bodyClasses = variant === 'homepage'
      ? 'text-on-surface-variant font-body text-sm mb-5 opacity-80 line-clamp-2'
      : 'text-on-surface-variant font-body text-sm mb-6 opacity-80 italic line-clamp-2';
    const imageClasses = variant === 'homepage'
      ? 'w-full h-full object-contain transition-all duration-700 group-hover:scale-105 float-animation drop-shadow-[0_18px_40px_rgba(0,0,0,0.16)]'
      : 'w-full h-full object-contain transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 float-animation drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)]';

    return `
      <article class="${cardClasses}" data-premium-card>
        <div class="premium-glow"></div>
        <div class="image-glass-container mb-5">
          <div class="absolute top-4 left-4 z-20 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl" style="background-color: var(--category-primary, #914d00); color: white;">
            ${badge}
          </div>
          <div class="absolute top-4 right-4 z-20 rounded-full bg-white/80 px-3 py-2 text-[11px] font-bold tracking-[0.12em] text-on-surface shadow-lg backdrop-blur-md">
            $${price}
          </div>
          ${image
            ? `<img src="${image}" alt="${name}" class="${imageClasses}" loading="lazy">`
            : `<div class="w-full h-full flex items-center justify-center opacity-20 text-on-surface"><span class="material-symbols-outlined text-6xl">image</span></div>`
          }
        </div>
        <div class="flex flex-col flex-grow">
          <div class="flex items-start justify-between gap-3 mb-3">
            <h3 class="${titleClasses}">${name}</h3>
            <span class="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-md" style="background: linear-gradient(135deg, var(--category-primary, #914d00), var(--category-secondary, #f28c28));">
              ${ratingLabel}
            </span>
          </div>
          <p class="${bodyClasses}">${shortDesc}</p>
          <div class="mb-5 flex-grow">
            <h4 class="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface mb-3 opacity-40">${specsTitle}</h4>
            <ul class="space-y-2">
              ${benefits.slice(0, 2).map(b => `
                <li class="flex items-center text-[12px] text-on-surface-variant font-semibold">
                  <span class="material-symbols-outlined text-lg mr-3 opacity-80" style="color: var(--category-primary);">verified</span>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="mb-5 rounded-[1.25rem] border border-white/40 bg-white/55 px-4 py-3 backdrop-blur-md flex justify-between items-center">
            <div class="flex items-center text-orange-500 scale-75 origin-left">
              ${Array(5).fill('<span class="material-symbols-outlined text-xl">star</span>').join('')}
            </div>
            <p class="text-[9px] font-bold uppercase tracking-[0.14em] opacity-60">${ratingStr}</p>
          </div>
          <div class="mt-auto flex items-center">
            <a href="https://wa.me/?text=I+am+interested+in+${encodeURIComponent(name)}" target="_blank" class="flex-grow flex items-center justify-center space-x-3 rounded-2xl px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5 hover:opacity-95 shadow-lg" style="background: linear-gradient(135deg, #25D366, #16a34a);">
              <span class="material-symbols-outlined text-lg">add_call</span>
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  renderBoutiqueProducts(products, category, container) {
    const filtered = products.filter(p => p.category === category);
    if (filtered.length === 0) {
      container.innerHTML = `<p class="col-span-full text-center serif italic opacity-50 py-20 text-on-surface">No products in "${category}" yet.</p>`;
      return;
    }

    const sections = [
      { badge: 'Top Pick', title: '⭐ Global Exclusives' },
      { badge: 'Trending Now', title: '📈 High-Demand Assets' },
      { badge: "Editor's Choice", title: '💎 Masterpiece Collection' }
    ];

    const unassigned = filtered.filter(p => !sections.some(s => s.badge === p.badge));

    container.innerHTML = sections.map(sec => {
      const secProducts = filtered.filter(p => p.badge === sec.badge);
      if (secProducts.length === 0) return '';
      return `
        <div class="category-section mb-32">
          <div class="flex flex-col mb-16">
             <h2 class="text-6xl md:text-8xl font-headline italic text-on-surface mb-4">${sec.title}</h2>
             <div class="h-1 w-40 bg-primary/20" style="background-color: var(--category-primary, #914d0055);"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            ${secProducts.map(p => this.createProductCard(p)).join('')}
          </div>
        </div>
      `;
    }).join('') + (unassigned.length > 0 ? `
        <div class="category-section mb-32">
          <div class="flex flex-col mb-16">
             <h2 class="text-6xl md:text-8xl font-headline italic text-on-surface mb-4">Elite Collection</h2>
             <div class="h-1 w-40 opacity-20" style="background-color: var(--category-primary, #914d00);"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            ${unassigned.map(p => this.createProductCard(p)).join('')}
          </div>
        </div>
    ` : '');
    
    this.initCardInteractions();
  }

  initCardInteractions() {
    const cards = document.querySelectorAll('[data-premium-card]');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);

        // 3D Tilt Logic
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = (x - xc) / (rect.width / 2);
        const dy = (y - yc) / (rect.height / 2);

        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: dx * 6,
            rotateX: -dy * 6,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--x', `50%`);
        card.style.setProperty('--y', `50%`);
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && cards.length > 0) {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  initLenis() {
    const raf = (t) => { this.lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  initScrollReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    
    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath.includes(href) && href !== 'index.html') {
         link.classList.add('text-on-surface', 'border-b-2', 'border-primary');
         link.classList.remove('text-on-surface-variant');
      }
    });

    gsap.utils.toArray('.category-pill').forEach(pill => {
       gsap.from(pill, { x: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
    });
  }

  async renderFeaturedSegments() {
    try {
      const [productsRes, themesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/themes')
      ]);
      
      if (productsRes.ok && themesRes.ok) {
        const products = await productsRes.json();
        const themes = await themesRes.json();
        this.renderHomepagePicks(products, themes);
      }
    } catch (err) { 
      console.error('Featured segments sync failed:', err); 
    } finally { 
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); 
    }
  }

  async renderHomepageTestimonials() {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        this.renderTestimonials(data);
      }
    } catch (err) { console.error('Testimonial sync failed:', err); }
    finally { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); }
  }

  renderHomepagePicks(products, themes = {}) {
     const sections = [
        { id: 'home-kitchen-carousel', category: 'home-kitchen' },
        { id: 'health-care-carousel', category: 'health-personal-care' },
        { id: 'beauty-skincare-carousel', category: 'beauty-skincare' },
        { id: 'pet-carousel', category: 'pet-supplies' },
        { id: 'baby-carousel', category: 'baby-products' },
        { id: 'electronics-carousel', category: 'electronics-accessories' },
        { id: 'sports-carousel', category: 'sports-fitness' }
     ];

     sections.forEach(sec => {
       const el = document.getElementById(sec.id);
       if (!el) return;
       
       const list = products
         .filter(p => p.category === sec.category)
         .slice(0, 8);

       if (list.length > 0) {
         const theme = themes[sec.category] || { primary: '#914d00', secondary: '#ff8c00' };
         const primary = theme.primary || '#914d00';
         el.style.setProperty('--category-primary', primary);
         el.style.setProperty('--category-secondary', theme.secondary || '#ff8c00');
         
         const r = parseInt(primary.slice(1, 3), 16);
         const g = parseInt(primary.slice(3, 5), 16);
         const b = parseInt(primary.slice(5, 7), 16);
         el.style.setProperty('--category-primary-glow', `rgba(${r}, ${g}, ${b}, 0.15)`);

         el.innerHTML = list.map(p => this.createProductCard(p, { variant: 'homepage' })).join('');
       } else {
         el.innerHTML = `<div class="w-full py-20 text-center opacity-30 italic">No products currently listed in ${sec.category}</div>`;
       }
     });
     this.initCardInteractions();
   }

  renderTestimonials(testimonials) {
    const render = (id, reg) => {
      const el = document.getElementById(id);
      if (!el) return;
      const list = testimonials.filter(t => t.region === reg);
      el.innerHTML = list.map(t => `
        <div class="p-8 bg-surface-container rounded-3xl border border-outline-variant/10 hover:shadow-xl transition-all duration-500 group reveal-up">
          <div class="flex mb-4">
            ${Array(5).fill('<span class="material-symbols-outlined text-sm text-primary">star</span>').join('')}
          </div>
          <p class="text-xl font-headline italic mb-6 leading-relaxed text-on-surface">"${t.text}"</p>
          <div class="flex justify-between items-center text-xs font-bold uppercase tracking-widest opacity-80">
            <span class="text-primary">${t.name}</span>
            <span class="text-on-surface-variant opacity-50">${t.location}</span>
          </div>
        </div>
      `).join('');
    };
    render('testimonials-us', 'us');
    render('testimonials-ae', 'ae');
  }

  initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('bg-white/80', window.scrollY > 20);
      header.classList.toggle('backdrop-blur-xl', window.scrollY > 20);
      header.classList.toggle('shadow-xl', window.scrollY > 20);
    });
  }

  animateReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.utils.toArray('.reveal-up').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out'
      });
    });
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  bindEvents() {
    document.querySelectorAll('.nav-prev, .nav-next').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = document.getElementById(btn.dataset.target);
        if (el) el.scrollBy({ left: btn.classList.contains('nav-prev') ? -400 : 400, behavior: 'smooth' });
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MRTApp();
});
