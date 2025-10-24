import React, { createContext, useContext, useState, useMemo } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const AppThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = isDark ? DarkTheme : DefaultTheme;

  const value = useMemo(() => ({ theme, isDark, toggleTheme }), [isDark]);

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(AppThemeContext);
