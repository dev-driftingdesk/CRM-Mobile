import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { useAppTheme } from '../../context/ThemeContext';
import Logo from '../../components/logo/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBox from '../../components/inputbox/InputBox';
import axios from "axios";
import MainButton from '../../components/buttons/mainbutton/MainButton';
import UnderlineTextButton from '../../components/buttons/underlineButton/UnderlineTextButton';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { theme } = useAppTheme();
  const nav = useNavigation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const goToForgotPasswordPage = () => {
    nav.navigate('ForgotPassword');
  };

  const handleLogin = async () => {
    setErrorMsg("");

    if (!form.email || !form.password) {
      setErrorMsg("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://your-api.com/login", form);
      console.log("LOGIN SUCCESS:", res.data);
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setErrorMsg("Invalid login details");
    }
    setLoading(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/backgrounds/splash-screen.png')}
      style={{ flex: 1 }}
    >

      {/* ✅ FIX: Wrap everything in KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={{ flex: 1 }}>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >

            {/* ✅ FULL SCREEN IS NOW RESPONSIVE TO KEYBOARD */}
            <View style={{ flex: 0.5, paddingHorizontal: 16, marginBottom: 24 }}>
              <View style={{ paddingTop: 48 }}>
                <Logo tint={"white"} />
              </View>

              <View style={[styles.container]}>
                <Text style={[theme.typography.title2, { color: theme.colors.white }]}>
                  Welcome Back!
                </Text>
                <Text style={[theme.typography.BodyLargeMedium, { color: theme.colors.white, marginTop: 10 }]}>
                  Log in to manage your leads, track sales, and boost performance.
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

              <Text style={[theme.typography.heading1Bold, { color: theme.colors.night, marginBottom: 28 }]}>
                Login
              </Text>

              {/* ✅ Email */}
              <InputBox
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={form.email}
                onChange={(text) => handleChange("email", text)}
              />

              {/* ✅ Password */}
              <View style={{ marginTop: 24 }}>
                <InputBox
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={form.password}
                  onChange={(text) => handleChange("password", text)}
                />
              </View>

              <View style={{ marginTop: 8 }}>
                <UnderlineTextButton title={"Forgot Password?"} func={goToForgotPasswordPage} />
              </View>

              {errorMsg ? (
                <Text style={[styles.error, theme.typography.BodyMedium, { marginTop: 10 }]}>{errorMsg}</Text>
              ) : null}

              <View style={{ marginTop: 20 }}>
                {loading
                  ? <ActivityIndicator size="large" color={theme.colors.midnightgreen} />
                  : 
                  <MainButton name={"Login"} functions={handleLogin} />
                }
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
