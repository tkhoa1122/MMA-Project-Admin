import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, role: 'admin' | 'staff') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'staff') => {
    setLoading(true);
    try {
      // 🔥 REAL API - Gọi backend API thật
      const { backendApi } = await import('@/services');
      const response = await backendApi.auth.login({ email, password });
      
      // Backend trả về: { data: { token, refreshToken?, user }, message, success }
      const { token: authToken, user: authUser, refreshToken } = response.data;

      // Lưu token
      localStorage.setItem('token', authToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      // Chuẩn hóa user object (backend dùng _id, frontend dùng id)
      const normalizedUser: User = {
        id: authUser._id || authUser.id,
        name: authUser.name,
        email: authUser.email,
        phone: authUser.phone || '',
        role: authUser.role as 'admin' | 'staff',
        avatar: authUser.avatar,
        createdAt: authUser.createdAt || new Date().toISOString(),
      };
      
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      
      setToken(authToken);
      setUser(normalizedUser);
    } catch (error: any) {
      console.error('Login failed:', error);
      // Backend trả về error format: { message, success: false }
      const errorMessage = error.response?.data?.message || error.message || 'Đăng nhập thất bại';
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Gọi backend logout API
      const { backendApi } = await import('@/services');
      await backendApi.auth.logout();
    } catch (error) {
      console.error('Logout API failed:', error);
      // Vẫn logout ở client dù API fail
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
