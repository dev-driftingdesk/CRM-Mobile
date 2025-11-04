import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * SalesRepCard - Sales representative display component
 *
 * Features:
 * - Card with name and role badge
 * - Role types: Primary (teal), Co-Primary, Consultant
 * - Remove button (X icon)
 * - Conditional badge styling based on role
 *
 * @param {string} name - Sales rep name
 * @param {string} role - Role type (Primary, Co-Primary, Consultant)
 * @param {function} onRemove - Callback when remove button pressed
 */
const SalesRepCard = ({ name, role, onRemove }) => {
  const { theme } = useAppTheme();

  // Badge background color based on role
  const getBadgeColor = () => {
    switch (role) {
      case 'Primary':
        return theme.colors.midnightgreen;
      case 'Co-Primary':
        return theme.colors.davysgrey;
      default:
        return 'transparent';
    }
  };

  // Determine if badge should be shown
  const showBadge = role === 'Primary' || role === 'Co-Primary';

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
      {/* Left Section: Name and Role */}
      <View style={styles.leftSection}>
        <Text
          style={[
            theme.typography.BodyMedium,
            { color: theme.colors.night, marginBottom: 4 },
          ]}
        >
          {name}
        </Text>

        {showBadge ? (
          <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
            <Text
              style={[
                theme.typography.BodySmallBold,
                { color: theme.colors.white },
              ]}
            >
              {role}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              theme.typography.BodySmallMedium,
              { color: theme.colors.davysgrey },
            ]}
          >
            {role}
          </Text>
        )}
      </View>

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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  leftSection: {
    flex: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  removeButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SalesRepCard;
