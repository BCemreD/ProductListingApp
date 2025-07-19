import React from 'react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/Product/ProductCard'; // ProductCard'ın doğru yolu
import { Link } from 'react-router-dom';
import { useFavoriteStore } from '../store/FavoriteStore';

{/*Home Page */}
export default function Home() {

  const favorites = useFavoriteStore(state => state.favorites);
  const removeFavorite = useFavoriteStore(state => state.removeFavorite); // Favori sidebar'ı için


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
             
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                 
                />
              );
            })}
          </div>
          <div className='text-left text-gray-500 mt-6'>
            <Link to='/products' className="text-blue-600 hover:underline">All products &gt;</Link>
          </div>
        </div>

        {/* Favorites(1 col) */}
        <div className="col-span-full lg:col-span-1">
          <h3 className="text-xl font-semibold mb-4">Your Favorites</h3>
          <div className="w-full border border-dashed border-gray-300 shadow-md shadow-sky-500 p-4 rounded-lg text-gray-500 space-y-4">
            {favorites.length === 0 ? (
              <p className="text-center text-gray-600 text-sm">No favorites yet.</p>
            ) : (
              favorites.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md shadow-sm"
                >
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/cccccc/333333?text=Img'; }}
                  />
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-600">{product.price}</p>
                  </div>
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    X
                  </button>
                </div>
              ))
            )}
            {favorites.length > 3 && (
              <div className="text-center mt-4">
                <Link to="/favorites" className="text-blue-600 hover:underline text-sm">
                  View all favorites &gt;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
