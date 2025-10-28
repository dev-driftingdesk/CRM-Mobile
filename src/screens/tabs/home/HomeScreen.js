import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../context/ThemeContext';



const HomeScreen = () => {
  const { currentTheme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <Text
        style={{
          color: currentTheme.colors.text,
          fontFamily: currentTheme.fonts.bold,
          fontSize: currentTheme.fontSizes.large,
        }}
      >
        🏠 Home Screen
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
