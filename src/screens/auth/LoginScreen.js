import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useAppTheme } from '../../context/ThemeContext';
import Logo from '../../components/logo/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBox from '../../components/inputbox/InputBox';
import MainButton from '../../components/buttons/mainbutton/MainButton';
import UnderlineTextButton from '../../components/buttons/underlineButton/UnderlineTextButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/auth/thunk';
import { clearError } from '../../store/slices/auth/authSlice';

const LoginScreen = () => {
  const { theme } = useAppTheme();
  const nav = useNavigation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Don't Remove this malik. this useEffect is for just to avoid entering email and password again and again during testing

  useEffect(() => {
    setForm({
      email: 'admin@ceedpods2.com',
      password: 'AdminPass123',
    });
  }, []);

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
    if (error) dispatch(clearError());
  };

  // const goToForgotPasswordPage = () => {
  //   nav.navigate('ForgotPassword');
  // };
  const goToForgotPasswordPage = () => {
    nav.navigate('Signup');
  };

  const handleLogin = async () => {
    setErrorMsg('');

    if (!form.email || !form.password) {
      setErrorMsg('Please enter email and password');
      return;
    }

    const result = await dispatch(loginUser(form));
    console.log('Login result:', result);

    if (loginUser.fulfilled.match(result)) {
      console.log('Login successful, tokens saved');
      // Navigation is handled automatically by RootNavigator based on isAuthenticated state
    } else {
      setErrorMsg(result.payload || 'Login failed. Please try again.');
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMsg(error);
    }
  }, [error]);

  return (
    <ImageBackground
      source={require('../../assets/images/backgrounds/splash-screen.png')}
      style={{ flex: 1 }}
    >
      {/* ✅ FIX: Wrap everything in KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* ✅ FULL SCREEN IS NOW RESPONSIVE TO KEYBOARD */}
            <View
              style={{ flex: 0.5, paddingHorizontal: 16, marginBottom: 24 }}
            >
              <View style={{ paddingTop: 48 }}>
                <Logo tint={'white'} />
              </View>

              <View style={[styles.container]}>
                <Text
                  style={[
                    theme.typography.title2,
                    { color: theme.colors.white },
                  ]}
                >
                  Welcome Back!
                </Text>
                <Text
                  style={[
                    theme.typography.BodyLargeMedium,
                    { color: theme.colors.white, marginTop: 10 },
                  ]}
                >
                  Log in to manage your leads, track sales, and boost
                  performance.
                </Text>
              </View>
            </View>

            <View
              style={{
                borderTopLeftRadius: theme.radius.radius5,
                borderTopRightRadius: theme.radius.radius5,
                backgroundColor: theme.colors.white,
                flex: 0.75,
                paddingHorizontal: 24,
                paddingVertical: 32,
              }}
            >
              <Text
                style={[
                  theme.typography.heading1Bold,
                  { color: theme.colors.night, marginBottom: 28 },
                ]}
              >
                Login
              </Text>

              {/* ✅ Email */}
              <InputBox
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={form.email}
                onChange={text => handleChange('email', text)}
              />

              {/* ✅ Password */}
              <View style={{ marginTop: 24 }}>
                <InputBox
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={form.password}
                  onChange={text => handleChange('password', text)}
                />
              </View>

              <View style={{ marginTop: 8 }}>
                <UnderlineTextButton
                  title={'Forgot Password?'}
                  func={goToForgotPasswordPage}
                />
              </View>

              {errorMsg ? (
                <Text
                  style={[
                    styles.error,
                    theme.typography.BodyMedium,
                    { marginTop: 10 },
                  ]}
                >
                  {errorMsg}
                </Text>
              ) : null}

              <View style={{ marginTop: 20 }}>
                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.midnightgreen}
                  />
                ) : (
                  <MainButton name={'Login'} functions={handleLogin} />
                )}
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
});

export default LoginScreen;
