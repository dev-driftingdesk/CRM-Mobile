import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to CRM Mobile 🚀</Text>
            <Text style={styles.subtitle}>
                Manage leads, track performance, and boost your sales efficiency!
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.replace('Login')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' },
    title: { fontSize: 26, fontWeight: '700', color: '#00C2FF', marginBottom: 10 },
    subtitle: { color: '#ccc', textAlign: 'center', width: '80%', marginBottom: 30 },
    button: { backgroundColor: '#00C2FF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
    buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
