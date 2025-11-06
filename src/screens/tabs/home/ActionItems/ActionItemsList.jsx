import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';

const ActionItemsList = ({ items = [], onShowAll, onItemPress }) => {
  const { theme } = useAppTheme();
  const [activeFilter, setActiveFilter] = useState('today');

  // Filter items based on active category
  const filteredItems = items.filter(item => item.category === activeFilter);

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

    // Build description based on type
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

  // Render filter pill
  const renderFilterPill = (label, value) => {
    const isActive = activeFilter === value;

    return (
      <TouchableOpacity
        key={value}
        style={[
          styles.filterPill,
          isActive ? styles.filterPillActive : styles.filterPillInactive,
          {
            borderRadius: theme.radius.radius10
          }
        ]}
        onPress={() => setActiveFilter(value)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            theme.typography.BodyMedium,
            isActive ? styles.filterTextActive : styles.filterTextInactive
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render action item card
  const renderActionItem = (item, index, total) => {
    const { prefix, contactName, description } = formatDescription(item);
    const truncatedDescription = description.length > 30
      ? description.substring(0, 30) + '...'
      : description;

    const isFirst = index === 0;
    const isLast = index === total - 1;
    
    return (
      <Pressable
        key={item.id}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.night10,
            opacity: pressed ? 0.8 : 1,

            // ✅ Apply conditional border radius
            borderTopLeftRadius: isFirst ? 24 : 0,
            borderTopRightRadius: isFirst ? 24 : 0,
            borderBottomLeftRadius: isLast ? 24 : 0,
            borderBottomRightRadius: isLast ? 24 : 0,
          },
        ]}
        onPress={() => onItemPress && onItemPress(item)}
      >

        <View style={[styles.cardContent, {
          borderTopLeftRadius: isFirst ? 24 : 0,
          borderTopRightRadius: isFirst ? 24 : 0,
          borderBottomLeftRadius: isLast ? 24 : 0,
          borderBottomRightRadius: isLast ? 24 : 0,
        }]}>
          {/* Task Description */}
          <View style={styles.descriptionContainer}>
            <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.night }]} numberOfLines={2}>
              {prefix}
              <Text style={[theme.typography.BodyBold, { color: theme.colors.night }]}>
                {contactName}
              </Text>
              {' - '}
              {truncatedDescription}
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
                  borderRadius: theme.radius.radius10,
                }
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[theme.typography.heading2Medium, { color: theme.colors.night }]}>
          Action items
        </Text>
        <TouchableOpacity
          style={[styles.showAllButton, { borderColor: theme.colors.night }]}
          onPress={onShowAll}
          activeOpacity={0.7}
        >
          <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
            Show all
          </Text>
          <CustomIcon
            name="nav-arrow-right"
            width={16}
            height={16}
            tintColour={theme.colors.night}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      <View style={[styles.filterContainer]}>
        {renderFilterPill('Today', 'today')}
        {renderFilterPill('Overdue', 'overdue')}
        {renderFilterPill('Upcoming', 'upcoming')}
      </View>

      {/* Action Items List */}
      <View>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => renderActionItem(item, index, filteredItems.length))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[theme.typography.BodyMedium, { color: theme.colors.davysgrey }]}>
              No {activeFilter} action items
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  showAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chevronIcon: {
    marginLeft: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    // height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  filterPillActive: {
    backgroundColor: '#0F1010', // theme.colors.night
  },
  filterPillInactive: {
    backgroundColor: 'transparent', // theme.colors.white
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterTextInactive: {
    color: '#0F1010',
  },
  card: {
    padding: 16,
    elevation: 2,
    borderWidth: 1,
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
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActionItemsList;
