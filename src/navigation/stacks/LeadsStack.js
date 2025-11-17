import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/products/productsThunks';
import LeadsHomepage from '../../screens/tabs/leads/LeadsHomepage';
import LeadDetails from '../../screens/tabs/leads/LeadDetails'; // optional
import CreateLeadStep1 from '../../screens/tabs/leads/CreateLead/CreateLeadStep1';
import CreateLeadStep2 from '../../screens/tabs/leads/CreateLead/CreateLeadStep2';
import CreateLeadStep3 from '../../screens/tabs/leads/CreateLead/CreateLeadStep3';
import DealDetailsScreen from '../../screens/tabs/leads/DealDetails/DealDetailsScreen';

const Stack = createNativeStackNavigator();

const LeadsStack = () => {
  const dispatch = useDispatch();

  // Fetch products when Leads stack mounts
  useEffect(() => {
    console.log('📦 LeadsStack mounted - Fetching products...');
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeadsHomepage" component={LeadsHomepage} />
      <Stack.Screen name="LeadDetails" component={LeadDetails} />
      <Stack.Screen name="DealDetails" component={DealDetailsScreen} />
      <Stack.Screen name="CreateLeadStep1" component={CreateLeadStep1} />
      <Stack.Screen name="CreateLeadStep2" component={CreateLeadStep2} />
      <Stack.Screen name="CreateLeadStep3" component={CreateLeadStep3} />
    </Stack.Navigator>
  );
};

export default LeadsStack;
