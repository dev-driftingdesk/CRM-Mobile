import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { AppThemeProvider, useAppTheme } from './src/context/ThemeContext';
import { KeyboardAvoidingView } from 'react-native';

const AppContent = () => {
  const { theme } = useAppTheme();
  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <KeyboardAvoidingView style={{
      flex: 1
    }}>

      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};

const App = () => (
  <AppThemeProvider>
    <AppContent />
  </AppThemeProvider>
);

export default App;
