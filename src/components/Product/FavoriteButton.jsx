import React from 'react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function FavoriteButton({ product }) {
  const { user, token } = useAuthStore();
  const userId = user?.id;
  
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isProductFavorite = isFavorite(product.id);

  if (!userId) return null;
  
const handleToggleFavorite = async () => {
    if (!userId || !token) return;

    if (isProductFavorite) {
      await removeFavorite(userId, product.id, token);
    } else {
      await addFavorite(userId, product, token);
    }
  };

  return (
    <button
      type="button"
      className={`mt-4 w-full flex items-center justify-center rounded-md px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 mt-auto
        ${isProductFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-300'}`}
      onClick={handleToggleFavorite}
    >
      {isProductFavorite ? 'Remove from Favorites' : 'Add Favorite'}
    </button>
  );
}