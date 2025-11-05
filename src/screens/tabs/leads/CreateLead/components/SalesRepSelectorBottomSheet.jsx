import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * SalesRepSelectorBottomSheet - Sales Representative Selection Modal
 *
 * Features:
 * - Search functionality for filtering sales reps
 * - Quick select avatar row (horizontal scroll)
 * - Selectable agent list with position assignment
 * - Position pills: Primary (teal), Co-Primary, Consultant
 * - Multi-select functionality
 * - Confirm/Cancel actions
 *
 * @param {boolean} visible - Modal visibility state
 * @param {function} onClose - Callback when modal closes
 * @param {function} onConfirm - Callback when selection confirmed
 * @param {Array} currentSalesReps - Currently assigned sales reps
 */
const SalesRepSelectorBottomSheet = ({
  visible,
  onClose,
  onConfirm,
  currentSalesReps = [],
}) => {
  const { theme } = useAppTheme();

  // Initialize selected reps from current sales reps
  const [selectedReps, setSelectedReps] = useState(() =>
    currentSalesReps.map((rep) => ({
      ...rep,
      position: rep.role || 'Consultant',
      email: rep.email || `${rep.name.toLowerCase().replace(' ', '.')}@agenticcrm.com`,
      avatar: rep.avatar || `https://i.pravatar.cc/150?u=${rep.id}`,
    }))
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Available sales reps (mock data)
  const availableReps = [
    {
      id: '1',
      name: 'James Nick',
      email: 'james.nick@agenticcrm.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Sarah Lee',
      email: 'sarah.lee@agenticcrm.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: '3',
      name: 'Marcus Tan',
      email: 'marcus.tan@agenticcrm.com',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: '4',
      name: 'Olivia Carter',
      email: 'olivia.carter@agenticcrm.com',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    {
      id: '5',
      name: 'Daniel Wright',
      email: 'daniel.wright@agenticcrm.com',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    {
      id: '6',
      name: 'Rick Wiggins',
      email: 'rick.wiggins@agenticcrm.com',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    {
      id: '7',
      name: 'Col. Roderick',
      email: 'col.roderick@agenticcrm.com',
      avatar: 'https://i.pravatar.cc/150?img=14',
    },
    {
      id: '8',
      name: 'Mike Torel',
      email: 'mike.torel@agenticcrm.com',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
  ];

  // Filter reps by search query
  const filteredReps = useMemo(() => {
    if (!searchQuery.trim()) return availableReps;
    const query = searchQuery.toLowerCase();
    return availableReps.filter(
      (rep) =>
        rep.name.toLowerCase().includes(query) ||
        rep.email.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Check if rep is selected
  const isRepSelected = (repId) => {
    return selectedReps.some((r) => r.id === repId);
  };

  // Get selected rep data
  const getSelectedRep = (repId) => {
    return selectedReps.find((r) => r.id === repId);
  };

  // Toggle rep selection
  const toggleRepSelection = (rep) => {
    const isSelected = isRepSelected(rep.id);
    if (isSelected) {
      setSelectedReps((prev) => prev.filter((r) => r.id !== rep.id));
    } else {
      setSelectedReps((prev) => [
        ...prev,
        { ...rep, position: 'Consultant' },
      ]);
    }
  };

  // Update rep position
  const updateRepPosition = (repId, position) => {
    setSelectedReps((prev) =>
      prev.map((rep) => (rep.id === repId ? { ...rep, position } : rep))
    );
  };

  // Handle confirm
  const handleConfirm = () => {
    const repsToAdd = selectedReps.map((rep) => ({
      id: rep.id,
      name: rep.name,
      email: rep.email,
      avatar: rep.avatar,
      role: rep.position,
    }));
    onConfirm(repsToAdd);
    onClose();
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset to current reps
    setSelectedReps(
      currentSalesReps.map((rep) => ({
        ...rep,
        position: rep.role || 'Consultant',
        email: rep.email || `${rep.name.toLowerCase().replace(' ', '.')}@agenticcrm.com`,
        avatar: rep.avatar || `https://i.pravatar.cc/150?u=${rep.id}`,
      }))
    );
    setSearchQuery('');
    onClose();
  };

  // Render position pills for selected rep
  const renderPositionPills = (rep) => {
    const positions = ['Primary', 'Co-Primary', 'Consultant'];
    return (
      <View style={styles.positionPillsContainer}>
        <Text
          style={[
            theme.typography.BodySmallMedium,
            { color: theme.colors.night, marginBottom: 8 },
          ]}
        >
          Position
        </Text>
        <View style={styles.pillsRow}>
          {positions.map((position) => {
            const isSelected = rep.position === position;
            const isPrimary = position === 'Primary';

            return (
              <TouchableOpacity
                key={position}
                style={[
                  styles.positionPill,
                  isPrimary && isSelected && {
                    backgroundColor: theme.colors.night, // Black background for Primary
                  },
                  !isPrimary && isSelected && {
                    borderColor: '#D0D0D0',
                    borderWidth: 1,
                    backgroundColor: theme.colors.night,
                  },
                  !isSelected && {
                    borderColor: '#D0D0D0',
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={() => updateRepPosition(rep.id, position)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    theme.typography.BodySmallMedium,
                    isPrimary && isSelected && { color: theme.colors.white },
                    !isSelected && { color: theme.colors.davysgrey },
                    isSelected && !isPrimary && { color: theme.colors.white },
                  ]}
                >
                  {position}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  // Render agent list item
  const renderAgentItem = (rep) => {
    const isSelected = isRepSelected(rep.id);
    const selectedRep = getSelectedRep(rep.id);

    return (
      <TouchableOpacity
        key={rep.id}
        style={[
          styles.agentItem,
          isSelected && { backgroundColor: '#F5F5F5' }, // Light gray background for selected
          { borderBottomColor: theme.colors.night10 },
        ]}
        onPress={() => toggleRepSelection(rep)}
        activeOpacity={0.7}
      >
        {/* Avatar */}
        <Image source={{ uri: rep.avatar }} style={styles.agentAvatar} />

        {/* Info Container */}
        <View style={styles.agentInfo}>
          <Text
            style={[theme.typography.BodyLargeMedium, { color: theme.colors.night }]}
          >
            {rep.name}
          </Text>
          <Text
            style={[
              theme.typography.BodySmallMedium,
              { color: theme.colors.davysgrey, marginTop: 2 },
            ]}
          >
            {rep.email}
          </Text>

          {/* Position Pills - Only show when selected */}
          {isSelected && selectedRep && renderPositionPills(selectedRep)}
        </View>

        {/* Selection Radio */}
        <View
          style={[
            styles.radioButton,
            isSelected && {
              backgroundColor: theme.colors.midnightgreen,
              borderColor: theme.colors.midnightgreen,
            },
            !isSelected && {
              borderColor: '#D0D0D0',
            },
          ]}
        >
          {isSelected && (
            <CustomIcon
              name="check"
              width={14}
              height={14}
              tintColour={theme.colors.white}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Render selected avatar with remove button
  const renderSelectedAvatar = (rep) => {
    // Truncate name to first name + last initial
    const nameParts = rep.name.split(' ');
    const displayName =
      nameParts.length > 1
        ? `${nameParts[0]} ${nameParts[1].charAt(0)}.`
        : nameParts[0];

    return (
      <View key={rep.id} style={styles.quickAvatarContainer}>
        <View style={styles.quickAvatarWrapper}>
          <Image source={{ uri: rep.avatar }} style={styles.quickAvatar} />
          {/* Remove Button Overlay */}
          <TouchableOpacity
            style={styles.removeAvatarButton}
            onPress={() => toggleRepSelection(rep)}
            activeOpacity={0.7}
          >
            <View style={[styles.removeAvatarCircle, { backgroundColor: theme.colors.isabelline }]}>
              <CustomIcon
                name="xmark"
                width={12}
                height={12}
                tintColour={theme.colors.night}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            theme.typography.BodySmall,
            {
              color: theme.colors.night,
              marginTop: 4,
              textAlign: 'center',
            },
          ]}
          numberOfLines={1}
        >
          {displayName}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleCancel}
      onBackButtonPress={handleCancel}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View
        style={[
          styles.modalContent,
          { backgroundColor: theme.colors.white, },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: '#E0E0E0' }]}>
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              { color: theme.colors.night, textAlign: 'center', flex: 1 },
            ]}
          >
            Manage sales agents
          </Text>
          <TouchableOpacity
            onPress={handleCancel}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <CustomIcon
              name="xmark"
              width={24}
              height={24}
              tintColour={theme.colors.night}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchBar,
            { borderColor: '#E0E0E0' },
          ]}
        >
          <CustomIcon
            name="search"
            width={20}
            height={20}
            tintColour={theme.colors.davysgrey}
          />
          <TextInput
            style={[
              styles.searchInput,
              theme.typography.BodyMedium,
              { color: theme.colors.night },
            ]}
            placeholder="Search members of your organization"
            placeholderTextColor={theme.colors.davysgrey}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Selected Sales Agents Avatars */}
        {selectedReps.length > 0 && (
          <View style={[styles.selectedSection,{borderColor:theme.colors.night10, paddingBottom:16}]}>
            <Text style={[theme.typography.BodyMedium, { color: theme.colors.night, marginBottom: 12 }]}>
              Selected ({selectedReps.length})
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickSelectContent}
            >
              {selectedReps.map((rep) => renderSelectedAvatar(rep))}
            </ScrollView>
          </View>
        )}

        {/* Sales Agents List */}
        <ScrollView
          style={styles.agentList}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {filteredReps.length > 0 ? (
            filteredReps.map((rep) => renderAgentItem(rep))
          ) : (
            <View style={{ padding: 32, alignItems: 'center' }}>
              <Text style={[theme.typography.BodyMedium, { color: theme.colors.davysgrey }]}>
                No results found
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: theme.colors.midnightgreen },
            ]}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.white },
              ]}
            >
              Confirm sales agents
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cancelButton,
              { borderColor: '#D0D0D0', backgroundColor: theme.colors.white },
            ]}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.night },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    height: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: -8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  selectedSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  quickSelectRow: {
    maxHeight: 90,
    marginBottom: 16,
  },
  quickSelectContent: {
    gap: 12,
    paddingRight: 12,
  },
  quickAvatarContainer: {
    alignItems: 'center',
    width: 64,
  },
  quickAvatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'visible',
    position: 'relative',
  },
  quickAvatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  removeAvatarButton: {
    position: 'absolute',
    // top: -4,
    right: 0,
  },
  removeAvatarCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'white',
  },
  agentList: {
    flex: 1,
    marginBottom: 16,
    minHeight: 200,
  },
  agentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    borderRadius: 12,
    backgroundColor: 'transparent',
    marginBottom: 12,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  positionPillsContainer: {
    marginTop: 8,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  positionPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmButton: {
    flex: 1.5,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default SalesRepSelectorBottomSheet;
