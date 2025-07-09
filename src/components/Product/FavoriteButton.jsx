import React from 'react';
import { useFavoriteStore } from '../../store/FavoriteStore'; 

export default function FavoriteButton({ product }) { 
  const addFavorite = useFavoriteStore(state => state.addFavorite);
  const isFavorite = useFavoriteStore(state => state.isFavorite);
  const isProductFavorite = isFavorite(product.id); 

  return (
    <button
      type="button"
      className={`mt-4 w-full flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 mt-auto
        ${isProductFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-300'}`}
      onClick={() => {
        if (isProductFavorite) {
          alert(`${product.name} already exists.`);
        } else {
          addFavorite(product);
        }
      }}
    >
      {isProductFavorite ? 'In Favorite List' : 'Add Favorite'}
    </button>
  );
}