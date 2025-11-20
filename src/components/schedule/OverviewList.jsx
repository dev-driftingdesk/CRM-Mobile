import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';

/**
 * OverviewList - Chronological list view of all schedule items
 *
 * Displays schedule items grouped by month with day/date column
 * on the left and event cards on the right.
 *
 * Features:
 * - Items grouped by month (April, May, etc.)
 * - Date column shows day abbreviation (THU, TUE) and date number (01, 02)
 * - Event cards with title and time
 * - Multiple events stack under same date
 * - Smooth scrolling with SectionList
 *
 * @param {Object} props
 * @param {Array} props.scheduleItems - Array of all schedule items
 * @param {Function} props.onItemPress - Callback when item pressed
 */
const OverviewList = ({ scheduleItems, onItemPress }) => {
  const { theme } = useAppTheme();

  /**
   * Get day abbreviation from date key
   * @param {string} dateKey - Date in YYYY-MM-DD format
   * @returns {string} Day abbreviation (SUN, MON, TUE, etc.)
   */
  const getDayAbbreviation = (dateKey) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const date = new Date(dateKey);
    return days[date.getDay()];
  };

  /**
   * Get day number from date key
   * @param {string} dateKey - Date in YYYY-MM-DD format
   * @returns {string} Zero-padded day number (01, 02, etc.)
   */
  const getDayNumber = (dateKey) => {
    const date = new Date(dateKey);
    return String(date.getDate()).padStart(2, '0');
  };

  /**
   * Get month name from date key
   * @param {string} dateKey - Date in YYYY-MM-DD format
   * @returns {string} Full month name (April, May, etc.)
   */
  const getMonthName = (dateKey) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const date = new Date(dateKey);
    return monthNames[date.getMonth()];
  };

  /**
   * Convert time string to minutes for sorting
   * @param {string} timeStr - Time string (e.g., "9:00 PM")
   * @returns {number} Total minutes from midnight
   */
  const convertTimeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let totalHours = hours;
    if (period === 'PM' && hours !== 12) {
      totalHours += 12;
    } else if (period === 'AM' && hours === 12) {
      totalHours = 0;
    }

    return totalHours * 60 + minutes;
  };

  /**
   * Process and group schedule items for SectionList
   * Groups items by month, then by date within each month
   * @returns {Array} Sections array for SectionList
   */
  const processScheduleData = () => {
    // Sort items by date and time
    const sortedItems = [...scheduleItems].sort((a, b) => {
      // First sort by date
      if (a.date !== b.date) {
        return new Date(a.date) - new Date(b.date);
      }
      // Then sort by time
      return convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time);
    });

    // Group by month
    const monthGroups = {};
    sortedItems.forEach((item) => {
      const monthKey = item.date.substring(0, 7); // YYYY-MM
      const monthName = getMonthName(item.date);

      if (!monthGroups[monthKey]) {
        monthGroups[monthKey] = {
          title: monthName,
          data: [],
        };
      }
      monthGroups[monthKey].data.push(item);
    });

    // Process each month's data to handle multiple items per date
    const sections = Object.values(monthGroups).map((month) => {
      const processedData = [];
      let currentDate = null;

      month.data.forEach((item, index) => {
        const isFirstOfDate = item.date !== currentDate;
        currentDate = item.date;

        processedData.push({
          ...item,
          isFirstOfDate,
          dayAbbreviation: getDayAbbreviation(item.date),
          dayNumber: getDayNumber(item.date),
        });
      });

      return {
        title: month.title,
        data: processedData,
      };
    });

    return sections;
  };

  const sections = processScheduleData();

  /**
   * Render month section header
   */
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text
        style={[
          theme.typography.BodyLargeMedium,
          { color: theme.colors.davysgrey },
        ]}
      >
        {title}
      </Text>
    </View>
  );

  /**
   * Render individual schedule item row
   */
  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      {/* Date Column - Only show for first item of each date */}
      <View style={styles.dateColumn}>
        {item.isFirstOfDate ? (
          <>
            <Text
              style={[
                styles.dayAbbreviation,
                { color: theme.colors.davysgrey },
              ]}
            >
              {item.dayAbbreviation}
            </Text>
            <Text
              style={[
                styles.dayNumber,
                theme.typography.BodyLargeMedium,
                { color: theme.colors.night },
              ]}
            >
              {item.dayNumber}
            </Text>
          </>
        ) : null}
      </View>

      {/* Event Card */}
      <TouchableOpacity
        style={[
          styles.eventCard,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.timberwolf,
          },
        ]}
        onPress={() => onItemPress?.(item)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            theme.typography.BodyMedium,
            styles.eventTitle,
            { color: theme.colors.night },
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[
            theme.typography.BodySmallMedium,
            styles.eventTime,
            { color: theme.colors.davysgrey },
          ]}
        >
          {item.time}
        </Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Render empty state when no items
   */
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text
        style={[
          theme.typography.BodyMedium,
          { color: theme.colors.davysgrey, textAlign: 'center' },
        ]}
      >
        No scheduled items
      </Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      ListEmptyComponent={renderEmptyState}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={styles.listContent}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dateColumn: {
    width: 50,
    paddingTop: 16,
    alignItems: 'flex-start',
  },
  dayAbbreviation: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    lineHeight: 14,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 2,
  },
  eventCard: {
    flex: 1,
    marginLeft: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  eventTitle: {
    marginBottom: 6,
  },
  eventTime: {
    // Inherits from typography
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OverviewList;
