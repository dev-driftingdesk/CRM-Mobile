import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppTheme } from "../../context/ThemeContext";
import Iconify from "react-native-iconify";


const InputBox = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text", // text | email | password | number | name | phone etc.
  error,
  style,
  ...rest
}) => {
  const [secure, setSecure] = useState(type === "password");

  const { theme } = useAppTheme();

  const getKeyboardType = () => {
    switch (type) {
      case "email":
        return "email-address";
      case "number":
        return "numeric";
      case "phone":
        return "phone-pad";
      default:
        return "default";
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={[theme.typography.BodySmallMedium, { marginBottom: 12, color: theme.colors.davysgrey }]}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secure}
          autoCapitalize={type === "email" ? "none" : "sentences"}
          keyboardType={getKeyboardType()}
          style={[styles.input, style, theme.typography.BodyLargeMedium, { color: theme.colors.night }]}
          {...rest}
        />

        {type === "password" && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Iconify icon={secure ? 'mdi:eye-off-outline' : 'iconoir:eye'} size={16} color={theme.colors.timberwolf} />
          </TouchableOpacity>
        )}
        {type === "email" && (
          <View>
          <Iconify icon={'iconoir:mail'} size={16} color={theme.colors.timberwolf} />
          </View>
        )}
    </View>

      { error && <Text style={styles.error}>{error}</Text> }
    </View >
  );
};

export default InputBox;

const styles = StyleSheet.create({
  wrapper: {
    // marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    // fontSize: 16,
    // color: "#000",

  },
  error: {
    marginTop: 5,
    fontSize: 12,
    color: "red",
  },
});
