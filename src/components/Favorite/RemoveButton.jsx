import React from 'react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function RemoveButton({ productId }) {
  const { removeFavorite } = useFavoritesStore();
  const { user, token } = useAuthStore();
  const userId = user?.id;

//user login check
  if (!userId || !token) return null;

   if (typeof productId !== 'number') {
    console.error("RemoveButton: productId should be a number, but:", productId);
    return null; // remove if not a number
  }

  return (
    <button
      type="button"
      className="mt-4 w-full flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      onClick={() => removeFavorite(userId, productId, token)}
    >
      Remove
    </button>
  );
}
