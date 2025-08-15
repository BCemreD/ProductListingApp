import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: true,
  error: null,

  // Initialize token and user
  init: async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      set({ token: storedToken, loading: true, error: null });
      try {
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
        set({ user: res.data, loading: false });
      } catch (err) {
        console.error("Token check error:", err);
        get().logout();
      }
    } else {
      set({ loading: false, user: null, token: null, error: null });
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      const { token } = response.data;

      localStorage.setItem('token', token);
      set({ token });

      // Get user info
      const userRes = await axios.get('http://localhost:8080/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ user: userRes.data, loading: false, error: null });
    } catch (err) {
     console.error("Login error:", err);
      set({ error: err.message, loading: false, user: null, token: null });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, error: null, loading: false });
  },
}));
