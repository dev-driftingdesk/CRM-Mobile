import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * ContactPill - Communication contact display component
 *
 * Features:
 * - Label text above card
 * - Pill-style card with icon, text, badge
 * - Primary badge display (teal)
 * - Remove button (X icon)
 * - Icon support: phone, email, whatsapp
 * - WhatsApp icon in green (#25D366)
 *
 * @param {string} type - Contact type (phone, email, whatsapp)
 * @param {string} value - Contact value (number/email/etc)
 * @param {boolean} isPrimary - Whether this is a primary contact
 * @param {function} onRemove - Callback when remove button pressed
 */
const ContactPill = ({ type, value, isPrimary, onRemove }) => {
  const { theme } = useAppTheme();

  // Get label text based on type
  const getLabel = (type) => {
    switch (type) {
      case 'phone':
        return 'Phone';
      case 'email':
        return 'Email';
      case 'whatsapp':
        return 'WhatsApp';
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Icon mapping
  const iconMap = {
    phone: 'phone',
    email: 'mail-1',
    whatsapp: 'whatsapp',
    facebook: 'facebook', // Placeholder - use mail icon for now
    instagram: 'instagram', // Placeholder - use mail icon for now
  };

  // Icon color - WhatsApp green, others null (use original icon color)
  const iconColor = type === 'whatsapp' ? '#25D366' : null;

  return (
    <View style={[styles.wrapper,{borderColor:theme.colors.night10}]}>
      {/* Label Text Above Card */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>

        <Text
          style={[
            theme.typography.BodyMedium,
            { color: theme.colors.davysgrey, marginBottom: 8 },
          ]}
        >
          {getLabel(type)}
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
      </View>

      {/* Contact Card */}
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
            width={20}
            height={20}
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 12,
    // paddingVertical: 12,
    // borderRadius: 8,
    // borderWidth: 1,
    gap: 12,
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
