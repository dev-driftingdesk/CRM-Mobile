import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../theme/theme';

const ThemeContext = createContext({
  theme: lightTheme,
  setTheme: () => {},
});

export const AppThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });

    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
