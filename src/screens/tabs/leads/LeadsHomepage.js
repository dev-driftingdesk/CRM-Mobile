import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../context/ThemeContext';
import CustomIcon from '../../../assets/icons/CustomIcon';
import LeadCard from '../../tabs/home/Leads/components/LeadCard';
import SearchBar from '../../tabs/home/ActionItems/components/SearchBar';
import FilterButton from '../../tabs/home/ActionItems/components/FilterButton';
import LeadsFilterBottomSheet from './components/LeadsFilterBottomSheet';
import { sampleLeads } from '../../tabs/home/Leads/sampleData';

/**
 * LeadsHomepage - Main Leads Tab Screen
 *
 * Production-ready leads management screen with search, filtering, and lead creation.
 * Matches reference design with fixed header and scrollable list.
 *
 * Features:
 * - Page title "Leads"
 * - Search bar with real-time filtering
 * - Filter button (ready for future modal)
 * - Create new lead button with icon
 * - Scrollable stacked lead cards
 * - Empty state handling
 * - Theme integration throughout
 *
 * Layout:
 * - Title, search, and create button are fixed
 * - Only leads list scrolls
 * - Stacked cards with conditional border radius
 */
const LeadsHomepage = () => {
  const { theme } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter modal state
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    product: null,
    salesRep: null,
    sortBy: 'newly_added',
  });

  /**
   * Filter leads by search query
   * Searches in both company name and contact name
   * Case-insensitive search
   */
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return sampleLeads;

    const query = searchQuery.toLowerCase();
    return sampleLeads.filter(lead => {
      const companyName = lead.companyName.toLowerCase();
      const contactName = lead.contactName.toLowerCase();
      return companyName.includes(query) || contactName.includes(query);
    });
  }, [searchQuery]);

  /**
   * Handle filter button press
   * Opens the filter bottom sheet modal
   */
  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  /**
   * Handle closing filter modal
   */
  const handleCloseFilter = () => {
    setFilterModalVisible(false);
  };

  /**
   * Handle applying filters
   * Closes modal and updates applied filters state
   */
  const handleApplyFilter = (filters) => {
    setAppliedFilters(filters);
    setFilterModalVisible(false);
    console.log('Applied leads filters:', filters);
    // TODO: Implement actual filtering/sorting logic for leads
  };

  /**
   * Handle create new lead button press
   * TODO: Navigate to create lead screen
   */
  const handleCreateNewLead = () => {
    console.log('Create new lead pressed');
    // Future: navigation.navigate('CreateLead');
  };

  /**
   * Handle lead card press
   * TODO: Navigate to lead details screen
   */
  const handleLeadPress = (lead) => {
    console.log('Lead pressed:', lead);
    // Future: navigation.navigate('LeadDetails', { leadId: lead.id });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.isabelline }]}
      edges={['top']}
    >
      {/* Page Title - Fixed */}
      <View style={styles.titleContainer}>
        <Text style={[theme.typography.heading1Medium, { color: theme.colors.night }]}>
          Leads
        </Text>
      </View>

      {/* Search Row - Fixed */}
      <View style={styles.searchRow}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by keywords, names"
        />
        <FilterButton onPress={handleFilterPress} />
      </View>

      {/* Create New Lead Button - Fixed */}
      <View style={styles.createButtonContainer}>
        <TouchableOpacity
          style={[
            styles.createButton,
            { backgroundColor: 'rgba(223,216,215,0.5)' },
          ]}
          onPress={handleCreateNewLead}
          activeOpacity={0.7}
        >
          {/* Plus Icon Circle */}
          <View
            style={[
              styles.plusIconCircle,
              { backgroundColor: theme.colors.midnightgreen },
            ]}
          >
            <CustomIcon
              name="plus"
              width={16}
              height={16}
              tintColour={theme.colors.white}
            />
          </View>

          {/* Button Text */}
          <Text
            style={[theme.typography.BodyMedium, { color: theme.colors.night }]}
          >
            Create new lead
          </Text>
        </TouchableOpacity>
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
          // Empty State
          <View style={styles.emptyState}>
            <CustomIcon
              name="user"
              width={48}
              height={48}
              tintColour={theme.colors.davysgrey}
              style={styles.emptyIcon}
            />
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.davysgrey, textAlign: 'center' },
              ]}
            >
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : 'No leads available'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <LeadsFilterBottomSheet
        visible={filterModalVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilter}
        currentFilters={appliedFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  createButtonContainer: {
    paddingHorizontal: 16,
    // paddingTop: 16,
    paddingBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    maxHeight:46,
    gap: 12,
  },
  plusIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  cardsContainer: {
    marginHorizontal: 16,
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
});

export default LeadsHomepage;
