import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '../../../context/ThemeContext';
import HomeHeader from './HomeHeader/HomeHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionItemWidgets from './ActionItemWidget/ActionItemWidgets';
import ActionItemWidget from './ActionItemWidget/ActionItemWidget';



const HomeScreen = () => {
  const { theme } = useAppTheme();

  return (
    <View style={[{ backgroundColor: theme.colors.isabelline }]}>
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.container, {}]}>
            <HomeHeader />
          </View>
          <View style={[{ paddingLeft: 16, marginVertical: theme.spacings.spacing7 }]}>
            <ActionItemWidgets />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
});
