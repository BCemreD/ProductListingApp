import React from 'react';
import { useFavoriteStore } from '../../store/FavoriteStore';
import RemoveButton from './RemoveButton';

export default function FavoriteCard({ product }) {
  const removeFavorite = useFavoriteStore(state => state.removeFavorite);

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden
                 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                 flex flex-col"
    >
      {/* Product img */}
      <div className="aspect-w-1 aspect-h-1 w-full bg-white flex items-center justify-center">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="object-contain h-48 w-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x300/cccccc/333333?text=Image+Not+Found';
          }}
        />
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.imageAlt}</p>
        <p className="text-xl font-bold text-gray-900 mt-2">{product.price}</p>
       
      </div>
        <RemoveButton productId={product.id} />
    </div>
  );
}
