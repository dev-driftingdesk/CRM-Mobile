import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomGradient = ({ colors, start, end, style, children }) => {
  return (
    <LinearGradient
      colors={colors || ['#4c669f', '#3b5998', '#192f6a']}
      start={start || { x: 0, y: 0 }}
      end={end || { x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default CustomGradient;
