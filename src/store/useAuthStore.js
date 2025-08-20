import { create } from 'zustand';
import { mockUsersData } from './mocks/mockUsersData';

export const useAuthStore = create((set) => ({

  user: null,
  token: null,
  loading: true,
  error: null,

  init: async () => {
    set({ loading: true, error: null });
    try {
      const storedUser = localStorage.getItem("auth_user");
      const storedToken = localStorage.getItem("auth_token");

      if (storedUser && storedToken) {
        set({
          user: JSON.parse(storedUser),
          token: storedToken,
          loading: false
        });
      } else {
        set({ user: null, token: null, loading: false });
      }
    } catch (err) {
      console.error("Auth init error:", err);
      set({ error: err.message, loading: false, user: null, token: null });
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const foundUser = mockUsersData.find(
        u => u.userName === username && u.password === password
      );

      if (foundUser) {
        const simulatedToken = `fake_token_${foundUser.id}`;
        localStorage.setItem("auth_user", JSON.stringify(foundUser));
        localStorage.setItem("auth_token", simulatedToken);

        set({ user: foundUser, token: simulatedToken, loading: false });
      } else {
        throw new Error("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);

      set({ error: err.message, loading: false, user: null, token: null });
    }
  },


  logout: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
      set({ user: null, token: null, loading: false });
    } catch (err) {
      console.error("Logout error:", err);
      set({ error: err.message, loading: false });
    }

  },
}));
