import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeadsHomepage from '../../screens/tabs/leads/LeadsHomepage';
import LeadDetails from '../../screens/tabs/leads/LeadDetails'; // optional

const Stack = createNativeStackNavigator();

const LeadsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeadsHomepage" component={LeadsHomepage} />
      <Stack.Screen name="LeadDetails" component={LeadDetails} />
    </Stack.Navigator>
  );
};

export default LeadsStack;
