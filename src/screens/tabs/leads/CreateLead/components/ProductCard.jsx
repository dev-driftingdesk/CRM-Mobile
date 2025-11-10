import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

/**
 * ProductCard - Product display component
 *
 * Features:
 * - Stacked card design matching ContactPill wrapper styling
 * - Product name with remove button on top row
 * - Value and commission on second row
 * - Optional "Potential upsell" badge (orange, bottom right)
 * - Conditional border radius for stacked effect (isFirst/isLast)
 *
 * @param {string} name - Product name
 * @param {number} value - Product value
 * @param {number} commission - Commission amount
 * @param {boolean} isUpsell - Whether product is marked as upsell
 * @param {function} onRemove - Callback when remove button pressed
 * @param {boolean} isFirst - Whether this is the first item (rounded top)
 * @param {boolean} isLast - Whether this is the last item (rounded bottom)
 */
const ProductCard = ({ name, value, commission, isUpsell, onRemove, isFirst = false, isLast = false }) => {
  const { theme } = useAppTheme();

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
      {/* Top Row: Product Name and Remove Button */}
      <View style={styles.topRow}>
        <Text
          style={[
            theme.typography.BodyLargeMedium,
            { color: theme.colors.night, flex: 1, paddingRight: 8 },
          ]}
          numberOfLines={2}
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

      {/* Value and Commission Row */}
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.detailsRow}>
          <View>
            <Text
              style={[
                theme.typography.BodySmallMedium,
                { color: theme.colors.davysgrey },
              ]}
            >
              Value
            </Text>
            <Text
              style={[
                theme.typography.BodyBold,
                { color: theme.colors.midnightgreen, marginTop: 4 },
              ]}
            >
              ${value}
            </Text>
          </View>
          <View style={{ borderLeftWidth: 1, marginLeft: 16, paddingLeft: 16, borderLeftColor: theme.colors.isabelline }}>
            <Text
              style={[
                theme.typography.BodySmallMedium,
                { color: theme.colors.davysgrey },
              ]}
            >
              Commission
            </Text>
            <Text
              style={[
                theme.typography.BodyBold,
                { color: theme.colors.midnightgreen, marginTop: 4 },
              ]}
            >
              ${commission}
            </Text>
          </View>
        </View>

        {/* Upsell Badge - Bottom Right */}
        {isUpsell && (
          <View style={styles.upsellContainer}>
            <View style={[styles.upsellBadge, { backgroundColor: theme.colors.night10 }]}>
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  { color: theme.colors.night },
                ]}
              >
                Potential upsell
              </Text>
            </View>
          </View>
        )}

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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  upsellContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    // marginTop: 8,
  },
  upsellBadge: {
    // backgroundColor: '#FFA500',
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

export default ProductCard;
