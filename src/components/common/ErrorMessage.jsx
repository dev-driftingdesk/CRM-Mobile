import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import CustomIcon from '../../assets/icons/CustomIcon';

/**
 * ErrorMessage Component
 *
 * Reusable error message display with retry button
 *
 * @param {Object} props
 * @param {Object} props.error - Error object with message and status
 * @param {Function} props.onRetry - Callback function for retry button
 * @param {boolean} props.fullScreen - Whether to show full screen error
 */
const ErrorMessage = ({ error, onRetry, fullScreen = false }) => {
  const { theme } = useAppTheme();

  const errorMessage =
    error?.message || 'An unexpected error occurred. Please try again.';
  const errorStatus = error?.status;

  const content = (
    <>
      {/* Error Icon */}
      <CustomIcon
        name="activity"
        width={48}
        height={48}
        tintColour={theme.colors.davysgrey}
        style={styles.icon}
      />

      {/* Error Message */}
      <Text
        style={[
          theme.typography.BodyLargeMedium,
          { color: theme.colors.night, textAlign: 'center', marginBottom: 8 },
        ]}
      >
        Oops! Something went wrong
      </Text>

      <Text
        style={[
          theme.typography.BodyMedium,
          {
            color: theme.colors.davysgrey,
            textAlign: 'center',
            marginBottom: 24,
          },
        ]}
      >
        {errorMessage}
      </Text>

      {errorStatus && (
        <Text
          style={[
            theme.typography.BodySmall,
            {
              color: theme.colors.davysgrey,
              textAlign: 'center',
              marginBottom: 24,
            },
          ]}
        >
          Error code: {errorStatus}
        </Text>
      )}

      {/* Retry Button */}
      {onRetry && (
        <TouchableOpacity
          style={[
            styles.retryButton,
            { backgroundColor: theme.colors.midnightgreen },
          ]}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text
            style={[theme.typography.BodyBold, { color: theme.colors.white }]}
          >
            Try Again
          </Text>
        </TouchableOpacity>
      )}
    </>
  );

  if (fullScreen) {
    return (
      <View
        style={[
          styles.fullScreenContainer,
          { backgroundColor: theme.colors.isabelline },
        ]}
      >
        {content}
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
});

export default ErrorMessage;
