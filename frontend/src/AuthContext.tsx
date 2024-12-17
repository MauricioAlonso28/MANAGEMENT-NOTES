import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { verifyAuth } from './services/users.services';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { signOut } from './thunks/userThunks';

interface AuthContextType {
  isAuthenticated: boolean | null;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await verifyAuth();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  const login = () => setIsAuthenticated(true);

  const logout = async () => {
    dispatch(signOut())
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
