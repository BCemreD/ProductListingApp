import React from 'react';

export default function ProductFilter({ searchTerm, setSearchTerm, category, setCategory }) {
 
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home',
    'Sports',
   
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Searchbar */}
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:mr-4">
        <input
          type="text"
          placeholder="Ürün ara..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter */}
      <div className="w-full sm:w-1/2">
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}