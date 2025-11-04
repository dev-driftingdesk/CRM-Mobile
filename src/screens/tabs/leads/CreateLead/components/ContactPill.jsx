import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * ContactPill - Communication contact display component
 *
 * Features:
 * - Pill-style card with icon, text, badge
 * - Primary badge display (teal)
 * - Remove button (X icon)
 * - Icon support: phone, email, whatsapp
 *
 * @param {string} type - Contact type (phone, email, whatsapp)
 * @param {string} value - Contact value (number/email/etc)
 * @param {boolean} isPrimary - Whether this is a primary contact
 * @param {function} onRemove - Callback when remove button pressed
 */
const ContactPill = ({ type, value, isPrimary, onRemove }) => {
  const { theme } = useAppTheme();

  // Icon mapping
  const iconMap = {
    phone: 'phone',
    email: 'mail-1',
    whatsapp: 'phone', // Using phone icon as placeholder
  };

  // Icon color for WhatsApp (green)
  const iconColor =
    type === 'whatsapp' ? '#25D366' : theme.colors.midnightgreen;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.night10,
        },
      ]}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <CustomIcon
          name={iconMap[type] || 'phone'}
          width={16}
          height={16}
          tintColour={iconColor}
        />
      </View>

      {/* Contact Value */}
      <Text
        style={[
          theme.typography.BodyMedium,
          { color: theme.colors.night, flex: 1 },
        ]}
        numberOfLines={1}
      >
        {value}
      </Text>

      {/* Primary Badge */}
      {isPrimary && (
        <View
          style={[
            styles.badge,
            { backgroundColor: theme.colors.midnightgreen },
          ]}
        >
          <Text
            style={[
              theme.typography.BodySmallBold,
              { color: theme.colors.white },
            ]}
          >
            Primary
          </Text>
        </View>
      )}

      {/* Remove Button */}
      <TouchableOpacity
        onPress={onRemove}
        style={styles.removeButton}
        activeOpacity={0.7}
      >
        <CustomIcon
          name="xmark"
          width={16}
          height={16}
          tintColour={theme.colors.davysgrey}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    gap: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  removeButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactPill;
