import React from 'react';
import { useFavoriteStore } from '../../store/FavoriteStore';

export default function RemoveButton({ productId }) {
    const removeFavorite = useFavoriteStore(state => state.removeFavorite);

    return (

        <button
            type="button"
            className="mt-4 w-full flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => removeFavorite(productId)}
        >
            Remove
        </button>
    );
}