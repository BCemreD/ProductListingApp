import FavoriteCard from '../components/Favorite/FavoriteCard';
import EmptyState from '../components/EmptyState';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';

export default function Favorites() {
  const { user, token } = useAuthStore();
  const userId = user?.id;
  const { favorites, loading, error, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    if (userId && token) {
      fetchFavorites(userId, token);
    }
  }, [userId, token, fetchFavorites]);

  if (!userId) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
        <p>Please log in to see your favorites.</p>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading favorites: {error}</p>;

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(product => (
            <FavoriteCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}