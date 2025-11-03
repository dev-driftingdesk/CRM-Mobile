import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../../../context/ThemeContext'
import IconComponent from '../../../../assets/icons/CustomIcon';

const ActionItemWidget = ({ type }) => {

  const { theme } = useAppTheme();

  if (type === 'action_item') {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={[styles.box, { backgroundColor: theme.colors.night }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
              <IconComponent name={'golf'} width={12} height={12} color={theme.colors.white} tintColour={theme.colors.white} />
              <Text style={[{ color: theme.colors.timberwolf }, theme.typography.BodySmallMedium]}>Action Items</Text>
            </View>
            <IconComponent name={'nav-arrow-right'} width={18} height={18} color={theme.colors.white} tintColour={theme.colors.white} />
          </View>

          <View style={{ marginTop: 16 }}>
            <Text style={[{ color: theme.colors.white, letterSpacing: 1 }, theme.typography.title1]}>24 <Text style={[{ color: theme.colors.white }, theme.typography.BodyLargeMedium]}>Items</Text></Text>
          </View>

          <View style={[{ backgroundColor: theme.colors.white10, borderRadius: theme.spacings.spacing3, padding: theme.spacings.spacing3, marginTop: theme.spacings.spacing4 }]}>
            <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.white }]}>Critical Action Items</Text>
            <View style={[{ marginTop: theme.spacings.spacing2, flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
              <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.white, flex: 5 }]} numberOfLines={2}>Call John Smith – follow up on pricing discussion</Text>
              <TouchableOpacity style={{ backgroundColor: theme.colors.white, width: 30, height: 30, borderRadius: 100, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <IconComponent name={'phone'} width={13} height={13} color={theme.colors.night} tintColour={theme.colors.night} />

              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  if (type === 'leads') {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={[styles.box, { backgroundColor: theme.colors.white }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
              <IconComponent name={'golf'} width={12} height={12} color={theme.colors.white} tintColour={theme.colors.night} />
              <Text style={[{ color: theme.colors.night }, theme.typography.BodySmallMedium]}>Leads</Text>
            </View>
            <IconComponent name={'nav-arrow-right'} width={18} height={18} color={theme.colors.night} tintColour={theme.colors.night} />
          </View>

          <View style={{ marginTop: 16 }}>
            <Text style={[{ color: theme.colors.night, letterSpacing: 1 }, theme.typography.title1]}>12 <Text style={[{ color: theme.colors.night }, theme.typography.BodyLargeMedium]}>Items</Text></Text>
          </View>

          <View style={[{ backgroundColor: theme.colors.night10, borderRadius: theme.spacings.spacing3, padding: theme.spacings.spacing3, marginTop: theme.spacings.spacing4 }]}>
            <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.night }]}>Critical Action Items</Text>
            <View style={[{ marginTop: theme.spacings.spacing2, flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
              <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.night, flex: 5 }]} numberOfLines={2}>Call John Smith – follow up on pricing discussion</Text>
              <TouchableOpacity style={{ backgroundColor: theme.colors.night, width: 30, height: 30, borderRadius: 100, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <IconComponent name={'phone'} width={13} height={13} color={theme.colors.white} tintColour={theme.colors.white} />

              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  // default
  return (
    <View style={styles.box}>
      <Text style={styles.defaultText}>Default View</Text>
    </View>
  )
}

export default ActionItemWidget

const styles = StyleSheet.create({
  box: {
    width: 236,
    height: 208,
    borderRadius: 16,
    padding: 16,
    marginRight:8,
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  defaultBox: {
    padding: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  defaultText: {
    color: '#000',
  },
})
