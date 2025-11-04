import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';

const LeadsList = ({ leads = [], onShowAll, onLeadPress }) => {
  const { theme } = useAppTheme();

  const getInitials = (companyName) => {
    if (!companyName) return 'LD'; // Lead Default

    const words = companyName.trim().split(' ').filter(word => word.length > 0);

    if (words.length >= 2) {
      // Take first letter of first two words
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      // Take first two letters of single word
      return words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1) {
      // Single character company name (rare case)
      return (words[0][0] + words[0][0]).toUpperCase();
    }

    return 'LD'; // Fallback
  };

  /**
   * Render individual lead card
   * Applies conditional border radius for first/last cards (stacked effect)
   */
  const renderLeadCard = (lead, index, total) => {
    const isFirst = index === 0;
    const isLast = index === total - 1;
    const initials = getInitials(lead.companyName);

    return (
      <Pressable
        key={lead.id}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.night10,
            opacity: pressed ? 0.8 : 1,
            // ✅ Apply conditional border radius for stacked effect
            borderTopLeftRadius: isFirst ? 24 : 0,
            borderTopRightRadius: isFirst ? 24 : 0,
            borderBottomLeftRadius: isLast ? 24 : 0,
            borderBottomRightRadius: isLast ? 24 : 0,
          },
        ]}
        onPress={() => onLeadPress && onLeadPress(lead)}
      >
        <View style={styles.cardContent}>
          {/* Avatar Circle with Initials */}
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: '#E8E8E8', // Light gray background
              }
            ]}
          >
            <Text style={[theme.typography.BodyLargeBold, { color: theme.colors.night }]}>
              {initials}
            </Text>
          </View>

          {/* Company and Contact Info */}
          <View style={styles.infoContainer}>
            <Text
              style={[theme.typography.BodyLargeBold, { color: theme.colors.night }]}
              numberOfLines={1}
            >
              {lead.companyName}
            </Text>
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.davysgrey, marginTop: 4 }
              ]}
              numberOfLines={1}
            >
              {lead.contactName}
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
                  { color: theme.colors.davysgrey, marginLeft: 6 }
                ]}
              >
                {lead.dealCount} {lead.dealCount === 1 ? 'Deal' : 'Deals'}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with "Show all" button */}
      <View style={styles.header}>
        <Text style={[theme.typography.heading2Medium, { color: theme.colors.night }]}>
          Leads
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.showAllButton,
            {
              borderColor: theme.colors.night,
              opacity: pressed ? 0.7 : 1,
            }
          ]}
          onPress={onShowAll}
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
        </Pressable>
      </View>

      {/* Leads List - Stacked Cards */}
      <View style={styles.listContainer}>
        {leads.length > 0 ? (
          leads.map((lead, index) => renderLeadCard(lead, index, leads.length))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[theme.typography.BodyMedium, { color: theme.colors.davysgrey }]}>
              No leads available
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
  },
  chevronIcon: {
    marginLeft: 4,
  },
  listContainer: {
    // No gap - cards are stacked without space
  },
  card: {
    padding: 16,
    borderWidth: 1,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(15,16,16,0.1)',
  },
});

export default LeadsList;
