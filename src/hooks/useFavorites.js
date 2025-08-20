/* import { useState, useEffect } from 'react';

export function useFavorites(userId) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User's favorites
  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      setLoading(false);  // login yoksa loading’i false yap
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/api/favorites/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch favorites");
        return res.json();
      })
      .then(data => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  // Add favorite
  const addFavorite = async (product) => {
    try {
      const res = await fetch(`http://localhost:8080/api/favorites/${userId}/${product.id}`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error("Failed to add favorite");
      const newFav = await res.json();
      setFavorites(prev => [...prev, newFav]);
    } catch (err) {
      console.error(err);
    }
  };

  // Remove favorite
  const removeFavorite = async (productId) => {
    try {
      await fetch(`http://localhost:8080/api/favorites/${userId}/${productId}`, {
        method: 'DELETE'
      });
      setFavorites(prev => prev.filter(item => item.id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  return { favorites, loading, error, addFavorite, removeFavorite, isFavorite };
}
 */