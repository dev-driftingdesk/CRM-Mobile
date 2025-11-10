import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * SalesRepCard - Sales representative display component
 *
 * Features:
 * - Stacked card design matching ContactPill wrapper styling
 * - Name and role badge on same row
 * - Role types: Primary (teal), Co-Primary (gray), Consultant (text only)
 * - Remove button (X icon)
 * - Conditional border radius for stacked effect (isFirst/isLast)
 *
 * @param {string} name - Sales rep name
 * @param {string} role - Role type (Primary, Co-Primary, Consultant)
 * @param {function} onRemove - Callback when remove button pressed
 * @param {boolean} isFirst - Whether this is the first item (rounded top)
 * @param {boolean} isLast - Whether this is the last item (rounded bottom)
 */


// const borderColor = useAppTheme().theme.colors.night10;

const SalesRepCard = ({ name, role, onRemove, isFirst = false, isLast = false }) => {
  const { theme } = useAppTheme();

  // Render role badge or text
  const renderRoleBadge = () => {
    if (role === 'Primary') {
      return (
        <View style={[styles.badge, { backgroundColor: theme.colors.midnightgreen }]}>
          <Text
            style={[
              theme.typography.BodySmallMedium,
              { color: theme.colors.white },
            ]}
          >
            Primary
          </Text>
        </View>
      );
    } else if (role === 'Co-Primary') {
      return (
        <View style={[styles.badge, { backgroundColor: theme.colors.isabelline }]}>
          <Text
            style={[
              theme.typography.BodySmallMedium,
              { color: theme.colors.night },
            ]}
          >
            Co-Primary
          </Text>
        </View>
      );
    } else {
      // Consultant - just text
      return (
        <View style={[styles.badge, { backgroundColor: theme.colors.isabelline }]}>
          <Text
            style={[
              theme.typography.BodySmallMedium,
              { color: theme.colors.night },
            ]}
          >
            {role}
          </Text>
        </View>
      );
    }
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderColor: theme.colors.night10,
          borderTopLeftRadius: isFirst ? 24 : 0,
          borderTopRightRadius: isFirst ? 24 : 0,
          borderBottomLeftRadius: isLast ? 24 : 0,
          borderBottomRightRadius: isLast ? 24 : 0,
          borderBottomWidth: isLast ? 1 : 0,
        },
      ]}
    >
      <View style={{}}>
        <View style={styles.contentRow}>
          {/* Name */}
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              { color: theme.colors.night, flex: 1 },
            ]}
          >
            {name}
          </Text>

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

        <View style={styles.rightSection}>
          {renderRoleBadge()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    backgroundColor: '#FFFFFF',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    // gap: 8,
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

export default SalesRepCard;
