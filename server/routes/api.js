import express from 'express';
const router = express.Router();

router.get('/products', (req, res) => {
  const products = [
    // 1. Home & Kitchen
    {
      id: 1,
      category: 'CRAFTSMAN SERIES',
      title: 'Hand-Thrown Ceramic Teapot',
      price: 124.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB-l1IHfd-t0BMfuRzQoPqIsOMDoRQeuHNHaW-8suhqJ49n5hvF4rjyslgu94H-gFC1hqndxhtLhJc6E843pnokRrVt2xObYAO7SzuJR7FKZi7Ss_pN8YMqU1oC-bWdg9h9Y7h-lvNxM9fSIbuKH5VlT4I1jX8qRxt7SV_giTLyaIfQaG8uCp9zDo2s-aqtdN9uoB3M5oA09kTEpCu-wMJ4pb2fTqkVe9jXEyknj1aQ_yivqhMH1ZHN42c1neS4Ol7Fe16Q8Id5w'
    },
    {
      id: 2,
      category: 'GASTRONOMY',
      title: 'Artisan Copper Skillet Set',
      price: 345.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnHEN0zvq7NbR3U0F2nPxIZLS20fTmCzhYRLXqeX0eEAj1gBM7vJLqv3IAq-a3v-VHeyc1tlkNbkf-3BqQvwNittHDWK00Ser7pegBqg7KYuJOA_ylWfMlqXXFRjhTbA4qYzJSwIoA_iQ-LDtrRVJCLaZLHmhlpSHbuvJXI6AzVXy8aBAzcQeMNlR15DrD-vJYA2SzuT2KzLvmjWxe_TqP_o15DU1ZDdvdHmTcclTMs_42q-bY8mwT3wkoI7FUAmttr2UgQtLodA'
    },
    // 2. Health & Personal Care
    {
      id: 9,
      category: 'VITALITY',
      title: 'Therapeutic Diffuser Stone',
      price: 85.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1M2B5jUu7Hq9D0Z9vY1V2X3B4W5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2'
    },
    // 3. Beauty & Skincare
    {
      id: 6,
      category: 'THE GLOW EDIT',
      title: 'Aura Hydrating Serum',
      price: 72.00,
      description: 'Triple-molecular weight hyaluronic acid.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOXUUM0gerzvpWP1BawmqXj1zIArUuh7zVZ1l_TyYyReRhVTXnb9_E3ynTh9VoNt6GvXyg3khDXPoQtNN3RR9cmBBAqKyGEwaPYYnsEYO6zoz4kRxT21AwhXAFx6eepxxMYyFMaSZF2U7-nWJThTXkZWnLFWa9aQ-AwFE5JhCtG8JZ25TnBUF52oLhvfmtSSjPmTmT9cGlJa-_xHsGNt-qn0X2NMywngoAzRmPXmdy8UZNjSnXSY0zikGVmVNFovzbvWbEr-Cyhg'
    },
    // 4. Pet Supplies
    {
      id: 10,
      category: 'PET LUXE',
      title: 'Hand-Woven Orthopedic Pet Bed',
      price: 180.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-zB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1'
    },
    // 5. Baby Products
    {
      id: 11,
      category: 'NURTURE',
      title: 'Organic Cotton Quilted Playmat',
      price: 110.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-zB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1'
    },
    // 6. Electronics Accessories
    {
      id: 12,
      category: 'TECH CURATED',
      title: 'MagSafe Leather Desk Pad',
      price: 95.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-zB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1'
    },
    // 7. Sports & Fitness
    {
      id: 13,
      category: 'MOTION',
      title: 'Natural Cork Yoga Set',
      price: 145.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuE-zB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1'
    }
  ];
  res.status(200).json(products);
});

router.get('/categories', (req, res) => {
  const categories = [
    { id: '1', name: 'Home & Kitchen', icon: 'home' },
    { id: '2', name: 'Health & Personal Care', icon: 'health_and_safety' },
    { id: '3', name: 'Beauty & Skincare', icon: 'spa' },
    { id: '4', name: 'Pet Supplies', icon: 'pets' },
    { id: '5', name: 'Baby Products', icon: 'child_care' },
    { id: '6', name: 'Electronics Accessories', icon: 'devices' },
    { id: '7', name: 'Sports & Fitness', icon: 'fitness_center' }
  ];
  res.status(200).json(categories);
});

export default router;
