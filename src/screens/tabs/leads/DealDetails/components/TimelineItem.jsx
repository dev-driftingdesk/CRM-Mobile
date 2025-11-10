import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';

/**
 * TimelineItem Component
 *
 * Individual activity timeline item with circle, vertical line, and status badge.
 *
 * Features:
 * - Empty circle indicator (24x24px)
 * - Vertical connecting line (hidden for last item)
 * - Activity description
 * - Timestamp and duration on same row
 * - Colored status badge
 *
 * @param {Object} props
 * @param {string} props.activity - Activity description text
 * @param {string} props.timestamp - Timestamp of activity
 * @param {string} props.duration - Duration text (e.g., "15 min")
 * @param {string} props.status - Status text for badge (e.g., "confirmed")
 * @param {boolean} props.isLast - Whether this is the last item (no line below)
 */
const TimelineItem = ({
  activity,
  timestamp,
  duration,
  status,
  isLast = false,
}) => {
  const { theme } = useAppTheme();

  /**
   * Get badge color based on status
   * @param {string} status - Status text
   * @returns {string} Background color
   */
  const getBadgeColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    switch (statusLower) {
      case 'confirmed':
      case 'approved':
        return '#FFA500'; // Orange
      case 'pending':
        return '#FFD700'; // Yellow-orange
      case 'sent':
        return '#FFA500'; // Orange
      default:
        return '#FFA500'; // Default orange
    }
  };

  return (
    <View style={styles.container}>
      {/* Left: Circle and Line */}
      <View style={styles.leftColumn}>
        {/* Circle */}
        <View
          style={[
            styles.circle,
            {
              borderColor: theme.colors.davysgrey,
            },
          ]}
        />
        {/* Vertical Line (hidden for last item) */}
        {!isLast && (
          <View
            style={[
              styles.verticalLine,
              {
                backgroundColor: theme.colors.davysgrey,
              },
            ]}
          />
        )}
      </View>

      {/* Right: Content */}
      <View style={styles.rightColumn}>
        {/* Activity Text */}
        <Text
          style={[
            theme.typography.BodyMedium,
            {
              color: theme.colors.night,
              lineHeight: 20,
            },
          ]}
        >
          {activity}
        </Text>

        {/* Timestamp and Duration Row */}
        <View style={styles.metaRow}>
          {/* Timestamp */}
          <Text
            style={[
              theme.typography.BodySmallMedium,
              {
                color: theme.colors.davysgrey,
                flex: 1,
              },
            ]}
          >
            {timestamp}
          </Text>

          {/* Duration */}
          {duration && (
            <Text
              style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.davysgrey,
                },
              ]}
            >
              {duration}
            </Text>
          )}
        </View>

        {/* Status Badge */}
        {status && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: getBadgeColor(status),
              },
            ]}
          >
            <Text
              style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.night,
                },
              ]}
            >
              {status}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftColumn: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  verticalLine: {
    width: 1,
    flex: 1,
    marginTop: 4,
  },
  rightColumn: {
    flex: 1,
    paddingTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default TimelineItem;
