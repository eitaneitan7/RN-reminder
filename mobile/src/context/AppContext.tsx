import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AppProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  const login = async (newToken: string) => {
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AppContext.Provider value={{isLoggedIn: !!token, token, login, logout}}>
      {children}
    </AppContext.Provider>
  );
};
