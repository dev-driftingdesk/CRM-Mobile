import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, LogBox, ImageBackground, ScrollView } from 'react-native';
import CustomGradient from '../../components/custom/gradients/CustomGradient';
import { colors } from '../../theme/colors';
import MainButton from '../../components/buttons/mainbutton/MainButton';
import Logo from '../../components/logo/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../context/ThemeContext';

const OnboardingScreen = () => {

    const nav = useNavigation();

    const theme = useAppTheme();

    const navigateToLogin = () => {
        nav.navigate('Login');
    }

    return (

        <ImageBackground
            source={require('../../assets/images/backgrounds/splash-screen.png')}
            style={{ flex: 1, resizeMode: 'cover' }}
        >
            <ScrollView>
                <SafeAreaView>
                    <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}><Logo tint={"white"} /></View>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/frame.png')} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text
                                style={[{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: 29,
                                    color: theme.theme.colors.white
                                },]}>Manage Every Client
                            </Text>
                            <Text
                                style={[{
                                    fontFamily: 'Inter-Bold',
                                    fontSize: 28, color: theme.theme.colors.white
                                }, theme.theme.typography.title2Bold]}>Master Every Deal</Text>
                            <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, marginTop: 12, color: theme.theme.colors.timberwolf }}>Your all-in-one workspace for calls, emails, and leads, built to keep your sales day simple, organized, and ahead of schedule.</Text>
                        </View>

                        <MainButton name={"Start"} functions={navigateToLogin} />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </ImageBackground>

    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A0A0A'
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#00C2FF',
        marginBottom: 10
    },
    subtitle: {
        color: '#ccc',
        textAlign: 'center',
        width: '80%',
        marginBottom: 30
    },
    button: {
        backgroundColor: '#00C2FF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    box: {
        width: 200,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },

});
