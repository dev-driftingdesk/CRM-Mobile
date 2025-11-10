import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * LeadInfoBottomSheet
 *
 * A comprehensive bottom sheet modal that displays lead information including:
 * - Lead header with avatar, company name, and contact name
 * - Three stats: deals in place, total lead value, products in total
 * - Optional critical action item
 * - Four action buttons: show emails, call logs, action items, deals
 *
 * Matches the reference design exactly with proper spacing, colors, and typography.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Object} props.leadData - Lead data object
 * @param {string} props.leadData.companyName - Company name
 * @param {string} props.leadData.contactName - Contact person name
 * @param {number} props.leadData.dealCount - Number of deals
 * @param {number} props.leadData.totalValue - Total lead value in dollars
 * @param {number} props.leadData.totalProducts - Total products count
 * @param {Object} [props.leadData.criticalAction] - Optional critical action item
 * @param {string} props.leadData.criticalAction.text - Action description
 * @param {string} props.leadData.criticalAction.time - Action time
 * @param {number} [props.leadData.lastEmailDays] - Days since last email
 * @param {number} [props.leadData.lastCallDays] - Days since last call
 * @param {Function} props.onShowEmails - Callback for show emails button
 * @param {Function} props.onOpenCallLogs - Callback for call logs button
 * @param {Function} props.onShowActionItems - Callback for action items button
 * @param {Function} props.onShowDeals - Callback for show deals button
 */
