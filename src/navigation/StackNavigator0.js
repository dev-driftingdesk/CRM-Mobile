import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LeadsHomepage from '../screens/tabs/leads/LeadsHomepage';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LeadsHomepage"
        component={LeadsHomepage}
        options={{ title: 'Leads Homepage' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
