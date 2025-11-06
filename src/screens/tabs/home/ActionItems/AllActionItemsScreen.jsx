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
import ActionItemCard from './components/ActionItemCard';
import SearchBar from './components/SearchBar';
import FilterButton from './components/FilterButton';
import FilterBottomSheet from './components/FilterBottomSheet';
import { sampleActionItems } from './sampleData';

/**
 * AllActionItemsScreen Component
 *
 * Full-page view for displaying all action items with filtering and search capabilities.
 * Features:
 * - Navigation header with back button
 * - Filter pills (Today, Overdue, Upcoming)
 * - Search functionality by contact name and keywords
 * - Filter button (ready for modal implementation)
 * - Scrollable list of individual action item cards
 *
 * @param {Object} props
 * @param {Object} props.navigation - React Navigation object
 * @param {Object} props.route - Route parameters
 */
const AllActionItemsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useAppTheme();

  // State management
  const [activeFilter, setActiveFilter] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    sortBy: 'newly_added',
    lead: null,
    deal: null,
  });

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let items = sampleActionItems.filter(item => item.category === activeFilter);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => {
        const contactName = item.contactName.toLowerCase();
        const description = item.description.toLowerCase();
        const typePrefix = item.type.toLowerCase();
        return (
          contactName.includes(query) ||
          description.includes(query) ||
          typePrefix.includes(query)
        );
      });
    }

    return items;
  }, [activeFilter, searchQuery]);

  // Handlers
  const handleBack = () => {
    navigation.goBack();
  };

  const handleItemPress = (item) => {
    console.log('Item pressed:', item);
    // TODO: Navigate to action item details
    // navigation.navigate('ActionItemDetails', { itemId: item.id });
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilter = () => {
    setFilterModalVisible(false);
  };

  const handleApplyFilter = (filters) => {
    setAppliedFilters(filters);
    setFilterModalVisible(false);
    console.log('Applied filters:', filters);
    // TODO: Implement actual filtering/sorting logic
    // This will sort and filter the filteredItems array
  };

  // Render filter pill
  const renderFilterPill = (label, value) => {
    const isActive = activeFilter === value;

    return (
      <TouchableOpacity
        key={value}
        style={[
          styles.filterPill,
          {
            borderRadius: theme.radius.radius10,
            backgroundColor: isActive ? theme.colors.night : 'transparent',
            borderWidth: isActive ? 0 : 1,
            borderColor: theme.colors.night10,
          },
        ]}
        onPress={() => setActiveFilter(value)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            theme.typography.BodyMedium,
            { color: isActive ? theme.colors.white : theme.colors.night },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.isabelline }]} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            // backgroundColor: theme.colors.white,
            // borderBottomColor: theme.colors.night10,
          },
        ]}
      >
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

        <Text style={[theme.typography.heading2Medium, { color: theme.colors.night }]}>
          Action items
        </Text>
      </View>

      {/* Filter Pills - Fixed */}
      <View style={[styles.filterContainer, { backgroundColor: theme.colors.isabelline }]}>
        {renderFilterPill('Today', 'today')}
        {renderFilterPill('Overdue', 'overdue')}
        {renderFilterPill('Upcoming', 'upcoming')}
      </View>

      {/* Search Row - Fixed */}
      <View style={[styles.searchRow, { backgroundColor: theme.colors.isabelline }]}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by keywords, names"
        />
        <FilterButton onPress={handleFilterPress} />
      </View>

      {/* Action Items List - Scrollable */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredItems.length > 0 ? (
          <View style={styles.cardsContainer}>
            {filteredItems.map((item, index) => (
              <ActionItemCard
                key={item.id}
                item={item}
                onPress={handleItemPress}
                isFirst={index === 0}
                isLast={index === filteredItems.length - 1}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <CustomIcon
              name="clipboard-check"
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
                : `No ${activeFilter} action items`}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Bottom Sheet Modal */}
      <FilterBottomSheet
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
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

export default AllActionItemsScreen;
