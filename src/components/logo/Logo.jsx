import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Logo = ({tint}) => {
  return (
    <View style={{}}>
      <Image source={require('../../assets/images/logo/logo.png')} style={[styles.logo,{tintColor:tint}]} />
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    logo:{
        width: 125,
        height:35,
        resizeMode:'contain'
    }
})