import React from 'react';
import { products } from '../store/ProductStore';
import { Link } from 'react-router-dom';
import { useFavoriteStore } from '../store/FavoriteStore';

export default function Home() {

  const favorites = useFavoriteStore(state => state.favorites);
  const isFavorite = useFavoriteStore(state => state.isFavorite);
  const addFavorite = useFavoriteStore(state => state.addFavorite);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 p-10">Home</h2>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">


          {/* Products (5 cols) */}
          <div className="col-span-full lg:col-span-5">
            <h3 className="text-xl font-semibold mb-4">Our Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => {
                const isProductFavorite = isFavorite(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow flex flex-col overflow-hidden transition-transform hover:scale-[1.02]"
                  >
                    {/* Img */}
                    <div className="aspect-w-1 aspect-h-1 bg-white flex items-center justify-center">
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="object-contain h-48 w-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://placehold.co/400x300/cccccc/333333?text=Image+Not+Find';
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">

                        </h4>
                        <p className="text-sm text-gray-500">{product.imageAlt}</p>
                      </div>

                      <div className="mt-auto pt-6">
                        <p className="text-xl font-bold text-gray-900 mb-2">
                          {product.price}
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-auto
                   ${isProductFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
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
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='text-left text-gray-500'><Link to='/products'>All products</Link></div>
          </div>


          {/* Favorites(1 col) */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Your Favorites</h3>
            <div className="w-full h-full border border-hidden shadow-md shadow-gray-400 p-4 rounded-lg text-gray-500 space-y-4">

              {favorites.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden
                           transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                           flex flex-col">
                  {/* Img */}
                  <div className="aspect-w-1 aspect-h-1 bg-white flex items-center justify-center">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="object-contain h-48 w-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://placehold.co/400x300/cccccc/333333?text=Image+Not+Find';
                      }}
                    />

                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
