import { create } from 'zustand';

// Middleware: favorites from localStorage
// It provides favorites save w/o browser
const loadFavorites = (userId) => {
  if (!userId) return [];
  try {
    const serializedFavorites = localStorage.getItem(`favorites_${userId}`);
    return serializedFavorites ? JSON.parse(serializedFavorites) : [];
  } catch (e) {
    console.error("Favorite load error:", e);
    return [];
  }
};

const saveFavorites = (userId, favorites) => {
  // Not save w/o userId
  if (!userId) return;
  try {
    // Favorites to String
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
  } catch (e) {
    console.error("Favorite add error:", e);
  }
};

export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  loading: false,
  error: null,

  fetchFavorites: async (userId, token) => {
    if (!userId) {
      set({ favorites: [], loading: false, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const loadedFavorites = loadFavorites(userId);
      set({ favorites: loadedFavorites, loading: false, error: null });
    } catch (err) {
      console.error("Favorite get error:", err);
      set({ error: err.message, loading: false, favorites: [] });
    }
  },

  addFavorite: async (userId, product, token) => {
    const state = get();

    if (state.favorites.some(item => item.id === product.id)) {
      console.log(`${product.name} already favorited.`);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      // New favorite list and update
      const newFavorites = [...state.favorites, product];
      set({ favorites: newFavorites, error: null });
      saveFavorites(userId, newFavorites);
    } catch (err) {
      console.error("Favorited add error:", err);
      set({ error: err.message });
    }
  },

  removeFavorite: async (userId, productId, token) => {
    const state = get();
    if (!userId) {
      console.error("removeFavorite: userId missing.");
      return;
    }

    if (typeof productId !== 'number' && typeof productId !== 'string') {
      console.error("removeFavorite: productId should be numerical but:", productId);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const newFavorites = state.favorites.filter(item => item.id !== productId);
      set({ favorites: newFavorites, error: null });
      saveFavorites(userId, newFavorites);
    } catch (err) {
      console.error("Favorite remove error:", err);
      set({ error: err.message });
    }
  },

  isFavorite: (productId) => {
    return get().favorites.some(item => item.id === productId);
  }
}));
