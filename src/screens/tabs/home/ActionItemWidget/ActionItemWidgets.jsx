import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../../../context/ThemeContext'
import ActionItemWidget from './ActionItemWidget';

const ActionItemWidgets = ({ type }) => {

  const { theme } = useAppTheme();

  return (
    <View>

      <ScrollView
        horizontal={true}
        style={{paddingBottom:15}}
      >
        <ActionItemWidget type={'action_item'}></ActionItemWidget>
        <ActionItemWidget type={'leads'}></ActionItemWidget>
        {/* <ActionItemWidget></ActionItemWidget> */}
      </ScrollView>
    </View>
  )
}

export default ActionItemWidgets

const styles = StyleSheet.create({})