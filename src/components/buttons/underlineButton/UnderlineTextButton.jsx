import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../../context/ThemeContext'

const UnderlineTextButton = ({ title, func }) => {
    
    const {theme} = useAppTheme();

    return (
        <TouchableOpacity onPress={func}>
            <Text style={[theme.typography.BodyMedium, {textDecorationLine:'underline'}]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default UnderlineTextButton

const styles = StyleSheet.create({})