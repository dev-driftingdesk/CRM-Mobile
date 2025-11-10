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
import ContactPill from '../CreateLead/components/ContactPill';
import SalesAgentsBottomSheet from './components/SalesAgentsBottomSheet';
import AddNoteBottomSheet from './components/AddNoteBottomSheet';
import ViewNoteBottomSheet from './components/ViewNoteBottomSheet';
import LeadInfoBottomSheet from './components/LeadInfoBottomSheet';

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
  const tabs = ['Activity timeline', 'Lead information', 'Notes', 'Products'];

  // Sales agents modal state
  const [showSalesAgentsModal, setShowSalesAgentsModal] = useState(false);

  // Add note modal state
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  // View note modal state
  const [showViewNoteModal, setShowViewNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Lead info modal state
  const [showLeadInfoModal, setShowLeadInfoModal] = useState(false);

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
    setShowLeadInfoModal(true);
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

  const handleTeamAvatarsPress = () => {
    setShowSalesAgentsModal(true);
  };

  const handleManageSalesAgents = () => {
    setShowSalesAgentsModal(false);
    console.log('Manage sales agents - future: open sales rep selector');
    // future: navigate to sales rep management or open SalesRepSelectorBottomSheet
  };

  const handleNewNote = () => {
    setShowAddNoteModal(true);
  };

  const handleSaveNote = (newNote) => {
    console.log('Saving note:', newNote);
    // future: add note to dealData.notes array or update backend
    setShowAddNoteModal(false);
  };

  const handleNotePress = (note) => {
    console.log('Note pressed:', note.id, note.title);
    setSelectedNote(note);
    setShowViewNoteModal(true);
  };

  const handleEditNote = (note) => {
    setShowViewNoteModal(false);
    console.log('Edit note - future: open AddNoteBottomSheet in edit mode', note);
    // future: setShowAddNoteModal(true) with note data pre-filled
  };

  const handleAddProductToDeal = () => {
    console.log('Add product to deal pressed');
    // future: open product selector modal
  };

  const handleProductPress = (product) => {
    console.log('Product pressed:', product.id, product.name);
    // future: navigate to product details or edit
  };

  const calculateTotalDealValue = () => {
    if (!dealData.products || dealData.products.length === 0) return 0;
    return dealData.products.reduce((sum, product) => sum + product.totalDeal, 0);
  };

  const calculateTotalCommission = () => {
    if (!dealData.products || dealData.products.length === 0) return 0;
    return dealData.products.reduce((sum, product) => sum + product.commission, 0);
  };

  // Lead Info Modal Handlers
  const handleShowEmails = () => {
    setShowLeadInfoModal(false);
    console.log('Show all emails - future: navigate to emails screen');
  };

  const handleOpenCallLogs = () => {
    setShowLeadInfoModal(false);
    console.log('Open call logs - future: navigate to call logs screen');
  };

  const handleShowActionItems = () => {
    setShowLeadInfoModal(false);
    console.log('Show action items - future: navigate to action items screen');
  };

  const handleShowDeals = () => {
    setShowLeadInfoModal(false);
    console.log('Show deals - future: navigate to deals list or LeadDetails');
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
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
          scrollEnabled={true}
          nestedScrollEnabled={true}
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

            {/* Team Avatars - Pressable */}
            <Pressable onPress={handleTeamAvatarsPress} style={styles.valueRight}>
              <TeamAvatars salesReps={dealData.salesReps || []} />
            </Pressable>
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
              <View style={[styles.timeline]}>
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
              {/* Section Header */}
              <View style={[styles.sectionHeader, {}]}>
                <CustomIcon
                  name="info-circle"
                  width={16}
                  height={16}
                  tintColour={theme.colors.night}
                />
                <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.night, marginLeft: 8 }]}>
                  Lead information
                </Text>
              </View>

              {/* Personal Information */}
              <Text style={[theme.typography.BodyMedium, { color: theme.colors.night, marginBottom: 12 }]}>
                Personal information
              </Text>

              {/* Name Field */}
              <View style={[
                styles.infoField,
                {
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  borderBottomWidth: 0,
                }
              ]}>
                <Text style={[theme.typography.BodySmall, { color: theme.colors.davysgrey, marginBottom: 4 }]}>
                  Name
                </Text>
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                  {dealData.leadContact}
                </Text>
              </View>

              {/* Company Field */}
              <View style={[
                styles.infoField,
                {
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  borderBottomWidth: 1,
                }
              ]}>
                <Text style={[theme.typography.BodySmall, { color: theme.colors.davysgrey, marginBottom: 4 }]}>
                  Company
                </Text>
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                  {dealData.leadCompany}
                </Text>
              </View>

              {/* Communication Section */}
              <Text style={[theme.typography.BodyMedium, { color: theme.colors.night, marginTop: 24, marginBottom: 12 }]}>
                Communication
              </Text>

              {/* Contact Pills - Reuse ContactPill component */}
              <ContactPill
                type="phone"
                value={dealData.leadPhone || '+65 8234 2119'}
                isPrimary={true}
                onRemove={null}
                isFirst={true}
                isLast={false}
              />
              <ContactPill
                type="email"
                value={dealData.leadEmail || 'emma.rodriguez@creativepixel.com'}
                isPrimary={true}
                onRemove={null}
                isFirst={false}
                isLast={false}
              />
              <ContactPill
                type="whatsapp"
                value={dealData.leadWhatsApp || '+65 8234 2119'}
                isPrimary={false}
                onRemove={null}
                isFirst={false}
                isLast={false}
              />
              <ContactPill
                type="linkedin"
                value={dealData.leadLinkedIn || 'linkedin.com/in/emmarodriguezux'}
                isPrimary={false}
                onRemove={null}
                isFirst={false}
                isLast={true}
              />

              {/* Communication Preference Note */}
              <View style={styles.preferenceNote}>
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.davysgrey, lineHeight: 20 }]}>
                  {dealData.communicationPreference || 'Client prefers quick WhatsApp check-ins after meetings; formal updates over email.'}
                </Text>
              </View>

              {/* Company Details */}
              <Text style={[theme.typography.BodyMedium, { color: theme.colors.night, marginTop: 24, marginBottom: 12 }]}>
                Company Details
              </Text>

              {/* Company Name */}
              <View style={[
                styles.infoField,
                {
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  borderBottomWidth: 0,
                }
              ]}>
                <Text style={[theme.typography.BodySmall, { color: theme.colors.davysgrey, marginBottom: 4 }]}>
                  Company Name
                </Text>
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                  {dealData.leadCompany}
                </Text>
              </View>

              {/* Address */}
              <View style={[
                styles.infoField,
                {
                  borderBottomWidth: 0,
                }
              ]}>
                <Text style={[theme.typography.BodySmall, { color: theme.colors.davysgrey, marginBottom: 4 }]}>
                  Address
                </Text>
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.night, lineHeight: 20 }]}>
                  {dealData.companyAddress || '22B Upper Circular Rd, #04-01 The Workspace, Singapore 058416'}
                </Text>
              </View>

              {/* Website */}
              <View style={[
                styles.infoField,
                {
                  borderBottomWidth: 0,
                }
              ]}>
                <Text style={[theme.typography.BodySmall, { color: theme.colors.davysgrey, marginBottom: 4 }]}>
                  Website
                </Text>
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                  {dealData.companyWebsite || 'www.creativepixel.com'}
                </Text>
              </View>

              {/* Industry */}
              <View style={[
                styles.infoField,
                {
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  borderBottomWidth: 1,
                }
              ]}>
                <Text style={[theme.typography.BodySmall, { color: theme.colors.davysgrey, marginBottom: 4 }]}>
                  Industry
                </Text>
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                  {dealData.industry || 'Design & Branding'}
                </Text>
              </View>
            </View>
          )}

          {activeTab === 'Notes' && (
            <View style={styles.tabContent}>
              {/* Section Header */}
              <View style={styles.notesHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CustomIcon name="notes" width={16} height={16} tintColour={theme.colors.night} />
                  <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.night, marginLeft: 8 }]}>
                    Notes
                  </Text>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.newNoteButton,
                    {
                      borderColor: theme.colors.night10,
                      opacity: pressed ? 0.7 : 1,
                    }
                  ]}
                  onPress={handleNewNote}
                >
                  <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                    New note
                  </Text>
                  <CustomIcon name="plus" width={16} height={16} tintColour={theme.colors.night} style={{ marginLeft: 6 }} />
                </Pressable>
              </View>

              {/* Notes Grid - 2 Columns */}
              <View style={styles.notesGrid}>
                {dealData.notes?.map((note, index) => (
                  <Pressable
                    key={note.id}
                    style={({ pressed }) => [
                      styles.noteCard,
                      {
                        backgroundColor: theme.colors.white,
                        borderColor: theme.colors.night10,
                        opacity: pressed ? 0.8 : 1,
                      }
                    ]}
                    onPress={() => handleNotePress(note)}
                  >
                    {/* Note Content */}
                    <Text
                      style={[
                        theme.typography.BodySmallMedium,
                        { color: theme.colors.night, lineHeight: 20, marginBottom: 8 }
                      ]}
                      numberOfLines={5}
                    >
                      {note.content}
                    </Text>

                    {/* Timestamp */}
                    <Text
                      style={[
                        theme.typography.BodySmallMedium,
                        { color: theme.colors.davysgrey, marginTop: 8 }
                      ]}
                    >
                      {note.timestamp}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'Products' && (
            <View style={styles.tabContent}>
              {/* Section Header */}
              <View style={styles.productsHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CustomIcon name="google-docs" width={16} height={16} tintColour={theme.colors.night} />
                  <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.night, marginLeft: 8 }]}>
                    Products
                  </Text>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.addProductButton,
                    {
                      borderColor: theme.colors.night10,
                      opacity: pressed ? 0.7 : 1,
                    }
                  ]}
                  onPress={handleAddProductToDeal}
                >
                  <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                    Add new product
                  </Text>
                  <CustomIcon name="plus" width={16} height={16} tintColour={theme.colors.night} style={{ marginLeft: 6 }} />
                </Pressable>
              </View>

              {/* Stats Cards Row */}
              <View style={styles.productStatsRow}>
                {/* Total Deal Value Card - Dark */}
                <View style={[styles.productStatCard, { backgroundColor: theme.colors.night, flex: 1 }]}>
                  <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.white, marginBottom: 8 }]}>
                    Total deal value
                  </Text>
                  <Text style={[theme.typography.heading1Medium, { color: theme.colors.white }]}>
                    {formatCurrency(calculateTotalDealValue())}
                  </Text>
                </View>

                {/* Total Commission Card - Light */}
                <View style={[styles.productStatCard, { backgroundColor: theme.colors.white, borderWidth: 1, borderColor: theme.colors.night10, flex: 1 }]}>
                  <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.night, marginBottom: 8 }]}>
                    Total commission
                  </Text>
                  <Text style={[theme.typography.heading1Medium, { color: theme.colors.night }]}>
                    {formatCurrency(calculateTotalCommission())}
                  </Text>
                </View>
              </View>

              {/* Products List */}
              {dealData.products?.map((product) => (
                <Pressable
                  key={product.id}
                  style={({ pressed }) => [
                    styles.productItemCard,
                    {
                      backgroundColor: theme.colors.white,
                      borderColor: theme.colors.night10,
                      opacity: pressed ? 0.8 : 1,
                    }
                  ]}
                  onPress={() => handleProductPress(product)}
                >
                  {/* Product Name */}
                  <Text style={[theme.typography.BodyMedium, { color: theme.colors.night, marginBottom: 8 }]}>
                    {product.name}
                  </Text>

                  {/* Description */}
                  <Text
                    style={[
                      theme.typography.BodySmallMedium,
                      { color: theme.colors.davysgrey, lineHeight: 18, marginBottom: 12 }
                    ]}
                    numberOfLines={2}
                  >
                    {product.description}
                  </Text>

                  {/* Financial Row */}
                  <View style={styles.productFinancialRow}>
                    {/* Total Deal */}
                    <View style={styles.productFinancialItem}>
                      <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.davysgrey, marginBottom: 4 }]}>
                        Total deal
                      </Text>
                      <Text style={[theme.typography.BodyBold, { color: theme.colors.midnightgreen }]}>
                        {formatCurrency(product.totalDeal)}
                      </Text>
                    </View>

                    {/* Separator */}
                    <View style={styles.financialSeparator} />

                    {/* Commission */}
                    <View style={styles.productFinancialItem}>
                      <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.davysgrey, marginBottom: 4 }]}>
                        Commission
                      </Text>
                      <Text style={[theme.typography.BodyBold, { color: theme.colors.midnightgreen }]}>
                        {formatCurrency(product.commission)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
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
            name="calendar"
            width={20}
            height={20}
            tintColour={theme.colors.night}
          />
        </Pressable>
      </View>

      {/* Sales Agents Modal */}
      <SalesAgentsBottomSheet
        visible={showSalesAgentsModal}
        onClose={() => setShowSalesAgentsModal(false)}
        salesReps={dealData.salesReps || []}
        onManage={handleManageSalesAgents}
      />

      {/* Add Note Modal */}
      <AddNoteBottomSheet
        visible={showAddNoteModal}
        onClose={() => setShowAddNoteModal(false)}
        onSave={handleSaveNote}
        dealProducts={dealData.products || []}
        salesAgents={dealData.salesReps || []}
      />

      {/* View Note Modal */}
      <ViewNoteBottomSheet
        visible={showViewNoteModal}
        onClose={() => {
          setShowViewNoteModal(false);
          setSelectedNote(null);
        }}
        note={selectedNote}
        onEdit={handleEditNote}
      />

      {/* Lead Info Modal */}
      <LeadInfoBottomSheet
        visible={showLeadInfoModal}
        onClose={() => setShowLeadInfoModal(false)}
        leadData={{
          companyName: dealData.leadCompany,
          contactName: dealData.leadContact,
          dealCount: 8,
          totalValue: 39000,
          totalProducts: 25,
          criticalAction: {
            text: 'Call **John Smith** – follow up on pricing discussion',
            time: '10:00AM',
          },
          lastEmailDays: 3,
          lastCallDays: 1,
        }}
        onShowEmails={handleShowEmails}
        onOpenCallLogs={handleOpenCallLogs}
        onShowActionItems={handleShowActionItems}
        onShowDeals={handleShowDeals}
      />
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
  leadContact: 'Emma Rodriguez',
  leadPhone: '+65 8234 2119',
  leadEmail: 'emma.rodriguez@creativepixel.com',
  leadWhatsApp: '+65 8234 2119',
  leadLinkedIn: 'linkedin.com/in/emmarodriguezux',
  communicationPreference: 'Client prefers quick WhatsApp check-ins after meetings; formal updates over email.',
  companyAddress: '22B Upper Circular Rd, #04-01 The Workspace, Singapore 058416',
  companyWebsite: 'www.creativepixel.com',
  industry: 'Design & Branding',
  salesReps: [
    {
      id: '1',
      name: 'James Nick',
      email: 'james.nick@agenticcrm.com',
      role: 'Primary',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Sarah Lee',
      email: 'sarah.lee@agenticcrm.com',
      role: 'Co-Primary',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: '3',
      name: 'Mike Torel',
      email: 'mike.torel@agenticcrm.com',
      role: 'Consultant',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
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
  notes: [
    {
      id: 'n1',
      title: 'Check-in call with Emma',
      content: 'Had quick check-in call with Emma (Head of Design). She confirmed the UX workshop kickoff for next Monday.\n\nAsked if we can share the final schedule deck before EOD.\n\nMentioned they might want a follow-up "Design System Implementation" workshop for Q1 next year.',
      timestamp: '9/29/2025 at 08:19 PM',
      taggedProduct: {
        name: 'Wireframing & Prototyping in Figma',
        value: 400,
        commission: 34,
      },
      taggedAgent: 'James Nick',
    },
    {
      id: 'n2',
      title: 'Follow-up email sent',
      content: 'Follow-up email sent with workshop agenda and participant checklist. Client appreciated the pre-session quiz idea. Asked if we can inclu...',
      timestamp: '9/27/2025 at 06:40 PM',
    },
    {
      id: 'n3',
      title: 'Finance team invoice request',
      content: 'Finance team requested a split invoice for each course module. Emma suggested we assign separate POs for "Research" and "Prototyping" sessions....',
      timestamp: '9/28/2025 at 03:15 PM',
    },
    {
      id: 'n4',
      title: 'Emma\'s quarterly feedback',
      content: 'Emma shared feedback from last quarter\'s UI Refresh Project:\n• Team struggled to communicate resea...',
      timestamp: '9/26/2025 at 11:05 AM',
    },
    {
      id: 'n5',
      title: 'Procurement call',
      content: 'Call with Procurement. They requested project summary with expected outcomes and number of deliverables per cou...',
      timestamp: '9/25/2025 at 04:25 PM',
    },
    {
      id: 'n6',
      title: 'Initial discovery call',
      content: 'Initial discovery call with CreativePixel team.\n• Company has 6 designers\n• Strong visual design skills, weak in UX research & usability...',
      timestamp: '9/24/2025 at 09:00 AM',
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
  productCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
  },
  valueSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  infoField: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(15,16,16,0.1)',
    padding: 16,
    borderBottomWidth: 0,
  },
  preferenceNote: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  newNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  notesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  noteCard: {
    width: '48%', // 2 columns with gap
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    minHeight: 120,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
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

export default DealDetailsScreen;
