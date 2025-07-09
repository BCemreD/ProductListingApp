import React from 'react';
import FavoriteButton from './FavoriteButton';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <div className="aspect-w-1 aspect-h-1 flex items-center justify-center bg-white">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="object-contain h-48 w-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x300/cccccc/333333?text=Image+Not+Find';
          }}
        />
      </div>

      <div className="mt-4 flex flex-col flex-grow justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.imageAlt}</p>
        <p className="text-xl font-bold text-gray-900 mt-2">{product.price}</p>
      </div>

      <FavoriteButton product={product} />
    </div>
  );
}
