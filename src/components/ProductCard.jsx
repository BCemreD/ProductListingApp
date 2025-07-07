import React from 'react'
import {products} from '../store/Product.Store'

export default function ProductCard() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className = "py-4">Our Products</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"> 
          {products.map((product) => (
            //updates the list
            <div key={product.id} className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-h-8 lg:aspect-w-7">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/cccccc/333333?text=Görsel+Yok'; }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.imageAlt}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">{product.price}</p>
                <button
                  type="button"
                  className="mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => alert(`${product.name} favorilere eklendi!`)} 
                >
                  Add Favorite
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
