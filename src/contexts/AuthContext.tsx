import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { api } from '../utils/apiClient';
import { apiEndpoints } from '../config/env';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await api.get<User>(apiEndpoints.profile, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userData);
        }
      } catch {
        // Token is invalid, remove it
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post<{ user: User; token: string }>(
        apiEndpoints.login,
        { email, password }
      );

      const { user: userData, token } = response;
      localStorage.setItem('authToken', token);
      setUser(userData);
    } catch {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post(apiEndpoints.logout);
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      const response = await api.post<{ user: User; token: string }>(
        apiEndpoints.register,
        userData
      );

      const { user: newUser, token } = response;
      localStorage.setItem('authToken', token);
      setUser(newUser);
    } catch {
      throw new Error('Registration failed');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
