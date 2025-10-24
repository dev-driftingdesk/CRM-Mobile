import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

import { useAppTheme, AppThemeProvider } from './src/theme/ThemeContext';

const AppContent = () => {
  const { theme } = useAppTheme();

  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

const App = () => (
  <AppThemeProvider>
    <AppContent />
  </AppThemeProvider>
);

export default App;
