import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';

/**
 * TeamAvatars Component
 *
 * Displays overlapping circular avatars for team members/sales reps.
 * Shows up to 3 avatars with a "+N" badge if more exist.
 *
 * Features:
 * - Overlapping circles with white borders
 * - Maximum 3 avatars visible
 * - "+N" badge for additional members
 * - zIndex layering for proper overlap
 *
 * @param {Object} props
 * @param {Array} props.salesReps - Array of sales rep objects with { id, name, avatar }
 */
const TeamAvatars = ({ salesReps = [] }) => {
  const { theme } = useAppTheme();

  // Limit to first 3 avatars
  const visibleReps = salesReps.slice(0, 3);
  const remainingCount = salesReps.length - 3;

  /**
   * Generate initials from name
   * @param {string} name - Full name
   * @returns {string} Two-letter initials
   */
  const getInitials = (name) => {
    if (!name) return 'NA';
    const words = name.trim().split(' ').filter(word => word.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  /**
   * Generate random color for avatar background
   * @param {string} id - User ID for consistent color
   * @returns {string} Hex color
   */
  const getAvatarColor = (id) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7B731'];
    const index = id ? parseInt(id.charCodeAt(0)) % colors.length : 0;
    return colors[index];
  };

  if (salesReps.length === 0) return null;

  return (
    <View style={styles.container}>
      {visibleReps.map((rep, index) => (
        <View
          key={rep.id}
          style={[
            styles.avatarContainer,
            {
              zIndex: visibleReps.length - index, // First avatar on top
              marginLeft: index === 0 ? 0 : -12, // Overlap
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: getAvatarColor(rep.id),
                borderColor: theme.colors.white,
              },
            ]}
          >
            <Text style={[theme.typography.BodyMedium, styles.initials]}>
              {getInitials(rep.name)}
            </Text>
          </View>
        </View>
      ))}

      {/* +N Badge if more than 3 */}
      {remainingCount > 0 && (
        <View
          style={[
            styles.avatarContainer,
            {
              zIndex: 0,
              marginLeft: -12,
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              styles.badgeAvatar,
              {
                backgroundColor: theme.colors.davysgrey,
                borderColor: theme.colors.white,
              },
            ]}
          >
            <Text style={[theme.typography.BodyMedium, styles.badgeText]}>
              +{remainingCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    // Container for proper z-index layering
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  badgeAvatar: {
    // Additional styling for +N badge
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TeamAvatars;
