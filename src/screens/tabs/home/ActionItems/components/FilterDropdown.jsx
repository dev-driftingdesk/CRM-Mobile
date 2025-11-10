import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * FilterDropdown Component
 *
 * Dropdown input field component for selecting leads and deals.
 * Currently a mockup that logs to console - ready for future picker integration.
 *
 * Design Specifications:
 * - Height: 48px
 * - Border: 1px solid night10 color
 * - Border radius: 12px
 * - Padding: 12px horizontal
 * - Chevron icon: 20x20px on right side
 * - Placeholder: BodyMedium typography, gray color
 *
 * @param {Object} props
 * @param {string} props.label - Section label (e.g., "Lead", "Deal")
 * @param {string} props.placeholder - Placeholder text shown in dropdown
 * @param {string} props.value - Current selected value (null if none)
 * @param {Function} props.onPress - Callback when dropdown is pressed
 */
const FilterDropdown = ({ label, placeholder, value, onPress }) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      {/* Section Label */}
      <Text
        style={[
          theme.typography.BodyBold,
          { color: theme.colors.night, marginBottom: 12 },
        ]}
      >
        {label}
      </Text>

      {/* Dropdown Button */}
      <TouchableOpacity
        style={[
          styles.dropdown,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.night,
            borderRadius: theme.radius.radius3,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${label} filter dropdown`}
        accessibilityHint={`Opens ${label.toLowerCase()} selection picker`}
      >
        {/* Placeholder or Value Text */}
        <Text
          style={[
            theme.typography.BodyMedium,
            {
              color: value ? theme.colors.night : theme.colors.davysgrey,
              flex: 1,
            },
          ]}
        >
          {value || placeholder}
        </Text>

        {/* Chevron Down Icon */}
        <CustomIcon
          name="nav-arrow-down"
          width={20}
          height={20}
          tintColour={theme.colors.night}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
});

export default FilterDropdown;
