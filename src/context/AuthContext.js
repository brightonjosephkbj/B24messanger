import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem('b24_token');
      const savedUser = await AsyncStorage.getItem('b24_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    })();
  }, []);

  async function login(newToken, newUser) {
    await AsyncStorage.setItem('b24_token', newToken);
    await AsyncStorage.setItem('b24_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  async function logout() {
    await AsyncStorage.removeItem('b24_token');
    await AsyncStorage.removeItem('b24_user');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
