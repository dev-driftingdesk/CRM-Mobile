import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '../../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from './HomeHeader/HomeHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionItemWidgets from './ActionItemWidget/ActionItemWidgets';
import ActionItemsList from './ActionItems/ActionItemsList';
import { sampleActionItems } from './ActionItems/sampleData';
import LeadsList from './Leads/LeadsList';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { fetchLeads } from '../../../store/slices/leads/leadsThunks';

const HomeScreen = () => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get leads from Redux store
  const { leads, loading } = useSelector(state => state.leads);

  // Fetch leads on component mount
  useEffect(() => {
    console.log('🏠 HomeScreen mounted - Fetching leads...');
    dispatch(fetchLeads());
  }, [dispatch]);

  // Handler for "Show all" button
  const handleShowAll = () => {
    navigation.navigate('AllActionItems');
  };

  // Handler for item press
  const handleItemPress = (item) => {
    console.log('Item pressed:', item);
    navigation.navigate('ActionItemDetails', { actionItemId: item.id, actionItem: item });
  };

  // Handler for leads "Show all" button
  const handleShowAllLeads = () => {
    navigation.navigate('AllLeads');
  };

  // Handler for lead card press
  const handleLeadPress = (lead) => {
    console.log('Lead pressed:', lead);
    navigation.navigate('LeadDetails', { leadId: lead.id, lead });
  };

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
          <View style={[{ paddingHorizontal: 16,  }]}>
            <ActionItemsList
              items={sampleActionItems}
              onShowAll={handleShowAll}
              onItemPress={handleItemPress}
            />
          </View>
          <View style={[{ paddingHorizontal: 16, marginTop: theme.spacings.spacing7 }]}>
            {loading ? (
              <LoadingSpinner message="Loading leads..." size="small" />
            ) : (
              <LeadsList
                leads={leads?.slice(0, 5) || []}
                onShowAll={handleShowAllLeads}
                onLeadPress={handleLeadPress}
              />
            )}
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
