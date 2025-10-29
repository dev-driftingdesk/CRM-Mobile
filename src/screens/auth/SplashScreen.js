import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SplashScreen;
