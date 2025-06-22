import AsyncStorage from '@react-native-async-storage/async-storage';
import { sha256 } from 'js-sha256';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ACTIVE_USER_KEY, USERS_KEY } from '../constants/storageKeys';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const hashPassword = (password: string): string => {
  return sha256(password);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const usersString = await AsyncStorage.getItem(USERS_KEY);
    if (!usersString) throw new Error('No registered users found');

    const users: Array<{ name: string; email: string; password: string }> =
      JSON.parse(usersString);
    const hashedPassword = hashPassword(password);
    const found = users.find(
      u => u.email === email && u.password === hashedPassword,
    );
    if (!found) throw new Error('Invalid credentials');

    const currentUser: User = { name: found.name, email: found.email };
    await AsyncStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(currentUser));
    setUser(currentUser);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      if (!name || !email || !password) throw new Error('Missing fields');

      const usersString = await AsyncStorage.getItem(USERS_KEY);
      const users: Array<{ name: string; email: string; password: string }> =
        usersString ? JSON.parse(usersString) : [];

      const exists = users.some(u => u.email === email);
      if (exists) throw new Error('User already exists');

      const hashedPassword = hashPassword(password);
      const newUser = { name, email, password: hashedPassword };
      const updatedUsers = [...users, newUser];

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

      const currentUser: User = { name, email };
      setUser(currentUser);
      await AsyncStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(currentUser));
    },
    [],
  );

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(ACTIVE_USER_KEY);
    setUser(null);
  }, []);

  const restoreUser = useCallback(async () => {
    const stored = await AsyncStorage.getItem(ACTIVE_USER_KEY);
    if (stored) {
      const parsed: User = JSON.parse(stored);
      setUser(parsed);
    }
  }, []);

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
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
