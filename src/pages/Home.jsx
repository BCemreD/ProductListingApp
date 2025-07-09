import React from 'react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/Product/ProductCard';
import { Link } from 'react-router-dom';
import { useFavoriteStore } from '../store/FavoriteStore';

export default function Home() {

  const favorites = useFavoriteStore(state => state.favorites);
  const isFavorite = useFavoriteStore(state => state.isFavorite);
  const addFavorite = useFavoriteStore(state => state.addFavorite);
  const products = useProductStore(state => state.products);

  return (
   
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
                 <ProductCard product={product} />
                )
              })}
            </div>
            <div className='text-left text-gray-500'><Link to='/products'>All products</Link></div>
          </div>


          {/* Favorites(1 col) */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Your Favorites</h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">

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
             <div className='text-left text-gray-500'><Link to='/favorites'>All favorites</Link></div>
          </div>
        </div>
      </div>
    
  );
}
