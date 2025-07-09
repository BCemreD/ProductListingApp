import React, { useState } from 'react';
import { useFilteredProducts } from '../utils/useFilteredProducts';
import { useFavoriteStore } from '../store/FavoriteStore'; 
import ProductCard from '../components/Product/ProductCard'; 

{/*page shows all products by filter*/}
export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const favorites = useFavoriteStore(state => state.favorites); 

  const filteredProducts = useFilteredProducts(searchTerm, category);

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="py-4 text-3xl font-extrabold text-gray-900 text-center">Our Products</h2>

      {/* Search and filter UI */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md w-full sm:w-1/2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-md w-full sm:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="computers">Computers</option>
          <option value="phones">Phones</option>
          <option value="accessories">Accessories</option>
          <option value="cameras">Cameras</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {filteredProducts.map((product) => {
       
          return (
            <ProductCard
              key={product.id}
              product={product}
              
            />
          );
        })}
      </div>
    </div>
  );
}