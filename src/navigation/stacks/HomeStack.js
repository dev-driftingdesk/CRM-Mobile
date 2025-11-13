import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/tabs/home/HomeScreen';
import HomeDetails from '../../screens/tabs/home/HomeDetails'; // future subpage
import AllActionItemsScreen from '../../screens/tabs/home/ActionItems/AllActionItemsScreen';
import ActionItemDetailsScreen from '../../screens/tabs/home/ActionItems/ActionItemDetailsScreen';
import AllLeadsScreen from '../../screens/tabs/home/Leads/AllLeadsScreen';
import LeadDetailsScreen from '../../screens/tabs/leads/LeadDetails/LeadDetailsScreen';
import DealDetailsScreen from '../../screens/tabs/leads/DealDetails/DealDetailsScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HomeDetails" component={HomeDetails} />
      <Stack.Screen name="AllActionItems" component={AllActionItemsScreen} />
      <Stack.Screen name="ActionItemDetails" component={ActionItemDetailsScreen} />
      <Stack.Screen name="AllLeads" component={AllLeadsScreen} />
      <Stack.Screen name="LeadDetails" component={LeadDetailsScreen} />
      <Stack.Screen name="DealDetails" component={DealDetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
