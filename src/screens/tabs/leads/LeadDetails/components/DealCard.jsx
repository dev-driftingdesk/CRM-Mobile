import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';

/**
 * DealCard Component
 *
 * Card component for displaying individual deal information within a lead.
 * Shows deal name, product count, total value, and last activity note.
 *
 * Features:
 * - Deal name (bold) and product count on left
 * - Total value in teal color on right (aligned to top)
 * - Activity note box with light gray background
 * - Activity timestamp below note
 * - Pressable for navigation to deal details
 * - Shadow for elevation effect
 *
 * @param {Object} props
 * @param {string} props.dealName - Name of the deal
 * @param {number} props.productCount - Number of products in the deal
 * @param {number} props.totalValue - Total value of the deal in dollars
 * @param {string} props.lastActivity - Description of last activity
 * @param {string} props.timestamp - Timestamp of last activity
 * @param {Object} props.deal - Full deal object for navigation (optional)
 * @param {Function} props.onPress - Callback when card is pressed
 */
const DealCard = ({
  dealName,
  productCount,
  totalValue,
  lastActivity,
  timestamp,
  deal,
  onPress,
}) => {
  const { theme } = useAppTheme();

  /**
   * Format currency value
   * @param {number} value - Dollar amount
   * @returns {string} Formatted currency string (e.g., "$9,800")
   */
  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US')}`;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.white,
          borderColor:theme.colors.night10,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      onPress={onPress}
    >
      {/* Top Row: Deal Name and Total Value */}
      <View style={styles.topRow}>
        {/* Left: Deal Name */}
        <View style={styles.dealInfo}>
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              {
                color: theme.colors.night,
              },
            ]}
            numberOfLines={2}
          >
            {dealName}
          </Text>
        </View>


      </View>

      <View style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:8 }}>
        {/* Product Count */}
        <Text
          style={[
            theme.typography.BodyLargeMedium,
            {
              color: theme.colors.davysgrey,
              // marginTop: 4,
            },
          ]}
        >
          {productCount} {productCount === 1 ? 'product' : 'products'}
        </Text>
        {/* Right: Total Value */}
        <Text
          style={[
            theme.typography.heading2Bold,
            {
              color: theme.colors.midnightgreen,
              // marginLeft: 12,
            },
          ]}
        >
          {formatCurrency(totalValue)}
        </Text>
      </View>

      {/* Activity Note Box */}
      {lastActivity && (
        <View
          style={[
            styles.activityBox,
            {
              backgroundColor: theme.colors.isabelline,
            },
          ]}
        >
          {/* Activity Description */}
          <Text
            style={[
              theme.typography.BodyMedium,
              {
                color: theme.colors.night,
              },
            ]}
            numberOfLines={2}
          >
            {lastActivity}
          </Text>

          {/* Timestamp */}
          {timestamp && (
            <Text
              style={[
                theme.typography.BodySmallMedium,
                {
                  color: theme.colors.davysgrey,
                  marginTop: 8,
                },
              ]}
            >
              {timestamp}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    // Shadow for elevation
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dealInfo: {
    flex: 1,
    marginRight: 12,
  },
  activityBox: {
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
});

export default DealCard;
