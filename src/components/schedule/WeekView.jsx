import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import CustomIcon from '../../assets/icons/CustomIcon';

/**
 * WeekView - Weekly calendar view with event indicators
 *
 * Features:
 * - Week header with "Month Week N" format and navigation
 * - Single row of 7 days (SUN-SAT)
 * - Day labels and date numbers
 * - Selected date highlighting with dark circular background
 * - Event indicators (green dots) for dates with schedules
 * - Week navigation (prev/next)
 *
 * @param {Object} props
 * @param {Date} props.currentWeek - Date object for current week
 * @param {string} props.selectedDate - Selected date key (YYYY-MM-DD)
 * @param {Object} props.eventsMap - Map of dateKey to events array
 * @param {Function} props.onDateSelect - Callback when date selected
 * @param {Function} props.onWeekChange - Callback for week navigation
 */
const WeekView = ({
  currentWeek,
  selectedDate,
  eventsMap = {},
  onDateSelect,
  onWeekChange,
}) => {
  const { theme } = useAppTheme();

  // Month names for display
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Day abbreviations
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  /**
   * Format date to YYYY-MM-DD
   * @param {Date} date - Date object
   * @returns {string} Formatted date key
   */
  function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get the start of the week (Sunday) for a given date
   * @param {Date} date - Any date
   * @returns {Date} Sunday of that week
   */
  function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /**
   * Calculate week number within the month
   * @param {Date} date - Date to calculate week for
   * @returns {number} Week number (1-5)
   */
  function getWeekOfMonth(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
  }

  /**
   * Generate array of 7 dates for the current week
   * @returns {Array} Array of date objects with day info
   */
  const generateWeekDates = () => {
    const weekStart = getWeekStart(currentWeek);
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateKey = formatDateKey(date);

      dates.push({
        date: date,
        day: date.getDate(),
        dateKey: dateKey,
        dayName: dayNames[i],
        hasEvents: eventsMap[dateKey]?.length > 0,
      });
    }

    return dates;
  };

  const weekDates = generateWeekDates();

  // Get the month name for the week header
  // Use the date that's in the middle of the week (Wednesday) to determine month
  const midWeekDate = weekDates[3]?.date || currentWeek;
  const monthName = monthNames[midWeekDate.getMonth()];
  const weekNumber = getWeekOfMonth(midWeekDate);

  // Format: "April Week 2"
  const weekTitle = `${monthName} Week ${weekNumber}`;

  /**
   * Handle previous week navigation
   */
  const handlePrevWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() - 7);
    onWeekChange(newWeek);
  };

  /**
   * Handle next week navigation
   */
  const handleNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + 7);
    onWeekChange(newWeek);
  };

  return (
    <View style={styles.container}>
      {/* Week Header with Navigation */}
      <View style={styles.header}>
        <Text style={[theme.typography.BodyLargeBold, { color: theme.colors.night }]}>
          {weekTitle}
        </Text>
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            onPress={handlePrevWeek}
            style={[
              styles.navButton,
              {
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.timberwolf,
              },
            ]}
            activeOpacity={0.7}
          >
            <CustomIcon
              name="nav-arrow-left"
              width={16}
              height={16}
              tintColour={theme.colors.night}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNextWeek}
            style={[
              styles.navButton,
              {
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.timberwolf,
              },
            ]}
            activeOpacity={0.7}
          >
            <CustomIcon
              name="nav-arrow-right"
              width={16}
              height={16}
              tintColour={theme.colors.night}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Week Days Row */}
      <View style={styles.weekRow}>
        {weekDates.map((dateInfo, index) => {
          const isSelected = dateInfo.dateKey === selectedDate;

          return (
            <TouchableOpacity
              key={dateInfo.dateKey}
              style={styles.dayColumn}
              onPress={() => onDateSelect(dateInfo.dateKey)}
              activeOpacity={0.7}
            >
              {/* Day Label (SUN, MON, etc.) */}
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  { color: theme.colors.davysgrey },
                ]}
              >
                {dateInfo.dayName}
              </Text>

              {/* Date Number with Selection State */}
              <View
                style={[
                  styles.dateCircle,
                  isSelected && {
                    backgroundColor: theme.colors.midnightgreen,
                  },
                ]}
              >
                <Text
                  style={[
                    theme.typography.BodyMedium,
                    {
                      color: isSelected ? theme.colors.white : theme.colors.night,
                      fontWeight: isSelected ? '600' : '500',
                    },
                  ]}
                >
                  {dateInfo.day}
                </Text>
              </View>

              {/* Event Indicator Dot */}
              {dateInfo.hasEvents && (
                <View
                  style={[
                    styles.eventDot,
                    {
                      backgroundColor: isSelected ? theme.colors.white : '#1BB476',
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 8,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
});

export default WeekView;
