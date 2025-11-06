import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { AppThemeProvider, useAppTheme } from './src/context/ThemeContext';
import { KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';

const AppContent = () => {
  const { theme } = useAppTheme();
  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
    >
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};

const App = () => (
  <AppThemeProvider>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </AppThemeProvider>
);

export default App;
