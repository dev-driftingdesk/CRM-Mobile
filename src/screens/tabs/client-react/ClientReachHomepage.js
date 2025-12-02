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
import IconComponent from '../../../assets/icons/CustomIcon';

/**
 * InitialCircle Component
 *
 * Reusable circular avatar component displaying user initials.
 *
 * @param {object} props - Component props
 * @param {string} props.initials - Initials to display (e.g., "RM")
 * @param {number} props.size - Circle diameter in pixels
 * @param {string} props.backgroundColor - Background color
 * @param {string} props.textColor - Text color for initials
 */
const InitialCircle = ({ initials, size, backgroundColor, textColor }) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.initialCircle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          theme.typography.BodyMedium,
          {
            color: textColor,
            fontSize: size > 40 ? 16 : 14,
            fontFamily: theme.fonts.bold,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
};

/**
 * OngoingCallCard Component
 *
 * Dark teal card containing ongoing call section and call schedule section.
 *
 * Features:
 * - Ongoing call details with controls (pause/mute and end call)
 * - Call schedule list with "See all" link
 * - Menu options for each scheduled call
 *
 * @param {object} props - Component props
 * @param {object} props.ongoingCall - Current ongoing call data
 * @param {Array} props.scheduledCalls - List of scheduled calls
 * @param {Function} props.onEndCall - Handler for ending the call
 * @param {Function} props.onToggleMute - Handler for toggling mute
 * @param {Function} props.onSeeAll - Handler for "See all" link
 * @param {Function} props.onScheduledCallMenu - Handler for scheduled call menu
 */
const OngoingCallCard = ({
  ongoingCall,
  scheduledCalls,
  onEndCall,
  onToggleMute,
  onSeeAll,
  onScheduledCallMenu,
}) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.ongoingCallCard,
        { backgroundColor: theme.colors.midnightgreen },
      ]}
    >
      {/* Ongoing Call Section */}
      <View style={styles.ongoingCallSection}>
        <Text
          style={[
            theme.typography.BodySmallMedium,
            { color: theme.colors.white, marginBottom: 12 },
          ]}
        >
          Ongoing call
        </Text>

        <View style={styles.ongoingCallContent}>
          {/* Profile Circle and Details */}
          <View style={styles.ongoingCallLeft}>
            <InitialCircle
              initials={ongoingCall.initials}
              size={48}
              backgroundColor={theme.colors.white}
              textColor={theme.colors.night}
            />
            <View style={styles.ongoingCallDetails}>
              <Text
                style={[
                  theme.typography.BodyLargeMedium,
                  {
                    color: theme.colors.white,
                  },
                ]}
              >
                {ongoingCall.company}
              </Text>
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  {
                    color: theme.colors.white,
                    marginTop: 4
                  },
                ]}
              >
                {ongoingCall.contact} • {ongoingCall.duration}
              </Text>
            </View>
          </View>

          {/* Control Buttons */}
          <View style={styles.ongoingCallControls}>
            {/* Pause/Mute Button */}
            <TouchableOpacity
              onPress={onToggleMute}
              style={styles.muteButton}
              activeOpacity={0.7}
            >
              <IconComponent
                name="pause"
                width={20}
                height={20}
                tintColour={theme.colors.white}
              />
            </TouchableOpacity>

            {/* End Call Button */}
            <TouchableOpacity
              onPress={onEndCall}
              style={styles.endCallButton}
              activeOpacity={0.7}
            >
              <IconComponent
                name="xmark"
                width={20}
                height={20}
                tintColour={theme.colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View
        style={[
          styles.divider,
          { backgroundColor: theme.colors.white10 },
        ]}
      />

      {/* Call Schedule Section */}
      <View style={styles.callScheduleSection}>
        {/* Header Row */}
        <View style={styles.callScheduleHeader}>
          <Text
            style={[
              theme.typography.BodyMedium,
              {
                color: theme.colors.white,
              },
            ]}
          >
            Call schedule
          </Text>
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
            <Text
              style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.white
                },
              ]}
            >
              See all &gt;
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scheduled Calls List */}
        <View style={styles.scheduledCallsList}>
          {scheduledCalls.map((call) => (
            <View key={call.id} style={styles.scheduledCallItem}>
              {/* Left Side: Circle + Details */}
              <View style={styles.scheduledCallLeft}>
                <InitialCircle
                  initials={call.initials}
                  size={40}
                  backgroundColor={theme.colors.white}
                  textColor={theme.colors.night}
                />
                <View style={styles.scheduledCallDetails}>
                  <Text
                    style={[
                      theme.typography.BodyMedium,
                      { color: theme.colors.white },
                    ]}
                  >
                    {call.company}
                  </Text>
                  <Text
                    style={[
                      theme.typography.BodySmallMedium,
                      { color: theme.colors.timberwolf, marginTop: 4 },
                    ]}
                  >
                    {call.phone}
                  </Text>
                </View>
              </View>

              {/* Right Side: Menu Icon */}
              <TouchableOpacity
                onPress={() => onScheduledCallMenu(call)}
                activeOpacity={0.7}
              >
                <IconComponent
                  name="more-horiz"
                  width={20}
                  height={20}
                  tintColour={theme.colors.white}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

/**
 * RecentCommunicationItem Component
 *
 * Single communication history item in the recent communications list.
 *
 * @param {object} props - Component props
 * @param {object} props.item - Communication item data
 * @param {Function} props.onPress - Handler for item press
 */
const RecentCommunicationItem = ({ item, onPress }) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.communicationItem}>
      {/* Left: Initial Circle */}
      <InitialCircle
        initials={item.initials}
        size={40}
        backgroundColor="#E8E8E8"
        textColor={theme.colors.night}
      />

      {/* Middle: Company + Phone (Stacked) */}
      <View style={styles.communicationMiddle}>
        <Text
          numberOfLines={1}
          style={[
            theme.typography.BodyMedium,
            {
              color: theme.colors.night,
              marginBottom: 4,
            },
          ]}
        >
          {item.company}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            theme.typography.BodySmallMedium,
            {
              color: theme.colors.davysgrey,
            },
          ]}
        >
          {item.phone}
        </Text>
      </View>

      {/* Right: Timestamp + Icon (Same Row) */}
      <View style={styles.communicationRight}>
        <Text
          numberOfLines={1}
          style={[
            theme.typography.BodySmallMedium,
            {
              color: theme.colors.davysgrey,
              fontSize: 11,
              marginRight: 8,
            },
          ]}
        >
          {item.timestamp}
        </Text>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <IconComponent
            name="info-circle"
            width={20}
            height={20}
            tintColour={theme.colors.night}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * ClientReachHomepage - Client Reach Tab Screen
 *
 * Production-ready client reach screen matching reference design.
 *
 * Features:
 * - Page title "Client reach" with subtitle
 * - Ongoing call card with dark teal background
 * - Ongoing call details with pause/mute and end call controls
 * - Call schedule section with "See all" link
 * - Recent communications section with toggle pills (Calls/Messages)
 * - Communications list with timestamps and info icons
 * - "See all calls" button
 * - Theme integration throughout
 *
 * Layout:
 * - Header with title and subtitle
 * - Ongoing call card (dark teal)
 * - Recent communications section with toggle pills
 * - White card containing communications list
 * - Scrollable content
 */
