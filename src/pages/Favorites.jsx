import { useFavoriteStore } from '../store/FavoriteStore';
import EmptyState from '../components/EmptyState';

export default function Favorites() {
  const favorites = useFavoriteStore(state => state.favorites);

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
      <EmptyState/>

     
    </div>
  );
}
