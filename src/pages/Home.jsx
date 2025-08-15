import React, { useEffect } from 'react';
import ProductCard from '../components/Product/ProductCard';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useProductsStore } from '../store/useProductsStore';
import { useAuthStore } from '../store/useAuthStore';



{/*Home Page */ }
export default function Home() {

  // Get user authentication state from useAuth hook

  const { products, loading: prodLoading, fetchProducts, error: prodError } = useProductsStore();
  const { favorites, removeFavorite, loading: favLoading, fetchFavorites, error: favError } = useFavoritesStore();
  const { user, token, loading: authLoading, init: initAuth, error: authError } = useAuthStore();
  const userId = user?.id;

 useEffect(() => {
  initAuth();
  fetchProducts();
  if (userId && token) {
    fetchFavorites(userId, token);
  }
}, [initAuth, fetchProducts, fetchFavorites, userId, token]);

  if (prodLoading || authLoading || favLoading) return <p>Loading...</p>;
  if (favError) return <p>Error loading favorites: {favError}</p>;
  if (prodError) return <p>Error loading products: {prodError}</p>;
  if (authError) return <p>Error loading user session: {authError}</p>;

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 p-10">Home</h2>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
        {/* Products */}
        <div className="col-span-full lg:col-span-5">
          <h3 className="text-xl font-semibold mb-4">Our Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-left text-gray-500 mt-6">
            <Link to="/products" className="text-blue-600 hover:underline">
              All products &gt;
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-full lg:col-span-1 space-y-6">
          {/* Cart component */}
          <div className="border border-gray-300 shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
            {/* Cart*/}
            <p className="text-center text-gray-600 text-sm">Cart is empty.</p>
          </div>

        {/* Favorites (after login) */}
{user ? (
  favorites.length > 0 && (
    <div className="w-full border border-dashed border-gray-300 shadow-md shadow-sky-500 p-4 rounded-lg text-gray-500 space-y-4">
      <h3 className="text-xl font-semibold mb-4">Your Favorites</h3>
      {favorites.slice(0, 3).map((product) => (
        <div
          key={product.id}
          className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md shadow-sm"
        >
          <img
            src={product.imageSrc}
            alt={product.name}
            className="h-12 w-12 object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/48x48/cccccc/333333?text=Img';
            }}
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
      ))}
      {favorites.length > 3 && (
        <div className="text-center mt-4">
          <Link to="/favorites" className="text-blue-600 hover:underline text-sm">
            View all favorites &gt;
          </Link>
        </div>
      )}
    </div>
  )
) : null}

        </div>
      </div>
    </div>
  );
}
