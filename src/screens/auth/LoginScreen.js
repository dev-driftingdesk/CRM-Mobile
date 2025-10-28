import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import Logo from '../../components/logo/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
// import { useAppTheme } from '../context/ThemeContext';


const LoginScreen = () => {
  const { theme } = useAppTheme();

  return (
    <ImageBackground
      source={require('../../assets/images/backgrounds/splash-screen.png')}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <SafeAreaView style={{ flex: 1 }}>

        <View>
          <Logo />
        </View>
        <View style={[styles.container, { backgroundColor: theme.colors.white }]}>
          <Text style={[styles.text, { color: theme.colors.text }]}>Login</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default LoginScreen;
