import FavoriteCard from '../components/Favorite/FavoriteCard';
import { useFavoriteStore } from '../store/FavoriteStore';

{/*when favorite page is empty */}
export default function EmptyState () {
    const favorites = useFavoriteStore(state => state.favorites);
    return (

     favorites.length === 0 ? (
        <div className="text-center text-gray-500 text-lg border border-dashed border-gray-300 p-8 rounded-lg">
          <img
          src="/images/emptyfavorite.jpg"
          alt="empty"
          className="object-contain h-[400px] w-full"
        />
          Nothing in your favorites.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(product => (
            <FavoriteCard key={product.id} product={product} />
          ))}
        </div>
      )
    );
}
