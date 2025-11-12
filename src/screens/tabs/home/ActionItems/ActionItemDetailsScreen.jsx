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
import TimelineItem from '../../leads/DealDetails/components/TimelineItem';
import TabBar from '../../leads/DealDetails/components/TabBar';
import ContactPill from '../../leads/CreateLead/components/ContactPill';

/**
 * ActionItemDetailsScreen
 *
 * Production-ready action item details screen matching the reference design exactly.
 * Displays comprehensive action item information including priority, commission, lead, deal, talking points, and activity timeline.
 *
 * Features:
 * - Navigation header with back and more buttons
 * - Priority badge (Critical/High/Low with colors)
 * - Action item title with bold contact name
 * - Commission display
 * - Lead section card (pressable)
 * - Deal card (pressable)
 * - Talking points with dictate button
 * - Tab bar for switching content (Activity timeline / Lead information / Products)
 * - Activity timeline with status badges
 * - Bottom action buttons (Call / Message / More)
 *
 * Layout Structure:
 * 1. Header: Back button + "Action item" title + More button
 * 2. Priority Badge
 * 3. Action Item Title (bold contact name)
 * 4. Commission Display
 * 5. Lead Section Card (pressable)
 * 6. Deal Card (pressable)
 * 7. Talking Points Section
 * 8. Tab Bar (3 tabs)
 * 9. Active Tab Content (Activity Timeline / Lead Information / Products)
 * 10. Bottom Action Buttons (fixed)
 *
 * @param {Object} props
 * @param {Object} props.navigation - React Navigation navigation object
 * @param {Object} props.route - React Navigation route object with params
 */
