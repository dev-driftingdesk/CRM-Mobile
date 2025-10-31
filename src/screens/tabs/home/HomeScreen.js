import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../context/ThemeContext';



const HomeScreen = () => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { }]}>
      <Text style={{  }}>
        Home Screen
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
