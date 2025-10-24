import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientReachHomepage from '../../screens/tabs/client-react/ClientReachHomepage';


const Stack = createNativeStackNavigator();

const ClientReachStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClientReachHomepage" component={ClientReachHomepage} />

    </Stack.Navigator>
  );
};

export default ClientReachStack;
