import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL:
    'https://ceedpodservice.wittycliff-5b88c7b4.westus2.azurecontainerapps.io/api/v1',
  // 'https://api.teamhandle.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Store reference for handling 401 errors
let storeRef = null;
export const setStoreRef = store => {
  storeRef = store;
};

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  async config => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 Auth token attached to request');
      } else {
        console.warn('⚠️ No auth token found in AsyncStorage');
      }

      return config;
    } catch (error) {
      console.error('❌ Error in request interceptor:', error);
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle 401 errors
api.interceptors.response.use(
  response => {
    // Return successful response
    return response;
  },
  async error => {
    // Special handling for 401 - clear tokens and logout
    if (error.response?.status === 401) {
      console.log('🔐 Unauthorized (401) - Clearing session');

      // Clear tokens from AsyncStorage
      await AsyncStorage.removeItem('ACCESS_TOKEN');
      await AsyncStorage.removeItem('REFRESH_TOKEN');

      // Dispatch logout action to Redux if store is available
      if (storeRef) {
        const { logoutUser } = require('../store/slices/auth/thunk');
        await storeRef.dispatch(logoutUser());
        console.log('🔐 User logged out due to 401 error');
      }
    }

    // Return rejected promise so the calling code can handle the error
    return Promise.reject(error);
  },
);

export default api;
