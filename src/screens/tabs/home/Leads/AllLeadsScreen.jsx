import React, { useState, useMemo, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import LeadCard from './components/LeadCard';
import SearchBar from '../ActionItems/components/SearchBar';
import FilterButton from '../ActionItems/components/FilterButton';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../../components/common/ErrorMessage';
import { fetchLeads } from '../../../../store/slices/leads/leadsThunks';
import { clearError } from '../../../../store/slices/leads/leadsSlice';

/**
 * AllLeadsScreen Component
 *
 * Production-ready full-page view for displaying all leads with API integration.
 * Features Redux state management, loading/error states, and real-time search.
 *
 * Features:
 * - API integration with Redux
 * - Navigation header with back button
 * - Search functionality by company name and lead name
 * - Filter button (ready for modal implementation)
 * - Loading states with spinner
 * - Error states with retry functionality
 * - Scrollable list of stacked lead cards
 * - Empty state handling
 * - Real-time search filtering
 *
 * Design Notes:
 * - Header and search bar are fixed at top
 * - Only the leads list scrolls (when loaded)
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
  const dispatch = useDispatch();

  // Redux state
  const { leads, loading, error } = useSelector(state => state.leads);

  // Local state
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Fetch leads on component mount
   */
  useEffect(() => {
    console.log('📋 AllLeadsScreen mounted - Fetching leads...');
    dispatch(fetchLeads());
  }, [dispatch]);

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

  // Handlers
  const handleBack = () => {
    navigation.goBack();
  };

  const handleLeadPress = lead => {
    console.log('Lead pressed:', lead);
    // TODO: Navigate to lead details
    // navigation.navigate('LeadDetails', { leadId: lead.id });
  };

  const handleFilterPress = () => {
    console.log('Filter button pressed');
    // TODO: Show filter modal/bottom sheet
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
        style={[styles.searchRow, { backgroundColor: theme.colors.isabelline }]}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by keywords, names"
        />
        <FilterButton onPress={handleFilterPress} />
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
            </View>
          )}
        </ScrollView>
      )}
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

export default AllLeadsScreen;
