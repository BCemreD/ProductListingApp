import React, { useState,useEffect } from 'react';
import ProductCard from '../components/Product/ProductCard';
import ProductFilter from '../components/Product/ProductFilter';
import { useProductsStore } from '../store/useProductsStore'

{/*page shows all products by filter*/ }
export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const { products, loading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //instead filteredProducts
  const filteredProducts = products.filter((prod) => {
    const matchesTerm = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === '' || prod.category.toLowerCase() === category.toLowerCase();
    return matchesTerm && matchesCategory;
  });

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="py-4 text-3xl font-extrabold text-gray-900 text-center">Our Products</h2>

      <ProductFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
      />

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