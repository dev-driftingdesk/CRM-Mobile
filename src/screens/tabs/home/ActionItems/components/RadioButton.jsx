import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * RadioButton Component
 *
 * Reusable radio button component with selected/unselected states.
 * Shows a green checkmark icon when selected, empty circle when unselected.
 *
 * Design Specifications:
 * - Height: 48px
 * - Layout: Row with space-between
 * - Selected: Green checkmark icon (24x24px)
 * - Unselected: Gray circle outline (24x24px)
 * - Label: BodyMedium typography (14px)
 *
 * @param {Object} props
 * @param {string} props.label - Radio button label text
 * @param {boolean} props.selected - Whether this radio button is selected
 * @param {Function} props.onPress - Callback when radio button is pressed
 */
const RadioButton = ({ label, selected, onPress }) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
    >
      <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.davysgrey }]}>
        {label}
      </Text>

      <View style={styles.iconContainer}>
        {selected ? (
          <View style={{ backgroundColor:theme.colors.midnightgreen, borderRadius:100, padding:2 }}>
            <CustomIcon
              name="check"
              width={20}
              height={20}
              tintColour={theme.colors.white}
            />
          </View>
        ) : (
          <View
            style={[
              styles.emptyCircle,
              {
                borderColor: theme.colors.davysgrey,
              },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:20
    // height: 48,
    // paddingVertical: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
});

export default RadioButton;
