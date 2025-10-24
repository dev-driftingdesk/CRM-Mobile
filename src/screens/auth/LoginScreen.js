import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useAppTheme } from '../../theme/ThemeContext';

const LoginScreen = () => {
  const { colors } = useTheme();
  const { toggleTheme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Login Screen</Text>

      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
  },
});

export default LoginScreen;
