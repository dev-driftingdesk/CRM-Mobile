import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import CustomIcon from '../../assets/icons/CustomIcon';

/**
 * ScheduleItemCard - Schedule item display card
 *
 * Displays schedule items with:
 * - Time and date
 * - Type badge (Lead call, Internal meeting, Reminder)
 * - Title
 * - Optional deal section with value
 * - Optional contact section
 *
 * @param {Object} props
 * @param {string} props.time - Time (e.g., "9:00 PM")
 * @param {string} props.date - Date (e.g., "09/04/25")
 * @param {string} props.type - Type: 'Lead call' | 'Internal meeting' | 'Reminder'
 * @param {string} props.title - Item title
 * @param {Object} props.deal - Deal information (optional)
 * @param {string} props.deal.name - Deal name
 * @param {number} props.deal.productCount - Number of products
 * @param {number} props.deal.value - Deal value
 * @param {Object} props.contact - Contact information (optional)
 * @param {string} props.contact.name - Contact name
 * @param {string} props.contact.phone - Contact phone
 * @param {Function} props.onPress - Callback when card pressed
 */
const ScheduleItemCard = ({ time, date, type, title, deal, contact, onPress }) => {
  const { theme } = useAppTheme();

  // Get badge color based on type
  const getBadgeColor = () => {
    switch (type) {
      case 'Lead call':
        return theme.colors.midnightgreen;
      case 'Internal meeting':
        return theme.colors.midnightgreen;
      case 'Reminder':
        return theme.colors.midnightgreen;
      default:
        return theme.colors.midnightgreen;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.white }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left Column: Time + Date */}
      <View style={styles.timeColumn}>
        <Text style={[theme.typography.BodyLargeBold, { color: theme.colors.night }]}>
          {time}
        </Text>
        <Text
          style={[
            theme.typography.BodySmallMedium,
            { color: theme.colors.davysgrey, marginTop: 8 },
          ]}
        >
          {date}
        </Text>
      </View>

      {/* Right Column: Content */}
      <View style={styles.contentColumn}>
        {/* Type Badge */}
        <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
          <Text
            style={[
              theme.typography.BodySmallMedium,
              { color: theme.colors.white },
            ]}
          >
            {type}
          </Text>
        </View>

        {/* Title */}
        <Text
          style={[
            theme.typography.BodyLargeMedium,
            { color: theme.colors.night, marginTop: 8 },
          ]}
        >
          {title}
        </Text>

        {/* Deal Section */}
        {deal && (
          <View style={styles.dealSection}>
            <View style={styles.dealInfo}>
              <CustomIcon
                name="suitcase"
                width={14}
                height={14}
                tintColour={theme.colors.davysgrey}
              />
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  { color: theme.colors.davysgrey, marginLeft: 6, flex: 1 },
                ]}
              >
                {deal.name}
              </Text>
            </View>
            <View style={styles.dealBottomRow}>
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  { color: theme.colors.davysgrey },
                ]}
              >
                {deal.productCount} products
              </Text>
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  { color: theme.colors.midnightgreen },
                ]}
              >
                ${deal.value.toLocaleString()}
              </Text>
            </View>
          </View>
        )}

        {/* Contact Section */}
        {contact && (
          <View style={styles.contactSection}>
            <View style={styles.contactInfo}>
              <CustomIcon
                name="user"
                width={14}
                height={14}
                tintColour={theme.colors.davysgrey}
              />
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  { color: theme.colors.davysgrey, marginLeft: 6 },
                ]}
              >
                {contact.name}
              </Text>
            </View>
            <Text
              style={[
                theme.typography.BodySmallMedium,
                { color: theme.colors.davysgrey, marginTop: 4 },
              ]}
            >
              {contact.phone}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(223,216,215,0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  timeColumn: {
    width: 90,
    paddingRight: 16,
  },
  contentColumn: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  dealSection: {
    marginTop: 8,
  },
  dealInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  dealBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  contactSection: {
    marginTop: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ScheduleItemCard;
