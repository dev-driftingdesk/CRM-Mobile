import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeaderboardHomepage from '../../screens/tabs/leaderboard/LeaderboardHomepage';

const Stack = createNativeStackNavigator();

const LeaderboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeaderboardHomepage" component={LeaderboardHomepage} />
    </Stack.Navigator>
  );
};

export default LeaderboardStack;
