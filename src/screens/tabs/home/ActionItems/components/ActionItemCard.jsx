import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';

/**
 * ActionItemCard Component
 *
 * Reusable card component for displaying individual action items.
 * Used in AllActionItemsScreen with stacked card styling.
 *
 * @param {Object} props
 * @param {Object} props.item - Action item data
 * @param {string} props.item.id - Unique identifier
 * @param {string} props.item.type - Type of action (call, proposal, follow-up, schedule)
 * @param {string} props.item.contactName - Contact name (displayed in bold)
 * @param {string} props.item.description - Task description
 * @param {string} props.item.time - Time in format "HH:MMAM/PM"
 * @param {string} props.item.priority - Priority level (Critical, High, Low)
 * @param {boolean} props.isFirst - Whether this is the first card in the list
 * @param {boolean} props.isLast - Whether this is the last card in the list
 * @param {Function} props.onPress - Callback when card is pressed
 */
const ActionItemCard = ({ item, onPress, isFirst = false, isLast = false }) => {
  const { theme } = useAppTheme();

  // Priority badge colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return '#FF6B6B'; // Coral/Red
      case 'High':
        return '#FFA500'; // Orange
      case 'Low':
        return '#4ECB71'; // Green
      default:
        return theme.colors.davysgrey;
    }
  };

  // Format task description with bold contact name
  const formatDescription = (item) => {
    const { type, contactName, description } = item;

    // Build prefix based on type
    let prefix = '';
    switch (type) {
      case 'call':
        prefix = 'Call ';
        break;
      case 'proposal':
        prefix = 'Send proposal to ';
        break;
      case 'follow-up':
        prefix = 'Follow back with ';
        break;
      case 'schedule':
        prefix = 'Schedule call with ';
        break;
      default:
        prefix = '';
    }

    return { prefix, contactName, description };
  };

  const { prefix, contactName, description } = formatDescription(item);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.night10,
          opacity: pressed ? 0.8 : 1,
          // Apply conditional border radius for stacked effect
          borderTopLeftRadius: isFirst ? 24 : 0,
          borderTopRightRadius: isFirst ? 24 : 0,
          borderBottomLeftRadius: isLast ? 24 : 0,
          borderBottomRightRadius: isLast ? 24 : 0,
        },
      ]}
      onPress={() => onPress && onPress(item)}
    >
      <View style={styles.cardContent}>
        {/* Task Description */}
        <View style={styles.descriptionContainer}>
          <Text
            style={[theme.typography.BodyMedium, { color: theme.colors.night }]}
            numberOfLines={2}
          >
            {prefix}
            <Text style={[theme.typography.BodyBold, { color: theme.colors.night }]}>
              {contactName}
            </Text>
            {description ? ` – ${description}` : ''}
          </Text>
        </View>

        {/* Time and Priority Row */}
        <View style={styles.metaRow}>
          <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.davysgrey }]}>
            {item.time}
          </Text>

          <View
            style={[
              styles.priorityBadge,
              {
                backgroundColor: getPriorityColor(item.priority),
                borderRadius: theme.radius.radius3,
              },
            ]}
          >
            <Text style={[theme.typography.BodySmallBold, { color: theme.colors.white }]}>
              {item.priority}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  cardContent: {
    gap: 12,
  },
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default ActionItemCard;
