import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import IconComponent from '../../../../assets/icons/CustomIcon'
import { useAppTheme } from '../../../../context/ThemeContext'

const HomeHeader = () => {

    const { theme } = useAppTheme();

    const [profPicUrl, setProfPicUrl] = useState('https://lirp.cdn-website.com/18180652/dms3rep/multi/opt/online-dating-KevinBrookim-Onlinedating-82-640w.jpg');
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <Image source={{ uri: profPicUrl }} style={{ width: 52, height: 52, resizeMode: 'cover', borderRadius: 100 }} />

                <View style={{ marginLeft: 8 }}>
                    <Text style={[theme.typography.heading2Medium, { color: theme.colors.night, marginBottom: theme.spacings.spacing1 }]}>James nick</Text>
                    <Text style={[theme.typography.BodyMedium, { color: theme.colors.davysgrey }]}>Welcome Back!</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <TouchableOpacity onPress={() => { console.log("search") }}>
                    <IconComponent name={'search'} width={25} height={25} tintColour={theme.colors.night} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { console.log("bell-notification") }}>
                    <IconComponent name={'bell-notification'} width={25} height={25} tintColour={theme.colors.night} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({})