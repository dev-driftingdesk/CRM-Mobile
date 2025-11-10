import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * StatCard Component
 *
 * Reusable card component for displaying statistical information.
 * Supports both dark and light variants with chevron navigation indicator.
 *
 * Features:
 * - Label text at top
 * - Chevron icon in top right
 * - Large value display (heading1Bold)
 * - Subtitle text at bottom
 * - Dark variant: Black background with white text
 * - Light variant: White background with black text
 * - Pressable for navigation
 *
 * @param {Object} props
 * @param {string} props.label - Top label text
 * @param {string} props.value - Main value to display (large text)
 * @param {string} props.subtitle - Bottom subtitle text
 * @param {boolean} props.isDark - Whether to use dark variant styling
 * @param {Function} props.onPress - Callback when card is pressed
 */
const StatCard = ({ label, value, subtitle, isDark = false, onPress }) => {
  const { theme } = useAppTheme();

  // Determine colors based on variant
  const backgroundColor = isDark ? theme.colors.night : theme.colors.white;
  const textColor = isDark ? theme.colors.white : theme.colors.night;
  const labelOpacity = isDark ? 0.8 : 1;
  const subtitleOpacity = isDark ? 0.7 : 1;
  const subtitleColor = isDark ? theme.colors.white : theme.colors.davysgrey;
  const borderWidth = isDark ? 0 : 1;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor,
          borderWidth,
          borderColor: theme.colors.night10,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      onPress={onPress}
    >
      {/* Top Row: Label and Chevron */}
      <View style={styles.topRow}>
        <Text
          style={[
            theme.typography.BodySmallMedium,
            {
              color: textColor,
              opacity: labelOpacity,
            },
          ]}
        >
          {label}
        </Text>
        <CustomIcon
          name="nav-arrow-right"
          width={20}
          height={20}
          tintColour={textColor}
          style={{ opacity: labelOpacity }}
        />
      </View>

      {/* Main Value */}
      <Text
        style={[
          theme.typography.heading1Bold,
          {
            color: textColor,
            marginTop: 12,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>

      {/* Subtitle */}
      <Text
        style={[
          theme.typography.BodySmallMedium,
          {
            color: subtitleColor,
            opacity: subtitleOpacity,
            marginTop: 4,
          },
        ]}
        numberOfLines={1}
      >
        {subtitle}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default StatCard;
