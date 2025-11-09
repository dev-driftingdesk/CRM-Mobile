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

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  async config => {
    try {
      // Get token from AsyncStorage
      // Using 'accessToken' to match the key used in auth thunk
      const token = await AsyncStorage.getItem('accessToken');

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
    // Special handling for 401 - clear tokens
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      console.log('🔐 Unauthorized - Tokens cleared');
      // You can add navigation logic here if needed
    }

    // Return the error response directly
    return error;
  },
);

export default api;
