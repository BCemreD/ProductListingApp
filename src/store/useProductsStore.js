import { create } from 'zustand';

export const useProductsStore = create((set) => ({
  products: [],
  loading: true,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('${apiUrl}/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      set({ products: data, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false, products: [] });
    }
  },
}));
