import express from 'express';
const router = express.Router();

const products = [
  // --- HOME & KITCHEN ---
  // Top Picks
  { id: 101, name: 'Vegetable Chopper', category: 'home-kitchen', badge: 'Top Pick', shortBenefit: 'A practical kitchen tool designed to make chopping faster and easier.', keyBenefits: ['Saves time in meal preparation', 'Easy to use and clean', 'Compact and kitchen-friendly design'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 24.99 },
  { id: 102, name: 'Electric Spin Scrubber', category: 'home-kitchen', badge: 'Top Pick', shortBenefit: 'Effortlessly clean stubborn grime across tiles, tubs, and floors.', keyBenefits: ['Cordless rechargeable design', 'Multiple interchangeable brush heads', 'Reduces physical cleaning strain'], rating: '4.7/5 Recommended', image: '/assets/products/placeholder.png', price: 39.99 },
  { id: 103, name: 'Vacuum Storage Bags', category: 'home-kitchen', badge: 'Top Pick', shortBenefit: 'Maximize your closet space by compressing bulky clothing and bedding.', keyBenefits: ['Protects against dust and moisture', 'Airtight double-zip seal', 'Compatible with standard vacuums'], rating: '4.6/5 Recommended', image: '/assets/products/placeholder.png', price: 19.99 },
  { id: 104, name: 'Air Fryer Accessories Set', category: 'home-kitchen', badge: 'Top Pick', shortBenefit: 'Expand your air frying capabilities with multi-purpose baking tools.', keyBenefits: ['Food-grade silicone and steel', 'Dishwasher safe components', 'Includes pizza pan and skewer rack'], rating: '4.9/5 Recommended', image: '/assets/products/placeholder.png', price: 29.99 },
  // Trending Now
  { id: 105, name: 'Oil Spray Bottle', category: 'home-kitchen', badge: 'Trending Now', shortBenefit: 'Achieve perfectly even oil coating for healthier cooking and roasting.', keyBenefits: ['Precise portion control', 'Leak-proof and easy to refill', 'Great for air fryers and salads'], rating: '4.5/5 Highly Rated', image: '/assets/products/placeholder.png', price: 12.99 },
  { id: 106, name: 'Smart Plug', category: 'home-kitchen', badge: 'Trending Now', shortBenefit: 'Automate your home appliances with app and voice control.', keyBenefits: ['Compatible with Alexa and Google Home', 'Set timers and schedules', 'Energy monitoring capabilities'], rating: '4.7/5 Highly Rated', image: '/assets/products/placeholder.png', price: 15.99 },
  { id: 107, name: 'LED Motion Sensor Lights', category: 'home-kitchen', badge: 'Trending Now', shortBenefit: 'Bright, energy-efficient lighting for cabinets, stairs, and hallways.', keyBenefits: ['Automatic on/off sensing', 'Simple magnetic installation', 'Rechargeable battery power'], rating: '4.8/5 Highly Rated', image: '/assets/products/placeholder.png', price: 22.99 },
  { id: 108, name: 'Microfiber Cleaning Cloth Pack', category: 'home-kitchen', badge: 'Trending Now', shortBenefit: 'Ultra-absorbent, lint-free cloths for streak-free cleaning everywhere.', keyBenefits: ['Traps dust and liquid instantly', 'Safe on delicate surfaces', 'Machine washable and reusable'], rating: '4.9/5 Highly Rated', image: '/assets/products/placeholder.png', price: 14.99 },
  // Editor's Choice
  { id: 109, name: 'Digital Kitchen Scale', category: 'home-kitchen', badge: 'Editor\'s Choice', shortBenefit: 'Precise measurements for flawless baking and portion control.', keyBenefits: ['High-precision sensors', 'Easy-to-read LCD display', 'Tare function for easy prep'], rating: '4.9/5 Premium Pick', image: '/assets/products/placeholder.png', price: 18.99 },
  { id: 110, name: 'Under Sink Organizer', category: 'home-kitchen', badge: 'Editor\'s Choice', shortBenefit: 'Maximize vertical storage in tight spaces with sliding drawers.', keyBenefits: ['Rust-resistant materials', 'Sliding pull-out baskets', 'Quick and easy assembly'], rating: '4.8/5 Premium Pick', image: '/assets/products/placeholder.png', price: 27.99 },

  // --- BEAUTY & PERSONAL CARE ---
  // Top Picks
  { id: 201, name: 'Ice Face Roller', category: 'beauty-skincare', badge: 'Top Pick', shortBenefit: 'Reduce puffiness and stimulate collagen production with cooling therapy.', keyBenefits: ['Calms inflammation and redness', 'Shrinks pore appearance', 'Ergonomic silicone grip'], rating: '4.7/5 Recommended', image: '/assets/products/placeholder.png', price: 14.99 },
  { id: 202, name: 'Facial Cleansing Brush', category: 'beauty-skincare', badge: 'Top Pick', shortBenefit: 'Achieve a deeper clean and gentle exfoliation with sonic vibrations.', keyBenefits: ['Waterproof design for shower use', 'Multiple speed settings', 'Medical-grade silicone bristles'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 34.99 },
  { id: 203, name: 'Hair Straightener Brush', category: 'beauty-skincare', badge: 'Top Pick', shortBenefit: 'Smooth and style your hair effortlessly while brushing.', keyBenefits: ['Anti-scald safety design', 'Fast ceramic heating', 'Reduces frizz and static'], rating: '4.6/5 Recommended', image: '/assets/products/placeholder.png', price: 45.99 },
  { id: 204, name: 'LED Makeup Mirror', category: 'beauty-skincare', badge: 'Top Pick', shortBenefit: 'Flawless makeup application with adjustable, natural-toned lighting.', keyBenefits: ['Touch-sensor dimming', 'USB rechargeable', 'Magnification panels included'], rating: '4.9/5 Recommended', image: '/assets/products/placeholder.png', price: 29.99 },
  // Trending Now
  { id: 205, name: 'Heatless Hair Curlers', category: 'beauty-skincare', badge: 'Trending Now', shortBenefit: 'Get bouncy, beautiful curls overnight without damaging heat.', keyBenefits: ['Comfortable to sleep in', 'Prevents hair breakage', 'Works on all hair types'], rating: '4.5/5 Highly Rated', image: '/assets/products/placeholder.png', price: 12.99 },
  { id: 206, name: 'Blackhead Remover Vacuum', category: 'beauty-skincare', badge: 'Trending Now', shortBenefit: 'Deep clean pores and remove impurities safely at home.', keyBenefits: ['Adjustable suction levels', 'Multiple probe heads', 'LED display screen'], rating: '4.4/5 Highly Rated', image: '/assets/products/placeholder.png', price: 24.99 },
  { id: 207, name: 'Electric Toothbrush', category: 'beauty-skincare', badge: 'Trending Now', shortBenefit: 'Superior plaque removal with advanced sonic cleaning technology.', keyBenefits: ['Built-in smart timer', 'Multiple brushing modes', 'Long-lasting battery life'], rating: '4.8/5 Highly Rated', image: '/assets/products/placeholder.png', price: 39.99 },
  // Editor's Choice
  { id: 208, name: 'Electric Eyebrow Trimmer', category: 'beauty-skincare', badge: 'Editor\'s Choice', shortBenefit: 'Painless, precision hair removal for perfect eyebrow shaping.', keyBenefits: ['Hypoallergenic precision tip', 'Built-in LED framing light', 'Compact and travel-friendly'], rating: '4.7/5 Premium Pick', image: '/assets/products/placeholder.png', price: 18.99 },
  { id: 209, name: 'Makeup Brush Set', category: 'beauty-skincare', badge: 'Editor\'s Choice', shortBenefit: 'A complete staple kit of professional-grade synthetic brushes.', keyBenefits: ['Cruelty-free soft bristles', 'Includes face and eye brushes', 'Durable, shedding-free handles'], rating: '4.9/5 Premium Pick', image: '/assets/products/placeholder.png', price: 22.99 },
  { id: 210, name: 'Cosmetic Organizer', category: 'beauty-skincare', badge: 'Editor\'s Choice', shortBenefit: 'Keep your vanity clutter-free with this elegant, clear display case.', keyBenefits: ['360-degree smooth rotation', 'Adjustable shelving heights', 'Easy-to-clean acrylic build'], rating: '4.8/5 Premium Pick', image: '/assets/products/placeholder.png', price: 26.99 },

  // --- HEALTH & WELLNESS ---
  // Top Picks
  { id: 301, name: 'Neck & Shoulder Massager', category: 'health-personal-care', badge: 'Top Pick', shortBenefit: 'Relieve deep tissue tension with heated shiatsu kneading.', keyBenefits: ['Soothing heat therapy', 'Ergonomic U-shape design', 'Adjustable speed and direction'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 49.99 },
  { id: 302, name: 'Posture Corrector', category: 'health-personal-care', badge: 'Top Pick', shortBenefit: 'Align your spine and relieve upper back pain instantly.', keyBenefits: ['Breathable, invisible under clothes', 'Fully adjustable fit', 'Builds muscle memory'], rating: '4.5/5 Recommended', image: '/assets/products/placeholder.png', price: 19.99 },
  { id: 303, name: 'Massage Gun', category: 'health-personal-care', badge: 'Top Pick', shortBenefit: 'Accelerate muscle recovery and relieve soreness with percussive therapy.', keyBenefits: ['High-torque quiet motor', 'Interchangeable massage heads', 'Long battery life'], rating: '4.9/5 Recommended', image: '/assets/products/placeholder.png', price: 79.99 },
  { id: 304, name: 'Memory Foam Pillow', category: 'health-personal-care', badge: 'Top Pick', shortBenefit: 'Optimal neck support for a pain-free, restful night\'s sleep.', keyBenefits: ['Contoured orthopedic design', 'Cooling gel infusion', 'Washable bamboo cover'], rating: '4.7/5 Recommended', image: '/assets/products/placeholder.png', price: 34.99 },
  // Trending Now
  { id: 305, name: 'Aromatherapy Diffuser', category: 'health-personal-care', badge: 'Trending Now', shortBenefit: 'Enhance your mood and home fragrance with quiet ultrasonic mist.', keyBenefits: ['Auto shut-off safety feature', 'Color-changing LED lights', 'Whisper-quiet operation'], rating: '4.6/5 Highly Rated', image: '/assets/products/placeholder.png', price: 24.99 },
  { id: 306, name: 'Foam Roller', category: 'health-personal-care', badge: 'Trending Now', shortBenefit: 'Improve flexibility and release trigger points effectively.', keyBenefits: ['High-density durable foam', 'Lightweight and portable', 'Great for pre/post-workout'], rating: '4.8/5 Highly Rated', image: '/assets/products/placeholder.png', price: 16.99 },
  { id: 307, name: 'Weighted Blanket', category: 'health-personal-care', badge: 'Trending Now', shortBenefit: 'Calm your nervous system and sleep deeper with gentle pressure therapy.', keyBenefits: ['Premium glass bead fill', 'Even weight distribution', 'Breathable cotton fabric'], rating: '4.9/5 Highly Rated', image: '/assets/products/placeholder.png', price: 65.99 },
  // Editor's Choice
  { id: 308, name: 'Eye Massager', category: 'health-personal-care', badge: 'Editor\'s Choice', shortBenefit: 'Relieve eye strain and migraine tension with heat and vibration.', keyBenefits: ['Soothing air compression', 'Built-in bluetooth music', 'Foldable 180° design'], rating: '4.8/5 Premium Pick', image: '/assets/products/placeholder.png', price: 55.99 },
  { id: 309, name: 'White Noise Machine', category: 'health-personal-care', badge: 'Editor\'s Choice', shortBenefit: 'Mask disruptive noises and improve focus or sleep quality.', keyBenefits: ['Multiple soothing soundscapes', 'Adjustable volume and timers', 'Compact for travel'], rating: '4.9/5 Premium Pick', image: '/assets/products/placeholder.png', price: 29.99 },
  { id: 310, name: 'Lumbar Support Cushion', category: 'health-personal-care', badge: 'Editor\'s Choice', shortBenefit: 'Maintain proper posture and reduce lower back pain while sitting.', keyBenefits: ['High-density memory foam', 'Adjustable chair straps', 'Breathable mesh cover'], rating: '4.7/5 Premium Pick', image: '/assets/products/placeholder.png', price: 24.99 },

  // --- PET SUPPLIES ---
  // Top Picks
  { id: 401, name: 'Pet Hair Remover Roller', category: 'pet-supplies', badge: 'Top Pick', shortBenefit: 'Quickly trap and remove pet hair from furniture instantly.', keyBenefits: ['No sticky adhesive tape required', 'Self-cleaning lint chamber', 'Reusable and eco-friendly'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 18.99 },
  { id: 402, name: 'Self-Cleaning Grooming Brush', category: 'pet-supplies', badge: 'Top Pick', shortBenefit: 'Remove loose undercoat safely while massaging your pet.', keyBenefits: ['One-click hair release button', 'Gentle on sensitive skin', 'Reduces shedding by up to 90%'], rating: '4.9/5 Recommended', image: '/assets/products/placeholder.png', price: 15.99 },
  { id: 403, name: 'Automatic Pet Feeder', category: 'pet-supplies', badge: 'Top Pick', shortBenefit: 'Ensure your pets are fed on time, even when you\'re away.', keyBenefits: ['Custom programmable meals', 'Voice recording feature', 'Anti-clog food dispenser'], rating: '4.7/5 Recommended', image: '/assets/products/placeholder.png', price: 65.99 },
  { id: 404, name: 'Pet Water Fountain', category: 'pet-supplies', badge: 'Top Pick', shortBenefit: 'Encourage healthier hydration with constantly flowing, filtered water.', keyBenefits: ['Ultra-quiet pump system', 'Multi-layer carbon filtration', 'BPA-free construction'], rating: '4.6/5 Recommended', image: '/assets/products/placeholder.png', price: 28.99 },
  // Trending Now
  { id: 405, name: 'Interactive Dog Toy', category: 'pet-supplies', badge: 'Trending Now', shortBenefit: 'Keep your dog mentally stimulated and entertained for hours.', keyBenefits: ['Dispenses treats as they play', 'Durable bite-resistant material', 'Reduces anxiety and boredom'], rating: '4.5/5 Highly Rated', image: '/assets/products/placeholder.png', price: 14.99 },
  { id: 406, name: 'Cat Laser Toy', category: 'pet-supplies', badge: 'Trending Now', shortBenefit: 'Provide endless joy and exercise with unpredictable laser patterns.', keyBenefits: ['Automatic random movement', 'Safe laser strength', 'Multiple speed settings'], rating: '4.6/5 Highly Rated', image: '/assets/products/placeholder.png', price: 22.99 },
  { id: 407, name: 'Portable Pet Water Bottle', category: 'pet-supplies', badge: 'Trending Now', shortBenefit: 'Convenient hydration for your pet during walks and travel.', keyBenefits: ['One-hand watering operation', 'Leak-proof lock button', 'Unused water flows back in'], rating: '4.9/5 Highly Rated', image: '/assets/products/placeholder.png', price: 16.99 },
  // Editor's Choice
  { id: 408, name: 'Slow Feeder Bowl', category: 'pet-supplies', badge: 'Editor\'s Choice', shortBenefit: 'Prevent bloating and aid digestion by slowing down eating speed.', keyBenefits: ['Promotes healthy eating habits', 'Non-slip rubber base', 'Food-safe durable plastic'], rating: '4.8/5 Premium Pick', image: '/assets/products/placeholder.png', price: 12.99 },
  { id: 409, name: 'Pet Nail Clipper', category: 'pet-supplies', badge: 'Editor\'s Choice', shortBenefit: 'Safely and cleanly trim your pet\'s nails at home.', keyBenefits: ['Built-in safety guard', 'Sharp stainless steel blades', 'Ergonomic non-slip handle'], rating: '4.7/5 Premium Pick', image: '/assets/products/placeholder.png', price: 10.99 },
  { id: 410, name: 'Pet Bed', category: 'pet-supplies', badge: 'Editor\'s Choice', shortBenefit: 'Provide ultimate comfort and joint support for restful sleep.', keyBenefits: ['Orthopedic foam base', 'Machine washable cover', 'Raised rim for head support'], rating: '4.9/5 Premium Pick', image: '/assets/products/placeholder.png', price: 45.99 },

  // --- BABY & KIDS ESSENTIALS ---
  // Top Picks
  { id: 501, name: 'Baby Nail Trimmer', category: 'baby-products', badge: 'Top Pick', shortBenefit: 'Safely file tiny nails without risk of clipping the skin.', keyBenefits: ['Whisper-quiet motor', 'Built-in LED front light', 'Multiple filing pad strengths'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 18.99 },
  { id: 502, name: 'Silicone Feeding Set', category: 'baby-products', badge: 'Top Pick', shortBenefit: 'Make mealtime less messy with strong suction tableware.', keyBenefits: ['100% food-grade silicone', 'Microwave and dishwasher safe', 'Strong table suction base'], rating: '4.9/5 Recommended', image: '/assets/products/placeholder.png', price: 29.99 },
  { id: 503, name: 'Baby Diaper Bag', category: 'baby-products', badge: 'Top Pick', shortBenefit: 'Carry all baby essentials organized and securely on the go.', keyBenefits: ['Waterproof exterior fabric', 'Insulated bottle pockets', 'Included changing pad'], rating: '4.7/5 Recommended', image: '/assets/products/placeholder.png', price: 45.99 },
  { id: 504, name: 'Portable Changing Mat', category: 'baby-products', badge: 'Top Pick', shortBenefit: 'A clean, waterproof surface for diaper changes anywhere.', keyBenefits: ['Folds compact for travel', 'Wipe-clean waterproof lining', 'Extra pockets for wipes'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 19.99 },
  // Trending Now
  { id: 505, name: 'Cabinet Safety Locks', category: 'baby-products', badge: 'Trending Now', shortBenefit: 'Baby-proof your home easily with invisible magnetic locks.', keyBenefits: ['Tool-free adhesive install', 'Hidden from the outside', 'Keeps hazardous items secure'], rating: '4.7/5 Highly Rated', image: '/assets/products/placeholder.png', price: 22.99 },
  { id: 506, name: 'Baby Bottle Warmer', category: 'baby-products', badge: 'Trending Now', shortBenefit: 'Quickly and safely heat milk and baby food to the perfect temp.', keyBenefits: ['Preserves milk nutrients', 'Automatic shut-off timer', 'Fits all bottle brands'], rating: '4.8/5 Highly Rated', image: '/assets/products/placeholder.png', price: 34.99 },
  { id: 507, name: 'Baby Bath Support', category: 'baby-products', badge: 'Trending Now', shortBenefit: 'Keep your newborn safe, comfortable, and secure during bath time.', keyBenefits: ['Ergonomic soft mesh shape', 'Drains water quickly', 'Fits in sink or large tub'], rating: '4.9/5 Highly Rated', image: '/assets/products/placeholder.png', price: 24.99 },
  // Editor's Choice
  { id: 508, name: 'Stroller Organizer', category: 'baby-products', badge: 'Editor\'s Choice', shortBenefit: 'Keep your coffee, phone, and baby items right at your fingertips.', keyBenefits: ['Universal stroller fit', 'Insulated cup holders', 'Detachable wristlet pouch'], rating: '4.8/5 Premium Pick', image: '/assets/products/placeholder.png', price: 25.99 },
  { id: 509, name: 'Baby Toy Set', category: 'baby-products', badge: 'Editor\'s Choice', shortBenefit: 'Engage sensory development with safe, colorful interactive blocks.', keyBenefits: ['Soft and chewable materials', 'Squeaks when squeezed', 'Teaches colors and numbers'], rating: '4.9/5 Premium Pick', image: '/assets/products/placeholder.png', price: 28.99 },
  { id: 510, name: 'Baby Grooming Kit', category: 'baby-products', badge: 'Editor\'s Choice', shortBenefit: 'All the essential tools for keeping your baby clean and healthy.', keyBenefits: ['Includes comb, brush, and clippers', 'Soft bristles for delicate scalp', 'Compact storage case'], rating: '4.7/5 Premium Pick', image: '/assets/products/placeholder.png', price: 15.99 },

  // --- ELECTRONICS & ACCESSORIES ---
  // Top Picks
  { id: 601, name: 'Wireless Earbuds', category: 'electronics-accessories', badge: 'Top Pick', shortBenefit: 'Immersive sound quality with deep bass and active noise cancellation.', keyBenefits: ['Bluetooth 5.3 connection', '30-hour playback with case', 'IPX7 waterproof rating'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 49.99 },
  { id: 602, name: 'Fast Wireless Charger', category: 'electronics-accessories', badge: 'Top Pick', shortBenefit: 'Power up your devices quickly without the hassle of cables.', keyBenefits: ['15W fast charging speed', 'Case-friendly charging', 'Overheat protection system'], rating: '4.7/5 Recommended', image: '/assets/products/placeholder.png', price: 24.99 },
  { id: 603, name: 'Power Bank', category: 'electronics-accessories', badge: 'Top Pick', shortBenefit: 'Stay charged on the go with massive battery capacity.', keyBenefits: ['20,000mAh capacity', 'Charge multiple devices at once', 'LED power display'], rating: '4.9/5 Recommended', image: '/assets/products/placeholder.png', price: 35.99 },
  { id: 604, name: 'Bluetooth Speaker', category: 'electronics-accessories', badge: 'Top Pick', shortBenefit: 'Portable, powerful audio for outdoor adventures or home listening.', keyBenefits: ['360° surround sound', 'Rugged waterproof build', '12-hour continuous battery'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 42.99 },
  // Trending Now
  { id: 605, name: 'Smart LED Strip Lights', category: 'electronics-accessories', badge: 'Trending Now', shortBenefit: 'Transform any room with customizable, app-controlled lighting.', keyBenefits: ['Syncs directly to music', 'Millions of RGB colors', 'Easy adhesive installation'], rating: '4.6/5 Highly Rated', image: '/assets/products/placeholder.png', price: 29.99 },
  { id: 606, name: 'Car Phone Mount', category: 'electronics-accessories', badge: 'Trending Now', shortBenefit: 'Secure, one-handed phone docking for safer driving navigation.', keyBenefits: ['Strong suction cup base', 'Adjustable telescopic arm', 'Fits thick phone cases'], rating: '4.8/5 Highly Rated', image: '/assets/products/placeholder.png', price: 18.99 },
  { id: 607, name: 'Charging Hub', category: 'electronics-accessories', badge: 'Trending Now', shortBenefit: 'Consolidate your charging cables with a sleek desktop powerhouse.', keyBenefits: ['Provides 6 fast-charging USB ports', 'Smart ID power distribution', 'Compact desktop design'], rating: '4.7/5 Highly Rated', image: '/assets/products/placeholder.png', price: 32.99 },
  // Editor's Choice
  { id: 608, name: 'Mini Projector', category: 'electronics-accessories', badge: 'Editor\'s Choice', shortBenefit: 'Turn any wall into a massive home theater experience.', keyBenefits: ['1080P HD support', 'Built-in stereo speakers', 'Compatible with sticks and phones'], rating: '4.7/5 Premium Pick', image: '/assets/products/placeholder.png', price: 89.99 },
  { id: 609, name: 'Laptop Stand', category: 'electronics-accessories', badge: 'Editor\'s Choice', shortBenefit: 'Improve your posture and laptop cooling with this ergonomic riser.', keyBenefits: ['Premium aluminum alloy', 'Adjustable height viewing angles', 'Folds flat for portability'], rating: '4.9/5 Premium Pick', image: '/assets/products/placeholder.png', price: 26.99 },
  { id: 610, name: 'Phone Stand', category: 'electronics-accessories', badge: 'Editor\'s Choice', shortBenefit: 'The perfect desk companion for hands-free video calls and viewing.', keyBenefits: ['Weighted anti-tip base', 'Fully adjustable angle', 'Silicone padding prevents scratches'], rating: '4.8/5 Premium Pick', image: '/assets/products/placeholder.png', price: 14.99 },

  // --- SPORTS & FITNESS ---
  // Top Picks
  { id: 701, name: 'Resistance Bands', category: 'sports-fitness', badge: 'Top Pick', shortBenefit: 'A complete portable gym for full-body strength training anywhere.', keyBenefits: ['Stackable tension levels', 'Includes handles and door anchor', 'Snap-resistant natural latex'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 29.99 },
  { id: 702, name: 'Massage Gun', category: 'sports-fitness', badge: 'Top Pick', shortBenefit: 'Professional deep tissue therapy to eliminate muscle knots.', keyBenefits: ['Ergonomic anti-slip grip', '6 specialized massage heads', 'Ultra-quiet brushless motor'], rating: '4.9/5 Recommended', image: '/assets/products/placeholder.png', price: 85.99 },
  { id: 703, name: 'Yoga Mat', category: 'sports-fitness', badge: 'Top Pick', shortBenefit: 'Extra thick, non-slip surface for perfect balance and joint cushioning.', keyBenefits: ['Eco-friendly TPE material', 'Alignment lines for form', 'Moisture-resistant for easy cleaning'], rating: '4.7/5 Recommended', image: '/assets/products/placeholder.png', price: 35.99 },
  { id: 704, name: 'Adjustable Dumbbells', category: 'sports-fitness', badge: 'Top Pick', shortBenefit: 'Save space and switch weights instantly with a dial turn.', keyBenefits: ['Replaces an entire weight rack', 'Smooth weight transition dial', 'Durable steel plate construction'], rating: '4.8/5 Recommended', image: '/assets/products/placeholder.png', price: 149.99 },
  // Trending Now
  { id: 705, name: 'Ab Roller', category: 'sports-fitness', badge: 'Trending Now', shortBenefit: 'Engage your core intensely for stronger, defined abdominal muscles.', keyBenefits: ['Ultra-wide stable wheel design', 'Ergonomic foam handles', 'Includes knee protection pad'], rating: '4.6/5 Highly Rated', image: '/assets/products/placeholder.png', price: 19.99 },
  { id: 706, name: 'Jump Rope', category: 'sports-fitness', badge: 'Trending Now', shortBenefit: 'Maximize calorie burn with smooth, tangle-free speed rotation.', keyBenefits: ['Adjustable steel wire cable', 'Ball-bearing rotation system', 'Comfortable memory foam handles'], rating: '4.8/5 Highly Rated', image: '/assets/products/placeholder.png', price: 12.99 },
  { id: 707, name: 'Foam Roller', category: 'sports-fitness', badge: 'Trending Now', shortBenefit: 'Speed up recovery by rolling out tight IT bands and calves.', keyBenefits: ['Deep tissue massage zones', 'Retains shape after heavy use', 'Compact 13-inch travel size'], rating: '4.7/5 Highly Rated', image: '/assets/products/placeholder.png', price: 22.99 },
  // Editor's Choice
  { id: 708, name: 'Push-Up Board', category: 'sports-fitness', badge: 'Editor\'s Choice', shortBenefit: 'Target specific muscle groups correctly with color-coded positions.', keyBenefits: ['Prevents wrist strain', 'Folds for compact storage', 'Targets chest, shoulders, and triceps'], rating: '4.8/5 Premium Pick', image: '/assets/products/placeholder.png', price: 34.99 },
  { id: 709, name: 'Gym Gloves', category: 'sports-fitness', badge: 'Editor\'s Choice', shortBenefit: 'Protect your hands from calluses while improving your lifting grip.', keyBenefits: ['Integrated wrist wrap support', 'Breathable mesh back', 'Silicone gripping palm'], rating: '4.9/5 Premium Pick', image: '/assets/products/placeholder.png', price: 18.99 },
  { id: 710, name: 'Water Bottle', category: 'sports-fitness', badge: 'Editor\'s Choice', shortBenefit: 'Stay perfectly hydrated with time markers and an easy-sip straw.', keyBenefits: ['BPA-free Tritan plastic', 'Motivational time markers', 'Leak-proof locking lid'], rating: '4.8/5 Premium Pick', image: '/assets/products/placeholder.png', price: 16.99 }
];

const testimonials = [
  { id: 1, name: 'Michael T.', location: 'Texas, USA', quote: 'Impressed with the Quality', text: 'I wasn\'t expecting this level of quality at this price point. Everything arrived in perfect condition. Will definitely order again.', region: 'us' },
  { id: 2, name: 'Jessica L.', location: 'California, USA', quote: 'Smooth & Reliable Experience', text: 'The ordering process was simple, and the delivery was faster than expected. Great service overall.', region: 'us' },
  { id: 3, name: 'David R.', location: 'New York, USA', quote: 'Great Online Store', text: 'I\'ve tried several online stores, but this one stands out for its professionalism and product selection. Highly recommended.', region: 'us' },
  { id: 4, name: 'Emily S.', location: 'Florida, USA', quote: 'Excellent Value for Money', text: 'Affordable pricing without compromising on quality. Exactly what I was looking for.', region: 'us' },
  
  { id: 5, name: 'Ahmed K.', location: 'Abu Dhabi', quote: 'Very Professional Service', text: 'The team was very responsive, and the entire process was handled professionally. Great experience.', region: 'ae' },
  { id: 6, name: 'Sara M.', location: 'Dubai', quote: 'Fast Delivery & Good Quality', text: 'Product quality exceeded expectations, and delivery was on time. Will recommend to others.', region: 'ae' },
  { id: 7, name: 'Hassan A.', location: 'Sharjah', quote: 'Reliable & Trustworthy', text: 'Everything was exactly as described. It\'s good to see a company that delivers what it promises.', region: 'ae' },
  { id: 8, name: 'Fatima R.', location: 'Al Ain', quote: 'Seamless Shopping Experience', text: 'Easy to navigate website and smooth checkout process. Very satisfied.', region: 'ae' }
];

const categoryThemes = {
  'home-kitchen': {
    primary: '#914d00',
    secondary: '#f28c28',
    title: 'Modern Kitchen',
    subtitle: 'Culinary excellence & lifestyle essentials',
    image: '/assets/categories/home-kitchen.png',
    seoTitle: 'Top 10 Best Home & Kitchen Products (2026)',
    seoIntro: 'Discover the most useful, trending, and top-rated home & kitchen products carefully selected for quality and value.'
  },
  'health-personal-care': {
    primary: '#006a6a',
    secondary: '#00cfcf',
    title: 'Personal Vitality',
    subtitle: 'Advanced wellness & health curations',
    image: '/assets/categories/health-wellness.png',
    seoTitle: 'Top 10 Best Health & Wellness Products (2026)',
    seoIntro: 'Discover the most useful, trending, and top-rated health products carefully selected for quality and value.'
  },
  'beauty-skincare': {
    primary: '#701b2f',
    secondary: '#ffb2bd',
    title: 'Artisanal Beauty',
    subtitle: 'Pristine formulas for a radiant glow',
    image: '/assets/categories/beauty-skincare.png',
    seoTitle: 'Top 10 Best Beauty & Personal Care Products (2026)',
    seoIntro: 'Discover the most useful, trending, and top-rated beauty products carefully selected for quality and value.'
  },
  'pet-supplies': {
    primary: '#3a6a00',
    secondary: '#8ce33a',
    title: 'Pet Curations',
    subtitle: 'Sophisticated gear for your loyal companions',
    image: '/assets/categories/pet-supplies.png',
    seoTitle: 'Top 10 Best Pet Supplies Products (2026)',
    seoIntro: 'Discover the most useful, trending, and top-rated pet supply products carefully selected for quality and value.'
  },
  'baby-products': {
    primary: '#004a77',
    secondary: '#7fbaff',
    title: 'Baby Essentials',
    subtitle: 'Nordic design for the next generation',
    image: '/assets/categories/baby-products.png',
    seoTitle: 'Top 10 Best Baby & Kids Essentials Products (2026)',
    seoIntro: 'Discover the most useful, trending, and top-rated baby essential products carefully selected for quality and value.'
  },
  'electronics-accessories': {
    primary: '#1f1b17',
    secondary: '#bf8f00',
    title: 'Tech Companions',
    subtitle: 'High-performance digital essentials',
    image: '/assets/categories/electronics.png',
    seoTitle: 'Top 10 Best Electronics & Accessories (2026)',
    seoIntro: 'Discover the most useful, trending, and top-rated electronics and accessories carefully selected for quality and value.'
  },
  'sports-fitness': {
    primary: '#006e2a',
    secondary: '#55f985',
    title: 'Peak Performance',
    subtitle: 'Minimalist gear for elite training',
    image: '/assets/categories/sports-fitness.png',
    seoTitle: 'Top 10 Best Sports & Fitness Products (2026)',
    seoIntro: 'Discover the most useful, trending, and top-rated sports & fitness products carefully selected for quality and value.'
  }
};

router.get('/products', (req, res) => res.json(products));
router.get('/testimonials', (req, res) => res.json(testimonials));
router.get('/themes', (req, res) => res.json(categoryThemes));

export default router;
