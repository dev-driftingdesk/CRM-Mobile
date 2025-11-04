import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';

/**
 * OriginOption - Selection card component for lead origin
 *
 * Features:
 * - Radio button style selection
 * - Selected: Teal background, white text, filled circle
 * - Unselected: White background, black text, empty circle
 * - Pressable with feedback
 *
 * @param {string} label - Display text for option
 * @param {string} value - Value identifier for option
 * @param {boolean} selected - Whether option is selected
 * @param {function} onSelect - Callback when option is pressed
 */
const OriginOption = ({ label, value, selected, onSelect }) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: selected ? '#2D7A77' : theme.colors.white,
          borderWidth: selected ? 0 : 1,
          borderColor: theme.colors.night10,
        },
      ]}
      onPress={() => onSelect(value)}
      activeOpacity={0.7}
    >
      {/* Radio Circle Indicator */}
      <View
        style={[
          styles.radioCircle,
          {
            borderColor: selected ? theme.colors.white : theme.colors.davysgrey,
            backgroundColor: selected ? theme.colors.white : 'transparent',
          },
        ]}
      >
        {selected && <View style={styles.radioInner} />}
      </View>

      {/* Option Label */}
      <Text
        style={[
          theme.typography.BodyMedium,
          {
            color: selected ? theme.colors.white : theme.colors.night,
            flex: 1,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    minHeight: 56,
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2D7A77',
  },
});

export default OriginOption;
