import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
    title1: {
        fontFamily: 'Inter-Medium', // fallback for light
        fontSize: 40,
        // letterSpacing: 0.12 * 40, // 120% of font size
        lineHeight: 0 * 40, // or adjust if needed
    },
    title1Bold: {
        fontFamily: 'Inter-Bold',
        fontSize: 40,
        // letterSpacing: 0.12 * 40,
        lineHeight: 0 * 40,
    },
    title2: {
        fontFamily: 'Inter-Regular', // fallback for light
        fontSize: 36,
        // letterSpacing: 0.12 * 40, // 120% of font size
        lineHeight: 0 * 40, // or adjust if needed
    },
    title2Bold: {
        fontFamily: 'Inter-Bold',
        fontSize: 36,
        // letterSpacing: 0.12 * 40,
        lineHeight: 0 * 40,
    },
    title3: {
        fontFamily: 'Inter-Regular', // fallback for light
        fontSize: 28,
        // letterSpacing: 0.12 * 40, // 120% of font size
        // lineHeight: 0 * 40, // or adjust if needed
    },
    title3Bold: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        letterSpacing: 0.12 * 40,
        lineHeight: 0 * 40,
    },
    heading1Medium: {
        fontFamily: 'Inter-Medium', // fallback for light
        fontSize: 24,
    },
    heading1Bold: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
    },
    heading2Medium: {
        fontFamily: 'Inter-Medium',
        fontSize: 20,
    },
    heading2Bold: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
    },
    BodyLargeBold: {
        fontFamily: 'Inter-Bold', 
        fontSize: 16,
    },
    BodyLargeMedium: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
    },
    BodyBold: {
        fontFamily: 'Inter-Bold', 
        fontSize: 14,
    },
    BodyMedium: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
    },
    BodySmallBold: {
        fontFamily: 'Inter-Bold', 
        fontSize: 12,
    },
    BodySmallMedium: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
    },
    
});
