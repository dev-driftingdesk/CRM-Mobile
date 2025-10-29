import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../theme/colors'
import { useAppTheme } from '../../../context/ThemeContext'


const MainButton = ({ name, functions }) => {

    const theme = useAppTheme();

    return (
        <TouchableOpacity
            onPress={functions}
            style={{ backgroundColor: theme.theme.colors.midnightgreen, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, marginTop: 28 }}>
            <View style={{}}>
                <Text style={[{ color: theme.theme.colors.white, textAlign: 'center' }, theme.theme.typography.BodyMedium]}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MainButton

const styles = StyleSheet.create({})