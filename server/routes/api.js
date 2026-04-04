import express from 'express';
const router = express.Router();

// 7 New Core Categories:
// 1. Home & Kitchen
// 2. Health & Personal Care
// 3. Beauty & Skincare
// 4. Pet Supplies
// 5. Baby Products
// 6. Electronics Accessories
// 7. Sports & Fitness

const products = [
  // Home & Kitchen
  { id: 1, name: 'Precision Brew Kettle', price: 89, category: 'home-kitchen', icon: 'coffee', image: '/assets/bento-home.png' },
  { id: 2, name: 'Walnut Cutting Block', price: 64, category: 'home-kitchen', icon: 'countertops', image: '/assets/bento-home.png' },
  { id: 3, name: 'Aroma Diffuser Pro', price: 45, category: 'home-kitchen', icon: 'airway', image: '/assets/bento-home.png' },

  // Health & Personal Care
  { id: 4, name: 'Sonic Toothbrush S1', price: 120, category: 'health-personal-care', icon: 'dentistry', image: '/assets/bento-health.png' },
  { id: 5, name: 'Smart Posture Corrector', price: 75, category: 'health-personal-care', icon: 'accessibility_new', image: '/assets/bento-health.png' },
  { id: 6, name: 'Deep Tissue Massage Gun', price: 199, category: 'health-personal-care', icon: 'sports_massage', image: '/assets/bento-health.png' },

  // Beauty & Skincare
  { id: 7, name: 'Hyaluronic Acid Serum', price: 48, category: 'beauty-skincare', icon: 'flare', image: '/assets/bento-beauty.png' },
  { id: 8, name: 'Retinol Night Treatment', price: 92, category: 'beauty-skincare', icon: 'bedtime', image: '/assets/bento-beauty.png' },
  { id: 9, name: 'Quartz Face Roller', price: 35, category: 'beauty-skincare', icon: 'spa', image: '/assets/bento-beauty.png' },

  // Pet Supplies
  { id: 10, name: 'Minimalist Pet Bowl', price: 42, category: 'pet-supplies', icon: 'pets', image: '/assets/bento-pets.png' },
  { id: 11, name: 'Smart GPS Pet Tag', price: 85, category: 'pet-supplies', icon: 'location_on', image: '/assets/bento-pets.png' },

  // Baby Products
  { id: 12, name: 'Organic Cotton Swaddle', price: 28, category: 'baby-products', icon: 'child_care', image: '/assets/bento-baby.png' },
  { id: 13, name: 'Eco-Friendly Teething Ring', price: 18, category: 'baby-products', icon: 'baby_changing_station', image: '/assets/bento-baby.png' },

  // Electronics Accessories
  { id: 14, name: '3-in-1 Charging Station', price: 110, category: 'electronics-accessories', icon: 'charging_station', image: '/assets/bento-tech.png' },
  { id: 15, name: 'Leather Apple Watch Band', price: 65, category: 'electronics-accessories', icon: 'watch', image: '/assets/bento-tech.png' },
  { id: 16, name: 'Magnetic Phone Mount', price: 34, category: 'electronics-accessories', icon: 'dock', image: '/assets/bento-tech.png' },

  // Sports & Fitness
  { id: 17, name: 'Non-Slip TPE Yoga Mat', price: 55, category: 'sports-fitness', icon: 'self_improvement', image: '/assets/bento-sports.png' },
  { id: 18, name: 'Weighted Jump Rope', price: 24, category: 'sports-fitness', icon: 'fitness_center', image: '/assets/bento-sports.png' },
  { id: 19, name: 'Resistance Band Set', price: 39, category: 'sports-fitness', icon: 'reorder', image: '/assets/bento-sports.png' }
];

const testimonials = [
  // US Testimonials
  { id: 1, name: 'Michael T.', location: 'Texas, USA', quote: 'Impressed with the Quality', text: 'I wasn’t expecting this level of quality at this price point. Everything arrived in perfect condition. Will definitely order again.', region: 'us' },
  { id: 2, name: 'Jessica L.', location: 'California, USA', quote: 'Smooth & Reliable Experience', text: 'The ordering process was simple, and the delivery was faster than expected. Great service overall.', region: 'us' },
  { id: 3, name: 'David R.', location: 'New York, USA', quote: 'Great Online Store', text: 'I’ve tried several online stores, but this one stands out for its professionalism and product selection. Highly recommended.', region: 'us' },
  { id: 4, name: 'Emily S.', location: 'Florida, USA', quote: 'Excellent Value for Money', text: 'Affordable pricing without compromising on quality. Exactly what I was looking for.', region: 'us' },
  
  // UAE Testimonials
  { id: 5, name: 'Ahmed K.', location: 'Abu Dhabi', quote: 'Very Professional Service', text: 'The team was very responsive, and the entire process was handled professionally. Great experience.', region: 'ae' },
  { id: 6, name: 'Sara M.', location: 'Dubai', quote: 'Fast Delivery & Good Quality', text: 'Product quality exceeded expectations, and delivery was on time. Will recommend to others.', region: 'ae' },
  { id: 7, name: 'Hassan A.', location: 'Sharjah', quote: 'Reliable & Trustworthy', text: 'Everything was exactly as described. It’s good to see a company that delivers what it promises.', region: 'ae' },
  { id: 8, name: 'Fatima R.', location: 'Al Ain', quote: 'Seamless Shopping Experience', text: 'Easy to navigate website and smooth checkout process. Very satisfied.', region: 'ae' }
];

const categoryThemes = {
  'home-kitchen': {
    primary: '#914d00',
    secondary: '#f28c28',
    title: 'Modern Kitchen',
    subtitle: 'Culinary excellence & lifestyle essentials',
    image: '/assets/bento-home.png'
  },
  'health-personal-care': {
    primary: '#006a6a',
    secondary: '#00cfcf',
    title: 'Personal Vitality',
    subtitle: 'Advanced wellness & health curations',
    image: '/assets/bento-health.png'
  },
  'beauty-skincare': {
    primary: '#701b2f',
    secondary: '#ffb2bd',
    title: 'Artisanal Beauty',
    subtitle: 'Pristine formulas for a radiant glow',
    image: '/assets/bento-beauty.png'
  },
  'pet-supplies': {
    primary: '#3a6a00',
    secondary: '#8ce33a',
    title: 'Pet Curations',
    subtitle: 'Sophisticated gear for your loyal companions',
    image: '/assets/bento-pets.png'
  },
  'baby-products': {
    primary: '#004a77',
    secondary: '#7fbaff',
    title: 'Baby Essentials',
    subtitle: 'Nordic design for the next generation',
    image: '/assets/bento-baby.png'
  },
  'electronics-accessories': {
    primary: '#1f1b17',
    secondary: '#bf8f00',
    title: 'Tech Companions',
    subtitle: 'High-performance digital essentials',
    image: '/assets/bento-tech.png'
  },
  'sports-fitness': {
    primary: '#006e2a',
    secondary: '#55f985',
    title: 'Peak Performance',
    subtitle: 'Minimalist gear for elite training',
    image: '/assets/bento-sports.png'
  }
};

router.get('/products', (req, res) => res.json(products));
router.get('/testimonials', (req, res) => res.json(testimonials));
router.get('/themes', (req, res) => res.json(categoryThemes));

export default router;
