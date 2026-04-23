import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [isAuthenticated, setIsAuth]  = useState(false);

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem('ct_token');
    if (!token) { setLoading(false); return; }

    try {
      const res = await getMe();
      setUser(res.data.data.user);
      setIsAuth(true);
    } catch {
      localStorage.removeItem('ct_token');
      localStorage.removeItem('ct_user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { initAuth(); }, [initAuth]);

  const saveAuth = (token, userData) => {
    localStorage.setItem('ct_token', token);
    localStorage.setItem('ct_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('ct_token');
    localStorage.removeItem('ct_user');
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
