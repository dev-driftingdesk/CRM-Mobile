import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';
import RadioButton from './RadioButton';
import FilterDropdown from './FilterDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * FilterBottomSheet Component
 *
 * Bottom sheet modal for filtering and sorting action items.
 * Provides sort options (radio buttons), lead filter, and deal filter.
 *
 * Features:
 * - Slide-up animation from bottom
 * - Backdrop overlay (semi-transparent)
 * - Close on backdrop press, X button, or Apply button
 * - Radio button sort options with single selection
 * - Lead and Deal dropdown filters (mockup for now)
 * - Clear all button to reset filters
 * - Apply button shows active filter count
 *
 * Design Specifications:
 * - Background: white
 * - Border top radius: 24px
 * - Max height: ~85% of screen
 * - Padding: 24px horizontal and vertical
 * - Header height: 56px
 * - Section spacing: 20px margin top
 *
 * @param {Object} props
 * @param {boolean} props.visible - Whether the bottom sheet is visible
 * @param {Function} props.onClose - Callback when bottom sheet should close
 * @param {Function} props.onApply - Callback when filters are applied (receives filter object)
 * @param {Object} props.currentFilters - Current filter state from parent
 * @param {string} props.currentFilters.sortBy - Current sort option
 * @param {string|null} props.currentFilters.lead - Current lead filter
 * @param {string|null} props.currentFilters.deal - Current deal filter
 */
const FilterBottomSheet = ({ visible, onClose, onApply, currentFilters }) => {
  const { theme } = useAppTheme();

  // Sort options configuration
  const sortOptions = [
    { value: 'newly_added', label: 'Newly added' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'priority_high_low', label: 'Priority: High to low' },
    { value: 'priority_low_high', label: 'Priority: Low to high' },
  ];

  // Local filter state
  const [sortBy, setSortBy] = useState(currentFilters.sortBy || 'newly_added');
  const [lead, setLead] = useState(currentFilters.lead || null);
  const [deal, setDeal] = useState(currentFilters.deal || null);

  // Sync local state with currentFilters when modal opens
  useEffect(() => {
    if (visible) {
      setSortBy(currentFilters.sortBy || 'newly_added');
      setLead(currentFilters.lead || null);
      setDeal(currentFilters.deal || null);
    }
  }, [visible, currentFilters]);

  /**
   * Calculate number of active filters
   * Default is "newly_added" sort, so only count if different
   */
  const calculateFilterCount = () => {
    let count = 0;
    if (sortBy !== 'newly_added') count++;
    if (lead) count++;
    if (deal) count++;
    return count;
  };

  /**
   * Handle Clear All button press
   * Resets all filters to default values
   */
  const handleClearAll = () => {
    setSortBy('newly_added');
    setLead(null);
    setDeal(null);
  };

  /**
   * Handle Apply button press
   * Closes modal and passes filter state to parent
   */
  const handleApply = () => {
    const filters = {
      sortBy,
      lead,
      deal,
    };
    onApply(filters);
  };

  /**
   * Handle Lead dropdown press (mockup for now)
   */
  const handleLeadPress = () => {
    console.log('Lead dropdown pressed - Future: open lead picker');
    // TODO: Open lead picker/selection modal
  };

  /**
   * Handle Deal dropdown press (mockup for now)
   */
  const handleDealPress = () => {
    console.log('Deal dropdown pressed - Future: open deal picker');
    // TODO: Open deal picker/selection modal
  };

  const filterCount = calculateFilterCount();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
      propagateSwipe
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.timberwolf,
        }]}>
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              { color: theme.colors.night, flex: 1, textAlign: 'center' },
            ]}
          >
            Filter action items
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Close filter"
          >
            <CustomIcon
              name="xmark"
              width={24}
              height={24}
              tintColour={theme.colors.night}
            />
          </TouchableOpacity>
        </View>

        {/* Content - Scrollable */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Sort by Section */}
          <View style={styles.section}>
            <Text
              style={[
                theme.typography.heading2Medium,
                { color: theme.colors.night, marginBottom: 12 },
              ]}
            >
              Sort by
            </Text>

            {/* Radio Buttons */}
            {sortOptions.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                selected={sortBy === option.value}
                onPress={() => setSortBy(option.value)}
              />
            ))}
          </View>

          {/* Lead Filter Section */}
          <FilterDropdown
            label="Lead"
            placeholder="Filter by lead name"
            value={lead}
            onPress={handleLeadPress}
          />
          <View style={{ marginTop: 24 }}>
            {/* Deal Filter Section */}
            <FilterDropdown
              label="Deal"
              placeholder="Filter by deal"
              value={deal}
              onPress={handleDealPress}
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <SafeAreaView>
          <View style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginTop: 12,
            borderTopWidth: 1,
            marginBottom:30,
            borderTopColor: theme.colors.timberwolf,
          }}>
            <View style={styles.actionButtons}>
              {/* Clear All Button */}
              <TouchableOpacity
                style={[
                  styles.clearButton,
                  {
                    borderColor: theme.colors.davysgrey,
                    borderRadius: theme.radius.radius3,
                  },
                ]}
                onPress={handleClearAll}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Clear all filters"
              >
                <Text
                  style={[
                    theme.typography.BodyBold,
                    { color: theme.colors.night },
                  ]}
                >
                  Clear all
                </Text>
              </TouchableOpacity>

              {/* Apply Button */}
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  {
                    backgroundColor: theme.colors.midnightgreen,
                    borderRadius: theme.radius.radius3,
                  },
                ]}
                onPress={handleApply}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Apply ${filterCount} filters`}
              >
                <Text
                  style={[
                    theme.typography.BodyBold,
                    { color: theme.colors.white },
                  ]}
                >
                  Apply {filterCount > 0 ? `(${filterCount})` : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    maxHeight: '85%',
    paddingTop: 24,
    // paddingHorizontal: 24,
    paddingBottom: 34, // Extra padding for safe area
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    marginBottom: 8,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 16
  },
  section: {
    marginTop: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    // marginTop: 32,
    paddingBottom: 8,
  },
  clearButton: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  applyButton: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterBottomSheet;
