import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * FilterButton Component
 *
 * Square filter/sort button with menu icon.
 * Used for opening filter modal/bottom sheet (future implementation).
 *
 * @param {Object} props
 * @param {Function} props.onPress - Callback when button is pressed
 */
const FilterButton = ({ onPress }) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.night10,
          borderRadius: theme.radius.radius3,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <CustomIcon
        name="filter-list"
        width={20}
        height={20}
        tintColour={theme.colors.night}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterButton;
