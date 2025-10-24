import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeadsHomepage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📋 Leads Homepage</Text>
    </View>
  );
};

export default LeadsHomepage;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' },
  text: { color: '#00C2FF', fontSize: 20 },
});
