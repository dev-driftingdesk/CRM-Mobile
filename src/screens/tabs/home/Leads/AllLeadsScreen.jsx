import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import LeadCard from './components/LeadCard';
import SearchBar from '../ActionItems/components/SearchBar';
import FilterButton from '../ActionItems/components/FilterButton';
import { sampleLeads } from './sampleData';

/**
 * AllLeadsScreen Component
 *
 * Full-page view for displaying all leads with search and filter capabilities.
 *
 * Features:
 * - Navigation header with back button
 * - Search functionality by company name and contact name
 * - Filter button (ready for modal implementation)
 * - Scrollable list of stacked lead cards
 * - Empty state when no results
 * - Real-time search filtering
 *
 * Design Notes:
 * - Header and search bar are fixed at top
 * - Only the leads list scrolls
 * - Cards use stacked design (no gaps, conditional border radius)
 * - First card: rounded top corners
 * - Last card: rounded bottom corners
 * - Middle cards: no border radius
 *
 * @param {Object} props
 * @param {Object} props.navigation - React Navigation object
 * @param {Object} props.route - Route parameters
 */
const AllLeadsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useAppTheme();

  // State management
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filter leads by search query
   * Searches in both company name and contact name
   * Case-insensitive search
   */
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) {
      return sampleLeads;
    }

    const query = searchQuery.toLowerCase();
    return sampleLeads.filter(lead => {
      const companyName = lead.companyName.toLowerCase();
      const contactName = lead.contactName.toLowerCase();
      return companyName.includes(query) || contactName.includes(query);
    });
  }, [searchQuery]);

  // Handlers
  const handleBack = () => {
    navigation.goBack();
  };

  const handleLeadPress = (lead) => {
    console.log('Lead pressed:', lead);
    // TODO: Navigate to lead details
    // navigation.navigate('LeadDetails', { leadId: lead.id });
  };

  const handleFilterPress = () => {
    console.log('Filter button pressed');
    // TODO: Show filter modal/bottom sheet
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.isabelline }]}
      edges={['top']}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header - Fixed */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <CustomIcon
            name="nav-arrow-left"
            width={24}
            height={24}
            tintColour={theme.colors.night}
          />
        </TouchableOpacity>

        <Text
          style={[
            theme.typography.heading2Medium,
            { color: theme.colors.night },
          ]}
        >
          Leads
        </Text>
      </View>

      {/* Search Row - Fixed */}
      <View
        style={[
          styles.searchRow,
          { backgroundColor: theme.colors.isabelline },
        ]}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by keywords, names"
        />
        <FilterButton onPress={handleFilterPress} />
      </View>

      {/* Leads List - Scrollable */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredLeads.length > 0 ? (
          <View style={styles.cardsContainer}>
            {filteredLeads.map((lead, index) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onPress={handleLeadPress}
                isFirst={index === 0}
                isLast={index === filteredLeads.length - 1}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <CustomIcon
              name="search"
              width={48}
              height={48}
              tintColour={theme.colors.davysgrey}
              style={styles.emptyIcon}
            />
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.davysgrey,
                  textAlign: 'center',
                },
              ]}
            >
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : 'No leads available'}
            </Text>
            <Text
              style={[
                theme.typography.BodySmall,
                {
                  color: theme.colors.davysgrey,
                  textAlign: 'center',
                  marginTop: 8,
                },
              ]}
            >
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Add your first lead to get started'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
});

export default AllLeadsScreen;
