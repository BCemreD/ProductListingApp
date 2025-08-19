import { create } from 'zustand';

export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  loading: false,
  error: null,

  fetchFavorites: async (userId, token) => {
    if (!userId || !token) {
      set({ favorites: [], loading: false, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const res = await fetch(`http://localhost:8080/api/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Favorites not loaded');
      }
      const data = await res.json();
      set({ favorites: data, loading: false, error: null });
    } catch (err) {
      console.error("Favorite load error:", err);
      set({ error: err.message, loading: false, favorites: [] });
    }
  },

  addFavorite: async (userId, product, token) => {
    const state = get();
    if (state.favorites.some(item => item.id === product.id)) {
      console.log(`${product.name} already favorites.`);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/favorites/${userId}/${product.id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Favorite not added');
      }

      const newFav = await res.json();
      set(state => ({ favorites: [...state.favorites, newFav] }));
      set({ error: null });
    } catch (err) {
      console.error("Favorite add error:", err);
      set({ error: err.message });
    }
  },

  removeFavorite: async (userId, productId, token) => {

    if (!userId || !token) {
      console.error("removeFavorite: userId or token missing.");
      return; 
    }
    if (typeof productId !== 'number') {
      console.error("removeFavorite: productId is supposed to be numerical but: ", productId);
      return; 
    }

    try {
      const res = await fetch(`http://localhost:8080/api/favorites/${userId}/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        let errorMsg = 'Favori silinemedi.';
        try {
          const errorData = await res.json();
          errorMsg = errorData.message || errorMsg;
        } catch (jsonError) {
          
          errorMsg = `Favori not removed: HTTP ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }

      set(state => ({ favorites: state.favorites.filter(item => item.id !== productId) }));
      set({ error: null }); 
    } catch (err) {
      console.error("Favori remove error:", err);
      set({ error: err.message });
    }
  },

  isFavorite: (productId) => {
    return get().favorites.some(item => item.id === productId);
  }
}));
