import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import RadioButton from '../../home/ActionItems/components/RadioButton';
import FilterDropdown from '../../home/ActionItems/components/FilterDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * LeadsFilterBottomSheet Component
 *
 * Bottom sheet modal for filtering and sorting leads.
 * Provides product filter, sales representative filter, and sort options.
 *
 * Features:
 * - Slide-up animation from bottom
 * - Backdrop overlay (semi-transparent)
 * - Close on backdrop press, X button, or Apply button
 * - Product dropdown filter (mockup for now)
 * - Sales representative dropdown filter (mockup for now)
 * - Radio button sort options with single selection
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
 * @param {string|null} props.currentFilters.product - Current product filter
 * @param {string|null} props.currentFilters.salesRep - Current sales rep filter
 * @param {string} props.currentFilters.sortBy - Current sort option
 */
const LeadsFilterBottomSheet = ({ visible, onClose, onApply, currentFilters }) => {
  const { theme } = useAppTheme();

  // Sort options configuration for leads
  const sortOptions = [
    { value: 'newly_added', label: 'Newly added' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'value_high_low', label: 'Value: High to low' },
    { value: 'value_low_high', label: 'Value: Low to high' },
  ];

  // Local filter state
  const [product, setProduct] = useState(currentFilters.product || null);
  const [salesRep, setSalesRep] = useState(currentFilters.salesRep || null);
  const [sortBy, setSortBy] = useState(currentFilters.sortBy || 'newly_added');

  // Sync local state with currentFilters when modal opens
  useEffect(() => {
    if (visible) {
      setProduct(currentFilters.product || null);
      setSalesRep(currentFilters.salesRep || null);
      setSortBy(currentFilters.sortBy || 'newly_added');
    }
  }, [visible, currentFilters]);

  /**
   * Calculate number of active filters
   * Default is "newly_added" sort, so only count if different
   */
  const calculateFilterCount = () => {
    let count = 0;
    if (sortBy !== 'newly_added') count++;
    if (product) count++;
    if (salesRep) count++;
    return count;
  };

  /**
   * Handle Clear All button press
   * Resets all filters to default values
   */
  const handleClearAll = () => {
    setProduct(null);
    setSalesRep(null);
    setSortBy('newly_added');
  };

  /**
   * Handle Apply button press
   * Closes modal and passes filter state to parent
   */
  const handleApply = () => {
    const filters = {
      product,
      salesRep,
      sortBy,
    };
    onApply(filters);
  };

  /**
   * Handle Product dropdown press (mockup for now)
   */
  const handleProductPress = () => {
    console.log('Product dropdown pressed - Future: open product picker');
    // TODO: Open product picker/selection modal
  };

  /**
   * Handle Sales Rep dropdown press (mockup for now)
   */
  const handleSalesRepPress = () => {
    console.log('Sales Rep dropdown pressed - Future: open sales rep picker');
    // TODO: Open sales rep picker/selection modal
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
        <View
          style={[
            styles.header,
            {
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.timberwolf,
            },
          ]}
        >
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              { color: theme.colors.night, flex: 1, textAlign: 'center' },
            ]}
          >
            Filter leads
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
          {/* Product Filter Section */}
          <View style={styles.section}>
            <FilterDropdown
              label="Product"
              placeholder="Filter by product of the lead"
              value={product}
              onPress={handleProductPress}
            />
          </View>

          {/* Sales Representative Filter Section */}
          <View style={styles.section}>
            <FilterDropdown
              label="Sales representative"
              placeholder="Filter by sales reps allocated to the lead"
              value={salesRep}
              onPress={handleSalesRepPress}
            />
          </View>

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
        </ScrollView>

        {/* Action Buttons */}
        <SafeAreaView>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginTop: 12,
              borderTopWidth: 1,
              marginBottom: 30,
              borderTopColor: theme.colors.timberwolf,
            }}
          >
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
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
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

export default LeadsFilterBottomSheet;