const ClientReachHomepage = () => {
  const { theme } = useAppTheme();

  // View mode state: 'Calls' or 'Messages'
  const [viewMode, setViewMode] = useState('Calls');

  // Sample data for ongoing call
  const ongoingCall = {
    company: 'CreativePixel Agency',
    contact: 'Emma Rodriguez',
    duration: '0:33',
    initials: 'RM',
  };

  // Sample data for scheduled calls
  const scheduledCalls = [
    {
      id: 1,
      company: 'CreativePixel Agency',
      phone: '+65 9876 5432',
      initials: 'RM',
    },
    {
      id: 2,
      company: 'Delhi Electronics Hub',
      phone: '+65 9876 5432',
      initials: 'RM',
    },
    {
      id: 3,
      company: 'Chennai Silk Emporium',
      phone: '+65 9876 5432',
      initials: 'RM',
    },
  ];

  // Sample data for recent communications
  const recentCommunications = [
    {
      id: 1,
      company: 'CreativePixel Agency',
      phone: '+65 9876 5432',
      timestamp: '10/15/2024 at 02:30 PM',
      initials: 'RM',
    },
    {
      id: 2,
      company: 'Chennai Silk Emporium',
      phone: '+65 8765 4321',
      timestamp: '10/14/2024 at 09:45 AM',
      initials: 'RM',
    },
    {
      id: 3,
      company: 'Delhi Electronics Hub',
      phone: '+65 7654 3210',
      timestamp: '10/13/2024 at 06:00 PM',
      initials: 'RM',
    },
    {
      id: 4,
      company: 'Kolkata Tea Estates',
      phone: '+65 6543 2109',
      timestamp: '10/12/2024 at 11:15 AM',
      initials: 'RM',
    },
    {
      id: 5,
      company: 'Hyderabad Biryani House',
      phone: '+65 5432 1098',
      timestamp: '10/11/2024 at 04:30 PM',
      initials: 'RM',
    },
    {
      id: 6,
      company: 'Pune IT Solutions',
      phone: '+65 4321 0987',
      timestamp: '10/10/2024 at 01:45 PM',
      initials: 'RM',
    },
  ];

  // Event Handlers

  /**
   * Handle end call button press
   */
  const handleEndCall = () => {
    console.log('End call pressed');
    // TODO: Implement call ending logic
  };

  /**
   * Handle toggle mute/pause button press
   */
  const handleToggleMute = () => {
    console.log('Toggle mute pressed');
    // TODO: Implement mute toggle
  };

  /**
   * Handle scheduled call menu press
   * @param {object} call - Call data object
   */
  const handleScheduledCallMenu = (call) => {
    console.log('Menu pressed for:', call);
    // TODO: Show menu options
  };

  /**
   * Handle communication info icon press
   * @param {object} item - Communication item data
   */
  const handleCommunicationInfo = (item) => {
    console.log('Info pressed for:', item);
    // TODO: Show communication details
  };

  /**
   * Handle "See all" link in call schedule
   */
  const handleSeeAllSchedule = () => {
    console.log('See all schedule pressed');
    // TODO: Navigate to full schedule
  };

  /**
   * Handle "See all calls" button press
   */
  const handleSeeAllCalls = () => {
    console.log('See all calls pressed');
    // TODO: Navigate to full calls list
  };

  /**
   * Handle view mode change (Calls/Messages toggle)
   * @param {string} mode - Selected mode ('Calls' or 'Messages')
   */
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.isabelline }]}
      edges={['top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text
            style={[
              theme.typography.heading1Medium,
              { color: theme.colors.night, fontSize: 32 },
            ]}
          >
            Client reach
          </Text>
          <Text
            style={[
              theme.typography.BodyMedium,
              { color: theme.colors.davysgrey, marginTop: 4 },
            ]}
          >
            Manage all your lead communications
          </Text>
        </View>

        {/* Ongoing Call Card */}
        <View style={styles.cardContainer}>
          <OngoingCallCard
            ongoingCall={ongoingCall}
            scheduledCalls={scheduledCalls}
            onEndCall={handleEndCall}
            onToggleMute={handleToggleMute}
            onSeeAll={handleSeeAllSchedule}
            onScheduledCallMenu={handleScheduledCallMenu}
          />
        </View>

        {/* Recent Communications Section */}
        <View style={styles.recentSection}>
          {/* Section Title */}
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              {
                color: theme.colors.night,
                marginBottom: 12,
                paddingHorizontal: 16,
              },
            ]}
          >
            Recent communications
          </Text>

          {/* Toggle Pills */}
          <View style={styles.togglePills}>
            {['Calls', 'Messages'].map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => handleViewModeChange(mode)}
                style={[
                  styles.pill,
                  viewMode === mode
                    ? { backgroundColor: theme.colors.night }
                    : {
                      backgroundColor: theme.colors.white,
                      borderWidth: 1,
                      borderColor: theme.colors.timberwolf,
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
                    },
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* White Card Container */}
          <View
            style={[
              styles.communicationsCard,
              {
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.timberwolf,
              },
            ]}
          >
            {/* Communications List */}
            {recentCommunications.map((item, index) => (
              <View key={item.id}>
                <RecentCommunicationItem
                  item={item}
                  onPress={() => handleCommunicationInfo(item)}
                />
                {/* Separator Line */}
                {index < recentCommunications.length - 1 && (
                  <View
                    style={[
                      styles.separator,
                      { backgroundColor: theme.colors.timberwolf },
                    ]}
                  />
                )}
              </View>
            ))}

            {/* See All Button */}
            <TouchableOpacity
              onPress={handleSeeAllCalls}
              style={[
                styles.seeAllButton,
                {
                  backgroundColor: theme.colors.white,
                  borderColor: theme.colors.timberwolf,
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
                See all calls
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header Styles
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },

  // Card Container
  cardContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  // Initial Circle Styles
  initialCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Ongoing Call Card Styles
  ongoingCallCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  ongoingCallSection: {
    marginBottom: 16,
  },

  ongoingCallContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ongoingCallLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  ongoingCallDetails: {
    marginLeft: 12,
    flex: 1,
  },

  ongoingCallControls: {
    flexDirection: 'row',
    gap: 8,
  },

  muteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  endCallButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    marginBottom: 16,
  },

  // Call Schedule Section
  callScheduleSection: {},

  callScheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  scheduledCallsList: {
    gap: 12,
  },

  scheduledCallItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  scheduledCallLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  scheduledCallDetails: {
    marginLeft: 12,
    flex: 1,
  },

  // Recent Communications Section
  recentSection: {
    paddingBottom: 24,
  },

  togglePills: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  pill: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Communications Card
  communicationsCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: 16,
  },

  communicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  communicationMiddle: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  communicationRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  separator: {
    height: 1,
  },

  seeAllButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClientReachHomepage;
