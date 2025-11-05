import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import StatCard from './components/StatCard';
import DealCard from './components/DealCard';
import { getLeadWithDealsById } from '../../../tabs/home/Leads/sampleDataWithDeals';

/**
 * LeadDetailsScreen
 *
 * Production-ready lead details screen matching the reference design exactly.
 * Displays comprehensive lead information including deals, totals, and activities.
 *
 * Features:
 * - Navigation header with back button
 * - Lead header card with avatar, company, contact, and icon
 * - Two stat cards side-by-side (total lead value and total commission)
 * - Deals section header with count badge and create button
 * - Scrollable list of deal cards with activity notes
 * - Calculated totals from deals array
 * - Theme integration throughout
 *
 * Layout Structure:
 * 1. Header (fixed): Back button + "Lead" title
 * 2. Lead Header Card: Avatar + Company + Contact + Icon
 * 3. Stats Cards Row: Total Value (dark) + Total Commission (light)
 * 4. Deals Section Header: Icon + Title + Count + Create Button
 * 5. Deal Cards List (scrollable): Individual deal cards with activities
 *
 * @param {Object} props
 * @param {Object} props.navigation - React Navigation navigation object
 * @param {Object} props.route - React Navigation route object with params
 */
const LeadDetailsScreen = ({ navigation, route }) => {
  const { theme } = useAppTheme();

  // Get lead data from navigation params or use sample data
  const leadId = route?.params?.leadId;
  const leadFromParams = route?.params?.lead;

  // Try to get full lead data with deals
  let leadData = leadFromParams;
  if (leadId && !leadFromParams?.deals) {
    leadData = getLeadWithDealsById(leadId);
  }

  // Fallback to sample data
  if (!leadData || !leadData.deals) {
    leadData = getSampleLeadData();
  }

  /**
   * Calculate total lead value from all deals
   * @param {Array} deals - Array of deal objects
   * @returns {number} Sum of all deal values
   */
  const calculateTotalValue = (deals) => {
    return deals.reduce((sum, deal) => sum + deal.totalValue, 0);
  };

  /**
   * Calculate total commission from all deals
   * Assumes 5.8% commission rate (can be customized per deal)
   * @param {number} totalValue - Total lead value
   * @returns {number} Total commission amount
   */
  const calculateTotalCommission = (totalValue) => {
    const commissionRate = 0.058; // 5.8%
    return totalValue * commissionRate;
  };

  /**
   * Format currency value
   * @param {number} value - Dollar amount
   * @returns {string} Formatted currency string (e.g., "$39,567.00")
   */
  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /**
   * Generate avatar initials from company name
   * Reuses logic from LeadCard component
   * @param {string} companyName - Company name
   * @returns {string} Two-letter initials
   */
  const getInitials = (companyName) => {
    if (!companyName) return 'LD';

    const words = companyName.trim().split(' ').filter(word => word.length > 0);

    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1) {
      return (words[0][0] + words[0][0]).toUpperCase();
    }

    return 'LD';
  };

  // Calculate totals
  const totalValue = calculateTotalValue(leadData.deals);
  const totalCommission = calculateTotalCommission(totalValue);
  const commissionPercentage = 5.8;

  // Generate initials
  const initials = getInitials(leadData.companyName);

  /**
   * Handle back button press
   */
  const handleBackPress = () => {
    navigation.goBack();
  };

  /**
   * Handle lead header icon press (copy link, share, etc.)
   */
  const handleLeadIconPress = () => {
    console.log('Lead header icon pressed - future: copy link or share');
  };

  /**
   * Handle stat card press
   * @param {string} statType - Type of stat ('value' or 'commission')
   */
  const handleStatCardPress = (statType) => {
    console.log(`Stat card pressed: ${statType} - future: navigate to filtered view`);
  };

  /**
   * Handle create new deal button press
   */
  const handleCreateDeal = () => {
    console.log('Create new deal pressed - future: navigate to create deal flow');
  };

  /**
   * Handle deal card press
   * @param {Object} deal - Deal object
   */
  const handleDealPress = (deal) => {
    console.log('Deal pressed:', deal.id, deal.name);
    // Future: navigation.navigate('DealDetails', { dealId: deal.id, deal });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.isabelline }]}
      edges={['top']}
    >
      {/* Navigation Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.isabelline,
            borderBottomColor: theme.colors.night10,
          },
        ]}
      >
        {/* Back Button */}
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor:theme.colors.white,
              borderColor: theme.colors.night10,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={handleBackPress}
        >
          <CustomIcon
            name="nav-arrow-left"
            width={20}
            height={20}
            tintColour={theme.colors.night}
          />
        </Pressable>

        {/* Title */}
        <Text
          style={[
            theme.typography.BodyLargeMedium,
            {
              color: theme.colors.night,
              marginLeft: 12,
            },
          ]}
        >
          Lead
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Lead Header Card */}
        <View
          style={[
            styles.leadHeaderCard,
            {
              // backgroundColor: theme.colors.white,
            },
          ]}
        >
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text
              style={[
                theme.typography.BodyLargeBold,
                {
                  color: theme.colors.night,
                },
              ]}
            >
              {initials}
            </Text>
          </View>

          {/* Company and Contact Info */}
          <View style={styles.leadInfo}>
            {/* Company Name */}
            <Text
              style={[
                theme.typography.heading2Medium,
                {
                  color: theme.colors.night,
                },
              ]}
              numberOfLines={1}
            >
              {leadData.companyName}
            </Text>

            {/* Contact Name */}
            <Text
              style={[
                theme.typography.BodyLargeMedium,
                {
                  color: theme.colors.davysgrey,
                  marginTop: 4,
                },
              ]}
              numberOfLines={1}
            >
              {leadData.contactName}
            </Text>
          </View>

          {/* Icon Button */}
          <Pressable
            style={({ pressed }) => [
              styles.leadIconButton,
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            onPress={handleLeadIconPress}
          >
            <CustomIcon
              name="attachment"
              width={24}
              height={24}
              tintColour={theme.colors.night}
            />
          </Pressable>
        </View>

        {/* Stats Cards Row */}
        <View style={styles.statsRow}>
          {/* Total Lead Value Card (Dark) */}
          <StatCard
            label="Total lead value"
            value={formatCurrency(totalValue)}
            subtitle={`From ${leadData.deals.length} deals`}
            isDark={true}
            onPress={() => handleStatCardPress('value')}
          />

          {/* Total Commission Card (Light) */}
          <StatCard
            label="Total commission"
            value={formatCurrency(totalCommission)}
            subtitle={`${commissionPercentage.toFixed(2)}% of ${formatCurrency(totalValue)}`}
            isDark={false}
            onPress={() => handleStatCardPress('commission')}
          />
        </View>

        {/* Deals Section Header */}
        <View style={styles.dealsHeader}>
          {/* Left: Icon + Title + Count Badge */}
          <View style={styles.dealsHeaderLeft}>
            <CustomIcon
              name="suitcase"
              width={24}
              height={24}
              tintColour={theme.colors.night}
            />
            <Text
              style={[
                theme.typography.heading2Medium,
                {
                  color: theme.colors.night,
                  marginLeft: 8,
                },
              ]}
            >
              Deals
            </Text>
            {/* Count Badge */}
            <View
              style={[
                styles.countBadge,
                {
                  backgroundColor: theme.colors.white,
                  borderColor:theme.colors.timberwolf
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
                {leadData.deals.length}
              </Text>
            </View>
          </View>

          {/* Right: Create New Deal Button */}
          <Pressable
            style={({ pressed }) => [
              styles.createDealButton,
              {
                // backgroundColor: theme.colors.white,
                borderColor: theme.colors.night,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={handleCreateDeal}
          >
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.night,
                },
              ]}
            >
              Create new deal
            </Text>
            <CustomIcon
              name="plus"
              width={16}
              height={16}
              tintColour={theme.colors.night}
              style={{ marginLeft: 6 }}
            />
          </Pressable>
        </View>

        {/* Deal Cards List */}
        <View style={styles.dealsListContainer}>
          {leadData.deals.map((deal) => (
            <DealCard
              key={deal.id}
              dealName={deal.name}
              productCount={deal.productCount}
              totalValue={deal.totalValue}
              lastActivity={deal.lastActivity}
              timestamp={deal.timestamp}
              onPress={() => handleDealPress(deal)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Sample Lead Data
 * Comprehensive sample data matching the reference image
 */
const getSampleLeadData = () => ({
  id: '1',
  companyName: 'CreativePixel Agency',
  contactName: 'John Smith',
  deals: [
    {
      id: 'd1',
      name: 'UX Team Skill Upgrade Program',
      productCount: 4,
      totalValue: 9800,
      lastActivity: 'Client called to confirm order details',
      timestamp: '9/29/2025 at 08:19 PM',
    },
    {
      id: 'd2',
      name: 'Design & Branding Program for Marketing Team',
      productCount: 3,
      totalValue: 7200,
      lastActivity: 'Client called to confirm order details',
      timestamp: '9/29/2025 at 08:19 PM',
    },
    {
      id: 'd3',
      name: 'Front-End Developer Bootcamp Package',
      productCount: 5,
      totalValue: 12400,
      lastActivity: 'Client called to confirm order details',
      timestamp: '9/29/2025 at 08:19 PM',
    },
    {
      id: 'd4',
      name: 'Project Management Certification Series',
      productCount: 1,
      totalValue: 8600,
      lastActivity: 'Client called to confirm order details',
      timestamp: '9/29/2025 at 08:19 PM',
    },
  ],
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  leadHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    // padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom:14,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 24,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leadInfo: {
    flex: 1,
    marginLeft: 12,
  },
  leadIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  dealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  dealsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  createDealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  dealsListContainer: {
    // No additional styling needed - DealCard handles its own margins
  },
});

export default LeadDetailsScreen;
