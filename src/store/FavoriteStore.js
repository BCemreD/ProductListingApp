import { create } from 'zustand';

// set is used for update the condition of the store
// get is for reach the current store
export const useFavoriteStore = create((set, get) => ({
  favorites: [],
  

  addFavorite: (product) => {
    const currentFavorites = get().favorites;
    const isAlreadyFavorite = currentFavorites.some(item => item.id === product.id);

    if (!isAlreadyFavorite) {
      set({ favorites: [...currentFavorites, product] });
      console.log(`${product.name} added.`);
    } else {
      console.log(`${product.name} already exists.`);
    }
  },

  // Remove from favorites
  removeFavorite: (productID) => {
    const currentFavorites = get().favorites;
    const updatedFavorites = currentFavorites.filter(item => item.id !== productID);
   
    set({ favorites: updatedFavorites });
    console.log(`ID: ${productID} removed.`);
  },

  isFavorite: (productId) => {
    return get().favorites.some(item => item.id === productId);
  },
}));
