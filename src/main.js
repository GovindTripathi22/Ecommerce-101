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
    this.bindEvents();
  }

  // Initialize Smooth Scroll (Lenis)
  initLenis() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  // Orchestrate GSAP Animations
  initAnimations() {
    // Hero Reveal
    gsap.to('.hero-content', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'expo.out',
      delay: 0.5
    });

    // Staggered Section Reveals
    const revealUps = document.querySelectorAll('.reveal-up');
    revealUps.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Glass Card Hover Parallax (Subtle)
    const glassCards = document.querySelectorAll('.glass');
    glassCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }

  // Proxy-based API Fetching
  async fetchProducts() {
    const container = document.getElementById('product-container');
    if (!container) return;

    try {
      const response = await fetch('/api/products');
      const products = await response.json();

      container.innerHTML = products.map(product => `
        <div class="group cursor-pointer-card reveal-up">
            <div class="relative overflow-hidden rounded-2xl mb-4 bg-surface-container aspect-[3/4]">
                <img src="${product.image}" 
                     alt="${product.title}" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                <button class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white">
                    <span class="material-symbols-outlined text-primary">add_shopping_cart</span>
                </button>
            </div>
            <div class="space-y-1">
                <span class="text-[10px] tracking-widest text-secondary font-bold uppercase">${product.category}</span>
                <div class="flex justify-between items-start">
                    <h4 class="font-headline text-lg group-hover:text-accent transition-colors">${product.title}</h4>
                    <span class="font-medium text-secondary">$${product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
      `).join('');

      // Refresh ScrollTrigger after dynamic content injection
      ScrollTrigger.refresh();
      
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Fallback UI or static alert
    }
  }

  bindEvents() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            gsap.to(cartBtn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
        });
    }
  }
}

// Initialize the Boutique
document.addEventListener('DOMContentLoaded', () => {
  new LuxeRadianceApp();
});
