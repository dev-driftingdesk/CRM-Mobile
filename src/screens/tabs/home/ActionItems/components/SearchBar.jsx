import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * SearchBar Component
 *
 * Reusable search input component with search icon.
 * Used for filtering action items by contact name or keywords.
 *
 * @param {Object} props
 * @param {string} props.value - Current search query value
 * @param {Function} props.onChangeText - Callback when text changes
 * @param {string} props.placeholder - Placeholder text (default: "Search by keywords, names")
 */
const SearchBar = ({ value, onChangeText, placeholder = 'Search by keywords, names' }) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.night10,
          borderRadius: theme.radius.radius3,
        },
      ]}
    >
      {/* Search Icon */}
      <CustomIcon
        name="search"
        width={20}
        height={20}
        tintColour={theme.colors.davysgrey}
        style={styles.icon}
      />

      {/* Text Input */}
      <TextInput
        style={[
          styles.input,
          theme.typography.BodyMedium,
          { color: theme.colors.night },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.davysgrey}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 12,
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
  },
});

export default SearchBar;
