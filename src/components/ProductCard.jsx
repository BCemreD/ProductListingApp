import React from 'react';
import { products } from '../store/ProductStore';
import { useFavoriteStore } from '../store/FavoriteStore';

export default function ProductCard() {

  const addFavorite = useFavoriteStore(state => state.addFavorite);
  const isFavorite = useFavoriteStore(state => state.isFavorite);
  const favorites = useFavoriteStore(state => state.favorites);
  
  

  return (
    <div className="bg-gray-100">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="py-4">Our Products</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => {
            const isProductFavorite = isFavorite(product.id);
            //updates the list
            return (
              <div key={product.id} className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden
             transform transition-all duration-300 hover:scale-105 hover:shadow-lg
             flex flex-col">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-white lg:aspect-h-8 lg:aspect-w-7 flex items-center justify-center">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-contain object-center group-hover:opacity-75"

                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/cccccc/333333?text=Image+Not+Find'; }}
                  />
                </div>

                {/*Product info*/}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                  
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.imageAlt}</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{product.price}</p>

                  {/** Favorite button */}
                  <button
                    type="button"
                    className={`mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-auto
                   ${isProductFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    onClick={() => {
                      if (isProductFavorite) {
                        alert(`${product.id} already exists.`);
                      } else {
                        addFavorite(product);
                      }
                    }}
                  >
                    {isProductFavorite ? 'In Favorite List' : 'Add Favorite'}

                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
