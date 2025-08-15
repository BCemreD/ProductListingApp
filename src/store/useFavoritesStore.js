import { create } from 'zustand';

export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  loading: false,
  error: null,

  fetchFavorites: async (userId, token) => {
    if (!userId || !token) {
      set({ favorites: [], loading: false, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const res = await fetch(`http://localhost:8080/api/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Favoriler getirilemedi');
      }
      const data = await res.json();
      set({ favorites: data, loading: false, error: null });
    } catch (err) {
      console.error("Favoriler getirilirken hata:", err);
      set({ error: err.message, loading: false, favorites: [] });
    }
  },

  addFavorite: async (userId, product, token) => {
    const state = get();
    if (state.favorites.some(item => item.id === product.id)) {
      console.log(`${product.name} zaten favorilerinizde.`);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/favorites/${userId}/${product.id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Favori eklenemedi');
      }

      const newFav = await res.json();
      set(state => ({ favorites: [...state.favorites, newFav] }));
      set({ error: null });
    } catch (err) {
      console.error("Favori eklenirken hata:", err);
      set({ error: err.message });
    }
  },

  removeFavorite: async (userId, productId, token) => {
    // userId veya token eksikse veya productId sayı değilse işlemi durdur
    if (!userId || !token) {
      console.error("removeFavorite: userId veya token eksik.");
      // throw new Error("Kullanıcı ID veya token eksik."); // Hata fırlatmak istersen
      return; // İşlemi durdur
    }
    if (typeof productId !== 'number') {
      console.error("removeFavorite: productId'nin sayısal bir değer olması bekleniyor, ancak:", productId);
      // throw new Error("Ürün ID'si geçersiz."); // Hata fırlatmak istersen
      return; // İşlemi durdur
    }

    try {
      // 'res' değişkenini burada tanımlayarak hatayı çözüyoruz
      const res = await fetch(`http://localhost:8080/api/favorites/${userId}/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      // HTTP yanıtının başarılı olup olmadığını kontrol et
      if (!res.ok) {
        // Hatalı yanıt durumunda, backend'den gelen hata mesajını yakalamaya çalış
        let errorMsg = 'Favori silinemedi.';
        try {
          const errorData = await res.json();
          errorMsg = errorData.message || errorMsg;
        } catch (jsonError) {
          // JSON parse edilemezse, direkt HTTP durumunu kullan
          errorMsg = `Favori silinemedi: HTTP ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }

      // Silme işlemi başarılıysa favori listesini güncelle
      set(state => ({ favorites: state.favorites.filter(item => item.id !== productId) }));
      set({ error: null }); // Başarılıysa hatayı temizle
    } catch (err) {
      console.error("Favori silinirken hata:", err);
      set({ error: err.message });
    }
  },

  isFavorite: (productId) => {
    return get().favorites.some(item => item.id === productId);
  }
}));
