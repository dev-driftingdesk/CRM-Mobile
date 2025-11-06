import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useAppTheme } from '../../../../../context/ThemeContext';

/**
 * FormInput Component
 *
 * Reusable form input component with consistent styling and theming support.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Label text displayed above input (required)
 * @param {string} props.placeholder - Placeholder text (required)
 * @param {string} props.value - Input value (required)
 * @param {function} props.onChangeText - Change handler (required)
 * @param {string} [props.keyboardType='default'] - Keyboard type (default, email-address, url, numeric, etc.)
 * @param {string} [props.autoCapitalize='sentences'] - Capitalization behavior (none, words, sentences, characters)
 * @param {boolean} [props.required=false] - Show red asterisk indicator
 * @param {boolean} [props.multiline=false] - Enable multiline input
 * @param {number} [props.numberOfLines=1] - Number of lines for multiline input
 * @param {boolean} [props.editable=true] - Enable/disable input
 * @param {boolean} [props.secureTextEntry=false] - Password masking
 * @param {object} [props.style] - Additional custom styles for input
 * @param {object} [props.containerStyle] - Additional custom styles for container
 */
const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  required = false,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  secureTextEntry = false,
  style,
  containerStyle,
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label with optional required indicator */}
      <View style={styles.labelRow}>
        <Text
          style={[
            theme.typography.BodyMedium,
            { color: theme.colors.night },
          ]}
        >
          {label}
        </Text>
        {required && (
          <Text style={styles.requiredIndicator}> *</Text>
        )}
      </View>

      {/* Input */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.night,
            color: theme.colors.night,
          },
          theme.typography.BodyMedium,
          multiline && { height: 48 * numberOfLines },
          !editable && { opacity: 0.6 },
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.davysgrey}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        secureTextEntry={secureTextEntry}
        accessibilityLabel={label}
        accessibilityHint={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requiredIndicator: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
});

export default FormInput;
