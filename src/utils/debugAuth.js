import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Debug Authentication Utilities
 *
 * Helper functions to debug authentication issues
 */

/**
 * Check if auth token exists in AsyncStorage
 * @returns {Promise<Object>} Token info
 */
export const checkAuthToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    const tokenInfo = {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      accessTokenLength: accessToken?.length || 0,
      refreshTokenLength: refreshToken?.length || 0,
      accessTokenPreview: accessToken ? `${accessToken.substring(0, 20)}...` : null,
    };

    console.log('🔑 Auth Token Debug Info:', tokenInfo);
    return tokenInfo;
  } catch (error) {
    console.error('❌ Error checking auth token:', error);
    return null;
  }
};

/**
 * Clear all auth tokens from AsyncStorage
 */
export const clearAuthTokens = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    console.log('🗑️ Auth tokens cleared');
  } catch (error) {
    console.error('❌ Error clearing tokens:', error);
  }
};

/**
 * Get all AsyncStorage keys
 */
export const getAllStorageKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('📦 All AsyncStorage keys:', keys);
    return keys;
  } catch (error) {
    console.error('❌ Error getting storage keys:', error);
    return [];
  }
};

/**
 * Debug: Print all auth-related storage
 */
export const debugAuthStorage = async () => {
  console.log('🔍 === AUTH DEBUG START ===');

  await getAllStorageKeys();
  await checkAuthToken();

  console.log('🔍 === AUTH DEBUG END ===');
};
