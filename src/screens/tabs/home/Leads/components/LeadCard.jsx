import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * LeadCard Component
 *
 * Reusable lead card component for displaying individual lead information.
 * Supports stacked card design with conditional border radius based on position.
 *
 * Features:
 * - Avatar circle with company initials
 * - Company name (bold)
 * - Contact person name (gray)
 * - Deal count with briefcase icon
 * - Pressable with touch feedback
 * - Conditional border radius for first/last cards (stacked effect)
 *
 * @param {Object} props
 * @param {Object} props.lead - Lead data object
 * @param {string} props.lead.id - Unique lead identifier
 * @param {string} props.lead.company - Company name (used for avatar initials)
 * @param {string} props.lead.leadName - Contact person name
 * @param {string} props.lead.dealId - Deal ID (presence indicates a deal exists)
 * @param {Function} props.onPress - Callback when card is pressed
 * @param {boolean} props.isFirst - Whether this is the first card (for border radius)
 * @param {boolean} props.isLast - Whether this is the last card (for border radius)
 */
const LeadCard = ({ lead, onPress, isFirst = false, isLast = false }) => {
  console.log('Rendering LeadCard for:', lead);
  const { theme } = useAppTheme();

  /**
   * Generate avatar initials from company name
   * - Two words: First letter of each word (e.g., "Creative Pixel" → "CP")
   * - One word (2+ chars): First two letters (e.g., "Microsoft" → "MI")
   * - Fallback: "LD" for Lead Default
   */
  const getInitials = companyName => {
    if (!companyName) return 'LD';

    const words = companyName
      .trim()
      .split(' ')
      .filter(word => word.length > 0);

    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1) {
      return (words[0][0] + words[0][0]).toUpperCase();
    }

    return 'LD';
  };

  const initials = getInitials(lead.company);
  const dealCount = lead.dealId ? 1 : 0;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.night10,
          opacity: pressed ? 0.8 : 1,
          // Conditional border radius for stacked effect
          borderTopLeftRadius: isFirst ? 24 : 0,
          borderTopRightRadius: isFirst ? 24 : 0,
          borderBottomLeftRadius: isLast ? 24 : 0,
          borderBottomRightRadius: isLast ? 24 : 0,
        },
      ]}
      onPress={() => onPress && onPress(lead)}
    >
      <View style={styles.cardContent}>
        {/* Avatar Circle with Initials */}
        <View style={styles.avatar}>
          <Text
            style={[
              theme.typography.BodyLargeBold,
              { color: theme.colors.night },
            ]}
          >
            {initials}
          </Text>
        </View>

        {/* Company and Contact Info */}
        <View style={styles.infoContainer}>
          {/* Company Name */}
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              { color: theme.colors.night },
            ]}
            numberOfLines={1}
          >
            {lead.company}
          </Text>

          {/* Contact Name */}
          <Text
            style={[
              theme.typography.BodySmallMedium,
              {
                color: theme.colors.davysgrey,
                marginTop: 4,
              },
            ]}
            numberOfLines={1}
          >
            {lead.leadName}
          </Text>

          {/* Deal Count with Briefcase Icon */}
          <View style={styles.dealCountContainer}>
            <CustomIcon
              name="suitcase"
              width={16}
              height={16}
              tintColour={theme.colors.davysgrey}
            />
            <Text
              style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.davysgrey,
                  marginLeft: 6,
                },
              ]}
            >
              {dealCount} {dealCount === 1 ? 'Deal' : 'Deals'}
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
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  dealCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default LeadCard;
