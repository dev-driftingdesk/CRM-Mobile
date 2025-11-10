import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../context/ThemeContext';
import CustomIcon from '../../assets/icons/CustomIcon';

/**
 * SuccessModal - Success feedback modal
 *
 * Features:
 * - Centered modal with success message
 * - Success icon (checkmark circle)
 * - Title and message
 * - Primary action button
 * - Theme integration
 *
 * @param {boolean} visible - Modal visibility state
 * @param {string} title - Success title (default: "Success!")
 * @param {string} message - Success message
 * @param {string} buttonText - Button text (default: "Done")
 * @param {function} onClose - Callback when button pressed or modal dismissed
 */
const SuccessModal = ({
  visible,
  title = 'Success!',
  message,
  buttonText = 'Done',
  onClose,
}) => {
  const { theme } = useAppTheme();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.6}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View
        style={[
          styles.modalContent,
          { backgroundColor: theme.colors.white },
        ]}
      >
        {/* Success Icon */}
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: theme.colors.midnightgreen },
          ]}
        >
          <CustomIcon
            name="check"
            width={40}
            height={40}
            tintColour={theme.colors.white}
          />
        </View>

        {/* Title */}
        <Text
          style={[
            theme.typography.heading2Medium,
            { color: theme.colors.night, textAlign: 'center', marginTop: 24 },
          ]}
        >
          {title}
        </Text>

        {/* Message */}
        {message && (
          <Text
            style={[
              theme.typography.BodyMedium,
              {
                color: theme.colors.davysgrey,
                textAlign: 'center',
                marginTop: 12,
                lineHeight: 22,
              },
            ]}
          >
            {message}
          </Text>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.colors.midnightgreen },
          ]}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <Text
            style={[
              theme.typography.BodyBold,
              { color: theme.colors.white },
            ]}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 40,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});

export default SuccessModal;
