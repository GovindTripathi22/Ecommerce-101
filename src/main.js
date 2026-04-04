import './style.css';

class LuxeRadianceApp {
  constructor() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    this.init();
  }

  async init() {
    this.setupSmoothScroll();
    await this.fetchData();
    this.animateReveals();
    this.bindEvents();
  }

  setupSmoothScroll() {
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
    // 7 Category Mapping
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
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            <button class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-primary p-3 rounded-xl shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span class="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div>
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-headline italic tracking-tight">${product.name}</h3>
              <span class="text-primary font-bold">$${product.price}</span>
            </div>
            <div class="flex items-center text-xs text-on-surface-variant font-bold uppercase tracking-widest opacity-60">
              <span class="material-symbols-outlined text-sm mr-2">${product.icon || 'star'}</span>
              ${cat.slug.replace('-', ' ')}
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
          <div class="flex items-center mb-6">
            <div class="flex text-primary">
              <span class="material-symbols-outlined text-sm">star</span>
              <span class="material-symbols-outlined text-sm">star</span>
              <span class="material-symbols-outlined text-sm">star</span>
              <span class="material-symbols-outlined text-sm">star</span>
              <span class="material-symbols-outlined text-sm">star</span>
            </div>
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

  animateReveals() {
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
    // Navigation for carousels
    document.querySelectorAll('.nav-prev, .nav-next').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.dataset.target;
        const container = document.getElementById(targetId);
        if (!container) return;

        const scrollAmount = btn.classList.contains('nav-prev') ? -400 : 400;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    });
  }
}

// Start Lifecycle
document.addEventListener('DOMContentLoaded', () => {
  new LuxeRadianceApp();
});
