import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi } from '../../../services/auth-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(credentials);
      console.log('Login API response:', response);
      // Save tokens to AsyncStorage
      await AsyncStorage.setItem('accessToken', response.accessToken);
      await AsyncStorage.setItem('refreshToken', response.refreshToken);

      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  },
);
