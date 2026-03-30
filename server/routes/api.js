import express from 'express';
const router = express.Router();

router.get('/products', (req, res) => {
  const products = [
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
    {
        id: 3,
        category: 'WELLNESS',
        title: 'Botanical Infusion Kit',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1544171255-235b2aa2b65a?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 4,
        category: 'INTERIOR',
        title: 'Silk Weave Throw',
        price: 195.00,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
    }
  ];
  res.status(200).json(products);
});

router.get('/categories', (req, res) => {
  const categories = [
    { id: 'home', name: 'Home & Kitchen', icon: 'home' },
    { id: 'beauty', name: 'Beauty & Skincare', icon: 'spa' },
    { id: 'tech', name: 'Tech Lifestyle', icon: 'devices' },
    { id: 'personal', name: 'Personal Care', icon: 'face' }
  ];
  res.status(200).json(categories);
});

export default router;
