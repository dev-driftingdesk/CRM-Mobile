import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * SalesAgentsBottomSheet - Read-only Sales Agents Display Modal
 *
 * Displays sales agents assigned to a deal with their roles.
 * This is a read-only display component that shows:
 * - Sales agent avatar
 * - Name and email
 * - Role badge (Primary, Co-Primary, Consultant)
 * - Manage button that opens full sales rep management
 *
 * Features:
 * - Clean read-only list display
 * - Role badges with proper styling (Primary = black, others = gray outline)
 * - Manage button for opening full selector
 * - Smooth bottom sheet animation
 *
 * @param {boolean} visible - Modal visibility state
 * @param {function} onClose - Callback when modal closes
 * @param {Array} salesReps - Array of sales reps with { id, name, email, avatar, role }
 * @param {function} onManage - Callback when manage button pressed
 */
const SalesAgentsBottomSheet = ({ visible, onClose, salesReps = [], onManage }) => {
  const { theme } = useAppTheme();

  /**
   * Get role badge style based on role type
   * Primary gets black background with white text
   * Co-Primary and Consultant get gray outline with dark text
   */
  const getRoleBadgeStyle = (role) => {
    if (role === 'Primary') {
      return {
        backgroundColor: theme.colors.night,
        color: theme.colors.white,
        borderWidth: 0,
      };
    }
    return {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#D0D0D0',
      color: theme.colors.night,
    };
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={[styles.modalContent, { backgroundColor: theme.colors.white }]}>
        {/* Header - NO border */}
        <View style={[styles.header, { borderColor: theme.colors.timberwolf }]}>
          <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.night, textAlign: 'center', flex: 1 }]}>
            Sales agents
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <CustomIcon name="xmark" width={24} height={24} tintColour={theme.colors.night} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal:16 }}>
          {/* Sales Agents List */}
          <ScrollView style={styles.agentsList} showsVerticalScrollIndicator={false}>
            {salesReps.map((agent, index) => {
              const badgeStyle = getRoleBadgeStyle(agent.role);
              const isLast = index === salesReps.length - 1;

              return (
                <View
                  key={agent.id}
                  style={[
                    styles.agentItem,
                    { borderBottomColor: '#E0E0E0' },
                    isLast && { borderBottomWidth: 0 }
                  ]}
                >
                  {/* Avatar */}
                  <Image source={{ uri: agent.avatar }} style={styles.avatar} />

                  {/* Info */}
                  <View style={styles.agentInfo}>
                    <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.night, fontSize: 16 }]}>
                      {agent.name}
                    </Text>
                    <Text style={[theme.typography.BodySmallMedium, { color: '#666666', marginTop: 2 }]}>
                      {agent.email}
                    </Text>
                  </View>

                  {/* Role Badge */}
                  <View
                    style={[
                      styles.roleBadge,
                      {
                        backgroundColor: badgeStyle.backgroundColor,
                        borderWidth: badgeStyle.borderWidth,
                        borderColor: badgeStyle.borderColor,
                      }
                    ]}
                  >
                    <Text
                      style={[
                        theme.typography.BodySmallMedium,
                        { color: badgeStyle.color }
                      ]}
                    >
                      {agent.role}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Manage Button */}
        <TouchableOpacity
          style={[styles.manageButton, { backgroundColor: theme.colors.midnightgreen }]}
          onPress={onManage}
          activeOpacity={0.8}
        >
          <Text style={[theme.typography.BodyMedium, { color: theme.colors.white, fontSize: 16 }]}>
            Manage sales agents
          </Text>
        </TouchableOpacity>

        {/* Bottom Indicator */}
        {/* <View style={styles.bottomIndicator} /> */}
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
    // paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    // NO border bottom - clean header design
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentsList: {
    maxHeight: 400,
  },
  agentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  manageButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 16,
  },
  bottomIndicator: {
    width: 100,
    height: 4,
    backgroundColor: '#0F1010',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default SalesAgentsBottomSheet;
