import React, { useState } from 'react';
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
import TeamAvatars from './components/TeamAvatars';
import TimelineItem from './components/TimelineItem';
import TabBar from './components/TabBar';

/**
 * DealDetailsScreen
 *
 * Production-ready deal details screen matching the reference design exactly.
 * Displays comprehensive deal information including value, commission, lead, talking points, and activity timeline.
 *
 * Features:
 * - Navigation header with back and more buttons
 * - Deal name and product count
 * - Deal value with team avatars
 * - Commission section with breakdown link
 * - Lead section card (pressable)
 * - Talking points with dictate button
 * - Tab bar for switching content (Activity timeline / Lead information / Notes)
 * - Activity timeline with status badges
 * - Bottom action buttons (Call / Message / More)
 *
 * Layout Structure:
 * 1. Header: Back button + "Deal" title + More button
 * 2. Deal Name + Product Count
 * 3. Deal Value + Team Avatars
 * 4. Commission + See Breakdown Link
 * 5. Lead Section Card (pressable)
 * 6. Talking Points Section
 * 7. Tab Bar (3 tabs)
 * 8. Active Tab Content (Activity Timeline / Lead Information / Notes)
 * 9. Bottom Action Buttons (fixed)
 *
 * @param {Object} props
 * @param {Object} props.navigation - React Navigation navigation object
 * @param {Object} props.route - React Navigation route object with params
 */