const LeadInfoBottomSheet = ({
  visible,
  onClose,
  leadData,
  onShowEmails,
  onOpenCallLogs,
  onShowActionItems,
  onShowDeals,
}) => {
  const { theme } = useAppTheme();

  /**
   * Generate avatar initials from company name
   * Takes first letter of first two words, or first two letters if single word
   */
  const getInitials = (companyName) => {
    if (!companyName) return 'LD';
    const words = companyName.trim().split(' ').filter(w => w.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return companyName.substring(0, 2).toUpperCase();
  };

  /**
   * Format currency value in thousands (e.g., $39k)
   */
  const formatValueK = (value) => {
    if (!value || isNaN(value)) return '$0';
    const thousands = Math.round(value / 1000);
    return `$${thousands}k`;
  };

  /**
   * Format last communication text
   */
  const formatLastCommunication = (days) => {
    if (!days) return '';
    return `last communication ${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  /**
   * Parse critical action text to bold contact name
   * Finds pattern like "Call **Name** - rest of text" and returns styled components
   */
  const parseCriticalActionText = (text) => {
    if (!text) return null;

    // Split by ** markers
    const parts = text.split('**');

    return (
      <Text style={[
        theme.typography.BodyMedium,
        {
          color: theme.colors.night,
          lineHeight: 20,
        }
      ]}>
        {parts.map((part, index) => {
          // Odd indexes are bold (between ** markers)
          if (index % 2 === 1) {
            return (
              <Text key={index} style={[theme.typography.BodyBold]}>
                {part}
              </Text>
            );
          }
          return part;
        })}
      </Text>
    );
  };

  const initials = getInitials(leadData?.companyName);

  console.log('LeadInfoBottomSheet - leadData:', leadData);
  console.log('Initials:', initials);
  console.log('Company:', leadData?.companyName);
  console.log('Deal count:', leadData?.dealCount);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.5}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
    >
      <View style={[
        styles.modalContent,
        {
          backgroundColor: theme.colors.white,
        }
      ]}>
        {/* Drag Indicator */}
        <View style={styles.dragIndicator} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={[
            theme.typography.BodyLargeMedium,
            {
              color: theme.colors.night,
              fontSize: 20,
            }
          ]}>
            Lead information
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              {
                opacity: pressed ? 0.6 : 1,
              }
            ]}
            onPress={onClose}
          >
            <CustomIcon
              name="xmark"
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
        >
          {/* Lead Header Card */}
          <View style={[
            styles.leadCard,
            {
              backgroundColor: theme.colors.isabelline,
            }
          ]}>
            {/* Avatar Circle */}
            <View style={styles.avatar}>
              <Text style={[
                theme.typography.heading2Bold,
                {
                  color: theme.colors.night,
                  fontSize: 24,
                }
              ]}>
                {initials}
              </Text>
            </View>

            {/* Company Name */}
            <Text style={[
              theme.typography.heading2Bold,
              {
                color: theme.colors.night,
                fontSize: 26,
                marginTop: 12,
                textAlign: 'center',
              }
            ]}>
              {leadData?.companyName}
            </Text>

            {/* Contact Name */}
            <Text style={[
              theme.typography.BodyMedium,
              {
                color: theme.colors.davysgrey,
                marginTop: 4,
                textAlign: 'center',
              }
            ]}>
              {leadData?.contactName}
            </Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            {/* Deals in Place */}
            <View style={styles.statItem}>
              <Text style={[
                theme.typography.heading1Bold,
                {
                  color: theme.colors.night,
                  // fontSize: 36,
                  // textAlign: 'center',
                }
              ]}>
                {leadData?.dealCount || 0}
              </Text>
              <Text style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.night,
                  marginTop: 4,
                  // textAlign: 'center',
                }
              ]}>
                Deals in place
              </Text>
            </View>

            {/* Total Lead Value */}
            <View style={styles.statItem}>
              <Text style={[
                theme.typography.heading1Bold,
                {
                  color: theme.colors.night,
                  // fontSize: 36,
                  // textAlign: 'center',
                }
              ]}>
                {formatValueK(leadData?.totalValue)}
              </Text>
              <Text style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.night,
                  marginTop: 4,
                  // textAlign: 'center',
                }
              ]}>
                Total lead value
              </Text>
            </View>

            {/* Products in Total */}
            <View style={styles.statItem}>
              <Text style={[
                theme.typography.heading1Bold,
                {
                  color: theme.colors.night,
                  // fontSize: 36,
                  // textAlign: 'center',
                }
              ]}>
                {leadData?.totalProducts || 0}
              </Text>
              <Text style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.night,
                  marginTop: 4,
                  // textAlign: 'center',
                }
              ]}>
                Products in total
              </Text>
            </View>
          </View>

          {/* Critical Action Item */}
          {leadData?.criticalAction && (
            <View style={[
              styles.criticalCard,
              {
                backgroundColor: theme.colors.isabelline,
                // borderColor: '#f69797ff',
              }
            ]}>
              {/* Critical Badge */}
              <View style={styles.criticalBadge}>
                <Text style={[
                  theme.typography.BodySmall,
                  {
                    color: theme.colors.white,
                    fontSize: 11,
                  }
                ]}>
                  Critical action item
                </Text>
              </View>

              {/* Action Text */}
              <View style={{ marginTop: 8 }}>
                {parseCriticalActionText(leadData.criticalAction.text)}
              </View>

              {/* Time */}
              <Text style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.davysgrey,
                  marginTop: 8,
                }
              ]}>
                {leadData.criticalAction.time}
              </Text>
            </View>
          )}

          {/* Action Buttons List */}
          <View style={styles.actionButtonsList}>
            {/* Show all emails */}
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                {
                  backgroundColor: theme.colors.white,
                  opacity: pressed ? 0.7 : 1,
                }
              ]}
              onPress={onShowEmails}
            >
              <CustomIcon
                name="mail-1"
                width={24}
                height={24}
                tintColour={theme.colors.night}
              />

              <View style={styles.actionTextContainer}>
                <Text style={[
                  theme.typography.BodyLargeMedium,
                  {
                    color: theme.colors.night,
                  }
                ]}>
                  Show all emails
                </Text>
                {leadData?.lastEmailDays && (
                  <Text style={[
                    theme.typography.BodySmallMedium,
                    {
                      color: theme.colors.night,
                      marginTop: 2,
                    }
                  ]}>
                    {formatLastCommunication(leadData.lastEmailDays)}
                  </Text>
                )}
              </View>

              <CustomIcon
                name="nav-arrow-right"
                width={20}
                height={20}
                tintColour={theme.colors.night}
              />
            </Pressable>

            {/* Open call logs */}
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                {
                  backgroundColor: theme.colors.white,
                  opacity: pressed ? 0.7 : 1,
                }
              ]}
              onPress={onOpenCallLogs}
            >
              <CustomIcon
                name="phone"
                width={24}
                height={24}
                tintColour={theme.colors.night}
              />

              <View style={styles.actionTextContainer}>
                <Text style={[
                  theme.typography.BodyLargeMedium,
                  {
                    color: theme.colors.night,
                  }
                ]}>
                  Open call logs
                </Text>
                {leadData?.lastCallDays && (
                  <Text style={[
                    theme.typography.BodySmallMedium,
                    {
                      color: theme.colors.night,
                      marginTop: 2,
                    }
                  ]}>
                    {formatLastCommunication(leadData.lastCallDays)}
                  </Text>
                )}
              </View>

              <CustomIcon
                name="nav-arrow-right"
                width={20}
                height={20}
                tintColour={theme.colors.night}
              />
            </Pressable>

            {/* Show all action items */}
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                {
                  backgroundColor: theme.colors.white,
                  opacity: pressed ? 0.7 : 1,
                }
              ]}
              onPress={onShowActionItems}
            >
              <CustomIcon
                name="activity"
                width={24}
                height={24}
                tintColour={theme.colors.night}
              />

              <View style={styles.actionTextContainer}>
                <Text style={[
                  theme.typography.BodyLargeMedium,
                  {
                    color: theme.colors.night,
                  }
                ]}>
                  Show all action items
                </Text>
              </View>

              <CustomIcon
                name="nav-arrow-right"
                width={20}
                height={20}
                tintColour={theme.colors.night}
              />
            </Pressable>

            {/* Show all deals */}
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.lastActionButton,
                {
                  backgroundColor: theme.colors.white,
                  opacity: pressed ? 0.7 : 1,
                }
              ]}
              onPress={onShowDeals}
            >
              <CustomIcon
                name="info-circle"
                width={24}
                height={24}
                tintColour={theme.colors.night}
              />

              <View style={styles.actionTextContainer}>
                <Text style={[
                  theme.typography.BodyLargeMedium,
                  {
                    color: theme.colors.night,
                  }
                ]}>
                  Show all deals
                </Text>
              </View>

              <CustomIcon
                name="nav-arrow-right"
                width={20}
                height={20}
                tintColour={theme.colors.night}
              />
            </Pressable>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '85%',
    paddingTop: 16,
    paddingBottom: 24,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  leadCard: {
    marginTop: 8,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  criticalCard: {
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  criticalBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  actionButtonsList: {
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,16,16,0.1)',
  },
  lastActionButton: {
    borderBottomWidth: 0,
  },
  actionTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
});

export default LeadInfoBottomSheet;
