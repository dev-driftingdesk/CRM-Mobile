import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../context/ThemeContext';
import CalendarGrid from '../../../components/schedule/CalendarGrid';
import ScheduleItemCard from '../../../components/schedule/ScheduleItemCard';
import {
  sampleScheduleItems,
  generateEventsMap,
  getScheduleItemsForDate,
  formatDateDisplay,
} from '../../../data/scheduleData';

/**
 * ScheduleHomepage - Schedule Tab Screen
 *
 * Production-ready schedule screen matching reference design.
 *
 * Features:
 * - Page title "Schedule"
 * - View mode pills (Month/Week/Overview)
 * - Month selector button
 * - Calendar grid with event indicators
 * - Selected date highlighting
 * - Today highlighting
 * - Schedule items list for selected date
 * - Different card types (Lead call, Internal meeting, Reminder)
 * - Theme integration throughout
 *
 * Layout:
 * - Title, view pills, and calendar are at top
 * - Schedule items list scrolls below
 * - Matches reference image exactly
 */
const ScheduleHomepage = ({ navigation }) => {
  const { theme } = useAppTheme();

  // View mode state: 'Month', 'Week', 'Overview'
  const [viewMode, setViewMode] = useState('Month');

  // Current month being displayed in calendar
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3, 1)); // April 2025

  // Selected date (YYYY-MM-DD format)
  const [selectedDate, setSelectedDate] = useState('2025-04-09');

  // Generate events map for calendar
  const eventsMap = generateEventsMap(sampleScheduleItems);

  // Get schedule items for selected date
  const scheduleItems = getScheduleItemsForDate(sampleScheduleItems, selectedDate);

  // Format selected date for display
  const selectedDateDisplay = formatDateDisplay(selectedDate);

  // Format date as "Apr 9" for month selector button
  const formatShortDate = (dateKey) => {
    const date = new Date(dateKey);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const shortDateDisplay = formatShortDate(selectedDate);

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Handle date selection
  const handleDateSelect = (dateKey) => {
    setSelectedDate(dateKey);
  };

  // Handle month change
  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  // Handle schedule item press
  const handleScheduleItemPress = (item) => {
    console.log('Schedule item pressed:', item);
    // TODO: Navigate to schedule item details
  };

  // Format date as MM/DD/YY for cards
  const formatCardDate = (dateKey) => {
    const [year, month, day] = dateKey.split('-');
    return `${month}/${day}/${year.slice(2)}`;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.isabelline }]}
      edges={['top']}
    >
      {/* Fixed Header Section */}
      <View style={styles.headerSection}>
        {/* Page Title */}
        <View style={styles.titleContainer}>
          <Text
            style={[
              theme.typography.heading1Medium,
              { color: theme.colors.night, fontSize: 32 },
            ]}
          >
            Schedule
          </Text>
        </View>

        {/* View Mode Pills Row */}
        <View style={styles.viewModeRow}>
          {/* View Mode Pills */}
          <View style={styles.viewModePills}>
            {['Month', 'Week', 'Overview'].map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => handleViewModeChange(mode)}
                style={[
                  styles.pill,
                  viewMode === mode
                    ? { backgroundColor: theme.colors.night }
                    : {
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: theme.colors.night10,
                      },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    theme.typography.BodyMedium,
                    {
                      color:
                        viewMode === mode
                          ? theme.colors.white
                          : theme.colors.davysgrey,
                      fontFamily:
                        viewMode === mode
                          ? theme.fonts.bold
                          : theme.fonts.medium,
                    },
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Month Selector Button */}
          <TouchableOpacity
            style={[
              styles.monthSelector,
              {
                borderWidth: 1,
                borderColor: theme.colors.davysgrey,
              },
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.night },
              ]}
            >
              {shortDateDisplay}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        {viewMode === 'Month' && (
          <CalendarGrid
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            eventsMap={eventsMap}
            onDateSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
          />
        )}

        {/* Selected Date Display */}
        <View style={styles.selectedDateContainer}>
          <Text
            style={[
              theme.typography.BodyMedium,
              { color: theme.colors.night },
            ]}
          >
            {selectedDateDisplay}
          </Text>
        </View>
      </View>

      {/* Scrollable Schedule Items List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {scheduleItems.length > 0 ? (
          scheduleItems.map((item) => (
            <ScheduleItemCard
              key={item.id}
              time={item.time}
              date={formatCardDate(item.date)}
              type={item.type}
              title={item.title}
              deal={item.deal}
              contact={item.contact}
              onPress={() => handleScheduleItemPress(item)}
            />
          ))
        ) : (
          // Empty State
          <View style={styles.emptyState}>
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.davysgrey, textAlign: 'center' },
              ]}
            >
              No schedule items for this date
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    // Fixed header with title, pills, calendar
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  viewModeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  viewModePills: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthSelector: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScheduleHomepage;
