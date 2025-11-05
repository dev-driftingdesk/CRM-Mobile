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
      console.log(config);
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  response => {
    // Return successful response
    return response;
  },
  async error => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status } = error.response;

      switch (status) {
        case 401:
          await AsyncStorage.removeItem('authToken');
          // You can add navigation logic here if needed
          console.log('Unauthorized - Token cleared');
          break;
        case 403:
          console.log('Forbidden - Access denied');
          break;
        case 404:
          console.log('Resource not found');
          break;
        case 500:
          console.log('Internal server error');
          break;
        default:
          console.log(`Error: ${status}`);
      }
    } else if (error.request) {
      console.log('Network error - No response from server');
    } else {
      console.log('Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
