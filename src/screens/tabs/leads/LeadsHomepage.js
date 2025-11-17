import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../../context/ThemeContext';
import CustomIcon from '../../../assets/icons/CustomIcon';
import LeadCard from '../../tabs/home/Leads/components/LeadCard';
import SearchBar from '../../tabs/home/ActionItems/components/SearchBar';
import FilterButton from '../../tabs/home/ActionItems/components/FilterButton';
import LeadsFilterBottomSheet from './components/LeadsFilterBottomSheet';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../components/common/ErrorMessage';
import { fetchLeads } from '../../../store/slices/leads/leadsThunks';
import { clearError } from '../../../store/slices/leads/leadsSlice';
import { debugAuthStorage } from '../../../utils/debugAuth';

/**
 * LeadsHomepage - Main Leads Tab Screen
 *
 * Production-ready leads management screen with API integration.
 * Features Redux state management, loading/error states, and real-time search.
 *
 * Features:
 * - API integration with Redux
 * - Page title "Leads"
 * - Search bar with real-time filtering
 * - Filter button with bottom sheet modal
 * - Create new lead button with icon
 * - Scrollable stacked lead cards
 * - Loading states with spinner
 * - Error states with retry functionality
 * - Empty state handling
 * - Theme integration throughout
 *
 * Layout:
 * - Title, search, and create button are fixed
 * - Only leads list scrolls
 * - Stacked cards with conditional border radius
 */
const LeadsHomepage = ({ navigation }) => {
  const { theme } = useAppTheme();
  const dispatch = useDispatch();

  // Redux state
  const { leads, loading, error } = useSelector(state => state.leads);
  const { error: productsError } = useSelector(state => state.products);

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    product: null,
    salesRep: null,
    sortBy: 'newly_added',
  });

  /**
   * Fetch leads on component mount
   */
  useEffect(() => {
    // Debug auth storage on mount
    debugAuthStorage();
    console.log('🏠 LeadsHomepage mounted - Fetching leads...');
    dispatch(fetchLeads());
  }, [dispatch]);

  /**
   * Show alert if products fetch fails
   * Products are fetched in LeadsStack navigator
   */
  useEffect(() => {
    if (productsError) {
      Alert.alert(
        'Products Load Error',
        productsError?.message || 'Failed to load products. Some features may be limited.',
        [
          {
            text: 'OK',
            style: 'default',
          },
        ]
      );
    }
  }, [productsError]);

  /**
   * Filter leads by search query
   * Searches in both company name and lead name
   * Case-insensitive search
   * Using backend field names: company, leadName
   */
  const filteredLeads = useMemo(() => {
    if (!leads || leads.length === 0) return [];
    if (!searchQuery.trim()) return leads;

    const query = searchQuery.toLowerCase();
    return leads.filter(lead => {
      const company = (lead.company || '').toLowerCase();
      const leadName = (lead.leadName || '').toLowerCase();
      return company.includes(query) || leadName.includes(query);
    });
  }, [leads, searchQuery]);

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
  const handleApplyFilter = filters => {
    setAppliedFilters(filters);
    setFilterModalVisible(false);
    console.log('Applied leads filters:', filters);
    // TODO: Implement actual filtering/sorting logic for leads
  };

  /**
   * Handle create new lead button press
   * Navigates to CreateLeadStep1 screen
   */
  const handleCreateNewLead = () => {
    navigation.navigate('CreateLeadStep1');
  };

  /**
   * Handle lead card press
   * Navigate to LeadDetails screen with lead data
   */
  const handleLeadPress = lead => {
    navigation.navigate('LeadDetails', {
      leadId: lead.id,
      lead: lead,
    });
  };

  /**
   * Handle retry button press
   * Clears error and refetches leads
   */
  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchLeads());
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.isabelline }]}
      edges={['top']}
    >
      {/* Page Title - Fixed */}
      <View style={styles.titleContainer}>
        <Text
          style={[
            theme.typography.heading1Medium,
            { color: theme.colors.night },
          ]}
        >
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

      {/* Content Area - Scrollable */}
      {loading ? (
        // Loading State
        <View style={styles.centerContainer}>
          <LoadingSpinner message="Loading leads..." fullScreen={false} />
        </View>
      ) : error ? (
        // Error State
        <View style={styles.centerContainer}>
          <ErrorMessage
            error={error}
            onRetry={handleRetry}
            fullScreen={false}
          />
        </View>
      ) : (
        // Data/Empty State
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
      )}

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
    maxHeight: 46,
    gap: 12,
  },
  plusIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
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
