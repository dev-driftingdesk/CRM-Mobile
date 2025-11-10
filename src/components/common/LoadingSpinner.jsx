import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {useAppTheme} from '../../context/ThemeContext';

/**
 * LoadingSpinner Component
 *
 * Reusable loading spinner with optional message
 *
 * @param {Object} props
 * @param {string} props.message - Optional loading message
 * @param {string} props.size - Spinner size ('small' | 'large')
 * @param {boolean} props.fullScreen - Whether to show full screen loader
 */
const LoadingSpinner = ({message, size = 'large', fullScreen = false}) => {
  const {theme} = useAppTheme();

  const content = (
    <>
      <ActivityIndicator size={size} color={theme.colors.midnightgreen} />
      {message && (
        <Text
          style={[
            theme.typography.BodyMedium,
            {color: theme.colors.davysgrey, marginTop: 16},
          ]}>
          {message}
        </Text>
      )}
    </>
  );

  if (fullScreen) {
    return (
      <View
        style={[
          styles.fullScreenContainer,
          {backgroundColor: theme.colors.isabelline},
        ]}>
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
  },
});

export default LoadingSpinner;
