import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { useAppTheme } from '../../context/ThemeContext';
import Logo from '../../components/logo/Logo';
import InputBox from '../../components/inputbox/InputBox';
import MainButton from '../../components/buttons/mainbutton/MainButton';
import UnderlineTextButton from '../../components/buttons/underlineButton/UnderlineTextButton';

const ForgotPasswordScreen = () => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleResetPassword = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!email) {
      setErrorMsg('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('https://your-api.com/forgot-password', { email });
      setSuccessMsg('Password reset link sent to your email');
      console.log('RESET PASSWORD SUCCESS:', res.data);
    } catch (err) {
      console.log('RESET PASSWORD ERROR:', err);
      setErrorMsg('Failed to send reset link. Try again.');
    }
    setLoading(false);
  };

  const goBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/backgrounds/splash-screen.png')}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ flex: 0.5, paddingHorizontal: 16, marginBottom: 24 }}>
              <View style={{ paddingTop: 48 }}>
                <Logo tint={"white"} />
              </View>

              <View style={[styles.container]}>
                <Text style={[theme.typography.title2, { color: theme.colors.white }]}>
                  Forgot Password?
                </Text>
                <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.white, marginTop: 10 }]}>
                  Enter your email below to receive a password reset link.
                </Text>
              </View>
            </View>

            <View style={{
              borderTopLeftRadius: theme.radius.radius5,
              borderTopRightRadius: theme.radius.radius5,
              backgroundColor: theme.colors.white,
              flex: 0.75,
              paddingHorizontal: 24,
              paddingVertical: 32,
            }}>

              <InputBox
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(text) => setEmail(text)}
              />

              {errorMsg ? (
                <Text style={[styles.error, theme.typography.BodyMedium, { marginTop: 10 }]}>
                  {errorMsg}
                </Text>
              ) : null}

              {successMsg ? (
                <Text style={[styles.success, theme.typography.BodyMedium, { marginTop: 10 }]}>
                  {successMsg}
                </Text>
              ) : null}

              <View style={{ marginTop: 20 }}>
                {loading
                  ? <ActivityIndicator size="large" color={theme.colors.midnightgreen} />
                  : <MainButton name={"Send Reset Link"} functions={handleResetPassword} />
                }
              </View>

              <View style={{ marginTop: 16, alignItems: 'center' }}>
                <UnderlineTextButton title={"Back to Login"} func={goBackToLogin} />
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
});

export default ForgotPasswordScreen;
