import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * ProductCard - Product display component
 *
 * Features:
 * - Card with product name, value, and commission
 * - Optional "Potential upsell" badge (yellow/orange)
 * - Remove button (X icon)
 * - Value and commission display
 *
 * @param {string} name - Product name
 * @param {number} value - Product value
 * @param {number} commission - Commission amount
 * @param {boolean} isUpsell - Whether product is marked as upsell
 * @param {function} onRemove - Callback when remove button pressed
 */
const ProductCard = ({ name, value, commission, isUpsell, onRemove }) => {
  const { theme } = useAppTheme();

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
      {/* Left Section: Product Details */}
      <View style={styles.leftSection}>
        {/* Product Name */}
        <Text
          style={[
            theme.typography.BodyMedium,
            { color: theme.colors.night, marginBottom: 8 },
          ]}
          numberOfLines={2}
        >
          {name}
        </Text>

        {/* Value and Commission Row */}
        <View style={styles.detailsRow}>
          <Text
            style={[
              theme.typography.BodySmallMedium,
              { color: theme.colors.davysgrey },
            ]}
          >
            Value: ${value}
          </Text>
          <View style={styles.separator} />
          <Text
            style={[
              theme.typography.BodySmallMedium,
              { color: theme.colors.davysgrey },
            ]}
          >
            Commission: ${commission}
          </Text>
        </View>

        {/* Upsell Badge */}
        {isUpsell && (
          <View style={styles.upsellBadge}>
            <Text
              style={[
                theme.typography.BodySmallBold,
                { color: theme.colors.white },
              ]}
            >
              Potential upsell
            </Text>
          </View>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  leftSection: {
    flex: 1,
    paddingRight: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 8,
  },
  upsellBadge: {
    backgroundColor: '#FFA500',
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

export default ProductCard;
