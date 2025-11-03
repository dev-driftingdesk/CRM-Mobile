import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '../../../context/ThemeContext';
import HomeHeader from './HomeHeader/HomeHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionItemWidgets from './ActionItemWidget/ActionItemWidgets';
import ActionItemWidget from './ActionItemWidget/ActionItemWidget';
import ActionItemsList from './ActionItems/ActionItemsList';
import { sampleActionItems } from './ActionItems/sampleData';
import LeadsList from './Leads/LeadsList';
import { sampleLeads } from './Leads/sampleData';

const HomeScreen = () => {
  const { theme } = useAppTheme();

  // Handler for "Show all" button
  const handleShowAll = () => {
    console.log('Navigate to all action items');
    // TODO: Implement navigation to full action items screen
    // navigation.navigate('AllActionItems');
  };

  // Handler for item press
  const handleItemPress = (item) => {
    console.log('Item pressed:', item);
    // TODO: Implement navigation to action item details
    // navigation.navigate('ActionItemDetails', { itemId: item.id });
  };

  // Handler for leads "Show all" button
  const handleShowAllLeads = () => {
    console.log('Navigate to all leads');
    // TODO: Implement navigation to full leads screen
    // navigation.navigate('AllLeads');
  };

  // Handler for lead card press
  const handleLeadPress = (lead) => {
    console.log('Lead pressed:', lead);
    // TODO: Implement navigation to lead details
    // navigation.navigate('LeadDetails', { leadId: lead.id });
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
          <View style={[{ paddingHorizontal: 16, marginTop: theme.spacings.spacing5 }]}>
            <ActionItemsList
              items={sampleActionItems}
              onShowAll={handleShowAll}
              onItemPress={handleItemPress}
            />
          </View>
          <View style={[{ paddingHorizontal: 16, marginTop: theme.spacings.spacing7 }]}>
            <LeadsList
              leads={sampleLeads}
              onShowAll={handleShowAllLeads}
              onLeadPress={handleLeadPress}
            />
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
