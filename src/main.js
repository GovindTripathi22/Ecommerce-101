import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class LuxeRadianceApp {
  constructor() {
    this.initLenis();
    this.initAnimations();
    this.fetchProducts();
    this.fetchTestimonials();
    this.bindEvents();
  }

  // Initialize Smooth Scroll (Lenis)
  initLenis() {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    this.lenis = lenis;
  }

  // Orchestrate GSAP Animations
  initAnimations() {
    // Reveal Animations
    const revealUps = document.querySelectorAll('.reveal-up');
    revealUps.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  // Fetch Products and Render into Category Containers
  async fetchProducts() {
    const categories = [
        { id: 'home-lifestyle-carousel', key: 'home-lifestyle' },
        { id: 'health-wellness-carousel', key: 'health-wellness' },
        { id: 'everyday-carousel', key: 'everyday' },
        // Trending carousel removed from list as requested
        { id: 'beauty-carousel', key: 'beauty' },
        { id: 'tech-carousel', key: 'tech' },
        { id: 'deals-carousel', key: 'deals' }
    ];

    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('API Error');
      const allProducts = await response.json();

      categories.forEach(cat => {
          const container = document.getElementById(cat.id);
          if (!container) return;

          const catProducts = allProducts.filter(p => p.category === cat.key);
          
          if (catProducts.length > 0) {
              container.innerHTML = catProducts.map(product => this.renderProductCard(product)).join('');
          } else {
              container.innerHTML = '<p class="text-on-surface-variant/50 italic px-8 py-10">Curating new items for this collection...</p>';
          }
      });

      // Refresh ScrollTrigger after dynamic content injection
      ScrollTrigger.refresh();
      
    } catch (error) {
      console.warn('Backend connection failed or empty catalogues.', error);
    }
  }

  renderProductCard(product) {
      return `
        <div class="product-card group reveal-up snap-start flex-none">
            <div class="product-image-container relative aspect-[4/5] bg-surface-container-high rounded-2xl overflow-hidden mb-6">
                <img src="${product.image || '/assets/cat-home.png'}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[80px] text-white/20 group-hover:scale-125 group-hover:text-primary transition-all duration-700">${product.icon || 'inventory_2'}</span>
                </div>
                <button class="absolute bottom-6 right-6 bg-white p-4 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white">
                    <span class="material-symbols-outlined">add_shopping_cart</span>
                </button>
            </div>
            <div class="px-2">
                <p class="text-[10px] tracking-[0.2em] text-primary font-bold uppercase mb-1">${product.category.replace('-', ' ')}</p>
                <h4 class="font-body font-semibold text-lg text-on-surface group-hover:text-primary transition-colors mb-2">${product.name}</h4>
                <div class="flex justify-between items-center">
                    <span class="text-primary font-bold text-lg">$${product.price ? product.price.toFixed(2) : '199.00'}</span>
                    <button class="bg-secondary-container p-2 rounded-full hover:bg-secondary-fixed transition-colors md:hidden">
                        <span class="material-symbols-outlined text-on-secondary-container">add_shopping_cart</span>
                    </button>
                </div>
            </div>
        </div>
      `;
  }

  // Fetch Reviews from Node.js API
  async fetchTestimonials() {
    const containerUS = document.getElementById('testimonials-us');
    const containerAE = document.getElementById('testimonials-ae');
    if (!containerUS || !containerAE) return;

    try {
      const response = await fetch('/api/testimonials');
      if (!response.ok) throw new Error('API Error');
      const testimonials = await response.json();

      const renderReview = (review) => `
        <div class="bg-surface-container-lowest p-8 rounded-3xl reveal-up border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all duration-700">
            <div class="flex text-secondary mb-4">
                ${Array(5).fill('<span class="material-symbols-outlined text-sm">star</span>').join('')}
            </div>
            <h4 class="font-headline text-xl mb-3">"${review.quote}"</h4>
            <p class="text-on-surface-variant font-body mb-6 leading-relaxed text-base">"${review.text}"</p>
            <div class="flex items-center space-x-4 border-t border-outline-variant/10 pt-4">
                <div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant font-bold text-base">
                    ${review.name.charAt(0)}
                </div>
                <div>
                    <p class="font-bold text-on-surface text-sm">${review.name}</p>
                    <p class="text-[10px] text-on-surface-variant tracking-[0.1em] uppercase">${review.location}</p>
                </div>
            </div>
        </div>
      `;

      const usaReviews = testimonials.filter(r => r.region === 'us').slice(0, 4);
      const uaeReviews = testimonials.filter(r => r.region === 'ae').slice(0, 4);

      containerUS.innerHTML = usaReviews.map(renderReview).join('');
      containerAE.innerHTML = uaeReviews.map(renderReview).join('');

      ScrollTrigger.refresh();
      
    } catch (error) {
      console.warn('Testimonials fallback.', error);
    }
  }

  bindEvents() {
    // Navigation for ALL active carousels
    document.querySelectorAll('.nav-prev, .nav-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const container = document.getElementById(targetId);
            if (!container) return;

            const scrollAmount = window.innerWidth > 768 ? 450 : 320;
            const direction = btn.classList.contains('nav-prev') ? -1 : 1;
            
            container.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
        });
    });

    // Anchor Smooth Scrolling via Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            try {
                const target = document.querySelector(targetId);
                if (target && this.lenis) {
                    e.preventDefault();
                    this.lenis.scrollTo(target, { offset: -100 });
                }
            } catch (err) {
                // Ignore invalid selectors
            }
        });
    });
  }
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  new LuxeRadianceApp();
});
