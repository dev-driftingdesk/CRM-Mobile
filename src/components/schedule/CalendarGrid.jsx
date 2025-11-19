import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import CustomIcon from '../../assets/icons/CustomIcon';

/**
 * CalendarGrid - Monthly calendar view with event indicators
 *
 * Features:
 * - Month/year header with navigation
 * - Days of week header (SUN-SAT)
 * - Date grid with event indicators
 * - Selected date highlighting
 * - Today highlighting
 * - Event dots for dates with schedules
 *
 * @param {Object} props
 * @param {Date} props.currentMonth - Current month being displayed
 * @param {string} props.selectedDate - Selected date key (YYYY-MM-DD)
 * @param {Object} props.eventsMap - Map of dateKey to events array
 * @param {Function} props.onDateSelect - Callback when date selected
 * @param {Function} props.onMonthChange - Callback for month navigation
 */
const CalendarGrid = ({
  currentMonth,
  selectedDate,
  eventsMap = {},
  onDateSelect,
  onMonthChange,
}) => {
  const { theme } = useAppTheme();

  // Get today's date key
  const today = new Date();
  const todayKey = formatDateKey(today);

  // Format date to YYYY-MM-DD
  function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Get month/year display text
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
  const monthYear = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  // Generate calendar grid
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get first day of month (0 = Sunday, 6 = Saturday)
    const firstDay = new Date(year, month, 1).getDay();

    const grid = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      grid.push(null);
    }

    // Add date cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      grid.push({
        day,
        dateKey,
        hasEvents: eventsMap[dateKey]?.length > 0,
      });
    }

    return grid;
  };

  const calendarGrid = generateCalendar();

  // Handle previous month
  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    onMonthChange(newMonth);
  };

  // Handle next month
  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    onMonthChange(newMonth);
  };

  return (
    <View style={styles.container}>
      {/* Month/Year Header with Navigation */}
      <View style={styles.header}>
        <Text style={[theme.typography.BodyLargeBold, { color: theme.colors.night, }]}>
          {monthYear}
        </Text>
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            onPress={handlePrevMonth}
            style={[styles.navButton, { backgroundColor: theme.colors.white, borderColor:theme.colors.timberwolf }]}
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
            onPress={handleNextMonth}
            style={[styles.navButton, { backgroundColor: theme.colors.white, borderColor:theme.colors.timberwolf }]}
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

      {/* Days of Week Header */}
      <View style={styles.daysHeader}>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => (
          <View key={index} style={styles.dayHeaderCell}>
            <Text
              style={[
                theme.typography.BodySmallMedium,
                { color: theme.colors.davysgrey },
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {calendarGrid.map((cell, index) => {
          if (!cell) {
            // Empty cell
            return <View key={`empty-${index}`} style={styles.dateCell} />;
          }

          const isSelected = cell.dateKey === selectedDate;
          const isToday = cell.dateKey === todayKey;

          return (
            <TouchableOpacity
              key={cell.dateKey}
              style={styles.dateCell}
              onPress={() => onDateSelect(cell.dateKey)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.dateCellContent,
                  isSelected && {
                    backgroundColor: theme.colors.midnightgreen,
                    borderRadius: 8,
                  },
                  isToday &&
                    !isSelected && {
                      borderWidth: 1.5,
                      borderColor: theme.colors.night,
                      borderRadius: 8,
                    },
                ]}
              >
                <Text
                  style={[
                    theme.typography.BodyMedium,
                    {
                      color: isSelected ? theme.colors.white : theme.colors.night,
                    },
                  ]}
                >
                  {cell.day}
                </Text>
                {cell.hasEvents && (
                  <View
                    style={[
                      styles.eventDot,
                      { backgroundColor: isSelected ? theme.colors.white : "#1BB476" },
                    ]}
                  />
                )}
              </View>
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
  daysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeaderCell: {
    flex: 1,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 2,
  },
  dateCellContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 100,
  },
});

export default CalendarGrid;
