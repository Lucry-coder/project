import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface User {
  email: string;
  name: string;
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('netflix-user', null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = (email: string, password: string) => {
    // Simula autenticazione
    const userData: User = {
      email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=dc2626&color=fff&size=128`
    };
    
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
    // Pulisci anche altri dati utente se necessario
    localStorage.removeItem('netflix-mylist');
    localStorage.removeItem('netflix-likes');
    localStorage.removeItem('netflix-user-likes');
  };

  const switchUser = (email: string, password: string) => {
    logout();
    return login(email, password);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      return updatedUser;
    }
    return null;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    switchUser,
    updateUser
  };
}