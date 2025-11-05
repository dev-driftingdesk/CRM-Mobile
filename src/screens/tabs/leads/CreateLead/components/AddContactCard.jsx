import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * AddContactCard - Component for adding new communication methods
 *
 * Features:
 * - Platform dropdown selector
 * - Contact value input
 * - Set as primary checkbox
 * - Add button
 * - Matches ContactPill wrapper styling
 * - Conditional border radius for stacked effect
 *
 * @param {string} selectedPlatform - Currently selected platform
 * @param {function} onPlatformChange - Platform selection handler
 * @param {string} contactValue - Contact input value
 * @param {function} onContactChange - Contact input change handler
 * @param {boolean} isPrimary - Primary checkbox state
 * @param {function} onPrimaryToggle - Primary checkbox toggle handler
 * @param {boolean} canSetPrimary - Whether primary can be set (limit check)
 * @param {function} onAdd - Add button press handler
 * @param {boolean} showPicker - Whether to show platform options
 * @param {function} onTogglePicker - Toggle picker visibility
 * @param {boolean} isFirst - Whether this is the first item (rounded top)
 * @param {boolean} isLast - Whether this is the last item (rounded bottom)
 */
const AddContactCard = ({
  selectedPlatform,
  onPlatformChange,
  contactValue,
  onContactChange,
  isPrimary,
  onPrimaryToggle,
  canSetPrimary,
  onAdd,
  showPicker,
  onTogglePicker,
  isFirst = false,
  isLast = true,
}) => {
  const { theme } = useAppTheme();

  const platforms = ['Phone', 'Email', 'WhatsApp', 'Facebook', 'Instagram'];

  return (
    <View style={[
      styles.wrapper,
      {
        borderColor: theme.colors.night10,
        borderTopLeftRadius: isFirst ? 24 : 0,
        borderTopRightRadius: isFirst ? 24 : 0,
        borderBottomLeftRadius: isLast ? 24 : 0,
        borderBottomRightRadius: isLast ? 24 : 0,
        borderBottomWidth: isLast ? 1 : 0,
      }
    ]}>
      {/* Platform Selector */}
      <Text style={[theme.typography.BodyMedium, { color: theme.colors.night, marginBottom: 8 }]}>
        Platform
      </Text>
      <TouchableOpacity
        style={[
          styles.platformDropdown,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.night10,
          },
        ]}
        onPress={onTogglePicker}
        activeOpacity={0.7}
      >
        <Text
          style={[
            theme.typography.BodyMedium,
            { color: selectedPlatform ? theme.colors.night : theme.colors.davysgrey },
          ]}
        >
          {selectedPlatform || 'Select where the client prefers to meet'}
        </Text>
        <CustomIcon
          name="nav-arrow-down"
          width={20}
          height={20}
          tintColour={theme.colors.night}
        />
      </TouchableOpacity>

      {/* Platform Options */}
      {showPicker && (
        <View style={[styles.platformOptions, { backgroundColor: theme.colors.white, borderColor: theme.colors.night10 }]}>
          {platforms.map((platform) => (
            <TouchableOpacity
              key={platform}
              style={styles.platformOption}
              onPress={() => onPlatformChange(platform)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  theme.typography.BodyMedium,
                  { color: theme.colors.night },
                ]}
              >
                {platform}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Contact Number or Value */}
      <Text style={[theme.typography.BodyMedium, { color: theme.colors.night, marginBottom: 8, marginTop: 16 }]}>
        Contact number or value
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.night10,
            color: theme.colors.night,
          },
          theme.typography.BodyMedium,
        ]}
        placeholder="Enter the number, email or other"
        placeholderTextColor={theme.colors.davysgrey}
        value={contactValue}
        onChangeText={onContactChange}
      />

      {/* Set as Primary Checkbox */}
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => {
          console.log('Checkbox pressed. canSetPrimary:', canSetPrimary, 'isPrimary:', isPrimary);
          // Only allow toggling if we can set primary OR we're unchecking
          if (canSetPrimary || isPrimary) {
            onPrimaryToggle();
          } else {
            console.log('Cannot set primary - limit reached');
          }
        }}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: theme.colors.davysgrey,
              backgroundColor: isPrimary
                ? theme.colors.midnightgreen
                : 'transparent',
            },
          ]}
        >
          {isPrimary && (
            <CustomIcon
              name="check"
              width={14}
              height={14}
              tintColour={theme.colors.white}
            />
          )}
        </View>
        <Text
          style={[
            theme.typography.BodyMedium,
            {
              color: theme.colors.davysgrey,
              flex: 1,
            },
          ]}
        >
          Set as primary contact
        </Text>
      </TouchableOpacity>

      {/* Add Communication Button */}
      <TouchableOpacity
        style={[
          styles.addButton,
          { borderColor: theme.colors.night10 },
        ]}
        onPress={onAdd}
        activeOpacity={0.7}
      >
        <CustomIcon
          name="plus"
          width={16}
          height={16}
          tintColour={theme.colors.night}
        />
        <Text
          style={[
            theme.typography.BodyMedium,
            { color: theme.colors.night },
          ]}
        >
          Add communication method
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  platformDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  platformOptions: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  platformOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
});

export default AddContactCard;
