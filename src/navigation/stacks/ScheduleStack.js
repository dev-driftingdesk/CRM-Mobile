import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/tabs/home/HomeScreen';
import HomeDetails from '../../screens/tabs/home/HomeDetails'; // future subpage
import ScheduleHomepage from '../../screens/tabs/schedule/ScheduleHomepage';

const Stack = createNativeStackNavigator();

const ScheduleStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScheduleHomepage" component={ScheduleHomepage} />

    </Stack.Navigator>
  );
};

export default ScheduleStack;
