import express from 'express';
const router = express.Router();

// 7 Core Categories Product Data
const products = [
  // Home & Lifestyle
  { id: 1, name: 'Walnut Serving Tray', price: 124, category: 'home-lifestyle', icon: 'table_restaurant', image: '/assets/cat-home.png' },
  { id: 2, name: 'Ceramic Pourer', price: 89, category: 'home-lifestyle', icon: 'water_drop', image: '/assets/cat-home.png' },
  { id: 3, name: 'Minimalist Dining Set', price: 299, category: 'home-lifestyle', icon: 'restaurant', image: '/assets/cat-home.png' },

  // Health & Wellness
  { id: 4, name: 'Daily Greens Blend', price: 64, category: 'health-wellness', icon: 'eco', image: '/assets/cat-health.png' },
  { id: 5, name: 'Essential Oil Set', price: 45, category: 'health-wellness', icon: 'spa', image: '/assets/cat-health.png' },
  { id: 6, name: 'Wellness Tracker Pro', price: 199, category: 'health-wellness', icon: 'monitor_heart', image: '/assets/cat-health.png' },

  // Everyday Essentials
  { id: 7, name: 'Utility Card Case', price: 38, category: 'everyday', icon: 'wallet', image: '/assets/cat-essentials.png' },
  { id: 8, name: 'Glass Pour-Over', price: 54, category: 'everyday', icon: 'coffee', image: '/assets/cat-essentials.png' },

  // Trending Online
  { id: 9, name: 'Active Earbuds Pro', price: 159, category: 'trending', icon: 'headphones', image: '/assets/cat-trending.png' },
  { id: 10, name: 'MagSafe Leather Case', price: 49, category: 'trending', icon: 'smartphone', image: '/assets/cat-trending.png' },

  // Beauty & Glow
  { id: 11, name: 'Hydrating Serum', price: 72, category: 'beauty', icon: 'flare', image: '/assets/cat-beauty.png' },
  { id: 12, name: 'Night Repair Cream', price: 110, category: 'beauty', icon: 'bedtime', image: '/assets/cat-beauty.png' },

  // Tech Lifestyle
  { id: 13, name: 'MacBook Leather Sleeve', price: 145, category: 'tech', icon: 'laptop', image: '/assets/cat-tech.png' },
  { id: 14, name: 'Magnetic Phone Dock', price: 68, category: 'tech', icon: 'dock', image: '/assets/cat-tech.png' },

  // Affiliate & Deals
  { id: 15, name: 'The Starter Bundle', price: 199, category: 'deals', icon: 'inventory_2', image: '/assets/cat-deals.png' },
  { id: 16, name: 'Limited Gift Edit', price: 350, category: 'deals', icon: 'featured_seasonal', image: '/assets/cat-deals.png' }
];

const testimonials = [
  { id: 1, name: 'Sarah J.', location: 'New York, USA', quote: 'Exceptional Quality', text: 'MRT International has transformed the way I shop. The quality of the Home & Lifestyle collection is unparalleled. Fast shipping to NY too!', region: 'us' },
  { id: 2, name: 'Michael R.', location: 'Dubai, UAE', quote: 'Seamless Experience', text: 'Being based in Dubai, I value companies that understand local logistics. MRT delivers on time, every time, with premium products.', region: 'ae' },
  { id: 3, name: 'James W.', location: 'Los Angeles, USA', quote: 'Reliable Service', text: 'Their health and wellness lineup is my go-to. Highly recommend for anyone looking for curated, high-end essentials.', region: 'us' },
  { id: 4, name: 'Layla A.', location: 'Abu Dhabi, UAE', quote: 'Trusted Partner', text: 'The ease of digital transactions and the authenticity of the tech products in Abu Dhabi is exactly what I needed.', region: 'ae' }
];

router.get('/products', (req, res) => res.json(products));
router.get('/testimonials', (req, res) => res.json(testimonials));

export default router;
