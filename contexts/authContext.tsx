import React, { createContext, useContext, useState } from 'react';
import { AuthService } from '../service/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface AuthState {
  authenticated: boolean;
  user: Usuario | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
    user: null,
  });

  const login = async (email: string, password: string) => {
    try {
      const result = await AuthService.login({
        login: email,
        senha: password,
      });

      if (result.error) {
        throw new Error(result.mensagem);
      }

      await AsyncStorage.setItem('@Auth:user', JSON.stringify(result.data));
      await AsyncStorage.setItem('@Auth:token', 'b10583a254678158a93da0');

      setAuthState({
        authenticated: true,
        user: result.data,
      });

      console.log('completo:', result);
      return true;

    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@Auth:user');
    await AsyncStorage.removeItem('@Auth:token');
    setAuthState({
      authenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}