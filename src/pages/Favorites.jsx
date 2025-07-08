import React from 'react';
import { useFavoriteStore } from '../store/FavoriteStore'; 

export default function Favorites() {
  
  const favorites = useFavoriteStore(state => state.favorites);
  const removeFavorite = useFavoriteStore(state => state.removeFavorite);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">My Favorites</h2>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Nothing to see.</p>
        ) : (
          
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden
                           transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                           flex flex-col"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200
                            flex items-center justify-center"
                >
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-contain object-center group-hover:opacity-75 max-h-[600px]"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/cccccc/333333?text=Image+Not+Found'; }}
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">
                   
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.imageAlt}</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{product.price}</p>

                  <button
                    type="button"
                    className="mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-auto"
                    onClick={() => removeFavorite(product.id)} //remove the product
                  >
                    Remove 
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
