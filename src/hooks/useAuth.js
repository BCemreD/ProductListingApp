/* import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Axios interceptor 
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptor); // Cleanup
    };
  }, []);

  // Login 
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(userData);
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  // Token checks when initilizating
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      axios.get('http://localhost:8080/api/auth/me')
        .then(res => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    }, []);

  return { user, token, loading, login, logout };
}
 */