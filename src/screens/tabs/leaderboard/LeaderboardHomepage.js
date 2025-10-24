import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaderboardHomepage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏆 Leaderboard Homepage</Text>
    </View>
  );
};

export default LeaderboardHomepage;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' },
  text: { color: '#00C2FF', fontSize: 20 },
});