const ActionItemDetailsScreen = ({ navigation, route }) => {
  const { theme } = useAppTheme();

  // Tab state
  const [activeTab, setActiveTab] = useState('Activity timeline');
  const tabs = ['Activity timeline', 'Lead information', 'Products'];

  // Get action item data from navigation params or use sample data
  const actionItemFromParams = route?.params?.actionItem;
  const actionItemData = actionItemFromParams || getSampleActionItemData();

  // Debug logging
  console.log('=== ActionItemDetailsScreen Debug ===');
  console.log('Action item from params:', actionItemFromParams ? 'Yes' : 'No - using sample data');
  console.log('Action item description:', actionItemData?.description);
  console.log('Priority:', actionItemData?.priority);
  console.log('Commission:', actionItemData?.commission);
  console.log('Full action item data:', JSON.stringify(actionItemData, null, 2));

  /**
   * Format currency value
   * @param {number} value - Dollar amount
   * @returns {string} Formatted currency string (e.g., "$2,436.00")
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
   * Get priority badge color
   */
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return '#FF6B6B';
      case 'High':
        return '#FFA500';
      case 'Low':
        return '#4ECB71';
      default:
        return '#FFA500';
    }
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

  const leadInitials = getInitials(actionItemData.leadCompany);

  /**
   * Format action item title with bold contact name
   * Returns an array of Text components
   */
  const formatTitle = () => {
    const { type, contactName, description } = actionItemData;
    const typeText = type.charAt(0).toUpperCase() + type.slice(1);

    return (
      <Text
        style={[
          theme.typography.heading2Medium,
          {
            color: theme.colors.night,
            // fontSize: 24,
            // lineHeight: 100,
          },
        ]}
      >
        {typeText} <Text style={[theme.typography.heading2Bold]}>{contactName}</Text> – {description}
      </Text>
    );
  };

  // Helper Functions
  const calculateTotalDealValue = () => {
    if (!actionItemData.products || actionItemData.products.length === 0) return 0;
    return actionItemData.products.reduce((sum, product) => sum + product.totalDeal, 0);
  };

  const calculateTotalCommission = () => {
    if (!actionItemData.products || actionItemData.products.length === 0) return 0;
    return actionItemData.products.reduce((sum, product) => sum + product.commission, 0);
  };

  // Event Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMorePress = () => {
    console.log('More menu pressed - future: show options menu');
  };

  const handleLeadPress = () => {
    console.log('Lead section pressed - navigate to lead details:', actionItemData.leadId);
    // navigation.navigate('LeadDetails', { leadId: actionItemData.leadId });
  };

  const handleDealPress = () => {
    console.log('Deal card pressed - navigate to deal details:', actionItemData.dealId);
    // future: navigation.navigate('DealDetails', { dealId: actionItemData.dealId });
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
      <View style={{ flex: 1 }}>
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
            Action item
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
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        >
          {/* Priority Badge */}
          <View
            style={[
              styles.priorityBadge,
              {
                backgroundColor: getPriorityColor(actionItemData.priority),
              },
            ]}
          >
            <Text
              style={[
                theme.typography.BodySmallBold,
                {
                  color: theme.colors.white,
                },
              ]}
            >
              {actionItemData.priority}
            </Text>
          </View>

          {/* Action Item Title */}
          <View style={styles.titleSection}>
            {formatTitle()}
          </View>

          {/* Commission Section */}
          <View style={styles.commissionSection}>
            <Text
              style={[
                theme.typography.BodyLargeMedium,
                {
                  color: theme.colors.midnightgreen,
                },
              ]}
            >
              Commission:{' '}
              <Text
                style={{
                  color: theme.colors.midnightgreen,
                }}
              >
                {formatCurrency(actionItemData.commission)}
              </Text>
              {' '}
              <Text
                style={{
                }}
              >
                ({actionItemData.commissionPercent}%)
              </Text>
            </Text>
          </View>

          {/* Lead Section Card */}
          <View
            style={[
              styles.leadCard,
              {
                backgroundColor: theme.colors.isabelline,
              },
            ]}
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

            {/* Lead Info Row - Pressable */}
            <Pressable
              style={({ pressed }) => [
                styles.leadInfoRow,
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={handleLeadPress}
            >
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
                    theme.typography.BodyLargeMedium,
                    {
                      color: theme.colors.night,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {actionItemData.leadCompany}
                </Text>
                <Text
                  style={[
                    theme.typography.BodySmallMedium,
                    {
                      color: theme.colors.davysgrey,
                      marginTop: 2,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {actionItemData.leadContact}
                </Text>
              </View>

              {/* Chevron */}
              <CustomIcon
                name="nav-arrow-right"
                width={20}
                height={20}
                tintColour={theme.colors.night}
              />
            </Pressable>

            {/* Deal Card - Inside Lead Section */}
            <Pressable
              style={({ pressed }) => [
                styles.dealCard,
                {
                  backgroundColor: theme.colors.white,
                  borderColor: theme.colors.night10,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={handleDealPress}
            >
              <Text
                style={[
                  theme.typography.BodyLargeMedium,
                  {
                    color: theme.colors.night,
                  },
                ]}
                numberOfLines={1}
              >
                {actionItemData.dealName}
              </Text>
              <Text
                style={[
                  theme.typography.BodyLargeMedium,
                  {
                    color: theme.colors.davysgrey,
                    marginTop: 4,
                  },
                ]}
              >
                {actionItemData.dealProductCount} products
              </Text>
            </Pressable>
          </View>

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
              <Text style={[theme.typography.BodySmallBold]}>From last call : </Text>
              {actionItemData.talkingPoints?.fromLastCall || 'N/A'}
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
              {actionItemData.talkingPoints?.notes || 'No notes available'}
            </Text>

            {/* Bullet Points */}
            {actionItemData.talkingPoints?.bulletPoints && (
              <View style={styles.bulletList}>
                {actionItemData.talkingPoints.bulletPoints.map((point, index) => (
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
                {actionItemData.activityTimeline?.length > 0 ? (
                  actionItemData.activityTimeline.map((item, index) => (
                    <TimelineItem
                      key={item.id}
                      activity={item.activity}
                      timestamp={item.timestamp}
                      duration={item.duration}
                      status={item.status}
                      isLast={index === actionItemData.activityTimeline.length - 1}
                    />
                  ))
                ) : (
                  <Text
                    style={[
                      theme.typography.BodyMedium,
                      {
                        color: theme.colors.davysgrey,
                        textAlign: 'center',
                        marginTop: 20,
                      },
                    ]}
                  >
                    No activity yet
                  </Text>
                )}
              </View>
            </View>
          )}

          {activeTab === 'Lead information' && (
            <View style={styles.tabContent}>
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <CustomIcon
                  name="info-circle"
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
                  Lead information
                </Text>
              </View>

              {/* Personal Information */}
              <Text
                style={[
                  theme.typography.BodyMedium,
                  {
                    color: theme.colors.night,
                    marginBottom: 12,
                  },
                ]}
              >
                Personal information
              </Text>

              {/* Name Field */}
              <View
                style={[
                  styles.infoField,
                  {
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <Text
                  style={[
                    theme.typography.BodySmall,
                    {
                      color: theme.colors.davysgrey,
                      marginBottom: 4,
                    },
                  ]}
                >
                  Name
                </Text>
                <Text
                  style={[
                    theme.typography.BodyMedium,
                    {
                      color: theme.colors.night,
                    },
                  ]}
                >
                  {actionItemData.leadContact}
                </Text>
              </View>

              {/* Company Field */}
              <View
                style={[
                  styles.infoField,
                  {
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    theme.typography.BodySmall,
                    {
                      color: theme.colors.davysgrey,
                      marginBottom: 4,
                    },
                  ]}
                >
                  Company
                </Text>
                <Text
                  style={[
                    theme.typography.BodyMedium,
                    {
                      color: theme.colors.night,
                    },
                  ]}
                >
                  {actionItemData.leadCompany}
                </Text>
              </View>

              {/* Communication Section */}
              <Text
                style={[
                  theme.typography.BodyMedium,
                  {
                    color: theme.colors.night,
                    marginTop: 24,
                    marginBottom: 12,
                  },
                ]}
              >
                Communication
              </Text>

              {/* Contact Pills */}
              <ContactPill
                type="phone"
                value={actionItemData.leadPhone || '+65 8234 2119'}
                isPrimary={true}
                onRemove={null}
                isFirst={true}
                isLast={false}
              />
              <ContactPill
                type="email"
                value={actionItemData.leadEmail || 'john.smith@creativepixel.com'}
                isPrimary={true}
                onRemove={null}
                isFirst={false}
                isLast={false}
              />
              <ContactPill
                type="whatsapp"
                value={actionItemData.leadWhatsApp || '+65 8234 2119'}
                isPrimary={false}
                onRemove={null}
                isFirst={false}
                isLast={false}
              />
              <ContactPill
                type="linkedin"
                value={actionItemData.leadLinkedIn || 'linkedin.com/in/johnsmith'}
                isPrimary={false}
                onRemove={null}
                isFirst={false}
                isLast={true}
              />
            </View>
          )}

          {activeTab === 'Products' && (
            <View style={styles.tabContent}>
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <CustomIcon
                  name="google-docs"
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
                  Products
                </Text>
              </View>

              {/* Stats Cards Row */}
              <View style={styles.productStatsRow}>
                {/* Total Deal Value Card - Dark */}
                <View style={[styles.productStatCard, { backgroundColor: theme.colors.night, flex: 1 }]}>
                  <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.white, marginBottom: 8 }]}>
                    Total deal value
                  </Text>
                  <Text style={[theme.typography.heading1Medium, { color: theme.colors.white, fontSize: 28 }]}>
                    {formatCurrency(calculateTotalDealValue())}
                  </Text>
                </View>

                {/* Total Commission Card - Light */}
                <View style={[styles.productStatCard, { backgroundColor: theme.colors.white, borderWidth: 1, borderColor: theme.colors.night10, flex: 1 }]}>
                  <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.night, marginBottom: 8 }]}>
                    Total commission
                  </Text>
                  <Text style={[theme.typography.heading1Medium, { color: theme.colors.night, fontSize: 28 }]}>
                    {formatCurrency(calculateTotalCommission())}
                  </Text>
                </View>
              </View>

              {/* Products List */}
              {actionItemData.products?.map((product) => (
                <View
                  key={product.id}
                  style={[
                    styles.productItemCard,
                    {
                      backgroundColor: theme.colors.white,
                      borderColor: theme.colors.night10,
                    },
                  ]}
                >
                  {/* Product Name */}
                  <Text
                    style={[
                      theme.typography.BodyMedium,
                      {
                        color: theme.colors.night,
                        marginBottom: 8,
                      },
                    ]}
                  >
                    {product.name}
                  </Text>

                  {/* Description */}
                  <Text
                    style={[
                      theme.typography.BodySmallMedium,
                      {
                        color: theme.colors.davysgrey,
                        lineHeight: 18,
                        marginBottom: 12,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {product.description}
                  </Text>

                  {/* Financial Row */}
                  <View style={styles.productFinancialRow}>
                    {/* Total Deal */}
                    <View style={styles.productFinancialItem}>
                      <Text
                        style={[
                          theme.typography.BodySmallMedium,
                          {
                            color: theme.colors.davysgrey,
                            marginBottom: 4,
                          },
                        ]}
                      >
                        Total deal
                      </Text>
                      <Text
                        style={[
                          theme.typography.BodyBold,
                          {
                            color: theme.colors.midnightgreen,
                          },
                        ]}
                      >
                        {formatCurrency(product.totalDeal)}
                      </Text>
                    </View>

                    {/* Separator */}
                    <View style={styles.financialSeparator} />

                    {/* Commission */}
                    <View style={styles.productFinancialItem}>
                      <Text
                        style={[
                          theme.typography.BodySmallMedium,
                          {
                            color: theme.colors.davysgrey,
                            marginBottom: 4,
                          },
                        ]}
                      >
                        Commission
                      </Text>
                      <Text
                        style={[
                          theme.typography.BodyBold,
                          {
                            color: theme.colors.midnightgreen,
                          },
                        ]}
                      >
                        {formatCurrency(product.commission)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Bottom spacing for fixed buttons */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>

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
            name="grid"
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
 * Sample Action Item Data
 * Comprehensive sample data matching the reference image
 */
const getSampleActionItemData = () => ({
  id: 'ai1',
  type: 'call',
  contactName: 'John Smith',
  description: 'follow up on pricing discussion',
  time: '10:00AM',
  priority: 'High',
  category: 'today',
  commission: 2436.00,
  commissionPercent: 5.8,
  leadId: '1',
  leadCompany: 'CreativePixel Agency',
  leadContact: 'John Smith',
  leadPhone: '+65 8234 2119',
  leadEmail: 'john.smith@creativepixel.com',
  leadWhatsApp: '+65 8234 2119',
  leadLinkedIn: 'linkedin.com/in/johnsmith',
  dealId: 'd1',
  dealName: 'UX Team Skill Upgrade Program',
  dealProductCount: 4,
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
      activity: 'Client called to confirm order details',
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
  products: [
    {
      id: 'p1',
      name: 'Usability Testing Bootcamp',
      description: 'Practice-led session with real user tests, observation frameworks, and UX performance metrics.',
      totalDeal: 14593,
      commission: 358,
    },
    {
      id: 'p2',
      name: 'UX Design Audit Certification',
      description: '1-day assessment and certification based on internal case studies. Includes personalized feedback report.',
      totalDeal: 58321,
      commission: 123,
    },
    {
      id: 'p3',
      name: 'Wireframing & Prototyping in Figma',
      description: 'Hands-on Figma session covering low- to high-fidelity wireframes, components, and collaboration workflows.',
      totalDeal: 21431,
      commission: 123,
    },
    {
      id: 'p4',
      name: 'User Research Fundamentals',
      description: '2-day workshop on qualitative and quantitative user research methods.',
      totalDeal: 8435,
      commission: 78,
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
    paddingBottom: 100,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 40,
    marginHorizontal: 16,
    marginTop: 16,
  },
  titleSection: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  commissionSection: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  leadCard: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
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
  dealCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    // marginHorizontal: 16,
    marginTop: 16,
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
    alignItems: 'center',
    marginBottom: 4,
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
  infoField: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(15,16,16,0.1)',
    padding: 16,
    borderBottomWidth: 0,
  },
  productItemCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  productStatCard: {
    borderRadius: 12,
    padding: 16,
  },
  productFinancialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  productFinancialItem: {
    flex: 1,
  },
  financialSeparator: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(15,16,16,0.1)',
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

export default ActionItemDetailsScreen;