const DealDetailsScreen = ({ navigation, route }) => {
  const { theme } = useAppTheme();

  // Tab state
  const [activeTab, setActiveTab] = useState('Activity timeline');
  const tabs = ['Activity timeline', 'Lead information', 'Notes'];

  // Get deal data from navigation params or use sample data
  const dealFromParams = route?.params?.deal;
  const dealData = dealFromParams || getSampleDealData();

  // Debug logging
  console.log('=== DealDetailsScreen Debug ===');
  console.log('Deal from params:', dealFromParams ? 'Yes' : 'No - using sample data');
  console.log('Deal name:', dealData?.name);
  console.log('Total value:', dealData?.totalValue);
  console.log('Commission:', dealData?.commission);
  console.log('Sales reps:', dealData?.salesReps?.length || 0);
  console.log('Talking points:', dealData?.talkingPoints ? 'Yes' : 'Missing');
  console.log('Activity timeline:', dealData?.activityTimeline?.length || 0);
  console.log('Full deal data:', JSON.stringify(dealData, null, 2));

  /**
   * Format currency value
   * @param {number} value - Dollar amount
   * @returns {string} Formatted currency string (e.g., "$39,567.00")
   */
  const formatCurrency = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '$0.00';
    }
    return `$${Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /**
   * Generate avatar initials from company name
   */
  const getInitials = (companyName) => {
    if (!companyName) return 'LD';
    const words = companyName.trim().split(' ').filter(word => word.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return companyName.substring(0, 2).toUpperCase();
  };

  const leadInitials = getInitials(dealData.leadCompany);

  // Event Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMorePress = () => {
    console.log('More menu pressed - future: show options menu');
  };

  const handleSeeBreakdown = () => {
    console.log('See breakdown pressed - future: navigate to commission breakdown');
  };

  const handleLeadPress = () => {
    console.log('Lead section pressed - navigate to lead details:', dealData.leadId);
    // navigation.navigate('LeadDetails', { leadId: dealData.leadId });
  };

  const handleDictatePress = () => {
    console.log('Dictate pressed - future: start voice dictation');
  };

  const handleCallLead = () => {
    console.log('Call lead pressed - future: initiate call');
  };

  const handleMessage = () => {
    console.log('Message pressed - future: open messaging');
  };

  const handleMoreActions = () => {
    console.log('More actions pressed - future: show more options');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.white }]}
      edges={['top']}
    >
      {/* Navigation Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.white,
          },
        ]}
      >
        {/* Back Button */}
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            {
              backgroundColor: theme.colors.white,
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
              flex: 1,
              marginLeft: 12,
            },
          ]}
        >
          Deal
        </Text>

        {/* More Button */}
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            {
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.night10,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={handleMorePress}
        >
          <CustomIcon
            name="more-horiz"
            width={20}
            height={20}
            tintColour={theme.colors.night}
          />
        </Pressable>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Deal Name */}
        <Text
          style={[
            theme.typography.heading2Medium,
            {
              color: theme.colors.night,
              fontSize: 26,
              marginHorizontal: 16,
              marginTop: 16,
            },
          ]}
        >
          {dealData.name}
        </Text>

        {/* Product Count */}
        <View style={styles.productCountRow}>
          <CustomIcon
            name="info-circle"
            width={20}
            height={20}
            tintColour={theme.colors.davysgrey}
          />
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              {
                color: theme.colors.davysgrey,
                marginLeft: 6,
              },
            ]}
          >
            {dealData.productCount} products
          </Text>
        </View>

        {/* Deal Value Section */}
        <View style={styles.valueSection}>
          <View style={styles.valueLeft}>
            {/* Label */}
            <Text
              style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.davysgrey,
                  marginBottom: 4,
                },
              ]}
            >
              Deal value
            </Text>

            {/* Amount */}
            <Text
              style={[
                theme.typography.title3,
                {
                  color: theme.colors.night,
                  fontSize: 36,
                  lineHeight: 42,
                },
              ]}
            >
              {formatCurrency(dealData.totalValue)}
            </Text>
          </View>

          {/* Team Avatars */}
          <View style={styles.valueRight}>
            <TeamAvatars salesReps={dealData.salesReps || []} />
          </View>
        </View>

        {/* Commission Section */}
        <View style={styles.commissionSection}>
          {/* Left: Label and Amount */}
          <View style={styles.commissionLeft}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>

              {/* Label */}
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  {
                    color: theme.colors.night,
                  },
                ]}
              >
                Total Commission
              </Text>
              {/* Right: See Breakdown Link */}
              <Pressable
                style={({ pressed }) => [
                  styles.breakdownLink,
                  { opacity: pressed ? 0.6 : 1 },
                ]}
                onPress={handleSeeBreakdown}
              >
                <Text
                  style={[
                    theme.typography.BodyMedium,
                    {
                      color: theme.colors.night,
                    },
                  ]}
                >
                  See breakdown
                </Text>
                <CustomIcon
                  name="nav-arrow-right"
                  width={16}
                  height={16}
                  tintColour={theme.colors.night}
                  style={{ marginLeft: 4 }}
                />
              </Pressable>
            </View>

            {/* Amount */}
            <Text
              style={[
                theme.typography.title2Bold,
                {
                  color: theme.colors.midnightgreen,
                  // lineHeight: 38,
                },
              ]}
            >
              {formatCurrency(dealData.commission)}  <Text
                style={[
                  theme.typography.BodySmallMedium,
                  {
                    color: theme.colors.davysgrey,
                    marginTop: 4,
                  },
                ]}
              >
                {dealData.commissionPercent}% Of {formatCurrency(dealData.totalValue)}
              </Text>
            </Text>

            {/* Percentage */}

          </View>

        </View>

        {/* Lead Section Card */}
        <Pressable
          style={({ pressed }) => [
            styles.leadCard,
            {
              backgroundColor: theme.colors.isabelline,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={handleLeadPress}
        >
          {/* Label */}
          <Text
            style={[
              theme.typography.BodyBold,
              {
                color: theme.colors.night,
                marginBottom: 16,
              },
            ]}
          >
            Lead
          </Text>

          {/* Lead Info Row */}
          <View style={styles.leadInfoRow}>
            {/* Avatar */}
            <View style={styles.leadAvatar}>
              <Text
                style={[
                  theme.typography.BodyLargeBold,
                  {
                    color: theme.colors.night,
                  },
                ]}
              >
                {leadInitials}
              </Text>
            </View>

            {/* Company and Contact */}
            <View style={styles.leadTextInfo}>
              <Text
                style={[
                  theme.typography.BodyBold,
                  {
                    color: theme.colors.night,
                  },
                ]}
                numberOfLines={1}
              >
                {dealData.leadCompany}
              </Text>
              <Text
                style={[
                  theme.typography.BodyMedium,
                  {
                    color: theme.colors.davysgrey,
                    marginTop: 2,
                  },
                ]}
                numberOfLines={1}
              >
                {dealData.leadContact}
              </Text>
            </View>

            {/* Chevron */}
            <CustomIcon
              name="nav-arrow-right"
              width={20}
              height={20}
              tintColour={theme.colors.night}
            />
          </View>
        </Pressable>

        {/* Talking Points Section */}
        <View style={styles.talkingPointsSection}>
          {/* Header Row */}
          <View style={styles.talkingPointsHeader}>
            <Text
              style={[
                theme.typography.BodyLargeMedium,
                {
                  color: theme.colors.night,
                },
              ]}
            >
              Talking points
            </Text>

            {/* Dictate Button */}
            <Pressable
              style={({ pressed }) => [
                styles.dictateButton,
                {
                  borderColor: theme.colors.davysgrey,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={handleDictatePress}
            >
              <CustomIcon
                name="microphone"
                width={16}
                height={16}
                tintColour={theme.colors.night}
              />
              <Text
                style={[
                  theme.typography.BodyMedium,
                  {
                    color: theme.colors.night,
                    marginLeft: 6,
                  },
                ]}
              >
                Dictate
              </Text>
            </Pressable>
          </View>

          {/* From Last Call */}
          <Text
            style={[
              theme.typography.BodySmallMedium,
              {
                color: theme.colors.davysgrey,
                marginTop: 8,
              },
            ]}
          >
            <Text style={[theme.typography.BodySmallBold]}>From last call : </Text>{dealData.talkingPoints?.fromLastCall || 'N/A'}
          </Text>

          {/* Talking Points Content */}
          <Text
            style={[
              theme.typography.BodySmallMedium,
              {
                color: theme.colors.davysgrey,
                lineHeight: 22,
                marginTop: 12,
              },
            ]}
          >
            {dealData.talkingPoints?.notes || 'No notes available'}
          </Text>

          {/* Bullet Points */}
          {dealData.talkingPoints?.bulletPoints && (
            <View style={styles.bulletList}>
              {dealData.talkingPoints.bulletPoints.map((point, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text
                    style={[
                      theme.typography.BodySmallMedium,
                      {
                        color: theme.colors.night,
                        marginRight: 8,
                      },
                    ]}
                  >
                    •
                  </Text>
                  <Text
                    style={[
                      theme.typography.BodySmallMedium,
                      {
                        color: theme.colors.night,
                        lineHeight: 22,
                        flex: 1,
                      },
                    ]}
                  >
                    {point}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Tab Bar */}
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        {activeTab === 'Activity timeline' && (
          <View style={styles.tabContent}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <CustomIcon
                name="activity"
                width={16}
                height={16}
                tintColour={theme.colors.night}
              />
              <Text
                style={[
                  theme.typography.BodyLargeMedium,
                  {
                    color: theme.colors.night,
                    marginLeft: 8,
                  },
                ]}
              >
                Activity Timeline
              </Text>
            </View>

            {/* Timeline Items */}
            <View style={styles.timeline}>
              {dealData.activityTimeline?.length > 0 ? (
                dealData.activityTimeline.map((item, index) => (
                  <TimelineItem
                    key={item.id}
                    activity={item.activity}
                    timestamp={item.timestamp}
                    duration={item.duration}
                    status={item.status}
                    isLast={index === dealData.activityTimeline.length - 1}
                  />
                ))
              ) : (
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.davysgrey, textAlign: 'center', marginTop: 20 }]}>
                  No activity yet
                </Text>
              )}
            </View>
          </View>
        )}

        {activeTab === 'Lead information' && (
          <View style={styles.tabContent}>
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.davysgrey,
                  textAlign: 'center',
                  marginTop: 40,
                },
              ]}
            >
              Lead information content coming soon...
            </Text>
          </View>
        )}

        {activeTab === 'Notes' && (
          <View style={styles.tabContent}>
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.davysgrey,
                  textAlign: 'center',
                  marginTop: 40,
                },
              ]}
            >
              Notes content coming soon...
            </Text>
          </View>
        )}

        {/* Bottom spacing for fixed buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Buttons - Fixed */}
      <View
        style={[
          styles.bottomButtons,
          {
            backgroundColor: theme.colors.white,
            borderTopColor: theme.colors.night10,
          },
        ]}
      >
        {/* Call Lead Button */}
        <Pressable
          style={({ pressed }) => [
            styles.callButton,
            {
              backgroundColor: theme.colors.midnightgreen,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={handleCallLead}
        >
          <CustomIcon
            name="phone"
            width={20}
            height={20}
            tintColour={theme.colors.white}
          />
          <Text
            style={[
              theme.typography.BodyMedium,
              {
                color: theme.colors.white,
                marginLeft: 8,
              },
            ]}
          >
            Call lead
          </Text>
        </Pressable>

        {/* Message Button */}
        <Pressable
          style={({ pressed }) => [
            styles.messageButton,
            {
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.davysgrey,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={handleMessage}
        >
          <CustomIcon
            name="mail-1"
            width={20}
            height={20}
            tintColour={theme.colors.night}
          />
          <Text
            style={[
              theme.typography.BodyMedium,
              {
                color: theme.colors.night,
                marginLeft: 8,
              },
            ]}
          >
            Message
          </Text>
        </Pressable>

        {/* More Button */}
        <Pressable
          style={({ pressed }) => [
            styles.moreButton,
            {
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.davysgrey,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={handleMoreActions}
        >
          <CustomIcon
            name="calendar"
            width={20}
            height={20}
            tintColour={theme.colors.night}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

/**
 * Sample Deal Data
 * Comprehensive sample data matching the reference image
 */
const getSampleDealData = () => ({
  id: 'd1',
  name: 'UX Team Skill Upgrade Program',
  productCount: 4,
  totalValue: 39567.00,
  commission: 2436.00,
  commissionPercent: 5.80,
  leadId: '1',
  leadCompany: 'CreativePixel Agency',
  leadContact: 'John Smith',
  salesReps: [
    { id: '1', name: 'James Nick', avatar: null },
    { id: '2', name: 'Sarah Johnson', avatar: null },
    { id: '3', name: 'Mike Davis', avatar: null },
  ],
  talkingPoints: {
    fromLastCall: '24th Thursday',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    bulletPoints: [
      'Ut enim ad minim veniam, quis nostrud',
      'exercitation ullamco laboris nisi ut aliquip',
      'ex ea commodo consequat. Duis aute irure',
      'dolor in reprehenderit in voluptate velit esse cillum dolore',
    ],
  },
  activityTimeline: [
    {
      id: 'a1',
      activity: 'Agent added a note tagging the product "Wireframing & Prototyping in Figma"',
      timestamp: '9/29/2025 at 08:19 PM',
      duration: '15 min',
      status: 'confirmed',
    },
    {
      id: 'a2',
      activity: 'Shipping department notified of dispatch schedule',
      timestamp: '9/30/2025 at 10:00 AM',
      duration: '30 min',
      status: 'pending',
    },
    {
      id: 'a3',
      activity: 'Quality control completed inspection',
      timestamp: '10/1/2025 at 01:15 PM',
      duration: '20 min',
      status: 'approved',
    },
    {
      id: 'a4',
      activity: 'Invoice generated and sent to client',
      timestamp: '10/1/2025 at 03:45 PM',
      duration: '10 min',
      status: 'sent',
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
  iconButton: {
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
  productCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
  },
  valueSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginTop: 20,
  },
  valueLeft: {
    flex: 1,
  },
  valueRight: {
    justifyContent: 'flex-start',
    paddingTop: 28,
  },
  commissionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginTop: 20,
  },
  commissionLeft: {
    flex: 1,
  },
  breakdownLink: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 28,
  },
  leadCard: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
  },
  leadInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leadAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leadTextInfo: {
    flex: 1,
    marginLeft: 12,
  },
  talkingPointsSection: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  talkingPointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dictateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  bulletList: {
    marginTop: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tabContent: {
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeline: {
    // Timeline items handle their own spacing
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
  },
  callButton: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
  },
  moreButton: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
});

export default DealDetailsScreen;
