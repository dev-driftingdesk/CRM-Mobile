import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import LeadCard from './components/LeadCard';

const LeadsList = ({ leads = [], onShowAll, onLeadPress }) => {
  const { theme } = useAppTheme();

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
          leads.map((lead, index) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onPress={onLeadPress}
              isFirst={index === 0}
              isLast={index === leads.length - 1}
            />
          ))
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
    // Cards are stacked without gaps
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
