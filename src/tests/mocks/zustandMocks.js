export const mockFavorites = [
  { id: 1, name: 'Test Product', price: '$100', imageSrc: 'img.jpg', imageAlt: 'Alt' },
];

export const getMockFavoriteStore = (overrides = {}) => ({
  favorites: mockFavorites,
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
  isFavorite: jest.fn(() => mockFavorites.some((item) => item.id === id)),
  ...overrides, // For test-based override
});

export const getMockProductStore = (overrides = {}) => ({
  products: mockProducts,
  ...overrides,
});

export const mockProducts = [
  {
    id: 1,
    name: 'Laptop',
    imageSrc: 'laptop.jpg',
    imageAlt: 'A laptop',
    price: '$999',
    category: 'Computers',
  },
  {
    id: 2,
    name: 'Webcam',
    imageSrc: 'webcam.jpg',
    imageAlt: 'A webcam',
    price: '$99',
    category: 'Cameras',
  },
];
