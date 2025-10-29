import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import Logo from '../../components/logo/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
// import { useAppTheme } from '../context/ThemeContext';
import InputBox from '../../components/inputbox/InputBox';
import axios from "axios";
import MainButton from '../../components/buttons/mainbutton/MainButton';
import UnderlineTextButton from '../../components/buttons/underlineButton/UnderlineTextButton';
import { useNavigation } from '@react-navigation/native';



const SignupScreen = () => {
  const { theme } = useAppTheme();

  const nav = useNavigation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });


  const goToForgotPasswordPage = () => {
    nav.navigate('ForgotPassword');
  }

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    setErrorMsg("");

    // Basic validations
    if (!form.firstName || !form.lastName || !form.password || !form.confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (form.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password,
      };

      const res = await axios.post("https://your-api.com/signup", payload);

      console.log("SIGNUP SUCCESS:", res.data);

      // Navigate to login or home screen
      // navigation.navigate("Login");

    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      setErrorMsg("Signup failed. Please try again.");
    }

    setLoading(false);
  };


  return (
    <ImageBackground
      source={require('../../assets/images/backgrounds/splash-screen.png')}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>

        {/* ✅ FIX: KeyboardAvoidingView must wrap the ScrollView */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >

          <View
            style={{
              borderTopLeftRadius: theme.radius.radius5,
              borderTopRightRadius: theme.radius.radius5,
              backgroundColor: theme.colors.white,
              paddingHorizontal: 24,
              flex: 1,
            }}
          >

            {/* ✅ FIX: Add contentContainerStyle & keyboardShouldPersistTaps */}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >

              <View style={{ flex: 0.5, marginBottom: 24 }}>
                <View style={{ paddingTop: 48 }}>
                  <Logo />
                </View>
                <View style={[styles.container, {}]}>
                  <Text style={[theme.typography.title3, { color: theme.colors.night }]}>Set Up Your Account Credentials</Text>
                  <Text style={[theme.typography.BodyMedium, { color: theme.colors.davysgrey, marginTop: 10 }]}>Please create a unique username and password to complete your account registration. These credentials will be used for future logins.</Text>
                </View>
              </View>


              <View>

                <View style={{ marginBottom: 24 }}>
                  <View style={[styles.inputContainer, {}]}>
                    <InputBox
                      label="First Name"
                      placeholder="Enter first name"
                      type="name"
                      value={form.firstName}
                      onChange={(text) => handleChange("firstName", text)}
                    />
                  </View>


                  <View style={[styles.inputContainer, {}]}>
                    <InputBox
                      label="Last Name"
                      placeholder="Enter last name"
                      type="name"
                      value={form.lastName}
                      onChange={(text) => handleChange("lastName", text)}
                    />
                  </View>

                  <View style={[styles.inputContainer, {}]}>

                    <InputBox
                      label="Password"
                      placeholder="Enter password"
                      type="password"
                      value={form.password}
                      onChange={(text) => handleChange("password", text)}
                    />
                  </View>

                  <View style={[styles.inputContainer, {}]}>

                    <InputBox
                      label="Confirm Password"
                      placeholder="Re-enter password"
                      type="password"
                      value={form.confirmPassword}
                      onChange={(text) => handleChange("confirmPassword", text)}
                    />

                    <View style={{ marginTop: 10 }}>
                      {errorMsg ? <Text style={[styles.error, theme.typography.BodyMedium]}>{errorMsg}</Text> : null}
                    </View>
                  </View>
                </View>



                <View style={{ bottom: 0 }}>
                  {loading
                    ?
                    <ActivityIndicator size="large" color={theme.colors.midnightgreen} style={{ marginTop: 20 }} />
                    :
                    <MainButton name={"Setup Passwords"} functions={handleSignup} />
                  }
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                  <Text style={[theme.typography.BodyMedium]}>Already have an account?</Text>
                  <UnderlineTextButton title={"Sign in"} func={goToForgotPasswordPage} />
                </View>

              </View>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>


    </ImageBackground >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  text: {
    fontSize: 18,
  },
  error: {
    color: 'red'
  },
  inputContainer: {
    marginBottom: 16
  }
});

export default SignupScreen;
