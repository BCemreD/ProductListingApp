import { create } from 'zustand';

export const useProductStore = create((set) => ({
  
  products : [
  {//Placeholders for absent images
    id: 1,
    name: 'Laptop',
    category: 'Computers',
    href: '',
    imageSrc: '/images/laptop.jpg',
    imageAlt: 'Laptop for office works and designers.',
    price: '$749.00',

  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Accessories',
    href: '',
    imageSrc: '/images/smwtc.jpg',
    imageAlt: 'Health monitoring, fitness tracker, GPS, online payments.',
    price: '$499.00',
  },
  {
    id: 3,
    name: 'Wireless Headphone',
    category: 'Accessories',
    href: '',
    imageSrc: 'https://placehold.co/400x300/e0f2fe/0369a1?text=Headphones',
    imageAlt: 'Wireless, Bluetooth, built-in mic, electroacoustic transducers.',
    price: '$100.00',


  },
  {
    id: 4,
    name: 'Game Mouse',
    category: 'Accessories',
    href: '',
    imageSrc: '/images/gmou.jpg',
    imageAlt: 'Adjustable DPI and sensible mouse with RGB lighting.',
    price: '$49.00',
  },
  {
    id: 5,
    name: 'Webcam',
    category: 'Cameras',
    href: '',
    imageSrc: '/images/webc.png',
    imageAlt: 'Full HD.',
    price: '$99.00',
  },
  {
    id: 6,
    name: 'Charger',
    category: 'Accessories',
    href: '',
    imageSrc: 'https://placehold.co/400x300/dcfce7/16a34a?text=Powerbank',
    imageAlt: 'High-power, c-type charger.',
    price: '$49.00',
  },
    {
    id: 7,
    name: 'Tripod',
    category: 'Accessories',
    href: '',
    imageSrc: '/images/tri.jpg',
    imageAlt: 'Durabler, max height 120cm.',
    price: '$79.00',
  },
    {
    id: 8,
    name: 'Computer',
    category: 'Computers',
    href: '',
    imageSrc: '/images/comp.jpg',
    imageAlt: 'High-power, c-type charger.',
    price: '$49.00',
  },
],

}));