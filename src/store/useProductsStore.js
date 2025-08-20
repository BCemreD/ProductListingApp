import { create } from 'zustand';
import { mockProductsData } from './mocks/mockProductsData';


export const useProductsStore = create((set) => ({
  products: [],
  loading: true,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
  
      set({ products: mockProductsData, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false, products: [] });
    }
  },
}));
