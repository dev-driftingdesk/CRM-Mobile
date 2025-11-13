import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * AddNoteBottomSheet
 *
 * Bottom sheet modal for adding notes to deals with product and agent tagging
 *
 * Features:
 * - Tag a product dropdown
 * - Tag an agent dropdown
 * - Large text area for note content
 * - Transcribe button for voice input (future)
 * - Save/Cancel actions
 * - Bottom indicator for visual feedback
 *
 * @param {Object} props
 * @param {boolean} props.visible - Modal visibility state
 * @param {Function} props.onClose - Close modal callback
 * @param {Function} props.onSave - Save note callback
 * @param {Array} props.dealProducts - Array of products to tag
 * @param {Array} props.salesAgents - Array of agents to tag
 */
const AddNoteBottomSheet = ({
  visible,
  onClose,
  onSave,
  dealProducts = [],
  salesAgents = [],
}) => {
  const { theme } = useAppTheme();

  // State
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [noteText, setNoteText] = useState('');
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [showAgentPicker, setShowAgentPicker] = useState(false);

  /**
   * Handle save note
   * Creates new note object and passes to parent
   */
  const handleSave = () => {
    if (!noteText.trim()) {
      console.log('Cannot save empty note');
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      content: noteText,
      taggedProduct: selectedProduct,
      taggedAgent: selectedAgent,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    console.log('Saving note:', newNote);
    onSave(newNote);
    handleCancel();
  };

  /**
   * Handle cancel - reset form and close
   */
  const handleCancel = () => {
    setSelectedProduct('');
    setSelectedAgent('');
    setNoteText('');
    setShowProductPicker(false);
    setShowAgentPicker(false);
    onClose();
  };

  /**
   * Handle transcribe button press
   * Future: Start voice transcription
   */
  const handleTranscribe = () => {
    console.log('Transcribe pressed - future: start voice transcription');
  };

  /**
   * Handle product selection
   */
  const handleProductSelect = (product) => {
    setSelectedProduct(product.name);
    setShowProductPicker(false);
  };

  /**
   * Handle agent selection
   */
  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent.name);
    setShowAgentPicker(false);
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
        <View style={styles.header}>
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              {
                color: theme.colors.night,
                textAlign: 'center',
                flex: 1,
              },
            ]}
          >
            Add note
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

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Tag a product Section */}
          <View style={styles.fieldSection}>
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.night,
                  marginBottom: 8,
                },
              ]}
            >
              Tag a product
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.dropdownInput,
                {
                  borderColor: theme.colors.night10,
                  backgroundColor: theme.colors.white,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={() => {
                console.log('Product dropdown pressed - future: show product picker');
                setShowProductPicker(!showProductPicker);
              }}
            >
              <Text
                style={[
                  theme.typography.BodyMedium,
                  {
                    color: selectedProduct
                      ? theme.colors.night
                      : theme.colors.davysgrey,
                    flex: 1,
                  },
                ]}
                numberOfLines={1}
              >
                {selectedProduct || 'add a product to the note'}
              </Text>

              <CustomIcon
                name="nav-arrow-down"
                width={20}
                height={20}
                tintColour={theme.colors.night}
              />
            </Pressable>

            {/* Product Picker (Simple list for now) */}
            {showProductPicker && dealProducts.length > 0 && (
              <View
                style={[
                  styles.pickerList,
                  {
                    backgroundColor: theme.colors.white,
                    borderColor: theme.colors.night10,
                  },
                ]}
              >
                {dealProducts.map((product) => (
                  <Pressable
                    key={product.id}
                    style={({ pressed }) => [
                      styles.pickerItem,
                      {
                        backgroundColor: pressed
                          ? theme.colors.isabelline
                          : theme.colors.white,
                      },
                    ]}
                    onPress={() => handleProductSelect(product)}
                  >
                    <Text
                      style={[
                        theme.typography.BodyMedium,
                        {
                          color: theme.colors.night,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {product.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Tag an agent Section */}
          <View style={styles.fieldSection}>
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.night,
                  marginBottom: 8,
                },
              ]}
            >
              Tag an agent
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.dropdownInput,
                {
                  borderColor: theme.colors.night10,
                  backgroundColor: theme.colors.white,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={() => {
                console.log('Agent dropdown pressed - future: show agent picker');
                setShowAgentPicker(!showAgentPicker);
              }}
            >
              <Text
                style={[
                  theme.typography.BodyMedium,
                  {
                    color: selectedAgent
                      ? theme.colors.night
                      : theme.colors.davysgrey,
                    flex: 1,
                  },
                ]}
                numberOfLines={1}
              >
                {selectedAgent || 'add an agent to the note'}
              </Text>

              <CustomIcon
                name="nav-arrow-down"
                width={20}
                height={20}
                tintColour={theme.colors.night}
              />
            </Pressable>

            {/* Agent Picker (Simple list for now) */}
            {showAgentPicker && salesAgents.length > 0 && (
              <View
                style={[
                  styles.pickerList,
                  {
                    backgroundColor: theme.colors.white,
                    borderColor: theme.colors.night10,
                  },
                ]}
              >
                {salesAgents.map((agent) => (
                  <Pressable
                    key={agent.id}
                    style={({ pressed }) => [
                      styles.pickerItem,
                      {
                        backgroundColor: pressed
                          ? theme.colors.isabelline
                          : theme.colors.white,
                      },
                    ]}
                    onPress={() => handleAgentSelect(agent)}
                  >
                    <Text
                      style={[
                        theme.typography.BodyMedium,
                        {
                          color: theme.colors.night,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {agent.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Note Section */}
          <View style={styles.fieldSection}>
            {/* Note Header Row */}
            <View style={styles.noteHeader}>
              <Text
                style={[
                  theme.typography.BodyMedium,
                  {
                    color: theme.colors.night,
                  },
                ]}
              >
                Note
              </Text>

              {/* Transcribe Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.transcribeButton,
                  {
                    borderColor: theme.colors.davysgrey,
                    backgroundColor: theme.colors.white,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                onPress={handleTranscribe}
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
                  Transcribe
                </Text>
              </Pressable>
            </View>

            {/* Text Area */}
            <TextInput
              style={[
                styles.textArea,
                theme.typography.BodyMedium,
                {
                  borderColor: theme.colors.night10,
                  backgroundColor: theme.colors.white,
                  color: theme.colors.night,
                },
              ]}
              placeholder="Create your note"
              placeholderTextColor={theme.colors.davysgrey}
              value={noteText}
              onChangeText={setNoteText}
              multiline
              textAlignVertical="top"
              numberOfLines={6}
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {/* Save note */}
          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              {
                backgroundColor: theme.colors.midnightgreen,
                opacity: pressed || !noteText.trim() ? 0.6 : 1,
              },
            ]}
            onPress={handleSave}
            disabled={!noteText.trim()}
          >
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.white,
                },
              ]}
            >
              Save note
            </Text>
          </Pressable>

          {/* Cancel */}
          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              {
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.davysgrey,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={handleCancel}
          >
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.night,
                },
              ]}
            >
              Cancel
            </Text>
          </Pressable>
        </View>

        {/* Bottom Indicator */}
        <View style={styles.bottomIndicatorContainer}>
          <View
            style={[
              styles.bottomIndicator,
              {
                backgroundColor: theme.colors.night,
              },
            ]}
          />
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
    maxHeight: '70%',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
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
  scrollView: {
    maxHeight: 400,
    marginBottom: 16,
  },
  fieldSection: {
    marginBottom: 16,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  pickerList: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    maxHeight: 150,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,16,16,0.05)',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transcribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  textArea: {
    height: 140,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  saveButton: {
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

export default AddNoteBottomSheet;
