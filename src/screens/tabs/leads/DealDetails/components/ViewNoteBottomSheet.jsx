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
 * ViewNoteBottomSheet
 *
 * Bottom sheet modal for viewing note details with optional tagged product information
 *
 * Features:
 * - Header with "Note" title and close button
 * - Note header row with clipboard icon, timestamp, and edit button
 * - Scrollable note content with multiple paragraphs
 * - Tagged product card showing product name, value, and commission
 * - Bottom indicator for visual feedback
 *
 * @param {Object} props
 * @param {boolean} props.visible - Modal visibility state
 * @param {Function} props.onClose - Close modal callback
 * @param {Object} props.note - Note object with content, timestamp, taggedProduct
 * @param {Function} props.onEdit - Edit note callback
 */
const ViewNoteBottomSheet = ({ visible, onClose, note, onEdit }) => {
  const { theme } = useAppTheme();

  if (!note) return null;

  console.log('ViewNoteBottomSheet - Note:', note.id);
  console.log('Tagged product exists:', !!note.taggedProduct);
  if (note.taggedProduct) {
    console.log('Product:', note.taggedProduct.name, 'Value:', note.taggedProduct.value);
  }

  /**
   * Format currency value
   * @param {number} value - Dollar amount
   * @returns {string} Formatted currency string
   */
  const formatCurrency = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '$0';
    }
    return `$${Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  /**
   * Handle edit button press
   */
  const handleEdit = () => {
    console.log('Edit note pressed - future: open AddNoteBottomSheet in edit mode');
    onEdit(note);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.5}
      propagateSwipe={true}
    >
      <View
        style={[
          styles.modalContent,
          {
            backgroundColor: theme.colors.white,
          },
        ]}
      >
        {/* Header */}
        <View style={[styles.header,{borderBottomWidth: 1, borderBottomColor: theme.colors.isabelline}]}>
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              {
                color: theme.colors.night,
                textAlign: 'center',
                flex: 1,
                fontSize: 20,
              },
            ]}
          >
            Note
          </Text>

          {/* Close Button */}
          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            onPress={onClose}
          >
            <CustomIcon
              name="xmark"
              width={24}
              height={24}
              tintColour={theme.colors.night}
            />
          </Pressable>
        </View>

        {/* Note Header Row */}
        <View style={styles.noteHeaderRow}>
          {/* Left: Clipboard Icon + Timestamp */}
          <View style={styles.noteHeaderLeft}>
            {/* Clipboard Icon Circle */}
            <View
              style={[
                styles.clipboardCircle,
                {
                  backgroundColor: theme.colors.night,
                },
              ]}
            >
              <CustomIcon
                name="clipboard-check"
                width={20}
                height={20}
                tintColour={theme.colors.white}
              />
            </View>

            {/* Timestamp */}
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.night,
                  marginLeft: 12,
                },
              ]}
            >
              {note.timestamp}
            </Text>
          </View>

          {/* Right: Edit Button */}
          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            onPress={handleEdit}
          >
            <CustomIcon
              name="edit"
              width={24}
              height={24}
              tintColour={theme.colors.night}
            />
          </Pressable>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Note Content */}
          <Text
            style={[
              theme.typography.BodyMedium,
              {
                color: theme.colors.night,
                lineHeight: 22,
                paddingHorizontal: 16,
                marginBottom: 16,
              },
            ]}
          >
            {note.content}
          </Text>

          {/* Tagged Product Card - Only show if product exists */}
          {note.taggedProduct && (
            <View
              style={[
                styles.productCard,
                {
                  backgroundColor: '#F5F5F5',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                },
              ]}
            >
              {/* Product Name */}
              <Text
                style={[
                  theme.typography.BodyBold,
                  {
                    color: theme.colors.night,
                    marginBottom: 12,
                  },
                ]}
                numberOfLines={1}
              >
                {note.taggedProduct.name}
              </Text>

              {/* Financial Row */}
              <View style={styles.financialRow}>
                {/* Value */}
                <View style={styles.financialItem}>
                  <Text
                    style={[
                      theme.typography.BodySmallMedium,
                      {
                        color: theme.colors.davysgrey,
                        marginBottom: 4,
                      },
                    ]}
                  >
                    Value
                  </Text>
                  <Text
                    style={[
                      theme.typography.BodyBold,
                      {
                        color: theme.colors.midnightgreen,
                      },
                    ]}
                  >
                    {formatCurrency(note.taggedProduct.value)}
                  </Text>
                </View>

                {/* Separator */}
                <View
                  style={[
                    styles.financialSeparator,
                    {
                      backgroundColor: theme.colors.davysgrey,
                      opacity: 0.2,
                    },
                  ]}
                />

                {/* Commission */}
                <View style={styles.financialItem}>
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
                    {formatCurrency(note.taggedProduct.commission)}
                  </Text>
                </View>
              </View>
            </View>
          )}
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
    maxHeight: '70%',
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: -8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  noteHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clipboardCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    maxHeight: 500,
    marginBottom: 16,
  },
  productCard: {
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  financialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  financialItem: {
    flex: 1,
  },
  financialSeparator: {
    width: 1,
    height: 40,
  },
  bottomIndicatorContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  bottomIndicator: {
    width: 100,
    height: 4,
    borderRadius: 2,
  },
});

export default ViewNoteBottomSheet;
