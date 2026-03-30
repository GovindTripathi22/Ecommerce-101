import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

class LuxeRadianceApp {
  constructor() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    this.init();
  }

  init() {
    this.initLenis();
    this.initNavigation();
    this.fetchProducts();
    this.initAnimations();
    this.initProfileToggle();
  }

  initLenis() {
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  initNavigation() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('py-2', 'bg-orange-50/95', 'dark:bg-stone-950/95');
        header.classList.remove('py-4');
      } else {
        header.classList.add('py-4');
        header.classList.remove('py-2', 'bg-orange-50/95', 'dark:bg-stone-950/95');
      }
    });
  }

  initProfileToggle() {
    const profileToggle = document.getElementById('profile-toggle');
    const backToShop = document.getElementById('back-to-shop');
    const mainView = document.querySelector('main');
    const profileView = document.getElementById('profile-view');
    const footer = document.querySelector('footer');

    const showProfile = () => {
      mainView.classList.add('hidden');
      profileView.classList.remove('hidden');
      footer.classList.add('hidden');
      window.scrollTo(0, 0);
    };

    const showMain = () => {
      mainView.classList.remove('hidden');
      profileView.classList.add('hidden');
      footer.classList.remove('hidden');
      window.scrollTo(0, 0);
    };

    if (profileToggle) profileToggle.addEventListener('click', showProfile);
    if (backToShop) backToShop.addEventListener('click', showMain);
  }

  async fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();

      this.renderProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  renderProducts(products) {
    const sections = [
      { id: 'product-container', category: 'CRAFTSMAN' }, // Home & Kitchen
      { id: 'health-container', category: 'VITALITY' },
      { id: 'beauty-container', category: 'GLOW' },
      { id: 'pet-container', category: 'PET' },
      { id: 'baby-container', category: 'NURTURE' },
      { id: 'electronics-container', category: 'TECH' },
      { id: 'sports-container', category: 'MOTION' }
    ];

    sections.forEach(section => {
      const container = document.getElementById(section.id);
      if (container) {
        const filtered = products.filter(p => p.category.includes(section.category));
        container.innerHTML = filtered.map(product => this.createProductCard(product)).join('');
      }
    });
  }

  createProductCard(product) {
    return `
      <div class="min-w-[300px] flex-shrink-0 group cursor-pointer reveal-up">
        <div class="relative overflow-hidden rounded-2xl mb-4 h-[400px]">
          <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
          <button class="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 bg-white text-orange-900 px-6 py-3 rounded-xl font-bold transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-xl">
            Quick Add
          </button>
        </div>
        <div>
          <span class="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">${product.category}</span>
          <h3 class="text-xl font-headline mt-1 group-hover:text-primary transition-colors">${product.title}</h3>
          <p class="font-body text-orange-800 mt-1">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    `;
  }

  initAnimations() {
    gsap.utils.toArray('.reveal-up').forEach((elem) => {
      gsap.fromTo(elem, 
        { y: 50, opacity: 0 },
        {
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Hero special reveal
    gsap.to('.hero-reveal', {
      duration: 1.5,
      y: 0,
      opacity: 1,
      ease: 'power4.out',
      delay: 0.5
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LuxeRadianceApp();
});
