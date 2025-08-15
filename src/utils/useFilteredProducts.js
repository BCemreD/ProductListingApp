/*import { useProductStore } from '../store/useProductStore';

{/*Searchbar for filter products }
export function useFilteredProducts(searchTerm, category) {
  const products = useProductStore(state => state.products);

  return products.filter((prod) => {
    const matchesTerm = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === '' || prod.category.toLowerCase() === category.toLowerCase();

    return matchesTerm && matchesCategory;
  });
}
*/