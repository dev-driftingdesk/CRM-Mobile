import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';

/**
 * TabBar Component
 *
 * Reusable pill-style tab switcher for content sections.
 *
 * Features:
 * - Pill-shaped tabs with rounded corners
 * - Selected state: Black background, white text, bold
 * - Unselected state: Transparent, gray text, medium weight
 * - Flexible tab configuration
 *
 * @param {Object} props
 * @param {Array<string>} props.tabs - Array of tab labels
 * @param {string} props.activeTab - Currently active tab label
 * @param {Function} props.onTabChange - Callback when tab is pressed (tabLabel)
 */
const TabBar = ({ tabs, activeTab, onTabChange }) => {
  const { theme } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <Pressable
            key={tab}
            style={({ pressed }) => [
              styles.tab,
              {
                backgroundColor: isActive
                  ? theme.colors.night
                  : 'transparent',
                opacity: pressed ? 0.7 : 1,
                borderWidth: isActive ? 0 : 1,
                borderColor: theme.colors.night10,
              },
            ]}
            onPress={() => onTabChange(tab)}
          >
            <Text
              style={[
                isActive ? theme.typography.BodySmallMedium : theme.typography.BodySmallMedium,
                {
                  color: isActive ? theme.colors.white : theme.colors.davysgrey,
                },
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20, // Pill shape
  },
});

export default TabBar;
